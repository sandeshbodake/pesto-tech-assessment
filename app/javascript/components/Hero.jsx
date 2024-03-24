import React from "react";
import { Button, Typography } from "antd";
import { Link } from "react-router-dom";
// Assuming you're using React Router
const { Title, Paragraph } = Typography;

const Hero = () => (
  <div
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "100vh",
    }}
  >
    <div style={{ maxWidth: "800px", textAlign: "center", padding: "0 20px" }}>
      <Title level={1} style={{ color: "#000", marginBottom: "20px" }}>
        Rails, React Template
      </Title>
      <Paragraph style={{ color: "#000", marginBottom: "40px" }}>
        Don't reinvent the wheel. Use sane defaults to bootstrap your
        react-rails project!
      </Paragraph>
      <div style={{ marginTop: "40px" }}>
        <Link to="/login">
          <Button size="large" type="primary">
            Login
          </Button>
        </Link>
      </div>
    </div>
  </div>
);

export default Hero;
