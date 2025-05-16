// 📄 src/components/Map/MapContainer.jsx (updated to support HoverLine)
import { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import * as turf from '@turf/turf';
import axios from 'axios';
import { MAPBOX_TOKEN } from '../../config';
import { getUserGeolocation } from '../../services/geolocationService';
import HoverLine from './HoverLine';

mapboxgl.accessToken = MAPBOX_TOKEN;

const MapContainer = ({
  radiusMiles,
  setUserLocation,
  setFoodGroups,
  setVacationGroups,
  userLocation,
  hoveredPlace
}) => {
  const mapContainer = useRef(null);
  const mapRef = useRef(null);
  const markerRef = useRef(null);
  const [mapInitialized, setMapInitialized] = useState(false);

  useEffect(() => {
    if (mapRef.current) return;

    mapRef.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [-96.9489, 32.8140],
      zoom: 10,
    });

    setMapInitialized(true);
  }, []);

  useEffect(() => {
    if (!mapInitialized) return;

    getUserGeolocation()
      .then(({ lat, lng }) => {
        setUserLocation({ lat, lng });
        handleMapClick({
          lngLat: {
            lng,
            lat,
            toArray: () => [lng, lat]
          }
        });
        mapRef.current.flyTo({ center: [lng, lat], zoom: 11 });
      })
      .catch((err) => {
        console.warn('Geolocation error:', err.message);
      });
  }, [mapInitialized]);

  useEffect(() => {
    if (!mapRef.current) return;
    mapRef.current.on('click', handleMapClick);
    return () => mapRef.current.off('click', handleMapClick);
  }, [radiusMiles]);

  const handleMapClick = async ({ lngLat }) => {
    const { lng, lat } = lngLat;
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
      paint: { 'fill-color': '#007cbf', 'fill-opacity': 0.2 },
    });

    const radius = Math.round(radiusKm * 1000);

    try {
      const foodRes = await axios.get('http://localhost:8000/restaurants', { params: { lat, lng, radius } });
      setFoodGroups(foodRes.data);
    } catch (err) {
      console.error('Restaurants error:', err);
    }

    try {
      const vacRes = await axios.get('http://localhost:8000/vacation_spots', { params: { lat, lng, radius } });
      setVacationGroups(vacRes.data);
    } catch (err) {
      console.error('Vacation error:', err);
    }
  };

  return (
    <>
      <div ref={mapContainer} className="map-container" />
      <HoverLine map={mapRef.current} userLocation={userLocation} hoveredPlace={hoveredPlace} />
    </>
  );
};

export default MapContainer;