import React, { useState } from "react";
import "./SearchComponent.css";

const SearchComponent = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [recentSearches, setRecentSearches] = useState([]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();

    // Update recent searches
    setRecentSearches((prevSearches) => [
      searchTerm,
      ...prevSearches.slice(0, 4),
    ]);

    // Perform the filter action
    performFilter(searchTerm);
  };

  const handleRecentSearchClick = (clickedTerm) => {
    // Perform the filter action
    performFilter(clickedTerm);
  };

  const performFilter = (filterTerm) => {
    // TODO: Define the action to be taken when a search (recent or new) is submitted or clicked
    console.log("Performing filter with term:", filterTerm);
    // You can add your filter logic or make an API call here
  };

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
          {recentSearches.map((search, index) => (
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
