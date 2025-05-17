import { useEffect } from 'react';
import mapboxgl from 'mapbox-gl';

const HoverLine = ({ map, userLocation, hoveredPlace }) => {
  useEffect(() => {
    if (!map || !userLocation || !hoveredPlace) return;

    const lineId = 'hover-line';
    const labelId = 'hover-line-label';

    // Cleanup
    if (map.getSource(lineId)) {
      map.removeLayer(lineId);
      map.removeSource(lineId);
    }
    if (map.getSource(labelId)) {
      map.removeLayer(labelId);
      map.removeSource(labelId);
    }

    // Line
    const lineGeoJSON = {
      type: 'Feature',
      geometry: {
        type: 'LineString',
        coordinates: [
          [userLocation.lng, userLocation.lat],
          [hoveredPlace.lng, hoveredPlace.lat],
        ],
      },
    };
    map.addSource(lineId, { type: 'geojson', data: lineGeoJSON });
    map.addLayer({
      id: lineId,
      type: 'line',
      source: lineId,
      layout: {},
      paint: { 'line-color': '#ff5050', 'line-width': 2 },
    });

    // Label
    const midLng = (userLocation.lng + hoveredPlace.lng) / 2;
    const midLat = (userLocation.lat + hoveredPlace.lat) / 2;
    const labelGeoJSON = {
      type: 'FeatureCollection',
      features: [
        {
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: [midLng, midLat],
          },
          properties: {
            label: hoveredPlace.distance ? `${hoveredPlace.distance} mi` : '',
          },
        },
      ],
    };

    map.addSource(labelId, { type: 'geojson', data: labelGeoJSON });
    map.addLayer({
      id: labelId,
      type: 'symbol',
      source: labelId,
      layout: {
        'text-field': ['get', 'label'],
        'text-font': ['Open Sans Bold'],
        'text-size': 12,
        'text-offset': [0, 1],
        'text-anchor': 'top',
      },
      paint: {
        'text-color': '#000',
        'text-halo-color': '#fff',
        'text-halo-width': 1,
      },
    });

    const destMarker = new mapboxgl.Marker({ color: '#444' })
      .setLngLat([hoveredPlace.lng, hoveredPlace.lat])
      .addTo(map);

    return () => {
      map.removeLayer(lineId);
      map.removeSource(lineId);
      map.removeLayer(labelId);
      map.removeSource(labelId);
      destMarker.remove();
    };
  }, [map, userLocation, hoveredPlace]);

  return null;
};

export default HoverLine;
