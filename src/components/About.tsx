'use client';

import { motion } from 'framer-motion';
import {
  Target,
  Cpu,
  DollarSign,
  Monitor,
  Battery,
  Laptop,
  ArrowDown,
} from 'lucide-react';

export default function AboutLaptop() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  };

  const scaleVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: 'easeOut',
      },
    },
  };

  const criteria = [
    { name: 'Performa', icon: Cpu, color: 'from-blue-400 to-cyan-400' },
    { name: 'Harga', icon: DollarSign, color: 'from-green-400 to-emerald-400' },
    { name: 'Baterai', icon: Battery, color: 'from-yellow-400 to-amber-400' },
    { name: 'Layar', icon: Monitor, color: 'from-purple-400 to-violet-400' },
  ];

  const laptops = ['Laptop A', 'Laptop B', 'Laptop C', 'Laptop D'];

  return (
    <section id='about' className='py-20 px-4 sm:px-6 lg:px-8 bg-[#021526]'>
      <div className='max-w-4xl mx-auto'>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className='text-center mb-16'
        >
          <div className='inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 border border-blue-400/30 shadow-lg shadow-blue-500/10 mb-6'>
            <span className='text-sm font-semibold text-blue-200'>
              Metode AHP
            </span>
          </div>

          <h2 className='text-4xl md:text-5xl font-bold text-white mb-6'>
            Proses Pemilihan{' '}
            <span className='text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400'>
              Laptop
            </span>
          </h2>

          <p className='text-xl text-blue-100/80 max-w-2xl mx-auto leading-relaxed'>
            Analisis hierarki sistematis untuk menentukan laptop terbaik
            berdasarkan kriteria penting
          </p>
        </motion.div>

        {/* Main Diagram */}
        <motion.div
          variants={containerVariants}
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true }}
          className='relative'
        >
          {/* Goal - Top */}
          <motion.div
            variants={scaleVariants}
            className='flex justify-center mb-12'
          >
            <div className='relative group'>
              <div className='absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl blur-xl opacity-40 group-hover:opacity-60 transition-opacity duration-300'></div>
              <div className='relative bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl px-8 py-6 text-center shadow-2xl border border-blue-300/30 backdrop-blur-sm'>
                <div className='w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center mb-3 mx-auto group-hover:scale-110 transition-transform duration-300 border border-white/30'>
                  <Target className='w-7 h-7 text-white' />
                </div>
                <p className='font-bold text-white text-lg mb-2'>
                  Tujuan Utama
                </p>
                <p className='text-white/90 text-sm'>Memilih Laptop Terbaik</p>
              </div>
            </div>
          </motion.div>

          {/* Animated Arrow */}
          <motion.div
            initial={{ opacity: 0, scaleY: 0 }}
            whileInView={{ opacity: 1, scaleY: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
            className='flex justify-center mb-12'
          >
            <div className='flex flex-col items-center'>
              <motion.div
                animate={{ y: [0, 5, 0] }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              >
                <ArrowDown className='w-6 h-6 text-cyan-400' />
              </motion.div>
              <div className='w-0.5 h-16 bg-gradient-to-b from-blue-400 to-cyan-400 rounded-full mt-2'></div>
            </div>
          </motion.div>

          {/* Criteria - Middle */}
          <motion.div
            variants={containerVariants}
            className='grid grid-cols-2 md:grid-cols-4 gap-4 mb-12'
          >
            {criteria.map((item, index) => (
              <motion.div
                key={item.name}
                variants={itemVariants}
                whileHover={{ y: -5, scale: 1.05 }}
                className='group cursor-pointer'
              >
                <div className='bg-[#0a2a4a] rounded-2xl p-6 text-center shadow-xl border border-blue-400/20 hover:border-blue-400/40 transition-all duration-300 relative overflow-hidden backdrop-blur-sm'>
                  {/* Gradient overlay */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
                  ></div>

                  {/* Shine effect */}
                  <div className='absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000' />

                  <div className='relative z-10'>
                    <div
                      className={`w-12 h-12 bg-gradient-to-r ${item.color} rounded-2xl flex items-center justify-center mb-3 mx-auto group-hover:scale-110 transition-transform duration-300 shadow-lg`}
                    >
                      <item.icon className='w-6 h-6 text-white' />
                    </div>
                    <p className='font-semibold text-white text-sm'>
                      {item.name}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Animated Dots */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            viewport={{ once: true }}
            className='flex justify-center gap-3 mb-12'
          >
            {[1, 2, 3].map((dot) => (
              <motion.div
                key={dot}
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity, delay: dot * 0.3 }}
                className='w-2 h-2 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full'
              />
            ))}
          </motion.div>

          {/* Laptops - Bottom */}
          <motion.div
            variants={containerVariants}
            className='grid grid-cols-2 md:grid-cols-4 gap-4'
          >
            {laptops.map((laptop, index) => (
              <motion.div
                key={laptop}
                variants={itemVariants}
                whileHover={{ y: -3, scale: 1.02 }}
                className='group'
              >
                <div className='bg-[#0a2a4a] rounded-xl p-4 text-center shadow-lg border border-blue-400/20 hover:border-cyan-400/40 hover:shadow-xl transition-all duration-300 relative overflow-hidden backdrop-blur-sm'>
                  {/* Hover gradient */}
                  <div className='absolute inset-0 bg-gradient-to-br from-blue-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300' />

                  <div className='relative z-10'>
                    <div className='w-10 h-10 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-xl flex items-center justify-center mb-2 mx-auto group-hover:scale-105 transition-transform duration-300 shadow-md'>
                      <Laptop className='w-5 h-5 text-white' />
                    </div>
                    <p className='font-medium text-white text-sm'>{laptop}</p>
                    <div className='w-0 h-0.5 bg-gradient-to-r from-blue-400 to-cyan-400 mx-auto group-hover:w-full transition-all duration-300 mt-1'></div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Bottom Description */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            viewport={{ once: true }}
            className='text-center mt-16'
          >
            <p className='text-blue-100/80 text-lg max-w-2xl mx-auto leading-relaxed'>
              Setiap kriteria dianalisis secara mendalam untuk menghasilkan
              rekomendasi laptop yang paling sesuai dengan kebutuhan dan
              preferensi Anda.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
