'use client';

import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import {
  Target,
  ListTree,
  Laptop,
  Cpu,
  DollarSign,
  Monitor,
  Battery,
} from 'lucide-react';

export default function AboutLaptop() {
  // Performance-optimized animations with reduced complexity
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        duration: 0.4,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
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
        duration: 0.4,
        ease: 'easeOut',
      },
    },
  };

  return (
    <section
      id='about'
      className='relative py-25 md:py-25 px-4 sm:px-6 lg:px-8 bg-gradient-to-bl from-[#7ab2d3] to-[#dff2eb] overflow-hidden'
    >
      {/* Performance-optimized background with reduced elements */}
      <div className='absolute inset-0 overflow-hidden pointer-events-none'>
        <div className='absolute -top-20 -right-20 w-60 h-60 bg-[#4a628a] rounded-full mix-blend-multiply opacity-5 blur-2xl'></div>
        <div className='absolute -bottom-20 -left-20 w-60 h-60 bg-[#7ab2d3] rounded-full mix-blend-multiply opacity-5 blur-2xl'></div>
      </div>

      <div className='max-w-7xl mx-auto relative'>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, margin: '-50px' }}
          className='text-center mb-12 md:mb-16'
        >
          <h2 className='text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 md:mb-6'>
            Pemilihan Laptop Terbaik
          </h2>
          <p className='text-lg md:text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed px-4'>
            Temukan laptop paling ideal dengan pendekatan sistematis yang
            membandingkan berbagai kriteria secara objektif dan terukur.
          </p>
        </motion.div>

        <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center'>
          {/* LEFT SIDE - TEXT CONTENT */}
          <motion.div
            variants={containerVariants}
            initial='hidden'
            whileInView='visible'
            viewport={{ once: true, margin: '-50px' }}
            className='space-y-8 md:space-y-12'
          >
            {/* Feature Cards */}
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8'>
              <motion.div variants={itemVariants}>
                <Card className='group relative bg-[#dff2eb] backdrop-blur-xl rounded-2xl md:rounded-3xl shadow-2xl border border-white/40 hover:border-[#7ab2d3]/50 transition-all duration-500 hover:shadow-3xl hover:-translate-y-2 overflow-hidden'>
                  {/* Premium gradient overlay */}
                  <div className='absolute inset-0 bg-gradient-to-br from-[#7ab2d3]/20 via-transparent to-[#dff2eb]/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500' />

                  {/* Animated shimmer effect */}
                  <div className='absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000' />

                  {/* Subtle pattern overlay */}
                  <div className='absolute inset-0 bg-[radial-gradient(#7ab2d3/10%,transparent_1px)] bg-[length:16px_16px] opacity-0 group-hover:opacity-100 transition-opacity duration-700' />

                  <CardContent className='relative p-6 md:p-8 z-10'>
                    <div className='relative'>
                      {/* Premium icon container */}
                      <div className='w-12 h-12 md:w-14 md:h-14 bg-gradient-to-br from-[#7ab2d3] via-[#8bc2e0] to-[#a8d4e9] rounded-xl md:rounded-2xl flex items-center justify-center mb-4 md:mb-6 shadow-lg shadow-[#7ab2d3]/20 group-hover:scale-110 group-hover:shadow-[#7ab2d3]/40 transition-all duration-300'>
                        <Target className='w-6 h-6 md:w-7 md:h-7 text-white drop-shadow-sm' />
                      </div>

                      {/* Floating accent */}
                      <div className='absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-br from-[#7ab2d3] to-[#dff2eb] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-200 shadow-lg' />
                    </div>

                    <h3 className='text-lg md:text-xl font-bold bg-gradient-to-br from-[#2c5282] to-[#4a628a] bg-clip-text text-transparent mb-3 group-hover:translate-x-1 transition-transform duration-300'>
                      Tujuan Jelas
                    </h3>
                    <p className='text-gray-700/90 text-sm md:text-base leading-relaxed group-hover:text-gray-800 transition-colors duration-300'>
                      Definisikan kebutuhan spesifik untuk mendapatkan
                      rekomendasi yang tepat dengan presisi tinggi
                    </p>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div variants={itemVariants}>
                <Card className='group relative bg-[#dff2eb] backdrop-blur-xl rounded-2xl md:rounded-3xl shadow-2xl border border-white/40 hover:border-[#7ab2d3]/50 transition-all duration-500 hover:shadow-3xl hover:-translate-y-2 overflow-hidden'>
                  {/* Premium gradient overlay */}
                  <div className='absolute inset-0 bg-gradient-to-br from-[#7ab2d3]/20 via-transparent to-[#dff2eb]/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500' />

                  {/* Animated shimmer effect */}
                  <div className='absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000' />

                  {/* Subtle pattern overlay */}
                  <div className='absolute inset-0 bg-[radial-gradient(#7ab2d3/10%,transparent_1px)] bg-[length:16px_16px] opacity-0 group-hover:opacity-100 transition-opacity duration-700' />

                  <CardContent className='relative p-6 md:p-8 z-10'>
                    <div className='relative'>
                      {/* Premium icon container */}
                      <div className='w-12 h-12 md:w-14 md:h-14 bg-gradient-to-br from-[#7ab2d3] via-[#8bc2e0] to-[#a8d4e9] rounded-xl md:rounded-2xl flex items-center justify-center mb-4 md:mb-6 shadow-lg shadow-[#7ab2d3]/20 group-hover:scale-110 group-hover:shadow-[#7ab2d3]/40 transition-all duration-300'>
                        <ListTree className='w-6 h-6 md:w-7 md:h-7 text-white drop-shadow-sm' />
                      </div>

                      {/* Floating accent */}
                      <div className='absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-br from-[#7ab2d3] to-[#dff2eb] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-200 shadow-lg' />
                    </div>

                    <h3 className='text-lg md:text-xl font-bold bg-gradient-to-br from-[#2c5282] to-[#4a628a] bg-clip-text text-transparent mb-3 group-hover:translate-x-1 transition-transform duration-300'>
                      Kriteria Terstruktur
                    </h3>
                    <p className='text-gray-700/90 text-sm md:text-base leading-relaxed group-hover:text-gray-800 transition-colors duration-300'>
                      Bandingkan berbagai aspek penting secara sistematis dan
                      objektif dengan analisis mendalam
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            {/* Premium Description Text */}
            <motion.div variants={itemVariants} className='group relative'>
              <div className='absolute inset-0 bg-gradient-to-br from-[#7ab2d3]/15 to-[#dff2eb]/10 rounded-2xl md:rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500' />

              <div className='relative bg-gradient-to-br from-[#8bc2e0]/80 to-[#e5f4f0]/70 backdrop-blur-xl rounded-2xl md:rounded-3xl p-6 md:p-8 border border-white/40 shadow-2xl group-hover:shadow-3xl group-hover:-translate-y-1 transition-all duration-500 overflow-hidden'>
                {/* Premium border glow */}
                <div className='absolute inset-0 rounded-2xl md:rounded-3xl bg-gradient-to-r from-[#7ab2d3]/30 via-[#a8d4e9]/20 to-[#dff2eb]/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500' />

                {/* Subtle dot pattern */}
                <div className='absolute inset-0 bg-[radial-gradient(#7ab2d3/15%,transparent_1px)] bg-[length:20px_20px] opacity-0 group-hover:opacity-100 transition-opacity duration-700' />

                <div className='relative space-y-4 md:space-y-6 z-10'>
                  <p className='text-gray-800/90 leading-relaxed text-sm md:text-base group-hover:text-gray-900 transition-colors duration-300'>
                    Pemilihan laptop terbaik adalah proses menentukan perangkat
                    yang paling sesuai dengan kebutuhan, baik untuk kuliah,
                    bekerja, desain, maupun gaming.
                  </p>
                  <p className='text-gray-800/90 leading-relaxed text-sm md:text-base group-hover:text-gray-900 transition-colors duration-300'>
                    Dengan memecah masalah ke dalam{' '}
                    <span className='relative inline-block'>
                      <span className='relative z-10 font-bold bg-gradient-to-r from-[#2c5282] to-[#4a628a] bg-clip-text text-transparent'>
                        tujuan, kriteria, dan alternatif
                      </span>
                      <span className='absolute bottom-0 left-0 w-full h-2 bg-gradient-to-r from-[#7ab2d3]/40 to-[#dff2eb]/50 -rotate-1 -z-0 group-hover:h-3 transition-all duration-300' />
                    </span>
                    , proses pengambilan keputusan menjadi lebih terukur dan
                    hasilnya lebih tepat sasaran.
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* RIGHT SIDE - VISUAL DIAGRAM */}
          <motion.div
            initial='hidden'
            whileInView='visible'
            viewport={{ once: true, margin: '-50px' }}
            className='relative'
          >
            {/* Main Diagram Container */}
            <div className='relative bg-[#dff2eb] backdrop-blur-lg rounded-2xl md:rounded-3xl shadow-lg border border-white/30 p-4 md:p-6 overflow-hidden'>
              {/* Background Decorative Elements */}
              <div className='absolute inset-0 overflow-hidden'>
                <div className='absolute -top-10 -right-10 w-20 h-20 bg-gradient-to-br from-[#7ab2d3]/5 to-[#4a628a]/5 rounded-full blur-lg'></div>
                <div className='absolute -bottom-10 -left-10 w-20 h-20 bg-gradient-to-br from-[#b9e5e8]/5 to-[#7ab2d3]/5 rounded-full blur-lg'></div>
              </div>

              {/* Tujuan - Top Center */}
              <motion.div
                variants={scaleVariants}
                className='flex justify-center mb-4 md:mb-5 relative z-10'
              >
                <div className='bg-gradient-to-br from-[#4a628a] to-[#7ab2d3] rounded-xl md:rounded-2xl shadow-lg p-3 md:p-4 text-white text-center max-w-xs relative overflow-hidden group hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5'>
                  {/* Shine Effect */}
                  <div className='absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700'></div>

                  <div className='relative z-10'>
                    <div className='w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center mb-2 mx-auto group-hover:scale-105 transition-transform duration-300'>
                      <Target className='w-4 h-4 text-white' />
                    </div>
                    <p className='font-bold text-sm md:text-base mb-1'>
                      Tujuan
                    </p>
                    <p className='text-white/80 text-xs md:text-sm'>
                      Memilih Laptop Terbaik
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Animated Connection Line */}
              <div className='flex justify-center mb-4 md:mb-5 relative z-10'>
                <motion.div
                  initial={{ scaleY: 0 }}
                  whileInView={{ scaleY: 1 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  viewport={{ once: true }}
                  className='w-1 h-8 md:h-10 bg-gradient-to-b from-[#7ab2d3] via-[#4a628a] to-[#7ab2d3] rounded-full shadow'
                />
              </div>

              {/* Kriteria - Middle Row */}
              <motion.div
                variants={containerVariants}
                className='grid grid-cols-2 sm:grid-cols-4 gap-3 md:gap-4 mb-6 md:mb-8 relative z-10'
              >
                {[
                  {
                    name: 'Performa',
                    icon: Cpu,
                    color: 'from-[#4a628a] to-[#7ab2d3]',
                  },
                  {
                    name: 'Harga',
                    icon: DollarSign,
                    color: 'from-[#7ab2d3] to-[#4a628a]',
                  },
                  {
                    name: 'Baterai',
                    icon: Battery,
                    color: 'from-[#4a628a] to-[#7ab2d3]',
                  },
                  {
                    name: 'Layar',
                    icon: Monitor,
                    color: 'from-[#7ab2d3] to-[#4a628a]',
                  },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    variants={itemVariants}
                    className='group cursor-pointer'
                  >
                    <div className='bg-white/80 backdrop-blur-sm rounded-lg md:rounded-xl shadow-md border border-white/30 p-3 md:p-4 text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1 relative overflow-hidden'>
                      {/* Hover Gradient Border */}
                      <div className='absolute inset-0 bg-gradient-to-br from-[#4a628a] to-[#7ab2d3] rounded-lg md:rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10'></div>
                      <div className='absolute inset-[1px] bg-white/80 backdrop-blur-sm rounded-lg md:rounded-xl -z-10'></div>

                      {/* Icon Container */}
                      <div
                        className={`w-8 h-8 md:w-9 md:h-9 bg-gradient-to-br ${item.color} rounded-lg flex items-center justify-center mb-2 mx-auto group-hover:scale-110 transition-all duration-300 shadow-md`}
                      >
                        <item.icon className='w-3 h-3 md:w-4 md:h-4 text-white' />
                      </div>

                      {/* Text */}
                      <p className='font-semibold text-gray-900 text-xs md:text-sm relative'>
                        {item.name}
                        <span className='absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-[#4a628a] to-[#7ab2d3] '></span>
                      </p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>

              {/* Animated Connection Dots */}
              <div className='flex justify-center gap-3 md:gap-4 mb-5 md:mb-6 relative z-10'>
                {[1, 2, 3].map((dot) => (
                  <motion.div
                    key={dot}
                    initial={{ scale: 0, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 0.7 }}
                    transition={{ duration: 0.4, delay: dot * 0.1 }}
                    viewport={{ once: true }}
                    className='w-1.5 h-1.5 bg-gradient-to-br from-[#4a628a] to-[#7ab2d3] rounded-full shadow'
                  />
                ))}
              </div>

              {/* Alternatif - Bottom Row */}
              <motion.div
                variants={containerVariants}
                className='grid grid-cols-2 sm:grid-cols-4 gap-3 md:gap-4 relative z-10'
              >
                {['Laptop A', 'Laptop B', 'Laptop C', 'Laptop D'].map(
                  (item, i) => (
                    <motion.div
                      key={i}
                      variants={itemVariants}
                      className='group cursor-pointer'
                    >
                      <div className='bg-white/80 backdrop-blur-sm rounded-lg shadow-md border border-white/30 p-3 text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5 relative overflow-hidden'>
                        {/* Hover Effect Layer */}
                        <div className='absolute inset-0 bg-gradient-to-br from-[#7ab2d3] to-[#b9e5e8] opacity-0 group-hover:opacity-5 transition-opacity duration-300 rounded-lg'></div>

                        {/* Icon Container */}
                        <div className='w-7 h-7 md:w-8 md:h-8 bg-gradient-to-br from-[#7ab2d3] to-[#b9e5e8] rounded-lg flex items-center justify-center mb-2 mx-auto group-hover:scale-105 group-hover:rotate-2 transition-all duration-300 shadow-md'>
                          <Laptop className='w-3 h-3 md:w-3.5 md:h-3.5 text-white' />
                        </div>

                        {/* Text */}
                        <p className='font-medium text-gray-900 text-xs md:text-sm relative inline-block'>
                          {item}
                          <span className='absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-[#7ab2d3] to-[#b9e5e8] group-hover:w-full transition-all duration-300'></span>
                        </p>
                      </div>
                    </motion.div>
                  )
                )}
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
