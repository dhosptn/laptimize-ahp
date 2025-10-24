'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Laptop } from 'lucide-react';

export default function GlobalLoader() {
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, [pathname]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.3,
        ease: 'easeOut',
      },
    },
    exit: {
      opacity: 0,
      transition: {
        duration: 0.4,
        ease: 'easeInOut',
      },
    },
  };

  const logoVariants = {
    initial: { scale: 0.8, opacity: 0 },
    animate: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  const laptopVariants = {
    animate: {
      y: [0, -5, 0],
      scale: [1, 1.05, 1],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: 'easeInOut',
      },
    },
  };

  const dotVariants = {
    animate: {
      y: [0, -6, 0],
      transition: {
        duration: 1.2,
        repeat: Infinity,
        ease: 'easeInOut',
      },
    },
  };

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          key='loading'
          className='fixed inset-0 flex items-center justify-center bg-gradient-to-br from-[#dff2eb] to-[#7ab2d3] z-50'
          variants={containerVariants}
          initial='hidden'
          animate='visible'
          exit='exit'
        >
          {/* Main Loading Container */}
          <motion.div className='flex flex-col items-center space-y-8'>
            {/* Laptop Logo */}
            <motion.div
              className='relative'
              variants={logoVariants}
              initial='initial'
              animate='animate'
            >
              <div className='w-20 h-20 rounded-2xl bg-gradient-to-br from-[#7ab2d3] to-[#a8d4e9] flex items-center justify-center shadow-lg'>
                <div className='w-16 h-16 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center'>
                  <motion.div variants={laptopVariants} animate='animate'>
                    <Laptop className='w-8 h-8 text-white' />
                  </motion.div>
                </div>
              </div>

              {/* Subtle Pulse Ring */}
              <motion.div
                className='absolute inset-0 rounded-2xl border border-white/30'
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [0.3, 0, 0.3],
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
            </motion.div>

            {/* Text Content */}
            <motion.div
              className='text-center space-y-3'
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h3 className='text-xl font-bold text-gray-800'>Laptimize</h3>
              <p className='text-gray-600 text-sm'>Memuat...</p>
            </motion.div>

            {/* Animated Dots */}
            <div className='flex space-x-1.5'>
              {[0, 1, 2].map((index) => (
                <motion.div
                  key={index}
                  className='w-2 h-2 rounded-full bg-white/80'
                  variants={dotVariants}
                  animate='animate'
                  transition={{
                    duration: 1.2,
                    repeat: Infinity,
                    delay: index * 0.15,
                  }}
                />
              ))}
            </div>
          </motion.div>

          {/* Background Pattern */}
          <div className='absolute inset-0 opacity-10'>
            <div className='absolute inset-0 bg-[linear-gradient(to_right,#7ab2d3_1px,transparent_1px),linear-gradient(to_bottom,#7ab2d3_1px,transparent_1px)] bg-[size:32px_32px]' />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
