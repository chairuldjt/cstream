import { Drama } from '@/types';
import DramaCard from './DramaCard';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

interface SectionProps {
    title: string;
    dramas: Drama[];
    link?: string;
    className?: string;
}

export default function Section({ title, dramas, link, className = '' }: SectionProps) {
    if (!dramas || dramas.length === 0) return null;

    return (
        <section className={`py-8 animate-slide-up ${className}`}>
            <div className="container mx-auto px-4">
                {title && (
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h2 className="text-xl md:text-3xl font-bold text-white tracking-tight">{title}</h2>
                            <div className="h-1 w-12 bg-violet-500 rounded-full mt-2 transition-all group-hover:w-24 duration-500" />
                        </div>
                        {link && (
                            <Link href={link} className="flex items-center text-xs md:text-sm font-bold text-violet-400 hover:text-white transition-all bg-violet-500/10 hover:bg-violet-600 px-4 py-2 rounded-full border border-violet-500/20 group">
                                View Selection <ChevronRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
                            </Link>
                        )}
                    </div>
                )}

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
                    {dramas.map((drama) => (
                        <DramaCard key={drama.bookId} drama={drama} />
                    ))}
                </div>
            </div>
        </section>
    );
}
