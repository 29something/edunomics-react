import React, { Component } from 'react'
import { Link, Redirect, withRouter, NavLink } from "react-router-dom";
import "../../Test/Test.css";
import axios from "axios";
import authService from "../../../services/auth-service";
import axiosService from "../../../services/axios-service";
import { API_URL } from "../../../services/url";
import SimpleReactValidator from "simple-react-validator";
import { RfButtonLink } from '../RfButtonLink';
import { SuccessModal } from '../../Test/SuccessModal';
export class Ambient extends Component {
    constructor(props) {
        super(props);
        this.state = {
          btnstatus : false,
          supplier: "",
          source: "",
          plant: "",
          date: "",
         date_1  : "",
         ambient_day1  :"",
         ambient_night1 : "",
         normal_day1 : "",
         normal_night1 : "",
          remarks: ""
        };
        this.onSubmit = this.onSubmit.bind(this);
        this.validator = new SimpleReactValidator();
      }
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
      openModal() {
        this.setState({
            visible : true
        });
    }
    
      closeModal() {
        this.setState({
            visible : false
        });
      }
      change = e => {
        this.setState({
          [e.target.name]: e.target.value
        });
      };
      getWebsite = () => {
        fetch("/").then(console.log(this.state));
      };
      async onSubmit(event) {
        event.preventDefault();
        console.log(this.state);
        let dat = this.state.date;
        let yourdate = dat.split("/").reverse();
        let tmp = yourdate[2];
        yourdate[2] = yourdate[1];
        yourdate[1] = tmp;
        yourdate = yourdate.join("-");
        if (this.validator.allValid()) {
          let tokenvalue = localStorage.getItem("token");
          let body = {
            plant: localStorage.getItem("plant_name"),
            date: yourdate,
             
            // date_1  : this.state.date_1,
            temp_amb_d  :this.state.ambient_day1,
            temp_amb_n : this.state.ambient_night1,
            temp_tank_d : this.state.normal_day1,
            temp_tank_n : this.state.normal_night1,
            // remarks: this.state.remarks,
            // type: "RF_04"
          };
          console.log("body here", body);
          this.openModal();
          this.setState({
            btnstatus : true
          })
          try {
            const response = await axios.post(
              `${API_URL}assets/rf_4`,
              body,
              (axios.defaults.headers.common["x-access-token"] = tokenvalue)
            );
            console.log(response);
            //   .then(console.log(this.state));
    
            if (response.data.success) {
              // alert(response.data.msg);
                this.props.history.push("/TableRf4");
            } else {
              alert(response.data.msg);
            }
          } catch (error) {
            console.log(error);
          }
        } else {
          this.validator.showMessages();
          // rerender to show messages for the first time
          this.forceUpdate();
        }
      }
      totalshow = e => {
        e.preventDefault();
        let total_sample_sieving = this.state.weight_sample_sieving;
        let total_sample_testing = this.state.weight_sample_testing;
        let total_amount =
          ((total_sample_testing - total_sample_sieving) / total_sample_testing) *
          100;
        this.state.total = total_amount;
        console.log(total_amount);
        this.setState({
          amount_status: true
        });
      };
      render() {
             // let showmodal;
     let sbmtbtn, btnmsg;
     if(this.state.visible)
     {
       // showmodal = (
       //   <div>
       //     <SuccessModal  
       //          visible={this.state.visible}
       //               width={this.props.width}
       //               height={this.props.height}
       //               effect={this.props.effect}
       //               onClickAway={() => this.closeModal()} />
       //   </div>
       // )
     }
     if(this.state.btnstatus)
     {
       sbmtbtn = (
         <button
         class="btn btn-primary"
         onClick={this.onSubmit.bind(this)}
         disabled
       >
         Submit
       </button>
       )
       btnmsg = (
         <div>
         <hr />
         <p>Your Form Has Already Been Submitted.Please Don't Click SUMBIT Button AGAIN!!</p>
         </div>
       )
     }
     else
     {
       sbmtbtn=(
         <button
         class="btn btn-primary"
         onClick={this.onSubmit.bind(this)}
       >
         Submit
       </button>
       )
     }
        return (
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
                            RF - 04
                          </li>
                        </ol>
                      </nav>
                    </div>
                  </div>
                </div>
                {/*form comtent begin */}
    
                <div className="product-form-upper">
                  <div className="container">
                    <div className="below-custom-form">
                      <div className="row">
                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                          {/* <RfButtonLink /> */}
    
                          <hr />
                        </div>
    
                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                          <p style={{ textAlign: "center" }}>
                          RF-4 Ambiet temperature and curing tank temperature record
                          </p>
                          <hr />
                        </div>
                      </div>
                      <form className="custom-content-form">
                        <div className="form-row">
                          <div class="form-group col-md-6">
                            <div class="form-group row">
                              <label
                                for="inputPassword"
                                class="col-sm-2 col-form-label"
                              >
                                Plant
                              </label>
                              <div class="col-sm-10">
                                {localStorage.getItem("plant_name")}
                              </div>
                            </div>
                          </div>
                          <div class="form-group col-md-6">
                            <div class="form-group row">
                              <label
                                for="inputPassword"
                                class="col-sm-2 col-form-label"
                              >
                                date
                              </label>
                              <div class="col-sm-10">{this.state.date}</div>
                            </div>
                          </div>
                        </div>
                      </form>
                    </div>
                    {/*test form */}
                    <div className="below-custom-form">
                      <form className="custom-content-form">
                        <div className="form-row">
                          <div class="form-group col-md-12">
                            <table class="table table-bordered">
                              <thead class="thead-light">
                                <tr>
                                  <th scope="col">Date</th>
                                  <th colSpan="2">Temperature Night</th>
                                  <th colSpan="2">Temperature Day</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <th>
                                   #
                                  </th>
                                  <th>
                                   Ambient
                                  </th>
                                  <th>
                                   Normal
                                  </th>
                                  <th>
                                   Ambient
                                  </th>
                                  <th>
                                   Normal
                                  </th>
                                </tr>
                                <tr>
                                  <td>
                                    <input
                                      type="date"
                                      className="form-control"
                                      name="date_1"
                                      value={this.state.date_1}
                                      onChange={e => this.change(e)}
                                    />
                                  </td>
                                  <td>
                                    <input
                                      type="text"
                                      className="form-control"
                                      name="ambient_night1"
                                      value={this.state.ambient_night1}
                                      onChange={e => this.change(e)}
                                    />
                                  </td>
                                  <td>
                                    <input
                                      type="text"
                                      className="form-control"
                                      name="normal_night1"
                                      value={this.state.normal_night1}
                                      onChange={e => this.change(e)}
                                    />
                                  </td>
                                  <td>
                                    <input
                                      type="text"
                                      className="form-control"
                                      name="ambient_day1"
                                      value={this.state.ambient_day1}
                                      onChange={e => this.change(e)}
                                    />
                                  </td>
                                  <td>
                                    <input
                                      type="text"
                                      className="form-control"
                                      name="normal_day1"
                                      value={this.state.normal_day1}
                                      onChange={e => this.change(e)}
                                    />
                                  </td>
                                
                                </tr>
                                
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </form>
                    </div>
                    {/*test form */}
                    {/*remark form */}
                    <div className="below-custom-form">
                      <form className="custom-content-form">
                        <div className="form-row">
                          <div class="form-group col-md-12">
                            <div class="form-group row">
                              <label
                                for="inputPassword"
                                class="col-sm-2 col-form-label"
                              >
                                Remarks
                              </label>
                              <div class="col-sm-10">
                                <textarea
                                  className="form-control"
                                  name="remarks"
                                  value={this.state.remarks}
                                  onChange={e => this.change(e)}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        <small>* This Fields are Mandatory . </small>
                        <br />
                        {sbmtbtn}
                
                {btnmsg}
                </form>
                 {/*modal experiment */}
               {/* {showmodal} */}
               
              
               <SuccessModal  
               visible={this.state.visible}
                    width={this.props.width}
                    height={this.props.height}
                    effect={this.props.effect}
                    onClickAway={() => this.closeModal()} />
                {/*end model experiment */}
                    </div>
                    {/*end remark */}
                  </div>
                </div>
              </div>
              {/*ed form content */}
            </div>
          </div>
        );
      }
    }

export default Ambient
