"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export type SpecialStatement = {
    id: string;
    code: string;
    title: string;
    organization: string;
    category: string;
    description: string;
    expectedSolution: string[];
    expectedOutcome: string;
};

interface ProblemGridProps {
    problems: SpecialStatement[];
}

// Among Us Character SVG Component
const AmongUsCharacter = ({ color = "#f42525" }: { color?: string }) => (
    <svg className="w-24 h-24 drop-shadow-2xl mx-auto animate-[float_6s_ease-in-out_infinite]" viewBox="0 0 200 200">
        <path
            d="M60,180 C40,180 30,160 30,130 L30,80 C30,30 60,10 100,10 C140,10 170,30 170,80 L170,130 C170,160 160,180 140,180 C130,180 125,170 125,150 L75,150 C75,170 70,180 60,180 Z"
            fill={color}
            stroke="black"
            strokeWidth="8"
        />
        <path
            d="M170,80 C185,80 195,90 195,110 C195,130 185,140 170,140"
            fill={color}
            opacity="0.7"
            stroke="black"
            strokeWidth="8"
        />
        <ellipse
            cx="120"
            cy="70"
            fill="#9bd2e6"
            rx="35"
            ry="20"
            stroke="black"
            strokeWidth="6"
        />
        <path
            d="M100,60 Q110,60 120,65"
            fill="none"
            opacity="0.8"
            stroke="white"
            strokeWidth="3"
        />
    </svg>
);

// Color palette for characters
const crewColors = ["#f42525", "#38fedc", "#50ef39", "#f5f557"];

export default function Specialps({ problems }: ProblemGridProps) {
    const [selected, setSelected] = useState<SpecialStatement | null>(null);

    // ESC close
    useEffect(() => {
        const handleKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") setSelected(null);
        };
        window.addEventListener("keydown", handleKey);
        return () => window.removeEventListener("keydown", handleKey);
    }, []);

    // Lock scroll
    useEffect(() => {
        if (selected) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }
    }, [selected]);

    return (
        <div className="relative min-h-screen text-white overflow-hidden">
            {/* Space Background with Stars */}
            <div className="absolute inset-0 pointer-events-none">
                <div
                    className="absolute inset-0 opacity-80 animate-[pulse_4s_cubic-bezier(0.4,0,0.6,1)_infinite]"
                    style={{
                        backgroundImage: `radial-gradient(white, rgba(255,255,255,.2) 2px, transparent 3px), radial-gradient(white, rgba(255,255,255,.15) 1px, transparent 2px), radial-gradient(white, rgba(255,255,255,.1) 2px, transparent 3px)`,
                        backgroundSize: '550px 550px, 350px 350px, 250px 250px',
                        backgroundPosition: '0 0, 40px 60px, 130px 270px'
                    }}
                />
            </div>

            <div className="relative z-10 max-w-6xl mx-auto px-6 py-20">
                {/* Animated Title Header */}
                <div className="text-center mb-12 ">
                    <div className="inline-block px-6 py-2 bg-[#f42525]/20 border-2 border-[#f42525] rounded-full mb-4 shadow-[0_0_15px_rgba(244,37,37,0.5)]">
                        <span className="text-[#f42525] font-bold tracking-widest uppercase flex items-center justify-center gap-2">
                            <span className="w-3 h-3 bg-[#f42525] rounded-full animate-ping"></span>
                            MISSION DETAILS ARE HERE
                        </span>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight drop-shadow-xl">
                        SPECIAL <span className="text-transparent bg-clip-text bg-white">TASK</span>
                    </h1>
                    <h2 className="text-4xl md:text-4xl mt-8 font-bold text-blue-500 tracking-tight drop-shadow-xl">
                        PRIZE POOL FOR THIS PS IS 400$
                    </h2>
                </div>

                {/* Enhanced 2x2 GRID with Among Us Characters */}
                <div className="flex flex-wrap justify-center mt-40 gap-6 sm:gap-8">
                    {problems.map((problem) => (
                        <motion.div
                            key={problem.id}
                            whileHover={{ scale: 1.05, y: -5 }}
                            onClick={() => setSelected(problem)}
                            className="cursor-pointer group relative w-full sm:w-[45%] lg:w-[30%] max-w-sm"
                        >
                            <div
                                className="
          p-4 sm:p-6
          rounded-xl
          bg-gradient-to-br from-[#1e293b]/70 to-[#0f172a]/90
          backdrop-blur-xl
          border-2 border-white/10
          hover:border-[#f42525]
          hover:shadow-[0_0_30px_rgba(244,37,37,0.6)]
          transition-all duration-300
          relative overflow-hidden
        "
                            >
                                {/* CRT Effect Overlay */}
                                <div
                                    className="absolute inset-0 pointer-events-none opacity-20"
                                    style={{
                                        background:
                                            "linear-gradient(rgba(18,16,16,0) 50%, rgba(0,0,0,0.25) 50%), linear-gradient(90deg, rgba(255,0,0,0.06), rgba(0,255,0,0.02), rgba(0,0,255,0.06))",
                                        backgroundSize: "100% 2px, 3px 100%",
                                    }}
                                />

                                {/* Content */}
                                <div className="relative z-10">

                                    <div className="text-[10px] sm:text-xs text-[#f42525] font-bold tracking-widest mb-1 sm:mb-2 uppercase">
                                        {problem.code}
                                    </div>

                                    {/* Title + Mobile Right Stack */}
                                    <div className="flex justify-between items-start gap-3">

                                        <h2
                                            className="
        text-sm sm:text-xl
        font-bold
        text-white
        group-hover:text-[#38fedc]
        transition-colors
        leading-snug
        max-w-[60%] sm:max-w-full
      "
                                        >
                                            {problem.title}
                                        </h2>

                                        {/* Mobile right-side stack */}
                                        <div className="flex flex-col items-end gap-1 sm:hidden text-right">
                                            <span className="px-2 py-1 text-[9px] bg-red-900/40 border border-red-500 text-red-400 rounded font-bold uppercase whitespace-nowrap">
                                                {problem.category}
                                            </span>
                                            <span className="px-2 py-1 text-[9px] bg-blue-900/40 border border-blue-500 text-blue-400 rounded font-bold uppercase whitespace-nowrap">
                                                {problem.organization}
                                            </span>
                                        </div>

                                    </div>

                                    {/* Desktop badges (original layout) */}
                                    <div className="hidden sm:flex flex-wrap gap-2 mt-3">
                                        <span className="px-3 py-1 text-xs bg-red-900/40 border border-red-500 text-red-400 rounded font-bold uppercase">
                                            {problem.category}
                                        </span>
                                        <span className="px-3 py-1 text-xs bg-blue-900/40 border border-blue-500 text-blue-400 rounded font-bold uppercase">
                                            {problem.organization}
                                        </span>
                                    </div>

                                </div>

                            </div>
                        </motion.div>
                    ))}
                </div>


            </div>

            {/* MODAL */}
            <AnimatePresence>
                {selected && (
                    <TaskModal problem={selected} onClose={() => setSelected(null)} />
                )}
            </AnimatePresence>
        </div>
    );
}

interface ModalProps {
    problem: SpecialStatement;
    onClose: () => void;
}

function TaskModal({ problem, onClose }: ModalProps) {

    return (
        <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md px-2 sm:px-4 py-4 sm:py-8 overflow-y-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
        >
            <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="relative w-[90vw] pt-60 lg:pt-20 mx-auto my-2 sm:my-8"
                onClick={(e: React.MouseEvent) => e.stopPropagation()}
            >
                {/* Floating Characters - Removed */}

                {/* The Device/Tablet */}
                <div className="bg-[#949ba4] rounded-2xl sm:rounded-3xl p-2 sm:p-3 md:p-6 shadow-[0_20px_50px_rgba(0,0,0,0.5)] border-b-4 sm:border-b-8 border-r-4 sm:border-r-8 border-[#4b5660] relative z-10">
                    {/* Screws */}
                    <div className="absolute top-2 sm:top-4 left-2 sm:left-4 w-2 sm:w-3 h-2 sm:h-3 rounded-full bg-[#4b5660] shadow-inner flex items-center justify-center">
                        <div className="w-full h-[1px] bg-gray-400 rotate-45"></div>
                    </div>
                    <div className="absolute top-2 sm:top-4 right-2 sm:right-4 w-2 sm:w-3 h-2 sm:h-3 rounded-full bg-[#4b5660] shadow-inner flex items-center justify-center">
                        <div className="w-full h-[1px] bg-gray-400 rotate-45"></div>
                    </div>
                    <div className="absolute bottom-2 sm:bottom-4 left-2 sm:left-4 w-2 sm:w-3 h-2 sm:h-3 rounded-full bg-[#4b5660] shadow-inner flex items-center justify-center">
                        <div className="w-full h-[1px] bg-gray-400 rotate-45"></div>
                    </div>
                    <div className="absolute bottom-2 sm:bottom-4 right-2 sm:right-4 w-2 sm:w-3 h-2 sm:h-3 rounded-full bg-[#4b5660] shadow-inner flex items-center justify-center">
                        <div className="w-full h-[1px] bg-gray-400 rotate-45"></div>
                    </div>

                    {/* Screen Area */}
                    <div className="bg-[#221010] rounded-lg sm:rounded-xl border-2 sm:border-4 border-black overflow-hidden relative shadow-inner min-h-[400px] sm:min-h-[500px] flex flex-col">
                        {/* CRT Effect Overlay */}
                        <div
                            className="absolute inset-0 z-10 opacity-30 pointer-events-none"
                            style={{
                                background: 'linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06))',
                                backgroundSize: '100% 2px, 3px 100%'
                            }}
                        />

                        {/* Top Bar */}
                        <div className="bg-black/50 p-2 sm:p-4 border-b border-gray-800 flex justify-between items-center backdrop-blur-sm relative z-20">
                            <div className="flex items-center gap-2 sm:gap-3">
                                <span className="text-[#f42525] animate-pulse text-base sm:text-xl">⚠</span>
                                <span className="text-[#f42525] font-bold tracking-wider uppercase text-[10px] sm:text-sm">Critical Sabotage Detected</span>
                            </div>
                            <button
                                onClick={onClose}
                                className="text-gray-400 hover:text-[#f42525] text-xl sm:text-2xl font-bold transition-colors"
                            >
                                ✕
                            </button>
                        </div>

                        {/* Main Screen Content */}
                        <div className="flex-1 p-3 sm:p-6 md:p-10 relative overflow-y-auto">
                            {/* Problem Content - Full Width */}
                            <div className="w-full h-full">
                                {/* Problem Details - Full Width */}
                                <div className="space-y-3 sm:space-y-6">
                                    <div>
                                        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2">{problem.title}</h2>
                                        <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-3 sm:mb-4">
                                            <span className="px-2 py-0.5 sm:py-1 rounded bg-red-900/40 border border-red-500 text-red-400 text-[10px] sm:text-xs font-bold uppercase">
                                                {problem.code}
                                            </span>
                                            <span className="px-2 py-0.5 sm:py-1 rounded bg-blue-900/40 border border-blue-500 text-blue-400 text-[10px] sm:text-xs font-bold uppercase">
                                                {problem.organization}
                                            </span>
                                            <span className="px-2 py-0.5 sm:py-1 rounded bg-yellow-900/40 border border-yellow-500 text-yellow-400 text-[10px] sm:text-xs font-bold uppercase">
                                                {problem.category}
                                            </span>
                                        </div>
                                        <p className="text-gray-300 leading-relaxed text-sm sm:text-base md:text-lg border-l-2 sm:border-l-4 border-[#f42525] pl-2 sm:pl-4 bg-white/5 py-1.5 sm:py-2">
                                            {problem.description}
                                        </p>
                                    </div>

                                    <div className="bg-black/40 rounded-lg p-3 sm:p-4 border border-gray-700">
                                        <h3 className="text-[#38fedc] font-bold mb-2 sm:mb-3 flex items-center gap-1.5 sm:gap-2 uppercase text-xs sm:text-sm">
                                            <span className="text-xs sm:text-sm">▶</span> Expected Solution:
                                        </h3>
                                        <ul className="space-y-2 sm:space-y-3 text-xs sm:text-sm text-gray-300 font-mono">
                                            {problem.expectedSolution.map((item, index) => (
                                                <li key={index} className="flex items-start gap-1.5 sm:gap-2">
                                                    <span className="text-green-500 text-xs sm:text-sm">✓</span>
                                                    <span className="flex-1">{item}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    <div className="bg-black/40 rounded-lg p-3 sm:p-4 border border-gray-700">
                                        <h3 className="text-[#50ef39] font-bold mb-2 sm:mb-3 flex items-center gap-1.5 sm:gap-2 uppercase text-xs sm:text-sm">
                                            <span className="text-xs sm:text-sm">★</span> Expected Outcome:
                                        </h3>
                                        <p className="text-gray-300 text-xs sm:text-sm">{problem.expectedOutcome}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Bottom Action Bar */}
                        {/* <div className="bg-gray-900 p-4 border-t-2 border-gray-700 flex flex-col sm:flex-row gap-4 items-center justify-between relative z-20">
                            <button className="w-full sm:w-auto bg-[#4b5660] hover:bg-gray-600 text-white font-bold py-3 px-6 rounded-lg border-b-4 border-gray-800 active:border-b-0 active:translate-y-1 transition-all flex items-center justify-center gap-2">
                                <span>⬇</span>
                                DOWNLOAD DATA
                            </button>
                            <div className="flex-1 hidden sm:block h-2 bg-gray-800 rounded-full mx-4 overflow-hidden">
                                <div className="h-full bg-yellow-400 w-2/3 animate-pulse"></div>
                            </div>
                            <button className="w-full sm:w-auto bg-[#f42525] hover:bg-red-600 text-white font-bold py-4 px-8 rounded-lg border-b-4 border-red-900 active:border-b-0 active:translate-y-1 transition-all shadow-[0_0_20px_rgba(244,37,37,0.4)] flex items-center justify-center gap-2 group">
                                <span className="group-hover:rotate-12 transition-transform">📢</span>
                                REPORT SOLUTION
                            </button>
                        </div> */}
                    </div>
                </div>
            </motion.div>
        </motion.div >
    );
}
