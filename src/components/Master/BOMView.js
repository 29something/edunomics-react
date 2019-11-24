import React, { Component } from 'react'
import "../Test/Test.css";
import { Link, NavLink } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../../services/url";
import Moment from "react-moment";
export class BOMView extends Component {
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
            `${API_URL}master/mix_view`,
            (axios.defaults.headers.common["x-access-token"] = tokenvalue)
          );
          console.log(response.data);
          if (response.data.success) {
            this.setState({ userdata: response.data.BOM_NAME });
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
                              View All Master
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
                                  {/* <div className="row">
                                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                      <div className="custom-btn-lists">
                                    <ButtonLink />
                                      </div>
                                      <hr />
                                    </div>
                                  </div> */}
                                  {/*new row */}
                                  <div className="row">
                                    
                                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                      <hr />
                                      <p>Master BOM - MIX DESIGN</p>
                                      <hr />
                                      <table className="table table-hover table-bordered ">
                                        <thead className="bg-info custom-thead-color">
                                        <tr>
                                            <th scope="col">Item Code</th>
                                            <th scope="col">Item Name</th>
                                            <th scope="col">FC Code</th>
                                            <th scope = "col">Qty</th>
                                            <th scope="col">Organization (Plant)</th>
                                            <th scope="col">Created On</th>
                                            <th scope = "col">Status</th>
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
                                                    <th>{item.ITEM_CODE}</th>
                                                    <th scope="row">{item.ITEM_NAME}</th>
                                                    <th scope="row">{item.FG_Code}</th>
                                                    <th scope="row">{item.QUANTITY}</th>
                                                    <th scope="row">{item.ORGANIZATION}</th>
                                                    <td>
                                                      No Data
                                                      {/* <Moment format="row">
                                                        {item.date||"no data"}
                                                      </Moment> */}
                                                    </td>
                                                    <th scope="row">{item.FG_CODE_STATUS}</th>
                                                    
                                                   
                                                  </tr>
                                                );
                                              }, this)
                                          ) : (
                                            <tr> <td colSpan="4"><center><span><div class="loading2"></div></span></center></td></tr>
                                          )}
                                        </tbody>
                                      </table>
                                      {/* <table class="table table-hover table-bordered">
  <thead className="bg-info custom-thead-color">
    <tr>
    <th scope="col">Item Code</th>
                              <th scope="col">Item Name</th>
                              <th scope="col">FC Code</th>
                              <th scope = "col">Qty</th>
                              <th scope="col">Organization (Plant)</th>
                              <th scope="col">Created On</th>
                              <th scope = "col">Status</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">1</th>
      <td>Mark</td>
      <td>Otto</td>
      <td>@mdo</td>
      <td>Mark</td>
      <td>Otto</td>

      <td>Status</td>
    </tr>
    <tr>
      <th scope="row">2</th>
      <td>Mark</td>
      <td>Otto</td>
      <td>@mdo</td>
      <td>Mark</td>
      <td>Otto</td>
     
      <td>Status</td>
    </tr>
    <tr>
      <th scope="row">3</th>
      <td>Mark</td>
      <td>Otto</td>
      <td>@mdo</td>
      <td>Mark</td>
      <td>Otto</td>
     
      <td>Status</td>
    </tr>
  </tbody>
</table> */}
                                     
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

export default BOMView
