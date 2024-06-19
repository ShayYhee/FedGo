import React, { useState, useEffect } from 'react';
// const YANDEX_MAPS_API_KEY = process.env.REACT_APP_YANDEX_MAPS_API_KEY; // Replace with your actual API key
const YANDEX_MAPS_API_KEY = '7b291ae0-557c-4cb0-a1fc-7cb6eb47b837'

const SearchBox = ({ onSelectLocation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const [error, setError] = useState(null);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchSubmit = async () => {
    if (!searchQuery) return;


    try{
      const response = await fetch(`https://geocode-maps.yandex.ru/1.x/?apikey=${YANDEX_MAPS_API_KEY}&geocode=${searchQuery}&lang=en-US&format=json`);
      const data = await response.json();

      const location = data.response.GeoObjectCollection.featureMember[0].GeoObject; // Assuming first result

      setSearchResults([location]); // Set search results to an array with the location object
    }catch (error) {
      console.error('Error fetching search results:', error);
      setSearchResults([]); // Set search results to empty array to clear suggestions
      setError('Failed to fetch search results. Please try again later.'); // Set error message state
    }
  };

  const handleSelectLocation = (index) => {
    const selectedLocation = searchResults[index];
    onSelectLocation(selectedLocation); // Pass selected location to parent
    setSearchQuery(''); // Clear search box after selection
  };

  useEffect(() => {
    const debouncedSearch = () => {
      if (searchQuery.length > 2) {
        handleSearchSubmit();
      } else {
        setSearchResults([]);
      }
    };

    const debounceTimer = setTimeout(debouncedSearch, 500); // Debounce search after 500ms

    return () => clearTimeout(debounceTimer); // Clear timeout on unmount
  }, [searchQuery]);

  return (
    <div className="search-box">
      <input
        type="text"
        placeholder="Search location"
        value={searchQuery}
        onChange={handleSearchChange}
      />
      <ul>
        {searchResults.map((result, index) => (
          <li key={index} onClick={() => handleSelectLocation(index)}>
            {result.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchBox;
