import React, { Component } from "react";
import { Route } from "react-router-dom";
import VerifyRf22 from "../components/Verify/VerifyRf22";

import QICRoute from "../auth/qicRoute";
import { verifyRF26 } from "../components/RF - Form/RF - 26/verifyRF26";
import { VerifyRF8 } from "../components/RF - Form/RF - 08/VerifyRF8";
import { VerifyRF21 } from "../components/RF - Form/RF - 21/VerifyRF21";
import { VerifyRF3 } from "../components/RF - Form/RF - 03/VerifyRF3";
import { VerifyRF2 } from "../components/RF - Form/RF-02/VerifyRF2";
import { VerifyRF27 } from "../components/RF - Form/RF - 26/VerifyRF27";
export class Verify extends Component {
  render() {
    return (
      <div>
        
         <QICRoute
          path={process.env.PUBLIC_URL + "/VerifyRf22/:id"}
          exact={true}
          component={VerifyRf22}
        />
        
         <QICRoute
          path={process.env.PUBLIC_URL + "/VerifyRF26/:id"}
          exact={true}
          component={verifyRF26}
        />
       
       <QICRoute
          path={process.env.PUBLIC_URL + "/VerifyRF8/:id"}
          exact={true}
          component={VerifyRF8}
        />
        <QICRoute
          path={process.env.PUBLIC_URL + "/VerifyRF21/:id"}
          exact={true}
          component={VerifyRF21}
        />
          <QICRoute
          path={process.env.PUBLIC_URL + "/VerifyRF3/:id"}
          exact={true}
          component={VerifyRF3}
        />
        <QICRoute
          path={process.env.PUBLIC_URL + "/VerifyRF2/:id"}
          exact={true}
          component={VerifyRF2}
        />
          <QICRoute
          path={process.env.PUBLIC_URL + "/VerifyRF27/:id"}
          exact={true}
          component={VerifyRF27}
        />
      </div>
    );
  }
}

export default Verify;
