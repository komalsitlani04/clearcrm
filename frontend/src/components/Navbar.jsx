import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LayoutDashboard, Users, LogOut } from 'lucide-react';

export default function Navbar() {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const linkStyle = (path) => ({
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    padding: '8px 14px',
    borderRadius: '8px',
    textDecoration: 'none',
    fontWeight: 500,
    fontSize: '14px',
    color: location.pathname === path ? '#2563eb' : '#64748b',
    background: location.pathname === path ? '#eff6ff' : 'transparent',
    transition: 'all 0.2s',
  });

  return (
    <nav style={{
      background: '#ffffff',
      borderBottom: '1px solid #e2e8f0',
      padding: '0 24px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      height: '60px',
      position: 'sticky',
      top: 0,
      zIndex: 100,
      boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
    }}>
      {/* Logo */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <div style={{
          width: '32px', height: '32px', borderRadius: '8px',
          background: 'linear-gradient(135deg, #2563eb, #7c3aed)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <span style={{ color: 'white', fontWeight: 700, fontSize: '14px' }}>C</span>
        </div>
        <span style={{ fontWeight: 700, fontSize: '16px', color: '#1e293b' }}>ClearCRM</span>
      </div>

      {/* Nav links */}
      <div style={{ display: 'flex', gap: '4px' }}>
        <Link to="/" style={linkStyle('/')}>
          <LayoutDashboard size={16} /> Dashboard
        </Link>
        <Link to="/leads" style={linkStyle('/leads')}>
          <Users size={16} /> Leads
        </Link>
      </div>

      {/* User + logout */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <span style={{ fontSize: '13px', color: '#64748b' }}>
          Hi, <strong style={{ color: '#1e293b' }}>{user?.name}</strong>
        </span>
        <button
          onClick={handleLogout}
          style={{
            display: 'flex', alignItems: 'center', gap: '6px',
            padding: '7px 12px', borderRadius: '8px', border: '1px solid #e2e8f0',
            background: 'white', cursor: 'pointer', fontSize: '13px',
            color: '#64748b', fontWeight: 500, transition: 'all 0.2s',
          }}
        >
          <LogOut size={14} /> Logout
        </button>
      </div>
    </nav>
  );
}