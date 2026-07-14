import React from 'react';
import { motion } from 'framer-motion';
import { birthdayData } from '../config/birthdayData';

export default function BirthdayHero() {
  return (
    <div className="relative w-full pt-20 pb-16 flex flex-col items-center px-6 z-10">
      
      {/* Decorative Label */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-white/80 backdrop-blur-sm px-4 py-1 rounded-full border border-powder-pink shadow-sm text-xs font-bold text-accent-red uppercase tracking-widest mb-8 z-20"
      >
        Birthday Girl
      </motion.div>

      {/* Hero Image Collage */}
      <div className="relative w-full max-w-[300px] aspect-[3/4] mb-12">
        {/* Background decorative layers */}
        <motion.div 
          className="absolute inset-0 bg-blush-pink/20 rounded-2xl rotate-6 scale-105"
          initial={{ opacity: 0, rotate: 0 }}
          animate={{ opacity: 1, rotate: 6 }}
          transition={{ duration: 1, delay: 0.2 }}
        />
        <motion.div 
          className="absolute inset-0 bg-powder-pink/40 rounded-2xl -rotate-3 scale-105"
          initial={{ opacity: 0, rotate: 0 }}
          animate={{ opacity: 1, rotate: -3 }}
          transition={{ duration: 1, delay: 0.3 }}
        />

        {/* Main Photo inside a paper frame */}
        <motion.div 
          className="absolute inset-0 bg-white p-3 pb-12 rounded-lg shadow-float"
          initial={{ opacity: 0, scale: 0.9, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ type: "spring", damping: 15, delay: 0.4 }}
        >
          <div className="w-full h-full bg-gray-100 rounded-sm overflow-hidden">
            <img src={birthdayData.heroImage} alt="Birthday Girl" className="w-full h-full object-cover" />
          </div>
          
          {/* Polaroid Text */}
          <div className="absolute bottom-3 left-0 w-full text-center font-script text-2xl text-text-brown opacity-80">
            {birthdayData.birthdayDate}
          </div>

          {/* Tape */}
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-20 h-6 bg-white/50 backdrop-blur-md shadow-sm rotate-2 border border-white/40" style={{ clipPath: 'polygon(5% 0%, 95% 2%, 100% 100%, 0% 98%)' }} />
          
          {/* Floating Sticker */}
          <motion.div 
            className="absolute -right-6 -bottom-6 text-5xl drop-shadow-md"
            animate={{ rotate: [-5, 5, -5], scale: [1, 1.1, 1] }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            🎀
          </motion.div>
        </motion.div>
      </div>

      {/* Typography Section */}
      <div className="text-center w-full max-w-[320px] relative z-20">
        <motion.h2 
          className="font-serif text-3xl text-text-brown mb-2 italic"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          Chúc mừng sinh nhật
        </motion.h2>
        
        <motion.h1 
          className="font-script text-[64px] leading-none text-accent-red drop-shadow-sm mb-6"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", delay: 0.8 }}
        >
          {birthdayData.recipientName}
        </motion.h1>

        <motion.div 
          className="w-12 h-[1px] bg-blush-pink mx-auto mb-6"
          initial={{ width: 0 }}
          animate={{ width: 48 }}
          transition={{ delay: 1 }}
        />

        <motion.p 
          className="font-body text-[15px] leading-relaxed text-text-brown/80"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          {birthdayData.heroMessage}
        </motion.p>
      </div>

    </div>
  );
}
