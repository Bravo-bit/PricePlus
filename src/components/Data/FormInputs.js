import React from "react";

const FormInputs = ({
  formData,
  handleChange,
  handleSubmit,
  clicksCount,
  maxClicks,
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <label>
        Bedrooms:
        <input
          placeholder="Bedrooms"
          type="number"
          name="Bedrooms"
          value={formData.Bedrooms}
          onChange={handleChange}
        />
      </label>
      <label>
        Bathrooms:
        <input
          placeholder="Bathrooms"
          type="number"
          name="Bathrooms"
          value={formData.Bathrooms}
          onChange={handleChange}
        />
      </label>
      <label>
        Assessed Value:
        <input
          placeholder="Assessed Value"
          type="float"
          name="Assessed Value"
          value={formData["Assessed Value"]}
          onChange={handleChange}
        />
      </label>
      <label>
        Sales Ratio:
        <input
          placeholder="Sales Ratio"
          type="float"
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
      <button type="submit" disabled={clicksCount >= maxClicks}>
        Predict Price
      </button>
    </form>
  );
};

export default FormInputs;
