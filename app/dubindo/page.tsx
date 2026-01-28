import Navbar from '@/components/Navbar';
import Section from '@/components/Section';
import Pagination from '@/components/Pagination';
import Footer from '@/components/Footer';
import { getDubIndoDramas } from '@/lib/api';
import { Drama } from '@/types';
import Link from 'next/link';

export const revalidate = 3600;

export default async function DubIndoPage({ searchParams }: { searchParams: Promise<{ page?: string; classify?: 'terpopuler' | 'terbaru' }> }) {
    const { page, classify } = await searchParams;
    const currentPage = parseInt(page || '1');
    const currentClassify = classify || 'terbaru';

    let dramas: Drama[] = [];
    try {
        dramas = await getDubIndoDramas(currentClassify, currentPage);
    } catch (e) {
        console.error(e);
    }

    return (
        <main className="min-h-screen bg-[#0f172a] pb-20">
            <Navbar />

            {/* Header with gradient */}
            <div className="relative pt-32 pb-12 overflow-hidden">
                <div className="absolute top-0 right-1/4 w-full h-full bg-violet-600/10 blur-[120px] rounded-full mt-[-20%]" />

                <div className="container mx-auto px-4 relative z-10">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                        <div className="max-w-2xl">
                            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 bg-gradient-to-r from-white via-white to-slate-500 bg-clip-text text-transparent">
                                Indonesian Dubbed
                            </h1>
                            <p className="text-slate-400 text-lg md:text-xl">
                                Enjoy your favorite short dramas with Indonesian audio. Better immersion, better experience.
                            </p>
                        </div>

                        <div className="flex bg-slate-800/50 backdrop-blur-md p-1.5 rounded-xl border border-white/5 shadow-xl">
                            <Link
                                href="?classify=terbaru"
                                className={`px-6 py-2.5 rounded-lg text-sm font-bold transition-all ${currentClassify === 'terbaru' ? 'bg-violet-600 text-white shadow-lg shadow-violet-600/20' : 'text-slate-400 hover:text-white'}`}
                            >
                                Terbaru
                            </Link>
                            <Link
                                href="?classify=terpopuler"
                                className={`px-6 py-2.5 rounded-lg text-sm font-bold transition-all ${currentClassify === 'terpopuler' ? 'bg-violet-600 text-white shadow-lg shadow-violet-600/20' : 'text-slate-400 hover:text-white'}`}
                            >
                                Terpopuler
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4">
                <div className="mb-12">
                    <Section title="" dramas={dramas} className="!py-0" />
                </div>

                {dramas.length > 0 && (
                    <Pagination currentPage={currentPage} hasMore={dramas.length >= 10} />
                )}
            </div>
            <Footer />
        </main>
    )
}
