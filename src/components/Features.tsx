'use client';

import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { GitCompare, Laptop, BarChart3, CheckCircle2 } from 'lucide-react';

export default function FeaturesSection() {
  const features = [
    {
      icon: Laptop,
      title: 'Alternatif Laptop',
      description:
        'Tambahkan dan kelola berbagai pilihan laptop dengan spesifikasi lengkap untuk perbandingan.',
      color: 'from-green-400 to-emerald-400',
      iconColor: 'text-green-400',
      details: ['Multiple Device', 'Spesifikasi Detail', 'Custom Input'],
    },
    {
      icon: GitCompare,
      title: 'Perbandingan Kriteria',
      description:
        'Bandingkan kriteria laptop secara interaktif untuk menentukan bobot prioritas dengan metode AHP.',
      color: 'from-blue-400 to-cyan-400',
      iconColor: 'text-blue-400',
      details: ['Pairwise Comparison', 'Konsistensi Rasio', 'Prioritas Bobot'],
    },
    {
      icon: BarChart3,
      title: 'Hasil Ranking',
      description:
        'Dapatkan rekomendasi laptop terbaik berdasarkan analisis AHP yang komprehensif.',
      color: 'from-purple-400 to-violet-400',
      iconColor: 'text-purple-400',
      details: ['Visual Chart', 'Score Akhir', 'Rekomendasi Terbaik'],
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  };

  return (
    <section className='py-20 px-4 sm:px-6 lg:px-8 bg-[#021526]' id='services'>
      <div className='max-w-6xl mx-auto'>
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className='text-center mb-16'
        >
          <div className='inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 mb-6 border border-blue-400/30 shadow-lg shadow-blue-500/10'>
            <span className='text-sm font-semibold text-blue-200'>
              Fitur Unggulan
            </span>
          </div>

          <h2 className='text-4xl md:text-5xl font-bold text-white mb-6'>
            Cara Kerja{' '}
            <span className='text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400'>
              AHP
            </span>
          </h2>

          <p className='text-xl text-blue-100/80 max-w-3xl mx-auto leading-relaxed'>
            Sistem analisis yang membantu Anda memilih laptop terbaik dengan
            metode Analytical Hierarchy Process yang terstruktur dan akurat.
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          variants={containerVariants}
          initial='hidden'
          whileInView='visible'
          viewport={{ once: true }}
          className='grid grid-cols-1 lg:grid-cols-3 gap-8'
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              variants={itemVariants}
              className='group'
            >
              <Card className='bg-[#0a2a4a] border border-blue-400/20 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 h-full overflow-hidden hover:border-cyan-400/40 relative backdrop-blur-sm'>
                {/* Gradient overlay */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
                />

                {/* Shine effect */}
                <div className='absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000' />

                <CardContent className='p-8 relative z-10'>
                  {/* Icon with Number */}
                  <div className='flex items-center justify-between mb-6'>
                    <div
                      className={`w-14 h-14 bg-gradient-to-r ${feature.color} rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform duration-300 shadow-lg`}
                    >
                      <feature.icon className='w-7 h-7 text-white' />
                    </div>
                    <div className='w-8 h-8 bg-white/10 rounded-full flex items-center justify-center text-sm font-semibold text-blue-200 border border-blue-400/30'>
                      {index + 1}
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className='text-2xl font-bold text-white mb-4 group-hover:text-blue-100 transition-colors duration-300'>
                    {feature.title}
                  </h3>

                  {/* Description */}
                  <p className='text-blue-100/80 mb-6 leading-relaxed text-lg'>
                    {feature.description}
                  </p>

                  {/* Feature Details */}
                  <div className='space-y-3'>
                    {feature.details.map((detail) => (
                      <div
                        key={detail}
                        className='flex items-center gap-3 group/item'
                      >
                        <div className='w-6 h-6 bg-green-500/20 rounded-full flex items-center justify-center flex-shrink-0 group-hover/item:bg-green-500/30 transition-colors duration-300 border border-green-400/30'>
                          <CheckCircle2 className='w-3 h-3 text-green-400' />
                        </div>
                        <span className='text-blue-100 font-medium group-hover/item:text-white transition-colors duration-300'>
                          {detail}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Bottom Border Effect */}
                  <div
                    className={`absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r ${feature.color} group-hover:w-full transition-all duration-500 ease-out`}
                  />
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className='text-center mt-16'
        >
          <div className='bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-2xl p-8 border border-blue-400/30 backdrop-blur-sm relative overflow-hidden'>
            {/* Background pattern */}
            <div className='absolute inset-0 opacity-5'>
              <div className='absolute top-0 left-0 w-32 h-32 bg-blue-400 rounded-full blur-3xl'></div>
              <div className='absolute bottom-0 right-0 w-32 h-32 bg-cyan-400 rounded-full blur-3xl'></div>
            </div>

            <div className='relative z-10'>
              <h3 className='text-2xl font-bold text-white mb-4'>
                Siap Memilih Laptop Terbaik?
              </h3>
              <p className='text-blue-100/80 mb-6 max-w-2xl mx-auto'>
                Mulai analisis perbandingan laptop Anda dengan metode AHP yang
                terpercaya.
              </p>
              <button className='bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-8 py-3 rounded-xl font-semibold hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-300 hover:scale-105'>
                Mulai Sekarang
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
