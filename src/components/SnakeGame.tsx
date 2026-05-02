import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, RotateCcw } from 'lucide-react';
import { Point, GameStatus } from '../types';
import { GRID_SIZE, INITIAL_SPEED, MIN_SPEED, SPEED_INCREMENT } from '../constants';

const GRID_ARRAY = Array.from({ length: GRID_SIZE }, (_, i) => i);

const SnakeGame: React.FC = () => {
  const [snake, setSnake] = useState<Point[]>([{ x: 10, y: 10 }]);
  const [food, setFood] = useState<Point>({ x: 5, y: 5 });
  const [direction, setDirection] = useState<Point>({ x: 0, y: -1 });
  const [status, setStatus] = useState<GameStatus>('idle');
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [speed, setSpeed] = useState(INITIAL_SPEED);

  const nextDirectionRef = useRef<Point>({ x: 0, y: -1 });

  const generateFood = useCallback((currentSnake: Point[]): Point => {
    let newFood;
    while (true) {
      newFood = {
        x: Math.floor(Math.random() * GRID_SIZE),
        y: Math.floor(Math.random() * GRID_SIZE),
      };
      if (!currentSnake.some(segment => segment.x === newFood.x && segment.y === newFood.y)) {
        break;
      }
    }
    return newFood;
  }, []);

  const resetGame = () => {
    setSnake([{ x: 10, y: 10 }]);
    setFood({ x: 5, y: 5 });
    setDirection({ x: 0, y: -1 });
    nextDirectionRef.current = { x: 0, y: -1 };
    setScore(0);
    setSpeed(INITIAL_SPEED);
    setStatus('playing');
  };

  const moveSnake = useCallback(() => {
    setSnake(prevSnake => {
      const currentDirection = nextDirectionRef.current;
      setDirection(currentDirection);
      
      const newHead = {
        x: (prevSnake[0].x + currentDirection.x + GRID_SIZE) % GRID_SIZE,
        y: (prevSnake[0].y + currentDirection.y + GRID_SIZE) % GRID_SIZE,
      };

      if (prevSnake.some(segment => segment.x === newHead.x && segment.y === newHead.y)) {
        setStatus('game-over');
        return prevSnake;
      }

      const newSnake = [newHead, ...prevSnake];

      if (newHead.x === food.x && newHead.y === food.y) {
        setScore(s => s + 10);
        setFood(generateFood(newSnake));
        setSpeed(prev => Math.max(MIN_SPEED, prev - SPEED_INCREMENT));
      } else {
        newSnake.pop();
      }

      return newSnake;
    });
  }, [food, generateFood]);

  useEffect(() => {
    if (status === 'playing') {
      const interval = setInterval(moveSnake, speed);
      return () => clearInterval(interval);
    }
  }, [status, speed, moveSnake]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key.toLowerCase()) {
        case 'arrowup':
        case 'w':
          if (direction.y === 0) nextDirectionRef.current = { x: 0, y: -1 };
          break;
        case 'arrowdown':
        case 's':
          if (direction.y === 0) nextDirectionRef.current = { x: 0, y: 1 };
          break;
        case 'arrowleft':
        case 'a':
          if (direction.x === 0) nextDirectionRef.current = { x: -1, y: 0 };
          break;
        case 'arrowright':
        case 'd':
          if (direction.x === 0) nextDirectionRef.current = { x: 1, y: 0 };
          break;
        case ' ':
          setStatus(prev => prev === 'playing' ? 'paused' : (prev === 'paused' ? 'playing' : prev));
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [direction]);

  useEffect(() => {
    if (score > highScore) setHighScore(score);
  }, [score, highScore]);

  return (
    <div className="flex flex-col items-center gap-6 md:gap-10 w-full max-w-[500px]">
      {/* Header Indicators */}
      <div className="flex justify-between w-full font-sans">
        <div className="space-y-0.5 md:space-y-1">
          <p className="text-[8px] md:text-[10px] text-slate-500 uppercase tracking-[0.2em] font-extrabold flex items-center gap-2">
            <span className="w-1 h-1 rounded-full bg-neon-cyan shadow-[0_0_8px_#00f5ff]" />
            Session
          </p>
          <p className="text-2xl md:text-4xl font-black text-white tracking-tighter drop-shadow-sm flex items-baseline">
            {score.toString().padStart(4, '0')}
            <span className="text-[8px] md:text-xs text-white/20 ml-1 md:ml-2 font-sans">PTS</span>
          </p>
        </div>
        <div className="text-right space-y-0.5 md:space-y-1">
          <p className="text-[8px] md:text-[10px] text-slate-500 uppercase tracking-[0.2em] font-extrabold flex items-center gap-2 justify-end">
            Peak
            <span className="w-1 h-1 rounded-full bg-neon-violet shadow-[0_0_8px_#8b5cf6]" />
          </p>
          <p className="text-2xl md:text-4xl font-black text-neon-violet tracking-tighter drop-shadow-sm flex items-baseline justify-end font-sans">
            {highScore.toString().padStart(4, '0')}
            <span className="text-[8px] md:text-xs text-neon-violet/20 ml-1 md:ml-2 font-sans">HIG</span>
          </p>
        </div>
      </div>

      {/* Game Stage */}
      <div className="relative p-1.5 md:p-2 rounded-2xl md:rounded-[2rem] bg-white/[0.03] border border-white/5 shadow-2xl backdrop-blur-md">
        <div 
          className="grid bg-black/40 rounded-xl md:rounded-2xl overflow-hidden"
          style={{ 
            gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)`,
            width: 'min(85vw, 420px)',
            height: 'min(85vw, 420px)',
            gap: '1px'
          }}
        >
          {GRID_ARRAY.map(y => (
            GRID_ARRAY.map(x => {
              const segmentIndex = snake.findIndex(s => s.x === x && s.y === y);
              const isSnake = segmentIndex !== -1;
              const isHead = segmentIndex === 0;
              const isFood = food.x === x && food.y === y;

              return (
                <div 
                  key={`${x}-${y}`}
                  className={`
                    relative transition-all duration-300
                    ${isSnake ? (isHead ? 'bg-neon-cyan z-10 shadow-[0_0_20px_#00f5ff] scale-105 rounded-sm' : 'bg-neon-cyan/40 rounded-[1px]') : 'bg-transparent'}
                    ${isFood ? 'bg-white shadow-[0_0_25px_rgba(255,255,255,0.4)] animate-pulse scale-50 rounded-full' : ''}
                  `}
                />
              );
            })
          ))}
        </div>

        <AnimatePresence>
          {status !== 'playing' && (
            <motion.div 
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="absolute inset-0 z-20 flex flex-col items-center justify-center p-8 text-center bg-black/80 backdrop-blur-xl rounded-[2rem]"
            >
              <div className="mb-8 relative">
                <h2 className="text-5xl font-sans font-black text-transparent bg-clip-text bg-gradient-to-br from-white to-white/40 uppercase tracking-tighter italic leading-none">
                  {status === 'idle' ? 'INITIATE' : (status === 'paused' ? 'SUSPENDED' : 'OFFLINE')}
                </h2>
                <div className="absolute -bottom-2 left-0 w-full h-px bg-gradient-to-r from-transparent via-neon-cyan/50 to-transparent" />
              </div>

              {status === 'idle' && (
                <div className="space-y-10">
                  <p className="text-slate-500 text-[9px] uppercase tracking-[0.4em] font-bold max-w-[280px] leading-relaxed">
                    Verify neural integrity to establish secure navigation link
                  </p>
                  <button 
                    onClick={resetGame}
                    className="group relative flex items-center justify-center w-56 h-14 bg-white text-black font-sans font-extrabold uppercase text-xs tracking-widest rounded-full hover:scale-105 transition-all shadow-[0_20px_40px_rgba(255,255,255,0.1)] active:scale-95 overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                    Enter Simulation
                  </button>
                </div>
              )}

              {status === 'paused' && (
                <button 
                  onClick={() => setStatus('playing')}
                  className="w-56 h-14 bg-neon-cyan text-black font-sans font-extrabold uppercase text-xs tracking-widest rounded-full hover:scale-105 transition-all shadow-[0_20px_40px_rgba(0,245,255,0.2)] active:scale-95"
                >
                  Resume Flow
                </button>
              )}

              {status === 'game-over' && (
                <div className="space-y-10">
                  <p className="text-white/20 font-sans text-[9px] uppercase tracking-[0.6em]">System Error // Leak Detected</p>
                  <button 
                    onClick={resetGame}
                    className="w-56 h-14 bg-white text-black font-sans font-extrabold uppercase text-xs tracking-widest rounded-full hover:scale-105 transition-all shadow-[0_20px_40px_rgba(255,255,255,0.1)] active:scale-95"
                  >
                    Reconnect Link
                  </button>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="flex gap-12 font-sans text-[9px] text-slate-600 uppercase tracking-widest font-bold">
        <span className="flex items-center gap-3">
          <div className="w-1.5 h-1.5 rounded-full border border-slate-600" />
          WASD Navigate
        </span>
        <span className="flex items-center gap-3">
          <div className="w-1.5 h-1.5 rounded-full border border-slate-600" />
          Space Suspend
        </span>
      </div>
    </div>
  );
};

export default SnakeGame;
