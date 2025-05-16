const RadiusSelector = ({ value, onChange }) => (
  <div>
    <label>Radius:</label>
    <select value={value} onChange={(e) => onChange(Number(e.target.value))}>
      {[5, 10, 15, 20].map(miles => (
        <option key={miles} value={miles}>{miles} miles</option>
      ))}
    </select>
  </div>
);

export default RadiusSelector;
