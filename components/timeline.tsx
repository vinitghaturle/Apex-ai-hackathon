'use client'


const events = [
  { date: 'Jan 15', title: 'REGISTRATION OPENS', active: true },
  { date: 'Mar 10', title: 'PROJECT SUBMISSION', active: true },
  { date: 'Mar 15', title: 'JUDGING PHASE', active: false },
  { date: 'Mar 20', title: 'WINNERS ANNOUNCED', active: false },
];

const Timeline = () => {
  return (
    <section id="schedule" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          
          {/* Timeline Graphic */}
          <div className="w-full lg:w-2/3">
             <h2 className="text-3xl md:text-4xl font-orbitron font-bold text-white mb-12 text-center lg:text-right uppercase tracking-widest">
              Timeline/Schedule
            </h2>
            
            <div className="relative pt-12 pb-12">
              {/* The Line */}
              <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-700 -translate-y-1/2 rounded-full overflow-hidden">
                <div className="w-2/3 h-full bg-gradient-to-r from-neon-cyan via-neon-green to-neon-red shadow-[0_0_10px_#fff]"></div>
              </div>

              {/* Points */}
              <div className="relative flex justify-between items-center w-full">
                {events.map((event, idx) => (
                  <div key={idx} className="flex flex-col items-center group relative">
                    <div className="mb-4 text-center">
                      <div className="text-white font-orbitron font-bold text-sm md:text-base uppercase mb-1">{event.title}</div>
                      <div className="text-neon-cyan font-rajdhani font-bold text-lg">{event.date}</div>
                    </div>
                    
                    <div className={`w-8 h-8 rounded-full border-4 z-10 transition-all duration-500
                      ${event.active ? 'bg-neon-cyan border-white shadow-[0_0_15px_#00F3FF]' : 'bg-space-900 border-gray-600'}
                    `}></div>

                    {/* Little Spaceship on the current stage */}
                    {idx === 1 && (
                      <div className="absolute top-[calc(100%+8px)] left-1/2 -translate-x-1/2 -translate-y-[4px] z-20">
                         
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Prize Pool Preview */}
          <div className="w-full lg:w-1/3">
             <div className="bg-space-800/50 border border-neon-yellow/30 p-8 rounded-2xl text-center relative overflow-hidden backdrop-blur-sm">
                <div className="absolute top-0 left-0 w-full h-1 bg-neon-yellow shadow-[0_0_10px_#FFD700]"></div>
                <h3 className="text-2xl font-orbitron font-bold text-white mb-2">TOTAL PRIZE POOL</h3>
                <div className="text-5xl font-black font-rajdhani text-neon-yellow drop-shadow-[0_0_10px_rgba(255,215,0,0.5)] my-4">
                  $17,500+
                </div>
                <p className="text-gray-400 text-sm font-rajdhani">
                  Plus exclusive swag, gadgets, and cloud credits for all winning teams.
                </p>
             </div>
          </div>

        </div>
      </div>
    </section>
  )
}

export default Timeline