const CategorySelector = ({ value, onChange }) => (
  <div>
    <label>Category:</label>
    <select value={value} onChange={(e) => onChange(e.target.value)}>
      <option value="">Select Category</option>
      <option value="vacation">Vacation Places</option>
      <option value="food">Food</option>
    </select>
  </div>
);
export default CategorySelector;
