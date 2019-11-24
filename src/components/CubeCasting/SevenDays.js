import React, { Component } from "react";
import { Link, Redirect, withRouter, NavLink } from "react-router-dom";
import axios from "axios";
import authService from "../../services/auth-service";
import axiosService from "../../services/axios-service";
import { API_URL } from "../../services/url";
export class SevenDays extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userdata: []
    };
    this.onSubmit = this.onSubmit.bind(this);
  }

  change = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  componentWillMount = () => {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!
    var yyyy = today.getFullYear();

    if (dd < 10) {
      dd = "0" + dd;
    }

    if (mm < 10) {
      mm = "0" + mm;
    }

    today = mm + "/" + dd + "/" + yyyy;
    console.log("date here", today);
    this.state.date = today;
    console.log(this.state.date);
  };

  getWebsite = () => {
    fetch("/").then(console.log(this.state));
  };
  async onSubmit(event) {
    event.preventDefault();
    console.log(this.state);
    try {
      const response = await axios.post(
        `${API_URL}zone/add`,
        this.state,
        (axios.defaults.headers.common["authorization"] =
          "Bearer " + authService.getToken())
      );
      console.log(response);
      //   .then(console.log(this.state));

      //   if (response.data.success) {
      //     alert(response.data.msg);
      //     this.props.history.push("/ZoneLoc");
      //   } else {
      //     alert(response.data.msg);
      //   }
    } catch (error) {
      console.log(error);
    }
  }

  async componentDidMount() {
    let tokenvalue = localStorage.getItem("token");
    // console.log("value", tokenvalue);
    const response = await axios.get(
      `${API_URL}cube/view_inc_rf7/7Days`,
      (axios.defaults.headers.common["x-access-token"] = tokenvalue)
    );
    console.log(response.data);
    if (response.status === 200) {
      this.setState({ userdata: response.data });
      console.log(this.state.userdata);
    }
  }
  render() {
    return (
      <React.Fragment>
        <div className="skin-blue fixed-layout">
          <div className="page-wrapper">
            <div className="container-fluid">
              <div className="row page-titles">
                <div className="col-md-5 align-self-center">
                  {/* <h4 className="text-themecolor">Forms</h4> */}
                  <nav aria-label="breadcrumb">
                    <ol class="breadcrumb">
                      <li className="breadcrumb-item">
                        <Link to={process.env.PUBLIC_URL + "/"}>Home</Link>
                      </li>
                      <li
                        className="breadcrumb-item active"
                        aria-current="page"
                      >
                        Add Test
                      </li>
                    </ol>
                  </nav>
                </div>
              </div>
            </div>

            {/*Form content begin */}

            <div className="product-form-upper">
              <div className="container-fluid">
                <div className="below-custom-form">
                  <form className="custom-content-form">
                    <div className="row">
                      <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                        <hr />
                      </div>
                    </div>
                    <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                      <NavLink to="VApproved">
                        {" "}
                        <button class="btn btn-info float-left">
                          View Approved
                        </button>
                      </NavLink>
                      <NavLink to="VRejected">
                        {" "}
                        <button class="btn btn-info float-right">
                          View Rejected
                        </button>
                      </NavLink>
                    </div>
                    <hr style={{ marginTop: "3rem", marginBottom: "-1rem" }} />
                    <div className="row">
                      <hr />
                    </div>
                    <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                      <div class="row">
                        <div class="col-lg-3 col-md-3 col-sm-12 col-xs-12">
                          <NavLink to="Table7">
                            {" "}
                            <button class="btn btn-info">
                              Newly Cube Casted
                            </button>
                          </NavLink>
                        </div>
                        <div class="col-lg-3 col-md-3 col-sm-12 col-xs-12">
                          <NavLink to="SevenDays">
                            {" "}
                            <button class="btn btn-info">7 Days</button>
                          </NavLink>
                        </div>
                        <div class="col-lg-3 col-md-3 col-sm-12 col-xs-12">
                          <NavLink to="TwentyEightDays">
                            {" "}
                            <button class="btn btn-info">28 Days</button>
                          </NavLink>
                        </div>
                        <div class="col-lg-3 col-md-3 col-sm-12 col-xs-12">
                          <NavLink to="Complete">
                            {" "}
                            <button class="btn btn-info float-right">
                              Completed
                            </button>
                          </NavLink>
                        </div>
                      </div>
                    </div>

                    <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                      <hr />
                      <p>RF - 07</p>
                      <hr />
                      <br />
                      <h4 style={{ fontWeight: 800 }}>
                        <strong>List of 7 Days Tests</strong>
                      </h4>
                      <table class="table table-hover table-bordered ">
                        <thead class="bg-info custom-thead-color">
                          <tr>
                            <th scope="col">Entry No.</th>
                            <th scope="col">Batch No.</th>
                            <th scope="col">Customer Name</th>
                            <th scope="col">Plant Name</th>
                            <th scope="col">FT Name</th>
                            <th scope="col">Date</th>
                            <th scope="col">Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {this.state.userdata.length > 0 ? (
                            this.state.userdata.map((item, id) => {
                              return (
                                <tr key={id}>
                                  <td>{item.id}</td>
                                  <td>{item.BATCH_NUMBER}</td>
                                  <td>{item.CUSTOMER_NAME}</td>
                                  <td>{item.plant_name}</td>
                                  <td>{item.ft_name}</td>
                                  <td>{item.submit_date}</td>
                                  <td>
                                    <Link
                                      to={
                                        process.env.PUBLIC_URL +
                                        `/VIEW7/${item.id}`
                                      }
                                    >
                                      <button class="btn btn-success custom-edit-btn btn-sm">
                                        <i
                                          class="fa fa-eye"
                                          aria-hidden="true"
                                        ></i>
                                        &nbsp;&nbsp;View
                                      </button>
                                    </Link>
                                  </td>
                                </tr>
                              );
                            })
                          ) : (
                            <span>data loading....</span>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default SevenDays;
