import React, { useState } from 'react';

const TimeframeSelection = ({ onTimeframeChange }) => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const handleStartDateChange = (event) => {
    setStartDate(new Date(event.target.value));
  };

  const handleEndDateChange = (event) => {
    setEndDate(new Date(event.target.value));
  };

  const handleTimeframeSubmit = () => {
    onTimeframeChange(startDate, endDate); // Pass selected timeframe
    console.log('DateFiltered');
  };

  return (
    <div>
      <label htmlFor="startDate">Start Date:</label>
      <input type="date" id="startDate" onChange={handleStartDateChange} /><br />
      <label htmlFor="endDate">End Date:</label>
      <input type="date" id="endDate" onChange={handleEndDateChange} />
      <button onClick={handleTimeframeSubmit}>Apply Timeframe</button>
    </div>
  );
};

export default TimeframeSelection;
