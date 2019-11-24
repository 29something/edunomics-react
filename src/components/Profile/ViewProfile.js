import React, { Component } from "react";
import "./Profile.css";
import { Link } from "react-router-dom";
import axios from "axios";
import authService from "../../services/auth-service";
import axiosService from "../../services/axios-service";
import { API_URL } from "../../services/url";

class ViewProfile extends Component {
  constructor() {
    super();
    this.state = {
      userdata: [],
      name: "",
      email: "",
      contact: "",
      role: ""
    };
  }

  componentDidMount() {
    this.handleClick();
  }
  handleClick() {
    let tokenvalue = localStorage.getItem("token");
    console.log(tokenvalue);
    axios
      .get(
        `${API_URL}employee/profile`,
        (axios.defaults.headers.common["x-access-token"] = tokenvalue)
      )
      .then(async response => {
        console.log(response.data.user_data.name);
        const admindetail = response.data.user_data;

        await this.setState({
          name: response.data.user_data.name,
          email: response.data.user_data.email_id,
          contact: response.data.user_data.contact_number,
          role: response.data.user_data.role_detail
        });
        console.log(this.state.userdata);
        // this.parseJSON(this.state)
      });
  }
  render() {
    return (
      <React.Fragment>
        <div>
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
                          View Profile
                        </li>
                      </ol>
                    </nav>
                  </div>
                </div>
              </div>
              <div className="custom-table-here">
                <div className="container">
                  <div className="row">
                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                      <table className="table table-hover table-bordered ">
                        <thead className="bg-info custom-thead-color">
                          <tr>
                            <th scope="col">Name</th>
                            <th scope="col">Email</th>
                            <th scope="col">Contact</th>
                            <th scope="col">Role</th>
                          </tr>
                        </thead>
                        <tbody>
                                <tr>
                                  <th scope="row">{this.state.name}</th>
                                  <td>{this.state.email}</td>
                                  <td>{this.state.contact}</td>
                                  <td>{this.state.role}</td>
                                </tr>
                             
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default ViewProfile;
