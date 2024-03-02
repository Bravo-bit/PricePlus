import React, { useState, useEffect } from "react";
import { Card, Row, Col } from "antd";
import Chart from "./Chart";

const HomePage = () => {
  const [compareData, setCompareData] = useState({});

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("compareData"));
    if (storedData) {
      setCompareData(storedData);
    }
  }, []);

  // Get the first two properties from compareData
  const propertyKeys = Object.keys(compareData).slice(0, 2);

  return (
    <>
      <div style={{ padding: "24px" }}>
        <h1>Comparison Items</h1>
        <Row gutter={16}>
          {propertyKeys.map((propertyName, index) => (
            <Col span={12} key={index}>
              <Card title={propertyName} style={{ marginBottom: "30px" }}>
                {Object.entries(compareData[propertyName].information).map(
                  ([attribute, value], attributeIndex) => (
                    <p key={attributeIndex}>
                      <strong>{attribute}:</strong> {value}
                    </p>
                  )
                )}
                <p>
                  <strong>Predicted Price:</strong>{" "}
                  {compareData[propertyName].predictedPrice &&
                    `£${Math.round(compareData[propertyName].predictedPrice)}`}
                </p>
              </Card>
            </Col>
          ))}
        </Row>
        <Row>
          <Col span={24} key={"chart"}>
            <Card>
              <Chart compareData={compareData} />
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default HomePage;
