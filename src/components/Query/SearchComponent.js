import React, { useState } from "react";
import "./SearchComponent.css";

const SearchComponent = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [recentSearches, setRecentSearches] = useState([]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();

    // Check if the search term already exists in recent searches
    const existingIndex = recentSearches.indexOf(searchTerm);

    if (existingIndex !== -1) {
      // Remove existing occurrence of the search term
      const updatedSearches = [...recentSearches];
      updatedSearches.splice(existingIndex, 1);
      setRecentSearches([searchTerm, ...updatedSearches.slice(0, 4)]);
    } else {
      // Add the search term to recent searches
      setRecentSearches((prevSearches) => [
        searchTerm,
        ...prevSearches.slice(0, 4),
      ]);
    }

    // Trigger onSearch callback with search term
    onSearch(searchTerm);
  };

  const handleRecentSearchClick = (clickedTerm) => {
    // Trigger onSearch callback with clicked term
    onSearch(clickedTerm);
  };

  // Filter out blank recent searches
  const filteredRecentSearches = recentSearches.filter(
    (search) => search.trim() !== ""
  );

  return (
    <div className="search-container">
      <form onSubmit={handleSearchSubmit}>
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <button type="submit">Search</button>
      </form>

      <div>
        <p>Recent Searches:</p>
        <ul>
          {filteredRecentSearches.map((search, index) => (
            <li key={index} onClick={() => handleRecentSearchClick(search)}>
              {search}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SearchComponent;
