import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';
import StatCard from '../components/StatCard';

const PIPELINE = [
  { key: 'New', icon: '🆕', color: '#2563eb' },
  { key: 'Contacted', icon: '📞', color: '#ca8a04' },
  { key: 'Qualified', icon: '✅', color: '#16a34a' },
  { key: 'Converted', icon: '🎯', color: '#9333ea' },
  { key: 'Lost', icon: '❌', color: '#e11d48' },
];

export default function Dashboard() {
  const [stats, setStats] = useState({});
  const [recentLeads, setRecentLeads] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    api.get('/leads/stats/summary').then(r => setStats(r.data)).catch(console.error);
    api.get('/leads?limit=5').then(r => setRecentLeads(r.data.slice(0, 5))).catch(console.error);
  }, []);

  return (
    <div>
      <div style={{ marginBottom: '28px' }}>
        <h1 style={{ fontSize: '24px', fontWeight: 800, color: '#1e293b' }}>Dashboard</h1>
        <p style={{ color: '#94a3b8', fontSize: '14px', marginTop: '4px' }}>
          Your lead pipeline at a glance
        </p>
      </div>

      {/* Stat cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
        gap: '16px',
        marginBottom: '32px',
      }}>
        <StatCard label="Total Leads" value={stats.Total || 0} color="#2563eb" icon="👥" />
        {PIPELINE.map(p => (
          <StatCard key={p.key} label={p.key} value={stats[p.key] || 0} color={p.color} icon={p.icon} />
        ))}
      </div>

      {/* Pipeline visual */}
      <div style={{
        background: 'white', borderRadius: '12px', padding: '24px',
        border: '1px solid #e2e8f0', marginBottom: '24px',
      }}>
        <h2 style={{ fontSize: '16px', fontWeight: 700, color: '#1e293b', marginBottom: '18px' }}>
          Pipeline Overview
        </h2>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'stretch' }}>
          {PIPELINE.map((p, i) => {
            const val = stats[p.key] || 0;
            const total = stats.Total || 1;
            const pct = Math.round((val / total) * 100);
            return (
              <div key={p.key} style={{ flex: 1, textAlign: 'center' }}>
                <div style={{
                  height: '8px', borderRadius: '4px', marginBottom: '10px',
                  background: p.color, opacity: 0.8,
                  width: `${Math.max(pct, 8)}%`,
                  margin: '0 auto 10px',
                  minWidth: '100%',
                }} />
                <p style={{ fontSize: '20px', fontWeight: 700, color: '#1e293b' }}>{val}</p>
                <p style={{ fontSize: '11px', color: p.color, fontWeight: 600 }}>{p.key}</p>
                <p style={{ fontSize: '11px', color: '#94a3b8' }}>{pct}%</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Recent leads */}
      <div style={{
        background: 'white', borderRadius: '12px', padding: '24px',
        border: '1px solid #e2e8f0',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <h2 style={{ fontSize: '16px', fontWeight: 700, color: '#1e293b' }}>Recent Leads</h2>
          <button
            onClick={() => navigate('/leads')}
            style={{
              fontSize: '13px', color: '#2563eb', background: 'none',
              border: 'none', cursor: 'pointer', fontWeight: 600,
            }}
          >
            View all →
          </button>
        </div>
        {recentLeads.length === 0 ? (
          <p style={{ color: '#94a3b8', fontSize: '14px', textAlign: 'center', padding: '20px' }}>
            No leads yet. Add your first lead!
          </p>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
                {['Name', 'Company', 'Email', 'Status'].map(h => (
                  <th key={h} style={{ textAlign: 'left', padding: '8px 10px', color: '#94a3b8', fontWeight: 600, fontSize: '11px', textTransform: 'uppercase' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {recentLeads.map(lead => (
                <tr key={lead._id} style={{ borderBottom: '1px solid #f8fafc' }}>
                  <td style={{ padding: '10px', fontWeight: 600, color: '#1e293b' }}>{lead.name}</td>
                  <td style={{ padding: '10px', color: '#64748b' }}>{lead.company || '—'}</td>
                  <td style={{ padding: '10px', color: '#64748b' }}>{lead.email}</td>
                  <td style={{ padding: '10px' }}>
                    <span style={{
                      padding: '2px 10px', borderRadius: '20px', fontSize: '11px', fontWeight: 600,
                      background: lead.status === 'Converted' ? '#fdf4ff' : lead.status === 'Lost' ? '#fff1f2' : '#eff6ff',
                      color: lead.status === 'Converted' ? '#9333ea' : lead.status === 'Lost' ? '#e11d48' : '#2563eb',
                    }}>{lead.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}