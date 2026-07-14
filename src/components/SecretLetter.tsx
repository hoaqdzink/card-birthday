import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { birthdayData } from '../config/birthdayData';
import { MailOpen, X } from 'lucide-react';

export default function SecretLetter() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full px-6 py-12 flex flex-col items-center z-10">
      
      {/* Envelope Button */}
      <motion.button 
        className="relative w-[280px] h-[180px] bg-white rounded-xl shadow-float flex flex-col items-center justify-center cursor-pointer border border-powder-pink group overflow-hidden"
        animate={{ rotate: [0, -3, 3, -3, 3, 0] }}
        transition={{ duration: 1.2, repeat: Infinity, repeatDelay: 2 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(true)}
      >
        {/* Envelope Flaps (CSS drawing - better version) */}
        <div className="absolute top-0 left-0 w-full h-full bg-[#fdf5f7]">
          {/* Top Flap */}
          <div className="absolute top-0 left-0 w-full h-1/2 bg-[#fbe7ec] origin-top border-b border-white shadow-sm" style={{ clipPath: 'polygon(0 0, 100% 0, 50% 100%)' }} />
          {/* Bottom Flap */}
          <div className="absolute bottom-0 left-0 w-full h-1/2 bg-[#faecef]" style={{ clipPath: 'polygon(0 100%, 100% 100%, 50% 0)' }} />
        </div>
        
        {/* Wax Seal */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 w-14 h-14 bg-accent-red rounded-full flex items-center justify-center shadow-[0_4px_10px_rgba(239,106,134,0.4)] border-2 border-[#d9536e] group-hover:scale-110 transition-transform duration-300">
          <MailOpen size={24} className="text-white" strokeWidth={1.5} />
        </div>

        <div className="absolute bottom-4 font-script text-2xl text-accent-red z-30 drop-shadow-sm bg-white/80 px-4 py-1 rounded-full backdrop-blur-sm">
          Mở thư nhé!
        </div>
      </motion.button>

      {/* Modal / Letter Content */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            className="fixed inset-0 z-[100] flex items-center justify-center px-4"
          >
            {/* Backdrop */}
            <motion.div 
              className="absolute inset-0 bg-black/30 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />

            {/* Letter Paper */}
            <motion.div 
              className="relative w-full max-w-[340px] bg-[#FCF8F5] rounded-lg shadow-float p-8 max-h-[80vh] overflow-y-auto no-scrollbar"
              initial={{ y: "100vh", opacity: 0, rotate: -5 }}
              animate={{ y: 0, opacity: 1, rotate: 0 }}
              exit={{ y: "100vh", opacity: 0, rotate: 5 }}
              transition={{ type: "spring", damping: 20, stiffness: 100 }}
              style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/cream-paper.png')" }}
            >
              <button 
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 text-text-brown/50 hover:text-accent-red"
              >
                <X size={24} />
              </button>

              <div className="mb-6 flex justify-center">
                <div className="w-10 h-1 bg-powder-pink rounded-full opacity-50" />
              </div>

              <div className="space-y-4">
                {birthdayData.letterContent.map((para, idx) => (
                  <p key={idx} className={`text-text-brown leading-relaxed ${idx === 0 ? 'font-serif text-xl font-bold' : 'font-body text-sm'}`}>
                    {para}
                  </p>
                ))}
              </div>

              <div className="mt-10 text-right">
                <p className="font-body text-xs text-text-brown/60 mb-2">Thương gửi từ,</p>
                <p className="font-script text-3xl text-accent-red">{birthdayData.senderName}</p>
              </div>

              {/* Decorative doodles */}
              <div className="absolute bottom-4 left-4 text-2xl opacity-40 rotate-12">🌸</div>
              <div className="absolute top-8 left-4 text-xl opacity-30 -rotate-12">✨</div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
