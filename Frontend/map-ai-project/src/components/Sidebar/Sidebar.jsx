import RadiusSelector from './RadiusSelector';
import CategorySelector from './CategorySelector';
import SectionGroup from './SectionGroup';

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
      {activeGroup === 'vacation' &&
        Object.entries(vacationGroups).map(([title, items]) => (
          <SectionGroup key={title} title={title} items={items} />
        ))}
      {activeGroup === 'food' &&
        Object.entries(foodGroups).map(([title, items]) => (
          <SectionGroup key={title} title={title} items={items} />
        ))}
    </div>
  </div>
);

export default Sidebar;