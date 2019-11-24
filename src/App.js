import React, { Component } from "react";

import "./App.css";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Home from "./components/Home/Home";
import Sidebar from "./components/Sidebar/Sidebar";

import Signin from "./components/Login/AddLogin";
import Profile from "./components/Profile/Profile";
import ViewProfile from "./components/Profile/ViewProfile";

import { Route, Redirect } from "react-router-dom";

import PlantScale from "./components/Plant/PlantScale";


import { ViewAssets } from "./components/Assets/ViewAssets";
import { AssetType } from "./components/Assets/AssetType";
import { AssetPlant } from "./components/Assets/AssetPlant";
import { ViewAssetPlant } from "./components/Assets/ViewAssetPlant";

import { ComingSoon } from "./components/Test/ComingSoon";
import PrivateRoute from "./auth/privateRoute";
import PTORoute from "./auth/ptoRoute";


import { Add } from "./RF-Route/Add";
import { Verify } from "./RF-Route/verify";
import { View } from "./RF-Route/View";
import { DetailView } from "./RF-Route/DetailView";

import { Asset } from "./components/Test/Asset";
import { BOMView } from "./components/Master/BOMView";

import TwentyEightDays from "./components/CubeCasting/TwentyEightDays";
import SevenDays from "./components/CubeCasting/SevenDays";
import Table7 from "./components/CubeCasting/Table7";
import Complete from "./components/CubeCasting/Complete";
import { VIEW7 } from "./components/CubeCasting/VIEW7";
import VApproved from "./components/CubeCasting/VApproved";
import VRejected from "./components/CubeCasting/VRejected";

class App extends Component {
  constructor() {
    super();
    this.state = {
      route: "signin",
      isSignedIn: false
    };
  }

  onRouteChange = route => {
    if (route === "signout") {
      this.setState({ isSignedIn: false });
    } else if (route === "home") {
      this.setState({ isSignedIn: true });
    }
    this.setState({ route: route });
  };
  componentWillMount() {
    var that = this;
    setTimeout(function () {
      //that.show();
    }, that.props.wait);
  }

  render() {
    const { isSignedIn, route } = this.state;

    return (
      <div>
        {localStorage.getItem("token") ? (
          <div>
             <Header /> 
            <div isSignedIn={isSignedIn} onRouteChange={this.onRouteChange} />
            <Header />
            <Sidebar />
            <Route path={process.env.PUBLIC_URL + "/"} exact component={Home} />

            <Route
              path={process.env.PUBLIC_URL + "/Profile"}
              exact={true}
              component={Profile}
            />
            <Route
              path={process.env.PUBLIC_URL + "/ViewProfile"}
              exact={true}
              component={ViewProfile}
            />

            <Route
              path={process.env.PUBLIC_URL + "/PlantScale"}
              exact={true}
              component={PlantScale}
            />


            <Route
              path={process.env.PUBLIC_URL + "/Table7"}
              exact={true}
              component={Table7}
            />
            <Route
              path={process.env.PUBLIC_URL + "/SevenDays"}
              exact={true}
              component={SevenDays}
            />
            <Route
              path={process.env.PUBLIC_URL + "/TwentyEightDays"}
              exact={true}
              component={TwentyEightDays}
            />
            <Route
              path={process.env.PUBLIC_URL + "/Complete"}
              exact={true}
              component={Complete}
            />

            <Route
              path={process.env.PUBLIC_URL + "/VIEW7/:id"}
              exact={true}
              component={VIEW7}
            />

            <Route
              path={process.env.PUBLIC_URL + "/VApproved"}
              exact={true}
              component={VApproved}
            />

            <Route
              path={process.env.PUBLIC_URL + "/VRejected"}
              exact={true}
              component={VRejected}
            />

            <Route
              path={process.env.PUBLIC_URL + "/ViewAssets"}
              exact={true}
              component={ViewAssets}
            />
            <Route
              path={process.env.PUBLIC_URL + "/AssetType"}
              exact={true}
              component={AssetType}
            />
            <Route
              path={process.env.PUBLIC_URL + "/AssetPlant"}
              exact={true}
              component={AssetPlant}
            />
            <Route
              path={process.env.PUBLIC_URL + "/ViewAssetPlant"}
              exact={true}
              component={ViewAssetPlant}
            />

            <Route
              path={process.env.PUBLIC_URL + "/ComingSoon"}
              exact={true}
              component={ComingSoon}
            />

            
            <Route
              path={process.env.PUBLIC_URL + "/Asset"}
              exact={true}
              component={Asset}
            />
            
            <Route
              path={process.env.PUBLIC_URL + "/BOMView"}
              exact={true}
              component={BOMView}
            
            
            />

           
            
            <Add />
            <View />
            <Verify />
            <DetailView />

          </div>
        ) : route === "signin" ? (
          <Signin onRouteChange={this.onRouteChange} wait={1} />
        ) : (
              window.location.reload()
            ) 
}

        <Footer />
      </div>
    );
  }
}

export default App;
