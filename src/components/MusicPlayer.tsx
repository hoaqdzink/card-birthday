import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { birthdayData } from '../config/birthdayData';
import { Music, Play, Pause } from 'lucide-react';

// Create audio instance globally so it can be triggered anywhere if needed
export const bgMusic = new Audio(birthdayData.music.url);
bgMusic.volume = 0.5;

// Custom loop to always start from 5 seconds
bgMusic.addEventListener('ended', () => {
  bgMusic.currentTime = 5;
  bgMusic.play().catch(e => console.log(e));
});

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    // Try to play immediately on mount
    const playPromise = bgMusic.play();
    if (playPromise !== undefined) {
      playPromise.then(() => {
        setIsPlaying(true);
      }).catch((err) => {
        console.log("Auto-play prevented", err);
        setIsPlaying(false);
      });
    }

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    bgMusic.addEventListener('play', handlePlay);
    bgMusic.addEventListener('pause', handlePause);

    return () => {
      bgMusic.removeEventListener('play', handlePlay);
      bgMusic.removeEventListener('pause', handlePause);
    };
  }, []);

  const togglePlay = () => {
    if (isPlaying) {
      bgMusic.pause();
    } else {
      bgMusic.play();
    }
  };

  return (
    <motion.button 
      className="fixed bottom-6 right-4 z-50 w-12 h-12 rounded-full bg-white/90 backdrop-blur-md shadow-float border border-powder-pink/50 flex items-center justify-center text-accent-red hover:bg-powder-pink/30 transition-colors"
      onClick={togglePlay}
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ type: "spring", delay: 2 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      {isPlaying ? (
        <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 4, ease: "linear" }}>
          <Music size={20} fill="currentColor" />
        </motion.div>
      ) : (
        <Play size={20} fill="currentColor" className="ml-1" />
      )}
      
      {/* Tiny music notes floating out when playing */}
      {isPlaying && (
        <>
          <motion.div 
            className="absolute text-[10px] pointer-events-none"
            animate={{ y: [0, -30], x: [0, -10], opacity: [1, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >🎵</motion.div>
          <motion.div 
            className="absolute text-[8px] pointer-events-none"
            animate={{ y: [0, -40], x: [0, 15], opacity: [1, 0] }}
            transition={{ repeat: Infinity, duration: 2.5, delay: 1 }}
          >🎶</motion.div>
        </>
      )}
    </motion.button>
  );
}
