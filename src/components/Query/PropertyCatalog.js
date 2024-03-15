import React, { useState, useEffect } from "react";
import "./PropertyCatalogue.css";

function PropertyCatalog({ searchTerm }) {
  const [properties, setProperties] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const propertiesPerPage = 20;
  const [filters, setFilters] = useState({});

  useEffect(() => {
    // Fetch properties from the backend API
    async function fetchProperties() {
      try {
        let url = "http://localhost:8080/properties";
        const queryParams = Object.keys(filters)
          .map((key) => `${key}=${encodeURIComponent(filters[key])}`)
          .join("&");
        if (searchTerm) {
          url += `?town=${encodeURIComponent(searchTerm)}`;
          if (queryParams) {
            url += `&${queryParams}`;
          }
        } else if (queryParams) {
          url += `?${queryParams}`;
        }
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setProperties(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchProperties();
  }, [searchTerm, filters]);

  // Get properties for the current page
  const indexOfLastProperty = currentPage * propertiesPerPage;
  const indexOfFirstProperty = indexOfLastProperty - propertiesPerPage;
  const currentProperties = properties.slice(
    indexOfFirstProperty,
    indexOfLastProperty
  );

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Handle filter changes
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  // Apply filters
  const applyFilters = async () => {
    try {
      let url = "http://localhost:8080/filter";
      const queryParams = Object.keys(filters)
        .map((key) => `${key}=${encodeURIComponent(filters[key])}`)
        .join("&");
      if (searchTerm) {
        url += `?town=${encodeURIComponent(searchTerm)}`;
        if (queryParams) {
          url += `&${queryParams}`;
        }
      } else if (queryParams) {
        url += `?${queryParams}`;
      }
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setProperties(data);
    } catch (error) {
      console.error("Error applying filters:", error);
    }
  };

  return (
    <div>
      <h1>Property Catalog</h1>
      <div>
        <input
          type="text"
          name="propertyType"
          placeholder="Property Type"
          onChange={handleFilterChange}
        />
        <input
          type="text"
          name="residentialType"
          placeholder="Residential Type"
          onChange={handleFilterChange}
        />
        <button onClick={applyFilters}>Apply Filters</button>
      </div>
      <div className="property-list">
        {currentProperties.map((property) => (
          <div key={property.id} className="property">
            <p>Town: {property.town}</p>
            <p>Assessed Value: {property.assessedValue}</p>
            <p>Sale Amount: {property.saleAmount}</p>
            <p>Property Type: {property.propertyType}</p>
            <p>Residential Type: {property.residentialType}</p>
          </div>
        ))}
      </div>
      <div className="pagination">
        <Pagination
          propertiesPerPage={propertiesPerPage}
          totalProperties={properties.length}
          paginate={paginate}
        />
      </div>
    </div>
  );
}

function Pagination({ propertiesPerPage, totalProperties, paginate }) {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalProperties / propertiesPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul>
        {pageNumbers.map((number) => (
          <li key={number} className="page-item">
            <a onClick={() => paginate(number)} href="#" className="page-link">
              {number}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default PropertyCatalog;
