import { useState, useEffect } from 'react';
import { X } from 'lucide-react';

const STATUSES = ['New', 'Contacted', 'Qualified', 'Converted', 'Lost'];
const SOURCES = ['Website', 'Referral', 'Social Media', 'Cold Outreach', 'Other'];

const inputStyle = {
  width: '100%', padding: '9px 12px', borderRadius: '8px',
  border: '1px solid #e2e8f0', fontSize: '14px', outline: 'none',
  fontFamily: 'Inter, sans-serif', color: '#1e293b',
  transition: 'border-color 0.2s',
};

const labelStyle = {
  fontSize: '12px', fontWeight: 600, color: '#64748b',
  marginBottom: '5px', display: 'block', textTransform: 'uppercase', letterSpacing: '0.5px',
};

export default function LeadModal({ lead, onClose, onSave }) {
  const [form, setForm] = useState({
    name: '', email: '', phone: '', company: '', source: 'Other', status: 'New',
  });

  useEffect(() => {
    if (lead) setForm({
      name: lead.name || '',
      email: lead.email || '',
      phone: lead.phone || '',
      company: lead.company || '',
      source: lead.source || 'Other',
      status: lead.status || 'New',
    });
  }, [lead]);

  const handleSubmit = () => {
    if (!form.name || !form.email) return;
    onSave(form);
  };

  return (
    <div style={{
      position: 'fixed', inset: 0, background: 'rgba(15,23,42,0.5)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      zIndex: 1000, padding: '16px',
    }}>
      <div style={{
        background: 'white', borderRadius: '16px', padding: '28px',
        width: '100%', maxWidth: '480px', boxShadow: '0 20px 60px rgba(0,0,0,0.15)',
      }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <h2 style={{ fontWeight: 700, fontSize: '18px', color: '#1e293b' }}>
            {lead ? 'Edit Lead' : 'Add New Lead'}
          </h2>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8' }}>
            <X size={20} />
          </button>
        </div>

        {/* Form */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div>
              <label style={labelStyle}>Name *</label>
              <input
                style={inputStyle}
                placeholder="Full name"
                value={form.name}
                onChange={e => setForm({ ...form, name: e.target.value })}
              />
            </div>
            <div>
              <label style={labelStyle}>Company</label>
              <input
                style={inputStyle}
                placeholder="Company name"
                value={form.company}
                onChange={e => setForm({ ...form, company: e.target.value })}
              />
            </div>
          </div>

          <div>
            <label style={labelStyle}>Email *</label>
            <input
              style={inputStyle}
              type="email"
              placeholder="email@example.com"
              value={form.email}
              onChange={e => setForm({ ...form, email: e.target.value })}
            />
          </div>

          <div>
            <label style={labelStyle}>Phone</label>
            <input
              style={inputStyle}
              placeholder="+91 98765 43210"
              value={form.phone}
              onChange={e => setForm({ ...form, phone: e.target.value })}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div>
              <label style={labelStyle}>Source</label>
              <select
                style={{ ...inputStyle, background: 'white' }}
                value={form.source}
                onChange={e => setForm({ ...form, source: e.target.value })}
              >
                {SOURCES.map(s => <option key={s}>{s}</option>)}
              </select>
            </div>
            <div>
              <label style={labelStyle}>Status</label>
              <select
                style={{ ...inputStyle, background: 'white' }}
                value={form.status}
                onChange={e => setForm({ ...form, status: e.target.value })}
              >
                {STATUSES.map(s => <option key={s}>{s}</option>)}
              </select>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div style={{ display: 'flex', gap: '10px', marginTop: '24px' }}>
          <button
            onClick={onClose}
            style={{
              flex: 1, padding: '10px', borderRadius: '8px', border: '1px solid #e2e8f0',
              background: 'white', cursor: 'pointer', fontSize: '14px',
              color: '#64748b', fontWeight: 500,
            }}
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            style={{
              flex: 2, padding: '10px', borderRadius: '8px', border: 'none',
              background: 'linear-gradient(135deg, #2563eb, #7c3aed)',
              cursor: 'pointer', fontSize: '14px', color: 'white', fontWeight: 600,
            }}
          >
            {lead ? 'Save Changes' : 'Add Lead'}
          </button>
        </div>
      </div>
    </div>
  );
}