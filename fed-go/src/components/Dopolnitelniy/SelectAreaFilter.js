import React, { useState } from 'react';

const SelectAreaFilter = ({ onAreaChange }) => {
  const [selectedArea, setSelectedArea] = useState(null);

  const handleAreaSelect = (e) => {
    setSelectedArea(e.target.value);
    onAreaChange(e.target.value); // Pass selected area to parent component
  };

  return (
    <div>
      <label htmlFor="area">Select Area:</label>
      <select id="area" value={selectedArea} onChange={handleAreaSelect}>
        <option value="all">All Areas</option>
        <option value="area1">Los Angeles</option>
        <option value="area2">Baltimore</option>
        <option value="area1">Philadelphia</option>
        <option value="area2">Portland</option>
        {/* Add more options for different areas */}
      </select>
    </div>
  );
};

export default SelectAreaFilter;
