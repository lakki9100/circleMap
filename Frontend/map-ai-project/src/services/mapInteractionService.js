// 📄 src/services/mapInteractionService.js
import axios from 'axios';
import * as turf from '@turf/turf';
import { drawRadiusRing, addUserMarker } from '../utils/mapUtils';

export async function handleMapClick({
  lng,
  lat,
  isGeo,
  mapRef,
  markerRef,
  radiusMiles,
  setUserLocation,
  setIsGeolocation,
  setFoodGroups,
  setVacationGroups,
}) {
  setUserLocation({ lat, lng });
  if (!isGeo) setIsGeolocation(false);

  if (markerRef.current) markerRef.current.remove();
  markerRef.current = addUserMarker(mapRef.current, [lng, lat]);

  const radiusKm = radiusMiles * 1.60934;
  drawRadiusRing(mapRef.current, [lng, lat], radiusKm);

  const radius = Math.round(radiusKm * 1000);
  const originParams = isGeo ? { origin_lat: lat, origin_lng: lng } : {};

  try {
    const foodRes = await axios.get('http://localhost:8000/restaurants', {
      params: { lat, lng, radius, ...originParams },
    });
    setFoodGroups(foodRes.data);
  } catch (err) {
    console.error('Restaurants error:', err);
  }

  try {
    const vacRes = await axios.get('http://localhost:8000/vacation_spots', {
      params: { lat, lng, radius, ...originParams },
    });
    setVacationGroups(vacRes.data);
  } catch (err) {
    console.error('Vacation error:', err);
  }
}
