import React from 'react';
import { motion } from 'framer-motion';
import { birthdayData } from '../config/birthdayData';

export default function HighlightQuote() {
  return (
    <div className="w-full px-6 py-12 flex justify-center z-10">
      <motion.div 
        className="relative w-full bg-powder-pink/30 rounded-[32px] p-8 text-center shadow-inner-soft overflow-hidden"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
      >
        {/* Decorative quotes */}
        <div className="absolute top-4 left-6 text-6xl font-serif text-white/60 opacity-50 select-none">"</div>
        <div className="absolute bottom-[-10px] right-6 text-6xl font-serif text-white/60 opacity-50 select-none rotate-180">"</div>

        <motion.p 
          className="font-serif text-[22px] leading-relaxed text-text-brown relative z-10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 1 }}
        >
          {birthdayData.highlightQuote}
        </motion.p>
      </motion.div>
    </div>
  );
}
