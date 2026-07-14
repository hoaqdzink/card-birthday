import React from 'react';
import { motion } from 'framer-motion';

const elements = [
  { char: '🌸', top: '10%', left: '5%', dur: 15, delay: 0 },
  { char: '✨', top: '25%', left: '85%', dur: 12, delay: 2 },
  { char: '🎀', top: '45%', left: '10%', dur: 18, delay: 1 },
  { char: '🌷', top: '65%', left: '80%', dur: 14, delay: 4 },
  { char: '💖', top: '85%', left: '15%', dur: 16, delay: 3 },
  { char: '✨', top: '95%', left: '75%', dur: 13, delay: 1 },
];

export default function FloatingDecor() {
  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden z-0">
      {elements.map((el, i) => (
        <motion.div
          key={i}
          className="absolute text-2xl opacity-40 drop-shadow-sm"
          style={{ top: el.top, left: el.left }}
          animate={{
            y: [0, -30, 0, 20, 0],
            x: [0, 15, 0, -15, 0],
            rotate: [0, 10, -10, 5, 0]
          }}
          transition={{
            duration: el.dur,
            delay: el.delay,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          {el.char}
        </motion.div>
      ))}
      
      {/* Soft gradient blobs for background color depth */}
      <div className="fixed top-[-10%] left-[-10%] w-[50%] h-[50%] bg-rose-pink/10 rounded-full blur-3xl" />
      <div className="fixed bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-powder-pink/20 rounded-full blur-3xl" />
    </div>
  );
}
