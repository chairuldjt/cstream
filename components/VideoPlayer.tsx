'use client';
import { useEffect, useRef, useState } from 'react';
import Hls from 'hls.js';

interface VideoPlayerProps {
    url: string;
    poster?: string;
    onEnded?: () => void;
}

export default function VideoPlayer({ url, poster, onEnded }: VideoPlayerProps) {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isIframe, setIsIframe] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (!url) return;

        // Heuristic to detect if it's likely a stream file or an embed page
        const isM3U8 = url.toLowerCase().includes('.m3u8');
        const isMP4 = url.toLowerCase().includes('.mp4');
        const isWebM = url.toLowerCase().includes('.webm');

        // If it doesn't look like a direct video file, treat as iframe (embed)
        if (!isM3U8 && !isMP4 && !isWebM) {
            setIsIframe(true);
            return;
        }

        setIsIframe(false);
        const video = videoRef.current;
        if (!video) return;

        if (Hls.isSupported() && isM3U8) {
            const hls = new Hls();
            hls.loadSource(url);
            hls.attachMedia(video);
            hls.on(Hls.Events.MANIFEST_PARSED, () => {
                video.play().catch(() => console.log('Autoplay blocked'));
            });
            return () => hls.destroy();
        } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
            // Native HLS support (Safari)
            video.src = url;
        } else {
            // Standard video
            video.src = url;
        }
    }, [url]);

    if (isIframe) {
        return (
            <div className="relative w-full aspect-video bg-slate-900 rounded-xl overflow-hidden shadow-2xl ring-1 ring-white/10 group">
                {isLoading && (
                    <div className="absolute inset-0 flex items-center justify-center z-10 bg-slate-900">
                        <div className="w-12 h-12 border-4 border-violet-500/20 border-t-violet-500 rounded-full animate-spin" />
                    </div>
                )}
                <iframe
                    src={url}
                    className="w-full h-full border-none"
                    allowFullScreen
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    onLoad={() => setIsLoading(false)}
                />
            </div>
        )
    }

    return (
        <div className="relative w-full aspect-video bg-slate-900 rounded-xl overflow-hidden shadow-2xl ring-1 ring-white/10 group">
            {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center z-10 bg-slate-900">
                    <div className="w-12 h-12 border-4 border-violet-500/20 border-t-violet-500 rounded-full animate-spin" />
                </div>
            )}
            <video
                ref={videoRef}
                controls
                poster={poster}
                className="w-full h-full object-contain"
                playsInline
                autoPlay
                onLoadStart={() => setIsLoading(true)}
                onCanPlay={() => setIsLoading(false)}
                onWaiting={() => setIsLoading(true)}
                onPlaying={() => setIsLoading(false)}
                onEnded={onEnded}
            />
        </div>
    );
}
