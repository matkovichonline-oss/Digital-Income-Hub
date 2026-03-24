import { useState, useEffect } from 'react';
import type { Product } from '../data/products';
import { PRODUCTS as DEFAULT_PRODUCTS } from '../data/products';

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);

  // Load from local storage or set defaults on mount
  useEffect(() => {
    const stored = localStorage.getItem('dih_products');
    if (stored) {
      setProducts(JSON.parse(stored));
    } else {
      setProducts(DEFAULT_PRODUCTS);
      localStorage.setItem('dih_products', JSON.stringify(DEFAULT_PRODUCTS));
    }
  }, []);

  const addProduct = (product: Omit<Product, 'id'>) => {
    const newProduct = { ...product, id: `prod_${Date.now()}` };
    const updated = [...products, newProduct];
    setProducts(updated);
    localStorage.setItem('dih_products', JSON.stringify(updated));
  };

  const updateProduct = (id: string, updates: Partial<Product>) => {
    const updated = products.map(p => p.id === id ? { ...p, ...updates } : p);
    setProducts(updated);
    localStorage.setItem('dih_products', JSON.stringify(updated));
  };

  const deleteProduct = (id: string) => {
    const updated = products.filter(p => p.id !== id);
    setProducts(updated);
    localStorage.setItem('dih_products', JSON.stringify(updated));
  };

  return { products, addProduct, updateProduct, deleteProduct };
};
