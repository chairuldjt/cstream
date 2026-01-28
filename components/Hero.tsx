import Link from 'next/link';
import Image from 'next/image';
import { Drama } from '@/types';
import { Play, Info } from 'lucide-react';

interface HeroProps {
    drama: Drama;
}

export default function Hero({ drama }: HeroProps) {
    if (!drama) return null;

    const imageSrc = drama.cover || drama.vertical_cover || '';

    return (
        <div className="relative w-full h-[70vh] md:h-[85vh] overflow-hidden">
            {/* Background Image */}
            <div className="absolute inset-0">
                <Image
                    src={imageSrc}
                    alt={drama.title}
                    fill
                    className="object-cover opacity-60 scale-105 animate-[pulse_10s_ease-in-out_infinite] hover:scale-110 transition-transform duration-[20s]"
                    priority
                    loading="eager"
                    unoptimized
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-[#0f172a]/60 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-r from-[#0f172a] via-[#0f172a]/70 to-transparent" />
            </div>

            <div className="relative container mx-auto px-4 h-full flex items-center">
                <div className="max-w-3xl animate-slide-up space-y-6 pt-20">
                    <span className="inline-block px-3 py-1 text-xs font-bold tracking-wider text-violet-300 uppercase bg-violet-500/20 border border-violet-500/30 rounded-full backdrop-blur-md">
                        Featured Drama
                    </span>
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight drop-shadow-lg">
                        {drama.title}
                    </h1>

                    <div className="flex items-center space-x-4 text-sm md:text-base text-gray-300">
                        {drama.category && <span className="bg-white/10 px-2 py-1 rounded">{drama.category}</span>}
                        {drama.score && <span className="text-yellow-400 font-bold">★ {drama.score}</span>}
                        {drama.status && <span>{drama.status}</span>}
                    </div>

                    <p className="text-slate-300 text-lg md:text-xl line-clamp-3 md:line-clamp-none max-w-2xl drop-shadow-md">
                        {drama.intro || "Experience the drama specially curated for you. Watch in high definition."}
                    </p>

                    <div className="flex flex-wrap gap-4 pt-4">
                        <Link href={`/watch/${drama.bookId}/0`} className="flex items-center gap-2 bg-violet-600 hover:bg-violet-700 text-white px-8 py-3.5 rounded-full font-bold transition-all hover:scale-105 shadow-lg shadow-violet-600/30 group">
                            <Play fill="currentColor" size={20} className="group-hover:mr-1 transition-all" />
                            Start Watching
                        </Link>
                        <Link href={`/drama/${drama.bookId}`} className="flex items-center gap-2 bg-white/5 hover:bg-white/10 text-white border border-white/20 px-8 py-3.5 rounded-full font-bold backdrop-blur-md transition-all hover:border-white/40">
                            <Info size={20} />
                            Details
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
