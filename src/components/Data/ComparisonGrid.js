import React from "react";
import { Card, Row, Col } from "antd";

const HomePage = () => {
  return (
    <div style={{ padding: "24px" }}>
      <h1>Comparison Items</h1>

      <Row gutter={16}>
        {/* Item 1 */}
        <Col span={8}>
          <Card title="Item 1" style={{ marginBottom: "16px" }}>
            {/* Add content for Item 1 here */}
            <p>This is the content for Item 1.</p>
          </Card>
        </Col>

        {/* Item 2 */}
        <Col span={8}>
          <Card title="Item 2" style={{ marginBottom: "16px" }}>
            {/* Add content for Item 2 here */}
            <p>This is the content for Item 2.</p>
          </Card>
        </Col>

        {/* Item 3 */}
        <Col span={8}>
          <Card title="Item 3" style={{ marginBottom: "16px" }}>
            {/* Add content for Item 3 here */}
            <p>This is the content for Item 3.</p>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default HomePage;
