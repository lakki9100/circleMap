import { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import * as turf from '@turf/turf';
import { MAPBOX_TOKEN } from '../config';

mapboxgl.accessToken = MAPBOX_TOKEN;

function MapView() {
  const mapContainer = useRef(null);
  const mapRef = useRef(null);
  const markerRef = useRef(null);
  const [radiusMiles, setRadiusMiles] = useState(10);

  useEffect(() => {
    if (mapRef.current) return;

    mapRef.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [-96.9489, 32.8140],
      zoom: 10,
    });

    mapRef.current.on('click', (e) => {
      const { lng, lat } = e.lngLat;

      if (markerRef.current) {
        markerRef.current.remove();
      }

      markerRef.current = new mapboxgl.Marker().setLngLat([lng, lat]).addTo(mapRef.current);

      const radiusKm = radiusMiles * 1.60934;
      const circle = turf.circle([lng, lat], radiusKm, {
        steps: 64,
        units: 'kilometers',
      });

      if (mapRef.current.getSource('radius-circle')) {
        mapRef.current.removeLayer('radius-layer');
        mapRef.current.removeSource('radius-circle');
      }

      mapRef.current.addSource('radius-circle', {
        type: 'geojson',
        data: circle,
      });

      mapRef.current.addLayer({
        id: 'radius-layer',
        type: 'fill',
        source: 'radius-circle',
        paint: {
          'fill-color': '#007cbf',
          'fill-opacity': 0.2,
        },
      });
    });
  }, [radiusMiles]);

  return (
    <>
      <div className="absolute top-0 left-0 z-10 bg-black text-white h-12 w-full flex items-center gap-4 px-4">
        <label htmlFor="radius-select">Radius:</label>
        <select
          id="radius-select"
          className="text-black px-2 py-1 rounded"
          value={radiusMiles}
          onChange={(e) => setRadiusMiles(Number(e.target.value))}
        >
          <option value={5}>5 miles</option>
          <option value={10}>10 miles</option>
          <option value={15}>15 miles</option>
          <option value={20}>20 miles</option>
        </select>
      </div>
      <div ref={mapContainer} className="w-full h-full absolute top-12" />
    </>
  );
}

export default MapView;
