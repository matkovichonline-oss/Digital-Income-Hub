export interface Product {
  id: string;
  title: string;
  price: number;
  description: string;
  inStock: boolean;
}

export const PRODUCTS: Product[] = [
  { 
    id: 'prod_tgr01', 
    title: 'Think and Grow Rich (Annotated)', 
    price: 9.99, 
    description: 'The 1937 classic with modern business annotations. Essential for modern entrepreneurs.',
    inStock: true
  },
  { 
    id: 'prod_aow02', 
    title: 'The Art of War (Illustrated)', 
    price: 14.99, 
    description: 'Sun Tzu\'s strategies beautifully illustrated for modern leaders and strategists.',
    inStock: true
  },
  { 
    id: 'prod_med03', 
    title: 'Meditations (Workbook Edition)', 
    price: 12.50, 
    description: 'Marcus Aurelius\'s stoic philosophy with interactive daily exercises to build resilience.',
    inStock: true
  },
  { 
    id: 'prod_scg04', 
    title: 'Science of Getting Rich (2024)', 
    price: 7.99, 
    description: 'Wallace D. Wattles masterpiece updated with 21st-century examples.',
    inStock: true
  }
];
