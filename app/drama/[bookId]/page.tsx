import { getDramaDetail, getDramaEpisodes } from '@/lib/api';
import Navbar from '@/components/Navbar';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Star, Clock, Calendar, PlayCircle } from 'lucide-react';

interface Episode {
    name: string;
    url: string;
}

export default async function DramaPage({ params }: { params: Promise<{ bookId: string }> }) {
    const { bookId } = await params;

    let drama = null;
    let episodes: Episode[] = [];

    try {
        const detailRes = await getDramaDetail(bookId);
        const epsRes = await getDramaEpisodes(bookId);

        drama = detailRes;
        episodes = Array.isArray(epsRes) ? epsRes : [];
    } catch (e) {
        console.error(e);
    }

    if (!drama) {
        return (
            <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-bold mb-4">Drama Not Found</h1>
                    <Link href="/" className="text-violet-400 hover:underline">Back to Home</Link>
                </div>
            </div>
        )
    }

    const imageSrc = drama.cover || drama.vertical_cover || '';

    return (
        <main className="min-h-screen bg-[#0f172a] pb-20">
            <Navbar />

            {/* Backdrop Header */}
            <div className="relative h-[50vh] md:h-[60vh] overflow-hidden">
                <div className="absolute inset-0">
                    <Image
                        src={imageSrc}
                        alt={drama.title}
                        fill
                        className="object-cover opacity-30 blur-xl scale-110"
                        unoptimized
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-[#0f172a]/50 to-transparent" />
                </div>
            </div>

            <div className="container mx-auto px-4 relative z-10 -mt-64 md:-mt-80">
                <div className="flex justify-between items-center mb-6">
                    <Link href="/" className="inline-flex items-center text-slate-300 hover:text-white transition-all hover:-translate-x-1 backdrop-blur-md bg-white/5 hover:bg-white/10 px-4 py-2 rounded-full border border-white/10">
                        <ArrowLeft size={18} className="mr-2" /> Back
                    </Link>
                    <div className="flex gap-2">
                        {/* Share placeholder */}
                        <button className="p-2.5 rounded-full bg-white/5 border border-white/10 text-slate-300 hover:text-white hover:bg-white/10 transition-all">
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" /><polyline points="16 6 12 2 8 6" /><line x1="12" y1="2" x2="12" y2="15" /></svg>
                        </button>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row gap-8 lg:gap-12">
                    {/* Poster */}
                    <div className="w-full md:w-1/3 lg:w-1/4 shrink-0">
                        <div className="relative aspect-[2/3] rounded-xl overflow-hidden shadow-2xl shadow-violet-500/20 ring-1 ring-white/10 group">
                            <Image
                                src={imageSrc}
                                alt={drama.title}
                                fill
                                className="object-cover"
                                unoptimized
                            />
                            {/* Play button overlay */}
                            {episodes.length > 0 && (
                                <Link href={`/watch/${bookId}/0`} className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <div className="bg-violet-600 rounded-full p-4 scale-75 group-hover:scale-100 transition-transform">
                                        <PlayCircle size={48} className="text-white" fill="white" />
                                    </div>
                                </Link>
                            )}
                        </div>
                    </div>

                    {/* Info */}
                    <div className="flex-1 text-white pt-4 md:pt-12">
                        <h1 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">{drama.title}</h1>

                        <div className="flex flex-wrap items-center gap-4 text-sm text-slate-300 mb-6">
                            {drama.score && (
                                <div className="flex items-center text-yellow-400 font-bold bg-yellow-500/10 px-3 py-1 rounded-full border border-yellow-500/20">
                                    <Star size={16} className="mr-1" fill="currentColor" /> {drama.score}
                                </div>
                            )}
                            {drama.category && <span className="bg-slate-800 px-3 py-1 rounded-full border border-slate-700">{drama.category}</span>}
                            {drama.status && <span className="bg-green-500/10 text-green-400 px-3 py-1 rounded-full border border-green-500/20">{drama.status}</span>}
                        </div>

                        <div className="prose prose-invert max-w-none mb-8">
                            <h3 className="text-xl font-bold mb-2 text-violet-300">Synopsis</h3>
                            <p className="text-slate-300 leading-relaxed text-lg">
                                {drama.intro || "No synopsis available for this drama."}
                            </p>
                        </div>

                        {/* Actions */}
                        <div className="flex gap-4">
                            {episodes.length > 0 ? (
                                <Link href={`/watch/${bookId}/0`} className="bg-violet-600 hover:bg-violet-700 text-white px-8 py-3 rounded-xl font-bold transition-all shadow-lg shadow-violet-600/30">
                                    Watch Episode 1
                                </Link>
                            ) : (
                                <button disabled className="bg-slate-700 text-slate-400 px-8 py-3 rounded-xl font-bold cursor-not-allowed">
                                    No Episodes Available
                                </button>
                            )}
                        </div>
                    </div>
                </div>

                {/* Episode List */}
                <div className="mt-24">
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="text-2xl md:text-3xl font-bold text-white flex items-center">
                            <span className="w-2 h-8 bg-violet-600 rounded-full mr-4" />
                            Episodes Listing
                        </h2>
                        <span className="bg-slate-800 text-slate-400 px-4 py-1.5 rounded-full text-xs font-bold border border-white/5">
                            {episodes.length} EPISODES
                        </span>
                    </div>

                    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10 gap-3">
                        {episodes.map((ep, index) => (
                            <Link
                                key={index}
                                href={`/watch/${bookId}/${index}`}
                                className="group relative aspect-square flex flex-col items-center justify-center bg-slate-800/40 hover:bg-violet-600 p-2 rounded-2xl border border-white/5 hover:border-violet-400 transition-all duration-300 shadow-lg hover:shadow-violet-600/20"
                            >
                                <span className="text-white font-black text-xl md:text-2xl group-hover:scale-125 transition-transform duration-300">{index + 1}</span>
                                <span className="text-[10px] text-slate-500 font-bold uppercase tracking-tighter mt-1 group-hover:text-violet-200">Ep</span>

                                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <PlayCircle size={12} className="text-white" fill="white" />
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </main>
    );
}
