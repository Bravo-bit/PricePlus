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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("predict", {
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
    }
  };

  const handleAction = (index, action) => {
    if (action === "compare") {
      // Retrieve the existing compareData from localStorage or initialize as an empty object
      const storedCompareData =
        JSON.parse(localStorage.getItem("compareData")) || {};
      // Add or update the property information in compareData
      const updatedCompareData = {
        ...storedCompareData,
        [`property${index + 1}`]: {
          information: cardData[index].information,
          predictedPrice: cardData[index].predictedPrice,
        },
      };
      // Store the updated compareData in localStorage
      localStorage.setItem("compareData", JSON.stringify(updatedCompareData));
      alert("Property has been added to compare page.");
    } else if (action === "favorite") {
      // Implement favorite functionality
      alert(
        `Property ${
          index === 0 ? "on the left" : "on the right"
        } has been added to favorites.`
      );
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
                <button onClick={() => handleAction(index, "favorite")}>
                  Favorites +
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
