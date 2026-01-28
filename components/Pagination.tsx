'use client';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useSearchParams, usePathname } from 'next/navigation';

interface PaginationProps {
    currentPage: number;
    hasMore?: boolean;
}

export default function Pagination({ currentPage, hasMore = true }: PaginationProps) {
    const searchParams = useSearchParams();
    const pathname = usePathname();

    const createPageUrl = (page: number) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set('page', page.toString());
        return `${pathname}?${params.toString()}`;
    };

    return (
        <div className="flex justify-center items-center space-x-4 mt-12 mb-8">
            <Link
                href={createPageUrl(Math.max(1, currentPage - 1))}
                className={`flex items-center px-4 py-2 rounded-lg border transition-colors ${currentPage > 1 ? 'bg-slate-800 border-slate-700 text-white hover:bg-violet-600 hover:border-violet-500' : 'bg-slate-900 border-slate-800 text-slate-600 pointer-events-none'}`}
                aria-disabled={currentPage <= 1}
            >
                <ChevronLeft size={18} className="mr-2" /> Previous
            </Link>

            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-violet-600 text-white font-bold shadow-lg shadow-violet-600/20">
                {currentPage}
            </div>

            <Link
                href={createPageUrl(currentPage + 1)}
                className={`flex items-center px-4 py-2 rounded-lg border transition-colors ${hasMore ? 'bg-slate-800 border-slate-700 text-white hover:bg-violet-600 hover:border-violet-500' : 'bg-slate-900 border-slate-800 text-slate-600 pointer-events-none'}`}
                aria-disabled={!hasMore}
            >
                Next <ChevronRight size={18} className="ml-2" />
            </Link>
        </div>
    );
}
