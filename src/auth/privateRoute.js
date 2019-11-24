import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import { isAdmin } from ".";

const PrivateRoute = ({ component: Component, ...rest }) => (
    // props means components passed down to this pricate route component
    <Route
        {...rest}
        render={props =>
            isAdmin() ? (
                <Component {...props} />
            ) : (
                <Redirect
                    to={{
                        pathname: "/ParticleSize",
                        state: { from: props.location }
                    }}
                />
            )
        }
    />
);

export default PrivateRoute;