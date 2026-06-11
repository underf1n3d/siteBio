'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const currentTrack = {
  title: "Morning Broadway",
  artist: "Keith Mansfield",
  cover: "/cover.png",
  src: "/bgm.mp3"
};

export const AudioPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [imgError, setImgError] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const playerRef = useRef<HTMLDivElement>(null);
  const closeTimeout = useRef<NodeJS.Timeout | null>(null);
  const dragValue = useRef<number | null>(null);
  const isScrubbingRef = useRef(false);

  useEffect(() => {
    audioRef.current = new Audio(currentTrack.src);
    audioRef.current.volume = 0.3;
    
    const setAudioData = () => setDuration(audioRef.current?.duration || 0);
    const setAudioTime = () => {
      if (!isScrubbingRef.current) setProgress(audioRef.current?.currentTime || 0);
    };
    const handleEnded = () => {
      setIsPlaying(false);
      setProgress(0);
    };

    audioRef.current.addEventListener('loadedmetadata', setAudioData);
    audioRef.current.addEventListener('timeupdate', setAudioTime);
    audioRef.current.addEventListener('ended', handleEnded);

    if ('mediaSession' in navigator) {
      navigator.mediaSession.metadata = new MediaMetadata({
        title: currentTrack.title,
        artist: currentTrack.artist,
        artwork: [{ src: currentTrack.cover, sizes: '512x512', type: 'image/jpeg' }]
      });
    }

    const handleClickOutside = (e: MouseEvent) => {
      if (playerRef.current && !playerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.removeEventListener('loadedmetadata', setAudioData);
        audioRef.current.removeEventListener('timeupdate', setAudioTime);
        audioRef.current.removeEventListener('ended', handleEnded);
        audioRef.current = null;
      }
    };
  }, []);

  const togglePlay = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (!audioRef.current) return;
    
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => setIsPlaying(true)).catch(console.error);
    }
  };

  const lastTimeReal = useRef<number>(0);
  const lastTimeAudio = useRef<number>(0);

  const handleSeekStart = () => {
    isScrubbingRef.current = true;
    lastTimeReal.current = performance.now();
    if (audioRef.current) {
      lastTimeAudio.current = audioRef.current.currentTime;
      if ('preservesPitch' in audioRef.current) {
        audioRef.current.preservesPitch = false;
      }
      if (!isPlaying) {
        audioRef.current.play().catch(() => {});
      }
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = Number(e.target.value);
    dragValue.current = time;
    setProgress(time);

    if (audioRef.current) {
      const now = performance.now();
      const dtReal = (now - lastTimeReal.current) / 1000;
      const dtAudio = Math.abs(time - lastTimeAudio.current);
      
      if (dtReal > 0.03) {
        audioRef.current.currentTime = time;
        
        let speed = dtAudio / dtReal;
        speed = Math.max(0.5, Math.min(speed, 3.5));
        audioRef.current.playbackRate = speed;

        lastTimeReal.current = now;
        lastTimeAudio.current = time;
      }
    }
  };

  const handleSeekEnd = () => {
    isScrubbingRef.current = false;
    if (audioRef.current && dragValue.current !== null) {
      audioRef.current.currentTime = dragValue.current;
      audioRef.current.playbackRate = 1.0;
      if ('preservesPitch' in audioRef.current) {
        audioRef.current.preservesPitch = true;
      }
      
      if (isPlaying) {
        audioRef.current.play().catch(() => {});
      } else {
        audioRef.current.pause();
      }
      dragValue.current = null;
    }
  };

  const formatTime = (time: number) => {
    if (isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleMouseEnter = () => {
    if (closeTimeout.current) clearTimeout(closeTimeout.current);
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    closeTimeout.current = setTimeout(() => {
      setIsOpen(false);
    }, 400);
  };

  return (
    <div 
      className="relative z-50" 
      ref={playerRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`w-10 h-10 flex items-center justify-center rounded-full border transition-all duration-300 relative group bg-cream-peach/5 dark:bg-olive-green/5 backdrop-blur-sm
          ${isOpen ? 'border-juicy-orange text-juicy-orange' : 'border-olive-green/20 text-olive-green dark:text-cream-peach hover:border-juicy-orange hover:text-juicy-orange'}`}
        aria-label="Toggle Player"
      >
        <div className="flex gap-[2px] items-end h-[14px]">
          {[1, 2, 3, 4].map((i) => (
            <motion.div
              key={i}
              className="w-[2px] bg-current rounded-sm"
              initial={{ height: '20%' }}
              animate={
                isPlaying
                  ? { height: ['20%', '100%', '40%', '90%', '20%'] }
                  : { height: '20%' }
              }
              transition={{
                repeat: isPlaying ? Infinity : 0,
                duration: 0.8 + i * 0.15,
                ease: "easeInOut",
                repeatType: "mirror"
              }}
            />
          ))}
        </div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.95, filter: 'blur(5px)' }}
            animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: 10, scale: 0.95, filter: 'blur(2px)' }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed top-20 left-1/2 -translate-x-1/2 w-[90vw] max-w-[260px] sm:absolute sm:top-14 sm:left-auto sm:right-0 sm:translate-x-0 sm:w-72 sm:max-w-none p-4 sm:p-5 rounded-3xl bg-cream-peach/95 dark:bg-dark-bg/95 backdrop-blur-xl border border-olive-green/20 dark:border-olive-green/10 shadow-2xl flex flex-col gap-3 sm:gap-5 sm:origin-top-right"
          >
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="w-12 h-12 sm:w-14 sm:h-14 overflow-hidden shrink-0 bg-olive-green/10 dark:bg-olive-green/20 relative shadow-inner">
                {!imgError ? (
                  <img 
                    src={currentTrack.cover} 
                    alt="Track cover" 
                    className={`w-full h-full object-cover transition-transform duration-[4s] ease-out ${isPlaying ? 'scale-110' : 'scale-100'}`}
                    onError={() => setImgError(true)}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-olive-green/40 dark:text-cream-peach/40">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" opacity="0.5">
                      <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
                    </svg>
                  </div>
                )}
              </div>
              <div className="flex flex-col overflow-hidden">
                <span className="font-serif text-xl font-medium leading-tight text-olive-green dark:text-cream-peach truncate">
                  {currentTrack.title}
                </span>
                <span className="text-xs font-mono opacity-60 text-dark-bg dark:text-cream-peach truncate mt-0.5 uppercase tracking-wider">
                  {currentTrack.artist}
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <input 
                type="range" 
                min={0} 
                max={duration || 100} 
                value={progress}
                onChange={handleSeek}
                onMouseDown={handleSeekStart}
                onMouseUp={handleSeekEnd}
                onTouchStart={handleSeekStart}
                onTouchEnd={handleSeekEnd}
                className="w-full h-1.5 bg-olive-green/15 dark:bg-cream-peach/10 rounded-full appearance-none cursor-pointer accent-juicy-orange focus:outline-none focus:ring-2 focus:ring-juicy-orange/30 transition-all"
              />
              <div className="flex justify-between w-full text-[10px] font-mono text-olive-green/60 dark:text-cream-peach/50">
                <span>{formatTime(progress)}</span>
                <span>{formatTime(duration)}</span>
              </div>
            </div>

            <div className="flex items-center justify-between px-2">
              <span className="text-[9px] font-mono uppercase tracking-[0.2em] text-olive-green/40 dark:text-cream-peach/40">
                BGM Mode
              </span>
              <button 
                onClick={togglePlay}
                className="w-12 h-12 rounded-full bg-olive-green text-cream-peach dark:bg-cream-peach dark:text-dark-bg flex items-center justify-center shadow-lg hover:scale-105 hover:bg-juicy-orange dark:hover:bg-juicy-orange dark:hover:text-dark-bg active:scale-95 transition-all duration-300"
              >
                {isPlaying ? (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <rect x="6" y="4" width="4" height="16" rx="1"/>
                    <rect x="14" y="4" width="4" height="16" rx="1"/>
                  </svg>
                ) : (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="ml-1">
                    <path d="M7 4.5v15a1 1 0 001.52.85l12-7.5a1 1 0 000-1.7l-12-7.5A1 1 0 007 4.5z"/>
                  </svg>
                )}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
