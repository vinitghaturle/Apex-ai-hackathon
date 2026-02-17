'use client';

import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';

interface AmongUsButtonProps extends HTMLMotionProps<'button'> {
    variant?: 'primary' | 'secondary' | 'danger';
    loading?: boolean;
    children: React.ReactNode;
}

export function AmongUsButton({
    variant = 'primary',
    loading = false,
    children,
    className = '',
    disabled,
    ...props
}: AmongUsButtonProps) {
    const variantStyles = {
        primary: 'bg-[#C51111] hover:bg-[#A00E0E] shadow-[0_0_20px_rgba(197,17,17,0.4)] border-[#8B0000]',
        secondary: 'bg-[#38FEDC] hover:bg-[#2DD4B8] shadow-[0_0_20px_rgba(56,254,220,0.4)] border-[#1FA896] text-black',
        danger: 'bg-[#F42525] hover:bg-[#D11F1F] shadow-[0_0_20px_rgba(244,37,37,0.5)] border-[#A01515]',
    };

    return (
        <motion.button
            whileHover={{ scale: disabled || loading ? 1 : 1.02 }}
            whileTap={{ scale: disabled || loading ? 1 : 0.98 }}
            className={`
        relative px-8 py-4 rounded-xl font-black text-sm uppercase tracking-widest
        transition-all border-2 disabled:opacity-50 disabled:cursor-not-allowed
        ${variantStyles[variant]}
        ${className}
      `}
            disabled={disabled || loading}
            {...props}
        >
            {loading ? (
                <div className="flex items-center justify-center gap-2">
                    <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                    <span>Loading...</span>
                </div>
            ) : (
                children
            )}
        </motion.button>
    );
}
