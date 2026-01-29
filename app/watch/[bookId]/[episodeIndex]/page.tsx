import { getDramaDetail, getDramaEpisodes } from '@/lib/api';
import WatchClient from '@/components/WatchClient';
import { Drama, Episode } from '@/types';

export default async function WatchPage({ params }: { params: Promise<{ bookId: string; episodeIndex: string }> }) {
    const { bookId, episodeIndex } = await params;
    const idx = parseInt(episodeIndex);

    // Fetch data
    let drama: Drama | null = null;
    let episodes: Episode[] = [];

    try {
        const [detailRes, epsRes] = await Promise.all([
            getDramaDetail(bookId),
            getDramaEpisodes(bookId)
        ]);
        drama = detailRes;
        episodes = Array.isArray(epsRes) ? epsRes : [];
    } catch (e) {
        console.error("Fetch error", e);
    }

    return (
        <WatchClient
            drama={drama}
            episodes={episodes}
            initialIndex={idx}
            bookId={bookId}
        />
    );
}
