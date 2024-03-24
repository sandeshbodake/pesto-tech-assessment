import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import {Route, Navigate, BrowserRouter, Routes} from "react-router-dom";
import {ToastContainer} from "react-toastify";
import {isPresent} from "utils";

import {setAuthHeaders, registerIntercepts} from "../apis/axios";
import {initializeLogger} from "common/logger";
import PrivateRoute from "components/commons/PrivateRoute";
import Hero from "components/Hero";

import {useAuthState, useAuthDispatch} from "contexts/auth";
import {useUserDispatch, useUserState} from "contexts/user";
import {
    clearLocalStorageCredentials,
    getFromLocalStorage,
} from "utils/storage";
import {
    AUTH_ROUTES,
    DASHBOARD_PATH,
    LOGIN_PATH,
    PRIVATE_ROUTES,
} from "./routeConstants";
import {Spin} from "antd";
import Login from "./Authentication/Login";

const Main = (props) => {
    const [loading, setLoading] = useState(true);
    const {authToken} = useAuthState();
    const {user: userContextState} = useUserState();
    const userDispatch = useUserDispatch();
    const authDispatch = useAuthDispatch();
    const currentUser = userContextState || props?.user;
    const isLoggedIn = isPresent(authToken) && isPresent(currentUser);

    useEffect(() => {
        userDispatch({type: "SET_USER", payload: {user: props?.user}});
        initializeLogger();
        registerIntercepts(authDispatch);
        setAuthHeaders(setLoading);
    }, [authDispatch, props?.user, userDispatch]);

    useEffect(() => {
        const previousLoginAuthEmail = getFromLocalStorage("authEmail");
        const hasDeviseUserSessionExpired = !props?.user;
        const sessionExpiredButLocalStorageCredsExist =
            hasDeviseUserSessionExpired && previousLoginAuthEmail;

        if (sessionExpiredButLocalStorageCredsExist)
            clearLocalStorageCredentials();
    }, [props?.user?.email]);

    if (loading) {
        return (
            <div className="h-screen">
                <div>
                    <Spin/>
                </div>
            </div>
        );
    }

    return (
        <BrowserRouter>
            <ToastContainer />
            <Routes>
                {AUTH_ROUTES.map((route) => (
                    <Route
                        exact
                        key={route.path}
                        path={route.path}
                        element={<route.component />}
                    />
                ))}
                {!isLoggedIn && (
                    <Route exact key={DASHBOARD_PATH} path={DASHBOARD_PATH} element={<Hero />} />
                )}
                {PRIVATE_ROUTES.map((route) => (
                    <Route
                        exact
                        key={route.path}
                        path={route.path}
                        element={isLoggedIn ? <route.component /> : <Navigate to={LOGIN_PATH} />}
                    />
                ))}
            </Routes>
        </BrowserRouter>
    );
};

Main.propTypes = {
    user: PropTypes.object,
};

export default Main;
