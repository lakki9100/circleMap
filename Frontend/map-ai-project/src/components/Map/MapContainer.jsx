// 📄 src/components/Map/MapContainer.jsx
import { useRef, useEffect } from 'react';
import { useInitializeMap } from '../../hooks/useInitializeMap';
import { useGeolocation } from '../../hooks/useGeolocation';
import { handleMapClick } from '../../services/mapInteractionService';
import HoverLine from './HoverLine';

const MapContainer = ({
  radiusMiles,
  setUserLocation,
  setFoodGroups,
  setVacationGroups,
  userLocation,
  hoveredPlace,
  setIsGeolocation = () => {},
}) => {
  const containerRef = useRef(null);
  const markerRef = useRef(null);
  const { mapRef, mapInitialized } = useInitializeMap(containerRef);

  useGeolocation({
    setUserLocation,
    setIsGeolocation,
    mapRef,
    onLocated: ({ lat, lng }) =>
      handleMapClick({
        lng,
        lat,
        isGeo: true,
        mapRef,
        markerRef,
        radiusMiles,
        setUserLocation,
        setIsGeolocation,
        setFoodGroups,
        setVacationGroups,
      }),
  });

  useEffect(() => {
    if (!mapInitialized) return;
    const handler = (e) =>
      handleMapClick({
        lng: e.lngLat.lng,
        lat: e.lngLat.lat,
        isGeo: false,
        mapRef,
        markerRef,
        radiusMiles,
        setUserLocation,
        setIsGeolocation,
        setFoodGroups,
        setVacationGroups,
      });

    mapRef.current.on('click', handler);
    return () => mapRef.current.off('click', handler);
  }, [mapInitialized, radiusMiles]);

  return (
    <>
      <div ref={containerRef} className="map-container" />
      <HoverLine map={mapRef.current} userLocation={userLocation} hoveredPlace={hoveredPlace} />
    </>
  );
};

export default MapContainer;
