import React, { Component } from "react";
import { Route } from "react-router-dom";
import { TableRf7 } from "../components/RF - Form/RF - 07/TableRf7";
import { TableRf8 } from "../components/RF - Form/RF - 08/TableRf8";
import { TableRf21 } from "../components/RF - Form/RF - 21/TableRf21";
import { TableRf2 } from "../components/RF - Form/RF-02/TableRf2";
import { TableRf3 } from "../components/RF - Form/RF - 03/TableRf3";
import { TableRf1 } from "../components/RF - Form/RF - 01/TableRf1";
import { VerifiedRF7 } from "../components/RF - Form/RF - 07/VerifiedRF7";
import { VerifiedRF8 } from "../components/RF - Form/RF - 08/VerifiedRF8";
import { VerifiedRF21 } from "../components/RF - Form/RF - 21/VerifiedRF21";
import { ViewRF7 } from "../components/RF - Form/RF - 07/ViewRF7";
import { ViewRF8 } from "../components/RF - Form/RF - 08/ViewRF8";
import { TableRf4 } from "../components/RF - Form/RF - 04/TableRf4";
import { VerifiedRF1 } from "../components/RF - Form/RF - 01/VerifiedRF1";
import { VerifiedRF2 } from "../components/RF - Form/RF-02/VerifiedRF2";
import { VerifiedRF3 } from "../components/RF - Form/RF - 03/VerifiedRF3";
import { VerifiedRF4 } from "../components/RF - Form/RF - 04/VerifiedRF4";
import { TableRf26 } from "../components/RF - Form/RF - 26/TableRf26";
import { VerifiedRF26 } from "../components/RF - Form/RF - 26/VerifiedRF26";
import { ViewRF3 } from "../components/RF - Form/RF - 03/ViewRF3";
import { ViewRF2 } from "../components/RF - Form/RF-02/ViewRF2";
import { ViewRF27 } from "../components/RF - Form/RF - 26/ViewRF27";
import { modPending } from "../components/mod/modPending";
import { modApproved } from "../components/mod/modApproved";
import { modRejected } from "../components/mod/modRejected";
import { modPurged } from "../components/mod/modPurged";
import modDetailView from "../components/mod/modDetailView";
import itemElement from "../components/mod/itemElement";
import TableRf23 from "../components/RF - Form/RF-23/TableRf23";
import { ApprovedRf24 } from "../components/RF - Form/RF - 24/ApprovedRf24";
import { PendingRf24 } from "../components/RF - Form/RF - 24/PendingRf24";
import { RejectedRf24 } from "../components/RF - Form/RF - 24/RejectedRf24";

export class View extends Component {
  render() {
    return (
      <div>

        <Route
          path={process.env.PUBLIC_URL + "/TableRf7"}
          exact={true}
          component={TableRf7}
        />
        <Route
          path={process.env.PUBLIC_URL + "/VerifiedRF7"}
          exact={true}
          component={VerifiedRF7}
        />
        <Route
          path={process.env.PUBLIC_URL + "/ViewRF7/:id"}
          exact={true}
          component={ViewRF7}
        />
        <Route
          path={process.env.PUBLIC_URL + "/TableRf8"}
          exact={true}
          component={TableRf8}
        />
        <Route
          path={process.env.PUBLIC_URL + "/VerifiedRF8"}
          exact={true}
          component={VerifiedRF8}
        />
        <Route
          path={process.env.PUBLIC_URL + "/ViewRF8/:id"}
          exact={true}
          component={ViewRF8}
        />
        <Route
          path={process.env.PUBLIC_URL + "/TableRf21"}
          exact={true}
          component={TableRf21}
        />
        <Route
          path={process.env.PUBLIC_URL + "/VerifiedRF21"}
          exact={true}
          component={VerifiedRF21}
        />
        <Route
          path={process.env.PUBLIC_URL + "/TableRf2"}
          exact={true}
          component={TableRf2}
        />
        <Route
          path={process.env.PUBLIC_URL + "/VerifiedRF2"}
          exact={true}
          component={VerifiedRF2}
        />
        <Route
          path={process.env.PUBLIC_URL + "/ViewRF2/:id"}
          exact={true}
          component={ViewRF2}
        />
        <Route
          path={process.env.PUBLIC_URL + "/TableRf3"}
          exact={true}
          component={TableRf3}
        />
        <Route
          path={process.env.PUBLIC_URL + "/ViewRF3/:id"}
          exact={true}
          component={ViewRF3}
        />
        <Route
          path={process.env.PUBLIC_URL + "/TableRf26"}
          exact={true}
          component={TableRf26}
        />

        <Route
          path={process.env.PUBLIC_URL + "/VerifiedRF26"}
          exact={true}
          component={VerifiedRF26}
        />
        <Route
          path={process.env.PUBLIC_URL + "/VerifiedRF3"}
          exact={true}
          component={VerifiedRF3}
        />
        <Route
          path={process.env.PUBLIC_URL + "/VerifiedRF1"}
          exact={true}
          component={VerifiedRF1}
        />
        <Route
          path={process.env.PUBLIC_URL + "/TableRf4"}
          exact={true}
          component={TableRf4}
        />
        <Route
          path={process.env.PUBLIC_URL + "/VerifiedRF4"}
          exact={true}
          component={VerifiedRF4}
        />
        <Route
          path={process.env.PUBLIC_URL + "/TableRf1"}
          exact={true}
          component={TableRf1}
        />
        <Route
          path={process.env.PUBLIC_URL + "/ViewRF27/:id"}
          exact={true}
          component={ViewRF27}
        />
        <Route
          path={process.env.PUBLIC_URL + "/modPending"}
          exact
          component={modPending}
        />
        <Route
          path={process.env.PUBLIC_URL + "/modRejected"}
          exact
          component={modRejected}
        />
        <Route
          path={process.env.PUBLIC_URL + "/modPurged"}
          exact
          component={modPurged}
        />
        <Route
          path={process.env.PUBLIC_URL + "/modApproved"}
          exact
          component={modApproved}
        />
        <Route
          path={process.env.PUBLIC_URL + "/TableRf23"}
          exact
          component={TableRf23}
        />
        <Route
          path={process.env.PUBLIC_URL + "/modDetailView"}
          exact
          component={modDetailView}
        />
        <Route
          path={process.env.PUBLIC_URL + "/itemElement"}
          exact
          component={itemElement}
        />
        <Route
          path={process.env.PUBLIC_URL + "/ApprovedRf24"}
          exact
          component={ApprovedRf24}
        />
        <Route
          path={process.env.PUBLIC_URL + "/PendingRf24"}
          exact
          component={PendingRf24}
        />
        <Route
          path={process.env.PUBLIC_URL + "/RejectedRf24"}
          exact
          component={RejectedRf24}
        />
      </div>
    );
  }
}

export default View;
