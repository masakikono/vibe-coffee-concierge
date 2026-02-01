"use client";

import { CoffeeBean } from "@/lib/types";
import { motion } from "framer-motion";
import { Music, Thermometer, Droplets, Clock, Sparkles } from "lucide-react";
import { MusicPlayer } from "./MusicPlayer";

export function CoffeeCard({ bean }: { bean: CoffeeBean }) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, type: "spring", stiffness: 80, damping: 20 }}
            className="max-w-3xl w-full bg-white/5 backdrop-blur-2xl shadow-[0_8px_32px_rgba(0,0,0,0.3)] rounded-3xl overflow-hidden border border-white/10 text-white"
        >
            <div className="p-8 md:p-12 relative">
                {/* Glow effect */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/20 rounded-full blur-[100px] pointer-events-none" />

                <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 relative z-10">
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <span className="text-xs font-medium tracking-[0.2em] text-blue-200 uppercase flex items-center gap-1">
                                <Sparkles size={12} /> Perfect Match
                            </span>
                        </div>
                        <h2 className="text-4xl md:text-5xl font-semibold tracking-tight leading-tight mb-2">
                            {bean.name}
                        </h2>
                        <p className="text-white/60 text-lg font-light tracking-wide">{bean.origin}</p>
                    </div>
                    <div className="mt-4 md:mt-0">
                        <span className="inline-block px-4 py-1.5 bg-white/10 backdrop-blur-md border border-white/20 text-white/90 text-xs font-medium tracking-wider rounded-full shadow-inner">
                            {bean.roast_level}
                        </span>
                    </div>
                </div>

                <p className="text-lg md:text-xl text-white/90 leading-relaxed font-light mb-10 border-l border-white/20 pl-6">
                    {bean.description}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-10 border-t border-white/10 pt-8">
                    {/* Flavor Profile */}
                    <div>
                        <h3 className="text-xs uppercase tracking-widest text-white/40 mb-5 font-semibold">フレーバープロファイル</h3>
                        <ul className="space-y-4">
                            <ProfileBar label="酸味" value={bean.flavor_profile.acidity} />
                            <ProfileBar label="コク" value={bean.flavor_profile.body} />
                            <ProfileBar label="甘み" value={bean.flavor_profile.sweetness} />
                        </ul>
                        <div className="mt-6 flex flex-wrap gap-2">
                            {bean.flavor_profile.notes.map(note => (
                                <span key={note} className="text-xs text-white/80 bg-white/10 px-3 py-1.5 rounded-lg border border-white/5">
                                    {note}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Brewing Recipe */}
                    <div>
                        <h3 className="text-xs uppercase tracking-widest text-white/40 mb-5 font-semibold">ブリューイングレシピ</h3>
                        <div className="space-y-4">
                            <div className="flex items-center gap-4 group">
                                <div className="p-2.5 bg-white/5 rounded-full group-hover:bg-white/10 transition-colors">
                                    <Thermometer size={18} className="text-blue-200" />
                                </div>
                                <div>
                                    <span className="text-xs text-white/40 block uppercase tracking-wider">Temp</span>
                                    <span className="font-medium text-lg">{bean.brewing_recipe.water_temp}</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-4 group">
                                <div className="p-2.5 bg-white/5 rounded-full group-hover:bg-white/10 transition-colors">
                                    <Clock size={18} className="text-blue-200" />
                                </div>
                                <div>
                                    <span className="text-xs text-white/40 block uppercase tracking-wider">Speed</span>
                                    <span className="font-medium text-lg">{bean.brewing_recipe.pour_speed}</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-4 group">
                                <div className="p-2.5 bg-white/5 rounded-full group-hover:bg-white/10 transition-colors">
                                    <Droplets size={18} className="text-blue-200" />
                                </div>
                                <div>
                                    <span className="text-xs text-white/40 block uppercase tracking-wider">Method</span>
                                    <span className="font-medium text-lg">{bean.brewing_recipe.method}</span>
                                </div>
                            </div>

                            <div className="mt-4 p-4 bg-blue-900/20 border border-blue-500/20 rounded-xl text-sm text-blue-100/80 leading-relaxed">
                                {bean.brewing_recipe.notes}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Music Pairing */}
                <div className="bg-black/20 backdrop-blur-md p-6 rounded-2xl border border-white/5">
                    <div className="flex items-center gap-3 mb-2">
                        <Music size={16} className="text-white/60" />
                        <p className="text-xs text-white/60 uppercase tracking-widest font-semibold">Music Pairing</p>
                    </div>
                    <p className="text-lg font-medium text-white mb-2">{bean.music_pairing}</p>
                    {bean.spotify_id && <MusicPlayer spotifyId={bean.spotify_id} />}
                </div>
            </div>
        </motion.div>
    );
}

function ProfileBar({ label, value }: { label: string; value: number }) {
    return (
        <div className="flex items-center gap-4">
            <span className="w-12 text-sm text-white/70 font-medium">{label}</span>
            <div className="flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden backdrop-blur-sm">
                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(value / 5) * 100}%` }}
                    transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
                    className="h-full bg-gradient-to-r from-blue-400 to-indigo-400 rounded-full"
                />
            </div>
        </div>
    );
}
