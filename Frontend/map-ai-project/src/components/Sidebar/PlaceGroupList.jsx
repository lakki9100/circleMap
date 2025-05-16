const PlaceGroupList = ({ groups }) => (
  <>
    {Object.entries(groups).map(([category, items]) => (
      <div key={category}>
        <strong>{category.toUpperCase()}</strong>
        <ul>
          {items.map(place => (
            <li key={place.place_id} style={{ padding: '5px 0', borderBottom: '1px solid #ccc' }}>
              <div>{place.name}</div>
              <div style={{ fontSize: '12px', color: '#666' }}>{place.vicinity}</div>
              <div style={{ fontSize: '12px' }}>⭐ {place.rating || 'N/A'}</div>
            </li>
          ))}
        </ul>
      </div>
    ))}
  </>
);

export default PlaceGroupList;