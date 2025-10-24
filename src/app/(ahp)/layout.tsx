// app/ahp/layout.tsx
import Header from '@/components/Header';
import { AhpProvider } from '@/components/context/AhpContext';

export default function AHPLayout({ children }: { children: React.ReactNode }) {
  return (
    <AhpProvider>
      <div className='min-h-screen flex flex-col'>
        <Header />
        <main className='flex-1 flex flex-col'>{children}</main>
      </div>
    </AhpProvider>
  );
}
