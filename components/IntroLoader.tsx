"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { SparklesCore } from "@/components/ui/sparkles";

export default function IntroLoader({
  onFinish,
}: {
  onFinish: () => void;
}) {
  const [step, setStep] = useState<0 | 1>(0);
  const [exiting, setExiting] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handleEnter = () => {
  if (step !== 0) return;

  setStep(1);
  audioRef.current?.play().catch(() => {});

  // let second webp play
  setTimeout(() => {
    setExiting(true); 
  }, 1200);

  // unmount AFTER fade
  setTimeout(() => {
    onFinish();
  }, 1800); 
};

  useEffect(() => {
    const onKeyDown = () => {
      if (step !== 0) return;
      handleEnter();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [step]);

  return (
    <div
  className={`fixed inset-0 z-[9999] bg-black overflow-hidden transition-opacity duration-700 ease-out ${
    exiting ? "opacity-0 scale-105" : "opacity-100 scale-100"
  }`}
>
      
      <div className="absolute inset-0 z-[1] pointer-events-none">
        <SparklesCore
          id="intro-sparkles"
          background="transparent"
          minSize={0.6}
          maxSize={1.4}
          particleDensity={100}
          className="w-full h-full"
          particleColor="#FFFFFF"
        />
      </div>

      
      <div className="relative z-[10] flex flex-col items-center justify-center h-full gap-6">
        
        {step === 0 && (
          <>
            <Image
              src="https://apex-assets-exl.pages.dev/image/charwalk.webp"
              alt="Intro 1"
              width={240}
              height={240}
              priority
            />

            <button
              onClick={handleEnter}
              className="font-joffrey px-6 py-2 text-white border border-white hover:bg-white hover:text-black transition"
            >
              Get In
            </button>
          </>
        )}

        
        {step === 1 && (
          <div className="absolute inset-0 z-[10]">
            <Image
              src="https://apex-assets-exl.pages.dev/image/impokill1.webp"
              alt="Intro 2"
              fill
              priority
              className="object-cover"
            />
          </div>
        )}
      </div>

      
      <audio ref={audioRef} src="https://apex-assets-exl.pages.dev/image/impokill.ogg" preload="auto" />
    </div>
  );
}
