import React, { Component } from "react";
import "./Header.css";
import { Link, Redirect, withRouter } from "react-router-dom";
import axios from "axios";
import authService from "../../services/auth-service";
import axiosService from "../../services/axios-service";
import { API_URL } from "../../services/url";
class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userdata: []
    };
    this.onLogout = this.onLogout.bind(this);
  }
  componentDidMount() {
    //  this.handleClick();
  }
  //   handleClick () {
  //       axios.get(`${API_URL}profile/view`,axios.defaults.headers.common['authorization'] = 'Bearer ' +	authService.getToken())
  //       .then(response => {
  //           //console.log(response)
  //             //  console.log(response.data.admindata);
  //               const data = response.data.admindata;
  //               this.setState({ userdata : data })
  //               })
  //               .catch(error => {
  //               console.log(error.response);
  //               })
  //           }
  onLogout = e => {
    e.preventDefault(); // prevent page transition
    // localStorage.removeItem('token');
    localStorage.clear();
    // localStorage.removeItem('site_name')
    // localStorage.removeItem('site_id')
    // localStorage.removeItem('company_name')
    console.log("hi" + this.props);
    //  this.props.onRouteChange('signout')
    this.props.history.push("/");
    //console.log(this.props)
    //this.props.history.push('/')
    //   window.location.reload() // stay at the same url
  };
  render() {
    if (localStorage.getItem("token")) {
      return (
        <div className="skin-blue fixed-layout">
          <header className="topbar custom-topbar-bg">
            <nav className="navbar top-navbar navbar-expand-md navbar-dark custom-navbar-bg-here">
              <div className="navbar-header">
                <Link to={process.env.PUBLIC_URL + "/"}>
                  <a className="navbar-brand" href={"/"}>
                    <b>
                      <i className="wi wi-sunset" />
                      {/* <h3 style={{ color: "#8d97ad" }}>RDC</h3> */}
                      <img
                        src={require("../../images/eliteadmin-small-text.png")}
                        className="img-fluid rdc-logo"
                      />
                    </b>
                  </a>
                </Link>
              </div>

              <div className="navbar-collapse custom-navbar-bg">
                <ul className="navbar-nav mr-auto">
                  <li className="nav-item">
                    <a
                      className="nav-link nav-toggler d-block d-sm-none waves-effect waves-dark"
                      href="javascript:void(0)"
                    >
                      <i className="fa fa-bars" aria-hidden="true" />
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      className="nav-link sidebartoggler d-none d-lg-block d-md-block d-sm-block waves-effect waves-dark"
                      href="javascript:void(0)"
                    >
                      <i className="fa fa-bars" aria-hidden="true" />
                    </a>{" "}
                  </li>
                </ul>

                <ul className="navbar-nav my-lg-0">
                  {/* <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle waves-effect waves-dark" href="" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> <i className="fa fa-envelope-o" aria-hidden="true"></i>
                                <div className="notify"> <span className="heartbit"></span> <span className="point"></span> </div>
                            </a>
                            <div className="dropdown-menu dropdown-menu-right mailbox animated bounceInDown">
                                <ul>
                                    <li>
                                        <div className="drop-title">Notifications</div>
                                    </li>
                                    <li>
                                        <div className="message-center">
                                       
                                            <a href="javascript:void(0)">
                                                <div className="btn btn-danger btn-circle"><i className="fa fa-link"></i></div>
                                                <div className="mail-contnet">
                                                    <h5>Luanch Admin</h5> <span className="mail-desc">Just see the my new admin!</span> <span className="time">9:30 AM</span> </div>
                                            </a>
                                          
                                            <a href="javascript:void(0)">
                                                <div className="btn btn-success btn-circle"><i className="fa fa-calendar" aria-hidden="true"></i></div>
                                                <div className="mail-contnet">
                                                    <h5>Event today</h5> <span className="mail-desc">Just a reminder that you have event</span> <span className="time">9:10 AM</span> </div>
                                            </a>
                                           
                                            <a href="javascript:void(0)">
                                                <div className="btn btn-info btn-circle"><i className="ti-settings"></i></div>
                                                <div className="mail-contnet">
                                                    <h5>Settings</h5> <span className="mail-desc">You can customize this template as you want</span> <span className="time">9:08 AM</span> </div>
                                            </a>
                                           
                                            <a href="javascript:void(0)">
                                                <div className="btn btn-primary btn-circle"><i className="ti-user"></i></div>
                                                <div className="mail-contnet">
                                                    <h5>Pavan kumar</h5> <span className="mail-desc">Just see the my admin!</span> <span className="time">9:02 AM</span> </div>
                                            </a>
                                        </div>
                                    </li>
                                    <li>
                                        <a className="nav-link text-center link" href="javascript:void(0);"> <strong>Check all notifications</strong> <i className="fa fa-angle-right"></i> </a>
                                    </li>
                                </ul>
                            </div>
                        </li> */}

                  <li className="nav-item dropdown">
                    <a
                      className="nav-link dropdown-toggle waves-effect waves-dark"
                      href=""
                      id="2"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      {" "}
                      <i
                        className="fa fa-bell fa-1x text-white"
                        aria-hidden="true"
                      />
                      {/* <i class="fa fa-bell" />
                      <span class="badge badge-warning">4</span> */}
                      <div className="notify">
                        {" "}
                        <span className="heartbit" /> <span className="point" />{" "}
                      </div>
                    </a>
                    <div
                      className="dropdown-menu mailbox dropdown-menu-right animated bounceInDown"
                      aria-labelledby="2"
                    >
                      <ul>
                        <li>
                          <div className="drop-title">
                            You have 4 new Notification
                          </div>
                        </li>
                        <li>
                          <div className="message-center">
                            <a href="javascript:void(0)">
                              <div className="user-img">
                                {" "}
                                <img
                                  src={require("../../assets/images/users/1.jpg")}
                                  alt="user"
                                  className="img-circle"
                                />{" "}
                                <span className="profile-status online pull-right" />{" "}
                              </div>
                              <div className="mail-contnet">
                                <h5>Pavan kumar</h5>{" "}
                                <span className="mail-desc">
                                  Just see the my admin!
                                </span>{" "}
                                <span className="time">9:30 AM</span>{" "}
                              </div>
                            </a>

                            <a href="javascript:void(0)">
                              <div className="user-img">
                                {" "}
                                <img
                                  src={require("../../assets/images/users/2.jpg")}
                                  alt="user"
                                  className="img-circle"
                                />{" "}
                                <span className="profile-status busy pull-right" />{" "}
                              </div>
                              <div className="mail-contnet">
                                <h5>Sonu Nigam</h5>{" "}
                                <span className="mail-desc">
                                  I've sung a song! See you at
                                </span>{" "}
                                <span className="time">9:10 AM</span>{" "}
                              </div>
                            </a>

                            <a href="javascript:void(0)">
                              <div className="user-img">
                                {" "}
                                <img
                                  src={require("../../assets/images/users/3.jpg")}
                                  alt="user"
                                  className="img-circle"
                                />{" "}
                                <span className="profile-status away pull-right" />{" "}
                              </div>
                              <div className="mail-contnet">
                                <h5>Arijit Sinh</h5>{" "}
                                <span className="mail-desc">
                                  I am a singer!
                                </span>{" "}
                                <span className="time">9:08 AM</span>{" "}
                              </div>
                            </a>

                            <a href="javascript:void(0)">
                              <div className="user-img">
                                {" "}
                                <img
                                  src={require("../../assets/images/users/4.jpg")}
                                  alt="user"
                                  className="img-circle"
                                />{" "}
                                <span className="profile-status offline pull-right" />{" "}
                              </div>
                              <div className="mail-contnet">
                                <h5>Pavan kumar</h5>{" "}
                                <span className="mail-desc">
                                  Just see the my admin!
                                </span>{" "}
                                <span className="time">9:02 AM</span>{" "}
                              </div>
                            </a>
                          </div>
                        </li>
                        <li>
                          <a
                            className="nav-link text-center link"
                            href="javascript:void(0);"
                          >
                            {" "}
                            <strong>See all e-Mails</strong>{" "}
                            <i className="fa fa-angle-right" />{" "}
                          </a>
                        </li>
                      </ul>
                    </div>
                  </li>

                  {/*test */}
                  <li className="nav-item dropdown">
                    <a
                      className="nav-link dropdown-toggle waves-effect waves-dark"
                      href=""
                      id="2"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      {" "}
                      <i
                        className="fa fa-user-circle fa-1x text-white"
                        aria-hidden="true"
                      />
                      {/* <div className="notify">
                        {" "}
                        <span className="heartbit" /> <span className="point" />{" "}
                      </div> */}
                    </a>
                    <div
                      className="dropdown-menu mailbox dropdown-menu-right animated bounceInDown"
                      aria-labelledby="2"
                    >
                      <ul>
                        <li>
                          <div className="message-center">
                            <Link to={process.env.PUBLIC_URL + "/ViewProfile"}>
                              <a
                                href="javascript:void(0)"
                                className="dropdown-item"
                              >
                                <i className="ti-user" /> My Profile
                              </a>
                            </Link>

                            <Link to={process.env.PUBLIC_URL + "#"}>
                              <a
                                href="javascript:void(0)"
                                className="dropdown-item"
                              >
                                <i className="ti-user" /> Plant Master
                              </a>
                            </Link>

                            <a
                              href="javascript:void(0)"
                              className="dropdown-item"
                              onClick={e => this.onLogout(e)}
                            >
                              <i className="ti-settings" /> Log Out
                            </a>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </li>
                  {/*end test */}

                  <li className="nav-item dropdown u-pro">
                    {this.state.userdata ? (
                      this.state.userdata.map(function(item, id) {
                        return (
                          <a
                            className="nav-link dropdown-toggle waves-effect waves-dark profile-pic"
                            href=""
                            data-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="false"
                          >
                            <img
                              src={require("../../assets/images/29.png")}
                              className="img-fluid"
                            />
                            &nbsp;
                            <span className="hidden-md-down" key={id}>
                              {item.adminname} &nbsp;
                              <i className="fa fa-angle-down" />
                            </span>{" "}
                          </a>
                        );
                      }, this)
                    ) : (
                      <span>John Doe</span>
                    )}
                    <div className="dropdown-menu dropdown-menu-right animated flipInY">
                      {/* <Link to={process.env.PUBLIC_URL + "/ViewProfile"}>
                        <a href="javascript:void(0)" className="dropdown-item">
                          <i className="ti-user" /> My Profile
                        </a>
                      </Link> */}

                      <a href="javascript:void(0)" className="dropdown-item">
                        <i className="ti-user" /> Notification{" "}
                        <span class="badge badge-light">4</span>
                      </a>

                      <a
                        href="javascript:void(0)"
                        className="dropdown-item"
                        onClick={e => this.onLogout(e)}
                      >
                        <i className="ti-settings" /> Log Out
                      </a>

                      <div className="dropdown-divider" />

                      {/* <a onClick={() => onRouteChange('signout')} className="dropdown-item"><i className="fa fa-power-off"></i> Logout</a> */}
                    </div>
                    {/* <button type="button" className="btn btn-info logout-btn" onClick = {e => this.onLogout(e)}>LOG OUT</button> */}
                  </li>

                  <li className="nav-item right-side-toggle">
                    {" "}
                    <a
                      className="nav-link  waves-effect waves-light"
                      href="javascript:void(0)"
                    >
                      <i className="ti-settings" />
                    </a>
                  </li>
                  {/* <li className="nav-item dropdown">
                    {this.state.userdata ? (
                      this.state.userdata.map(function(item, id) {
                        return (
                          <a
                            className="nav-link dropdown-toggle waves-effect waves-dark profile-pic"
                            href=""
                            data-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="false"
                          >
                            <img
                              src={require("../../assets/images/29.png")}
                              className="img-fluid"
                            />
                            &nbsp;
                            <span className="hidden-md-down" key={id}>
                              {item.adminname} &nbsp;
                              <i className="fa fa-angle-down" />
                            </span>{" "}
                          </a>
                        );
                      }, this)
                    ) : (
                      <span>John Doe</span>
                    )}
                    
                    <button type="button" className="btn btn-info logout-btn" onClick = {e => this.onLogout(e)}>LOG OUT</button>
                  
                  </li> */}

                  {/* <li className="nav-item right-side-toggle">
                    {" "}
                    <a
                      className="nav-link  waves-effect waves-light"
                      href="javascript:void(0)"
                    >
                      <i className="ti-settings" />
                    </a>
                  </li> */}
                </ul>
              </div>
            </nav>
          </header>
        </div>
      );
    } else {
      return <div />;
    }
  }
}

export default withRouter(Header);
