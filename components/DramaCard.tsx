import Link from 'next/link';
import Image from 'next/image';
import { Drama } from '@/types';
import { Play } from 'lucide-react';

interface DramaCardProps {
    drama: Drama;
}

export default function DramaCard({ drama }: DramaCardProps) {
    // Use cover or vertical_cover, fallback if missing
    const imageSrc = drama.cover || drama.vertical_cover || 'https://placehold.co/400x600/1e293b/white?text=No+Image';

    return (
        <Link href={`/drama/${drama.bookId}`} className="group relative block w-full aspect-[2/3] rounded-xl overflow-hidden bg-slate-800 transition-all hover:scale-105 hover:shadow-2xl hover:shadow-violet-500/10 hover:z-10 ring-1 ring-white/5">
            <Image
                src={imageSrc}
                alt={drama.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 20vw"
                unoptimized // Add this if external images have issues with Next.js optimization without specific allowed domains
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-transparent to-transparent opacity-80 group-hover:from-violet-950/90 transition-all duration-500" />

            {/* Status Badge */}
            {(drama.status || drama.total_episodes) && (
                <div className="absolute top-3 left-3 flex gap-2 z-20">
                    {drama.status && (
                        <span className="px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-violet-600/80 backdrop-blur-md text-white border border-white/10">
                            {drama.status}
                        </span>
                    )}
                    {drama.total_episodes && (
                        <span className="px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-black/60 backdrop-blur-md text-slate-200 border border-white/5">
                            {drama.total_episodes} EP
                        </span>
                    )}
                </div>
            )}

            {/* Content */}
            <div className="absolute bottom-0 left-0 right-0 p-4 z-20 transition-all duration-300">
                <h3 className="text-white font-bold truncate text-shadow-sm group-hover:text-violet-400 transition-colors mb-1">{drama.title}</h3>
                <div className="flex items-center justify-between">
                    <p className="text-[10px] md:text-xs text-slate-400 truncate opacity-80 group-hover:text-slate-300 transition-colors uppercase tracking-wider font-medium">{drama.category || 'Drama'}</p>
                    {drama.score && (
                        <div className="flex items-center text-[10px] md:text-xs text-yellow-400 font-bold bg-yellow-400/10 px-1.5 py-0.5 rounded border border-yellow-400/20">
                            ★ {drama.score}
                        </div>
                    )}
                </div>
            </div>

            {/* Play Icon on Hover */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-75">
                <div className="bg-violet-600/90 rounded-full p-3 backdrop-blur-sm shadow-lg shadow-violet-600/20 transform scale-50 group-hover:scale-100 transition-transform duration-300">
                    <Play fill="white" size={24} className="text-white ml-0.5" />
                </div>
            </div>
        </Link>
    );
}
