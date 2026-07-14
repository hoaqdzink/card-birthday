import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';

export default function InteractiveCake() {
  const [candles, setCandles] = useState([true, true, true]); // 3 candles
  const [wished, setWished] = useState(false);

  const blowCandle = (index: number) => {
    if (!candles[index]) return;
    
    const newCandles = [...candles];
    newCandles[index] = false;
    setCandles(newCandles);
  };

  useEffect(() => {
    if (candles.every(c => !c)) {
      setTimeout(() => {
        setWished(true);
        confetti({
          particleCount: 150,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#EF6A86', '#F6B8C8', '#FFF5F2', '#FFD700']
        });
        
        // Notify AutoScroll to resume after fireworks
        window.dispatchEvent(new Event('resumeAutoScroll'));
      }, 500);
    }
  }, [candles]);

  return (
    <div className="w-full px-6 py-16 flex flex-col items-center z-10 text-center">
      <motion.div 
        className="bg-white p-8 rounded-3xl shadow-soft w-full max-w-[320px] relative border border-powder-pink/30"
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
      >
        <h3 className="font-serif text-2xl text-text-brown mb-2">Thổi nến nhé!</h3>
        <p className="font-body text-xs text-text-brown/60 mb-8">Chạm vào từng ngọn nến để thổi và ước một điều.</p>

        {/* The Cake */}
        <div className="relative w-48 h-48 mx-auto flex flex-col items-center justify-end mt-4">
          
          {/* Candles */}
          <div className="flex gap-6 z-20 relative top-6">
            {candles.map((isOn, idx) => (
              <div 
                key={idx} 
                className="relative cursor-pointer group flex flex-col items-center"
                onClick={() => blowCandle(idx)}
              >
                {/* Flame */}
                <AnimatePresence>
                  {isOn && (
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 w-3 h-6 mb-[-4px] z-30">
                      <motion.div 
                        className="w-full h-full bg-gradient-to-t from-orange-500 via-yellow-400 to-yellow-100 rounded-full blur-[0.5px]"
                        style={{ borderRadius: "50% 50% 50% 50% / 60% 60% 40% 40%", transformOrigin: "bottom center" }}
                        animate={{ scale: [1, 1.15, 1], rotate: [-3, 3, -3] }}
                        transition={{ duration: 0.6, repeat: Infinity }}
                        exit={{ opacity: 0, scale: 0 }}
                      />
                    </div>
                  )}
                </AnimatePresence>
                {/* Candle Body */}
                <div className="w-4 h-14 bg-gradient-to-b from-white to-[#f9d6de] rounded-t-md shadow-sm border border-powder-pink flex flex-col items-center justify-evenly overflow-hidden relative z-20">
                  {/* Stripes */}
                  <div className="w-full h-1 bg-rose-pink/40 -rotate-12 absolute top-2" />
                  <div className="w-full h-1 bg-rose-pink/40 -rotate-12 absolute top-6" />
                  <div className="w-full h-1 bg-rose-pink/40 -rotate-12 absolute top-10" />
                </div>
              </div>
            ))}
          </div>

          {/* Cake Top Tier */}
          <div className="relative z-10 w-36 h-14 bg-[#fff1f4] rounded-t-xl border-t-2 border-l-2 border-r-2 border-powder-pink shadow-[inset_0_-5px_10px_rgba(246,184,200,0.2)]">
            {/* Drip frosting */}
            <div className="absolute top-0 left-0 w-full flex justify-between px-1">
               <div className="w-5 h-8 bg-white rounded-b-full shadow-sm" />
               <div className="w-6 h-10 bg-white rounded-b-full shadow-sm" />
               <div className="w-7 h-7 bg-white rounded-b-full shadow-sm" />
               <div className="w-5 h-9 bg-white rounded-b-full shadow-sm" />
            </div>
          </div>
          
          {/* Cake Bottom Tier */}
          <div className="relative z-0 w-44 h-16 bg-[#fde9ed] rounded-t-lg border-t border-l border-r border-powder-pink shadow-md overflow-hidden">
             {/* Small decoration line */}
             <div className="absolute top-2 left-0 w-full h-[2px] bg-white/60 border-b border-powder-pink/30 border-dashed" />
          </div>
          
          {/* Plate */}
          <div className="w-56 h-4 bg-gray-200 rounded-full mt-[-2px] shadow-[0_5px_15px_rgba(0,0,0,0.1)] relative z-30" />
        </div>

        <AnimatePresence>
          {wished && (
            <motion.div 
              className="absolute inset-0 bg-white/90 backdrop-blur-sm rounded-3xl flex items-center justify-center flex-col z-30"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              <div className="text-5xl mb-4">✨</div>
              <h4 className="font-script text-3xl text-accent-red mb-2">Tuyệt vời!</h4>
              <p className="font-body text-sm text-text-brown">Điều ước của bạn đã được gửi đi.</p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
