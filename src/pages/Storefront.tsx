import { ShoppingCart, Bitcoin } from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { usePayments } from '../hooks/usePayments';

export const Storefront = () => {
  const { processPayPal, processCrypto, isProcessing } = usePayments();

  return (
    <div className="animate-fade-in">
      <div className="page-header">
        <div>
          <h1 className="gradient-text">Your Storefront</h1>
          <p className="text-muted">Manage your public digital products catalog.</p>
        </div>
        <a href="/" target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-glow" style={{ textDecoration: 'none' }}>
          Preview Public Store
        </a>
      </div>

      <div className="grid grid-cols-3">
        {PRODUCTS.map(product => (
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
            <div style={{ display: 'grid', gap: '10px' }}>
              <button 
                className="btn btn-primary" 
                style={{ width: '100%' }}
                onClick={() => processPayPal(product)}
                disabled={isProcessing}
              >
                <ShoppingCart size={18} /> Buy with PayPal
              </button>
              <button 
                className="btn btn-outline" 
                style={{ width: '100%', borderColor: '#f7931a', color: '#f7931a' }}
                onClick={() => processCrypto(product)}
                disabled={isProcessing}
              >
                <Bitcoin size={18} /> Pay with Crypto
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

