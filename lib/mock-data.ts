import { Drama } from '@/types';

export const MOCK_DRAMAS: Drama[] = [
    {
        bookId: 'mock-1',
        title: 'The CEO\'s Secret Contract',
        cover: 'https://placehold.co/400x600/1e293b/white?text=CEO+Contract',
        vertical_cover: 'https://placehold.co/400x600/1e293b/white?text=CEO+Contract',
        intro: 'A struggling artist accidentally saves a cold-hearted CEO and ends up in a contract marriage.',
        category: 'Romance',
        tags: ['Romance', 'CEO', 'Contract Marriage'],
        score: '9.8',
        status: 'Ongoing',
        total_episodes: 80
    },
    {
        bookId: 'mock-2',
        title: 'Reborn: The Queen Returns',
        cover: 'https://placehold.co/400x600/4c1d95/white?text=Queen+Returns',
        vertical_cover: 'https://placehold.co/400x600/4c1d95/white?text=Queen+Returns',
        intro: 'Betrayed by her sister and husband, she dies only to wake up 5 years in the past.',
        category: 'Revenge',
        tags: ['Revenge', 'Rebirth', 'Strong Female Lead'],
        score: '9.9',
        status: 'Completed',
        total_episodes: 100
    },
    {
        bookId: 'mock-3',
        title: 'Martial God Asura',
        cover: 'https://placehold.co/400x600/b91c1c/white?text=Martial+God',
        vertical_cover: 'https://placehold.co/400x600/b91c1c/white?text=Martial+God',
        intro: 'In a world where strength is everything, a cripple rises to become the supreme god.',
        category: 'Action',
        tags: ['Action', 'Fantasy', 'Cultivation'],
        score: '9.5',
        status: 'Ongoing',
        total_episodes: 200
    },
    {
        bookId: 'mock-4',
        title: 'Love in the Royal Palace',
        cover: 'https://placehold.co/400x600/b45309/white?text=Royal+Love',
        vertical_cover: 'https://placehold.co/400x600/b45309/white?text=Royal+Love',
        intro: 'A maid catches the eye of the Crown Prince, sparking jealousy and intrigue.',
        category: 'Historical',
        tags: ['Historical', 'Romance', 'Politics'],
        score: '9.2',
        status: 'Completed',
        total_episodes: 60
    },
    {
        bookId: 'mock-5',
        title: 'Flash Marriage to a Billionaire',
        cover: 'https://placehold.co/400x600/065f46/white?text=Flash+Marriage',
        vertical_cover: 'https://placehold.co/400x600/065f46/white?text=Flash+Marriage',
        intro: 'She thought she married a poor man, but he turned out to be the richest man in the city.',
        category: 'Urban',
        tags: ['Urban', 'Billionaire', 'Romance'],
        score: '9.7',
        status: 'Ongoing',
        total_episodes: 120
    }
];

export const MOCK_EPISODES = Array.from({ length: 10 }, (_, i) => ({
    name: `Episode ${i + 1}`,
    url: 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8' // Sample HLS stream
}));
