import { useEffect, useState } from 'react';
import api from '../api/axios';
import LeadCard from '../components/LeadCard';
import LeadModal from '../components/LeadModal';
import toast from 'react-hot-toast';
import { Plus, Search, Filter } from 'lucide-react';

const STATUSES = ['All', 'New', 'Contacted', 'Qualified', 'Converted', 'Lost'];

export default function Leads() {
  const [leads, setLeads] = useState([]);
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('All');
  const [showModal, setShowModal] = useState(false);
  const [editLead, setEditLead] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchLeads = async () => {
    try {
      const params = {};
      if (search) params.search = search;
      if (status !== 'All') params.status = status;
      const { data } = await api.get('/leads', { params });
      setLeads(data);
    } catch {
      toast.error('Failed to fetch leads');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchLeads(); }, [search, status]);

  const handleSave = async (form) => {
    try {
      if (editLead) {
        await api.put(`/leads/${editLead._id}`, form);
        toast.success('Lead updated');
      } else {
        await api.post('/leads', form);
        toast.success('Lead added');
      }
      setShowModal(false);
      setEditLead(null);
      fetchLeads();
    } catch {
      toast.error('Failed to save lead');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this lead?')) return;
    try {
      await api.delete(`/leads/${id}`);
      toast.success('Lead deleted');
      fetchLeads();
    } catch {
      toast.error('Failed to delete lead');
    }
  };

  const handleEdit = (lead) => {
    setEditLead(lead);
    setShowModal(true);
  };

  return (
    <div>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div>
          <h1 style={{ fontSize: '24px', fontWeight: 800, color: '#1e293b' }}>Leads</h1>
          <p style={{ color: '#94a3b8', fontSize: '14px', marginTop: '4px' }}>
            {leads.length} lead{leads.length !== 1 ? 's' : ''} found
          </p>
        </div>
        <button
          onClick={() => { setEditLead(null); setShowModal(true); }}
          style={{
            display: 'flex', alignItems: 'center', gap: '7px',
            padding: '10px 18px', borderRadius: '10px', border: 'none',
            background: 'linear-gradient(135deg, #2563eb, #7c3aed)',
            color: 'white', fontWeight: 600, fontSize: '14px',
            cursor: 'pointer', boxShadow: '0 2px 8px rgba(37,99,235,0.3)',
          }}
        >
          <Plus size={16} /> Add Lead
        </button>
      </div>

      {/* Search + Filter bar */}
      <div style={{
        display: 'flex', gap: '12px', marginBottom: '24px',
        flexWrap: 'wrap',
      }}>
        <div style={{ position: 'relative', flex: 1, minWidth: '200px' }}>
          <Search size={15} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
          <input
            placeholder="Search leads by name, email, or company..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{
              width: '100%', padding: '10px 12px 10px 36px',
              borderRadius: '10px', border: '1px solid #e2e8f0',
              fontSize: '14px', outline: 'none', background: 'white',
              fontFamily: 'Inter, sans-serif',
            }}
          />
        </div>
        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
          <Filter size={14} style={{ alignSelf: 'center', color: '#94a3b8' }} />
          {STATUSES.map(s => (
            <button
              key={s}
              onClick={() => setStatus(s)}
              style={{
                padding: '8px 14px', borderRadius: '8px', border: '1px solid',
                borderColor: status === s ? '#2563eb' : '#e2e8f0',
                background: status === s ? '#eff6ff' : 'white',
                color: status === s ? '#2563eb' : '#64748b',
                cursor: 'pointer', fontSize: '13px', fontWeight: 500,
              }}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Lead grid */}
      {loading ? (
        <p style={{ textAlign: 'center', color: '#94a3b8', padding: '40px' }}>Loading leads...</p>
      ) : leads.length === 0 ? (
        <div style={{
          textAlign: 'center', padding: '60px 20px', background: 'white',
          borderRadius: '12px', border: '1px solid #e2e8f0',
        }}>
          <p style={{ fontSize: '40px', marginBottom: '12px' }}>👥</p>
          <p style={{ fontWeight: 600, color: '#1e293b', marginBottom: '6px' }}>No leads found</p>
          <p style={{ color: '#94a3b8', fontSize: '14px' }}>
            {search || status !== 'All' ? 'Try adjusting your filters' : 'Add your first lead to get started'}
          </p>
        </div>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: '16px',
        }}>
          {leads.map(lead => (
            <LeadCard key={lead._id} lead={lead} onEdit={handleEdit} onDelete={handleDelete} />
          ))}
        </div>
      )}

      {showModal && (
        <LeadModal
          lead={editLead}
          onClose={() => { setShowModal(false); setEditLead(null); }}
          onSave={handleSave}
        />
      )}
    </div>
  );
}