import React, { useState, useEffect } from "react";
import { Card, Row, Col } from "antd";
import Chart from "./Chart";

const Comparison = () => {
  const [compareData, setCompareData] = useState({});

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("compareData"));
    if (storedData) {
      const sortedData = {};
      Object.keys(storedData)
        .sort(
          (a, b) =>
            parseInt(a.replace("property", "")) -
            parseInt(b.replace("property", ""))
        )
        .forEach((key) => {
          sortedData[key] = storedData[key];
        });
      setCompareData(sortedData);
    }
  }, []);

  return (
    <div style={{ padding: "24px" }}>
      <h1>Comparison Chart</h1>
      <Card>
        <Chart compareData={compareData} />
      </Card>
    </div>
  );
};

export default Comparison;
