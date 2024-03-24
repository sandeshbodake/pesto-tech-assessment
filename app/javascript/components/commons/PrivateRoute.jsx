import React from "react";

import PropTypes from "prop-types";
import { Navigate, Route } from "react-router-dom";

const PrivateRoute = ({
  component: Component,
  condition,
  path,
  redirectRoute,
  ...props
}) => {
  if (!condition) {
    return (
      <Navigate
        to={{
          pathname: redirectRoute,
          from: props.location,
        }}
      />
    );
  }

  return <Route component={Component} path={path} {...props} />;
};

PrivateRoute.propTypes = {
  component: PropTypes.func,
  condition: PropTypes.bool,
  location: PropTypes.object,
  path: PropTypes.string,
  redirectRoute: PropTypes.string,
};

export default PrivateRoute;
