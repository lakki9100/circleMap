// 📄 src/utils/mapUtils.js
import mapboxgl from 'mapbox-gl';
import * as turf from '@turf/turf';

export function drawRadiusRing(map, center, radiusKm) {
  const circle = turf.circle(center, radiusKm, { steps: 64, units: 'kilometers' });

  if (map.getSource('radius-circle')) {
    map.removeLayer('radius-layer');
    map.removeSource('radius-circle');
  }

  map.addSource('radius-circle', { type: 'geojson', data: circle });
  map.addLayer({
    id: 'radius-layer',
    type: 'fill',
    source: 'radius-circle',
    paint: { 'fill-color': '#007cbf', 'fill-opacity': 0.2 },
  });
}

export function addUserMarker(map, coords) {
  return new mapboxgl.Marker().setLngLat(coords).addTo(map);
}
