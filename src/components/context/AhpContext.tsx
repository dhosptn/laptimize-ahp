'use client';
import { createContext, useContext, useState } from 'react';

const AhpContext = createContext<any>(null);

export const AhpProvider = ({ children }: { children: React.ReactNode }) => {
  // Simpan semua data di sini agar global
  const [laptops, setLaptops] = useState<any[]>([]);
  const [isInputFilled, setIsInputFilled] = useState(false);

  return (
    <AhpContext.Provider
      value={{ laptops, setLaptops, isInputFilled, setIsInputFilled }}
    >
      {children}
    </AhpContext.Provider>
  );
};

export const useAhp = () => useContext(AhpContext);
