import React from 'react';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCards, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-cards';
import { birthdayData } from '../config/birthdayData';

export default function MemoryStories() {
  return (
    <div className="w-full px-6 py-12 z-10 overflow-hidden">
      <motion.div 
        className="text-center mb-10"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <span className="text-xs font-bold text-accent-red uppercase tracking-widest bg-white px-3 py-1 rounded-full shadow-sm border border-powder-pink">
          Memories
        </span>
        <h3 className="font-script text-4xl text-text-brown mt-4">Những khoảnh khắc</h3>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.8 }}
      >
        <Swiper
          effect={'cards'}
          grabCursor={true}
          modules={[EffectCards, Autoplay]}
          autoplay={{ delay: 3000, disableOnInteraction: true }}
          className="w-[280px] h-[380px]"
        >
          {birthdayData.memoryImages.map((img, idx) => (
            <SwiperSlide key={idx} className="bg-white rounded-2xl shadow-float overflow-hidden border-4 border-white relative flex flex-col">
              <div className="flex-1 w-full relative">
                <img src={img.url} alt={`Memory ${idx}`} className="w-full h-full object-cover" />
                {/* Washi tape on photo */}
                <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-16 h-5 bg-white/40 backdrop-blur-sm rotate-2 shadow-sm border border-white/30" style={{ clipPath: 'polygon(0% 5%, 100% 0%, 95% 95%, 5% 100%)' }} />
              </div>
              <div className="p-4 bg-white text-center flex items-center justify-center min-h-[80px]">
                <p className="font-script text-xl text-text-brown">{img.caption}</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </motion.div>
    </div>
  );
}
