import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { QrCode } from 'lucide-react';

export default function FloatingElements() {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 2000], [0, -300]);
  const y2 = useTransform(scrollY, [0, 2000], [0, -600]);
  const y3 = useTransform(scrollY, [0, 2000], [0, -200]);

  return (
    <>
      {/* Sticky QR Code on the right */}
      <motion.div 
        className="fixed top-20 right-2 md:right-[calc(50%-230px)] z-50 bg-white p-2 rounded-lg shadow-lg border border-pastel-pink/20 flex flex-col items-center gap-1 cursor-pointer"
        initial={{ x: 100 }}
        animate={{ x: 0 }}
        transition={{ delay: 1, type: "spring" }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <QrCode size={32} className="text-blush-red" />
        <span className="text-[9px] font-bold text-warm-gray">Gửi quà</span>
      </motion.div>

      {/* Romantic Falling Petals */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-10">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={`petal-${i}`}
            className="absolute top-[-50px] w-3 h-4 bg-pastel-pink/40 rounded-full"
            style={{
              borderRadius: "50% 0 50% 50%",
              filter: "blur(1px)",
              left: `${Math.random() * 100}vw`
            }}
            animate={{
              y: ["-10vh", "110vh"],
              x: [0, Math.random() * 100 - 50, Math.random() * 100 - 50],
              rotate: [0, Math.random() * 360],
              scale: [Math.random() * 0.5 + 0.5, Math.random() * 0.5 + 0.5]
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              ease: "linear",
              delay: Math.random() * 10
            }}
          />
        ))}
      </div>

      {/* Floating Background Stickers inside the main container */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {/* Star */}
        <motion.div 
          className="absolute top-[10%] left-4 text-3xl opacity-60"
          animate={{ rotate: [0, 5, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
          style={{ y: y1 }}
        >
          ✨
        </motion.div>
        
        {/* Ribbon */}
        <motion.div 
          className="absolute top-[30%] right-2 text-4xl opacity-70"
          animate={{ rotate: [0, -10, 0] }}
          transition={{ duration: 5, repeat: Infinity }}
          style={{ y: y2 }}
        >
          🎀
        </motion.div>

        {/* Cake */}
        <motion.div 
          className="absolute top-[60%] left-2 text-4xl opacity-80"
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 3.5, repeat: Infinity }}
          style={{ y: y3 }}
        >
          🎂
        </motion.div>

        {/* Confetti */}
        <motion.div 
          className="absolute top-[80%] right-6 text-3xl opacity-60"
          animate={{ rotate: [0, 20, 0] }}
          transition={{ duration: 4.5, repeat: Infinity }}
          style={{ y: y1 }}
        >
          🎊
        </motion.div>
      </div>
    </>
  );
}
