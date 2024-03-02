import React, { useState } from "react";
import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import "./Chart.css"; // Import CSS for styling

function Chart({ compareData }) {
  // Check if compareData is null or undefined
  if (!compareData || Object.keys(compareData).length === 0) {
    // Return null or a message indicating that no data is available
    return <p>No data available</p>;
  }

  // State to manage visibility of bars
  const [visibleBars, setVisibleBars] = useState({
    Bedrooms: true,
    Bathrooms: true,
    "Assessed Value": true,
    "Sales Ratio": true,
    "Predicted Price": true,
  });

  // Extracting the data from compareData
  const data = Object.keys(compareData).map((propertyName) => {
    const property = compareData[propertyName];
    return {
      name: propertyName,
      Bedrooms: parseInt(property.information["Bedrooms"]),
      Bathrooms: parseInt(property.information["Bathrooms"]),
      "Assessed Value": parseFloat(property.information["Assessed Value"]),
      "Sales Ratio": parseFloat(property.information["Sales Ratio"]),
      "Predicted Price": Math.round(property.predictedPrice),
    };
  });

  // Function to toggle visibility of a bar
  const toggleVisibility = (dataKey) => {
    setVisibleBars((prevVisibleBars) => ({
      ...prevVisibleBars,
      [dataKey]: !prevVisibleBars[dataKey],
    }));
  };

  // Custom tooltip content
  const renderTooltipContent = (props) => {
    const { active, payload } = props;
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip">
          {payload.map((entry, index) => (
            <p key={index}>{`${entry.dataKey}: ${entry.value}`}</p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip content={renderTooltipContent} />
        <Legend
          onClick={toggleVisibility}
          wrapperStyle={{ color: "#333", fontSize: "12px" }}
        />
        {Object.entries(visibleBars).map(
          ([dataKey, isVisible], index) =>
            isVisible && (
              <Bar
                key={index}
                dataKey={dataKey}
                fill={
                  dataKey === "Bedrooms" || dataKey === "Bathrooms"
                    ? "#82ca9d"
                    : "#8884d8"
                }
                barSize={20}
                stroke="#000"
                strokeWidth={1}
                activeBar={<Rectangle fill="pink" stroke="blue" />}
              />
            )
        )}
      </BarChart>
    </ResponsiveContainer>
  );
}

export default Chart;
