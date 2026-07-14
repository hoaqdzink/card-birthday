import React from 'react';
import { motion } from 'framer-motion';

interface Props {
  quote: string;
  align?: 'left' | 'right' | 'center';
  rotate?: number;
}

export default function MessageCards({ quote, align = 'center', rotate = 0 }: Props) {
  return (
    <div className={`w-full px-8 py-8 flex ${align === 'left' ? 'justify-start' : align === 'right' ? 'justify-end' : 'justify-center'} z-10`}>
      <motion.div 
        className="bg-white/90 backdrop-blur-sm px-6 py-4 rounded-xl shadow-sm border border-powder-pink/40 max-w-[260px]"
        initial={{ opacity: 0, scale: 0.9, rotate: rotate * 2 }}
        whileInView={{ opacity: 1, scale: 1, rotate: rotate }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ type: "spring", damping: 15 }}
        whileHover={{ scale: 1.05, rotate: 0 }}
      >
        <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-8 h-8 flex items-center justify-center bg-warm-cream rounded-full border border-powder-pink/30 shadow-sm text-sm">
          🌷
        </div>
        <p className="font-script text-2xl text-text-brown text-center mt-2 leading-relaxed">
          {quote}
        </p>
      </motion.div>
    </div>
  );
}
