import { useEffect } from 'react';

const HoverLine = ({ map, userLocation, hoveredPlace }) => {
  useEffect(() => {
    if (!map || !userLocation || !hoveredPlace) return;

    const lineId = 'hover-line';

    // Remove previous line if it exists
    if (map.getSource(lineId)) {
      map.removeLayer(lineId);
      map.removeSource(lineId);
    }

    const line = {
      type: 'Feature',
      geometry: {
        type: 'LineString',
        coordinates: [
          [userLocation.lng, userLocation.lat],
          [hoveredPlace.lng, hoveredPlace.lat],
        ],
      },
    };

    map.addSource(lineId, {
      type: 'geojson',
      data: line,
    });

    map.addLayer({
      id: lineId,
      type: 'line',
      source: lineId,
      layout: {
        'line-cap': 'round',
        'line-join': 'round',
      },
      paint: {
        'line-color': '#ff0000',
        'line-width': 2,
        'line-opacity': 0.7,
      },
    });

    return () => {
      if (map.getSource(lineId)) {
        map.removeLayer(lineId);
        map.removeSource(lineId);
      }
    };
  }, [map, userLocation, hoveredPlace]);

  return null;
};

export default HoverLine;
