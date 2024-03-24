import React from "react";

import {Route, Navigate} from "react-router-dom";

import {
    DASHBOARD_ROUTES,
    TASKS_PATH,
    DASHBOARD_PATH,
} from "components/routeConstants";

const Dashboard = () => (
    <div className="flex h-screen w-full">
        {DASHBOARD_ROUTES.map(({path, component}) => (
            <Route exact component={component} key={path} path={path}/>
        ))}
        <Navigate from={DASHBOARD_PATH} to={TASKS_PATH}/>
    </div>
);

export default Dashboard;
