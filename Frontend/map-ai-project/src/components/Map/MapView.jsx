import { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import * as turf from '@turf/turf';
import axios from 'axios';
import { MAPBOX_TOKEN } from '../../config';

mapboxgl.accessToken = MAPBOX_TOKEN;

const MapView = ({ radiusMiles, setUserLocation, setFoodGroups, setVacationGroups }) => {
  const mapContainer = useRef(null);
  const mapRef = useRef(null);
  const markerRef = useRef(null);

  useEffect(() => {
    if (mapRef.current) return;

    mapRef.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [-96.9489, 32.8140],
      zoom: 10,
    });

    mapRef.current.on('click', async (e) => {
      const { lng, lat } = e.lngLat;
      setUserLocation({ lat, lng });

      if (markerRef.current) markerRef.current.remove();
      markerRef.current = new mapboxgl.Marker().setLngLat([lng, lat]).addTo(mapRef.current);

      const radiusKm = radiusMiles * 1.60934;
      const circle = turf.circle([lng, lat], radiusKm, { steps: 64, units: 'kilometers' });

      if (mapRef.current.getSource('radius-circle')) {
        mapRef.current.removeLayer('radius-layer');
        mapRef.current.removeSource('radius-circle');
      }

      mapRef.current.addSource('radius-circle', { type: 'geojson', data: circle });
      mapRef.current.addLayer({
        id: 'radius-layer',
        type: 'fill',
        source: 'radius-circle',
        paint: {
          'fill-color': '#007cbf',
          'fill-opacity': 0.2,
        },
      });

      const radius = Math.round(radiusKm * 1000);

      try {
        const foodRes = await axios.get('http://localhost:8000/restaurants', {
          params: { lat, lng, radius },
        });
        setFoodGroups(foodRes.data);
      } catch (err) {
        console.error('Error fetching restaurants:', err);
      }

      try {
        const vacRes = await axios.get('http://localhost:8000/vacation_spots', {
          params: { lat, lng, radius },
        });
        setVacationGroups(vacRes.data);
      } catch (err) {
        console.error('Error fetching vacation spots:', err);
      }
    });
  }, [radiusMiles]);

  return <div ref={mapContainer} className="map-container" />;
};

export default MapView;
