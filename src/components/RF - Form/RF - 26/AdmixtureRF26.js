import React, { Component } from 'react'
import { Link, Redirect, withRouter, NavLink } from "react-router-dom";
import "./Rf26.css";
import axios from "axios";
import authService from "../../../services/auth-service";
import axiosService from "../../../services/axios-service";
import { API_URL } from "../../../services/url";
import SimpleReactValidator from "simple-react-validator";
import { RfButtonLink } from "../RfButtonLink";
import { SuccessModal } from "../../Test/SuccessModal";
export class AdmixtureRF26 extends Component {
    constructor(props) {
        super(props);
        this.state = {
          btnstatus : false,
          plant: localStorage.getItem('plant_name'),
          date: "",
     trial_no : "",
     batch_number1 : "",
     batch_number2 : "",
     cement1 : "",
     cement2 : "",
     fly_ash1  :"",
     fly_ash2 : "",
     ggbs1  :"",
     ggbs2 : "",
     cementitious1  :"",
     cementitious2 : "",
     water1 : "",
     water2  :"",
     w_c_ratio1 : "",
     w_c_ratio2 : "",
     m_source_1 : "",
     m_source_2 : "",
    crf_1  :"",
    crf_2 : "",
    copper_slag_1  :"",
    copper_slag_2 : "",
    ad_dosage1 : "",
    ad_dosage2 : "",
    ad_brand1 : "",
    ad_brand2 : "",
    initial1 : "",
    initial2  :"",
    initial3 : "",
    initial4 : "",
    min1 : "",min2 : "",min3 : "",min4 : "", min5 : "",min6 : "",min7 : "",min8  :"",min9  :"",min10  :"",min11 : "",min12 :  "",
     

          admixture_type : "",
        
          remarks: "",
          type : "RF-27"
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
      getInfo = async () => {
        try {
          let vendor_name = this.state.query
          const response = await axios.get(
            `${API_URL}master/vendor_search?VENDOR_NAME=${vendor_name}`,
            (axios.defaults.headers.common["x-access-token"] = localStorage.getItem("token"))
          );
         // console.log(response.data.User);
          //console.log(this.state.supl);
          console.log('response hwew', response)
    
          if (response.data.success) {
            await this.setState({
              supl: response.data.VENDOR_NAME
            })
            console.log(this.state.supl);
          }
          // this.parseJSON(this.state)
        } catch (error) {
          console.log(error);
        }
          
        
      }
      handleInputChange = (e) => {
        console.log(e.target.value)
        this.setState({
          query: e.target.value
        }, () => {
          if (this.state.query && this.state.query.length > 1) {
            if (this.state.query.length % 2 === 0) {
              this.getInfo()
            }
          } else if (!this.state.query) {
          }
        })
      }
      async onSubmit(event) {
        event.preventDefault();
        console.log(this.state);
        if (this.validator.allValid()) {
          let tokenvalue = localStorage.getItem("token");
          let body = {
            plant: localStorage.getItem('plant_name'),
            date: this.state.date,
       trial_no : this.state.trial_no,
       batch_number1 : this.state.batch_number1,
       batch_number2 : this.state.batch_number2,
       cement1 : this.state.cement1,
       cement2 : this.state.cement2,
       fly_ash1  :this.state.fly_ash1,
       fly_ash2 : this.state.fly_ash2,
       ggbs1  :this.state.ggbs1,
       ggbs2 : this.state.ggbs2,
       cementitious1  :this.state.cementitious1,
       cementitious2 : this.state.cementitious2,
       water1 : this.state.water1,
       water2  :this.state.water2,
       w_c_ratio1 : this.state.w_c_ratio1,
       w_c_ratio2 : this.state.w_c_ratio2,
       m_source_1 : this.state.m_source_1,
       m_source_2 : this.state.m_source_2,
      crf_1  :this.state.crf_1,
      crf_2 : this.state.crf_2,
      copper_slag_1  :this.state.copper_slag_1,
      copper_slag_2 : this.state.copper_slag_2,
      ad_dosage1 : this.state.ad_dosage1,
      ad_dosage2 : this.state.ad_dosage2,
      ad_brand1 : this.state.ad_brand1,
      ad_brand2 : this.state.ad_brand2,
      initial1 : this.state.initial1,
      initial2  :this.state.initial2,
      initial3 : this.state.initial3,
      initial4 : this.state.initial4,
      min1 : this.state.min1,min2 :  this.state.min2,min3 :  this.state.min3,min4 :  this.state.min4, min5 :  this.state.min5,min6 :  this.state.min6,min7 :  this.state.min7,min8  : this.state.min8,min9  : this.state.min9,min10  : this.state.min10,min11 :  this.state.min11,min12 :   this.state.min12,
       
  
            admixture_type : this.state.admixture_type,
          
            remarks: this.state.remarks,
            type: "RF_27"
          };
          console.log("body here", body);
          this.openModal();
          this.setState({
            btnstatus : true
          })
          try {
            const response = await axios.post(
              `${API_URL}rf_form/submit`,
              body,
              (axios.defaults.headers.common["x-access-token"] = tokenvalue)
            );
            console.log(response);
            //   .then(console.log(this.state));
    
            if (response.data === 'success') {
              // alert(response.data.msg);
                // this.props.history.push("/TableRf26");
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
                            RF - 26
                          </li>
                        </ol>
                      </nav>
                    </div>
                  </div>
                </div>
                {/*form comtent begin */}
    
                <div className="product-form-upper">
                  <div className="container-fluid">
                    <div className="below-custom-form">
                      <div className="row">
                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                          {/* <RfButtonLink /> */}
    
                          <hr />
                        </div>
    
                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                          <p style={{ textAlign: "center" }}>
                          RF-26 <br /> Lot wise Admixture performance sheet

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
                              <div class="col-sm-10">{localStorage.getItem('plant_name')}</div>
                            </div>
                          </div>
                      </div>
                      <div className="form-row">
                        <div className="form-group col-md-6">
                      <div class="form-group row">
                              <label
                                for="inputPassword"
                                class="col-sm-2 col-form-label"
                              >
                                Trial No.
                              </label>
                              <div class="col-sm-10">
                                  <input type="text" className="form-control" value={this.state.trial_no} name="trial_no" onChange={e => this.change(e)} />
                              </div>
                            </div>
                            </div>
                      
                          <div class="form-group col-md-6">
                            <div class="form-group row">
                              <label
                                for="inputPassword"
                                class="col-sm-2 col-form-label"
                              >
                                Date Of Test
                              </label>
                              <div class="col-sm-10">{this.state.date}</div>
                            </div>
                          </div>
                        </div>
                        <div className="form-row">
                        
                         

                         
                             <div class="form-group col-md-12">
                <div class="form-group row">
                  <label for="inputPassword" class="col-sm-3 col-form-label">
                    Admixture Type
                  </label>
                  <div class="col-sm-9">
                    <div class="form-check form-check-inline">
                      <input
                        className="form-check-input"
                        type="radio"
                        id="inlineCheckbox1"
                        value="SNF"
                        name="admixture_type"
                        onClick={e => this.change(e)}
                      />
                      <label className="form-check-label" for="inlineCheckbox1">
                        SNF
                      </label>
                    </div>
                    <div className="form-check form-check-inline">
                      <input
                        className="form-check-input"
                        type="radio"
                        id="inlineCheckbox1"
                        value="NAPTHA"
                        name="admixture_type"
                        onClick={e => this.change(e)}
                      />
                      <label className="form-check-label" for="inlineCheckbox1">
                        NAPTHA
                      </label>
                    </div>
                    <div className="form-check form-check-inline">
                      <input
                        className="form-check-input"
                        type="radio"
                        id="inlineCheckbox1"
                        value="PCBased"
                        name="admixture_type"
                        onClick={e => this.change(e)}
                      />
                      <label className="form-check-label" for="inlineCheckbox1">
                        PC Based
                      </label>
                      <span className="text-danger">
                        {this.validator.message(
                          "admixture type",
                          this.state.admixture_type,
                          "required"
                        )}
                      </span>
                    </div>
                  </div>
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
                                <th scope="col">#</th>
                                  <th scope="col">Master Sample</th>
                                  <th scope="col">New Lot</th>
                                  
                                </tr>
                              </thead>
                              <tbody>
                                
                                <tr>
                                  <th>
                                   Batch Number
                                  </th>
                                  <td>
                                    <input
                                      type="text"
                                      className="form-control"
                                      name="batch_number1"
                                      value={this.state.batch_number1}
                                      onChange={e => this.change(e)}
                                    />
                                  </td>
                                  <td>
                                    <input
                                      type="text"
                                      className="form-control"
                                      name="batch_number2"
                                      value={this.state.batch_number2}
                                      onChange={e => this.change(e)}
                                    />
                                  </td>
                                 
                                
                                </tr>
                                <tr>
                                  <th>
                                   Cement
                                  </th>
                                  <td>
                                    <input
                                      type="text"
                                      className="form-control"
                                      name="cement1"
                                      value={this.state.cement1}
                                      onChange={e => this.change(e)}
                                    />
                                  </td>
                                  <td>
                                    <input
                                      type="text"
                                      className="form-control"
                                      name="cement2"
                                      value={this.state.cement2}
                                      onChange={e => this.change(e)}
                                    />
                                  </td>
                                 
                                
                                </tr>
                                <tr>
                                  <th>
                                   Fly Ash
                                  </th>
                                  <td>
                                    <input
                                      type="text"
                                      className="form-control"
                                      name="fly_ash1"
                                      value={this.state.fly_ash1}
                                      onChange={e => this.change(e)}
                                    />
                                  </td>
                                  <td>
                                    <input
                                      type="text"
                                      className="form-control"
                                      name="fly_ash2"
                                      value={this.state.fly_ash2}
                                      onChange={e => this.change(e)}
                                    />
                                  </td>
                                 
                                
                                </tr>
                                <tr>
                                  <th>
                                   GGBS
                                  </th>
                                  <td>
                                    <input
                                      type="text"
                                      className="form-control"
                                      name="ggbs1"
                                      value={this.state.ggbs1}
                                      onChange={e => this.change(e)}
                                    />
                                  </td>
                                  <td>
                                    <input
                                      type="text"
                                      className="form-control"
                                      name="ggbs2"
                                      value={this.state.ggbs2}
                                      onChange={e => this.change(e)}
                                    />
                                  </td>
                                 
                                
                                </tr>
                                <tr>
                                  <th>
                                   Cementitious
                                  </th>
                                  <td>
                                    <input
                                      type="text"
                                      className="form-control"
                                      name="cementitious1"
                                      value={this.state.cementitious1}
                                      onChange={e => this.change(e)}
                                    />
                                  </td>
                                  <td>
                                    <input
                                      type="text"
                                      className="form-control"
                                      name="cementitious2"
                                      value={this.state.cementitious2}
                                      onChange={e => this.change(e)}
                                    />
                                  </td>
                                 
                                
                                </tr>
                                <tr>
                                  <th>
                                   Water
                                  </th>
                                  <td>
                                    <input
                                      type="text"
                                      className="form-control"
                                      name="water1"
                                      value={this.state.water1}
                                      onChange={e => this.change(e)}
                                    />
                                  </td>
                                  <td>
                                    <input
                                      type="text"
                                      className="form-control"
                                      name="water2"
                                      value={this.state.water2}
                                      onChange={e => this.change(e)}
                                    />
                                  </td>
                                 
                                
                                </tr>
                                <tr>
                                  <th>
                                   W/C Ratio
                                  </th>
                                  <td>
                                    <input
                                      type="text"
                                      className="form-control"
                                      name="w_c_ratio1"
                                      value={this.state.w_c_ratio1}
                                      onChange={e => this.change(e)}
                                    />
                                  </td>
                                  <td>
                                    <input
                                      type="text"
                                      className="form-control"
                                      name="w_c_ratio2"
                                      value={this.state.w_c_ratio2}
                                      onChange={e => this.change(e)}
                                    />
                                  </td>
                                 
                                
                                </tr>
                                <tr>
                                  <th>
                                   20 mm (With Source Name)
                                  </th>
                                  <td>
                                   0
                                  </td>
                                  <td>
                                    0
                                  </td>
                                 
                                
                                </tr>
                                <tr>
                                  <th>
                                   10 mm (With Source Name)
                                  </th>
                                  <td>
                                   0
                                  </td>
                                  <td>
                                   0
                                  </td>
                                 
                                
                                </tr>
                                <tr>
                                  <th>
                                   M Sand (With Source Name)
                                  </th>
                                  <td>
                                    <input
                                      type="text"
                                      className="form-control"
                                      name="m_source_1"
                                      value={this.state.m_source_1}
                                      onChange={e => this.change(e)}
                                    />
                                  </td>
                                  <td>
                                    <input
                                      type="text"
                                      className="form-control"
                                      name="m_source_2"
                                      value={this.state.m_source_2}
                                      onChange={e => this.change(e)}
                                    />
                                  </td>
                                 
                                
                                </tr>
                                <tr>
                                  <th>
                                   CRF (With Source Name)
                                  </th>
                                  <td>
                                    <input
                                      type="text"
                                      className="form-control"
                                      name="crf_1"
                                      value={this.state.crf_1}
                                      onChange={e => this.change(e)}
                                    />
                                  </td>
                                  <td>
                                    <input
                                      type="text"
                                      className="form-control"
                                      name="crf_2"
                                      value={this.state.crf_2}
                                      onChange={e => this.change(e)}
                                    />
                                  </td>
                                 
                                
                                </tr>
                                <tr>
                                  <th>
                                   Copper SLag (With Source Name)
                                  </th>
                                  <td>
                                    <input
                                      type="text"
                                      className="form-control"
                                      name="copper_slag_1"
                                      value={this.state.copper_slag_1}
                                      onChange={e => this.change(e)}
                                    />
                                  </td>
                                  <td>
                                    <input
                                      type="text"
                                      className="form-control"
                                      name="copper_slag_2"
                                      value={this.state.copper_slag_2}
                                      onChange={e => this.change(e)}
                                    />
                                  </td>
                                 
                                
                                </tr>
                                <tr>
                                  <th>
                                   Admixture Dosage
                                  </th>
                                  <td>
                                    <input
                                      type="text"
                                      className="form-control"
                                      name="ad_dosage1"
                                      value={this.state.ad_dosage1}
                                      onChange={e => this.change(e)}
                                    />
                                  </td>
                                  <td>
                                    <input
                                      type="text"
                                      className="form-control"
                                      name="ad_dosage2"
                                      value={this.state.ad_dosage2}
                                      onChange={e => this.change(e)}
                                    />
                                  </td>
                                 
                                
                                </tr>
                                <tr>
                                  <th>
                                   Admixture (With Brand Name)
                                  </th>
                                  <td>
                                    <input
                                      type="text"
                                      className="form-control"
                                      name="ad_brand1"
                                      value={this.state.ad_brand1}
                                      onChange={e => this.change(e)}
                                    />
                                  </td>
                                  <td>
                                    <input
                                      type="text"
                                      className="form-control"
                                      name="ad_brand2"
                                      value={this.state.ad_brand2}
                                      onChange={e => this.change(e)}
                                    />
                                  </td>
                                 
                                
                                </tr>
                                

                                
                                
                              </tbody>
                            </table>

                            <hr />
                            <center><h4>Flow In Seconds </h4></center>
                            <hr />
                            <table class="table table-bordered">
                              <thead class="thead-light">
                                <tr>
                                <th scope="col">#</th>
                                  <th scope="col">Master Sample</th>
                                  <th scope="col">New Lot</th>
                                  
                                </tr>
                              </thead>
                              <tbody>
                                
                                <tr>
                                  <th>
                                   Initial
                                  </th>
                                  <td>
                                    <input
                                      type="text"
                                      className="form-control"
                                      name="initial1"
                                      value={this.state.initial1}
                                      onChange={e => this.change(e)}
                                    />
                                  </td>
                                  <td>
                                    <input
                                      type="text"
                                      className="form-control"
                                      name="initial2"
                                      value={this.state.initial2}
                                      onChange={e => this.change(e)}
                                    />
                                  </td>
                                 
                                
                                </tr>
                                <tr>
                                  <th>
                                   60 Min
                                  </th>
                                  <td>
                                    <input
                                      type="text"
                                      className="form-control"
                                      name="min1"
                                      value={this.state.min1}
                                      onChange={e => this.change(e)}
                                    />
                                  </td>
                                  <td>
                                    <input
                                      type="text"
                                      className="form-control"
                                      name="min2"
                                      value={this.state.min2}
                                      onChange={e => this.change(e)}
                                    />
                                  </td>
                                 
                                
                                </tr>
                                <tr>
                                  <th>
                                   120 Min
                                  </th>
                                  <td>
                                    <input
                                      type="text"
                                      className="form-control"
                                      name="min3"
                                      value={this.state.min3}
                                      onChange={e => this.change(e)}
                                    />
                                  </td>
                                  <td>
                                    <input
                                      type="text"
                                      className="form-control"
                                      name="min4"
                                      value={this.state.min4}
                                      onChange={e => this.change(e)}
                                    />
                                  </td>
                                 
                                
                                </tr>
                                <tr>
                                  <th>
                                   180 Min
                                  </th>
                                  <td>
                                    <input
                                      type="text"
                                      className="form-control"
                                      name="min5"
                                      value={this.state.min5}
                                      onChange={e => this.change(e)}
                                    />
                                  </td>
                                  <td>
                                    <input
                                      type="text"
                                      className="form-control"
                                      name="min6"
                                      value={this.state.min6}
                                      onChange={e => this.change(e)}
                                    />
                                  </td>
                                 
                                
                                </tr>
                               
                                

                                
                                
                              </tbody>
                            </table>

                            
                            <hr />
                            <center><h4>Spread In MM </h4></center>
                            <hr />
                            <table class="table table-bordered">
                              <thead class="thead-light">
                                <tr>
                                <th scope="col">#</th>
                                  <th scope="col">Master Sample</th>
                                  <th scope="col">New Lot</th>
                                  
                                </tr>
                              </thead>
                              <tbody>
                                
                                <tr>
                                  <th>
                                   Initial
                                  </th>
                                  <td>
                                    <input
                                      type="text"
                                      className="form-control"
                                      name="initial3"
                                      value={this.state.initial3}
                                      onChange={e => this.change(e)}
                                    />
                                  </td>
                                  <td>
                                    <input
                                      type="text"
                                      className="form-control"
                                      name="initial4"
                                      value={this.state.initial4}
                                      onChange={e => this.change(e)}
                                    />
                                  </td>
                                 
                                
                                </tr>
                                <tr>
                                  <th>
                                   60 Min
                                  </th>
                                  <td>
                                    <input
                                      type="text"
                                      className="form-control"
                                      name="min7"
                                      value={this.state.min7}
                                      onChange={e => this.change(e)}
                                    />
                                  </td>
                                  <td>
                                    <input
                                      type="text"
                                      className="form-control"
                                      name="min8"
                                      value={this.state.min8}
                                      onChange={e => this.change(e)}
                                    />
                                  </td>
                                 
                                
                                </tr>
                                <tr>
                                  <th>
                                   120 Min
                                  </th>
                                  <td>
                                    <input
                                      type="text"
                                      className="form-control"
                                      name="min9"
                                      value={this.state.min9}
                                      onChange={e => this.change(e)}
                                    />
                                  </td>
                                  <td>
                                    <input
                                      type="text"
                                      className="form-control"
                                      name="min10"
                                      value={this.state.min10}
                                      onChange={e => this.change(e)}
                                    />
                                  </td>
                                 
                                
                                </tr>
                                <tr>
                                  <th>
                                   180 Min
                                  </th>
                                  <td>
                                    <input
                                      type="text"
                                      className="form-control"
                                      name="min11"
                                      value={this.state.min11}
                                      onChange={e => this.change(e)}
                                    />
                                  </td>
                                  <td>
                                    <input
                                      type="text"
                                      className="form-control"
                                      name="min12"
                                      value={this.state.min12}
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
    )
  }
}
export default AdmixtureRF26
