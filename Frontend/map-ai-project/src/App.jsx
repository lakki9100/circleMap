import { useState } from 'react';
import './App.css';
import MapContainer from './components/Map/MapContainer';
import Sidebar from './components/Sidebar/Sidebar';
import ChatModal from './components/Chat/ChatModal'; 

function App() {
  const [radiusMiles, setRadiusMiles] = useState(10);
  const [activeGroup, setActiveGroup] = useState('vacation');
  const [userLocation, setUserLocation] = useState(null);
  const [hoveredPlace, setHoveredPlace] = useState(null);
  const [isGeolocation, setIsGeolocation] = useState(false);

  const [foodGroups, setFoodGroups] = useState({});
  const [vacationGroups, setVacationGroups] = useState({});

  const [selectedPlace, setSelectedPlace] = useState(null); // ✅ Replaces chatPlace/messages

  return (
    <>
      <div className="layout">
        <Sidebar
          radiusMiles={radiusMiles}
          setRadiusMiles={setRadiusMiles}
          activeGroup={activeGroup}
          setActiveGroup={setActiveGroup}
          foodGroups={foodGroups}
          vacationGroups={vacationGroups}
          onHover={setHoveredPlace}
          onItemClick={(place) => setSelectedPlace(place)} // ✅ Open chat
        />

        <MapContainer
          radiusMiles={radiusMiles}
          userLocation={userLocation}
          setUserLocation={setUserLocation}
          setFoodGroups={setFoodGroups}
          setVacationGroups={setVacationGroups}
          hoveredPlace={hoveredPlace}
          setIsGeolocation={setIsGeolocation}
        />
      </div>

      {selectedPlace && (
        <ChatModal
          placeName={selectedPlace.name}
          onClose={() => setSelectedPlace(null)}
        />
      )}
    </>
  );
}

export default App;
