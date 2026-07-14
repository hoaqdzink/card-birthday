import React from 'react';
import { motion } from 'framer-motion';
import { birthdayData } from '../config/birthdayData';

export default function CalendarSection() {
  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const targetDay = parseInt(birthdayData.day, 10);

  return (
    <div className="w-full px-6 mt-16 flex flex-col items-center">
      <motion.div 
        className="w-full max-w-[320px] bg-white rounded-[24px] shadow-soft p-6 relative"
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
      >
        {/* Binder Rings styling */}
        <div className="absolute -top-3 left-1/4 w-3 h-6 bg-gray-200 rounded-full border-2 border-white shadow-sm" />
        <div className="absolute -top-3 right-1/4 w-3 h-6 bg-gray-200 rounded-full border-2 border-white shadow-sm" />

        <div className="text-center mb-6 mt-2">
          <h3 className="text-blush-red font-bold text-xl tracking-widest uppercase">Tháng {birthdayData.month}</h3>
          <p className="text-gray-300 font-script text-4xl mt-[-10px] select-none">{birthdayData.year}</p>
        </div>

        <div className="grid grid-cols-7 gap-y-4 gap-x-2 text-center text-sm">
          {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map(d => (
            <div key={d} className="font-bold text-gray-400">{d}</div>
          ))}
          
          {/* Empty slots for starting day of month (mocking it) */}
          <div /><div /><div />

          {days.map(d => (
            <div key={d} className="relative flex items-center justify-center h-8 w-8 mx-auto font-medium text-warm-gray">
              {d === targetDay && (
                <motion.div 
                  className="absolute inset-0 bg-pastel-pink rounded-full -z-10"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ type: "spring", delay: 0.3 }}
                />
              )}
              <span className={d === targetDay ? "text-white font-bold" : ""}>{d}</span>
            </div>
          ))}
        </div>

        {/* Cute sticker on calendar */}
        <div className="absolute -right-4 -bottom-4 text-4xl rotate-12 drop-shadow-md">
          🎉
        </div>
      </motion.div>
    </div>
  );
}
