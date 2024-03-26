import React from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input } from "antd";
import { DASHBOARD_PATH, SIGNUP_PATH } from "../routeConstants";
import authenticationApi from "../../apis/authentication";

import { useAuthDispatch } from "contexts/auth";
import { useUserDispatch } from "contexts/user";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const history = useNavigate();

  const authDispatch = useAuthDispatch();
  const userDispatch = useUserDispatch();

  const onFinish = async values => {
    const { email, password } = values;

    try {
      const {
        data: { auth_token, user, is_admin },
      } = await authenticationApi.login({ email, password });
      authDispatch({ type: "LOGIN", payload: { auth_token, email, is_admin } });
      userDispatch({ type: "SET_USER", payload: { user } });
      history(DASHBOARD_PATH);
    } catch {
      // logger.error(error);
    }
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
        name="normal_login"
        style={{ width: "300px" }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
      >
        <h2 style={{ textAlign: "center", marginBottom: "24px" }}>Login</h2>
        <Form.Item
          name="email"
          rules={[
            {
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
        <Form.Item>
          <Form.Item noStyle name="remember" valuePropName="checked">
            <Checkbox>Remember me</Checkbox>
          </Form.Item>
          <a className="login-form-forgot" href="">
            Forgot password
          </a>
        </Form.Item>
        <Form.Item style={{ marginBottom: 0 }}>
          <Button
            className="login-form-button"
            htmlType="submit"
            style={{ width: "100%" }}
            type="primary"
          >
            Sign in
          </Button>
          Or <a href={SIGNUP_PATH}>register now!</a>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
