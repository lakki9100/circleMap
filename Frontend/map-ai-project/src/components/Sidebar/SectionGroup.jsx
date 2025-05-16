import ResultCard from './ResultCard';

const SectionGroup = ({ title, items, onHover }) => (
  <div style={{ marginBottom: '1.5rem' }}>
    <h3>{title.toUpperCase()}</h3>
    {items.map(place => (
      <ResultCard key={place.place_id} place={place} onHover={onHover} />
    ))}
  </div>
);

export default SectionGroup;
