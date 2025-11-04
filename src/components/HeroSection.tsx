'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Play, CheckCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import LightRays from '@/components/LightRays';

export default function HeroSection() {
  const router = useRouter();

  const handleFindMyLaptop = () => {
    router.push('/input-laptop');
  };
  return (
    <div
      className='relative min-h-screen overflow-hidden bg-[#021526]'
      id='home'
    >
      {/* Add padding top to account for fixed navbar */}
      <div className='pt-10 lg:pt-5'>
        {/* Background Elements */}
        <div className='absolute inset-0'>
          <LightRays
            raysOrigin='top-center'
            raysColor='rgba(59, 130, 246, 0.15)'
            raysSpeed={1.5}
            lightSpread={0.8}
            rayLength={1.2}
            followMouse={true}
            mouseInfluence={0.1}
            noiseAmount={0.1}
            distortion={0.05}
            className='custom-rays'
          />

          {/* Animated Grid Pattern */}
          <div className='absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.03)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]' />
        </div>

        {/* Hero Section Content */}
        <section className='relative min-h-screen flex items-center'>
          <div className='container mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-25'>
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-4 items-center'>
              {/* Left Content */}
              <div className='space-y-6 p-5 lg:space-y-8 text-center lg:text-left'>
                {/* Badge */}
                <div className='inline-block pt-10 lg:pt-2'>
                  <span className='text-sm font-semibold text-gray-500 tracking-wide'>
                    Rekomendasi Laptop Pintar
                  </span>
                </div>

                {/* Headline */}
                <div className='space-y-4'>
                  <h1 className='text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900'>
                    Temukan Laptop
                    <span className='block text-gray-400'>Cocok Buat Kamu</span>
                  </h1>

                  {/* Subheadline */}
                  <p className='text-base sm:text-lg md:text-xl text-gray-500 max-w-lg mx-auto lg:mx-0 leading-relaxed'>
                    Dengan teknologi AHP pintar, kami bantu kamu nemuin laptop
                    terbaik sesuai kebutuhan entah buat kerja, kuliah, editing,
                    atau gaming.
                  </p>
                </div>

                {/* Feature List */}
                <div className='space-y-3'>
                  <div className='flex items-center gap-3 justify-center lg:justify-start'>
                    <CheckCircle className='h-5 w-5 text-gray-600' />
                    <span className='text-gray-300'>Rekomendasi personal</span>
                  </div>
                  <div className='flex items-center gap-3 justify-center lg:justify-start'>
                    <CheckCircle className='h-5 w-5 text-gray-600' />
                    <span className='text-gray-300'>
                      Pilihan dari merek-merek top
                    </span>
                  </div>
                </div>

                {/* CTA Buttons */}
                <div className='flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start'>
                  <Button
                    size='lg'
                    className='bg-gray-700 hover:bg-gray-800 text-white rounded-lg transition-all duration-200 flex items-center gap-2 px-6 sm:px-8 py-5 sm:py-6 text-base font-medium cursor-pointer'
                    onClick={handleFindMyLaptop}
                  >
                    Mulai Sekarang
                  </Button>
                  <Button
                    size='lg'
                    variant='outline'
                    className='border-gray-300 text-gray-700 hover:bg-gray-50 rounded-lg transition-all duration-200 flex items-center gap-2 px-6 sm:px-8 py-5 sm:py-6 text-base font-medium cursor-pointer'
                  >
                    <Play className='h-4 w-4' />
                    Lihat Demo
                  </Button>
                </div>
              </div>

              {/* Right Content with Decorations */}
              <div className='relative'>
                {/* Background Decorations */}
                <div className='absolute -top-8 -right-8 w-32 h-32 bg-[#031c31] rounded-full opacity-40 mix-blend-multiply blur-xl animate-float will-change-transform'></div>

                <div className='absolute -bottom-8 -left-8 w-24 h-24 bg-[#072036] rounded-full opacity-30 mix-blend-multiply blur-xl animate-float animation-delay-2000 will-change-transform'></div>

                <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-[#4a628a] rounded-full opacity-20 mix-blend-multiply blur-xl animate-float animation-delay-4000 will-change-transform'></div>

                {/* Floating Card */}
                <div className='absolute -bottom-4 -right-4 bg-[#4a628a] text-white rounded-2xl p-3 shadow-lg z-10'>
                  <div className='text-xs font-semibold'>AHP Powered</div>
                </div>

                {/* Main Image Container */}
                <div className='relative bg-black/20 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20 mx-auto max-w-md lg:max-w-lg'>
                  <div className='relative left-6 lg:left-8 w-full h-[350px] sm:h-[450px] lg:h-[450px]'>
                    <Image
                      src='/hero-laptop.webp'
                      alt='Modern laptop showing AHP interface'
                      fill
                      className='object-contain object-center select-none pointer-events-none'
                      priority={false}
                      loading='lazy'
                      decoding='async'
                      sizes='(max-width: 1024px) 100vw, 50vw'
                    />
                  </div>
                </div>

                {/* Grid Pattern Overlay */}
                <div className='absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent rounded-2xl pointer-events-none'></div>
              </div>
            </div>
          </div>

          {/* Custom Animations */}
          <style jsx>{`
            @keyframes float {
              0%,
              100% {
                transform: translateY(0px) scale(1);
              }
              50% {
                transform: translateY(-20px) scale(1.05);
              }
            }
            .animate-float {
              animation: float 6s ease-in-out infinite;
            }
            .animation-delay-2000 {
              animation-delay: 2s;
            }
            .animation-delay-4000 {
              animation-delay: 4s;
            }
          `}</style>
        </section>
      </div>
    </div>
  );
}
