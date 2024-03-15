 import React, { useState, useEffect } from "react";
import "./RealEstateForm.css";
import Card from "../Layout/Card";
import { DeleteFilled } from "@ant-design/icons";
import FormInputs from "./FormInputs";

const RealEstateForm = () => {
  const maxClicks = 3;
  const [formData, setFormData] = useState({
    Bedrooms: "",
    Bathrooms: "",
    "Assessed Value": "",
    "Sales Ratio": "",
    Town: "",
    "Property Type": "",
  });

  const [cardData, setCardData] = useState([
    { information: {}, predictedPrice: 0 },
    { information: {}, predictedPrice: 0 },
  ]);

  const [clicksCount, setClicksCount] = useState(0);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch("http://127.0.0.1:5000/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify([formData]),
      });
      if (!response.ok) {
        throw new Error("Failed to submit form data");
      }
      const data = await response.json();
      setCardData((prevCardData) => {
        const updatedData = [...prevCardData];
        updatedData[clicksCount].information = formData;
        updatedData[clicksCount].predictedPrice = data.predicted_price;
        return updatedData;
      });
      setClicksCount((prevCount) => prevCount + 1);
    } catch (error) {
      console.error("Error:", error.message);
      // Show error message to the user
    } finally {
      setLoading(false);
    }
  };

  const addToFavorites = (index) => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || {};
    let nextIndex = 1;
    while (storedFavorites[`property${nextIndex}`]) {
      nextIndex++;
    }
    const key = `property${nextIndex}`;
    const updatedFavorites = {
      ...storedFavorites,
      [key]: {
        information: cardData[index].information,
        predictedPrice: cardData[index].predictedPrice,
      },
    };
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    alert(`Property has been added to favorites.`);
  };

  const handleAction = (index, action) => {
    if (action === "compare") {
      const storedCompareData =
        JSON.parse(localStorage.getItem("compareData")) || {};
      const updatedCompareData = {
        ...storedCompareData,
        [`property${index + 1}`]: {
          information: cardData[index].information,
          predictedPrice: cardData[index].predictedPrice,
        },
      };
      localStorage.setItem("compareData", JSON.stringify(updatedCompareData));
      alert("Property has been added to compare page.");
    } else if (action === "favorite") {
      addToFavorites(index);
    } else if (action === "delete") {
      setCardData((prevCardData) => {
        const updatedData = [...prevCardData];
        updatedData[index].information = {};
        updatedData[index].predictedPrice = 0;
        return updatedData;
      });
      setClicksCount((prevCount) => Math.max(0, prevCount - 1));
    }
  };

  useEffect(() => {
    if (clicksCount >= maxClicks) {
      setClicksCount(maxClicks);
    }
  }, [clicksCount]);

  return (
    <div className="container">
      <div className="left">
        <h2>Real Estate Form</h2>
        <FormInputs
          formData={formData}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          clicksCount={clicksCount}
          maxClicks={maxClicks}
          loading={loading}
        />
      </div>
      <div className="right">
        {cardData.map((card, index) => (
          <Card key={index}>
            <div className="card-content">
              {Object.entries(card.information).map(([key, value]) => (
                <p key={key}>
                  <strong>{key}:</strong> {value}
                </p>
              ))}
              <p className="predictedPriceContainer">
                £{Math.round(card.predictedPrice)}
              </p>
              <div className="actions-right">
                <button
                  onClick={() => handleAction(index, "compare")}
                  disabled={clicksCount < index + 1 || clicksCount >= maxClicks}
                >
                  Compare +
                </button>
                <button
                  onClick={() => handleAction(index, "favorite")}
                  disabled={clicksCount >= maxClicks}
                >
                  Add to Favorites
                </button>
              </div>
              <div className="delete-container-left">
                <DeleteFilled
                  className="delete"
                  onClick={() => handleAction(index, "delete")}
                />
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default RealEstateForm;