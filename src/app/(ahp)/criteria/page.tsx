'use client';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { calculateAHP } from '@/lib/ahp';
import {
  DollarSign,
  Cpu,
  Battery,
  Monitor,
  Scale,
  ArrowRight,
  Calculator,
  Sparkles,
  Target,
  ChevronRight,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';

const criteria = [
  {
    id: 'price',
    label: 'Harga',
    icon: DollarSign,
    color: '#ef4444',
    desc: 'Biaya pembelian laptop',
  },
  {
    id: 'performance',
    label: 'Performa',
    icon: Cpu,
    color: '#3b82f6',
    desc: 'Kecepatan dan kemampuan proses',
  },
  {
    id: 'battery',
    label: 'Baterai',
    icon: Battery,
    color: '#10b981',
    desc: 'Daya tahan baterai',
  },
  {
    id: 'display',
    label: 'Display',
    icon: Monitor,
    color: '#8b5cf6',
    desc: 'Kualitas tampilan layar',
  },
];

const scale = [
  { value: 1, label: '1 - Sama Penting' },
  { value: 2, label: '2 - Sedikit Lebih Penting' },
  { value: 3, label: '3 - Cukup Lebih Penting' },
  { value: 4, label: '4 - Lebih Penting' },
  { value: 5, label: '5 - Jauh Lebih Penting' },
  { value: 6, label: '6 - Sangat Jauh Lebih Penting' },
  { value: 7, label: '7 - Ekstrem Lebih Penting' },
  { value: 8, label: '8 - Mendekati Mutlak' },
  { value: 9, label: '9 - Mutlak Lebih Penting' },
  { value: 1 / 3, label: '1/3 - Sama Kurang Penting' },
  { value: 1 / 5, label: '1/5 - Kurang Penting ' },
  { value: 1 / 7, label: '1/7 - Jauh Kurang Penting' },
  { value: 1 / 9, label: '1/9 - Sangat Tidak Penting' },
];

export default function CompareCriteriaPage() {
  const n = criteria.length;
  const [matrix, setMatrix] = useState<number[][]>(
    Array.from({ length: n }, (_, i) =>
      Array.from({ length: n }, (_, j) => (i === j ? 1 : 0))
    )
  );

  const [isLoaded, setIsLoaded] = useState(false);
  const router = useRouter();

  // Load saved matrix from localStorage on component mount
  useEffect(() => {
    const savedMatrix = localStorage.getItem('comparisonMatrix');
    if (savedMatrix) {
      try {
        const parsedMatrix = JSON.parse(savedMatrix);
        if (Array.isArray(parsedMatrix) && parsedMatrix.length === n) {
          setMatrix(parsedMatrix);
        }
      } catch (error) {
        console.error('Error parsing saved comparison matrix:', error);
        // If there's an error parsing, use default matrix
        setMatrix(
          Array.from({ length: n }, (_, i) =>
            Array.from({ length: n }, (_, j) => (i === j ? 1 : 1))
          )
        );
      }
    }
    setIsLoaded(true);
  }, [n]);

  const handleChange = (i: number, j: number, val: number) => {
    const newMatrix = matrix.map((row) => [...row]);
    newMatrix[i][j] = val;
    newMatrix[j][i] = 1 / val;
    setMatrix(newMatrix);

    // Auto-save to localStorage whenever matrix changes
    localStorage.setItem('comparisonMatrix', JSON.stringify(newMatrix));
  };

  const handleSubmit = () => {
    const { weights, CR } = calculateAHP(matrix);
    localStorage.setItem('weights', JSON.stringify(weights));
    localStorage.setItem('CR', CR.toString());
    router.push('/results');
  };

  // Calculate completion percentage
  const totalComparisons = (n * (n - 1)) / 2;
  const completedComparisons = matrix.flatMap((row, i) =>
    row.filter((_, j) => i < j && matrix[i][j] !== 1)
  ).length;
  const completionPercentage = (completedComparisons / totalComparisons) * 100;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
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
        duration: 0.4,
        ease: 'easeOut',
      },
    },
  };

  if (!isLoaded) {
    return (
      <div className='min-h-screen bg-[#021526] flex items-center justify-center'>
        <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-blue-400'></div>
      </div>
    );
  }

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
                Perbandingan Kriteria
              </h1>
              <Badge
                variant='secondary'
                className='bg-blue-500/20 text-blue-200 border-blue-400/30'
              >
                Analytical Hierarchy Process
              </Badge>
            </div>
          </div>
          <p className='text-lg text-blue-100/80 max-w-3xl mx-auto'>
            Tentukan seberapa penting setiap kriteria dalam pemilihan laptop
            menggunakan metode{' '}
            <span className='font-semibold text-blue-300'>
              Analytical Hierarchy Process (AHP)
            </span>
          </p>
        </motion.div>

        {/* Progress Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className='mb-8'
        >
          <Card className='bg-[#0a2a4a] backdrop-blur-sm border-blue-400/20 shadow-xl'>
            <CardContent className='p-6'>
              <div className='flex items-center justify-between mb-3'>
                <span className='text-sm font-medium text-blue-200'>
                  Progress Perbandingan
                </span>
                <span className='text-sm font-bold text-cyan-300'>
                  {completedComparisons}/{totalComparisons} (
                  {Math.round(completionPercentage)}%)
                </span>
              </div>
              <Progress
                value={completionPercentage}
                className='h-2 bg-blue-900/50'
              />
            </CardContent>
          </Card>
        </motion.div>

        {/* Criteria Overview */}
        <motion.div
          variants={containerVariants}
          initial='hidden'
          animate='visible'
          className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12'
        >
          {criteria.map((criterion, index) => {
            const IconComponent = criterion.icon;
            return (
              <motion.div key={criterion.id} variants={itemVariants}>
                <Card className='bg-[#0a2a4a] backdrop-blur-sm border-blue-400/20 shadow-xl hover:shadow-2xl hover:border-cyan-400/40 transition-all duration-500 h-full'>
                  <CardContent className='p-6 text-center'>
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      className='w-16 h-16 rounded-2xl flex items-center justify-center mb-4 mx-auto border border-blue-400/30'
                      style={{ backgroundColor: `${criterion.color}15` }}
                    >
                      <IconComponent
                        className='w-8 h-8'
                        style={{ color: criterion.color }}
                      />
                    </motion.div>
                    <h3 className='font-bold text-white text-lg mb-2 capitalize'>
                      {criterion.label}
                    </h3>
                    <p className='text-sm text-blue-200/70'>{criterion.desc}</p>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Comparison Matrix */}
        <motion.div
          variants={cardVariants}
          initial='hidden'
          animate='visible'
          className='mb-8'
        >
          <Card className='bg-[#0a2a4a] backdrop-blur-sm border-blue-400/20 shadow-2xl'>
            <CardHeader className='pb-6'>
              <div className='flex items-center gap-3'>
                <div className='w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/30'>
                  <Target className='w-6 h-6 text-white' />
                </div>
                <div>
                  <h2 className='text-2xl font-bold text-white'>
                    Matriks Perbandingan Berpasangan
                  </h2>
                  <p className='text-blue-200/80'>
                    Bandingkan tingkat kepentingan antara dua kriteria
                  </p>
                </div>
              </div>
            </CardHeader>

            <CardContent className='p-6'>
              <motion.div
                variants={containerVariants}
                initial='hidden'
                animate='visible'
                className='space-y-6'
              >
                <AnimatePresence>
                  {criteria.map((c1, i) =>
                    criteria.map((c2, j) => {
                      if (i >= j) return null;

                      const Icon1 = c1.icon;
                      const Icon2 = c2.icon;

                      return (
                        <motion.div
                          key={`${i}-${j}`}
                          variants={itemVariants}
                          layout
                          className='flex flex-col lg:flex-row items-center gap-6 p-6 bg-blue-500/10 rounded-2xl hover:bg-blue-500/15 transition-all duration-300 border border-blue-400/20 hover:border-cyan-400/40 backdrop-blur-sm'
                        >
                          {/* Left Criteria */}
                          <div className='flex items-center gap-4 flex-1'>
                            <div
                              className='w-12 h-12 rounded-xl flex items-center justify-center shadow-lg border border-blue-400/30'
                              style={{ backgroundColor: `${c1.color}15` }}
                            >
                              <Icon1
                                className='w-6 h-6'
                                style={{ color: c1.color }}
                              />
                            </div>
                            <div>
                              <span className='font-bold text-white capitalize block'>
                                {c1.label}
                              </span>
                              <span className='text-xs text-blue-200/70'>
                                {c1.desc}
                              </span>
                            </div>
                          </div>

                          {/* Comparison Selector */}
                          <div className='flex items-center gap-4'>
                            <Select
                              value={matrix[i][j].toString()}
                              onValueChange={(value) =>
                                handleChange(i, j, Number(value))
                              }
                            >
                              <SelectTrigger className='w-64 bg-[#021526] border-blue-400/30 text-white focus:ring-cyan-400 focus:border-cyan-400'>
                                <SelectValue placeholder='Pilih tingkat kepentingan' />
                              </SelectTrigger>
                              <SelectContent className='bg-[#0a2a4a] border-blue-400/30 text-white'>
                                {scale.map((item) => (
                                  <SelectItem
                                    key={item.value}
                                    value={item.value.toString()}
                                    className='focus:bg-blue-500/20 focus:text-white'
                                  >
                                    {item.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>

                            <motion.div whileHover={{ scale: 1.2 }}>
                              <ChevronRight className='w-6 h-6 text-cyan-400' />
                            </motion.div>
                          </div>

                          {/* Right Criteria */}
                          <div className='flex items-center gap-4 flex-1 justify-end lg:justify-start'>
                            <div className='text-right lg:text-left'>
                              <span className='font-bold text-white capitalize block'>
                                {c2.label}
                              </span>
                              <span className='text-xs text-blue-200/70'>
                                {c2.desc}
                              </span>
                            </div>
                            <div
                              className='w-12 h-12 rounded-xl flex items-center justify-center shadow-lg border border-blue-400/30'
                              style={{ backgroundColor: `${c2.color}15` }}
                            >
                              <Icon2
                                className='w-6 h-6'
                                style={{ color: c2.color }}
                              />
                            </div>
                          </div>
                        </motion.div>
                      );
                    })
                  )}
                </AnimatePresence>
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Submit Button */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8 }}
          className='text-center mb-8'
        >
          <Button
            onClick={handleSubmit}
            disabled={completionPercentage < 100}
            size='lg'
            className={cn(
              'h-14 px-8 bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-xl hover:shadow-2xl hover:shadow-cyan-500/30 transition-all duration-500 cursor-pointer backdrop-blur-sm',
              completionPercentage < 100 &&
                'opacity-50 cursor-not-allowed grayscale'
            )}
          >
            <Calculator className='w-5 h-5 mr-2' />
            Hitung & Lihat Hasil AHP
            <Sparkles className='w-5 h-5 ml-2' />
          </Button>
        </motion.div>

        {/* Info Text */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className='text-center'
        >
          <p className='text-sm text-blue-200/70 mb-2'>
            Sistem akan menghitung bobot prioritas setiap kriteria menggunakan
            metode AHP
          </p>
          {completionPercentage < 100 && (
            <motion.p
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              className='text-sm text-red-300 font-medium'
            >
              * Lengkapi semua perbandingan kriteria untuk melanjutkan
            </motion.p>
          )}
        </motion.div>
      </div>
    </div>
  );
}
