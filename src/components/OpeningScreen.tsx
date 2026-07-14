import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { birthdayData } from '../config/birthdayData';
import confetti from 'canvas-confetti';

import { bgMusic } from './MusicPlayer';

interface Props {
  onOpen: () => void;
}

export default function OpeningScreen({ onOpen }: Props) {
  const [isOpening, setIsOpening] = useState(false);

  const handleOpen = () => {
    // Skip the first 5 seconds
    bgMusic.currentTime = 5;
    // Synchronous play to satisfy browser policies
    bgMusic.play().catch(e => console.log("Audio play failed:", e));
    
    setIsOpening(true);
    
    confetti({
      particleCount: 80,
      spread: 60,
      origin: { y: 0.6 },
      colors: ['#F9D6DE', '#F6B8C8', '#F48BA8', '#EF6A86', '#F3D9A2']
    });

    setTimeout(() => {
      onOpen();
    }, 1500);
  };

  return (
    <AnimatePresence>
      {!isOpening && (
        <motion.div 
          className="fixed inset-0 z-[100] bg-soft-white flex flex-col items-center justify-center px-6 overflow-hidden bg-grain"
          exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
        >
          {/* Decorative floating items */}
          <motion.div className="absolute top-20 left-10 text-4xl opacity-50" animate={{ y: [0, -10, 0], rotate: [0, 5, 0] }} transition={{ duration: 3, repeat: Infinity }}>🌸</motion.div>
          <motion.div className="absolute bottom-32 right-10 text-4xl opacity-50" animate={{ y: [0, 15, 0], rotate: [0, -10, 0] }} transition={{ duration: 4, repeat: Infinity }}>🎀</motion.div>
          <motion.div className="absolute top-1/3 right-12 text-3xl opacity-50" animate={{ y: [0, -8, 0], rotate: [0, 15, 0] }} transition={{ duration: 3.5, repeat: Infinity }}>✨</motion.div>

          <motion.div 
            className="bg-white/80 backdrop-blur-md p-10 rounded-3xl shadow-float border border-powder-pink/50 flex flex-col items-center text-center max-w-sm relative z-10"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="w-16 h-16 bg-powder-pink rounded-full flex items-center justify-center mb-6 shadow-inner-soft">
              <span className="text-3xl">💌</span>
            </div>
            
            <h1 className="font-serif text-3xl text-text-brown mb-2">Happy Birthday</h1>
            <p className="font-body text-sm text-text-brown/70 mb-8 leading-relaxed">
              Một điều thật đặc biệt dành riêng cho <br/> 
              <span className="font-script text-3xl text-accent-red block mt-2">{birthdayData.recipientName}</span>
            </p>

            <motion.button
              onClick={handleOpen}
              className="px-8 py-3 bg-gradient-to-r from-rose-pink to-accent-red text-white font-bold rounded-full shadow-soft hover:shadow-float active:scale-95 transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Mở thiệp
            </motion.button>
          </motion.div>

        </motion.div>
      )}
    </AnimatePresence>
  );
}
