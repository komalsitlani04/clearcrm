export default function StatCard({ label, value, color, icon }) {
  return (
    <div style={{
      background: 'white',
      borderRadius: '12px',
      padding: '20px 24px',
      border: '1px solid #e2e8f0',
      boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
      display: 'flex',
      alignItems: 'center',
      gap: '16px',
      transition: 'transform 0.2s',
    }}>
      <div style={{
        width: '48px', height: '48px', borderRadius: '12px',
        background: color + '18',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: '22px',
      }}>
        {icon}
      </div>
      <div>
        <p style={{ fontSize: '13px', color: '#94a3b8', fontWeight: 500, marginBottom: '2px' }}>
          {label}
        </p>
        <p style={{ fontSize: '28px', fontWeight: 700, color: '#1e293b', lineHeight: 1 }}>
          {value}
        </p>
      </div>
    </div>
  );
}