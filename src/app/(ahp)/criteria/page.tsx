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
];

export default function CompareCriteriaPage() {
  const n = criteria.length;
  const [matrix, setMatrix] = useState<number[][]>(
    Array.from({ length: n }, (_, i) =>
      Array.from({ length: n }, (_, j) => (i === j ? 1 : 1))
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

  // Don't render until data is loaded to prevent flash of empty state

  return (
    <div className='min-h-screen bg-gradient-to-br from-[#dff2eb] via-[#b9e5e8] to-[#7ab2d3] py-8 px-4'>
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
              <h1 className='text-4xl font-bold text-[#4a628a] mb-2'>
                Perbandingan Kriteria
              </h1>
              <Badge variant='secondary' className='bg-[#7ab2d3] text-white'>
                Analytical Hierarchy Process
              </Badge>
            </div>
          </div>
          <p className='text-lg text-[#4a628a] text-opacity-80 max-w-3xl mx-auto'>
            Tentukan seberapa penting setiap kriteria dalam pemilihan laptop
            menggunakan metode{' '}
            <span className='font-semibold text-[#4a628a]'>
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
          <Card className='bg-white/90 backdrop-blur-sm border-[#b9e5e8] shadow-lg'>
            <CardContent className='p-6'>
              <div className='flex items-center justify-between mb-3'>
                <span className='text-sm font-medium text-[#4a628a]'>
                  Progress Perbandingan
                </span>
                <span className='text-sm font-bold text-[#4a628a]'>
                  {completedComparisons}/{totalComparisons} (
                  {Math.round(completionPercentage)}%)
                </span>
              </div>
              <Progress
                value={completionPercentage}
                className='h-2 bg-[#dff2eb]'
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
                <Card className='bg-white/90 backdrop-blur-sm border-[#b9e5e8] shadow-lg hover:shadow-xl transition-all duration-500 h-full'>
                  <CardContent className='p-6 text-center'>
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      className='w-16 h-16 rounded-2xl flex items-center justify-center mb-4 mx-auto'
                      style={{ backgroundColor: `${criterion.color}20` }}
                    >
                      <IconComponent
                        className='w-8 h-8'
                        style={{ color: criterion.color }}
                      />
                    </motion.div>
                    <h3 className='font-bold text-[#4a628a] text-lg mb-2 capitalize'>
                      {criterion.label}
                    </h3>
                    <p className='text-sm text-[#4a628a] text-opacity-70'>
                      {criterion.desc}
                    </p>
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
          <Card className='bg-white/90 backdrop-blur-sm border-[#b9e5e8] shadow-xl'>
            <CardHeader className='pb-6'>
              <div className='flex items-center gap-3'>
                <div className='w-12 h-12 bg-[#4a628a] rounded-xl flex items-center justify-center'>
                  <Target className='w-6 h-6 text-white' />
                </div>
                <div>
                  <h2 className='text-2xl font-bold text-[#4a628a]'>
                    Matriks Perbandingan Berpasangan
                  </h2>
                  <p className='text-[#4a628a] text-opacity-70'>
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
                          className='flex flex-col lg:flex-row items-center gap-6 p-6 bg-[#dff2eb] bg-opacity-50 rounded-2xl hover:bg-opacity-70 transition-all duration-300 border border-[#b9e5e8]'
                        >
                          {/* Left Criteria */}
                          <div className='flex items-center gap-4 flex-1'>
                            <div
                              className='w-12 h-12 rounded-xl flex items-center justify-center shadow-lg'
                              style={{ backgroundColor: `${c1.color}20` }}
                            >
                              <Icon1
                                className='w-6 h-6'
                                style={{ color: c1.color }}
                              />
                            </div>
                            <div>
                              <span className='font-bold text-[#4a628a] capitalize block'>
                                {c1.label}
                              </span>
                              <span className='text-xs text-[#4a628a] text-opacity-70'>
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
                              <SelectTrigger className='w-64 bg-white border-[#b9e5e8] focus:ring-[#4a628a] focus:border-[#4a628a]'>
                                <SelectValue placeholder='Pilih tingkat kepentingan' />
                              </SelectTrigger>
                              <SelectContent>
                                {scale.map((item) => (
                                  <SelectItem
                                    key={item.value}
                                    value={item.value.toString()}
                                  >
                                    {item.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>

                            <motion.div whileHover={{ scale: 1.2 }}>
                              <ChevronRight className='w-6 h-6 text-[#4a628a] text-opacity-60' />
                            </motion.div>
                          </div>

                          {/* Right Criteria */}
                          <div className='flex items-center gap-4 flex-1 justify-end lg:justify-start'>
                            <div className='text-right lg:text-left'>
                              <span className='font-bold text-[#4a628a] capitalize block'>
                                {c2.label}
                              </span>
                              <span className='text-xs text-[#4a628a] text-opacity-70'>
                                {c2.desc}
                              </span>
                            </div>
                            <div
                              className='w-12 h-12 rounded-xl flex items-center justify-center shadow-lg'
                              style={{ backgroundColor: `${c2.color}20` }}
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
              'h-14 px-8 bg-gradient-to-r from-[#4a628a] to-[#7ab2d3] text-white shadow-xl hover:shadow-2xl transition-all duration-500 cursor-pointer',
              completionPercentage < 100 && 'opacity-50 cursor-not-allowed'
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
          <p className='text-sm text-[#4a628a] text-opacity-70 mb-2'>
            Sistem akan menghitung bobot prioritas setiap kriteria menggunakan
            metode AHP
          </p>
          {completionPercentage < 100 && (
            <motion.p
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              className='text-sm text-red-500 font-medium'
            >
              * Lengkapi semua perbandingan kriteria untuk melanjutkan
            </motion.p>
          )}
        </motion.div>
      </div>
    </div>
  );
}
