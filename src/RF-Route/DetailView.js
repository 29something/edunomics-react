import React, { Component } from "react";
import { Route } from "react-router-dom";
import ViewRf22 from "../components/Detail/ViewRf22";

import QICRoute from "../auth/qicRoute";
import { ViewRF26 } from "../components/RF - Form/RF - 26/ViewRF26";
import { ViewRF21 } from "../components/RF - Form/RF - 21/ViewRF21";
import { ViewRf23 } from "../components/RF - Form/RF-23/ViewRf23";
import { DetailViewRf24 } from "../components/RF - Form/RF - 24/DetailViewRf24";
export class DetailView extends Component {
  render() {
    return (
      <div>
        <Route
          path={process.env.PUBLIC_URL + "/DetailViewRF24"}
          exact
          component={DetailViewRf24}
        />
        <Route
          path={process.env.PUBLIC_URL + "/ViewRF23"}
          exact
          component={ViewRf23}
        />
        <Route
          path={process.env.PUBLIC_URL + "/ViewRf22/:id"}
          exact={true}
          component={ViewRf22}
        />
        <Route
          path={process.env.PUBLIC_URL + "/ViewRF26/:id"}
          exact={true}
          component={ViewRF26}
        />
        <Route
          path={process.env.PUBLIC_URL + "/ViewRF21/:id"}
          exact={true}
          component={ViewRF21}
        />
      </div>
    );
  }
}

export default DetailView;
