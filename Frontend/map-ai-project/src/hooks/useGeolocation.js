// 📄 src/hooks/useGeolocation.js
import { useEffect } from 'react';
import { getUserGeolocation } from '../services/geolocationService';

export function useGeolocation({ setUserLocation, setIsGeolocation, mapRef, onLocated }) {
  useEffect(() => {
    getUserGeolocation()
      .then(({ lat, lng }) => {
        setUserLocation({ lat, lng });
        setIsGeolocation(true);
        mapRef.current.flyTo({ center: [lng, lat], zoom: 11 });
        onLocated({ lat, lng });
      })
      .catch((err) => {
        console.warn('Geolocation error:', err.message);
      });
  }, []);
}
