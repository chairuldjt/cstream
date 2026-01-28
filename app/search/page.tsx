import Navbar from '@/components/Navbar';
import Section from '@/components/Section';
import Pagination from '@/components/Pagination';
import Footer from '@/components/Footer';
import { searchDramas } from '@/lib/api';
import { Drama } from '@/types';
import Link from 'next/link';
import { Search } from 'lucide-react';

export default async function SearchPage({
    searchParams
}: {
    searchParams: Promise<{ q: string; page?: string }>
}) {
    const { q, page } = await searchParams;
    const currentPage = parseInt(page || '1');

    let results: Drama[] = [];

    if (q) {
        try {
            results = await searchDramas(q, currentPage);
        } catch (e) {
            console.error("Search error", e);
        }
    }

    return (
        <main className="min-h-screen bg-[#0f172a] pb-20">
            <Navbar />

            <div className="relative pt-32 pb-8 overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full bg-violet-600/10 blur-[120px] rounded-full mt-[-20%]" />

                <div className="container mx-auto px-4 relative z-10">
                    <h1 className="text-3xl md:text-5xl font-bold text-white mb-2">
                        Search Results for <span className="bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">"{q}"</span>
                    </h1>
                    <p className="text-slate-400">Found {results.length} results matching your search query.</p>
                </div>
            </div>

            <div className="container mx-auto px-4">
                {results.length > 0 ? (
                    <div className="mb-12">
                        <Section title="" dramas={results} className="!py-0 animate-fade-in" />
                        <div className="mt-16">
                            <Pagination currentPage={currentPage} hasMore={results.length >= 10} />
                        </div>
                    </div>
                ) : (
                    <div className="max-w-xl mx-auto text-center py-24 px-8 border border-white/5 rounded-[2.5rem] bg-slate-800/20 backdrop-blur-xl shadow-2xl relative overflow-hidden group">
                        <div className="absolute inset-0 bg-gradient-to-br from-violet-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                        <div className="relative z-10">
                            <div className="bg-slate-800 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-8 border border-white/10 shadow-lg transform group-hover:rotate-12 transition-transform duration-500">
                                <Search size={32} className="text-violet-500" />
                            </div>
                            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">No results found</h2>
                            <p className="text-slate-400 mb-10 leading-relaxed">
                                We couldn't find any dramas matching <span className="text-white font-medium">"{q}"</span>.
                                Try using more general keywords or check for typos.
                            </p>
                            <Link href="/explore" className="inline-flex items-center bg-violet-600 hover:bg-violet-700 text-white px-10 py-4 rounded-full font-bold transition-all shadow-xl shadow-violet-600/30 hover:scale-105 active:scale-95">
                                Browse Popular Titles
                            </Link>
                        </div>
                    </div>
                )}
            </div>
            <Footer />
        </main>
    );
}
