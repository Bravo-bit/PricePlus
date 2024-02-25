import React, { useState } from "react";
import "./RealEstateForm.css";
import Card from "../Layout/Card";
import { DeleteFilled } from "@ant-design/icons";

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

  const [firstCardInformation, setFirstCardInformation] = useState({});
  const [secondCardInformation, setSecondCardInformation] = useState({});
  const [firstPredictedPrice, setFirstPredictedPrice] = useState(0);
  const [secondPredictedPrice, setSecondPredictedPrice] = useState(0);
  const [clicksCount, setClicksCount] = useState(0);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

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
        body: JSON.stringify([formData]), // Convert formData to JSON string
      });

      if (!response.ok) {
        throw new Error("Failed to submit form data");
      }

      // Reset form data to initial values
      setFormData({
        Bedrooms: "",
        Bathrooms: "",
        "Assessed Value": "",
        "Sales Ratio": "",
        Town: "",
        "Property Type": "",
      });

      const data = await response.json();

      // Increment clicks count
      setClicksCount(clicksCount + 1);

      // Handle different click counts
      if (clicksCount === 0) {
        setFirstCardInformation(formData);
        setFirstPredictedPrice(data.predicted_price);
      } else if (clicksCount === 1) {
        setSecondCardInformation(formData);
        setSecondPredictedPrice(data.predicted_price);
      }

      // If the click count reaches the maximum allowed clicks, disable the button
      if (clicksCount >= maxClicks - 1) {
        setIsButtonDisabled(true);
        console.log("The button is disabled");
      }
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  const handleDelete = () => {
    // Clear card data and decrement clicks count
    setFirstCardInformation({});
    setSecondCardInformation({});
    setFirstPredictedPrice(0);
    setSecondPredictedPrice(0);
    setClicksCount(Math.max(0, clicksCount - 1));
  };

  const handleCompare = () => {
    // Save card data to localStorage
    localStorage.setItem("compareData", JSON.stringify(firstCardInformation));
    // Show alert
    alert("Property has been added to compare page.");
  };

  return (
    <div className="container">
      <div className="left">
        <h2>Real Estate Form</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Bedrooms:
            <input
              placeholder="Bedrooms"
              type="text"
              name="Bedrooms"
              value={formData.Bedrooms}
              onChange={handleChange}
            />
          </label>
          <label>
            Bathrooms:
            <input
              placeholder="Bathrooms"
              type="text"
              name="Bathrooms"
              value={formData.Bathrooms}
              onChange={handleChange}
            />
          </label>
          <label>
            Assessed Value:
            <input
              placeholder="Assessed Value"
              type="text"
              name="Assessed Value"
              value={formData["Assessed Value"]}
              onChange={handleChange}
            />
          </label>
          <label>
            Sales Ratio:
            <input
              placeholder="Sales Ratio"
              type="text"
              name="Sales Ratio"
              value={formData["Sales Ratio"]}
              onChange={handleChange}
            />
          </label>
          <label>
            Town:
            <input
              placeholder="Town"
              type="text"
              name="Town"
              value={formData.Town}
              onChange={handleChange}
            />
          </label>
          <label>
            Property Type:
            <input
              placeholder="Property Type"
              type="text"
              name="Property Type"
              value={formData["Property Type"]}
              onChange={handleChange}
            />
          </label>
          <button type="submit">Predict Price</button>
        </form>
      </div>

      <div className="right">
        <Card>
          <div className="card-content">
            {Object.entries(firstCardInformation).map(([key, value]) => (
              <p key={key}>
                <strong>{key}:</strong> {value}
              </p>
            ))}

            <p className="predictedPriceContainer">
              £{Math.round(firstPredictedPrice)}
            </p>

            <div className="actions-left">
              <button onClick={handleCompare} disabled={isButtonDisabled}>
                Compare +
              </button>
              <button>Favorites +</button>
            </div>

            <div className="delete-container-left">
              <DeleteFilled className="delete" onClick={handleDelete} />
            </div>
          </div>
        </Card>
        <Card>
          <div className="card-content">
            {Object.entries(secondCardInformation).map(([key, value]) => (
              <p key={key}>
                <strong>{key}:</strong> {value}
              </p>
            ))}

            <p className="predictedPriceContainer">
              £{Math.round(secondPredictedPrice)}
            </p>

            <div className="actions-right">
              <button onClick={handleCompare} disabled={isButtonDisabled}>
                Compare +
              </button>
              <button>Favorites +</button>
            </div>

            <div className="delete-container">
              <DeleteFilled className="delete" onClick={handleDelete} />
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default RealEstateForm;
