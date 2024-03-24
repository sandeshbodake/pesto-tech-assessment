import React from "react";
import { Form, Formik } from "formik";
import { Button, Input } from "antd";
import PropTypes from "prop-types";
import authenticationApi from "apis/authentication";
import { LOGIN_PATH } from "components/routeConstants";
import {
    SIGNUP_FORM_INITIAL_VALUES,
    SIGNUP_FORM_VALIDATION_SCHEMA,
} from "./constants";

const Signup = ({ history }) => {
    const handleSubmit = async (formData) => {
        try {
            await authenticationApi.signup(formData);
            history.push(LOGIN_PATH);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="antialiased bg-gray-100 h-screen flex items-center justify-center overflow-y-auto overflow-x-hidden p-6">
            <div className="max-w-md w-full">
                <h2 className="text-gray-800 mb-5 text-center text-3xl font-extrabold">
                    Signup
                </h2>
                <Formik
                    initialValues={SIGNUP_FORM_INITIAL_VALUES}
                    validationSchema={SIGNUP_FORM_VALIDATION_SCHEMA}
                    onSubmit={handleSubmit}
                >
                    {({ isSubmitting }) => (
                        <Form className="rounded-md bg-white shadow-sm w-full space-y-6 border p-8">
                            <Input
                                addonBefore="Email"
                                name="email"
                                placeholder="oliver@example.com"
                                type="email"
                                required
                            />
                            <Input
                                addonBefore="First name"
                                name="firstName"
                                placeholder="Oliver"
                                type="text"
                                required
                            />
                            <Input
                                addonBefore="Last name"
                                name="lastName"
                                placeholder="Smith"
                                type="text"
                                required
                            />
                            <Input.Password
                                addonBefore="Password"
                                name="password"
                                placeholder="******"
                                required
                            />
                            <Input.Password
                                addonBefore="Confirm password"
                                name="passwordConfirmation"
                                placeholder="******"
                                required
                            />
                            <Button
                                className="h-8"
                                disabled={isSubmitting}
                                type="primary"
                                htmlType="submit"
                                loading={isSubmitting}
                                block
                            >
                                Signup
                            </Button>
                        </Form>
                    )}
                </Formik>
                <div className="mt-4 flex flex-row items-center justify-start space-x-1">
                    <p className="text-gray-600 font-normal">
                        Already have an account?
                    </p>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => history.push(LOGIN_PATH)}
                    >
                        Login
                    </Button>
                </div>
            </div>
        </div>
    );
};

Signup.propTypes = {
    history: PropTypes.object,
};

export default Signup;
