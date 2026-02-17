"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useAuth } from "@/lib/auth-context";
import { supabase } from "@/lib/supabase";

export default function DashboardCountdown() {
    const { isAdmin } = useAuth();
    // Default 10 hours in seconds
    const INITIAL_DURATION = 10 * 60 * 60;

    const [timeLeft, setTimeLeft] = useState(INITIAL_DURATION);
    const [isActive, setIsActive] = useState(false);
    const [targetTime, setTargetTime] = useState<number | null>(null);

    // Fetch and Subscribe
    useEffect(() => {
        const fetchConfig = async () => {
            const { data, error } = await supabase.from('app_config').select('*').in('key', ['countdown_target', 'countdown_active']);

            if (error) {
                console.error('Error fetching countdown:', error);
                return;
            }

            const activeRow = data?.find(r => r.key === 'countdown_active');
            const targetRow = data?.find(r => r.key === 'countdown_target');

            const active = activeRow?.value === 'true';
            const target = targetRow?.value ? parseInt(targetRow.value) : null;

            setIsActive(active);
            setTargetTime(target);

            // Immediate update if active
            if (active && target) {
                const now = Date.now();
                const diff = Math.max(0, Math.floor((target - now) / 1000));
                setTimeLeft(diff);
            } else {
                setTimeLeft(INITIAL_DURATION);
            }
        };

        fetchConfig();

        const channel = supabase
            .channel('realtime_countdown')
            .on('postgres_changes', { event: '*', schema: 'public', table: 'app_config' }, () => {
                fetchConfig();
            })
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, []);

    // Timer Interval
    useEffect(() => {
        let interval: NodeJS.Timeout;

        if (isActive && targetTime) {
            interval = setInterval(() => {
                const now = Date.now();
                const diff = Math.max(0, Math.floor((targetTime - now) / 1000));
                setTimeLeft(diff);

                if (diff <= 0) {
                    setIsActive(false);
                }
            }, 1000);
        } else if (!isActive) {
            // Reset to 10h if not active (or whatever default)
            // setTimeLeft(INITIAL_DURATION); 
        }

        return () => clearInterval(interval);
    }, [isActive, targetTime]);


    const handleStart = async () => {
        const target = Date.now() + (INITIAL_DURATION * 1000);

        await supabase.from('app_config').upsert([
            { key: 'countdown_target', value: target.toString() },
            { key: 'countdown_active', value: 'true' }
        ]);
    };

    const handleReset = async () => {
        await supabase.from('app_config').upsert([
            { key: 'countdown_active', value: 'false' },
            // Optional: reset target, but 'active' flag controls visibility/logic
        ]);
        setTimeLeft(INITIAL_DURATION);
    };

    const hours = Math.floor(timeLeft / 3600);
    const minutes = Math.floor((timeLeft % 3600) / 60);
    const seconds = timeLeft % 60;

    return (
        <div className="flex flex-col items-center text-center">
            <div className="bg-[#1a0b0b]/60 border border-[#f42525]/30 p-8 md:p-12 rounded-3xl backdrop-blur-xl shadow-[0_0_50px_rgba(244,37,37,0.15)] relative w-full max-w-2xl">
                {/* Decorative Corners */}
                <div className="absolute top-0 left-0 size-8 border-t-2 border-l-2 border-[#f42525] rounded-tl-3xl"></div>
                <div className="absolute top-0 right-0 size-8 border-t-2 border-r-2 border-[#f42525] rounded-tr-3xl"></div>
                <div className="absolute bottom-0 left-0 size-8 border-b-2 border-l-2 border-[#f42525] rounded-bl-3xl"></div>
                <div className="absolute bottom-0 right-0 size-8 border-b-2 border-r-2 border-[#f42525] rounded-br-3xl"></div>

                <h1 className="text-[#f42525] text-sm font-black tracking-[0.4em] uppercase mb-2 glow-red">Hackathon Commencing</h1>
                <h2 className="text-white text-3xl md:text-4xl font-black mb-8 leading-none tracking-tighter">
                    SABOTAGE IN PROGRESS: <br />
                    <span className="text-[#f42525]/90">TIME TO FIX IT</span>
                </h2>

                {/* Large Digital Timer */}
                <div className="flex gap-4 md:gap-6 justify-center items-end py-4">
                    <TimeUnit value={hours} label="Hours" />
                    <Separator />
                    <TimeUnit value={minutes} label="Minutes" />
                    <Separator />
                    <TimeUnit value={seconds} label="Seconds" />
                </div>

                <p className="mt-8 text-[#f42525]/60 text-xs font-bold uppercase tracking-[0.2em] animate-pulse">
                    Time until total system collapse
                </p>
            </div>

            {isAdmin && (
                <div className="mt-12 flex gap-4 w-full justify-center">
                    <button
                        onClick={handleStart}
                        className="bg-[#f42525] hover:bg-red-700 text-white font-black px-8 py-4 rounded-xl text-sm uppercase tracking-widest transition-all shadow-xl flex items-center gap-3"
                    >
                        <span className="material-symbols-outlined">rocket_launch</span>
                    </button>
                    <button
                        onClick={handleReset}
                        className="bg-white/5 hover:bg-white/10 border border-white/20 text-white font-black px-8 py-4 rounded-xl text-sm uppercase tracking-widest transition-all flex items-center gap-3"
                    >
                        <span className="material-symbols-outlined">restart_alt</span>
                    </button>
                </div>
            )}

            <style jsx global>{`
        .glow-red {
          text-shadow: 0 0 15px rgba(244, 37, 37, 0.6);
        }
      `}</style>
        </div>
    );
}

function TimeUnit({ value, label }: { value: number; label: string }) {
    return (
        <div className="flex flex-col items-center">
            <div className="bg-[#f42525]/5 border border-[#f42525]/20 w-20 md:w-28 h-24 md:h-32 rounded-xl flex items-center justify-center shadow-inner relative overflow-hidden">
                <div className="absolute inset-x-0 h-[1px] bg-[#f42525]/20 top-1/2"></div>
                <motion.span
                    key={value}
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -10, opacity: 0 }}
                    className="text-4xl md:text-6xl font-black text-[#f42525] glow-red z-10"
                >
                    {value.toString().padStart(2, "0")}
                </motion.span>
            </div>
            <span className="text-[10px] font-bold uppercase tracking-widest mt-3 text-white/40">{label}</span>
        </div>
    );
}

function Separator() {
    return <span className="text-4xl md:text-6xl font-black text-[#f42525]/30 mb-8">:</span>;
}
