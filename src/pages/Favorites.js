import React, { useState } from "react";
import styles from "../components/styles/FavoritePage.module.css";

const Favorites = () => {
  const favorites = JSON.parse(localStorage.getItem("favorites")) || {};
  const [compareData, setCompareData] = useState(
    JSON.parse(localStorage.getItem("compareData")) || {}
  );

  const handleAction = (key, action) => {
    if (action === "compare") {
      const updatedCompareData = {
        ...compareData,
        [key]: {
          information: favorites[key].information,
          predictedPrice: favorites[key].predictedPrice,
        },
      };
      localStorage.setItem("compareData", JSON.stringify(updatedCompareData));
      alert("Property has been added to compare page.");
    }
  };

  return (
    <div className={styles["favorite-page"]}>
      <h2>Favorite Properties</h2>
      {Object.keys(favorites).length === 0 ? (
        <p>No favorite properties saved.</p>
      ) : (
        <div className={styles["favorite-list"]}>
          {Object.entries(favorites).map(([key, value]) => (
            <div key={key} className={styles["favorite-item"]}>
              <div className={styles["favorite-item-content"]}>
                <h3>{key}</h3>
                <div className={styles["favorite-item-info"]}>
                  {Object.entries(value.information).map(
                    ([attrKey, attrValue]) => (
                      <p key={attrKey}>
                        <strong>{attrKey}:</strong> {attrValue}
                      </p>
                    )
                  )}
                  <p className={styles["favorite-item-price"]}>
                    Predicted Price: £{value.predictedPrice}
                  </p>
                </div>
              </div>
              <button
                className={styles["favorite-action-button"]}
                onClick={() => handleAction(key, "compare")}
              >
                Compare +
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;
