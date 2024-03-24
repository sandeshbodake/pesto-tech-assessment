import React from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import { LOGIN_PATH } from "../routeConstants";

const Signup = () => {
  const onFinish = values => {
    // eslint-disable-next-line no-console
    console.log("Received values of form: ", values);
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Form
        className="login-form"
        name="signup"
        style={{ width: "300px" }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
      >
        <h2 style={{ textAlign: "center", marginBottom: "24px" }}>Signup</h2>{" "}
        {/* Add Login label here */}
        <Form.Item
          name="email"
          rules={[
            {
              type: "email",
              required: true,
              message: "Please input your Email!",
            },
          ]}
        >
          <Input
            placeholder="Email"
            prefix={<UserOutlined className="site-form-item-icon" />}
          />
        </Form.Item>
        <Form.Item
          name="firstName"
          rules={[
            {
              required: true,
              message: "Please input your First Name!",
            },
          ]}
        >
          <Input
            placeholder="First Name"
            prefix={<UserOutlined className="site-form-item-icon" />}
          />
        </Form.Item>
        <Form.Item
          name="firstName"
          rules={[
            {
              required: true,
              message: "Please input your Last Name!",
            },
          ]}
        >
          <Input
            placeholder="Last Name"
            prefix={<UserOutlined className="site-form-item-icon" />}
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your Password!",
            },
          ]}
        >
          <Input.Password
            placeholder="Password"
            prefix={<LockOutlined className="site-form-item-icon" />}
          />
        </Form.Item>
        <Form.Item
          name="confirmPassword"
          rules={[
            {
              required: true,
              message: "Please input your Password!",
            },
          ]}
        >
          <Input.Password
            placeholder="Confirm Password"
            prefix={<LockOutlined className="site-form-item-icon" />}
          />
        </Form.Item>
        <Form.Item style={{ marginBottom: 0 }}>
          <Button
            className="login-form-button"
            htmlType="submit"
            style={{ width: "100%" }}
            type="primary"
          >
            Sign Up
          </Button>
          Or <a href={LOGIN_PATH}>Sign in</a>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Signup;
