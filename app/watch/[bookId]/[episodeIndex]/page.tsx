import { getDramaDetail, getDramaEpisodes } from '@/lib/api';
import Navbar from '@/components/Navbar';
import WatchPlayer from '@/components/WatchPlayer';
import Link from 'next/link';
import { ArrowLeft, ChevronLeft, ChevronRight, List } from 'lucide-react';
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

    const currentEp = episodes[idx];
    const prevEpIdx = idx > 0 ? idx - 1 : null;
    const nextEpIdx = idx < episodes.length - 1 ? idx + 1 : null;

    if (!currentEp) {
        return (
            <div className="min-h-screen bg-slate-950 text-white flex justify-center items-center">
                <div className="text-center">
                    <h1 className="text-3xl font-bold text-red-500 mb-4">Episode Not Found</h1>
                    <Link href={`/drama/${bookId}`} className="text-violet-400 underline">Return to Details</Link>
                </div>
            </div>
        )
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
                        {drama?.title} <span className="text-violet-500 mx-2">|</span> Episode {idx + 1}
                    </h1>
                </div>

                {/* Player Section */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-6">
                        <WatchPlayer
                            url={currentEp.url}
                            poster={drama?.cover}
                            bookId={bookId}
                            currentIndex={idx}
                            totalEpisodes={episodes.length}
                        />

                        <div className="flex items-center justify-between bg-slate-800/50 p-4 rounded-xl border border-white/5">
                            {prevEpIdx !== null ? (
                                <Link href={`/watch/${bookId}/${prevEpIdx}`} className="flex items-center text-white bg-violet-600 hover:bg-violet-700 px-4 py-2 rounded-lg transition-colors font-medium text-sm">
                                    <ChevronLeft size={16} className="mr-1" /> Previous
                                </Link>
                            ) : <div></div>}

                            <span className="text-white font-bold">Ep {idx + 1} of {episodes.length}</span>

                            {nextEpIdx !== null ? (
                                <Link href={`/watch/${bookId}/${nextEpIdx}`} className="flex items-center text-white bg-violet-600 hover:bg-violet-700 px-4 py-2 rounded-lg transition-colors font-medium text-sm">
                                    Next <ChevronRight size={16} className="ml-1" />
                                </Link>
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
                                <Link
                                    key={i}
                                    href={`/watch/${bookId}/${i}`}
                                    className={`
                                        flex items-center justify-center p-3 rounded-lg text-sm font-bold transition-all border
                                        ${i === idx
                                            ? 'bg-violet-600 text-white border-violet-500 ring-2 ring-violet-500/30'
                                            : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700 hover:text-white'}
                                    `}
                                >
                                    {i + 1}
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
