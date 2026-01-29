'use client';

import { useState, useCallback, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, ChevronLeft, ChevronRight, List } from 'lucide-react';
import { Drama, Episode } from '@/types';
import WatchPlayer from './WatchPlayer';
import Navbar from './Navbar';

interface WatchClientProps {
    drama: Drama | null;
    episodes: Episode[];
    initialIndex: number;
    bookId: string;
}

export default function WatchClient({ drama, episodes, initialIndex, bookId }: WatchClientProps) {
    const [currentIndex, setCurrentIndex] = useState(initialIndex);

    // Sync state with URL if user navigates via browser buttons
    useEffect(() => {
        const handlePopState = () => {
            const path = window.location.pathname;
            const parts = path.split('/');
            const indexStr = parts[parts.length - 1];
            const index = parseInt(indexStr);
            if (!isNaN(index)) {
                setCurrentIndex(index);
            }
        };

        window.addEventListener('popstate', handlePopState);
        return () => window.removeEventListener('popstate', handlePopState);
    }, []);

    const handleIndexChange = useCallback((newIndex: number) => {
        if (newIndex < 0 || newIndex >= episodes.length) return;

        setCurrentIndex(newIndex);

        // Update URL without full page reload to maintain full screen state
        const newPath = `/watch/${bookId}/${newIndex}`;
        window.history.pushState({ index: newIndex }, '', newPath);

        // Scroll to top of player
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [bookId, episodes.length]);

    // Update document title and scroll active episode into view
    useEffect(() => {
        if (drama) {
            document.title = `${drama.title} - Episode ${currentIndex + 1} | DraBox`;
        }

        // Scroll active episode button into view in the sidebar
        const activeBtn = document.querySelector('.active-episode-btn');
        if (activeBtn) {
            activeBtn.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
        }
    }, [drama, currentIndex]);

    const currentEp = episodes[currentIndex];
    const prevEpIdx = currentIndex > 0 ? currentIndex - 1 : null;
    const nextEpIdx = currentIndex < episodes.length - 1 ? currentIndex + 1 : null;

    if (!currentEp && episodes.length > 0) {
        return (
            <div className="min-h-screen bg-slate-950 text-white flex justify-center items-center">
                <div className="text-center">
                    <h1 className="text-3xl font-bold text-red-500 mb-4">Episode Not Found</h1>
                    <button
                        onClick={() => setCurrentIndex(0)}
                        className="text-violet-400 underline"
                    >
                        Go to Episode 1
                    </button>
                </div>
            </div>
        );
    }

    if (episodes.length === 0) {
        return (
            <div className="min-h-screen bg-slate-950 text-white flex justify-center items-center">
                <div className="text-center">
                    <h1 className="text-3xl font-bold text-red-500 mb-4">No Episodes Found</h1>
                    <Link href={`/drama/${bookId}`} className="text-violet-400 underline">Return to Details</Link>
                </div>
            </div>
        );
    }

    return (
        <main className="min-h-screen bg-[#0f172a] pb-20">
            <Navbar />

            <div className="pt-24 container mx-auto px-4">
                <div className="mb-6 flex items-center justify-between">
                    <Link href={`/drama/${bookId}`} className="flex items-center text-slate-300 hover:text-white transition-colors">
                        <ArrowLeft size={20} className="mr-2" /> Back to Drama
                    </Link>
                    <h1 className="text-lg md:text-xl font-bold text-white truncate max-w-md hidden md:block">
                        {drama?.title} <span className="text-violet-500 mx-2">|</span> Episode {currentIndex + 1}
                    </h1>
                </div>

                {/* Player Section */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-6">
                        <WatchPlayer
                            url={currentEp.url}
                            poster={drama?.cover}
                            bookId={bookId}
                            currentIndex={currentIndex}
                            totalEpisodes={episodes.length}
                            onNextEpisode={() => handleIndexChange(currentIndex + 1)}
                        />

                        <div className="flex items-center justify-between bg-slate-800/50 p-4 rounded-xl border border-white/5">
                            {prevEpIdx !== null ? (
                                <button
                                    onClick={() => handleIndexChange(prevEpIdx)}
                                    className="flex items-center text-white bg-violet-600 hover:bg-violet-700 px-4 py-2 rounded-lg transition-colors font-medium text-sm"
                                >
                                    <ChevronLeft size={16} className="mr-1" /> Previous
                                </button>
                            ) : <div></div>}

                            <span className="text-white font-bold">Ep {currentIndex + 1} of {episodes.length}</span>

                            {nextEpIdx !== null ? (
                                <button
                                    onClick={() => handleIndexChange(nextEpIdx)}
                                    className="flex items-center text-white bg-violet-600 hover:bg-violet-700 px-4 py-2 rounded-lg transition-colors font-medium text-sm"
                                >
                                    Next <ChevronRight size={16} className="ml-1" />
                                </button>
                            ) : <div></div>}
                        </div>

                        <div className="md:hidden block">
                            <h2 className="text-white font-bold mb-2 text-lg">{drama?.title}</h2>
                            <p className="text-slate-400 text-sm line-clamp-3">{drama?.intro}</p>
                        </div>
                    </div>

                    {/* Sidebar / Playlist */}
                    <div className="bg-slate-800/30 border border-white/5 rounded-xl p-4 h-fit max-h-[600px] overflow-y-auto custom-scrollbar">
                        <div className="flex items-center justify-between mb-4 sticky top-0 bg-[#162032] p-2 z-10 rounded-lg">
                            <h3 className="font-bold text-white flex items-center"><List size={18} className="mr-2 text-violet-500" /> Episodes</h3>
                            <span className="text-xs text-slate-400 bg-slate-800 px-2 py-1 rounded">{episodes.length} eps</span>
                        </div>

                        <div className="grid grid-cols-4 md:grid-cols-5 lg:grid-cols-3 gap-2">
                            {episodes.map((ep: Episode, i: number) => (
                                <button
                                    key={i}
                                    onClick={() => handleIndexChange(i)}
                                    className={`
                                        flex items-center justify-center p-3 rounded-lg text-sm font-bold transition-all border
                                        ${i === currentIndex
                                            ? 'bg-violet-600 text-white border-violet-500 ring-2 ring-violet-500/30 active-episode-btn'
                                            : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700 hover:text-white'}
                                    `}
                                >
                                    {i + 1}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
