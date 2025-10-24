'use client';

import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import {
  BarChart3,
  GitCompare,
  Laptop,
  ArrowRight,
  Sparkles,
  Calculator,
  CheckCircle2,
} from 'lucide-react';

export default function FeaturesSection() {
  const features = [
    {
      icon: GitCompare,
      title: 'Perbandingan Kriteria',
      description:
        'Bandingkan kriteria laptop secara interaktif untuk menentukan bobot prioritas dengan metode pairwise comparison.',
      color: 'from-[#4a628a] to-[#7ab2d3]',
      bgColor: 'bg-gradient-to-br from-[#4a628a]/10 to-[#7ab2d3]/10',
      details: ['Pairwise Comparison', 'Konsistensi Rasio', 'Prioritas Bobot'],
    },
    {
      icon: Laptop,
      title: 'Alternatif Laptop',
      description:
        'Tambahkan beberapa pilihan laptop yang ingin kamu bandingkan dengan spesifikasi lengkap dan detail.',
      color: 'from-[#7ab2d3] to-[#b9e5e8]',
      bgColor: 'bg-gradient-to-br from-[#7ab2d3]/10 to-[#b9e5e8]/10',
      details: ['Multiple Device', 'Spesifikasi Detail', 'Custom Input'],
    },
    {
      icon: BarChart3,
      title: 'Hasil Ranking',
      description:
        'Dapatkan rekomendasi laptop terbaik dengan grafik hasil perhitungan AHP yang mudah dipahami.',
      color: 'from-[#4a628a] to-[#b9e5e8]',
      bgColor: 'bg-gradient-to-br from-[#4a628a]/10 to-[#b9e5e8]/10',
      details: ['Visual Chart', 'Score Akhir', 'Rekomendasi Terbaik'],
    },
  ];

  return (
    <section
      className='relative py-25 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-[#dff2eb] to-[#7ab2d3] overflow-hidden'
      id='services'
    >
      {/* Background Decorations */}
      <div className='absolute inset-0 overflow-hidden'>
        {/* Animated Grid */}
        <div className='absolute inset-0 opacity-[0.03]'>
          <div className='absolute inset-0 bg-[linear-gradient(to_right,#4a628a_1px,transparent_1px),linear-gradient(to_bottom,#4a628a_1px,transparent_1px)] bg-[size:64px_64px]' />
        </div>

        {/* Floating Shapes */}
        <motion.div
          animate={{
            y: [0, -30, 0],
            rotate: [0, 5, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className='absolute top-20 left-10 w-20 h-20 bg-gradient-to-br from-[#4a628a]/10 to-[#7ab2d3]/10 rounded-3xl blur-xl'
        />
        <motion.div
          animate={{
            y: [0, 40, 0],
            rotate: [0, -5, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 1,
          }}
          className='absolute bottom-32 right-16 w-24 h-24 bg-gradient-to-br from-[#7ab2d3]/10 to-[#b9e5e8]/10 rounded-3xl blur-xl'
        />
        <motion.div
          animate={{
            y: [0, -20, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 2,
          }}
          className='absolute top-1/2 right-1/4 w-16 h-16 bg-gradient-to-br from-[#dff2eb] to-[#b9e5e8] rounded-2xl blur-lg'
        />
      </div>

      <div className='max-w-7xl mx-auto relative'>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className='text-center mb-20'
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className='inline-flex items-center gap-3 bg-white/80 backdrop-blur-xl rounded-2xl px-6 py-3 border border-white/40 shadow-lg mb-6'
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
            >
              <Sparkles className='h-5 w-5 text-[#4a628a]' fill='#4a628a' />
            </motion.div>
            <span className='text-lg font-semibold bg-gradient-to-r from-[#4a628a] to-[#7ab2d3] bg-clip-text text-transparent'>
              Fitur Unggulan
            </span>
          </motion.div>

          <h2 className='text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6'>
            Fitur{' '}
            <span className='bg-gradient-to-r from-[#4a628a] via-[#7ab2d3] to-[#4a628a] bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient'>
              Utama
            </span>
          </h2>

          <p className='text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed'>
            Temukan pengalaman terbaik dalam memilih laptop dengan fitur-fitur
            canggih yang dirancang untuk memberikan hasil yang akurat dan mudah
            dipahami.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
                ease: 'easeOut',
              }}
              whileHover={{
                y: -4,
                transition: { duration: 0.2, ease: 'easeOut' },
              }}
              className='group relative h-full'
            >
              {/* Background Glow - Simplified */}
              <div
                className={`absolute inset-0 ${feature.bgColor} rounded-2xl blur-lg opacity-0 group-hover:opacity-60 transition-opacity duration-300`}
              />

              <Card className='relative bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-100/50 hover:shadow-xl transition-all duration-300 overflow-hidden h-full flex flex-col'>
                {/* Simplified Animated Border */}
                <div className='absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12 transform -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out' />

                <CardContent className='p-6 relative flex flex-col flex-1'>
                  {/* Icon Container - Fixed Size */}
                  <div className='flex justify-center mb-4'>
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.2 }}
                      className={`w-14 h-14 bg-gradient-to-br ${feature.color} rounded-xl flex items-center justify-center group-hover:shadow-md transition-shadow duration-300`}
                    >
                      <feature.icon className='w-6 h-6 text-white' />
                    </motion.div>
                  </div>

                  {/* Title - Centered and Consistent */}
                  <h3 className='text-xl font-bold text-gray-900 mb-3 text-center group-hover:text-[#4a628a] transition-colors duration-300 line-clamp-2'>
                    {feature.title}
                  </h3>

                  {/* Description - Fixed Height */}
                  <p className='text-gray-600 leading-relaxed mb-4 text-center flex-1 line-clamp-3'>
                    {feature.description}
                  </p>

                  {/* Feature Details - Simplified */}
                  <div className='space-y-2 mb-4'>
                    {feature.details.map((detail, idx) => (
                      <motion.div
                        key={detail}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{
                          duration: 0.3,
                          delay: index * 0.05 + idx * 0.05,
                        }}
                        className='flex items-center gap-2'
                      >
                        <div className='w-5 h-5 bg-gradient-to-br from-[#dff2eb] to-[#b9e5e8] rounded-full flex items-center justify-center flex-shrink-0'>
                          <CheckCircle2 className='w-2.5 h-2.5 text-[#4a628a]' />
                        </div>
                        <span className='text-gray-700 text-sm font-medium truncate'>
                          {detail}
                        </span>
                      </motion.div>
                    ))}
                  </div>

                  {/* CTA Button - Consistent Placement */}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
