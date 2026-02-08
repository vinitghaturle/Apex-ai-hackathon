'use client'
import React, { useState, useEffect } from "react"
import { OrbitingCircles } from "@/components/ui/orbiting-circles"

// Define the interface for the data object
interface teamData {
  imageSrc: string;
  name: string;
  role: string;
  linkedin?: string; // Optional LinkedIn URL
}

interface TeamProfileProps {
  data: teamData;
}

export const Crew = ({ data }: TeamProfileProps) => {
  const { imageSrc, name, role, linkedin } = data;
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const innerRadius = isMobile ? 55 : 120;
  const outerRadius = isMobile ? 80 : 160;

  return (
    <div className="relative flex lg:h-[400px] h-[300px] w-full flex-col items-center justify-center overflow-hidden lg:scale-100">

      {/* 2. Central Image */}
      <div className="absolute -z-10 flex items-center justify-center">
        <div className="h-[8rem] w-[8rem] lg:h-[12rem] lg:w-[12rem] overflow-hidden rounded-full border-4 border-white/20 shadow-[0_0_30px_rgba(255,255,255,0.1)]">
          <img
            src={imageSrc}
            alt={name}
            className="h-full w-full object-cover"
          />
        </div>
      </div>

      {/* 3. The Orbits */}
      <OrbitingCircles radius={innerRadius} duration={25}>
        <img src="https://apex-assets-exl.pages.dev/image/ico-purple-player.svg" className="h-6 w-6 lg:h-8 lg:w-8" />
        <img src="https://apex-assets-exl.pages.dev/image/ico-green-player.svg" className="h-6 w-6 lg:h-8 lg:w-8" />
        <img src="https://apex-assets-exl.pages.dev/image/ico-red-player.svg" className="h-6 w-6 lg:h-8 lg:w-8" />
        <img src="https://apex-assets-exl.pages.dev/image/ico-yellow-player.svg" className="h-6 w-6 lg:h-8 lg:w-8" />
      </OrbitingCircles>

      <OrbitingCircles radius={outerRadius} duration={25} reverse>
        <img src="https://apex-assets-exl.pages.dev/image/ico-purple-player.svg" className="h-6 w-6 lg:h-8 lg:w-8" />
        <img src="https://apex-assets-exl.pages.dev/image/ico-green-player.svg" className="h-6 w-6 lg:h-8 lg:w-8" />
        <img src="https://apex-assets-exl.pages.dev/image/ico-red-player.svg" className="h-6 w-6 lg:h-8 lg:w-8" />
        <img src="https://apex-assets-exl.pages.dev/image/ico-yellow-player.svg" className="h-6 w-6 lg:h-8 lg:w-8" />
      </OrbitingCircles>

      {/* 4. Bottom Info */}
      <div className="absolute bottom-0 z-30 text-center w-full px-2">
        {linkedin ? (
          <a
            href={linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="block group"
          >
            <h3 className="text-md lg:text-4xl font-black text-white uppercase tracking-tighter italic truncate transition-all duration-300 group-hover:text-cyan-400 group-hover:scale-105">
              {name}
            </h3>
            <p className="text-[10px] lg:text-sm font-bold uppercase tracking-[0.2em] text-cyan-400 transition-all duration-300 group-hover:text-white group-hover:underline">
              {role}
            </p>
          </a>
        ) : (
          <>
            <h3 className="text-md lg:text-4xl font-black text-white uppercase tracking-tighter italic truncate">
              {name}
            </h3>
            <p className="text-[10px] lg:text-sm font-bold uppercase tracking-[0.2em] text-cyan-400">
              {role}
            </p>
          </>
        )}
      </div>
    </div>
  )
}