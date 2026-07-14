import React from 'react';
import { motion } from 'framer-motion';
import { birthdayData } from '../config/birthdayData';

export default function HeroAvatar() {
  return (
    <div className="w-full pt-16 flex flex-col items-center px-6 text-center">
      
      {/* Small top decorative text */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-2 text-pastel-pink text-sm tracking-widest font-bold uppercase mb-8"
      >
        <span>✧</span>
        <span>Happy Birthday</span>
        <span>✧</span>
      </motion.div>

      {/* Main Polaroid Avatar */}
      <motion.div 
        className="relative bg-white p-3 pb-8 rounded-sm shadow-[0_15px_35px_rgba(0,0,0,0.1)] w-[280px] rotate-[-2deg] mb-10"
        initial={{ opacity: 0, scale: 0.9, rotate: 0 }}
        animate={{ opacity: 1, scale: 1, rotate: -2 }}
        transition={{ type: "spring", damping: 20, delay: 0.2 }}
      >
        <div className="w-full aspect-[4/5] overflow-hidden rounded-sm bg-gray-100">
          <img 
            src={birthdayData.heroImage} 
            alt="Hero Avatar" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute bottom-2 left-0 w-full text-center font-script text-2xl text-soft-brown">
          {birthdayData.recipientName}
        </div>
        
        {/* Floating Heart Sticker */}
        <motion.div 
          className="absolute -top-4 -right-4 text-4xl drop-shadow-md"
          animate={{ y: [0, -5, 0], rotate: [10, -10, 10] }}
          transition={{ repeat: Infinity, duration: 3 }}
        >
          💖
        </motion.div>
      </motion.div>

      <motion.div 
        className="font-script text-[42px] text-blush-red leading-tight mt-4"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={{
          visible: { transition: { staggerChildren: 0.1 } },
          hidden: {}
        }}
      >
        {("Chúc mừng sinh nhật\n" + birthdayData.recipientName).split("").map((char, index) => (
          <motion.span
            key={index}
            variants={{
              visible: { opacity: 1, y: 0 },
              hidden: { opacity: 0, y: 20 }
            }}
            transition={{ type: "spring", damping: 12, stiffness: 200 }}
            style={{ display: char === '\n' ? 'block' : 'inline-block', whiteSpace: 'pre' }}
          >
            {char}
          </motion.span>
        ))}
      </motion.div>
      
    </div>
  );
}
