import { useState } from 'react';
import { Pencil, Trash2, Plus } from 'lucide-react';
import { useProducts } from '../hooks/useProducts';
import { ProductFormModal } from '../components/ProductFormModal';
import type { Product } from '../data/products';

export const Storefront = () => {
  const { products, addProduct, updateProduct, deleteProduct } = useProducts();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [productToEdit, setProductToEdit] = useState<Product | null>(null);

  const handleOpenModal = (product?: Product) => {
    setProductToEdit(product || null);
    setIsModalOpen(true);
  };

  const handleSaveProduct = (productData: Omit<Product, 'id'> | Product) => {
    if ('id' in productData) {
      updateProduct(productData.id, productData);
    } else {
      addProduct(productData);
    }
  };

  return (
    <div className="animate-fade-in">
      <div className="page-header">
        <div>
          <h1 className="gradient-text">Your Storefront</h1>
          <p className="text-muted">Manage your public digital products catalog.</p>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button onClick={() => handleOpenModal()} className="btn btn-outline" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Plus size={18} /> Add Product
          </button>
          <a href="/" target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-glow" style={{ textDecoration: 'none' }}>
            Preview Public Store
          </a>
        </div>
      </div>

      <div className="grid grid-cols-3">
        {products.map(product => (
          <div key={product.id} className="glass-card" style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ 
              height: '160px', 
              background: 'linear-gradient(135deg, rgba(99,102,241,0.2), rgba(6,182,212,0.2))',
              borderRadius: '8px',
              marginBottom: '16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--accent-primary)',
              fontWeight: 'bold',
              fontSize: '1.2rem',
              textAlign: 'center',
              padding: '20px'
            }}>
              {product.title.split(' ')[0]} {product.title.split(' ')[1]}...
            </div>
            <h3 style={{ fontSize: '1.1rem', marginBottom: '8px' }}>{product.title}</h3>
            <p className="text-muted" style={{ fontSize: '0.9rem', marginBottom: 'auto', paddingBottom: '20px' }}>
              {product.description}
            </p>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <span style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>${product.price}</span>
              {product.inStock ? 
                <span className="badge badge-success">In Stock</span> : 
                <span className="badge" style={{ color: 'red', borderColor: 'red' }}>Sold Out</span>
              }
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              <button 
                className="btn btn-outline" 
                onClick={() => handleOpenModal(product)}
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
              >
                <Pencil size={18} /> Edit
              </button>
              <button 
                className="btn btn-outline" 
                onClick={() => {
                  if (window.confirm('Are you sure you want to delete this product?')) {
                    deleteProduct(product.id);
                  }
                }}
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', color: '#ef4444', borderColor: '#ef4444' }}
              >
                <Trash2 size={18} /> Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      <ProductFormModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveProduct}
        productToEdit={productToEdit}
        key={isModalOpen ? (productToEdit ? productToEdit.id : 'new') : 'closed'}
      />
    </div>
  );
};
