'use client';

import { useRouter } from 'next/navigation';
import { useState, useCallback } from 'react';
import VideoPlayer from './VideoPlayer';

interface WatchPlayerProps {
    url: string;
    poster?: string;
    bookId: string;
    currentIndex: number;
    totalEpisodes: number;
    autoPlayEnabled?: boolean;
    onNextEpisode?: () => void;
}

export default function WatchPlayer({
    url,
    poster,
    bookId,
    currentIndex,
    totalEpisodes,
    autoPlayEnabled = true,
    onNextEpisode
}: WatchPlayerProps) {
    const router = useRouter();
    const [autoPlay, setAutoPlay] = useState(autoPlayEnabled);

    const hasNextEpisode = currentIndex < totalEpisodes - 1;

    const handleVideoEnded = useCallback(() => {
        if (!autoPlay || !hasNextEpisode) return;

        if (onNextEpisode) {
            onNextEpisode();
        } else {
            // Fallback for direct usage
            const nextEpisodeIndex = currentIndex + 1;
            router.push(`/watch/${bookId}/${nextEpisodeIndex}`);
        }
    }, [autoPlay, hasNextEpisode, onNextEpisode, currentIndex, router, bookId]);

    return (
        <div className="relative">
            <VideoPlayer url={url} poster={poster} onEnded={handleVideoEnded} />

            {/* Auto-play toggle */}
            <div className="absolute top-4 right-4 z-20">
                <button
                    onClick={() => setAutoPlay(!autoPlay)}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold transition-all backdrop-blur-md border ${autoPlay
                        ? 'bg-violet-600/80 border-violet-500 text-white'
                        : 'bg-slate-800/80 border-slate-600 text-slate-300'
                        }`}
                >
                    <span className={`w-2 h-2 rounded-full ${autoPlay ? 'bg-green-400' : 'bg-slate-500'}`} />
                    Auto-play {autoPlay ? 'ON' : 'OFF'}
                </button>
            </div>
        </div>
    );
}
