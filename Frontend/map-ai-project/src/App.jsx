import { useState } from 'react';
import MapView from './components/Map/MapView';
import Sidebar from './components/Sidebar/Sidebar';
import './App.css';
import 'mapbox-gl/dist/mapbox-gl.css';


function App() {
  const [radiusMiles, setRadiusMiles] = useState(10);
  const [activeGroup, setActiveGroup] = useState('');
  const [userLocation, setUserLocation] = useState(null);
  const [foodGroups, setFoodGroups] = useState({});
  const [vacationGroups, setVacationGroups] = useState({});

  return (
    <div className="layout">
      <Sidebar
        radiusMiles={radiusMiles}
        setRadiusMiles={setRadiusMiles}
        activeGroup={activeGroup}
        setActiveGroup={setActiveGroup}
        foodGroups={foodGroups}
        vacationGroups={vacationGroups}
        userLocation={userLocation}
      />
      <MapView
        radiusMiles={radiusMiles}
        setUserLocation={setUserLocation}
        setFoodGroups={setFoodGroups}
        setVacationGroups={setVacationGroups}
      />
    </div>
  );
}

export default App;