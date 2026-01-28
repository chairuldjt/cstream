import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="bg-slate-900/30 backdrop-blur-xl border-t border-white/5 pt-20 pb-10">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
                    <div className="md:col-span-2">
                        <Link href="/" className="text-3xl font-bold text-white tracking-tighter hover:text-violet-400 transition-colors inline-block mb-6">
                            DRA<span className="text-violet-500">BOX</span>
                        </Link>
                        <p className="text-slate-400 max-w-sm leading-relaxed mb-6">
                            The ultimate destination for the best short dramas from across the globe, specially curated for your entertainment. Watch anytime, anywhere.
                        </p>
                        <div className="flex space-x-4">
                            {/* Social Icons Placeholder */}
                            {[1, 2, 3, 4].map(i => (
                                <div key={i} className="w-10 h-10 rounded-full bg-slate-800 border border-white/5 flex items-center justify-center hover:bg-violet-600 hover:text-white transition-all cursor-pointer">
                                    <div className="w-4 h-4 bg-current rounded-sm opacity-50" />
                                </div>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h4 className="text-white font-bold mb-6 uppercase tracking-widest text-xs">Categories</h4>
                        <ul className="space-y-4 text-sm">
                            <li><Link href="/explore" className="text-slate-400 hover:text-violet-400 transition-colors">All Dramas</Link></li>
                            <li><Link href="/trending" className="text-slate-400 hover:text-violet-400 transition-colors">Trending Now</Link></li>
                            <li><Link href="/latest" className="text-slate-400 hover:text-violet-400 transition-colors">New Releases</Link></li>
                            <li><Link href="/dubindo" className="text-slate-400 hover:text-violet-400 transition-colors">Indonesian Dub</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-white font-bold mb-6 uppercase tracking-widest text-xs">Support</h4>
                        <ul className="space-y-4 text-sm">
                            <li><a href="#" className="text-slate-400 hover:text-violet-400 transition-colors">Privacy Policy</a></li>
                            <li><a href="#" className="text-slate-400 hover:text-violet-400 transition-colors">Terms of Service</a></li>
                            <li><a href="#" className="text-slate-400 hover:text-violet-400 transition-colors">DMCA Notice</a></li>
                            <li><a href="#" className="text-slate-400 hover:text-violet-400 transition-colors">Contact Us</a></li>
                        </ul>
                    </div>
                </div>

                <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
                    <p className="text-slate-500 text-xs mt-4 md:mt-0">
                        &copy; {new Date().getFullYear()} CStream. Crafted with passion for drama lovers.
                    </p>
                    <div className="text-center md:text-right text-slate-600 text-[10px] max-w-md leading-tight">
                        All content is provided by non-affiliated third parties. CStream does not store any files on its own servers.
                    </div>
                </div>
            </div>
        </footer>
    );
}
