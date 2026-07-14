import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, MessageCircle, Send } from 'lucide-react';
import confetti from 'canvas-confetti';

interface Props {
  data: {
    id: number;
    image: string;
    text: string;
    likes: number;
    comments: number;
  };
  index: number;
}

export default function SocialMessage({ data, index }: Props) {
  const [isLiked, setIsLiked] = useState(false);
  const [likes, setLikes] = useState(data.likes);
  const [showFlyingHeart, setShowFlyingHeart] = useState(false);

  const handleLike = () => {
    if (!isLiked) {
      setIsLiked(true);
      setLikes(likes + 1);
      setShowFlyingHeart(true);
      if (navigator.vibrate) navigator.vibrate(50);
      
      // Little confetti pop from the heart
      confetti({
        particleCount: 15,
        spread: 40,
        origin: { y: 0.7 },
        colors: ['#FFB6C1', '#FF8A8A']
      });

      setTimeout(() => setShowFlyingHeart(false), 1000);
    } else {
      setIsLiked(false);
      setLikes(likes - 1);
    }
  };

  const isEven = index % 2 === 0;

  return (
    <motion.div 
      className="w-full bg-white rounded-3xl shadow-soft overflow-hidden border border-peach-bloom/30 relative"
      initial={{ opacity: 0, scale: 0.8, rotate: isEven ? -2 : 2 }}
      whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ type: "spring", damping: 15, stiffness: 100 }}
      whileHover={{ y: -5, boxShadow: "0 20px 40px rgba(255,182,193,0.3)" }}
    >
      {/* Washi Tape Decoration */}
      <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-24 h-8 bg-white/40 backdrop-blur-sm rotate-[-3deg] z-10 border border-white/50 shadow-sm" style={{ clipPath: 'polygon(5% 0%, 95% 2%, 100% 100%, 0% 98%)' }} />

      {/* Header */}
      <div className="flex items-center gap-3 p-4 border-b border-gray-50 pt-6">
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-pastel-pink to-peach-bloom p-[2px]">
          <div className="w-full h-full bg-white rounded-full border border-white" />
        </div>
        <span className="font-bold text-sm text-warm-gray">Kỷ niệm đáng nhớ</span>
      </div>

      {/* Image Container with Double Tap to Like */}
      <motion.div 
        className="relative w-full aspect-square bg-gray-100 cursor-pointer overflow-hidden" 
        onDoubleClick={handleLike}
        whileHover={{ scale: 1.02 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <img src={data.image} alt="Memory" className="w-full h-full object-cover" />
        
        {/* Big Flying Heart Animation */}
        <AnimatePresence>
          {showFlyingHeart && (
            <motion.div 
              className="absolute inset-0 flex items-center justify-center pointer-events-none"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: [0, 1.2, 1], opacity: [0, 1, 0] }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Heart className="w-24 h-24 text-white fill-white drop-shadow-lg" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Actions */}
      <div className="p-4">
        <div className="flex gap-4 mb-3">
          <button onClick={handleLike} className="active:scale-90 transition-transform">
            <Heart size={24} className={isLiked ? "text-blush-red fill-blush-red" : "text-warm-gray"} />
          </button>
          <MessageCircle size={24} className="text-warm-gray" />
          <Send size={24} className="text-warm-gray" />
        </div>
        <p className="font-bold text-sm mb-2">{likes.toLocaleString()} lượt thích</p>
        <p className="text-[15px] leading-relaxed">
          <span className="font-bold mr-2">Người gửi</span>
          {data.text}
        </p>
      </div>
    </motion.div>
  );
}
