import { motion, AnimatePresence } from 'motion/react';
import { ChevronUp, RotateCcw } from 'lucide-react';
import { useState, useEffect } from 'react';

interface FloatingNavProps {
  onReset?: () => void;
}

export function FloatingNav({ onReset }: FloatingNavProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.8 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-8 right-8 z-50 flex flex-col gap-3"
        >
          {/* Scroll to top button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={scrollToTop}
            className="w-14 h-14 rounded-full bg-gradient-to-br from-emerald-500 to-cyan-500 text-black flex items-center justify-center shadow-[0_0_30px_rgba(16,185,129,0.4)] hover:shadow-[0_0_40px_rgba(16,185,129,0.6)] transition-all"
            title="Scroll to top"
          >
            <ChevronUp className="w-6 h-6" />
          </motion.button>

          {/* Reset button */}
          {onReset && (
            <motion.button
              whileHover={{ scale: 1.1, rotate: -180 }}
              whileTap={{ scale: 0.9 }}
              onClick={onReset}
              className="w-14 h-14 rounded-full bg-slate-800 border-2 border-slate-700 text-white flex items-center justify-center shadow-lg hover:border-emerald-500 hover:text-emerald-400 transition-all"
              title="Reset selection"
            >
              <RotateCcw className="w-5 h-5" />
            </motion.button>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
