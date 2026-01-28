import Navbar from '@/components/Navbar';
import Section from '@/components/Section';
import Pagination from '@/components/Pagination';
import Footer from '@/components/Footer';
import { getTrendingDramas } from '@/lib/api';
import { Drama } from '@/types';

export const revalidate = 3600;

export default async function TrendingPage({ searchParams }: { searchParams: Promise<{ page?: string }> }) {
    const { page } = await searchParams;
    const currentPage = parseInt(page || '1');

    let dramas: Drama[] = [];
    try {
        dramas = await getTrendingDramas(currentPage);
    } catch (e) {
        console.error(e);
    }

    return (
        <main className="min-h-screen bg-[#0f172a] pb-20">
            <Navbar />

            {/* Header with gradient */}
            <div className="relative pt-32 pb-12 overflow-hidden">
                <div className="absolute top-0 right-1/2 translate-x-1/2 w-full h-full bg-violet-600/10 blur-[120px] rounded-full mt-[-20%]" />

                <div className="container mx-auto px-4 relative z-10">
                    <div className="max-w-2xl">
                        <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 bg-gradient-to-r from-white via-white to-slate-500 bg-clip-text text-transparent">
                            Trending Now
                        </h1>
                        <p className="text-slate-400 text-lg md:text-xl">
                            The hottest short dramas everyone is talking about. Discover the most popular stories right now.
                        </p>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4">
                <div className="mb-12">
                    <Section title="" dramas={dramas} className="!py-0" />
                </div>

                {dramas.length > 0 && (
                    <Pagination currentPage={currentPage} hasMore={false} />
                    /* Note: Pagination disabled because /trending endpoint does not support it properly */
                )}
            </div>
            <Footer />
        </main>
    )
}
