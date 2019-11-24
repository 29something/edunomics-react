import React, { Component } from 'react'
import { Route } from 'react-router-dom'

import { SlumpCone } from '../components/RF - Form/RF-02/RF2'
import { ConcreteMoulds } from '../components/RF - Form/RF - 03/RF3'
import { Ambient } from '../components/RF - Form/RF - 04/RF4'
import { Audits } from '../components/RF - Form/RF - 01/RF1'
import { RF8 } from '../components/RF - Form/RF - 08/RF8'
import PTORoute from '../auth/ptoRoute'
import RF21 from '../components/RF - Form/RF - 21/RF21'
import { RF7 } from '../components/RF - Form/RF - 07/RF7'

import { RF24 } from '../components/RF - Form/RF - 24/RF24'
import { modUpdate } from '../components/mod/modUpdate'
import { modCreate } from '../components//mod/modCreate'

export class Add extends Component {
  render() {
    return (
      <div>

        <PTORoute
          path={process.env.PUBLIC_URL + '/SlumpCone'}
          exact={true}
          component={SlumpCone}
        />
        <PTORoute
          path={process.env.PUBLIC_URL + '/ConcreteMoulds'}
          exact={true}
          component={ConcreteMoulds}
        />
        <PTORoute
          path={process.env.PUBLIC_URL + '/Ambient'}
          exact={true}
          component={Ambient}
        />
        <PTORoute
          path={process.env.PUBLIC_URL + '/Audits'}
          exact={true}
          component={Audits}
        />
        <PTORoute
          path={process.env.PUBLIC_URL + '/RF8'}
          exact={true}
          component={RF8}
        />
        <PTORoute
          path={process.env.PUBLIC_URL + '/RF21'}
          exact={true}
          component={RF21}
        />
        <PTORoute
          path={process.env.PUBLIC_URL + '/RF7'}
          exact={true}
          component={RF7}
        />
    
        <PTORoute
          path={process.env.PUBLIC_URL + '/RF24'}
          exact={true}
          component={RF24}
        />
        <PTORoute
          path={process.env.PUBLIC_URL + '/modUpdate'}
          exact
          component={modUpdate}
        />
        <PTORoute
          path={process.env.PUBLIC_URL + '/modCreate'}
          exact
          component={modCreate}
        />
      </div>
    );
  }
}

export default Add;
