import React, { useState, useEffect } from "react";
import PopularPropertyList from "./PopularPropertyList";

function Recommendations() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const storedFavorites = localStorage.getItem("favorites");
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    } else {
      // Provide a default value if favorites are not found
      setFavorites([
        {
          information: {
            Bedrooms: "3",
            Bathrooms: "2",
            "Assessed Value": "200000",
            "Sales Ratio": "0.8",
            Town: "London",
            "Property Type": "Single Family",
          },
          predictedPrice: [219017.03281133482],
        },
        {
          information: {
            Bedrooms: "4",
            Bathrooms: "3",
            "Assessed Value": "250000",
            "Sales Ratio": "0.7",
            Town: "Manchester",
            "Property Type": "Apartment",
          },
          predictedPrice: [285923.87312744165],
        },
      ]);
    }
  }, []);

  const handleAddFavorite = (property) => {
    const newFavorites = [...favorites, property];
    localStorage.setItem("favorites", JSON.stringify(newFavorites));
    setFavorites(newFavorites);
  };

  const handleRemoveFavorite = (property) => {
    const newFavorites = favorites.filter(
      (fav) => fav.information.Address !== property.information.Address
    );
    localStorage.setItem("favorites", JSON.stringify(newFavorites));
    setFavorites(newFavorites);
  };

  return (
    <div>
      <h1>Property Recommendations</h1>
      <PopularPropertyList
        favorites={favorites}
        onAddFavorite={handleAddFavorite}
        onRemoveFavorite={handleRemoveFavorite}
      />
    </div>
  );
}

export default Recommendations;
