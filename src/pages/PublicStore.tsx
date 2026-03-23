import { ShoppingCart, Bitcoin, BookOpen } from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { usePayments } from '../hooks/usePayments';

export const PublicStore = () => {
  const { processPayPal, processCrypto, isProcessing } = usePayments();

  return (
    <div className="public-store-container">
      <header className="store-header">
        <div className="store-header-content">
          <BookOpen size={48} className="store-logo-icon" />
          <h1 className="gradient-text store-title">Best Books Ever</h1>
          <p className="store-subtitle">Premium digital books designed to elevate your life and business.</p>
        </div>
      </header>

      <main className="store-main">
        <h2 className="section-title">Our Catalog</h2>
        <div className="grid grid-cols-3 public-grid">
          {PRODUCTS.map(product => (
            <div key={product.id} className="glass-card product-card">
              <div className="product-image-placeholder">
                {product.title.split(' ')[0]} {product.title.split(' ')[1]}
              </div>
              <h3 className="product-title">{product.title}</h3>
              <p className="text-muted product-description">
                {product.description}
              </p>
              <div className="product-price-row">
                <span className="product-price">${product.price}</span>
                {product.inStock ? 
                  <span className="badge badge-success">Available Now</span> : 
                  <span className="badge" style={{ color: 'red', borderColor: 'red' }}>Sold Out</span>
                }
              </div>
              <div className="payment-buttons">
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
      </main>

      <footer className="store-footer">
        <p>© {new Date().getFullYear()} Best Books Ever. All Rights Reserved.</p>
      </footer>
    </div>
  );
};
