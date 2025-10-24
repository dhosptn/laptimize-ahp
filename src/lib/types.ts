export interface Laptop {
  name: string;
  price: number;
  performance: number;
  battery: number;
  display: number;
}

export type Criteria = 'price' | 'performance' | 'battery' | 'display';
