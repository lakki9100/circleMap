const ResultCard = ({ place }) => (
  <div className="result-card" style={{
    border: '1px solid #ccc',
    borderRadius: '8px',
    padding: '10px',
    marginBottom: '10px',
    backgroundColor: 'white',
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
  }}>
    <div><strong>{place.name}</strong></div>
    <div style={{ fontSize: '12px', color: '#666' }}>{place.vicinity}</div>
    <div style={{ fontSize: '12px' }}>⭐ {place.rating || 'N/A'}</div>
  </div>
);
export default ResultCard;