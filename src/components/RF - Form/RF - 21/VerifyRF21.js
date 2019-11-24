import React, { Component } from 'react'
import { Link, Redirect, withRouter, NavLink } from "react-router-dom";
import "../../Test/Test.css";
import axios from "axios";
import authService from "../../../services/auth-service";
import axiosService from "../../../services/axios-service";
import { API_URL } from "../../../services/url";
import SimpleReactValidator from "simple-react-validator";
import { SuccessModal } from '../../Test/SuccessModal';
export class VerifyRF21 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            verify_comment : "",
          type: "RF_21",
          btnstatus:false,
          amount_status : false,
         plant : "",
         grade_21 : "",
         mix_code  :"",
         cementitious_content : "",
         cement_content :  "",
         admixture_name : "",
         ad_mixture  :"",
         batch_time : "",
         cement_details : "",
         time1 : "",time2 : "",time3 : "",time4: "",time5 : "",time6 : "",time7 : "",time8 : "",time9 : "",time10 : "",time11 : "",time12 : "",time13 : "",
         nd1 : "",nd2 : "",nd3 : "",nd4 : "", nd5 : "", nd6 : "",nd7 : "", nd8 : "", nd9 : "",nd10 : "", nd11 : "", nd12 :  "", nd13 : "",
         al1 : "", al2 : "",al3 : "",al4 : "",al5 : "",al6 : "", al7 : "", al8 :  "",al9 : "", al10: "", al11 : "",al12 : "",aL13 : "",
         na1 : "",na2 : "",na3 : "",na4 : "",na5 : "",na6 : "",na7 : "", na8 : "",na9 : "", na10 : "",na11 : "",na12 : "",na13 : "",
         pr1 : "",pr2 : "",pr3 : "",pr4 : "",pr5 : "",pr6 : "", pr7 : "",pr8 : "",pr9 : "",pr10: "", pr11 : "",pr12 : "",pr13 : "",
         remark1 : "",remark2 : "",remark3 : "",remark4 : "",remark5 : "",remark6 : "",ramerk7 : "",remark8 : "",remark9 : "",remark10 : "",remark11 : "",remark12 : "",remark13 : "",
         date_1 : ""

        };
        this.onSubmit = this.onSubmit.bind(this);
        this.validator = new SimpleReactValidator();
      }
      componentDidMount() {
        this.getFormDetail();
      }
      getFormDetail = async () => {
        // try {
        console.log(this.props.match.params.id);
        const response = await axios.get(
          `${API_URL}rf_form/view/${this.props.match.params.id}`,
          (axios.defaults.headers.common["x-access-token"] = localStorage.getItem(
            "token"
          ))
        );
        console.log("verifyrf21 data", response);
        let res = response.data.data;
        const map = {};
        res.map(async (item, i) => {
          console.log(item.question + "  " + item.answer);
          map[item.question] = item.answer;
        });
    
        console.log(map);
        await this.setState({
            verify_comment : response.data.meta.verify_comment,
            type: "RF_21",
            btnstatus:false,
            amount_status : false,
           plant : map.plant,
           grade_21 : map.grade_21,
           mix_code  :map.mix_code,
           cementitious_content : map.cementitious_content,
           cement_content :  map.cement_content,
           admixture_name : map.admixture_name,
           ad_mixture  :map.ad_mixture,
           batch_time : map.batch_time,
           cement_details : map.cement_details,
           time1 : map.time1,time2 : map.time2,time3 : map.time3,time4: map.time4,time5 : map.time5,time6 : map.time6,time7 : map.time7,time8 : map.time8,time9 : map.time9,time10 : map.time10,time11 : map.time11,time12 : map.time12,time13 : map.time13,
           nd1 : map.nd1,nd2 : map.nd2,nd3 : map.nd3,nd4 : map.nd4, nd5 : map.nd5, nd6 : map.nd6,nd7 : map.nd7, nd8 : map.nd8, nd9 : map.nd9,nd10 : map.nd10, nd11 : map.nd11, nd12 :  map.nd12, nd13 : map.nd13,
           al1 : map.al1, al2 : map.al2,al3 : map.al3,al4 : map.al4,al5 : map.al5,al6 : map.al6, al7 : map.al7, al8 :  map.al8,al9 : map.al9, al10: map.al10, al11 : map.al11,al12 : map.al12,aL13 : map.al13,
           na1 : map.na1,na2 : map.na2,na3 : map.na3,na4 : map.na4,na5 : map.na5,na6 : map.na6,na7 : map.na7, na8 : map.na8,na9 : map.na9, na10 : map.na10,na11 : map.na11,na12 : map.na12,na13 : map.na13,
           pr1 : map.pr1,pr2 : map.pr2,pr3 : map.pr3,pr4 : map.pr4,pr5 : map.pr5,pr6 : map.pr6, pr7 : map.pr7,pr8 : map.pr8,pr9 : map.pr9,pr10: map.pr10, pr11 : map.pr11,pr12 : map.pr12,pr13 : map.pr13,
           remark1 : map.remark1,remark2 : map.remark2,remark3 : map.remark3,remark4 : map.remark4,remark5 : map.remark5,remark6 : map.remark6,ramerk7 : map.remark7,remark8 : map.remark8,remark9 : map.remark9,remark10 : map.remark10,remark11 : map.remark11,remark12 : map.remark12,remark13 : map.remark13,
           date_1 : map.date_1
        });
        console.log(this.state);
        //   // this.parseJSON(this.state)
        // } catch (error) {
        //   console.log(error);
        // }
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
        console.log("params jere", this.props.match.url);
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
          [e.target.name]: e.target.value,
          amount_status : true

        });
      };
      getWebsite = () => {
        fetch("/").then(console.log(this.state));
      };
      async onSubmit(event) {
        event.preventDefault();
        console.log(this.state);
        if (this.validator.allValid()) {
          let tokenvalue = localStorage.getItem("token");
          let body = {
            verify_comment: this.state.verify_comment,
            formid: this.props.match.params.id
          };
          console.log(body);
          this.openModal();
          this.setState({
            btnstatus : true
          })
          try {
            const response = await axios.post(
              `${API_URL}rf_form/verify`,
              body,
              (axios.defaults.headers.common["x-access-token"] = tokenvalue)
            );
            console.log(response);
            //   .then(console.log(this.state));
    
            if (response.data==='success') {
              // alert(response.data.msg);
              this.props.history.push("/VerifiedRF21");
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
        // this.setState({
        //   amount_status: true,
          
        // });
        let ndvariable1 = Math.pow(this.state.nd1, 2)
        console.log(ndvariable1)
        console.log('something')
        let neddleare1 = (3.14*ndvariable1) / 4
        this.state.na1 = neddleare1
        console.log(this.state.na1)

       this.state.pr1 = +this.state.al1 / +this.state.na1
        console.log('persiste', this.state.pr1)
        
        
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
        if(this.state.amount_status)
        {
          let ndvariable1 = Math.pow(this.state.nd1, 2)
          this.state.na1 = (3.14*ndvariable1) / 4
          this.state.pr1 = +this.state.al1 / +this.state.na1
          
          //for NA2
          let ndvariable2 = Math.pow(this.state.nd2, 2)
          this.state.na2 = (3.14*ndvariable2) / 4
          this.state.pr2 = +this.state.al2 / +this.state.na2
          
           //for NA3
           let ndvariable3 = Math.pow(this.state.nd3, 2)
           this.state.na3 = (3.14*ndvariable3) / 4
           this.state.pr3 = +this.state.al3 / +this.state.na3

            //for NA4
          let ndvariable4 = Math.pow(this.state.nd4, 2)
          this.state.na4 = (3.14*ndvariable4) / 4
          this.state.pr4 = +this.state.al4 / +this.state.na4

           //for NA5
           let ndvariable5 = Math.pow(this.state.nd5, 2)
           this.state.na5 = (3.14*ndvariable5) / 4
           this.state.pr5 = +this.state.al5 / +this.state.na5

            //for NA6
          let ndvariable6 = Math.pow(this.state.nd6, 2)
          this.state.na6 = (3.14*ndvariable6) / 4
          this.state.pr6 = +this.state.al6 / +this.state.na6

           //for NA7
           let ndvariable7 = Math.pow(this.state.nd7, 2)
           this.state.na7 = (3.14*ndvariable7) / 4
           this.state.pr7 = +this.state.al7 / +this.state.na7

            //for NA8
          let ndvariable8 = Math.pow(this.state.nd8, 2)
          this.state.na8 = (3.14*ndvariable8) / 4
          this.state.pr8 = +this.state.al8 / +this.state.na8

           //for NA9
           let ndvariable9 = Math.pow(this.state.nd9, 2)
           this.state.na9 = (3.14*ndvariable9) / 4
           this.state.pr9 = +this.state.al9 / +this.state.na9

            //for NA10
          let ndvariable10 = Math.pow(this.state.nd10, 2)
          this.state.na10 = (3.14*ndvariable10) / 4
          this.state.pr10 = +this.state.al10 / +this.state.na10

           //for NA11
           let ndvariable11 = Math.pow(this.state.nd11, 2)
           this.state.na11 = (3.14*ndvariable11) / 4
           this.state.pr11 = +this.state.al11 / +this.state.na11

            //for NA12
          let ndvariable12 = Math.pow(this.state.nd12, 2)
          this.state.na12 = (3.14*ndvariable12) / 4
          this.state.pr12 = +this.state.al12 / +this.state.na12

           //for NA13
           let ndvariable13 = Math.pow(this.state.nd13, 2)
           this.state.na13 = (3.14*ndvariable13) / 4
           this.state.pr13 = +this.state.al13 / +this.state.na13
        }
        let buttontext;
        if (this.props.match.url == "/BulkDensity") {
          buttontext = (
            <span
              style={{
                fontWeight: "bold",
                fontStyle: "italic",
                color: "forestgreen"
              }}
            >
              Bulk Denstiy
            </span>
          );
        }
        let display_total_amount;
        if (this.state.amount_status == true) {
          display_total_amount = <div>{this.state.total} %</div>;
        } else {
          display_total_amount = (
            <div>
              <p>Enter The Above Fields</p>
            </div>
          );
        }
    
        return (
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
                        <li className="breadcrumb-item active" aria-current="page">
                        RF - 21
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
                    <div className="row">
                      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                        {/* <div className="custom-btn-lists">
                          <ul>
                            <li>
                              <button className="btn btn-info">
                                <NavLink
                                  activeClassName="selected"
                                  to={process.env.PUBLIC_URL + "/ParticleSize"}
                                >
                                  Particle Size
                                </NavLink>
                              </button>
                            </li>
                            <li>
                              <button className="btn btn-info">
                                <NavLink
                                  activeClassName="selected"
                                  to={process.env.PUBLIC_URL + "/ViewTestEight"}
                                >
                                  Flakiness Index
                                </NavLink>
                              </button>
                            </li>
                            <li>
                              <button className="btn btn-info">
                                <NavLink
                                  activeClassName="selected"
                                  to={process.env.PUBLIC_URL + "/ViewTestSeven"}
                                >
                                  Elongation Index
                                </NavLink>
                              </button>
                            </li>
                            <li>
                              <button className="btn btn-info">
                                <NavLink
                                  activeClassName="selected"
                                  to={process.env.PUBLIC_URL + "/ViewTestOne"}
                                >
                                  Slit Content
                                </NavLink>
                              </button>
                            </li>
                            <li>
                              <button className="btn btn-info">
                                <NavLink
                                  activeClassName="selected"
                                  to={process.env.PUBLIC_URL + "/ViewTestTwo"}
                                >
                                  Gravity and Water abs
                                </NavLink>
                              </button>
                            </li>
                            <li>
                              <button className="btn btn-info">
                                <NavLink
                                  activeClassName="selected"
                                  to={process.env.PUBLIC_URL + "/ViewTestThree"}
                                >
                                  Surface Moisture
                                </NavLink>
                              </button>
                            </li>
                            <li>
                              <button className="btn btn-info">
                                <NavLink
                                  activeClassName="selected"
                                  to={process.env.PUBLIC_URL + "/ViewTestFour"}
                                >
                                  Compaction
                                </NavLink>
                              </button>
                            </li>
                            <li>
                              <button className="btn btn-info">
                                <NavLink
                                  activeClassName="selected"
                                  to={process.env.PUBLIC_URL + "/ViewTestFive"}
                                >
                                  Crushing
                                </NavLink>
                              </button>
                            </li>
                            <li>
                              <button className="btn btn-info">
                                <NavLink
                                  activeClassName="selected"
                                  to={process.env.PUBLIC_URL + "/ViewTestSix"}
                                >
                                  {buttontext}
                                </NavLink>
                              </button>
                            </li>
                          </ul>
                        </div>
    
                        <hr /> */}
                      </div>
    
                      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                        <p style={{ textAlign: "center" }}>
                        <h3>RF - 21</h3>
                        Determination of Setting time of concrete   IS : 8142 - 1963 
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
                            <input type="text" value={this.state.plant} name="plant" className="form-control" disabled />
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
                            <div class="col-sm-10"><input type="text" value={this.state.date_1} name="date_1" className="form-control" disabled /> </div>
                          </div>
                        </div>
                        <div class="form-group col-md-6">
                          <div class="form-group row">
                            <label
                              for="inputPassword"
                              class="col-sm-2 col-form-label"
                            >
                              Mix Code
                            </label>
                            <div class="col-sm-10">
                              <input
                                list="browsers"
                                name="mix_code"
                                value={this.state.mix_code}
                                onChange={e => this.change(e)}
                                className="form-control"
                              
                                  disabled
                              />
                              
                            </div>
                          </div>
                        </div>
                        <div class="form-group col-md-6">
                          <div class="form-group row">
                            <label
                              for="inputPassword"
                              class="col-sm-2 col-form-label"
                            >
                              Grade
                            </label>
                            <div class="col-sm-10">
                            <input
                                type="text"
                                class="form-control"
                                id="inputPassword"
                                name="grade_21"
                                value={this.state.grade_21}
                                onChange={e => this.change(e)}
                              
                                disabled
                              />
                            </div>
                          </div>
                        </div>
                        <div class="form-group col-md-6">
                          <div class="form-group row">
                            <label
                              for="inputPassword"
                              class="col-sm-2 col-form-label"
                            >
                              Cementitious content 
                            </label>
                            <div class="col-sm-10">
                              <input
                                type="text"
                                class="form-control"
                                id="inputPassword"
                                name="cementitious_content"
                                value={this.state.cementitious_content}
                                onChange={e => this.change(e)}
                              
                                disabled
                              />
                            </div>
                          </div>
                        </div>
                        <div class="form-group col-md-6">
                          <div class="form-group row">
                            <label
                              for="inputSubcategory"
                              className="col-sm-2 col-form-label"
                            >
                              Cement content 
                            </label>
                            <div class="col-sm-10">
                              <input
                                type="text"
                                class="form-control"
                                id="inputPassword"
                                name="cement_content"
                                value={this.state.cement_content}
                                onChange={e => this.change(e)}
                              
                                disabled
                              />
                            </div>
                          </div>
                        </div>
                        <div class="form-group col-md-6">
                          <div class="form-group row">
                            <label
                              for="inputPassword"
                              class="col-sm-3 col-form-label"
                            >
                           Admixture dosage 
                            </label>
                            <div class="col-sm-9">
                       
                              <input
                                type="text"
                                class="form-control"
                                id="inputPassword"
                                name="ad_mixture"
                                value={this.state.ad_mixture}
                                onChange={e => this.change(e)}
                              
                                disabled
                              />
                           
                            </div>
                          </div>
                        </div>
                        <div class="form-group col-md-6">
                          <div class="form-group row">
                            <label
                              for="inputPassword"
                              class="col-sm-3 col-form-label"
                            >
                              Admixture name 
                            </label>
                            <div class="col-sm-9">
                              <input
                                type="text"
                                class="form-control"
                                id="inputPassword"
                                name="admixture_name"
                                value={this.state.admixture_name}
                                onChange={e => this.change(e)}
                              
                                disabled
                              />
                            </div>
                          </div>
                        </div>
                        <div class="form-group col-md-6">
                          <div class="form-group row">
                            <label
                              for="inputPassword"
                              class="col-sm-3 col-form-label"
                            >
                              Batching Time
                            </label>
                            <div class="col-sm-9">
                              <input
                                type="text"
                                class="form-control"
                                id="inputPassword"
                                name="batch_time"
                                value={this.state.batch_time}
                                onChange={e => this.change(e)}
                              
                                disabled
                              />
                            </div>
                          </div>
                        </div>
                        <div class="form-group col-md-6">
                          <div class="form-group row">
                            <label
                              for="inputPassword"
                              class="col-sm-3 col-form-label"
                            >
                              Cement Details
                            </label>
                            <div class="col-sm-9">
                              <input
                                type="text"
                                class="form-control"
                                id="inputPassword"
                                name="cement_details"
                                value={this.state.cement_details}
                                onChange={e => this.change(e)}
                              
                                disabled
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      
                    </form>
                  </div>
                  {/*etst detial form */}
                  <div className="below-custom-form">
                    <div className="row">
                      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                        <h3>Test Details</h3>
                        <hr />
                        <br />
                      </div>
                    
                    </div>
                    <form className="custom-content-form">
                      <div className="form-row">
                        <div class="form-group col-md-12">
                          <table class="table table-bordered">
                            <thead class="thead-light">
                              <tr>
                                <th scope="col">S.No.</th>
                                <th>Date</th>
                                <th>Time</th>
                                <th scope="col">Needle Diameter (mm)</th>
                                <th scope="col">Applied Load (mm) L</th>
                                <th scope="col">Needle Area (mm) A</th>
                                <th scope="col">Penetration Resistance (p = L / A)</th>
                                <th scope="col">Remarks</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <th scope="row">
                                1
                                </th>
                                <th><input
                                    type="date"
                                    className="form-control"
                                    name="date_1"
                                    value={this.state.date_1}
                                    onChange={e => this.change(e)}
                                  
                                    disabled
                                  /></th>
                                <th><input
                                    type="time"
                                    className="form-control"
                                    name="time1"
                                    value={this.state.time1}
                                    onChange={e => this.change(e)}
                                  
                                    disabled
                                  /></th>
                                <td>
                                  <input
                                    type="text"
                                    className="form-control"
                                    name="nd1"
                                    value={this.state.nd1}
                                    onChange={e => this.change(e)}
                                  
                                    disabled
                                  />
                                </td>
                                <td>
                                  <input
                                    type="text"
                                    className="form-control"
                                    name="al1"
                                    value={this.state.al1}
                                    onChange={e => this.change(e)}
                                  
                                    disabled
                                  />
                                </td>
                                <td>
                                 { <input
                                    type="text"
                                    className="form-control"
                                    name="na1"
                                    value={this.state.na1}
                                    onChange={e => this.change(e)}
                                    disabled
                                  />}
                                </td>
                                <td>
                                  <input
                                    type="text"
                                    className="form-control"
                                    name="pr1"
                                    value={this.state.pr1}
                                    onChange={e => this.change(e)}
                                    disabled
                                  />
                                </td>
                                <td>
                                  <input
                                    type="text"
                                    className="form-control"
                                    name="remark1"
                                    value={this.state.remark1}
                                    onChange={e => this.change(e)}
                                  
                                    disabled
                                  />
                                </td>
                              </tr>
                              <tr>
                                <th scope="row">
                                2
                                </th>
                                <th><input
                                    type="date"
                                    className="form-control"
                                    name="date_1"
                                    value={this.state.date_1}
                                    onChange={e => this.change(e)}
                                  
                                    disabled
                                  /></th>
                                <th><input
                                    type="time"
                                    className="form-control"
                                    name="time2"
                                    value={this.state.time2}
                                    onChange={e => this.change(e)}
                                  
                                    disabled
                                  /></th>
                                <td>
                                  <input
                                    type="text"
                                    className="form-control"
                                    name="nd2"
                                    value={this.state.nd2}
                                    onChange={e => this.change(e)}
                                  
                                    disabled
                                  />
                                </td>
                                <td>
                                  <input
                                    type="text"
                                    className="form-control"
                                    name="al2"
                                    value={this.state.al2}
                                    onChange={e => this.change(e)}
                                  
                                    disabled
                                  />
                                </td>
                                <td>
                                  <input
                                    type="text"
                                    className="form-control"
                                    name="na2"
                                    value={this.state.na2}
                                    onChange={e => this.change(e)}
                                    disabled
                                  />
                                </td>
                                <td>
                                  <input
                                    type="text"
                                    className="form-control"
                                    name="pr2"
                                    value={this.state.pr2}
                                    onChange={e => this.change(e)}
                                    disabled
                                  />
                                </td>
                                <td>
                                  <input
                                    type="text"
                                    className="form-control"
                                    name="remark2"
                                    value={this.state.remark2}
                                    onChange={e => this.change(e)}
                                  
                                    disabled
                                  />
                                </td>
                              </tr>
                              <tr>
                                <th scope="row">
                                3
                                </th>
                                <th><input
                                    type="date"
                                    className="form-control"
                                    name="date_1"
                                    value={this.state.date_1}
                                    onChange={e => this.change(e)}
                                 
                                    disabled /></th>
                                <th><input
                                    type="time"
                                    className="form-control"
                                    name="time3"
                                    value={this.state.time3}
                                    onChange={e => this.change(e)}
                                  
                                    disabled
                                  /></th>
                                <td>
                                  <input
                                    type="text"
                                    className="form-control"
                                    name="nd3"
                                    value={this.state.nd3}
                                    onChange={e => this.change(e)}
                                  
                                    disabled
                                  />
                                </td>
                                <td>
                                  <input
                                    type="text"
                                    className="form-control"
                                    name="al3"
                                    value={this.state.al3}
                                    onChange={e => this.change(e)}
                                  
                                    disabled
                                  />
                                </td>
                                <td>
                                  <input
                                    type="text"
                                    className="form-control"
                                    name="na3"
                                    value={this.state.na3}
                                    onChange={e => this.change(e)}
                                    disabled
                                  />
                                </td>
                                <td>
                                  <input
                                    type="text"
                                    className="form-control"
                                    name="pr3"
                                    value={this.state.pr3}
                                    onChange={e => this.change(e)}
                                    disabled
                                  />
                                </td>
                                <td>
                                  <input
                                    type="text"
                                    className="form-control"
                                    name="remark3"
                                    value={this.state.remark3}
                                    onChange={e => this.change(e)}
                                  
                                    disabled
                                  />
                                </td>
                              </tr>
                              <tr>
                                <th scope="row">
                                4
                                </th>
                                <th><input
                                    type="date"
                                    className="form-control"
                                    name="date_1"
                                    value={this.state.date_1}
                                    onChange={e => this.change(e)}
                                  
                                    disabled
                                  /></th>
                                <th><input
                                    type="time"
                                    className="form-control"
                                    name="time4"
                                    value={this.state.time4}
                                    onChange={e => this.change(e)}
                                  
                                    disabled
                                  /></th>
                                <td>
                                  <input
                                    type="text"
                                    className="form-control"
                                    name="nd4"
                                    value={this.state.nd4}
                                    onChange={e => this.change(e)}
                                  
                                    disabled
                                  />
                                </td>
                                <td>
                                  <input
                                    type="text"
                                    className="form-control"
                                    name="al4"
                                    value={this.state.al4}
                                    onChange={e => this.change(e)}
                                  
                                    disabled
                                  />
                                </td>
                                <td>
                                  <input
                                    type="text"
                                    className="form-control"
                                    name="na4"
                                    value={this.state.na4}
                                    onChange={e => this.change(e)}
                                    disabled
                                  />
                                </td>
                                <td>
                                  <input
                                    type="text"
                                    className="form-control"
                                    name="pr4"
                                    value={this.state.pr4}
                                    onChange={e => this.change(e)}
                                    disabled
                                  />
                                </td>
                                <td>
                                  <input
                                    type="text"
                                    className="form-control"
                                    name="remark4"
                                    value={this.state.remark4}
                                    onChange={e => this.change(e)}
                                  
                                    disabled
                                  />
                                </td>
                              </tr>
                              <tr>
                                <th scope="row">
                                5
                                </th>
                                <th><input
                                    type="date"
                                    className="form-control"
                                    name="date_1"
                                    value={this.state.date_1}
                                    onChange={e => this.change(e)}
                                    disabled
                                  /></th>
                                <th><input
                                    type="time"
                                    className="form-control"
                                    name="time5"
                                    value={this.state.time5}
                                    onChange={e => this.change(e)}
                                  
                                    disabled
                                  /></th>
                                <td>
                                  <input
                                    type="text"
                                    className="form-control"
                                    name="nd5"
                                    value={this.state.nd5}
                                    onChange={e => this.change(e)}
                                  
                                    disabled
                                  />
                                </td>
                                <td>
                                  <input
                                    type="text"
                                    className="form-control"
                                    name="al5"
                                    value={this.state.al5}
                                    onChange={e => this.change(e)}
                                  
                                    disabled
                                  />
                                </td>
                                <td>
                                  <input
                                    type="text"
                                    className="form-control"
                                    name="na5"
                                    value={this.state.na5}
                                    onChange={e => this.change(e)}
                                    disabled
                                  />
                                </td>
                                <td>
                                  <input
                                    type="text"
                                    className="form-control"
                                    name="pr5"
                                    value={this.state.pr5}
                                    onChange={e => this.change(e)}
                                    disabled
                                  />
                                </td>
                                <td>
                                  <input
                                    type="text"
                                    className="form-control"
                                    name="remark5"
                                    value={this.state.remark5}
                                    onChange={e => this.change(e)}
                                  
                                    disabled
                                  />
                                </td>
                              </tr>
                              <tr>
                                <th scope="row">
                                6
                                </th>
                                <th><input
                                    type="date"
                                    className="form-control"
                                    name="date_1"
                                    value={this.state.date_1}
                                    onChange={e => this.change(e)}
                                  
                                    disabled
                                  /></th>
                                <th><input
                                    type="time"
                                    className="form-control"
                                    name="time6"
                                    value={this.state.time6}
                                    onChange={e => this.change(e)}
                                  
                                    disabled
                                  /></th>
                                <td>
                                  <input
                                    type="text"
                                    className="form-control"
                                    name="nd6"
                                    value={this.state.nd6}
                                    onChange={e => this.change(e)}
                                  
                                    disabled
                                  />
                                </td>
                                <td>
                                  <input
                                    type="text"
                                    className="form-control"
                                    name="al6"
                                    value={this.state.al6}
                                    onChange={e => this.change(e)}
                                  
                                    disabled
                                  />
                                </td>
                                <td>
                                  <input
                                    type="text"
                                    className="form-control"
                                    name="na6"
                                    value={this.state.na6}
                                    onChange={e => this.change(e)}
                                    disabled
                                  />
                                </td>
                                <td>
                                  <input
                                    type="text"
                                    className="form-control"
                                    name="pr6"
                                    value={this.state.pr6}
                                    onChange={e => this.change(e)}
                                    disabled
                                  />
                                </td>
                                <td>
                                  <input
                                    type="text"
                                    className="form-control"
                                    name="remark6"
                                    value={this.state.remark6}
                                    onChange={e => this.change(e)}
                                  
                                    disabled
                                  />
                                </td>
                              </tr>
                              <tr>
                                <th scope="row">
                                7
                                </th>
                                <th><input
                                    type="date"
                                    className="form-control"
                                    name="date_1"
                                    value={this.state.date_1}
                                    onChange={e => this.change(e)}
                                  
                                    disabled
                                  /></th>
                                <th><input
                                    type="time"
                                    className="form-control"
                                    name="time7"
                                    value={this.state.time7}
                                    onChange={e => this.change(e)}
                                  
                                    disabled
                                  /></th>
                                <td>
                                  <input
                                    type="text"
                                    className="form-control"
                                    name="nd7"
                                    value={this.state.nd7}
                                    onChange={e => this.change(e)}
                                  
                                    disabled
                                  />
                                </td>
                                <td>
                                  <input
                                    type="text"
                                    className="form-control"
                                    name="al7"
                                    value={this.state.al7}
                                    onChange={e => this.change(e)}
                                  
                                    disabled
                                  />
                                </td>
                                <td>
                                  <input
                                    type="text"
                                    className="form-control"
                                    name="na7"
                                    value={this.state.na7}
                                    onChange={e => this.change(e)}
                                    disabled
                                  />
                                </td>
                                <td>
                                  <input
                                    type="text"
                                    className="form-control"
                                    name="pr7"
                                    value={this.state.pr7}
                                    onChange={e => this.change(e)}
                                    disabled
                                  />
                                </td>
                                <td>
                                  <input
                                    type="text"
                                    className="form-control"
                                    name="remark7"
                                    value={this.state.remark7}
                                    onChange={e => this.change(e)}
                                  
                                    disabled
                                  />
                                </td>
                              </tr>
                              <tr>
                                <th scope="row">
                                8
                                </th>
                                <th><input
                                    type="date"
                                    className="form-control"
                                    name="date_1"
                                    value={this.state.date_1}
                                    onChange={e => this.change(e)}
                                  
                                    disabled
                                  /></th>
                                <th><input
                                    type="time"
                                    className="form-control"
                                    name="time8"
                                    value={this.state.time8}
                                    onChange={e => this.change(e)}
                                 
                                    disabled /></th>
                                <td>
                                  <input
                                    type="text"
                                    className="form-control"
                                    name="nd8"
                                    value={this.state.nd8}
                                    onChange={e => this.change(e)}
                                  />
                                </td>
                                <td>
                                  <input
                                    type="text"
                                    className="form-control"
                                    name="al8"
                                    value={this.state.al8}
                                    onChange={e => this.change(e)}
                                  
                                    disabled
                                  />
                                </td>
                                <td>
                                  <input
                                    type="text"
                                    className="form-control"
                                    name="na8"
                                    value={this.state.na8}
                                    onChange={e => this.change(e)}
                                    disabled
                                  />
                                </td>
                                <td>
                                  <input
                                    type="text"
                                    className="form-control"
                                    name="pr8"
                                    value={this.state.pr8}
                                    onChange={e => this.change(e)}
                                    disabled
                                  />
                                </td>
                                <td>
                                  <input
                                    type="text"
                                    className="form-control"
                                    name="remark8"
                                    value={this.state.remark8}
                                    onChange={e => this.change(e)}
                                  
                                    disabled
                                  />
                                </td>
                              </tr>
                              <tr>
                                <th scope="row">
                                9
                                </th>
                                <th><input
                                    type="date"
                                    className="form-control"
                                    name="date_1"
                                    value={this.state.date_1}
                                    onChange={e => this.change(e)}
                                  
                                    disabled
                                  /></th>
                                <th><input
                                    type="time"
                                    className="form-control"
                                    name="time9"
                                    value={this.state.time9}
                                    onChange={e => this.change(e)}
                                 
                                    disabled /></th>
                                <td>
                                  <input
                                    type="text"
                                    className="form-control"
                                    name="nd9"
                                    value={this.state.nd9}
                                    onChange={e => this.change(e)}
                                  
                                    disabled
                                  />
                                </td>
                                <td>
                                  <input
                                    type="text"
                                    className="form-control"
                                    name="al9"
                                    value={this.state.al9}
                                    onChange={e => this.change(e)}
                                 
                                    disabled />
                                </td>
                                <td>
                                  <input
                                    type="text"
                                    className="form-control"
                                    name="na9"
                                    value={this.state.na9}
                                    onChange={e => this.change(e)}
                                    disabled
                                  />
                                </td>
                                <td>
                                  <input
                                    type="text"
                                    className="form-control"
                                    name="pr9"
                                    value={this.state.pr9}
                                    onChange={e => this.change(e)}
                                    disabled
                                  />
                                </td>
                                <td>
                                  <input
                                    type="text"
                                    className="form-control"
                                    name="remark9"
                                    value={this.state.remark9}
                                    onChange={e => this.change(e)}
                                  
                                    disabled
                                  />
                                </td>
                              </tr>
                              <tr>
                                <th scope="row">
                                10
                                </th>
                                <th><input
                                    type="date"
                                    className="form-control"
                                    name="date_1"
                                    value={this.state.date_1}
                                    onChange={e => this.change(e)}
                                  
                                    disabled
                                  /></th>
                                <th><input
                                    type="time"
                                    className="form-control"
                                    name="time10"
                                    value={this.state.time10}
                                    onChange={e => this.change(e)}
                                    disabled
                                  /></th>
                                <td>
                                  <input
                                    type="text"
                                    className="form-control"
                                    name="nd10"
                                    value={this.state.nd10}
                                    onChange={e => this.change(e)}
                                  
                                    disabled
                                  />
                                </td>
                                <td>
                                  <input
                                    type="text"
                                    className="form-control"
                                    name="al10"
                                    value={this.state.al10}
                                    onChange={e => this.change(e)}
                                  
                                    disabled
                                  />
                                </td>
                                <td>
                                  <input
                                    type="text"
                                    className="form-control"
                                    name="na10"
                                    value={this.state.na10}
                                    onChange={e => this.change(e)}
                                    disabled
                                  />
                                </td>
                                <td>
                                  <input
                                    type="text"
                                    className="form-control"
                                    name="pr10"
                                    value={this.state.pr10}
                                    onChange={e => this.change(e)}
                                    disabled
                                  />
                                </td>
                                <td>
                                  <input
                                    type="text"
                                    className="form-control"
                                    name="remark10"
                                    value={this.state.remark10}
                                    onChange={e => this.change(e)}
                                  
                                    disabled
                                  />
                                </td>
                              </tr>
                              <tr>
                                <th scope="row">
                                11
                                </th>
                                <th><input
                                    type="date"
                                    className="form-control"
                                    name="date_1"
                                    value={this.state.date_1}
                                    onChange={e => this.change(e)}
                                  
                                    disabled
                                  /></th>
                                <th><input
                                    type="time"
                                    className="form-control"
                                    name="time11"
                                    value={this.state.time11}
                                    onChange={e => this.change(e)}
                                  
                                    disabled
                                  /></th>
                                <td>
                                  <input
                                    type="text"
                                    className="form-control"
                                    name="nd11"
                                    value={this.state.nd11}
                                    onChange={e => this.change(e)}
                                  
                                    disabled
                                  />
                                </td>
                                <td>
                                  <input
                                    type="text"
                                    className="form-control"
                                    name="al11"
                                    value={this.state.al11}
                                    onChange={e => this.change(e)}
                                  
                                    disabled
                                  />
                                </td>
                                <td>
                                  <input
                                    type="text"
                                    className="form-control"
                                    name="na11"
                                    value={this.state.na11}
                                    onChange={e => this.change(e)}
                                    disabled
                                  />
                                </td>
                                <td>
                                  <input
                                    type="text"
                                    className="form-control"
                                    name="pr11"
                                    value={this.state.pr11}
                                    onChange={e => this.change(e)}
                                    disabled
                                  />
                                </td>
                                <td>
                                  <input
                                    type="text"
                                    className="form-control"
                                    name="remark11"
                                    value={this.state.remark11}
                                    onChange={e => this.change(e)}
                                  
                                    disabled
                                  />
                                </td>
                              </tr>
                              <tr>
                                <th scope="row">
                                12
                                </th>
                                <th><input
                                    type="date"
                                    className="form-control"
                                    name="date_1"
                                    value={this.state.date_1}
                                    onChange={e => this.change(e)}
                                  
                                    disabled
                                  /></th>
                                <th><input
                                    type="time"
                                    className="form-control"
                                    name="time12"
                                    value={this.state.time12}
                                    onChange={e => this.change(e)}
                                  
                                    disabled
                                  /></th>
                                <td>
                                  <input
                                    type="text"
                                    className="form-control"
                                    name="nd12"
                                    value={this.state.nd12}
                                    onChange={e => this.change(e)}
                                  
                                    disabled
                                  />
                                </td>
                                <td>
                                  <input
                                    type="text"
                                    className="form-control"
                                    name="al12"
                                    value={this.state.al12}
                                    onChange={e => this.change(e)}
                                  
                                    disabled
                                  />
                                </td>
                                <td>
                                  <input
                                    type="text"
                                    className="form-control"
                                    name="na12"
                                    value={this.state.na12}
                                    onChange={e => this.change(e)}
                                    disabled
                                  />
                                </td>
                                <td>
                                  <input
                                    type="text"
                                    className="form-control"
                                    name="pr12"
                                    value={this.state.pr12}
                                    onChange={e => this.change(e)}
                                    disabled
                                  />
                                </td>
                                <td>
                                  <input
                                    type="text"
                                    className="form-control"
                                    name="remark12"
                                    value={this.state.remark12}
                                    onChange={e => this.change(e)}
                                  
                                    disabled
                                  />
                                </td>
                              </tr>
                              <tr>
                                <th scope="row">
                                13
                                </th>
                                <th><input
                                    type="date"
                                    className="form-control"
                                    name="date_1"
                                    value={this.state.date_1}
                                    onChange={e => this.change(e)}
                                  
                                    disabled
                                  /></th>
                                <th><input
                                    type="time"
                                    className="form-control"
                                    name="time13"
                                    value={this.state.time13}
                                    onChange={e => this.change(e)}
                                 
                                    disabled /></th>
                                <td>
                                  <input
                                    type="text"
                                    className="form-control"
                                    name="nd13"
                                    value={this.state.nd13}
                                    onChange={e => this.change(e)}
                                  
                                    disabled
                                  />
                                </td>
                                <td>
                                  <input
                                    type="text"
                                    className="form-control"
                                    name="al13"
                                    value={this.state.al13}
                                    onChange={e => this.change(e)}
                                  
                                    disabled
                                  />
                                </td>
                                <td>
                                  <input
                                    type="text"
                                    className="form-control"
                                    name="na13"
                                    value={this.state.na13}
                                    onChange={e => this.change(e)}
                                    disabled
                                  />
                                </td>
                                <td>
                                  <input
                                    type="text"
                                    className="form-control"
                                    name="pr13"
                                    value={this.state.pr13}
                                    onChange={e => this.change(e)}
                                    disabled
                                  />
                                </td>
                                <td>
                                  <input
                                    type="text"
                                    className="form-control"
                                    name="remark13"
                                    value={this.state.remark13}
                                    onChange={e => this.change(e)}
                                  
                                    disabled
                                  />
                                </td>
                              </tr>
                              {/* <tr>
                              <td colSpan="8">
                              <button
                                type="button"
                                className="btn btn-info custom-total-show-btn"
                                onClick={this.totalshow.bind(this)}
                              >
                                Show Pan&nbsp;&nbsp;{" "}
                                <i
                                  class="fa fa-arrow-circle-right"
                                  aria-hidden="true"
                                />
                              </button>
                              </td>
                              </tr> */}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </form>
                    <hr />
                  
                   
                  </div>
                  {/*end test detail form */}
                  {/*comment pto */}
                  <div className="below-custom-form">
                    <div className="row">
                      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                        <h3>More Details</h3>
                        <hr />
                        <br />
                      </div>
                    </div>
                    <form className="custom-content-form">
                      <div className="form-row">
                        <div class="form-group col-md-12">
                          <div class="form-group row">
                            <label
                              for="inputPassword"
                              class="col-sm-2 col-form-label"
                            >
                              PTO's Comment
                            </label>
                            <div class="col-sm-10">
                              <textarea
                                class="form-control"
                                id="inputPassword"
                                name="pto_comment"
                                value={this.state.pto_comment}
                                onChange={e => this.change(e)}
                              
                                disabled
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                     
                </form>

                <form className="custom-content-form">
                      <div className="form-row">
                        <div class="form-group col-md-12">
                          <div class="form-group row">
                            <label
                              for="inputPassword"
                              class="col-sm-2 col-form-label"
                            >
                              Verify Comment
                            </label>
                            <div class="col-sm-10">
                              <textarea
                                class="form-control"
                                id="inputPassword"
                                name="verify_comment"
                                value={this.state.verify_comment}
                                onChange={e => this.change(e)}
                                
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <small>* This Fields are Mandatory . </small>
                  <br />
                  <button
                    class="btn btn-primary"
                    onClick={this.onSubmit.bind(this)}
                  >
                    Submit
                  </button>
                     
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
                  {/*end comment pto */}
                </div>
              </div>
            </div>
          </div>
        );
      }
    }

export default VerifyRF21
