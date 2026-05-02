import React from 'react';
import { motion } from 'motion/react';
import SnakeGame from './components/SnakeGame';
import MusicPlayer from './components/MusicPlayer';
import { Activity, Radio, Command } from 'lucide-react';

export default function App() {
  return (
    <div className="min-h-screen bg-[#08080a] text-slate-400 selection:bg-neon-cyan/20 overflow-x-hidden flex flex-col p-4 md:p-6 lg:p-8 space-y-4 md:space-y-6 relative">
      {/* Background Ambience */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] right-[-10%] w-[100vw] sm:w-[70vw] h-[100vw] sm:h-[70vw] bg-neon-cyan/[0.03] rounded-full blur-[100px] sm:blur-[140px] animate-pulse" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[100vw] sm:w-[70vw] h-[100vw] sm:h-[70vw] bg-neon-violet/[0.03] rounded-full blur-[100px] sm:blur-[140px] animate-pulse delay-700" />
      </div>

      {/* Navigation Header */}
      <header className="relative z-10 glass-panel rounded-2xl md:rounded-3xl px-4 md:px-8 py-4 md:py-5 flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-6">
        <div className="flex items-center gap-4 md:gap-5 w-full sm:w-auto justify-center sm:justify-start">
          <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl bg-gradient-to-br from-neon-cyan to-neon-violet flex items-center justify-center shadow-lg shadow-neon-cyan/10 flex-shrink-0">
            <Activity className="text-black" size={20} />
          </div>
          <div>
            <h1 className="text-lg md:text-2xl font-sans font-black tracking-tighter text-white uppercase leading-none italic">
              NEON_SYNTH <span className="text-neon-cyan opacity-40 hidden xs:inline">//_EXE</span>
            </h1>
            <p className="text-[8px] md:text-[10px] text-slate-500 uppercase tracking-[0.3em] md:tracking-[0.4em] font-bold mt-1">Tactical Interface Simulation</p>
          </div>
        </div>

        <div className="hidden lg:flex gap-12 xl:gap-16 text-[10px] uppercase tracking-[0.3em] font-extrabold text-slate-600">
          <div className="flex items-center gap-3 text-white">
            <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_#10b981]" />
            Uplink Stable
          </div>
          <div className="flex items-center gap-3">
            <Radio size={14} className="text-neon-cyan" />
            Signal: High Fidelity
          </div>
        </div>

        <div className="flex gap-4 md:gap-6 items-center w-full sm:w-auto justify-center sm:justify-end">
          <div className="flex flex-col items-center sm:items-end">
            <p className="text-[8px] uppercase tracking-widest text-slate-500 font-bold">Node_Operator</p>
            <p className="text-xs md:text-sm font-sans font-black text-white tracking-tight">SARMAD_USMAN</p>
          </div>
          <div className="hidden xs:block w-px h-8 bg-white/10" />
          <div className="hidden xs:flex w-10 h-10 rounded-xl md:rounded-2xl bg-white/[0.03] border border-white/5 items-center justify-center text-slate-400 hover:text-white transition-colors cursor-pointer group">
            <Command size={18} className="group-hover:rotate-12 transition-transform" />
          </div>
        </div>
      </header>

      {/* Interface Modules */}
      <div className="flex-1 flex flex-col lg:flex-row gap-4 md:gap-6 overflow-hidden relative z-10">
        {/* Module A: Telemetry & Logs */}
        <aside className="w-full lg:w-72 xl:w-80 flex flex-col gap-6 hidden lg:flex">
          <div className="flex-1 glass-panel rounded-3xl p-6 xl:p-8 flex flex-col overflow-hidden">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-[10px] font-sans font-black uppercase tracking-[0.3em] text-white/30 italic">Telemetry</h2>
              <div className="px-3 py-1 rounded-full bg-neon-cyan/10 border border-neon-cyan/20 text-neon-cyan text-[9px] font-sans font-black tracking-widest leading-none">LIVE</div>
            </div>

            <div className="space-y-8 flex-1 overflow-y-auto pr-2 custom-scrollbar">
              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 group hover:border-neon-cyan/30 transition-all duration-500">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-[9px] text-slate-500 uppercase font-black tracking-widest italic group-hover:text-slate-300 transition-colors">Neural Latency</span>
                    <span className="text-[10px] text-neon-cyan font-sans font-bold">14.2 ms</span>
                  </div>
                  <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                    <motion.div 
                      className="h-full bg-neon-cyan/60" 
                      animate={{ width: ["15%", "45%", "25%"] }} 
                      transition={{ duration: 4, repeat: Infinity }}
                    />
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 group hover:border-neon-violet/30 transition-all duration-500">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-[9px] text-slate-500 uppercase font-black tracking-widest italic group-hover:text-slate-300 transition-colors">Cortex Load</span>
                    <span className="text-[10px] text-neon-violet font-sans font-bold">38%</span>
                  </div>
                  <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                    <motion.div 
                      className="h-full bg-neon-violet/60" 
                      animate={{ width: ["40%", "70%", "55%"] }} 
                      transition={{ duration: 6, repeat: Infinity }}
                    />
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-[9px] font-black text-slate-600 uppercase tracking-[0.4em] mb-4 pl-1 italic">Event Stream</h3>
                <div className="space-y-3 font-sans text-[9px] leading-snug">
                  <div className="flex gap-4 p-2 rounded-xl hover:bg-white/5 transition-colors cursor-default">
                    <span className="text-neon-cyan/30 font-sans">09:10</span>
                    <span className="text-slate-500 uppercase font-sans">SYS_INIT_SEQ</span>
                  </div>
                  <div className="flex gap-4 p-2 rounded-xl hover:bg-white/5 transition-colors cursor-default">
                    <span className="text-neon-cyan/30 font-sans">09:14</span>
                    <span className="text-neon-cyan font-bold uppercase tracking-tighter font-sans">PRTCL_STABLE</span>
                  </div>
                  <div className="flex gap-4 p-2 rounded-xl hover:bg-white/5 transition-colors cursor-default">
                    <span className="text-neon-violet/30 font-sans">09:22</span>
                    <span className="text-neon-violet font-bold uppercase tracking-tighter font-sans">AUDIO_RDY</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </aside>

        {/* Module B: Simulation Grid */}
        <main className="flex-1 glass-panel rounded-2xl md:rounded-[2.5rem] relative overflow-hidden flex items-center justify-center p-4 sm:p-8 lg:p-12 min-h-[450px]">
          {/* Dashboard UI Accents */}
          <div className="absolute top-6 left-6 text-[8px] md:text-[9px] font-sans text-white/5 uppercase tracking-[0.5em] hidden xs:block">Tactical_Grid_2026.04</div>
          <div className="absolute bottom-6 right-6 flex gap-3 hidden xs:flex">
             <div className="w-0.5 h-6 rounded-full bg-white/5" />
             <div className="w-0.5 h-6 rounded-full bg-white/10" />
             <div className="w-0.5 h-6 rounded-full bg-neon-cyan/20 shadow-[0_0_10px_#00f5ff22]" />
          </div>

          <div className="relative z-10 w-full flex justify-center items-center">
            <SnakeGame />
          </div>
        </main>
      </div>

      {/* Module C: Media Fusion */}
      <footer className="relative z-10 glass-panel rounded-2xl md:rounded-[2rem] px-4 sm:px-10 py-4 sm:py-6">
        <MusicPlayer />
      </footer>
    </div>
  );
}
