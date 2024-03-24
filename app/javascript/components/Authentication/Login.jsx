import React from "react";
import { Form, Input, Button } from "antd";
import PropTypes from "prop-types";
import { Formik } from "formik";
import authenticationApi from "apis/authentication";
import {
    SIGNUP_PATH,
    DASHBOARD_PATH,
} from "components/routeConstants";
import { useAuthDispatch } from "contexts/auth";
import { useUserDispatch } from "contexts/user";
import {
    LOGIN_FORM_INITIAL_VALUES,
    LOGIN_FORM_VALIDATION_SCHEMA,
} from "./constants";

const Login = ({ history }) => {
    const authDispatch = useAuthDispatch();
    const userDispatch = useUserDispatch();

    const handleSubmit = async ({ email, password }) => {
        try {
            const {
                data: { auth_token, user, is_admin },
            } = await authenticationApi.login({ email, password });
            authDispatch({ type: "LOGIN", payload: { auth_token, email, is_admin } });
            userDispatch({ type: "SET_USER", payload: { user } });
            history.push(DASHBOARD_PATH);
        } catch (error) {
            // Handle error
            console.error(error);
        }
    };

    return (
        <div className="neeto-ui-bg-gray-100 flex h-screen w-screen flex-row items-center justify-center overflow-y-auto overflow-x-hidden p-6">
            <div className="mx-auto flex h-full w-full flex-col items-center justify-center sm:max-w-md">
                <h2 className="neeto-ui-text-gray-800 mb-5 text-center text-3xl font-extrabold">Sign In</h2>
                <Formik
                    initialValues={LOGIN_FORM_INITIAL_VALUES}
                    validationSchema={LOGIN_FORM_VALIDATION_SCHEMA}
                    onSubmit={handleSubmit}
                >
                    {({ isSubmitting }) => (
                        <Form
                            className="neeto-ui-rounded-md neeto-ui-bg-white neeto-ui-shadow-s w-full space-y-6 border p-8"
                            onFinish={handleSubmit}
                        >
                            <Form.Item
                                name="email"
                                label="Email"
                                rules={[{ required: true, message: "Please input your email!" }]}
                            >
                                <Input placeholder="oliver@example.com" type="email" />
                            </Form.Item>
                            <Form.Item
                                name="password"
                                label="Password"
                                rules={[{ required: true, message: "Please input your password!" }]}
                            >
                                <Input.Password placeholder="******" />
                            </Form.Item>
                            <Form.Item>
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    loading={isSubmitting}
                                    className="h-8"
                                    disabled={isSubmitting}
                                >
                                    Login
                                </Button>
                            </Form.Item>
                        </Form>
                    )}
                </Formik>
                <div className="mt-4 flex flex-col items-center justify-center space-y-2">
                    <div className="flex flex-row items-center justify-start space-x-1">
                        <p className="neeto-ui-text-gray-600 font-normal">Don't have an account?</p>
                        <Button type="link" size="small" href={SIGNUP_PATH}>
                            Signup
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

Login.propTypes = {
    history: PropTypes.object,
};

export default Login;
