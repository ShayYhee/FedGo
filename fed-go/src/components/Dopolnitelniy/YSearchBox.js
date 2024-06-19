import React, { useRef, useState, useEffect } from 'react';
// import { YMaps, Map, SearchControl } from 'react-yandex-maps';

const YSearchBox = ({ onSelectLocation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [setSearchResults] = useState([]);
  const map = useRef(null); // Reference to the map instance

  const handleSearchSubmit = async () => {
    if (!searchQuery) return;

    const searchControl = map.current.controls.get('searchControl'); // Get SearchControl instance
    const results = await searchControl.search(searchQuery); // Search using SearchControl

    const selectedLocation = results[0]; // Assuming you want the first result
    onSelectLocation(selectedLocation); // Pass selected location to parent
    setSearchQuery(''); // Clear search box after selection
  };

  useEffect(() => {
    // ... existing code for debounced search (can be adapted)
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
        onChange={(event) => setSearchQuery(event.target.value)}
      />
      <button onClick={handleSearchSubmit}>Search</button>
    </div>
  );
};

export default YSearchBox;
