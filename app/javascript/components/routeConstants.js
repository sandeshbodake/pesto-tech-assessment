import Login from "components/Authentication/Login";
import Signup from "components/Authentication/Signup";
import Dashboard from "components/Dashboard";
// import Tasks from "components/Dashboard/Tasks";
// import Settings from "components/Dashboard/Settings";

export const DASHBOARD_PATH = "/";
export const TASKS_PATH = "/tasks";
export const CHANGE_PASSWORD_PATH = "/settings?tab=password";
export const PROFILE_PATH = "/settings?tab=profile";
export const SETTINGS_PATH = "/settings";
export const LOGIN_PATH = "/login";
export const SIGNUP_PATH = "/signup";
export const RESET_PASSWORD_PATH = "/my/password/new";

export const AUTH_ROUTES = [
    {
        path: SIGNUP_PATH,
        component: Signup,
    },
    {
        path: LOGIN_PATH,
        component: Login,
    },
];

export const PRIVATE_ROUTES = [{ path: DASHBOARD_PATH, component: Dashboard }];

export const DASHBOARD_ROUTES = [
    // {
    //     path: TASKS_PATH,
    //     component: Tasks,
    // },
    // {
    //     path: SETTINGS_PATH,
    //     component: Settings,
    // },
];
