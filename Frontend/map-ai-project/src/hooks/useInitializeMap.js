// 📄 src/hooks/useInitializeMap.js
import { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import { MAPBOX_TOKEN } from '../config';

mapboxgl.accessToken = MAPBOX_TOKEN;

export function useInitializeMap(containerRef) {
  const mapRef = useRef(null);
  const [mapInitialized, setMapInitialized] = useState(false);

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    mapRef.current = new mapboxgl.Map({
      container: containerRef.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [-96.9489, 32.8140],
      zoom: 10,
    });

    setMapInitialized(true);
  }, [containerRef]);

  return { mapRef, mapInitialized };
}
