'use client';
import Link from 'next/link';
import { Search, Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const router = useRouter();
    const [query, setQuery] = useState('');

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (query.trim()) {
            router.push(`/search?q=${encodeURIComponent(query)}`);
        }
    };

    return (
        <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'glass py-3' : 'bg-gradient-to-b from-black/80 to-transparent py-5'}`}>
            <div className="container mx-auto px-4 flex items-center justify-between">
                <Link href="/" className="text-2xl font-bold text-white tracking-tighter hover:text-violet-400 transition-colors">
                    C<span className="text-violet-500">Stream</span>
                </Link>

                <div className="hidden lg:flex items-center space-x-10 text-sm font-medium text-slate-300">
                    <Link href="/" className="hover:text-white transition-colors">Home</Link>
                    <Link href="/explore" className="hover:text-white transition-colors">Explore</Link>
                    <Link href="/latest" className="hover:text-white transition-colors">Latest</Link>
                    <Link href="/trending" className="hover:text-white transition-colors">Trending</Link>
                    <Link href="/dubindo" className="hover:text-white transition-colors">Dub Indo</Link>
                </div>

                <div className="flex items-center space-x-4">
                    <form onSubmit={handleSearch} className="hidden sm:flex items-center bg-slate-800/50 rounded-full px-4 py-2 border border-white/10 focus-within:border-violet-500/50 transition-all focus-within:bg-slate-800/80">
                        <Search size={18} className="text-slate-400" />
                        <input
                            type="text"
                            placeholder="Search..."
                            className="bg-transparent border-none outline-none text-sm text-white ml-2 w-32 md:w-48 placeholder-slate-500"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                        />
                    </form>

                    {/* Mobile Menu Toggle */}
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="lg:hidden p-2 text-slate-300 hover:text-white focus:outline-none"
                    >
                        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Navigation Menu */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="lg:hidden bg-slate-900/95 backdrop-blur-xl border-b border-white/10 overflow-hidden"
                    >
                        <div className="container mx-auto px-4 py-8 flex flex-col space-y-6 text-lg font-medium">
                            <Link href="/" onClick={() => setIsMenuOpen(false)} className="text-slate-300 hover:text-violet-400 py-2 border-b border-white/5 transition-colors">Home</Link>
                            <Link href="/explore" onClick={() => setIsMenuOpen(false)} className="text-slate-300 hover:text-violet-400 py-2 border-b border-white/5 transition-colors">Explore</Link>
                            <Link href="/latest" onClick={() => setIsMenuOpen(false)} className="text-slate-300 hover:text-violet-400 py-2 border-b border-white/5 transition-colors">Latest Releases</Link>
                            <Link href="/trending" onClick={() => setIsMenuOpen(false)} className="text-slate-300 hover:text-violet-400 py-2 border-b border-white/5 transition-colors">Trending Now</Link>
                            <Link href="/dubindo" onClick={() => setIsMenuOpen(false)} className="text-slate-300 hover:text-violet-400 py-2 border-b border-white/5 transition-colors">Dub Indo</Link>

                            <form onSubmit={handleSearch} className="flex sm:hidden items-center bg-slate-800/50 rounded-xl px-4 py-3 border border-white/10 mt-4">
                                <Search size={20} className="text-slate-400" />
                                <input
                                    type="text"
                                    placeholder="Search dramas..."
                                    className="bg-transparent border-none outline-none text-white ml-3 w-full"
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                />
                            </form>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}
