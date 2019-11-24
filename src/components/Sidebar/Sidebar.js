import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Sidebar.css";
import axios from "axios";
import authService from "../../services/auth-service";
import axiosService from "../../services/axios-service";
import { API_URL } from "../../services/url";
class Sidebar extends Component {
  constructor() {
    super();
    this.state = {
      userdata: []
    };
  }
  componentDidMount() {
    //    this.handleClick();
  }
  handleClick() {
    axios
      .get(
        `${API_URL}profile/view`,
        (axios.defaults.headers.common["authorization"] =
          "Bearer " + authService.getToken())
      )
      .then(response => {
        const data = response.data.admindata;
        this.setState({ userdata: data });
      })
      .catch(error => {
        console.log(error.response);
      });
  }
  render() {
    return (
      <div className="skin-blue">
        <div className="left-sidebar">
          <div className="scroll-sidebar custom-scroll-sidebar-bg">
            <nav className="sidebar-nav">
              <ul id="sidebarnav">
                
                <li>
                  {localStorage.getItem("user_type") === "admin" ? (
                    <div>
                      <Link to={process.env.PUBLIC_URL + "/ZoneLoc"}>
                        {" "}
                        <li>
                          <a
                            className="waves-effect waves-dark"
                            href={"/ZoneLoc"}
                          >
                            <i
                              className="fa fa-area-chart"
                              aria-hidden="true"
                            />
                            &nbsp;&nbsp;
                            <span className="hide-menu">Location</span>
                          </a>
                        </li>
                      </Link>

                      <Link to={process.env.PUBLIC_URL + "/ViewEmployee"}>
                        {" "}
                        <li>
                          <a
                            className="waves-effect waves-dark"
                            href={"/ViewEmployee"}
                          >
                            <i className="fa fa-circle-o" aria-hidden="true" />
                            &nbsp;&nbsp;<span className="hide-menu">User</span>
                          </a>
                        </li>
                      </Link>

                      <Link to={process.env.PUBLIC_URL + "/ComingSoon"}>
                        {" "}
                        <li>
                          <a
                            className="waves-effect waves-dark"
                            href={"/ComingSoon"}
                          >
                            <i className="fa fa-building" aria-hidden="true" />
                            &nbsp;&nbsp;
                            <span className="hide-menu">IT Logs</span>
                          </a>
                        </li>
                      </Link>
                    </div>
                  ) : (
                      <div />
                    )}
                 
                  <hr />
                  <li>
                    <a
                      className="has-arrow waves-effect waves-dark"
                      href="#plant"
                      data-toggle="collapse"
                      data-target="#plant"
                    >
                      <i className="fas fa-swatchbook" aria-hidden="true" />
                      &nbsp;&nbsp;
                      <span className="hide-menu">Plant &amp; Lab</span>
                    </a>
                    <ul aria-expanded="false" className="collapse" id="plant">
                      <Link to={process.env.PUBLIC_URL + "/ViewAssets"}>
                        <li>
                          <i
                            className="fas fa-drafting-compass"
                            aria-hidden="true"
                          />
                          &nbsp;&nbsp;Asset
                        </li>
                      </Link>
                      {localStorage.getItem("user_type") === "admin" ? (
                        <div>
                          <Link to={process.env.PUBLIC_URL + "/ViewAssetType"}>
                            <li>
                              <i
                                className="fas fa-drafting-compass"
                                aria-hidden="true"
                              />
                              &nbsp;&nbsp;Asset Type
                            </li>
                          </Link>{" "}
                        </div>
                      ) : (
                          <div />
                        )}
                      <Link to={process.env.PUBLIC_URL + "/TableRf1"}>
                        <li>
                          <i className="fa fa-check" aria-hidden="true" />
                          &nbsp;&nbsp;Audit Of Equipment
                        </li>
                      </Link>
                     

                      <Link to={process.env.PUBLIC_URL + "/PlantScale"}>
                        <li>
                          <i
                            className="fas fa-balance-scale"
                            aria-hidden="true"
                          />
                          &nbsp;&nbsp;Plant Scale check
                        </li>
                      </Link>
                      <Link to={process.env.PUBLIC_URL + "/SlumpCone"}>
                        <li>
                          <i className="fas fa-tools" aria-hidden="true" />
                          &nbsp;&nbsp;Replace Repair Remove
                        </li>
                      </Link>
                    </ul>
                  </li>
                  
                  <li>
                    <a
                      className="has-arrow waves-effect waves-dark"
                      href="#rmx"
                      data-toggle="collapse"
                      data-target="#rmx"
                    >
                      <i className="fas fa-radiation" aria-hidden="true" />
                      &nbsp;&nbsp;
                      <span className="hide-menu">RMX</span>
                    </a>
                    <ul aria-expanded="false" className="collapse" id="rmx">
                      <Link to={process.env.PUBLIC_URL + "/Table7"}>
                        <li>
                          <i className="fa fa-cube" aria-hidden="true" />
                          &nbsp;&nbsp;Cube Casting
                        </li>
                      </Link>
                      <Link to={process.env.PUBLIC_URL + "/TableRf8"}>
                        <li>
                          <i className="fa fa-random" aria-hidden="true" />
                          &nbsp;&nbsp;Bulk Yield
                        </li>
                      </Link>
                      <Link to={process.env.PUBLIC_URL + "/TableRf21"}>
                        <li>
                          <i className="fas fa-history" aria-hidden="true" />
                          &nbsp;&nbsp;Settling Time
                        </li>
                      </Link>
                      <Link to={process.env.PUBLIC_URL + "/TableRf23"}>
                        <li>
                          <i className="fas fa-award" aria-hidden="true" />
                          &nbsp;&nbsp;Test Certificate
                        </li>
                      </Link>
                      <Link to={process.env.PUBLIC_URL + "/PendingRf24"}>
                        <li>
                          <i className="fas fa-award" aria-hidden="true" />
                          &nbsp;&nbsp;Trialmixt Certificate
                        </li>
                      </Link>
                      <Link to={process.env.PUBLIC_URL + "/ComingSoon"}>
                        <li>
                          <i className="fas fa-award" aria-hidden="true" />
                          &nbsp;&nbsp;Mix Design Certificate.
                        </li>
                      </Link>
                      <Link to={process.env.PUBLIC_URL + "/ComingSoon"}>
                        <li>
                          <i className="fas fa-id-badge" aria-hidden="true" />
                          &nbsp;&nbsp;Design Report
                        </li>
                      </Link>
                    </ul>
                  </li>
                 
                  <li>
                    <a
                      className="has-arrow waves-effect waves-dark"
                      href="#master"
                      data-toggle="collapse"
                      data-target="#master"
                    >
                      <i className="fas fa-user-shield" aria-hidden="true" />
                      &nbsp;&nbsp;
                      <span className="hide-menu"> List</span>
                    </a>
                    <ul aria-expanded="false" className="collapse" id="master">
                     
                      <Link to={process.env.PUBLIC_URL + "/modPending"}>
                        <li>
                          <i className="fas fa-tasks" aria-hidden="true" />
                          &nbsp;&nbsp; Plant Mix Management
                        </li>
                      </Link>

                    </ul>
                  </li>


                </li>

                          
                        
              </ul>
            </nav>
          </div>
        </div>
      </div>
    );
  }
}

export default Sidebar;
