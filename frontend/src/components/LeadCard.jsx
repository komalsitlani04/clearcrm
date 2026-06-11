import { Pencil, Trash2, Building2, Mail, Phone } from 'lucide-react';

const STATUS_COLORS = {
  New: { bg: '#eff6ff', text: '#2563eb', dot: '#2563eb' },
  Contacted: { bg: '#fefce8', text: '#ca8a04', dot: '#ca8a04' },
  Qualified: { bg: '#f0fdf4', text: '#16a34a', dot: '#16a34a' },
  Converted: { bg: '#fdf4ff', text: '#9333ea', dot: '#9333ea' },
  Lost: { bg: '#fff1f2', text: '#e11d48', dot: '#e11d48' },
};

export default function LeadCard({ lead, onEdit, onDelete }) {
  const sc = STATUS_COLORS[lead.status] || STATUS_COLORS.New;

  return (
    <div style={{
      background: 'white',
      borderRadius: '12px',
      padding: '20px',
      border: '1px solid #e2e8f0',
      boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
      transition: 'box-shadow 0.2s, transform 0.2s',
    }}
      onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.08)'; e.currentTarget.style.transform = 'translateY(-1px)'; }}
      onMouseLeave={e => { e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.04)'; e.currentTarget.style.transform = 'none'; }}
    >
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{
            width: '38px', height: '38px', borderRadius: '10px',
            background: 'linear-gradient(135deg, #2563eb22, #7c3aed22)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontWeight: 700, fontSize: '15px', color: '#2563eb',
          }}>
            {lead.name.charAt(0).toUpperCase()}
          </div>
          <div>
            <p style={{ fontWeight: 600, fontSize: '14px', color: '#1e293b' }}>{lead.name}</p>
            {lead.company && (
              <p style={{ fontSize: '12px', color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '3px' }}>
                <Building2 size={11} /> {lead.company}
              </p>
            )}
          </div>
        </div>
        <span style={{
          padding: '3px 10px', borderRadius: '20px', fontSize: '11px', fontWeight: 600,
          background: sc.bg, color: sc.text, display: 'flex', alignItems: 'center', gap: '4px',
        }}>
          <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: sc.dot, display: 'inline-block' }} />
          {lead.status}
        </span>
      </div>

      {/* Contact info */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', marginBottom: '14px' }}>
        <p style={{ fontSize: '12px', color: '#64748b', display: 'flex', alignItems: 'center', gap: '6px' }}>
          <Mail size={12} color="#94a3b8" /> {lead.email}
        </p>
        {lead.phone && (
          <p style={{ fontSize: '12px', color: '#64748b', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Phone size={12} color="#94a3b8" /> {lead.phone}
          </p>
        )}
      </div>

      {/* Source badge */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{
          fontSize: '11px', padding: '2px 8px', borderRadius: '6px',
          background: '#f8fafc', color: '#64748b', border: '1px solid #e2e8f0', fontWeight: 500,
        }}>
          {lead.source}
        </span>
        <div style={{ display: 'flex', gap: '6px' }}>
          <button
            onClick={() => onEdit(lead)}
            style={{
              padding: '5px 10px', borderRadius: '7px', border: '1px solid #e2e8f0',
              background: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center',
              gap: '4px', fontSize: '12px', color: '#64748b', fontWeight: 500,
            }}
          >
            <Pencil size={12} /> Edit
          </button>
          <button
            onClick={() => onDelete(lead._id)}
            style={{
              padding: '5px 10px', borderRadius: '7px', border: '1px solid #fecdd3',
              background: '#fff1f2', cursor: 'pointer', display: 'flex', alignItems: 'center',
              gap: '4px', fontSize: '12px', color: '#e11d48', fontWeight: 500,
            }}
          >
            <Trash2 size={12} /> Delete
          </button>
        </div>
      </div>
    </div>
  );
}