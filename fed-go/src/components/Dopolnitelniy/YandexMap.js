import React from 'react';
import { YMaps, Map, Placemark } from 'react-yandex-maps';
import './YandexMap.css';
const YANDEX_MAPS_API_KEY = process.env.REACT_APP_YANDEX_MAPS_API_KEY;


// Rename this component to avoid conflict with imported module name
const YandexMap = ({ center, zoom, data, onMarkerClick }) => {
  // console.log(REACT_APP_YANDEX_MAPS_API_KEY);
  return (
    <YMaps id='ymap'>
      <Map id='map' width="100%" height="95%" defaultState={{ center, zoom }} apiKey={YANDEX_MAPS_API_KEY}>
        {data.map((dataItem) => (
          <Placemark
            key={dataItem.id}
            coordinates={dataItem.coordinates}
            // options={{ .../* marker options */ }}
            onClick={() => onMarkerClick && onMarkerClick(dataItem)} // Optional marker click handler
          />
        ))}
      </Map>
    </YMaps>
  );
};

export default YandexMap;

