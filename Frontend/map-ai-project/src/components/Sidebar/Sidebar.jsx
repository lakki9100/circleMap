import RadiusSelector from './RadiusSelector';
import CategorySelector from './CategorySelector';
import PlaceGroupList from './PlaceGroupList';

const Sidebar = ({
  radiusMiles,
  setRadiusMiles,
  activeGroup,
  setActiveGroup,
  foodGroups,
  vacationGroups,
}) => (
  <div className="sidebar">
    <h2>Explore</h2>
    <RadiusSelector value={radiusMiles} onChange={setRadiusMiles} />
    <CategorySelector value={activeGroup} onChange={setActiveGroup} />
    <div style={{ marginTop: '1rem' }}>
      {activeGroup === 'vacation' && <PlaceGroupList groups={vacationGroups} />}
      {activeGroup === 'food' && <PlaceGroupList groups={foodGroups} />}
    </div>
  </div>
);

export default Sidebar;
