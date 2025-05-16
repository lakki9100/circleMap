const CardWrapper = ({ children }) => (
  <div style={{
    border: '1px solid #ccc',
    borderRadius: '8px',
    padding: '10px',
    marginBottom: '10px',
    backgroundColor: 'white',
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
  }}>
    {children}
  </div>
);
export default CardWrapper;