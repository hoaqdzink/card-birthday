import React from 'react';
import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';
import { birthdayData } from '../config/birthdayData';

export default function LocationSection() {
  return (
    <div className="w-full px-6 mt-16 flex flex-col items-center">
      <motion.div 
        className="w-full bg-white rounded-3xl shadow-soft overflow-hidden border border-peach-bloom/30"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <div className="p-6 text-center">
          <h3 className="font-script text-3xl text-blush-red mb-2">{birthdayData.location.title}</h3>
          <p className="text-sm text-warm-gray mb-4">{birthdayData.location.address}</p>
        </div>

        <div className="relative w-full h-[200px] bg-gray-100">
          <img src={birthdayData.location.mapImage} alt="Map" className="w-full h-full object-cover opacity-80" />
          
          {/* Cute Map Pin */}
          <motion.div 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            animate={{ y: ["-50%", "-70%", "-50%"] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <div className="w-10 h-10 bg-blush-red rounded-full flex items-center justify-center shadow-lg text-white">
              <MapPin fill="currentColor" size={20} />
            </div>
            <div className="w-4 h-1 bg-black/20 rounded-full mx-auto mt-2 blur-[1px]" />
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
