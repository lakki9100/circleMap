import ResultCard from './ResultCard';

const SectionGroup = ({ title, items, onHover, onItemClick }) => {
  return (
      <div className="section-group" style={{ marginBottom: '16px' }}>
        <h3 style={{ fontSize: '16px', marginBottom: '8px' }}>{title.toUpperCase()}</h3>

        {items.map((place) => (
          <div
            key={place.place_id}
            onMouseEnter={() =>
              onHover({
                lat: place.geometry?.location?.lat,
                lng: place.geometry?.location?.lng,
                distance: place.distance_miles,
              })
            }
            onMouseLeave={() => onHover(null)}
            onClick={() => onItemClick(place)} // ✅ Added this line

            style={{
              cursor: 'pointer',
              marginBottom: '8px',
              borderRadius: '6px',
              padding: '4px',
              transition: 'background 0.2s ease-in-out',
            }}
            onMouseOver={(e) => (e.currentTarget.style.background = '#f1f1f1')}
            onMouseOut={(e) => (e.currentTarget.style.background = 'transparent')}
          >
            <ResultCard place={place} />
          </div>
        ))}
      </div>
  );
};

export default SectionGroup;
