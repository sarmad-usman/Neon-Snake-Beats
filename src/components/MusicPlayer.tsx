import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, Pause, SkipBack, SkipForward, Volume2, ListMusic, ChevronDown } from 'lucide-react';
import { TRACKS } from '../constants';

const MusicPlayer: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showPlaylist, setShowPlaylist] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const currentTrack = TRACKS[currentIndex];

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const selectTrack = (index: number) => {
    setCurrentIndex(index);
    setIsPlaying(true);
    setShowPlaylist(false);
  };

  const skipTrack = (direction: 'next' | 'prev') => {
    let nextIndex;
    if (direction === 'next') {
      nextIndex = (currentIndex + 1) % TRACKS.length;
    } else {
      nextIndex = (currentIndex - 1 + TRACKS.length) % TRACKS.length;
    }
    setCurrentIndex(nextIndex);
    setIsPlaying(true);
  };

  useEffect(() => {
    if (audioRef.current && isPlaying) {
      audioRef.current.play();
    }
  }, [currentIndex, isPlaying]);

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const current = audioRef.current.currentTime;
      const duration = audioRef.current.duration;
      if (duration) {
        setProgress((current / duration) * 100);
      }
    }
  };

  return (
    <div className="w-full flex flex-col md:flex-row items-center gap-4 md:gap-8 relative font-sans">
      <audio 
        ref={audioRef}
        src={currentTrack.url}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleTimeUpdate}
        onEnded={() => skipTrack('next')}
      />

      {/* Track Identity */}
      <div className="flex items-center gap-4 md:gap-6 w-full md:w-[300px] lg:w-[350px] flex-shrink-0 group">
        <div className="relative w-12 h-12 md:w-20 md:h-20 flex-shrink-0">
          <motion.div 
            key={currentTrack.id}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-full h-full rounded-xl md:rounded-2xl overflow-hidden relative shadow-2xl transition-transform group-hover:scale-105 duration-500"
          >
            <img 
              src={currentTrack.cover} 
              alt={currentTrack.title}
              className="w-full h-full object-cover transition-all duration-700 group-hover:contrast-125"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-black/40 to-transparent pointer-events-none" />
          </motion.div>
          {isPlaying && (
            <motion.div 
              animate={{ opacity: [0.2, 0.5, 0.2] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute -inset-1 border-2 border-neon-cyan/20 rounded-xl md:rounded-2xl pointer-events-none" 
            />
          )}
        </div>
        <div className="min-w-0 flex-1 space-y-0.5 md:space-y-1">
          <p className="text-sm md:text-lg font-black text-white truncate tracking-tight uppercase leading-tight">{currentTrack.title}</p>
          <p className="text-[8px] md:text-[10px] text-slate-500 uppercase tracking-[0.2em] md:tracking-[0.4em] font-extrabold truncate">
            {currentTrack.artist} <span className="hidden sm:inline text-neon-cyan/40">// AI SOURCE</span>
          </p>
        </div>
      </div>

      {/* Playback Core */}
      <div className="flex-1 w-full flex flex-col items-center gap-2 md:gap-4 py-2 md:py-0">
        <div className="flex items-center gap-6 md:gap-10">
          <button 
            onClick={() => skipTrack('prev')}
            className="text-slate-600 hover:text-white transition-colors"
          >
            <SkipBack className="w-5 h-5 md:w-6 md:h-6" fill="currentColor" strokeWidth={0} />
          </button>
          
          <button 
            onClick={togglePlay}
            className="w-10 h-10 md:w-16 md:h-16 rounded-full bg-white text-black flex items-center justify-center hover:scale-110 active:scale-95 transition-all shadow-xl shadow-white/10"
          >
            {isPlaying ? <Pause fill="currentColor" className="w-5 h-5 md:w-7 md:h-7" /> : <Play fill="currentColor" className="w-5 h-5 md:w-7 md:h-7 ml-0.5 md:ml-1" />}
          </button>

          <button 
            onClick={() => skipTrack('next')}
            className="text-slate-600 hover:text-white transition-colors"
          >
            <SkipForward className="w-5 h-5 md:w-6 md:h-6" fill="currentColor" strokeWidth={0} />
          </button>
        </div>

        <div className="w-full flex items-center gap-3 md:gap-6 md:px-4">
          <span className="text-[8px] md:text-[10px] font-sans text-slate-600 tabular-nums font-bold">
            {audioRef.current ? formatTime(audioRef.current.currentTime) : '0:00'}
          </span>
          <div className="flex-1 h-1 bg-white/5 rounded-full relative overflow-hidden group cursor-pointer">
            <motion.div 
              className="absolute top-0 left-0 h-full bg-gradient-to-r from-neon-cyan to-neon-violet"
              style={{ width: `${progress}%` }}
              transition={{ ease: "linear" }}
            />
          </div>
          <span className="text-[8px] md:text-[10px] font-sans text-slate-500 tabular-nums font-bold">
             {audioRef.current ? formatTime(audioRef.current.duration) : '0:00'}
          </span>
        </div>
      </div>

      {/* Output Monitoring */}
      <div className="w-full md:w-[200px] lg:w-[350px] flex justify-between md:justify-end items-center gap-4 lg:gap-10">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setShowPlaylist(!showPlaylist)}
            className={`transition-colors relative ${showPlaylist ? 'text-neon-cyan' : 'text-slate-600 hover:text-white'}`}
          >
            <ListMusic size={18} />
            {showPlaylist && (
              <motion.div 
                layoutId="active-dot"
                className="absolute -top-1 -right-1 w-1.5 h-1.5 bg-neon-cyan rounded-full shadow-[0_0_8px_#00f5ff]"
              />
            )}
          </button>
          
          <div className="flex items-center gap-3 text-slate-600 group">
             <Volume2 size={14} className="group-hover:text-neon-cyan transition-colors" />
             <div className="w-16 lg:w-20 h-1 bg-white/5 rounded-full overflow-hidden">
               <div className="w-2/3 h-full bg-slate-400 group-hover:bg-neon-cyan transition-colors" />
             </div>
          </div>
        </div>

        <div className="hidden sm:flex items-end gap-1 h-8 md:h-10 opacity-30">
          {[1,2,3,4,5,6,5,4,3,2,1].map((h, i) => (
            <motion.div 
              key={i}
              className="w-1 rounded-full bg-neon-cyan"
              animate={isPlaying ? { height: [`${h*15}%`, `${h*25}%`, `${h*10}%`] } : { height: '15%' }}
              transition={{ duration: 0.4 + i*0.05, repeat: Infinity }}
            />
          ))}
        </div>
      </div>
      {/* Playlist Overlay */}
      <AnimatePresence>
        {showPlaylist && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="absolute bottom-full left-0 right-0 mb-6 glass-panel rounded-[2rem] p-6 shadow-2xl z-50 border-white/10"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xs font-sans font-black text-white/40 uppercase tracking-[0.3em] flex items-center gap-3 italic">
                <ListMusic size={14} className="text-neon-cyan" />
                Transmission Archive
              </h3>
              <button 
                onClick={() => setShowPlaylist(false)}
                className="text-slate-600 hover:text-white"
              >
                <ChevronDown size={18} />
              </button>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-h-[40vh] overflow-y-auto pr-2 custom-scrollbar">
              {TRACKS.map((track, index) => {
                const isActive = currentIndex === index;
                return (
                  <motion.button
                    key={track.id}
                    onClick={() => selectTrack(index)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`flex items-center gap-4 p-4 rounded-2xl transition-all duration-300 group text-left ${
                      isActive ? 'bg-neon-cyan/10 border border-neon-cyan/20' : 'bg-white/[0.02] border border-white/5 hover:border-white/10'
                    }`}
                  >
                    <div className="relative w-12 h-12 flex-shrink-0">
                      <img 
                        src={track.cover} 
                        alt={track.title} 
                        className={`w-full h-full object-cover rounded-lg transition-transform ${isActive ? 'scale-105' : 'group-hover:scale-110'}`}
                        referrerPolicy="no-referrer"
                      />
                      {isActive && isPlaying && (
                        <div className="absolute inset-0 bg-black/40 rounded-lg flex items-center justify-center">
                          <motion.div 
                            animate={{ scale: [1, 1.2, 1] }} 
                            transition={{ repeat: Infinity, duration: 1 }}
                            className="w-2 h-2 bg-neon-cyan rounded-full"
                          />
                        </div>
                      )}
                    </div>
                    <div className="min-w-0">
                      <p className={`text-xs font-black truncate uppercase tracking-tight ${isActive ? 'text-neon-cyan' : 'text-white'}`}>
                        {track.title}
                      </p>
                      <p className="text-[9px] text-slate-500 truncate uppercase tracking-widest mt-0.5">
                        {track.artist}
                      </p>
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const formatTime = (time: number) => {
  if (isNaN(time)) return '0:00';
  const mins = Math.floor(time / 60);
  const secs = Math.floor(time % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
};

export default MusicPlayer;
