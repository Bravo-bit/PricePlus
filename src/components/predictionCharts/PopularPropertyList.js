import React, { useState, useEffect } from "react";
import { dummyFavorites } from "./dummyFavorites";
import "./PopularPropertyList.css"; // Import CSS file for styling

const PopularPropertyList = ({ favorites, onAddFavorite }) => {
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        // Check if favorites exist
        if (!favorites) return;

        // Transform favorites object into an array of properties
        const favoritesArray = Object.values(favorites);

        const response = await fetch("http://127.0.0.1:5000/recommendations", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ favorites: favoritesArray }),
        });
        if (!response.ok) {
          throw new Error("Failed to fetch recommendations");
        }
        const data = await response.json();
        setRecommendations(data);
      } catch (error) {
        console.error("Error fetching recommendations:", error);
        setRecommendations(Object.values(dummyFavorites));
      }
    };
    fetchRecommendations();
  }, [favorites]);

  if (!Array.isArray(recommendations) || recommendations.length === 0) {
    return <div>No recommendations available</div>;
  }

  const handleAddFavorite = (property) => {
    // Pass the selected property to the parent component
    onAddFavorite(property);
  };

  console.log(recommendations)

  return (
    <div className="recommended-properties">
      <h2>Recommended Properties</h2>
      <div className="property-list">
        {recommendations.map((property, index) => (
          <div key={index} className="property-item">
            <div>
              <strong>Town:</strong> {property.Town}
            </div>
            <div>
              <strong>Assessed Value:</strong>{" "}
              {property["Assessed Value"]}
            </div>
            <button onClick={() => handleAddFavorite(property)}>
              Add to Favorites
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PopularPropertyList;
