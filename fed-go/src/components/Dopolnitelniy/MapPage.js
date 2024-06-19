import React, { useState, useEffect, useContext } from 'react';
import AreaSelection from './SelectAreaFilter.js';
import TimeframeSelection from './TimeFrameSelection.js';
import YandexMap from './YandexMap.js';
import { LoginContext } from './context.js'; // Import LoginContext
import './MapPage.css';
import SearchBox from './SearchBox.js';
import { YMaps, Map, SearchControl } from 'react-yandex-maps';

const MapPage = () => {
    const [areaFilter, setAreaFilter] = useState('all');
    const [timeframeFilter, setTimeframeFilter] = useState({ startDate: null, endDate: null });
    const [mapData, setMapData] = useState([]);
  
    const handleAreaChange = (selectedArea) => setAreaFilter(selectedArea);
    const handleTimeframeChange = (startDate, endDate) => setTimeframeFilter({ startDate, endDate });
  
    const fetchFilteredData = async () => {
      const { startDate, endDate } = timeframeFilter; // Destructure dates from timeframeFilter
    
      if (!startDate || !endDate) {
        return; // Early exit if dates are missing
      }
    
      const startDateString = startDate.toISOString();
      const endDateString = endDate.toISOString();
    
      const response = await fetch(`/data?area=${areaFilter}&startDate=${startDateString}&endDate=${endDateString}`);
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
    
    // handling searchbox
    const [mapView, setMapView] = useState({ center: [55.7558, 37.6173], zoom: 4 }); // Initial map view

    const handleSelectLocation = (selectedLocation) => {
      const longitude = selectedLocation.Point.pos.lon;
      const latitude = selectedLocation.Point.pos.lat;

      const updatedMapView = { ...mapView, center: [longitude, latitude] }; // Update center

      setMapView(updatedMapView); // Update state with new map view

      console.log('Updated map view:', updatedMapView); // Log updated map view data
    };
  
    useEffect(() => {
      fetchFilteredData();
    }, [areaFilter, timeframeFilter]);

    // const { isLoggedIn } = useContext(LoginContext);

    // if (!isLoggedIn) {
    //     return <Navigate to="/login" />; // Redirect to login if not logged in
    // }

  
    const handleMarkerClick = (dataItem) => {
      // Handle optional marker click event (e.g., show details)
      console.log('Marker clicked:', dataItem);
    };
  
    return (
      <div className='map-container'>
      {/* <YandexMap center={center} zoom={zoom}>
        <SearchControl options={{ float: 'left' }} /> {/* Add SearchControl */}
        {/* {<SearchBox onSelectLocation={handleSelectLocation} />} {/* Pass SearchBox */}
      {/* </YandexMap> */}
        <div className='map'>
          <YandexMap center={mapView.center} zoom={mapView.zoom} data={mapData} onMarkerClick={handleMarkerClick}/>
        </div>
        <div className='filters'>
          <SearchBox onSelectLocation={handleSelectLocation} />
          <AreaSelection onAreaChange={handleAreaChange} />
          <TimeframeSelection onTimeframeChange={handleTimeframeChange} />
        </div>
      </div>
    );
  };
  
  export default MapPage;
  