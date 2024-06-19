import React, { useState, useEffect, useContext } from 'react';
import AreaSelection from './AreaSelection.js';
import TimeframeSelection from './TimeFrameSelection.js';
// import YandexMap from './YandexMap.js';
import { LoginContext } from './context.js';
import './MapPage.css';
import SearchBox from './SearchBox.js';
import { YMaps, Map, SearchControl } from 'react-yandex-maps';

const YMapPage = () => {
    const [areaFilter, setAreaFilter] = useState('all');
    const [timeframeFilter, setTimeframeFilter] = useState({ startDate: null, endDate: null });
    const [mapData, setMapData] = useState([]);

    const handleAreaChange = (selectedArea) => setAreaFilter(selectedArea);
    const handleTimeframeChange = (startDate, endDate) => setTimeframeFilter({ startDate, endDate });

    const fetchFilteredData = async () => {
        const { startDate, endDate } = timeframeFilter;

        if (!startDate || !endDate) {
            return;
        }

        const startDateString = startDate.toISOString();
        const endDateString = endDate.toISOString();

        const response = await fetch(`/data?area=${areaFilter}&startDate=${startDateString}&endDate=${endDateString}`);
        const data = await response.json();
        setMapData(data.filter((dataItem) => {
            if (areaFilter === 'all') {
                return true;
            }
            return dataItem.area === areaFilter;
        }));
    };

    const [center, setCenter] = useState([55.7558, 37.6173]);
    const [zoom] = useState(5);

    const handleSelectLocation = (location) => {
        if (!location || !location.Point || !location.Point.pos) {
            console.error('Invalid location data:', location);
            return;
        }

        const [longitude, latitude] = location.Point.pos.split(' ').map(Number);
        setCenter([latitude, longitude]);
    };

    useEffect(() => {
        fetchFilteredData();
    }, [areaFilter, timeframeFilter]);

    const { isLoggedIn } = useContext(LoginContext);

    // if (!isLoggedIn) {
    //     return <Navigate to="/login" />;
    // }

    const handleMarkerClick = (dataItem) => {
        console.log('Marker clicked:', dataItem);
    };

    return (
        <div className='map-container'>
            <YMaps className='ymaps'>
                <Map state={{ center, zoom }} width="100%" height="100%">
                    <SearchControl options={{ float: 'left' }} onResultSelect={(e) => {
                        const firstResult = e.get('target').getResultsArray()[0];
                        const coordinates = firstResult.geometry.getCoordinates();
                        handleSelectLocation({ Point: { pos: coordinates.join(' ') } });
                    }} />
                </Map>
            </YMaps>
            <div className='filters'>
                <SearchBox onSelectLocation={handleSelectLocation} />
                <AreaSelection onAreaChange={handleAreaChange} />
                <TimeframeSelection onTimeframeChange={handleTimeframeChange} />
            </div>
        </div>
    );
};

export default YMapPage;
