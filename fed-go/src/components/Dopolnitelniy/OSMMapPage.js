import React, { useRef, useState, useEffect, useContext } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { LoginContext } from './context.js';
import AreaSelection from './SelectAreaFilter.js';
import TimeframeSelection from './TimeFrameSelection.js';
import CustomMarker from './CustomMarker.js';
import './MapPage.css';

const OSMMapPage = () => {
    const mapRef = useRef(null);
    const [areaFilter, setAreaFilter] = useState('all');
    const [timeframeFilter, setTimeframeFilter] = useState({ startDate: null, endDate: null });
    const [mapData, setMapData] = useState([]);
  
    const handleAreaChange = (selectedArea) => setAreaFilter(selectedArea);
    const handleTimeframeChange = (startDate, endDate) => setTimeframeFilter({ startDate, endDate });

    const fetchFilteredData = async () => {
      if (!timeframeFilter.startDate || !timeframeFilter.endDate) {
        return;
      }
    
      const response = await fetch(`/data?area=${areaFilter}&startDate=${timeframeFilter.startDate.toISOString()}&endDate=${timeframeFilter.endDate.toISOString()}`);
      const data = await response.json(); // Assuming JSON response
      setMapData(data.filter((dataItem) => {
        // Implement filtering logic based on area and timeframe
        if (areaFilter === 'all') {
          return true; // Include all data if area is 'all'
        }
        // Check if dataItem.area (or relevant field) matches selected area
        return dataItem.area === areaFilter;
      }));
    };
    
  
    useEffect(() => {
      fetchFilteredData();
    }, [areaFilter, timeframeFilter]);

    const { isLoggedIn } = useContext(LoginContext);

    const handleMarkerClick = (dataItem) => {
      // Handle optional marker click event (e.g., show details)
      console.log('Marker clicked:', dataItem);
    };

    return (
    <div className='map-container' width="80%" height="90%">
      <div className='map' style={{height:'480px'}}>
      <h2>Crime Hotspots Prediction</h2>
        <MapContainer center={[55.7558, 37.6173]} zoom={10} style={{ height: '100%', width:"100%"}}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {mapData.map((dataItem) => (
            <CustomMarker key={dataItem.id} data={dataItem} onClick={handleMarkerClick} />
          ))}
        </MapContainer>
      </div>

      <div className='filters'>
        <AreaSelection onAreaChange={handleAreaChange} />
        <TimeframeSelection onTimeframeChange={handleTimeframeChange} />
      </div>
    </div>
  );
};

export default OSMMapPage;