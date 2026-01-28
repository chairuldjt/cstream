import axios from 'axios';
import { Drama, APIDrama } from '@/types';
import { MOCK_DRAMAS, MOCK_EPISODES } from './mock-data';

const BASE_URL = 'https://dramabox.sansekai.my.id/api/dramabox';

// Create axios instance
export const api = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Referer': 'https://dramabox.sansekai.my.id/',
        'Origin': 'https://dramabox.sansekai.my.id',
        'Accept': 'application/json, text/plain, */*'
    },
});

// Add response interceptor for retry on 429
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        if (error.response && error.response.status === 429 && !originalRequest._retry) {
            originalRequest._retry = true;
            const delay = 1000 + Math.random() * 2000; // 1-3s jitter
            console.log(`Rate limited, retrying in ${delay}ms...`);
            await new Promise(resolve => setTimeout(resolve, delay));
            return api(originalRequest);
        }
        return Promise.reject(error);
    }
);

// Mapper function
const mapToDrama = (item: any): Drama => {
    let cover = item.coverWap || item.cover || '';

    // Clean up search thumbnails that might be resized/low quality
    if (cover.includes('image_process=resize')) {
        cover = cover.split('?')[0]; // Remove all params or just the resize one? 
        // Samples show t=...&image_process=...
        // Let's keep the timestamp if possible but remove resize
        cover = cover.replace(/&image_process=resize,h_\d+/, '').replace(/\?image_process=resize,h_\d+/, '?');
    }

    return {
        bookId: item.bookId,
        title: item.bookName,
        cover: cover,
        vertical_cover: cover, // Use the same for both if we don't have separate
        intro: item.introduction || item.intro,
        category: (item.tags?.[0] || item.tagNames?.[0] || 'Drama'),
        tags: item.tags || item.tagNames || [],
        score: item.rankVo?.hotCode || item.score || item.hotCode,
        total_episodes: item.chapterCount || item.chapter_count || item.total_episodes
    };
};

export const getLatestDramas = async (page = 1): Promise<Drama[]> => {
    // API limitation: /latest endpoint does not support pagination (returns same results)
    if (page > 1) return [];

    try {
        const { data } = await api.get('/latest', { params: { page } });
        // Check if data is array or wrapped
        const list = Array.isArray(data) ? data : (data.data || []);
        return list.map((item: any) => mapToDrama(item));
    } catch (e) {
        console.warn("API Error (getLatestDramas), using mock data", e);
        return MOCK_DRAMAS;
    }
};

export const getTrendingDramas = async (page = 1): Promise<Drama[]> => {
    // API limitation: /trending endpoint does not support pagination
    if (page > 1) return [];

    try {
        const { data } = await api.get('/trending', { params: { page } });
        const list = Array.isArray(data) ? data : (data.data || []);
        return list.map((item: any) => mapToDrama(item));
    } catch (e) {
        console.warn("API Error (getTrendingDramas), using mock data", e);
        return MOCK_DRAMAS;
    }
};

export const getDubIndoDramas = async (classify: 'terpopuler' | 'terbaru' = 'terbaru', page = 1): Promise<Drama[]> => {
    try {
        const { data } = await api.get('/dubindo', { params: { classify, page } });
        const list = Array.isArray(data) ? data : (data.data || []);
        return list.map((item: any) => mapToDrama(item));
    } catch (e) {
        console.warn("API Error (getDubIndoDramas), using mock data", e);
        return MOCK_DRAMAS;
    }
};

export const searchDramas = async (query: string, page = 1): Promise<Drama[]> => {
    // API limitation: /search endpoint pagination is unreliable or rate-limited
    if (page > 1) return [];

    try {
        const { data } = await api.get('/search', { params: { query, page } });
        const list = Array.isArray(data) ? data : (data.data || []);
        return list.map((item: any) => mapToDrama(item));
    } catch (e) {
        console.warn("API Error (searchDramas), using mock data", e);
        return MOCK_DRAMAS.filter(d => d.title.toLowerCase().includes(query.toLowerCase()));
    }
};

export const getDramaDetail = async (bookId: string): Promise<Drama | null> => {
    try {
        const { data } = await api.get('/detail', { params: { bookId } });
        // data might be the object directly or wrapped
        const item = (data && data.bookId) ? data : (data.data || null);
        if (!item) return null;
        return mapToDrama(item);
    } catch (e) {
        console.warn("API Error (getDramaDetail), using mock data", e);
        return MOCK_DRAMAS.find(d => d.bookId === bookId) || MOCK_DRAMAS[0];
    }
};

// Episode raw type
interface APIEpisode {
    chapterId: string;
    chapterName: string;
    chapterIndex: number;
    cdnList: {
        cdnDomain: string;
        videoPathList: {
            quality: number;
            videoPath: string;
            isDefault: number;
        }[];
    }[];
}

export const getDramaEpisodes = async (bookId: string) => {
    try {
        const { data } = await api.get('/allepisode', { params: { bookId } });
        const rawEpisodes: APIEpisode[] = Array.isArray(data) ? data : (data.data || []);

        return rawEpisodes.map(ep => {
            // Flatten video paths
            let videos: { quality: number, url: string }[] = [];
            if (ep.cdnList) {
                ep.cdnList.forEach(cdn => {
                    if (cdn.videoPathList) {
                        cdn.videoPathList.forEach(v => {
                            videos.push({ quality: v.quality, url: v.videoPath });
                        });
                    }
                });
            }

            // Sort by quality descending
            videos.sort((a, b) => b.quality - a.quality);

            // Pick best quality (720p preferred for balance, or max)
            const best = videos.find(v => v.quality === 720) || videos[0];

            return {
                name: `Episode ${ep.chapterIndex + 1}`,
                url: best ? best.url : ''
            };
        });
    } catch (e) {
        console.warn("API Error (getDramaEpisodes), using mock data", e);
        return MOCK_EPISODES;
    }
};

export const getForYou = async () => {
    // Implement if needed
    return [];
};

export const getRandomDrama = async () => {
    // Implement if needed
    return [];
};

export const getPopularSearch = async (): Promise<Drama[]> => {
    try {
        const { data } = await api.get('/populersearch');
        const list = Array.isArray(data) ? data : (data.data || []);
        return list.map((item: any) => mapToDrama(item));
    } catch (e) {
        console.warn("API Error (getPopularSearch), using mock data", e);
        return MOCK_DRAMAS;
    }
};
export const POPULAR_TAGS = [
    "Cinta Setelah Menikah", "Cinta Paksaan", "Musuh Jadi Kekasih",
    "Mafia", "Gadis Naif", "Perjalanan Waktu", "Balas Dendam",
    "Pria Dominan", "Perselingkuhan", "Mengejar Istri", "Sistem",
    "Kekuatan Khusus", "Penebusan", "Modern", "CEO"
];

export const getDramasByTag = async (tag: string, page = 1): Promise<Drama[]> => {
    return searchDramas(tag, page);
};
