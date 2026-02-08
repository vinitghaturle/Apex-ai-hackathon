'use client'

import CountdownTimer from "./Countdown"

export function Hero() {
  return (
    <section className="relative h-screen overflow-hidden ">

      <div className="relative z-10 h-full flex items-center">

        
        <div className="w-1/2 h-full flex items-center justify-start overflow-hidden">
          <div className="relative flex ml-[12rem] justify-center lg:justify-end">
                    <div className="relative w-full max-w-lg animate-float">
                        <img
                            alt="Futuristic spaceship with crewmates"
                            className="relative rounded-3xl scale-150 "
                            src="https://apex-assets-exl.pages.dev/image/spaceship.svg"
                        />
                    </div>
                </div>
        </div>

        
        <div className="w-1/2 flex flex-col justify-center items-center px-16">

          <h1 className="font-joffrey text-7xl md:text-8xl text-white mb-6">
            Apex-ai
          </h1>

          <p className="text-xl md:text-2xl text-gray-100 mb-8 text-center max-w-2xl">
            The future of artificial intelligence awaits
          </p>

          
          <CountdownTimer />
          
          <button className="mt-12 px-10 py-4 bg-white  font-semibold text-lg rounded-full hover:bg-gray-100 transition transform hover:scale-105 shadow-lg">
            Explore Now
          </button>
         
        </div>
      </div>

      
      <div className="absolute inset-0 pointer-events-none animate-float ">
        <img
          src="https://apex-assets-exl.pages.dev/image/ico-red-player.svg"
          className="absolute top-[8%] right-[32%] w-20 opacity-50"
          alt=""
        />
        <img
          src="https://apex-assets-exl.pages.dev/image/ico-green-player.svg"
          className="absolute bottom-[12%] right-[36%] w-16 opacity-40"
          alt=""
        />
        <img
          src="https://apex-assets-exl.pages.dev/image/ico-purple-player.svg"
          className="absolute top-[14%] right-[10%] w-24 opacity-55"
          alt=""
        />
        <img
          src="https://apex-assets-exl.pages.dev/image/ico-yellow-player.svg"
          className="absolute bottom-[18%] right-[12%] w-28 opacity-45"
          alt=""
        />
      </div>

    </section>
  )
}