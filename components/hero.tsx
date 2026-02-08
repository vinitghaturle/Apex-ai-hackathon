'use client'

import CountdownTimer from "./Countdown"
import { useState } from "react"
import RegisterModal from "./RegisterModal"

export function Hero() {

    const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false)

  return (
    <section className="relative h-screen overflow-hidden ">

      <div className="relative z-10 h-full flex flex-col-reverse lg:flex-row items-center scale-[0.7] lg:scale-100">


        <div className="w-full lg:w-1/2 h-1/2 lg:h-full flex items-center justify-center lg:justify-start overflow-hidden">
          <div className="relative flex ml-0 lg:ml-[12rem] justify-center lg:justify-end">
            <div className="relative w-full max-w-lg animate-float">
              <img
                alt="Futuristic spaceship with crewmates"
                className="relative rounded-3xl scale-120 mt-[10rem] lg:mt-0 lg:scale-150 "
                src="https://apex-assets-exl.pages.dev/image/spaceship.svg"
              />
            </div>
          </div>
        </div>


        <div className="w-full lg:w-1/2 h-1/2 lg:h-full flex flex-col justify-center items-center px-8 lg:px-16">

          <h1 className="font-joffrey text-7xl md:text-8xl text-white mb-6">
            Apex-ai
          </h1>

          <p className="text-xl md:text-2xl text-gray-100 mb-8 text-center max-w-2xl">
            The future of artificial intelligence awaits
          </p>


          <CountdownTimer />

          <button 
          onClick={() => setIsRegisterModalOpen(true)}
          className="mt-12 px-10 py-4 bg-white  font-semibold text-lg rounded-full hover:bg-gray-100 transition transform hover:scale-105 shadow-lg">
            Join Crew
          </button>

        </div>
      </div>


      <div className="absolute inset-0 pointer-events-none animate-float ">
        <img
          src="https://apex-assets-exl.pages.dev/image/ico-red-player.svg"
          className="absolute top-[8%] left-[10%] lg:left-auto lg:right-[32%] w-16 lg:w-20 opacity-50"
          alt=""
        />
        <img
          src="https://apex-assets-exl.pages.dev/image/ico-green-player.svg"
          className="absolute top-[35%] left-[5%] lg:top-auto lg:bottom-[12%] lg:right-[36%] w-12 lg:w-16 opacity-40"
          alt=""
        />
        <img
          src="https://apex-assets-exl.pages.dev/image/ico-purple-player.svg"
          className="absolute top-[12%] right-[5%] lg:top-[14%] lg:right-[10%] w-20 lg:w-24 opacity-55"
          alt=""
        />
        <img
          src="https://apex-assets-exl.pages.dev/image/ico-yellow-player.svg"
          className="absolute top-[40%] right-[10%] lg:top-auto lg:bottom-[18%] lg:right-[12%] w-24 lg:w-28 opacity-45"
          alt=""
        />
      </div>
                  <RegisterModal
                      isOpen={isRegisterModalOpen}
                      onClose={() => setIsRegisterModalOpen(false)}
                  />

    </section>
  )
}