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
export class ViewRF27 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            verify_comment : "",
            btnstatus : false,
            plant:"",
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
        console.log("verifyrf27 data", response);
        let res = response.data.data;
        const map = {};
        res.map(async (item, i) => {
          console.log(item.question + "  " + item.answer);
          map[item.question] = item.answer;
        });
    
        console.log(map);
        await this.setState({
            verify_comment : map.verify_comment,
            plant: map.plant,
            date: map.date,
       trial_no : map.trial_no,
       batch_number1 : map.batch_number1,
       batch_number2 : map.batch_number2,
       cement1 : map.cement1,
       cement2 : map.cement2,
       fly_ash1  :map.fly_ash1,
       fly_ash2 : map.fly_ash2,
       ggbs1  :map.ggbs1,
       ggbs2 : map.ggbs2,
       cementitious1  :map.cementitious1,
       cementitious2 : map.cementitious2,
       water1 : map.water1,
       water2  :map.water2,
       w_c_ratio1 : map.w_c_ratio1,
       w_c_ratio2 : map.w_c_ratio2,
       m_source_1 : map.m_source_1,
       m_source_2 : map.m_source_2,
      crf_1  :map.crf_1,
      crf_2 : map.crf_2,
      copper_slag_1  :map.copper_slag_1,
      copper_slag_2 : map.copper_slag_2,
      ad_dosage1 : map.ad_dosage1,
      ad_dosage2 : map.ad_dosage2,
      ad_brand1 : map.ad_brand1,
      ad_brand2 : map.ad_brand2,
      initial1 : map.initial1,
      initial2  :map.initial2,
      initial3 : map.initial3,
      initial4 : map.initial4,
      min1 : map.min1,min2 : map.min2,min3 : map.min3,min4 : map.min4, min5 : map.min5,min6 : map.min6,min7 : map.min7,min8  :map.min8,min9  :map.min9,min10  :map.min10,min11 : map.min11,min12 :  map.min12,
       
  
            admixture_type : map.admixture_type,
          
            remarks: map.remarks,
            type : map.type
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
            remarks: this.state.remarks,
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
                             <div class="col-sm-10">
                                 <input type="text" className="form-control" value={this.state.plant} name="plant" disabled />
                             </div>
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
                                 <input type="text" className="form-control" value={this.state.trial_no} name="trial_no" disabled />
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
                             <div class="col-sm-10"><input type="text" className="form-control" value={this.state.date} name="date" disabled /></div>
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
                  
                   
                 <input type="text" className="form-control" value={this.state.admixture_type} name="admixture_type" disabled />
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
                                     disabled
                                   />
                                 </td>
                                 <td>
                                   <input
                                     type="text"
                                     className="form-control"
                                     name="batch_number2"
                                     value={this.state.batch_number2}
                                     onChange={e => this.change(e)}
                                   
                                     disabled
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
                                   
                                     disabled
                                   />
                                 </td>
                                 <td>
                                   <input
                                     type="text"
                                     className="form-control"
                                     name="cement2"
                                     value={this.state.cement2}
                                     onChange={e => this.change(e)}
                                   
                                     disabled
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
                                   
                                     disabled
                                   />
                                 </td>
                                 <td>
                                   <input
                                     type="text"
                                     className="form-control"
                                     name="fly_ash2"
                                     value={this.state.fly_ash2}
                                     onChange={e => this.change(e)}
                                   
                                     disabled
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
                                   
                                     disabled
                                   />
                                 </td>
                                 <td>
                                   <input
                                     type="text"
                                     className="form-control"
                                     name="ggbs2"
                                     value={this.state.ggbs2}
                                     onChange={e => this.change(e)}
                                   
                                     disabled
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
                                   
                                     disabled
                                   />
                                 </td>
                                 <td>
                                   <input
                                     type="text"
                                     className="form-control"
                                     name="cementitious2"
                                     value={this.state.cementitious2}
                                     onChange={e => this.change(e)}
                                   
                                     disabled
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
                                   
                                     disabled
                                   />
                                 </td>
                                 <td>
                                   <input
                                     type="text"
                                     className="form-control"
                                     name="water2"
                                     value={this.state.water2}
                                     onChange={e => this.change(e)}
                                   
                                     disabled
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
                                   
                                     disabled
                                   />
                                 </td>
                                 <td>
                                   <input
                                     type="text"
                                     className="form-control"
                                     name="w_c_ratio2"
                                     value={this.state.w_c_ratio2}
                                     onChange={e => this.change(e)}
                                   
                                     disabled
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
                                   
                                     disabled
                                   />
                                 </td>
                                 <td>
                                   <input
                                     type="text"
                                     className="form-control"
                                     name="m_source_2"
                                     value={this.state.m_source_2}
                                     onChange={e => this.change(e)}
                                   
                                     disabled
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
                                  
                                     disabled />
                                 </td>
                                 <td>
                                   <input
                                     type="text"
                                     className="form-control"
                                     name="crf_2"
                                     value={this.state.crf_2}
                                     onChange={e => this.change(e)}
                                   
                                     disabled
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
                                   
                                     disabled
                                   />
                                 </td>
                                 <td>
                                   <input
                                     type="text"
                                     className="form-control"
                                     name="copper_slag_2"
                                     value={this.state.copper_slag_2}
                                     onChange={e => this.change(e)}
                                   
                                     disabled
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
                                   
                                     disabled
                                   />
                                 </td>
                                 <td>
                                   <input
                                     type="text"
                                     className="form-control"
                                     name="ad_dosage2"
                                     value={this.state.ad_dosage2}
                                     onChange={e => this.change(e)}
                                   
                                     disabled
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
                                   
                                     disabled
                                   />
                                 </td>
                                 <td>
                                   <input
                                     type="text"
                                     className="form-control"
                                     name="ad_brand2"
                                     value={this.state.ad_brand2}
                                     onChange={e => this.change(e)}
                                   
                                     disabled
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
                                   
                                     disabled
                                   />
                                 </td>
                                 <td>
                                   <input
                                     type="text"
                                     className="form-control"
                                     name="initial2"
                                     value={this.state.initial2}
                                     onChange={e => this.change(e)}
                                   
                                     disabled
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
                                   
                                     disabled
                                   />
                                 </td>
                                 <td>
                                   <input
                                     type="text"
                                     className="form-control"
                                     name="min2"
                                     value={this.state.min2}
                                     onChange={e => this.change(e)}
                                   
                                     disabled
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
                                   
                                     disabled
                                   />
                                 </td>
                                 <td>
                                   <input
                                     type="text"
                                     className="form-control"
                                     name="min4"
                                     value={this.state.min4}
                                     onChange={e => this.change(e)}
                                   
                                     disabled
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
                                   
                                     disabled
                                   />
                                   
                                 </td>
                                 <td>
                                   <input
                                     type="text"
                                     className="form-control"
                                     name="min6"
                                     value={this.state.min6}
                                     onChange={e => this.change(e)}
                                   
                                     disabled
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
                                   
                                     disabled
                                   />
                                 </td>
                                 <td>
                                   <input
                                     type="text"
                                     className="form-control"
                                     name="initial4"
                                     value={this.state.initial4}
                                     onChange={e => this.change(e)}
                                   
                                     disabled
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
                                   
                                     disabled
                                   />
                                 </td>
                                 <td>
                                   <input
                                     type="text"
                                     className="form-control"
                                     name="min8"
                                     value={this.state.min8}
                                     onChange={e => this.change(e)}
                                   
                                     disabled
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
                                   
                                     disabled
                                   />
                                 </td>
                                 <td>
                                   <input
                                     type="text"
                                     className="form-control"
                                     name="min10"
                                     value={this.state.min10}
                                     onChange={e => this.change(e)}
                                   
                                     disabled
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
                                   
                                     disabled
                                   />
                                 </td>
                                 <td>
                                   <input
                                     type="text"
                                     className="form-control"
                                     name="min12"
                                     value={this.state.min12}
                                     onChange={e => this.change(e)}
                                   
                                     disabled
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
                               
                                 disabled
                               />
                             </div>
                           </div>
                         </div>
                       </div>
                       {/* <small>* This Fields are Mandatory . </small>
                       <br />
                       {sbmtbtn}
               
               {btnmsg} */}
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
                                 className="form-control"
                                 name="verify_comment"
                                 value={this.state.verify_comment}
                                 onChange={e => this.change(e)}
                               
                                 disabled
                               />
                             </div>
                           </div>
                         </div>
                       </div>
                       {/* <small>* This Fields are Mandatory . </small>
                       <br />
                       {sbmtbtn}
               
               {btnmsg} */}
               </form>
                {/*modal experiment */}
              {/* {showmodal} */}
              
             
              {/* <SuccessModal  
              visible={this.state.visible}
                   width={this.props.width}
                   height={this.props.height}
                   effect={this.props.effect}
                   onClickAway={() => this.closeModal()} /> */}
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

export default ViewRF27
