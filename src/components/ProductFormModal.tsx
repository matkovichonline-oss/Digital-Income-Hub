import { useState, useEffect } from 'react';
import type { Product } from '../data/products';
import { X, Save } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSave: (product: Omit<Product, 'id'> | Product) => void;
  productToEdit?: Product | null;
}

export const ProductFormModal = ({ isOpen, onClose, onSave, productToEdit }: Props) => {
  const [formData, setFormData] = useState<Omit<Product, 'id'>>({
    title: '',
    price: 0,
    description: '',
    inStock: true
  });

  useEffect(() => {
    if (productToEdit) {
      setFormData(productToEdit);
    } else {
      setFormData({ title: '', price: 0, description: '', inStock: true });
    }
  }, [productToEdit, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(productToEdit ? { ...formData, id: productToEdit.id } as Product : formData);
    onClose();
  };

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(5px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000
    }}>
      <div className="glass-panel" style={{ width: '100%', maxWidth: '500px', padding: '30px', position: 'relative' }}>
        <button onClick={onClose} style={{
          position: 'absolute', top: '15px', right: '15px', background: 'transparent', border: 'none',
          color: 'var(--text-secondary)', cursor: 'pointer'
        }}>
          <X size={24} />
        </button>

        <h2 style={{ marginBottom: '20px' }}>{productToEdit ? 'Edit Product' : 'Add New Product'}</h2>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '5px', fontSize: '0.9rem' }}>Title</label>
            <input 
              required
              type="text" 
              value={formData.title} 
              onChange={e => setFormData({...formData, title: e.target.value})}
              style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid var(--panel-border)', background: 'var(--bg)', color: 'var(--text-primary)' }}
            />
          </div>
          
          <div>
            <label style={{ display: 'block', marginBottom: '5px', fontSize: '0.9rem' }}>Price ($)</label>
            <input 
              required
              type="number" 
              step="0.01"
              value={formData.price} 
              onChange={e => setFormData({...formData, price: parseFloat(e.target.value)})}
              style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid var(--panel-border)', background: 'var(--bg)', color: 'var(--text-primary)' }}
            />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '5px', fontSize: '0.9rem' }}>Description</label>
            <textarea 
              required
              rows={3}
              value={formData.description} 
              onChange={e => setFormData({...formData, description: e.target.value})}
              style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid var(--panel-border)', background: 'var(--bg)', color: 'var(--text-primary)', resize: 'vertical' }}
            />
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '10px' }}>
            <input 
              type="checkbox" 
              id="inStockCheck"
              checked={formData.inStock}
              onChange={e => setFormData({...formData, inStock: e.target.checked})}
            />
            <label htmlFor="inStockCheck" style={{ fontSize: '0.9rem', cursor: 'pointer' }}>In Stock</label>
          </div>

          <button type="submit" className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginTop: '15px' }}>
            <Save size={18} /> {productToEdit ? 'Save Changes' : 'Create Product'}
          </button>
        </form>
      </div>
    </div>
  );
};
