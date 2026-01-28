import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Section from '@/components/Section';
import Footer from '@/components/Footer';
import { getLatestDramas, getTrendingDramas, getDubIndoDramas, getPopularSearch } from '@/lib/api';
import { Drama } from '@/types';

export const revalidate = 3600; // Revalidate every hour

export default async function Home() {
  let trending: Drama[] = [];
  let latest: Drama[] = [];
  let dubIndo: Drama[] = [];
  let popular: Drama[] = [];
  let featured: Drama | null = null;

  try {
    // Sequential fetching to avoid rate limits (429)
    trending = await getTrendingDramas();
    latest = await getLatestDramas();
    dubIndo = await getDubIndoDramas('terpopuler');
    popular = await getPopularSearch();

    // Select a featured drama (prefer trending)
    if (trending.length > 0) {
      featured = trending[0];
    } else if (latest.length > 0) {
      featured = latest[0];
    }
  } catch (error) {
    console.error("Failed to fetch data", error);
  }

  return (
    <main className="min-h-screen bg-[#0f172a] pb-20">
      <Navbar />

      {featured ? (
        <Hero drama={featured} />
      ) : (
        <div className="h-[70vh] flex items-center justify-center text-slate-400 bg-slate-900">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-2">Welcome to CStream</h2>
            {trending.length === 0 && latest.length === 0 ? (
              <p className="text-red-400">Unable to load dramas. Please try again later.</p>
            ) : (
              <p>Loading...</p>
            )}
          </div>
        </div>
      )}

      <div className="relative z-10 -mt-10 md:-mt-24 space-y-4 md:space-y-12 bg-gradient-to-b from-[#0f172a]/0 via-[#0f172a] to-[#0f172a] pt-10">
        <Section title="Trending Now" dramas={trending} link="/trending" />
        <Section title="Latest Releases" dramas={latest} link="/latest" />
        <Section title="Popular Searches" dramas={popular} link="/explore" />
        <Section title="Popular Indo Dub" dramas={dubIndo} link="/dubindo" />
      </div>

      <Footer />
    </main>
  );
}
