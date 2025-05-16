import ResultCard from './ResultCard';

const SectionGroup = ({ title, items }) => (
  <div className="section-group" style={{ marginBottom: '2rem' }}>
    <h3>{title.toUpperCase()}</h3>
    {items.map((place) => (
      <ResultCard key={place.place_id} place={place} />
    ))}
  </div>
);
export default SectionGroup;
