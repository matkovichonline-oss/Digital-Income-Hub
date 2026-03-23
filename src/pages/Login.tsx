import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, Unlock } from 'lucide-react';

export const Login = () => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // For this demo, we use a simple hardcoded password. 
    // In production, this should call a backend authentication API.
    if (password === 'admin123') {
      localStorage.setItem('isAuthenticated', 'true');
      navigate('/admin');
    } else {
      setError('Incorrect password. Please try again.');
    }
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', alignItems: 'center', justifyContent: 'center', background: 'var(--bg)' }}>
      <div className="glass-panel" style={{ width: '100%', maxWidth: '400px', padding: '40px', textAlign: 'center' }}>
        <div style={{ marginBottom: '30px', color: 'var(--accent-primary)', display: 'flex', justifyContent: 'center' }}>
          <Lock size={48} />
        </div>
        <h2 style={{ marginBottom: '10px' }}>Admin Portal</h2>
        <p className="text-muted" style={{ marginBottom: '30px' }}>Enter your password to access the dashboard.</p>
        
        <form onSubmit={handleLogin}>
          <div style={{ marginBottom: '20px', textAlign: 'left' }}>
            <input 
              type="password" 
              placeholder="Enter password..." 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                width: '100%',
                padding: '12px 16px',
                borderRadius: '8px',
                border: '1px solid var(--panel-border)',
                background: 'rgba(0,0,0,0.2)',
                color: 'var(--text-primary)',
                fontSize: '1rem',
                outline: 'none'
              }}
            />
          </div>
          {error && <p style={{ color: '#ef4444', fontSize: '0.9rem', marginBottom: '20px', textAlign: 'left' }}>{error}</p>}
          <button type="submit" className="btn btn-primary btn-glow" style={{ width: '100%' }}>
            <Unlock size={18} style={{ marginRight: '8px' }}/> Login
          </button>
        </form>
      </div>
    </div>
  );
};
