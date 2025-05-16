const SelectInput = ({ label, value, options, onChange }) => (
  <div style={{ marginBottom: '1rem' }}>
    <label style={{ display: 'block', fontWeight: 'bold' }}>{label}</label>
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      style={{ width: '100%', padding: '0.5rem', borderRadius: '4px' }}
    >
      {options.map(opt => (
        <option key={opt.value} value={opt.value}>{opt.label}</option>
      ))}
    </select>
  </div>
);
export default SelectInput;