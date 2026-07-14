import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { birthdayData } from '../config/birthdayData';
import { Send } from 'lucide-react';

export default function PhotoGallery() {
  const trackRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start center", "end center"]
  });

  const yKeyframes = [
    0.04, 0.13, 0.14, 0.23, 0.24, 0.33, 0.34, 0.43, 0.44, 0.54, 
    0.55, 0.64, 0.65, 0.74, 0.75, 0.84, 0.85, 0.95, 0.96
  ];
  const xKeyframes = [
    "38%", "62%", "62%", "38%", "38%", "62%", "62%", "38%", "38%", "62%", 
    "62%", "38%", "38%", "62%", "62%", "38%", "38%", "62%", "62%"
  ];
  const rotateKeyframes = [
    90, 90, 180, 180, 90, 90, 180, 180, 90, 90, 
    180, 180, 90, 90, 180, 180, 90, 90, 180
  ];

  const planeY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const planeX = useTransform(scrollYProgress, yKeyframes, xKeyframes);
  const planeRotate = useTransform(scrollYProgress, yKeyframes, rotateKeyframes);
  const planeOpacity = useTransform(scrollYProgress, [0, 0.9, 0.96], [1, 1, 0]);

  const photos = birthdayData.galleryImages || [];

  if (photos.length === 0) return null;

  return (
    <div className="w-full px-6 py-16 flex flex-col items-center z-10 overflow-hidden">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        className="text-center mb-16"
      >
        <h2 className="font-serif text-3xl text-primary-dark mb-2">Những khoảnh khắc</h2>
        <p className="font-serif italic text-2xl text-accent-red">đáng nhớ nhất của chị</p>
      </motion.div>

      <div ref={trackRef} className="w-full flex flex-col space-y-16 relative mt-4 pb-12">
        {/* Đường nét đứt ziczac ở background */}
        <svg 
          className="absolute top-0 left-0 w-full h-full z-0 overflow-visible opacity-50"
          viewBox="0 0 100 100" 
          preserveAspectRatio="none"
          style={{ maskImage: "linear-gradient(to bottom, black 85%, transparent 96%)", WebkitMaskImage: "linear-gradient(to bottom, black 85%, transparent 96%)" }}
        >
          <polyline 
            points="38,4 62,14 38,24 62,34 38,44 62,55 38,65 62,75 38,85 62,96" 
            fill="none" 
            stroke="#EF6A86" 
            strokeWidth="1.5" 
            strokeDasharray="6, 8" 
            vectorEffect="non-scaling-stroke"
          />
        </svg>
        
        {/* Máy bay giấy lướt theo Scroll */}
        <motion.div 
          className="absolute z-0 text-accent-red drop-shadow-md origin-center"
          style={{ 
            top: planeY, 
            left: planeX, 
            rotate: planeRotate,
            opacity: planeOpacity,
            x: "-50%", // Center the plane on its coordinates
            y: "-50%"
          }}
        >
          <Send size={28} fill="currentColor" strokeWidth={1} />
        </motion.div>

        {photos.map((photo, idx) => {
          // Alternating animation: even index comes from left (-100), odd comes from right (100)
          const isEven = idx % 2 === 0;
          const initialX = isEven ? -100 : 100;
          
          // Randomize rotation slightly based on index
          const baseRotation = isEven ? -4 : 4;
          const rotation = baseRotation + (idx % 3 === 0 ? 2 : -1);
          
          // Small horizontal offset to make it look messy
          const offsetX = isEven ? 'ml-2' : 'mr-2';

          return (
            <motion.div
              key={idx}
              className={`relative z-10 w-full max-w-[260px] ${isEven ? 'self-start' : 'self-end'} ${offsetX}`}
              initial={{ opacity: 0, x: initialX, rotate: isEven ? -15 : 15 }}
              whileInView={{ opacity: 1, x: 0, rotate: rotation }}
              viewport={{ once: true, margin: "-15%" }}
              transition={{ type: "spring", stiffness: 60, damping: 15, delay: 0.1 }}
              whileHover={{ scale: 1.08, rotate: 0, zIndex: 30 }}
            >
              {/* Photo Frame */}
              <div className="bg-white p-3 pb-12 rounded-sm shadow-xl border border-gray-100">
                <div className="relative w-full aspect-[4/5] overflow-hidden rounded-sm border border-gray-100">
                  <img 
                    src={photo.url} 
                    alt={`Memory ${idx + 1}`} 
                    className="w-full h-full object-cover sepia-[0.05] hover:sepia-0 transition-all duration-500"
                    loading="lazy"
                  />
                </div>
                {photo.caption && (
                  <p className="font-serif italic text-2xl md:text-3xl text-center text-gray-800 mt-6 px-2 leading-relaxed">
                    {photo.caption}
                  </p>
                )}
              </div>

              {/* Decorative Tape */}
              <div 
                className={`absolute -top-3 ${isEven ? 'left-1/2 -translate-x-1/2 rotate-[-4deg]' : 'right-1/2 translate-x-1/2 rotate-[4deg]'} w-28 h-8 bg-white/40 backdrop-blur-md border border-white/40 shadow-sm`}
              />
              
              {/* Random Doodle behind the photo */}
              {idx % 3 === 0 && (
                <div className={`absolute -bottom-6 ${isEven ? '-right-6 rotate-12' : '-left-6 -rotate-12'} text-3xl opacity-40 z-[-1]`}>
                  🌸
                </div>
              )}
              {idx % 3 === 1 && (
                <div className={`absolute -top-6 ${isEven ? '-left-6 -rotate-12' : '-right-6 rotate-12'} text-2xl opacity-40 z-[-1]`}>
                  ✨
                </div>
              )}
              {idx % 3 === 2 && (
                <div className={`absolute top-1/2 ${isEven ? '-right-8 rotate-12' : '-left-8 -rotate-12'} text-2xl opacity-30 z-[-1]`}>
                  🤍
                </div>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
