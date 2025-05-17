import SelectInput from '../../ui/SelectInput';
import ScrollPanel from '../../ui/ScrollPanel';
import SectionWrapper from '../../ui/SectionWrapper';
import SectionGroup from './SectionGroup';

const Sidebar = ({
  radiusMiles,
  setRadiusMiles,
  activeGroup,
  setActiveGroup,
  foodGroups,
  vacationGroups,
  onHover,
  onItemClick, // 🔥 new prop
}) => (
  <ScrollPanel>
    <h2>Explore</h2>
    <SelectInput
      label="Radius"
      value={radiusMiles}
      onChange={(val) => setRadiusMiles(Number(val))}
      options={[5, 10, 15, 20].map((m) => ({ label: `${m} miles`, value: m }))}
    />
    <SelectInput
      label="Category"
      value={activeGroup}
      onChange={setActiveGroup}
      options={[
        { label: 'Vacation Places', value: 'vacation' },
        { label: 'Food', value: 'food' },
      ]}
    />
    <SectionWrapper>
      {activeGroup === 'vacation' &&
        Object.entries(vacationGroups).map(([title, items]) => (
          <SectionGroup
            key={title}
            title={title}
            items={items}
            onHover={onHover}
            onItemClick={onItemClick}
          />
        ))}
      {activeGroup === 'food' &&
        Object.entries(foodGroups).map(([title, items]) => (
          <SectionGroup
            key={title}
            title={title}
            items={items}
            onHover={onHover}
            onItemClick={onItemClick}
          />
        ))}
    </SectionWrapper>
  </ScrollPanel>
);

export default Sidebar;
