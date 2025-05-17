import { useEffect, useState } from 'react';
import './App.css';
import MapContainer from './components/Map/MapContainer';
import Sidebar from './components/Sidebar/Sidebar';
import ChatModal from './ui/ChatModal';

function App() {
  const [radiusMiles, setRadiusMiles] = useState(10);
  const [activeGroup, setActiveGroup] = useState('vacation');
  const [userLocation, setUserLocation] = useState(null);
  const [hoveredPlace, setHoveredPlace] = useState(null);
  const [isGeolocation, setIsGeolocation] = useState(false);

  const [foodGroups, setFoodGroups] = useState({});
  const [vacationGroups, setVacationGroups] = useState({});

  const [chatPlace, setChatPlace] = useState(null);
  const [chatMessages, setChatMessages] = useState([]);

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
          onItemClick={(place) => {
            setChatPlace(place.name);
            setChatMessages([]);
          }}
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

      {chatPlace && (
        <ChatModal
          placeName={chatPlace}
          messages={chatMessages}
          onClose={() => setChatPlace(null)}
          onSendMessage={(msg) => {
            setChatMessages((prev) => [...prev, { text: msg, from: 'user' }]);
          }}
        />
      )}
    </>
  );
}

export default App;
