import { useEffect, useRef } from 'react';

export default function AutoScroll() {
  const isFinishedRef = useRef(false);
  const targetModeRef = useRef<'cake' | 'bottom'>('cake');
  const idleTimeoutRef = useRef<number | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  useEffect(() => {
    const startAutoScroll = () => {
      if (isFinishedRef.current) return;
      if (idleTimeoutRef.current !== null) return;

      if (targetModeRef.current === 'cake') {
        const cakeElement = document.getElementById('cake-section');
        if (cakeElement) {
          const rect = cakeElement.getBoundingClientRect();
          const screenCenterY = window.innerHeight / 2;
          const cakeCenterY = rect.top + (rect.height / 2);

          if (cakeCenterY <= screenCenterY) {
            isFinishedRef.current = true; // Pause at cake
            return; 
          }
        }
      } else if (targetModeRef.current === 'bottom') {
        // Stop if we hit the absolute bottom of the page
        if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 5) {
          isFinishedRef.current = true;
          return;
        }
      }

      window.scrollBy(0, 1.5);
      animationFrameRef.current = requestAnimationFrame(startAutoScroll);
    };

    const handleUserInteraction = () => {
      if (isFinishedRef.current) return;

      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }

      if (idleTimeoutRef.current !== null) {
        clearTimeout(idleTimeoutRef.current);
      }

      idleTimeoutRef.current = window.setTimeout(() => {
        idleTimeoutRef.current = null;
        startAutoScroll();
      }, 3000);
    };

    const handleResume = () => {
      isFinishedRef.current = false;
      targetModeRef.current = 'bottom';
      // Give them 3 seconds to enjoy the confetti before moving on
      setTimeout(() => {
        startAutoScroll();
      }, 3000);
    };

    window.addEventListener('wheel', handleUserInteraction, { passive: true });
    window.addEventListener('touchstart', handleUserInteraction, { passive: true });
    window.addEventListener('touchmove', handleUserInteraction, { passive: true });
    window.addEventListener('mousedown', handleUserInteraction, { passive: true });
    window.addEventListener('resumeAutoScroll', handleResume);

    const initialTimeoutId = window.setTimeout(() => {
      startAutoScroll();
    }, 4000);

    return () => {
      clearTimeout(initialTimeoutId);
      if (idleTimeoutRef.current !== null) clearTimeout(idleTimeoutRef.current);
      if (animationFrameRef.current !== null) cancelAnimationFrame(animationFrameRef.current);
      
      window.removeEventListener('wheel', handleUserInteraction);
      window.removeEventListener('touchstart', handleUserInteraction);
      window.removeEventListener('touchmove', handleUserInteraction);
      window.removeEventListener('mousedown', handleUserInteraction);
      window.removeEventListener('resumeAutoScroll', handleResume);
    };
  }, []);

  return null;
}
