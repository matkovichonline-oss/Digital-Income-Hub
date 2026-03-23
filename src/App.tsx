import { BrowserRouter, Routes, Route, NavLink, Outlet, Navigate, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Store, FileText, Settings, LogOut } from 'lucide-react';
import { Storefront } from './pages/Storefront';
import { KDPHelper } from './pages/KDPHelper';
import { PublicStore } from './pages/PublicStore';
import { Login } from './pages/Login';

// Dashboard component
const Dashboard = () => (
  <div className="animate-fade-in">
    <div className="page-header">
      <div>
        <h1 className="gradient-text">Overview</h1>
        <p className="text-muted">Welcome back. Here's what's happening today.</p>
      </div>
      <button className="btn btn-primary btn-glow">Add New Product</button>
    </div>
    
    <div className="grid grid-cols-3 mb-8">
      <div className="glass-panel text-center">
        <h3 className="text-muted">Total Sales</h3>
        <h2 style={{ fontSize: '2.5rem', marginTop: '10px' }}>$1,248.50</h2>
        <span className="badge badge-success">+12% this week</span>
      </div>
      <div className="glass-panel text-center">
        <h3 className="text-muted">Active Products</h3>
        <h2 style={{ fontSize: '2.5rem', marginTop: '10px' }}>4</h2>
        <span className="badge badge-accent">Live</span>
      </div>
      <div className="glass-panel text-center">
        <h3 className="text-muted">Recent Orders</h3>
        <h2 style={{ fontSize: '2.5rem', marginTop: '10px' }}>28</h2>
        <span className="badge badge-success">+5 today</span>
      </div>
    </div>
  </div>
);

const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    navigate('/login');
  };

  return (
    <div className="sidebar">
      <div style={{ padding: '32px 24px', borderBottom: '1px solid var(--panel-border)' }}>
        <h2 style={{ margin: 0 }} className="gradient-text">Digital Income Hub</h2>
        <p style={{ margin: 0, fontSize: '0.8rem' }} className="text-muted">Admin Portal</p>
      </div>
      
      <nav style={{ padding: '24px 12px', flex: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <NavLink to="/admin" className={({isActive}) => `nav-item ${isActive ? 'active' : ''}`} end>
          <LayoutDashboard size={20} /> Dashboard
        </NavLink>
        <NavLink to="/admin/storefront" className={({isActive}) => `nav-item ${isActive ? 'active' : ''}`}>
          <Store size={20} /> Storefront
        </NavLink>
        <NavLink to="/admin/kdp" className={({isActive}) => `nav-item ${isActive ? 'active' : ''}`}>
          <FileText size={20} /> KDP Helper
        </NavLink>
      </nav>
      
      <div style={{ padding: '24px 12px', borderTop: '1px solid var(--panel-border)' }}>
        <button className="nav-item" style={{ width: '100%', border: 'none', background: 'transparent', textAlign: 'left', color: 'var(--text-secondary)' }}>
          <Settings size={20} /> Settings
        </button>
        <button onClick={handleLogout} className="nav-item" style={{ width: '100%', border: 'none', background: 'transparent', textAlign: 'left', color: 'var(--text-secondary)' }}>
          <LogOut size={20} /> Logout
        </button>
      </div>
      
      <style>{`
        .nav-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 16px;
          color: var(--text-secondary);
          text-decoration: none;
          border-radius: 8px;
          transition: all var(--transition-speed);
          font-weight: 500;
          cursor: pointer;
        }
        .nav-item:hover {
          background: rgba(255,255,255,0.05);
          color: var(--text-primary);
        }
        .nav-item.active {
          background: rgba(99, 102, 241, 0.1);
          color: var(--accent-primary);
          border-left: 3px solid var(--accent-primary);
        }
      `}</style>
    </div>
  );
};

const AdminLayout = () => (
  <div className="app-container">
    <Sidebar />
    <main className="main-content">
      <Outlet />
    </main>
  </div>
);

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<PublicStore />} />
        <Route path="/login" element={<Login />} />
        
        {/* Protected Admin Routes */}
        <Route path="/admin" element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }>
          <Route index element={<Dashboard />} />
          <Route path="storefront" element={<Storefront />} />
          <Route path="kdp" element={<KDPHelper />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
