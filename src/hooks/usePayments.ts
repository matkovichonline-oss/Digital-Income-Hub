import { useState } from 'react';
import type { Product } from '../data/products';

export const usePayments = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [lastOrder, setLastOrder] = useState<{ productId: string, method: 'paypal' | 'crypto', amount: number } | null>(null);

  const processPayPal = async (product: Product) => {
    setIsProcessing(true);
    // Mock PayPal SDK initialization and flow
    return new Promise((resolve) => {
      setTimeout(() => {
        setIsProcessing(false);
        setLastOrder({ productId: product.id, method: 'paypal', amount: product.price });
        alert(`Successfully processed $${product.price} PayPal payment for ${product.title}!`);
        resolve(true);
      }, 1500);
    });
  };

  const processCrypto = async (product: Product) => {
    setIsProcessing(true);
    // Mock Web3/Crypto Wallet flow
    return new Promise((resolve) => {
      setTimeout(() => {
        setIsProcessing(false);
        setLastOrder({ productId: product.id, method: 'crypto', amount: product.price });
        alert(`Successfully processed Crypto payment for ${product.title}!`);
        resolve(true);
      }, 1500);
    });
  };

  return { processPayPal, processCrypto, isProcessing, lastOrder };
};
