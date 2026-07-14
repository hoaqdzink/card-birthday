import React from 'react';
import { motion } from 'framer-motion';
import { birthdayData } from '../config/birthdayData';
import { Share2, RotateCcw } from 'lucide-react';

export default function BirthdayEnding() {
  const handleShare = async () => {
    try {
      await navigator.share({
        title: `Happy Birthday ${birthdayData.recipientName}!`,
        url: window.location.href,
      });
    } catch (err) {
      console.log('Share failed', err);
    }
  };

  return (
    <div className="w-full px-6 py-20 flex flex-col items-center z-10 text-center bg-white/50 rounded-t-[40px] mt-20 backdrop-blur-md border-t border-powder-pink/30 shadow-[0_-10px_40px_rgba(244,139,168,0.1)]">
      
      <motion.div 
        className="w-full max-w-[280px] aspect-[4/5] bg-white p-3 pb-12 rounded-lg shadow-float mb-10 rotate-3 border border-powder-pink/30 relative"
        initial={{ opacity: 0, scale: 0.9, y: 50 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ type: "spring", damping: 15 }}
      >
        <div className="w-full h-full bg-gray-100 rounded-sm overflow-hidden">
          <img src={birthdayData.finalImage} alt="Final Portrait" className="w-full h-full object-cover" />
        </div>
        <div className="absolute bottom-3 left-0 w-full text-center font-script text-3xl text-accent-red">
          Love you!
        </div>
        <div className="absolute -top-4 right-4 text-4xl -rotate-12">💖</div>
      </motion.div>

      <motion.h2 
        className="font-serif text-3xl text-text-brown mb-4 italic"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        Một lần nữa, <br/> chúc mừng sinh nhật em.
      </motion.h2>

      <motion.p 
        className="font-body text-[15px] leading-relaxed text-text-brown/80 mb-10 max-w-[320px]"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
      >
        {birthdayData.finalMessage}
      </motion.p>

      <motion.div 
        className="flex gap-4"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4 }}
      >
        <button 
          onClick={handleShare}
          className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-soft text-accent-red hover:bg-accent-red hover:text-white transition-colors"
        >
          <Share2 size={20} />
        </button>
        <button 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-soft text-accent-red hover:bg-accent-red hover:text-white transition-colors"
        >
          <RotateCcw size={20} />
        </button>
      </motion.div>

      <div className="mt-16 font-script text-4xl text-rose-pink/50">
        From {birthdayData.senderName} <br/> with love
      </div>
    </div>
  );
}
