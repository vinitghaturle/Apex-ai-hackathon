"use client";

import { motion } from "framer-motion";

export type Checkpoint = {
    id: string;
    title: string;
    status: "completed" | "current" | "pending";
    description: string;
    order_index?: number;
};

interface CheckpointsProps {
    checkpoints: Checkpoint[];
    isAdmin?: boolean;
    onComplete?: (id: string) => void;
    onUndo?: (id: string) => void;
    onAdd?: () => void;
    onDelete?: (id: string) => void;
}

export default function Checkpoints({ checkpoints, isAdmin, onComplete, onUndo, onAdd, onDelete }: CheckpointsProps) {
    return (
        <div className="bg-[#1a0b0b]/90 border-l-4 border-[#38FEDC] p-5 rounded-r-xl shadow-2xl backdrop-blur-sm h-full flex flex-col">
            <h3 className="text-[#38FEDC] text-xs font-black tracking-tighter uppercase mb-6 flex items-center gap-2">
                <span className="material-symbols-outlined text-sm">assignment Mission Checkpoints</span>
            </h3>

            <div className="relative pl-2 flex-1 overflow-y-auto pr-2 custom-scrollbar">
                {/* Vertical connector line */}
                <div className="absolute left-[9px] top-2 bottom-4 w-0.5 bg-white/10" />

                <ul className="space-y-6">
                    {checkpoints.map((checkpoint, index) => {
                        // Check if this is the last completed checkpoint to optionally show Undo
                        const isLastCompleted = checkpoint.status === 'completed' &&
                            (index === checkpoints.length - 1 || checkpoints[index + 1].status !== 'completed');

                        return (
                            <CheckpointItem
                                key={checkpoint.id}
                                checkpoint={checkpoint}
                                index={index}
                                isAdmin={isAdmin}
                                onComplete={onComplete}
                                onUndo={onUndo}
                                onDelete={onDelete}
                                showUndo={isLastCompleted}
                            />
                        );
                    })}
                </ul>

                {isAdmin && onAdd && (
                    <button
                        onClick={onAdd}
                        className="mt-6 flex items-center gap-2 text-[10px] uppercase font-bold text-[#38FEDC]/50 hover:text-[#38FEDC] transition-colors w-full justify-center border border-dashed border-[#38FEDC]/20 p-2 rounded hover:bg-[#38FEDC]/10"
                    >
                        <span className="material-symbols-outlined text-sm">add</span> Add Checkpoint
                    </button>
                )}
            </div>
            <style jsx>{`
                .custom-scrollbar::-webkit-scrollbar {
                    width: 4px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: rgba(255, 255, 255, 0.05);
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: rgba(56, 254, 220, 0.2);
                    border-radius: 2px;
                }
            `}</style>
        </div>
    );
}

function CheckpointItem({ checkpoint, index, isAdmin, onComplete, onUndo, onDelete, showUndo }: {
    checkpoint: Checkpoint;
    index: number;
    isAdmin?: boolean;
    onComplete?: (id: string) => void;
    onUndo?: (id: string) => void;
    onDelete?: (id: string) => void;
    showUndo?: boolean;
}) {
    const isCompleted = checkpoint.status === "completed";
    const isCurrent = checkpoint.status === "current";

    return (
        <motion.li
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-start gap-4 group relative z-10"
        >
            <div
                className={`
            size-5 rounded flex items-center justify-center mt-0.5 transition-all duration-300
            ${isCompleted ? 'bg-[#38FEDC]/20 border border-[#38FEDC]' : ''}
            ${isCurrent ? 'bg-[#f42525]/20 border border-[#f42525] animate-pulse' : ''}
            ${!isCompleted && !isCurrent ? 'border border-white/20' : ''}
        `}
            >
                {isCompleted && <span className="material-symbols-outlined text-[#38FEDC] text-xs">✔️</span>}
                {isCurrent && <div className="size-2 bg-[#f42525] rounded-full animate-ping" />}
            </div>

            <div className="flex-1">
                <div className="flex justify-between items-start">
                    <div>
                        <p className={`text-xs font-bold uppercase tracking-tight ${isCurrent ? 'text-white' : 'text-white/70'}`}>
                            {checkpoint.title}
                        </p>
                        <p className={`text-[10px] uppercase mt-0.5 ${isCurrent ? 'text-[#f42525]' : 'text-white/40'}`}>
                            {checkpoint.description}
                        </p>
                    </div>

                    {isAdmin && onDelete && (
                        <button
                            onClick={() => onDelete(checkpoint.id)}
                            className="text-white/20 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
                            title="Delete Checkpoint"
                        >
                            <span className="material-symbols-outlined text-[14px]">delete</span>
                        </button>
                    )}
                </div>

                <div className="flex flex-wrap gap-2 mt-2">
                    {isAdmin && isCurrent && onComplete && (
                        <button
                            onClick={() => onComplete(checkpoint.id)}
                            className="text-[10px] bg-[#38FEDC]/10 text-[#38FEDC] px-2 py-1 rounded border border-[#38FEDC]/30 hover:bg-[#38FEDC]/20 transition-colors uppercase font-bold tracking-wider"
                        >
                            Mark Done
                        </button>
                    )}

                    {isAdmin && showUndo && onUndo && (
                        <button
                            onClick={() => onUndo(checkpoint.id)}
                            className="text-[10px] bg-red-500/10 text-red-500 px-2 py-1 rounded border border-red-500/30 hover:bg-red-500/20 transition-colors uppercase font-bold tracking-wider flex items-center gap-1"
                        >
                            <span className="material-symbols-outlined text-[10px]">undo</span> Undo
                        </button>
                    )}
                </div>
            </div>
        </motion.li>
    );
}
