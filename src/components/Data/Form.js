import React, { useState } from 'react';
import './Form.css'; // Import your CSS file for styling

const Form = () => {
  const [formData, setFormData] = useState({
    serialNumber: '',
    listYear: '',
    dateRecorded: '',
    town: '',
    address: '',
    assessedValue: '',
    saleAmount: '',
    salesRatio: '',
    propertyType: '',
    residentialType: '',
    yearsUntilSold: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission, e.g., send data to server
    console.log(formData);
  };

  return (
    <div className="form-container">
      <h2>Modern Styled Form</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="serialNumber">Serial Number</label>
          <input type="text" id="serialNumber" name="serialNumber" value={formData.serialNumber} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="listYear">List Year</label>
          <input type="text" id="listYear" name="listYear" value={formData.listYear} onChange={handleChange} />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Form;
