'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Menu, X, Laptop } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const router = useRouter();

  const menuItems = [
    { href: '#home', label: 'Beranda' },
    { href: '#about', label: 'Tentang' },
    { href: '#services', label: 'Layanan' },
    // { href: '#contact', label: 'Contact' },
  ];

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    let ticking = false;
    const updateScroll = () => {
      handleScroll();
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(updateScroll);
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleSmoothScroll = (href: string) => {
    setIsOpen(false);
    if (href.startsWith('#')) {
      const targetId = href.substring(1);
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      }
    }
  };

  const handleGetStarted = () => {
    setIsOpen(false);
    router.push('/input-laptop');
  };

  const mobileMenuVariants = {
    closed: {
      opacity: 0,
      scale: 0.95,
      transition: {
        duration: 0.2,
        ease: 'easeInOut',
      },
    },
    open: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.3,
        ease: 'easeOut',
      },
    },
  };

  const navItemVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: 'easeOut',
      },
    }),
  };

  return (
    <nav className='fixed top-4 left-0 right-0 z-50 flex justify-center'>
      <motion.div
        className={`rounded-2xl transition-all duration-300 ${
          isScrolled
            ? 'bg-white/20 backdrop-blur-xl shadow-lg shadow-black/10 border border-white/30 md:w-[75%] w-[95%]'
            : 'bg-white/15 backdrop-blur-lg shadow-md shadow-black/5 border border-white/20 md:w-[85%] w-[95%]'
        }`}
        initial={{ y: -100, opacity: 0 }}
        animate={{
          y: 0,
          opacity: 1,
        }}
        transition={{
          duration: 0.4,
          ease: [0.25, 0.46, 0.45, 0.94],
        }}
      >
        <div className='px-6 py-3'>
          <div className='flex justify-between items-center'>
            {/* Logo with Icon */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className='flex items-center space-x-2'
            >
              <div className='relative'>
                <div className='w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shadow-lg'>
                  <Laptop className='h-5 w-5 text-gray-900' />
                </div>
                <div className='absolute inset-0 rounded-xl bg-white/20 backdrop-blur-sm' />
              </div>
              <Link
                href='/'
                className='text-xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent'
                onClick={(e) => {
                  e.preventDefault();
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              >
                Laptimize
              </Link>
            </motion.div>

            {/* Desktop Navigation - Centered */}
            <div className='hidden md:flex absolute left-1/2 transform -translate-x-1/2'>
              <div className='flex space-x-1 bg-white/10 backdrop-blur-sm rounded-xl p-1 border border-white/20'>
                {menuItems.map((item, index) => (
                  <motion.div
                    key={item.href}
                    custom={index}
                    variants={navItemVariants}
                    initial='hidden'
                    animate='visible'
                    className='relative'
                  >
                    <button
                      onClick={() => handleSmoothScroll(item.href)}
                      className='relative px-4 py-2 rounded-lg text-sm font-medium text-gray-700 hover:text-gray-900 transition-all duration-300 group cursor-pointer'
                    >
                      <span className='relative z-10'>{item.label}</span>
                      <motion.div
                        className='absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg'
                        whileHover={{
                          opacity: 1,
                          scale: 1.05,
                        }}
                        initial={{ opacity: 0, scale: 1 }}
                        transition={{ duration: 0.3, ease: 'easeOut' }}
                      />
                    </button>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Desktop CTA Button */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className='hidden md:block'
            >
              <Button
                onClick={handleGetStarted}
                className='relative overflow-hidden bg-gradient-to-r from-gray-800 to-gray-700 hover:from-gray-700 hover:to-gray-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 group rounded-xl cursor-pointer'
              >
                <span className='relative z-10'>Mulai Bandingkan</span>
                <motion.div
                  className='absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500'
                  initial={{ x: '100%' }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.3 }}
                />
              </Button>
            </motion.div>

            {/* Mobile menu button */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className='md:hidden'
            >
              <Button
                variant='ghost'
                size='icon'
                onClick={() => setIsOpen(!isOpen)}
                className='rounded-xl bg-white/10 hover:bg-white/20 text-gray-700 border border-white/20'
              >
                {isOpen ? (
                  <X className='h-5 w-5' />
                ) : (
                  <Menu className='h-5 w-5' />
                )}
              </Button>
            </motion.div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              variants={mobileMenuVariants}
              initial='closed'
              animate='open'
              exit='closed'
              className='md:hidden absolute top-full left-0 right-0 mt-2 rounded-2xl bg-gradient-to-br from-[#dff2eb]/95 to-[#7ab2d3]/95 backdrop-blur-xl border border-white/30 shadow-xl'
            >
              <div className='p-4 space-y-2'>
                {menuItems.map((item, index) => (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <button
                      onClick={() => handleSmoothScroll(item.href)}
                      className='w-full text-left px-4 py-3 rounded-xl text-gray-800 hover:bg-white/40 transition-all duration-200 font-medium hover:scale-105 transform cursor-pointer'
                    >
                      {item.label}
                    </button>
                  </motion.div>
                ))}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: menuItems.length * 0.1 }}
                  className='pt-2'
                >
                  <Button
                    onClick={handleGetStarted}
                    className='w-full bg-gray-800 hover:bg-gray-900 text-white rounded-xl py-3 cursor-pointer'
                  >
                    Mulai Bandingkan
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </nav>
  );
}
