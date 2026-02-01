"use client";

import { motion } from "framer-motion";

export function MusicPlayer({ spotifyId }: { spotifyId: string }) {
    if (!spotifyId) return null;

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="w-full mt-4 rounded-xl overflow-hidden shadow-lg border border-white/10"
        >
            <iframe
                style={{ borderRadius: "12px" }}
                src={`https://open.spotify.com/embed/playlist/${spotifyId}?utm_source=generator&theme=0`}
                width="100%"
                height="152"
                allowFullScreen
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
                className="bg-transparent"
            />
        </motion.div>
    );
}
