'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Laptop } from '@/lib/types';
import { useAhp } from '@/components/context/AhpContext';
import {
  Plus,
  ArrowRight,
  Laptop as LaptopIcon,
  DollarSign,
  Cpu,
  Battery,
  Monitor,
  Edit3,
  Trash2,
  CheckCircle,
  XCircle,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { cn } from '@/lib/utils';

export default function InputLaptopPage() {
  const [laptops, setLaptops] = useState<Laptop[]>([
    { name: '', price: 0, performance: 0, battery: 0, display: 0 },
  ]);
  const [isLoaded, setIsLoaded] = useState(false);
  const router = useRouter();

  // Load saved data from localStorage on component mount
  useEffect(() => {
    const savedLaptops = localStorage.getItem('laptops');
    if (savedLaptops) {
      try {
        const parsedLaptops = JSON.parse(savedLaptops);
        if (Array.isArray(parsedLaptops) && parsedLaptops.length > 0) {
          setLaptops(parsedLaptops);
        }
      } catch (error) {
        console.error('Error parsing saved laptops:', error);
        // If there's an error parsing, use defaulft empty laptop
        setLaptops([
          { name: '', price: 0, performance: 0, battery: 0, display: 0 },
        ]);
      }
    }
    setIsLoaded(true);
  }, []);

  const handleChange = (i: number, field: keyof Laptop, value: string) => {
    const newLaptops = [...laptops];
    newLaptops[i][field] = field === 'name' ? value : Number(value);
    setLaptops(newLaptops);

    // Auto-save to localStorage whenever data changes
    localStorage.setItem('laptops', JSON.stringify(newLaptops));
  };

  const addLaptop = () => {
    const newLaptops = [
      ...laptops,
      { name: '', price: 0, performance: 0, battery: 0, display: 0 },
    ];
    setLaptops(newLaptops);
    localStorage.setItem('laptops', JSON.stringify(newLaptops));
  };

  const removeLaptop = (index: number) => {
    const newLaptops = laptops.filter((_, i) => i !== index);
    setLaptops(newLaptops);
    localStorage.setItem('laptops', JSON.stringify(newLaptops));
  };

  const next = () => {
    localStorage.setItem('laptops', JSON.stringify(laptops));
    router.push('/criteria');
  };

  const isFormValid = laptops.every(
    (lap) =>
      lap.name.trim() !== '' &&
      lap.price > 0 &&
      lap.performance > 0 &&
      lap.battery > 0 &&
      lap.display > 0
  );

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
    exit: {
      scale: 0.9,
      opacity: 0,
      transition: {
        duration: 0.3,
        ease: 'easeIn',
      },
    },
  };

  // Don't render until data is loaded to prevent flash of empty state

  return (
    <div className='min-h-screen bg-gradient-to-br from-[#dff2eb] to-[#7ab2d3]  py-8 px-4'>
      <div className='max-w-4xl mx-auto'>
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
                Input Data Laptop
              </h1>
            </div>
          </div>
          <p className='text-lg text-[#4a628a] text-opacity-80 max-w-2xl mx-auto'>
            Masukkan data laptop yang ingin kamu bandingkan untuk analisis AHP
          </p>
        </motion.div>

        {/* Laptop Cards */}
        <motion.div
          variants={containerVariants}
          initial='hidden'
          animate='visible'
          className='space-y-6 mb-8'
        >
          <AnimatePresence mode='popLayout'>
            {laptops.map((lap, i) => (
              <motion.div
                key={i}
                variants={cardVariants}
                initial='hidden'
                animate='visible'
                exit='exit'
                layout
              >
                <Card className='bg-white/90 backdrop-blur-sm border-[#b9e5e8] shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden'>
                  <div className='bg-gradient-to-r from-[#7ab2d3] to-[#dff2eb]'>
                    <CardHeader className='p-5'>
                      <div className='flex items-center justify-between gap-3'>
                        {/* Kiri: Icon + Text */}
                        <div className='flex items-center gap-3 flex-1'>
                          <div className='w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm'>
                            <Edit3 className='w-6 h-6 text-white' />
                          </div>
                          <div className='flex flex-col justify-center'>
                            <h2 className='text-xl font-bold text-[#E0ECFF] leading-tight'>
                              Laptop {i + 1}
                            </h2>
                            <p className='text-white/80 text-sm leading-tight'>
                              {lap.name || 'Belum ada nama'}
                            </p>
                          </div>
                        </div>

                        {/* Kanan: Tombol Hapus */}
                        {laptops.length > 1 && (
                          <motion.div
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            <Button
                              variant='ghost'
                              size='icon'
                              onClick={() => removeLaptop(i)}
                              className='text-gray-500 hover:bg-white/20 hover:text-gray-700 flex items-center justify-center'
                            >
                              <Trash2 className='w-5 h-5' />
                            </Button>
                          </motion.div>
                        )}
                      </div>
                    </CardHeader>
                  </div>

                  <CardContent className='p-6'>
                    <motion.div
                      variants={containerVariants}
                      className='grid grid-cols-1 md:grid-cols-2 gap-6'
                    >
                      {/* Nama Laptop */}
                      <motion.div variants={itemVariants} className='space-y-3'>
                        <label className='flex items-center gap-2 text-sm font-semibold text-[#4a628a]'>
                          <LaptopIcon className='w-4 h-4' />
                          Nama Laptop
                        </label>
                        <Input
                          type='text'
                          value={lap.name}
                          onChange={(e) =>
                            handleChange(i, 'name', e.target.value)
                          }
                          placeholder='Contoh: MacBook Pro M2'
                          className='h-12 border-[#b9e5e8] focus:border-[#4a628a] focus:ring-[#4a628a]'
                        />
                      </motion.div>

                      {/* Harga */}
                      <motion.div variants={itemVariants} className='space-y-3'>
                        <label className='flex items-center gap-2 text-sm font-semibold text-[#4a628a]'>
                          <DollarSign className='w-4 h-4' />
                          Harga (juta Rp)
                        </label>
                        <Input
                          type='number'
                          value={lap.price === 0 ? '' : lap.price}
                          onChange={(e) =>
                            handleChange(i, 'price', e.target.value)
                          }
                          placeholder='Contoh: 15'
                          min='0'
                          step='0.1'
                          className='h-12 border-[#b9e5e8] focus:border-[#4a628a] focus:ring-[#4a628a]'
                        />
                      </motion.div>

                      {/* Performa */}
                      <motion.div variants={itemVariants} className='space-y-3'>
                        <label className='flex items-center gap-2 text-sm font-semibold text-[#4a628a]'>
                          <Cpu className='w-4 h-4' />
                          Performa (1-10)
                        </label>
                        <Input
                          type='number'
                          value={lap.performance === 0 ? '' : lap.performance}
                          onChange={(e) =>
                            handleChange(i, 'performance', e.target.value)
                          }
                          placeholder='1–10'
                          min='1'
                          max='10'
                          className='h-12 border-[#b9e5e8] focus:border-[#4a628a] focus:ring-[#4a628a]'
                        />
                      </motion.div>

                      {/* Baterai */}
                      <motion.div variants={itemVariants} className='space-y-3'>
                        <label className='flex items-center gap-2 text-sm font-semibold text-[#4a628a]'>
                          <Battery className='w-4 h-4' />
                          Daya Tahan Baterai (1-10)
                        </label>
                        <Input
                          type='number'
                          value={lap.battery === 0 ? '' : lap.battery}
                          onChange={(e) =>
                            handleChange(i, 'battery', e.target.value)
                          }
                          placeholder='1–10'
                          min='1'
                          max='10'
                          className='h-12 border-[#b9e5e8] focus:border-[#4a628a] focus:ring-[#4a628a]'
                        />
                      </motion.div>

                      {/* Display */}
                      <motion.div
                        variants={itemVariants}
                        className='space-y-3 md:col-span-2'
                      >
                        <label className='flex items-center gap-2 text-sm font-semibold text-[#4a628a]'>
                          <Monitor className='w-4 h-4' />
                          Kualitas Layar (1-10)
                        </label>
                        <Input
                          type='number'
                          value={lap.display === 0 ? '' : lap.display}
                          onChange={(e) =>
                            handleChange(i, 'display', e.target.value)
                          }
                          placeholder='1–10'
                          min='1'
                          max='10'
                          className='h-12 border-[#b9e5e8] focus:border-[#4a628a] focus:ring-[#4a628a]'
                        />
                      </motion.div>
                    </motion.div>

                    {/* Validation Indicators */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5 }}
                      className='mt-6 grid grid-cols-2 md:grid-cols-5 gap-3'
                    >
                      {[
                        {
                          field: 'name',
                          label: 'Nama',
                          valid: lap.name.trim() !== '',
                        },
                        {
                          field: 'price',
                          label: 'Harga',
                          valid: lap.price > 0,
                        },
                        {
                          field: 'performance',
                          label: 'Performa',
                          valid: lap.performance > 0,
                        },
                        {
                          field: 'battery',
                          label: 'Baterai',
                          valid: lap.battery > 0,
                        },
                        {
                          field: 'display',
                          label: 'Display',
                          valid: lap.display > 0,
                        },
                      ].map((item, idx) => (
                        <div
                          key={item.field}
                          className={cn(
                            'flex items-center gap-2 p-2 rounded-lg text-sm font-medium transition-all duration-300',
                            item.valid
                              ? 'bg-green-100 text-green-700'
                              : 'bg-red-100 text-red-700'
                          )}
                        >
                          {item.valid ? (
                            <CheckCircle className='w-4 h-4' />
                          ) : (
                            <XCircle className='w-4 h-4' />
                          )}
                          {item.label}
                        </div>
                      ))}
                    </motion.div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8 }}
          className='flex flex-col sm:flex-row gap-4 justify-center items-center mb-8'
        >
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              onClick={addLaptop}
              variant='outline'
              className='h-12 px-6 border-[#4a628a] text-[#4a628a] hover:bg-[#4a628a] hover:text-white'
            >
              <Plus className='w-5 h-5 mr-2' />
              Tambah Laptop Lain
            </Button>
          </motion.div>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              onClick={next}
              disabled={!isFormValid}
              className={cn(
                'h-12 px-8 bg-gradient-to-r from-[#4a628a] to-[#7ab2d3] text-white shadow-lg cursor-pointer',
                !isFormValid && 'opacity-50 cursor-not-allowed'
              )}
            >
              Lanjut ke Perbandingan Kriteria
              <ArrowRight className='w-5 h-5 ml-2' />
            </Button>
          </motion.div>
        </motion.div>

        {/* Info Text */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className='text-center'
        >
          <p className='text-sm text-[#4a628a] text-opacity-70 mb-2'>
            Pastikan semua data laptop sudah terisi dengan benar sebelum
            melanjutkan
          </p>
          {!isFormValid && (
            <motion.p
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              className='text-sm text-red-500 font-medium'
            >
              * Semua field harus diisi dengan nilai yang valid
            </motion.p>
          )}
        </motion.div>
      </div>
    </div>
  );
}
