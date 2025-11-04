'use client';
import { useEffect, useState } from 'react';
import { Laptop } from '@/lib/types';
import {
  Trophy,
  Award,
  Medal,
  Laptop as LaptopIcon,
  DollarSign,
  Cpu,
  Battery,
  Monitor,
  Crown,
  TrendingUp,
  BarChart3,
  Target,
  Sparkles,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';

export default function ResultsPage() {
  const [results, setResults] = useState<any[]>([]);
  const [CR, setCR] = useState<number>(0);
  const [weights, setWeights] = useState<number[]>([]);

  useEffect(() => {
    const laptops: Laptop[] = JSON.parse(
      localStorage.getItem('laptops') || '[]'
    );
    const weightsData: number[] = JSON.parse(
      localStorage.getItem('weights') || '[]'
    );
    const cr = parseFloat(localStorage.getItem('CR') || '0');

    setCR(cr);
    setWeights(weightsData);

    const ranked = laptops.map((l) => {
      const score =
        (1 / l.price) * weightsData[0] +
        l.performance * weightsData[1] +
        l.battery * weightsData[2] +
        l.display * weightsData[3];
      return { ...l, score };
    });

    ranked.sort((a, b) => b.score - a.score);
    setResults(ranked);
  }, []);

  const getRankIcon = (index: number) => {
    switch (index) {
      case 0:
        return <Crown className='w-6 h-6 text-yellow-400' />;
      case 1:
        return <Trophy className='w-6 h-6 text-gray-300' />;
      case 2:
        return <Award className='w-6 h-6 text-amber-300' />;
      default:
        return <Medal className='w-6 h-6 text-blue-400' />;
    }
  };

  const getRankColor = (index: number) => {
    switch (index) {
      case 0:
        return 'from-yellow-500 to-amber-600';
      case 1:
        return 'from-gray-500 to-gray-600';
      case 2:
        return 'from-amber-500 to-orange-500';
      default:
        return 'from-blue-500 to-cyan-500';
    }
  };

  const getRankBorder = (index: number) => {
    switch (index) {
      case 0:
        return 'ring-4 ring-yellow-500 ring-opacity-30';
      case 1:
        return 'ring-2 ring-gray-400 ring-opacity-30';
      case 2:
        return 'ring-2 ring-amber-500 ring-opacity-30';
      default:
        return 'ring-1 ring-blue-400/30';
    }
  };

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
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  };

  const cardVariants = {
    hidden: { scale: 0.9, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: 'easeOut',
      },
    },
  };

  const maxScore = results[0]?.score || 1;

  return (
    <div className='min-h-screen bg-[#021526] py-8 px-4'>
      <div className='max-w-6xl mx-auto'>
        {/* Header */}
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className='text-center mb-12'
        >
          <div className='flex items-center justify-center gap-4 mb-6'>
            <div>
              <h1 className='text-4xl font-bold text-white mb-2'>
                Hasil Rekomendasi Laptop
              </h1>
              <Badge
                variant='secondary'
                className='bg-blue-500/20 text-blue-200 border-blue-400/30'
              >
                AHP Analysis Results
              </Badge>
            </div>
          </div>

          {/* Consistency Ratio Indicator */}
          {CR > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className='inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 backdrop-blur-sm rounded-full border border-blue-400/30'
            >
              <div
                className={cn(
                  'w-3 h-3 rounded-full',
                  CR <= 0.1 ? 'bg-green-500' : 'bg-amber-500'
                )}
              />
              <span className='text-sm font-medium text-blue-200'>
                Consistency Ratio: <strong>{CR.toFixed(3)}</strong>
                {CR <= 0.1 && ' ✓ Konsisten'}
                {CR > 0.1 && ' ⚠ Perlu Review'}
              </span>
            </motion.div>
          )}
        </motion.div>

        {/* Weight Information */}
        {weights.length > 0 && (
          <motion.div
            variants={cardVariants}
            initial='hidden'
            animate='visible'
            className='mb-8'
          >
            <Card className='bg-[#0a2a4a] backdrop-blur-sm border-blue-400/20 shadow-2xl'>
              <CardHeader className='pb-4'>
                <div className='flex items-center gap-3'>
                  <div className='w-18 h-10 md:w-12 md:h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg md:rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/30'>
                    <BarChart3 className='w-8 h-5 md:w-6 md:h-6 text-white' />
                  </div>
                  <div>
                    <h3 className='text-xl font-bold text-white'>
                      Bobot Kriteria AHP
                    </h3>
                    <p className='text-blue-200/80'>
                      Distribusi prioritas kriteria berdasarkan perbandingan
                      berpasangan
                    </p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
                  {[
                    {
                      icon: DollarSign,
                      label: 'Harga',
                      color: '#ef4444',
                      index: 0,
                    },
                    {
                      icon: Cpu,
                      label: 'Performa',
                      color: '#3b82f6',
                      index: 1,
                    },
                    {
                      icon: Battery,
                      label: 'Baterai',
                      color: '#10b981',
                      index: 2,
                    },
                    {
                      icon: Monitor,
                      label: 'Display',
                      color: '#8b5cf6',
                      index: 3,
                    },
                  ].map(({ icon: Icon, label, color, index }) => (
                    <motion.div
                      key={label}
                      whileHover={{ scale: 1.05 }}
                      className='text-center p-4 bg-blue-500/10 rounded-2xl border border-blue-400/20 backdrop-blur-sm'
                    >
                      <div
                        className='w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3 border border-blue-400/30'
                        style={{ backgroundColor: `${color}15` }}
                      >
                        <Icon className='w-6 h-6' style={{ color }} />
                      </div>
                      <div className='text-sm font-medium text-blue-200 mb-1'>
                        {label}
                      </div>
                      <div className='text-2xl font-bold text-white mb-2'>
                        {(weights[index] * 100).toFixed(1)}%
                      </div>
                      <Progress
                        value={weights[index] * 100}
                        className='h-2 bg-blue-900/50'
                      />
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Results */}
        <motion.div
          variants={containerVariants}
          initial='hidden'
          animate='visible'
          className='space-y-6 mb-8'
        >
          <AnimatePresence>
            {results.map((r, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                layout
                className={cn(
                  'bg-[#0a2a4a] backdrop-blur-sm rounded-2xl shadow-2xl hover:shadow-2xl transition-all duration-500 border border-blue-400/20 hover:border-cyan-400/40 overflow-hidden',
                  getRankBorder(i)
                )}
              >
                <Card className='border-0 bg-transparent'>
                  <CardContent className='p-6'>
                    <div className='flex flex-col lg:flex-row items-center lg:items-start gap-6'>
                      {/* Rank Badge */}
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        className={cn(
                          'flex-shrink-0 w-20 h-20 bg-gradient-to-r rounded-2xl flex flex-col items-center justify-center text-white font-bold shadow-lg',
                          getRankColor(i)
                        )}
                      >
                        {getRankIcon(i)}
                        <span className='text-sm mt-1'>#{i + 1}</span>
                      </motion.div>

                      {/* Laptop Info */}
                      <div className='flex-grow min-w-0 w-full text-center lg:text-left'>
                        <div className='flex flex-col items-center lg:items-start gap-3 mb-4'>
                          <div className='flex flex-col sm:flex-row items-center gap-3'>
                            <div className='w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/30'>
                              <LaptopIcon className='w-5 h-5 text-white' />
                            </div>
                            <h3 className='text-2xl font-bold text-white truncate text-center lg:text-left'>
                              {r.name}
                            </h3>
                          </div>
                          {i === 0 && (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ delay: 0.5, type: 'spring' }}
                            >
                              <Badge className='bg-gradient-to-r from-yellow-500 to-amber-600 text-white px-4 py-2 text-sm font-bold border-0 shadow-lg'>
                                <Sparkles className='w-4 h-4 mr-1' />
                                REKOMENDASI TERBAIK
                              </Badge>
                            </motion.div>
                          )}
                        </div>

                        {/* Specifications Grid */}
                        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6'>
                          {[
                            {
                              icon: DollarSign,
                              label: 'Harga',
                              value: `Rp ${r.price.toLocaleString()} jt`,
                              color: '#ef4444',
                            },
                            {
                              icon: Cpu,
                              label: 'Performa',
                              value: `${r.performance}/10`,
                              color: '#3b82f6',
                            },
                            {
                              icon: Battery,
                              label: 'Baterai',
                              value: `${r.battery}/10`,
                              color: '#10b981',
                            },
                            {
                              icon: Monitor,
                              label: 'Display',
                              value: `${r.display}/10`,
                              color: '#8b5cf6',
                            },
                          ].map(({ icon: Icon, label, value, color }) => (
                            <motion.div
                              key={label}
                              whileHover={{ scale: 1.02 }}
                              className='flex items-center gap-3 p-3 bg-blue-500/10 rounded-xl border border-blue-400/20 backdrop-blur-sm justify-center sm:justify-start'
                            >
                              <div
                                className='w-8 h-8 rounded-lg flex items-center justify-center border border-blue-400/30'
                                style={{ backgroundColor: `${color}15` }}
                              >
                                <Icon className='w-4 h-4' style={{ color }} />
                              </div>
                              <div>
                                <div className='text-xs text-blue-200/70'>
                                  {label}
                                </div>
                                <div className='font-bold text-white'>
                                  {value}
                                </div>
                              </div>
                            </motion.div>
                          ))}
                        </div>

                        {/* Score Visualization */}
                        <div className='space-y-3'>
                          <div className='flex flex-col sm:flex-row sm:items-center justify-between gap-2'>
                            <div className='flex items-center gap-2 justify-center sm:justify-start'>
                              <TrendingUp className='w-4 h-4 text-cyan-400' />
                              <span className='text-sm font-medium text-blue-200'>
                                Skor AHP Final
                              </span>
                            </div>
                            <motion.span
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className='text-xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent text-center'
                            >
                              {r.score.toFixed(4)}
                            </motion.span>
                          </div>

                          {/* Animated Progress Bar */}
                          <div className='w-full bg-blue-900/50 rounded-full h-4 overflow-hidden backdrop-blur-sm'>
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{
                                width: `${(r.score / maxScore) * 100}%`,
                              }}
                              transition={{
                                duration: 1.5,
                                ease: 'easeOut',
                                delay: i * 0.2,
                              }}
                              className='h-4 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 shadow-lg shadow-blue-500/30'
                            />
                          </div>

                          {/* Percentage Indicator */}
                          <div className='text-center sm:text-right'>
                            <span className='text-xs text-blue-200/70'>
                              {((r.score / maxScore) * 100).toFixed(1)}% dari
                              skor tertinggi
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Final Recommendation */}
        {results.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className='text-center'
          >
            <Card className='bg-gradient-to-r from-blue-500 to-cyan-500 border-0 shadow-2xl shadow-cyan-500/30'>
              <CardContent className='p-6'>
                <div className='flex items-center justify-center gap-3 mb-3'>
                  <Target className='w-6 h-6 text-white' />
                  <h3 className='text-lg font-bold text-white'>
                    Rekomendasi Final
                  </h3>
                </div>
                <p className='text-white/90 text-sm'>
                  Berdasarkan analisis AHP, <strong>{results[0]?.name}</strong>{' '}
                  merupakan pilihan terbaik dengan skor tertinggi{' '}
                  <strong>{results[0]?.score.toFixed(4)}</strong> berdasarkan
                  bobot kriteria yang telah ditentukan.
                </p>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* No Results */}
        {results.length === 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className='text-center py-16'
          >
            <Card className='bg-[#0a2a4a] backdrop-blur-sm border-blue-400/20 max-w-md mx-auto shadow-2xl'>
              <CardContent className='p-8'>
                <Trophy className='w-16 h-16 text-blue-400/50 mx-auto mb-4' />
                <h3 className='text-xl font-bold text-white mb-2'>
                  Belum Ada Data Analisis
                </h3>
                <p className='text-blue-200/70 mb-4'>
                  Silakan lengkapi input data laptop dan perbandingan kriteria
                  terlebih dahulu.
                </p>
                <Badge
                  variant='outline'
                  className='border-blue-400/30 text-blue-200'
                >
                  AHP System Ready
                </Badge>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </div>
    </div>
  );
}
