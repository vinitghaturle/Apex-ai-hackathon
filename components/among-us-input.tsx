'use client';

import React from 'react';

interface AmongUsInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    endContent?: React.ReactNode;
    className?: string;
}

export const AmongUsInput = React.forwardRef<HTMLInputElement, AmongUsInputProps>(
    ({ label, error, endContent, className = '', ...props }: AmongUsInputProps, ref: React.ForwardedRef<HTMLInputElement>) => {
        return (
            <div className="w-full">
                {label && (
                    <label className="block text-xs font-bold uppercase tracking-widest text-white/70 mb-2">
                        {label}
                    </label>
                )}
                <div className="relative group">
                    <input
                        ref={ref}
                        className={`
                            w-full px-4 py-3 rounded-lg
                            bg-[#1a0b0b]/80 backdrop-blur-sm
                            border-2 ${error ? 'border-[#F42525]' : 'border-[#C51111]/30'}
                            text-white placeholder:text-white/30
                            focus:outline-none focus:border-[#38FEDC] focus:shadow-[0_0_15px_rgba(56,254,220,0.3)]
                            transition-all duration-200
                            ${endContent ? 'pr-12' : ''}
                            ${className}
                        `}
                        {...props}
                    />
                    {endContent && (
                        <div className="absolute right-0 top-0 h-full flex items-center pr-3">
                            {endContent}
                        </div>
                    )}
                </div>
                {error && (
                    <p className="mt-2 text-xs text-[#F42525] font-bold flex items-center gap-1">
                        <span className="material-symbols-outlined text-sm">error</span>
                        {error}
                    </p>
                )}
            </div>
        );
    }
);

AmongUsInput.displayName = 'AmongUsInput';
