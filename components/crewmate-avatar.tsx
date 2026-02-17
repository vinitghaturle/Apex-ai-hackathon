'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface CrewmateAvatarProps {
    color?: 'red' | 'blue' | 'cyan' | 'green' | 'yellow' | 'orange' | 'purple' | 'pink';
    size?: 'sm' | 'md' | 'lg' | 'xl';
    animated?: boolean;
    className?: string;
}

const colorMap = {
    red: '#C51111',
    blue: '#132ED1',
    cyan: '#38FEDC',
    green: '#11802D',
    yellow: '#F6F657',
    orange: '#EF7D0E',
    purple: '#6B2FBB',
    pink: '#ED54BA',
};

const sizeMap = {
    sm: 40,
    md: 60,
    lg: 80,
    xl: 120,
};

export function CrewmateAvatar({
    color = 'red',
    size = 'md',
    animated = true,
    className = '',
}: CrewmateAvatarProps) {
    const bodyColor = colorMap[color];
    const avatarSize = sizeMap[size];

    return (
        <motion.div
            className={`relative inline-block ${className}`}
            style={{ width: avatarSize, height: avatarSize }}
            animate={
                animated
                    ? {
                        y: [0, -5, 0],
                    }
                    : {}
            }
            transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
            }}
        >
            {/* Crewmate Body */}
            <svg
                viewBox="0 0 100 100"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-full"
            >
                {/* Shadow */}
                <ellipse cx="50" cy="92" rx="25" ry="5" fill="rgba(0,0,0,0.3)" />

                {/* Body */}
                <path
                    d="M30 50 C30 35, 35 25, 50 25 C65 25, 70 35, 70 50 L70 75 C70 82, 65 85, 50 85 C35 85, 30 82, 30 75 Z"
                    fill={bodyColor}
                    stroke="#000"
                    strokeWidth="2"
                />

                {/* Visor */}
                <ellipse
                    cx="50"
                    cy="40"
                    rx="18"
                    ry="12"
                    fill="#8DD7F5"
                    stroke="#000"
                    strokeWidth="2"
                />

                {/* Visor Reflection */}
                <ellipse
                    cx="45"
                    cy="37"
                    rx="6"
                    ry="4"
                    fill="rgba(255,255,255,0.6)"
                />

                {/* Backpack */}
                <rect
                    x="65"
                    y="50"
                    width="12"
                    height="20"
                    rx="3"
                    fill={bodyColor}
                    stroke="#000"
                    strokeWidth="2"
                    filter="brightness(0.8)"
                />

                {/* Left Leg */}
                <rect
                    x="35"
                    y="80"
                    width="10"
                    height="8"
                    rx="2"
                    fill={bodyColor}
                    stroke="#000"
                    strokeWidth="2"
                    filter="brightness(0.7)"
                />

                {/* Right Leg */}
                <rect
                    x="55"
                    y="80"
                    width="10"
                    height="8"
                    rx="2"
                    fill={bodyColor}
                    stroke="#000"
                    strokeWidth="2"
                    filter="brightness(0.7)"
                />
            </svg>
        </motion.div>
    );
}
