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
export class RF26 extends Component {
    constructor(props) {
        super(props);
        this.state = {
          query: '',
          supl : [],
          btnstatus : false,
          supplier: "",
          source: "",
          plant: "",
          date: "",
          sample_location : "",
          admixture_type : "",
          grad_cylinder : "",
          const_temp  :"",
          relative_density : "",
          numerical_value  :"",
          hyderometer : "",
          opt_instrument : "",
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
            supplier: this.state.supplier,
            source: this.state.source,
            plant: localStorage.getItem("plant_name"),
            date: this.state.date,
          sample_location : this.state.sample_location,
          admixture_type : this.state.admixture_type,
          grad_cylinder : this.state.grad_cylinder,
          const_temp  :this.state.const_temp,
          relative_density : this.state.relative_density,
          numerical_value : this.state.numerical_value,
            remarks: this.state.remarks,
            hyderometer : this.state.hyderometer,
            opt_instrument : this.state.opt_instrument,
            type: "RF_26"
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
                this.props.history.push("/TableRf26");
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
                          RF-26 <br /> Determination of Specific gravity of Admixture <br /> IS :9103:1999

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
                                Supplier
                              </label>
                              <div class="col-sm-10">
                  <input list="browsers" name="query"  
                      value={this.state.query}
                      onChange={e=> this.handleInputChange(e)} className="form-control" />
                 
                 <datalist id="browsers">
    {
              this.state.supl ?
              this.state.supl.map(function(item, id) {
                return(
                
                    
        <option value={item.VENDOR_NAME} key={id}/>
       
      )
              }
      )
              :
              <span>Data is loading....</span>
            }
            </datalist>
            <span className="text-danger">
                        {this.validator.message(
                          "supplier",
                          this.state.query,
                          "required"
                        )}
                      </span>
                      
   
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
                          <div class="form-group col-md-6">
                            <div class="form-group row">
                              <label
                                for="inputPassword"
                                class="col-sm-2 col-form-label"
                              >
                                Source
                              </label>
                              <div class="col-sm-10">
                              <input type="text" className="form-control" value={this.state.source} name="source" onChange={e => this.change(e)} />
                              </div>
                            </div>
                          </div>
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

                          <div class="form-group col-md-12">
                            <div class="form-group row">
                              <label
                                for="inputPassword"
                                class="col-sm-2 col-form-label"
                              >
                                Sample Location
                              </label>
                              <div class="col-sm-10">
                              <select className="form-control" value={this.state.sample_location} name="sample_location" onChange={e => this.change(e)}>
                                 <option value="none">Choose.... </option>
                                  <option value="truck">Truck</option>
                                  <option value="bin">Bin</option>
                                  <option value="stockyard">Stock Yard</option>
                                  
                                 </select>
                              </div>
                            </div>
                          </div>

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
                        value="PCE"
                        name="admixture_type"
                        onClick={e => this.change(e)}
                      />
                      <label className="form-check-label" for="inlineCheckbox1">
                        PCE
                      </label>
                    </div>
                    <div className="form-check form-check-inline">
                      <input
                        className="form-check-input"
                        type="radio"
                        id="inlineCheckbox1"
                        value="LingoSulfonate"
                        name="admixture_type"
                        onClick={e => this.change(e)}
                      />
                      <label className="form-check-label" for="inlineCheckbox1">
                        LongoSulfonate
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

               <div class="form-group col-md-6">
                            <div class="form-group row">
                              <label
                                for="inputPassword"
                                class="col-sm-2 col-form-label"
                              >
                               Graduated cylinder of 500ml

                              </label>
                              <div class="col-sm-10">
                                  <input type="text" className="form-control" value={this.state.grad_cylinder} name="grad_cylinder" onChange={e => this.change(e)} />
                              </div>
                            </div>
                          </div>

                          <div class="form-group col-md-6">
                            <div class="form-group row">
                              <label
                                for="inputPassword"
                                class="col-sm-2 col-form-label"
                              >
                               Constant Temperature Water Bath

                              </label>
                              <div class="col-sm-10">
                                  <input type="text" className="form-control" value={this.state.const_temp} name="const_temp" onChange={e => this.change(e)} />
                              </div>
                            </div>
                          </div>

                           <div class="form-group col-md-6">
                            <div class="form-group row">
                              <label
                                for="inputPassword"
                                class="col-sm-2 col-form-label"
                              >
                               Hydrometer

                              </label>
                              <div class="col-sm-10">
                                 <select className="form-control" value={this.state.hyderometer} name="hyderometer" onChange={e => this.change(e)}>
                                 <option value="none">Choose.... </option>
                                  <option value="option1">Option 1 </option>
                                  <option value="option2">Option 2 </option>
                                  <option value="option3">Option 3 </option>
                                  <option value="option4">Option 4 </option>
                                 </select>  
                              </div>
                            </div>
                          </div>

                            <div class="form-group col-md-6">
                            <div class="form-group row">
                              <label
                                for="inputPassword"
                                class="col-sm-2 col-form-label"
                              >
                              Optional Instrument

                              </label>
                              <div class="col-sm-10">
                              <select className="form-control" value={this.state.opt_instrument} name="opt_instrument" onChange={e => this.change(e)}>
                                 <option value="none">Choose.... </option>
                                  <option value="option1">Option 1 </option>
                                  <option value="option2">Option 2 </option>
                                  <option value="option3">Option 3 </option>
                                  <option value="option4">Option 4 </option>
                                 </select>  
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
                                  <th scope="col">Relative Density Of Admixture</th>
                                  <th scope="col">Numerical Value</th>
                                  
                                </tr>
                              </thead>
                              <tbody>
                                
                                <tr>
                                  <td>
                                    <input
                                      type="text"
                                      className="form-control"
                                      name="relative_density"
                                      value={this.state.relative_density}
                                      onChange={e => this.change(e)}
                                    />
                                  </td>
                                  <td>
                                    <input
                                      type="text"
                                      className="form-control"
                                      name="numerical_value"
                                      value={this.state.numerical_value}
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

export default RF26
