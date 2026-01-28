import Navbar from '@/components/Navbar';
import Section from '@/components/Section';
import Pagination from '@/components/Pagination';
import { getLatestDramas, POPULAR_TAGS, searchDramas } from '@/lib/api';
import { Drama } from '@/types';
import Link from 'next/link';
import Footer from '@/components/Footer';
import { Search } from 'lucide-react';

// export const revalidate = 3600;

export default async function ExplorePage({
    searchParams
}: {
    searchParams: Promise<{ page?: string; tag?: string }>
}) {
    const { page, tag } = await searchParams;
    const currentPage = parseInt(page || '1');

    let dramas: Drama[] = [];
    let title = "Explore All Dramas";
    let subTitle = "Browse our complete collection of short dramas from every genre.";

    try {
        if (tag) {
            dramas = await searchDramas(tag, currentPage);
            title = `Category: ${tag}`;
            subTitle = `Discover the best stories tagged with "${tag}".`;
        } else {
            dramas = await getLatestDramas(currentPage);
        }
    } catch (e) {
        console.error(e);
    }

    return (
        <main className="min-h-screen bg-[#0f172a] pb-20">
            <Navbar />

            {/* Header with gradient */}
            <div className="relative pt-32 pb-8 overflow-hidden">
                <div className="absolute top-0 left-1/4 w-full h-full bg-violet-600/10 blur-[120px] rounded-full mt-[-20%]" />

                <div className="container mx-auto px-4 relative z-10">
                    <div className="max-w-3xl">
                        <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 bg-gradient-to-r from-white via-white to-slate-500 bg-clip-text text-transparent">
                            {title}
                        </h1>
                        <p className="text-slate-400 text-lg md:text-xl">
                            {subTitle}
                        </p>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4">
                {/* Tags/Categories */}
                <div className="mb-12">
                    <h2 className="text-xs font-bold text-slate-500 uppercase tracking-[0.2em] mb-6">Popular Genres</h2>
                    <div className="flex overflow-x-auto pb-4 md:pb-0 md:flex-wrap gap-2.5 scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0">
                        <Link
                            href="/explore"
                            className={`whitespace-nowrap px-5 py-2.5 rounded-full text-sm font-bold transition-all border ${!tag ? 'bg-violet-600 border-violet-500 text-white shadow-lg shadow-violet-600/30' : 'bg-slate-800/50 backdrop-blur-sm border-white/5 text-slate-400 hover:border-violet-500/50 hover:text-white'}`}
                        >
                            All Dramas
                        </Link>
                        {POPULAR_TAGS.map((t) => (
                            <Link
                                key={t}
                                href={`/explore?tag=${encodeURIComponent(t)}`}
                                className={`whitespace-nowrap px-5 py-2.5 rounded-full text-sm font-bold transition-all border ${tag === t ? 'bg-violet-600 border-violet-500 text-white shadow-lg shadow-violet-600/30' : 'bg-slate-800/50 backdrop-blur-sm border-white/5 text-slate-400 hover:border-violet-500/50 hover:text-white'}`}
                            >
                                {t}
                            </Link>
                        ))}
                    </div>
                </div>

                {dramas.length > 0 ? (
                    <div className="mb-12">
                        <Section title="" dramas={dramas} className="!py-0" />
                        <Pagination currentPage={currentPage} hasMore={false} />
                        {/* Note: Pagination disabled for Explore because /latest and /search endpoints do not support pagination properly in the current API version */}
                    </div>
                ) : (
                    <div className="max-w-xl mx-auto text-center py-24 px-8 border border-white/5 rounded-[2.5rem] bg-slate-800/20 backdrop-blur-xl shadow-2xl relative overflow-hidden group">
                        <div className="absolute inset-0 bg-gradient-to-br from-violet-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                        <div className="relative z-10">
                            <div className="bg-slate-800 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-8 border border-white/10 shadow-lg transform group-hover:rotate-12 transition-transform duration-500">
                                <Search size={32} className="text-violet-500" />
                            </div>
                            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Genre empty</h2>
                            <p className="text-slate-400 mb-10 leading-relaxed">
                                We couldn't find any dramas in this category yet.
                                Try exploring other popular genres or check back later.
                            </p>
                            <Link href="/explore" className="inline-flex items-center bg-violet-600 hover:bg-violet-700 text-white px-10 py-4 rounded-full font-bold transition-all shadow-xl shadow-violet-600/30 hover:scale-105 active:scale-95">
                                Clear all filters
                            </Link>
                        </div>
                    </div>
                )}
            </div>
            <Footer />
        </main>
    );
}
