import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, FastForward, Rewind, Info } from 'lucide-react';

export default function StoryModeController() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(1); // 1x, 1.5x, 2x
  const [showControls, setShowControls] = useState(true);
  
  const requestRef = useRef<number | null>(null);
  const isUserScrolling = useRef(false);
  const scrollTimeout = useRef<number | null>(null);

  const speeds = [1, 1.5, 2];

  const togglePlay = () => setIsPlaying(!isPlaying);

  const cycleSpeed = () => {
    const nextIndex = (speeds.indexOf(speed) + 1) % speeds.length;
    setSpeed(speeds[nextIndex]);
  };

  const smoothScroll = () => {
    if (isPlaying && !isUserScrolling.current) {
      // Base scroll amount, scaled by speed
      window.scrollBy(0, 0.5 * speed); 
      
      // Stop if reached bottom
      if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 10) {
        setIsPlaying(false);
      }
    }
    requestRef.current = requestAnimationFrame(smoothScroll);
  };

  useEffect(() => {
    requestRef.current = requestAnimationFrame(smoothScroll);
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [isPlaying, speed]);

  // Pause auto-scroll if user manually scrolls
  useEffect(() => {
    const handleScroll = () => {
      isUserScrolling.current = true;
      if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
      
      scrollTimeout.current = setTimeout(() => {
        isUserScrolling.current = false;
      }, 1000); // Resume auto scroll after 1s of no manual interaction
    };

    window.addEventListener('wheel', handleScroll);
    window.addEventListener('touchmove', handleScroll);

    return () => {
      window.removeEventListener('wheel', handleScroll);
      window.removeEventListener('touchmove', handleScroll);
      if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
    };
  }, []);

  // Hide controls after a few seconds of no interaction
  useEffect(() => {
    const timer = setTimeout(() => {
      if (isPlaying) setShowControls(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, [isPlaying]);

  return (
    <div 
      className="fixed bottom-24 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center"
      onMouseEnter={() => setShowControls(true)}
      onClick={() => setShowControls(true)}
    >
      <AnimatePresence>
        {isPlaying && !showControls && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="bg-white/80 backdrop-blur-md px-4 py-2 rounded-full shadow-soft text-xs font-bold text-accent-red flex items-center gap-2"
          >
            <div className="w-2 h-2 rounded-full bg-accent-red animate-pulse" />
            Đang tự phát câu chuyện
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showControls && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="mt-2 bg-white/90 backdrop-blur-lg px-6 py-3 rounded-full shadow-float border border-powder-pink flex items-center gap-6"
          >
            <button onClick={togglePlay} className="text-text-brown hover:text-accent-red transition-colors active:scale-90">
              {isPlaying ? <Pause fill="currentColor" size={24} /> : <Play fill="currentColor" size={24} />}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
