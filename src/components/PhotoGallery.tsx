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
    "25%", "75%", "75%", "25%", "25%", "75%", "75%", "25%", "25%", "75%", 
    "75%", "25%", "25%", "75%", "75%", "25%", "25%", "75%", "75%"
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
      <motion.h2 
        className="font-serif text-3xl text-center text-primary-dark mb-12"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
      >
        Những khoảnh khắc đáng nhớ
      </motion.h2>

      <div ref={trackRef} className="w-full space-y-16 relative mt-4 pb-12">
        {/* Đường nét đứt ziczac ở background */}
        <svg 
          className="absolute top-0 left-0 w-full h-full z-0 overflow-visible opacity-50"
          viewBox="0 0 100 100" 
          preserveAspectRatio="none"
          style={{ maskImage: "linear-gradient(to bottom, black 85%, transparent 96%)", WebkitMaskImage: "linear-gradient(to bottom, black 85%, transparent 96%)" }}
        >
          <polyline 
            points="25,4 75,14 25,24 75,34 25,44 75,55 25,65 75,75 25,85 75,96" 
            fill="none" 
            stroke="#EF6A86" 
            strokeWidth="2" 
            strokeDasharray="4, 6" 
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
          const rotation = isEven ? -3 : 3;

          return (
            <motion.div
              key={idx}
              className={`relative z-10 w-full max-w-[280px] ${isEven ? 'self-start mr-auto' : 'self-end ml-auto'}`}
              initial={{ opacity: 0, x: initialX, rotate: isEven ? -10 : 10 }}
              whileInView={{ opacity: 1, x: 0, rotate: rotation }}
              viewport={{ once: true, margin: "-15%" }}
              transition={{ 
                type: "spring", 
                stiffness: 70, 
                damping: 20, 
                delay: 0.1 
              }}
              whileHover={{ scale: 1.05, rotate: 0, zIndex: 10 }}
            >
              {/* Photo Frame */}
              <div className="bg-white p-3 pb-8 rounded-sm shadow-[0_10px_30px_rgba(246,184,200,0.4)] border border-powder-pink/50">
                <div className="relative w-full aspect-[4/5] overflow-hidden rounded-sm">
                  <img 
                    src={photo.url} 
                    alt={`Memory ${idx + 1}`} 
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                {photo.caption && (
                  <p className="font-script text-xl text-center text-text-brown mt-4">
                    {photo.caption}
                  </p>
                )}
              </div>

              {/* Decorative Tape */}
              <div 
                className={`absolute -top-3 ${isEven ? 'left-1/2 -translate-x-1/2 rotate-[-5deg]' : 'right-1/2 translate-x-1/2 rotate-[5deg]'} w-20 h-6 bg-white/40 backdrop-blur-sm shadow-sm`}
              />
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
