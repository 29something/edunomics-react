import React, { Component } from 'react'
import {Link, NavLink} from 'react-router-dom'
import axios from "axios";
import authService from "../../../services/auth-service";
import axiosService from "../../../services/axios-service";
import { API_URL } from "../../../services/url";
import Moment from "react-moment";
export class VerifiedRF1 extends Component {
    constructor() {
        super();
        this.state = {
          userdata: [],
          detailsdata: []
        };
        this.handleCheck = this.handleCheck.bind(this);
        this.detailCheck = this.detailCheck.bind(this);
      }
      handleCheck(item) {
        console.log(item.zone_id);
        let sitemeet = item.zone_id;
        fetch(`zone/delete?id=${sitemeet}`, {
          method: "GET",
          headers: {
            //  'Authorization': 'Bearer ' + this.state.token,
            "Content-Type": "application/json"
          }
        })
          .then(function(response) {
            return response.json();
          })
          .then(function(json) {
            if (json.success === true) {
              //   console.log(json);
              alert("Zone has been deleted PLEASE REFRESH THE PAGE");
              //window.location.reload()
              this.handleClick();
            } else {
              console.log(json);
            }
          });
      }
      detailCheck(item) {
        console.log(item.id);
       // console.log("value", tokenvalue);
        // try {
        //   const response = await axios.get(
        //     `${API_URL}rf_form/pending/rf_13`,
        //     (axios.defaults.headers.common["x-access-token"] = tokenvalue)
        //   );
    
        //   const rf14response = await axios.get(
        //     `${API_URL}rf_form/pending/rf_14`,
        //     (axios.defaults.headers.common["x-access-token"] = tokenvalue)
        //   );
    
        //   console.log(response.data);
        //   console.log("rf-14 data", rf14response.data);
        //   console.log(response);
        //   console.log("rf14response", rf14response);
        //   if (response.status === 200) {
        //     this.setState({ userdata: response.data, rf14data: rf14response.data });
        //   }
        // } catch (error) {
        //   console.log(error);
        // }
      }
    
      async componentDidMount() {
        await this.handleClick();
      }
      async handleClick() {
        let tokenvalue = localStorage.getItem("token");
        console.log("value", tokenvalue);
        try {
          const response = await axios.get(
            `${API_URL}rf_form/pending/rf_3`,
            (axios.defaults.headers.common["x-access-token"] = tokenvalue)
          );
          console.log(response.data);
          if (response.status === 200) {
            this.setState({ userdata: response.data });
          }
        } catch (error) {
          console.log(error);
        }
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
                              View All Test
                            </li>
                          </ol>
                        </nav>
                      </div>
                    </div>
                  </div>
                  <div className="custom-table-here custom-buttons">
                    <div className="">
                      <div className="container">
                        <div className="row">
                          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                            {/* details modal here */}
                            <div className="product-form-upper">
                              <div className="">
                                <div className="">
                                  <div className="row">
                                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                     {/* <ButtonLink /> */}
                                      <hr />
                                    </div>
                                  </div>
                                  {/*new row */}
                                  <div className="row">
                                  <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                                      <NavLink to="TableRf1">
                                        {" "}
                                        <button
                                          className="btn btn-info"
                                          style={{ float: "left" }}
                                        >
                                          View Pending
                                        </button>
                                      </NavLink>
                                    </div>
                                    <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                                      {localStorage.getItem('user_type') === 'plant technical officer' && <NavLink to="Audits">
                                        {" "}
                                        <button
                                          className="btn btn-info"
                                          style={{ float: "right" }}
                                        >
                                          Add Data
                                        </button>
                                      </NavLink>}
                                    </div>
                                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                      <hr />
                                      <p>Equipment Record</p>
                                      <hr />
                                      <table className="table table-hover table-bordered ">
                                        <thead className="bg-info custom-thead-color">
                                          <tr>
                                            <th scope="col">Entry No.</th>
                                            <th scope="col">User</th>
                                            <th scope="col">Submit Date</th>
                                            <th scope="col">Action</th>
                                          </tr>
                                        </thead>
                                        <tbody>
                                          {this.state.userdata.length ? (
                                            this.state.userdata
                                              .map(function(item, id) {
                                                return (
                                                  <tr
                                                    key={id}
                                                    onClick={this.detailCheck.bind(
                                                      this,
                                                      item
                                                    )}
                                                  >
                                                    <th>{item.id}</th>
                                                    <th scope="row">{item.user}</th>
                                                    <td>
                                                      <Moment format="LL">
                                                        {item.submit_date}
                                                      </Moment>
                                                    </td>
                                                    <td>
                                                    <Link to={process.env.PUBLIC_URL + `/ViewRf21/${item.id}`}><button  className="btn btn-success custom-edit-btn btn-sm" ><i class="fa fa-trash-o" aria-hidden="true"></i>&nbsp;&nbsp;View</button></Link>
                                                      {localStorage.getItem('user_type') === 'quality incharge' && <Link to={process.env.PUBLIC_URL + `/VerifyRF21/${item.id}`}><button className="btn btn-warning custom-edit-btn btn-sm"><i class="fa fa-pencil" aria-hidden="true"></i>&nbsp; &nbsp; Verify</button></Link>}
                                                      {/* <button  className="btn btn-danger custom-edit-btn btn-sm" onClick={this.handleCheck.bind(this, item)}><i class="fa fa-trash-o" aria-hidden="true"></i>&nbsp;&nbsp;Delete</button>
              <button className="btn btn-success custom-edit-btn btn-sm" onClick={this.detailCheck.bind(this, item)} data-toggle="modal" data-target=".bd-example-modal-lg"><i class="fa fa-eye" aria-hidden="true"></i>&nbsp; &nbsp; Details</button>
              */}
                                                    </td>
                                                  </tr>
                                                );
                                              }, this).reverse()
                                          ) : (
                                            <span>Data is loading....</span>
                                          )}
                                        </tbody>
                                      </table>
                                    </div>
                                  </div>
                                  {/*end new row */}
                                </div>
                              </div>
                            </div>
                          </div>
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

export default VerifiedRF1
