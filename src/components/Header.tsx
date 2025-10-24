// components/Header.tsx
'use client';
import { useRouter, usePathname } from 'next/navigation';
import { ArrowLeft, ArrowRight, Home, BarChart3, Laptop } from 'lucide-react';
import { useAhp } from './context/AhpContext';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const { isInputFilled } = useAhp();

  const pages = [
    { path: '/input-laptop', label: 'Input Laptop', icon: Laptop },
    { path: '/criteria', label: 'Criteria', icon: BarChart3 },
    { path: '/results', label: 'Results', icon: Home },
  ];

  const currentIndex = pages.findIndex((page) => page.path === pathname);
  const currentPage = pages[currentIndex];

  const handlePrev = () => {
    if (currentIndex > 0) router.push(pages[currentIndex - 1].path);
  };

  const handleNext = () => {
    if (currentIndex < pages.length - 1)
      router.push(pages[currentIndex + 1].path);
  };

  const handleHome = () => {
    router.push('/');
  };

  const canNext =
    currentIndex === 0 ? isInputFilled : currentIndex < pages.length - 1;

  const progress = ((currentIndex + 1) / pages.length) * 100;

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className='bg-gradient-to-r from-[#D9EAFD] via-[#9AA6B2] to-[#D9EAFD] text-white shadow-lg relative overflow-hidden'
    >
      {/* Animated background elements */}
      <div className='absolute inset-0 overflow-hidden'>
        <motion.div
          className='absolute -top-24 -right-24 w-48 h-48 rounded-full bg-[#b9e5e8] opacity-10'
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
        <motion.div
          className='absolute -bottom-12 -left-12 w-32 h-32 rounded-full bg-[#dff2eb] opacity-10'
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [360, 180, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      </div>

      <div className='container mx-auto relative z-10'>
        {/* Progress bar */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className='h-1 bg-[#dff2eb] bg-opacity origin-left'
        >
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: progress / 100 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className='h-full bg-[#dff2eb] origin-left'
            style={{ width: `${progress}%` }}
          />
        </motion.div>

        <div className='flex flex-col sm:flex-row justify-between items-center p-4 gap-4 sm:gap-6'>
          {/* Left section - Logo and title */}
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className='flex items-center gap-3 cursor-pointer group '
            onClick={handleHome}
          >
            <div className='relative'>
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                className='w-10 h-10 bg-[#dff2eb] rounded-xl flex items-center justify-center shadow-lg'
              >
                <Laptop className='w-5 h-5 text-[#4a628a]' />
              </motion.div>
            </div>
            <div className='flex flex-col relative z-20'>
              <h1 className='text-lg sm:text-xl text-white font-bold tracking-tight drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]'>
                Laptop Selection AHP
              </h1>
              <Badge
                variant='secondary'
                className='bg-[#dff2eb] text-[#4a628a] text-xs mt-1'
              >
                Decision Support System
              </Badge>
            </div>
          </motion.div>

          {/* Center section - Navigation steps */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className='hidden md:flex items-center gap-2'
          >
            {pages.map((page, index) => {
              const Icon = page.icon;
              const isActive = pathname === page.path;
              const isCompleted = index < currentIndex;

              return (
                <div key={page.path} className='flex items-center'>
                  {index > 0 && (
                    <div
                      className={cn(
                        'w-8 h-0.5 mx-2',
                        isCompleted || isActive
                          ? 'bg-[#dff2eb]'
                          : 'bg-white bg-opacity-30'
                      )}
                    />
                  )}

                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={cn(
                      'flex items-center gap-2 px-3 py-2 rounded-lg transition-all cursor-pointer',
                      isActive
                        ? 'bg-[#dff2eb] text-[#4a628a] shadow-lg'
                        : isCompleted
                        ? 'bg-[#7ab2d3] text-white shadow'
                        : 'bg-white bg-opacity-10 text-white hover:bg-opacity-20'
                    )}
                    onClick={() => router.push(page.path)}
                  >
                    <Icon size={16} />
                    <span className='text-sm font-medium'>{page.label}</span>
                    {isCompleted && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className='w-2 h-2 bg-[#dff2eb] rounded-full'
                      />
                    )}
                  </motion.div>
                </div>
              );
            })}
          </motion.div>

          {/* Right section - Navigation buttons */}
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className='flex items-center gap-2'
          >
            <Button
              onClick={handlePrev}
              disabled={currentIndex <= 0}
              variant='outline'
              size='sm'
              className={cn(
                'gap-2 transition-all',
                currentIndex <= 0
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-white text-[#4a628a] hover:bg-[#dff2eb] border-white shadow-lg hover:shadow-xl'
              )}
            >
              <ArrowLeft size={16} />
              <span className='hidden sm:inline'>Prev</span>
            </Button>

            <AnimatePresence mode='wait'>
              {currentPage && (
                <motion.div
                  key={currentPage.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className='hidden sm:block px-3 py-1 bg-gray-300 bg-opacity-20 rounded-full'
                >
                  <span className='text-sm font-medium'>
                    {currentPage.label}
                  </span>
                </motion.div>
              )}
            </AnimatePresence>

            <Button
              onClick={handleNext}
              disabled={!canNext}
              variant='outline'
              size='sm'
              className={cn(
                'gap-2 transition-all',
                !canNext
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-white text-[#4a628a] hover:bg-[#dff2eb] border-white shadow-lg hover:shadow-xl'
              )}
            >
              <span className='hidden sm:inline'>Next</span>
              <ArrowRight size={16} />
            </Button>
          </motion.div>
        </div>

        {/* Mobile progress indicator */}
        <div className='sm:hidden px-4 pb-3'>
          <div className='flex justify-between items-center text-xs text-gray-600 text-opacity-80 mb-1'>
            <span>
              Step {currentIndex + 1} of {pages.length}
            </span>
            <span>{currentPage?.label}</span>
          </div>
          <div className='w-full bg-white bg-opacity-20 rounded-full h-2'>
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.6 }}
              className='h-full bg-[#dff2eb] rounded-full origin-left'
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>
    </motion.header>
  );
}
