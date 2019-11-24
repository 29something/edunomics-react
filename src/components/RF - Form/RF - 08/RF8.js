import React, { Component } from 'react'
import { Link, Redirect, withRouter, NavLink } from "react-router-dom";
import "../../Test/Test.css";
import axios from "axios";
import authService from "../../../services/auth-service";
import axiosService from "../../../services/axios-service";
import { API_URL } from "../../../services/url";
import SimpleReactValidator from "simple-react-validator";
import { SuccessModal } from '../../Test/SuccessModal';
export class RF8 extends Component {
    constructor(props) {
        super(props);
        this.state = {
          type: "RF_8",
          btnstatus : false,
          new_average_density_concrete : "",
          supplier: "",
          new_average_yield_value : "",
          source: "",
          sample_location: "",
          weight: "",
          s_y2 : "",
          s_y3 : "",
          s_y5 : "",
          w_e1  :"",
          w_e2 : "",
          w_e3 : "",
          w_f1 : "",
          w_f2  : "",
          w_f3 : "",
          w_b1  :"",
          w_b2 : "",
          w_b3 : "",
          v_c1 : "",
          v_c2 : "",
          v_c3 : "",
          total_batch_density1 : "",
          total_batch_density2 : "",
          total_batch_density3 : "",
          agg_type: "",
          weight_balance: "",
          weight_sample_testing: "",
          weight_sample_sieving: "",
          material_passing: "",
          pto_comment: "",
          total: "",
          amount_status: false,
          weight_of_water: "",
          density_agreegate1: "",
          density_agreegate2: "",
          density_agreegate3 : "",
          volume_density: "",
          weight_of_agreegate1: "",
          weight_of_aggregate2: "",
          weight_of_concrete1 : "",
          weight_of_concrete2 : "",
          weight_of_concrete3 : "",
          weight_of_aggregate3 : "",
          batch1 : "",
          batch2 : "",
          batch3 : "",
          plant: "",
          date: "",
          s_t1: "",
          s_t2: "",
          s_t3: "",
          s_t5 : "",
          total_yield1 : "",
          total_yield2 : "",
          total_yield3 : "",
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
        console.log("params jere", this.props.match.url);
      };
    
      change = e => {
        this.setState({
          [e.target.name]: e.target.value
        });
      };
      getWebsite = () => {
        fetch("/").then(console.log(this.state));
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
      async onSubmit(event) {
        event.preventDefault();
        console.log(this.state);
        if (this.validator.allValid()) {
          let tokenvalue = localStorage.getItem("token");
          let body = {
            new_average_yield_value : this.state.new_average_yield_value,
            new_average_density_concrete  : this.state.new_average_density_concrete,
            supplier: this.state.supplier,
            source: this.state.source,
            sample_location: this.state.sample_location,
            w_e1  :this.state.w_e1,
            w_e2 : this.state.w_e2,
            w_e3 : this.state.w_e3,
            w_f1 : this.state.w_f1,
            w_f2  : this.state.w_f2,
            w_f3 : this.state.w_f3,
            w_b1  :this.state.w_b1,
            w_b2 : this.state.w_b2,
            w_b3 : this.state.w_b3,
            v_c1 : this.state.v_c1,
            v_c2 : this.state.v_c2,
            v_c3 : this.state.v_c3,
            total_batch_density1 : this.state.total_batch_density1,
            total_batch_density2 : this.state.total_batch_density2,
            total_batch_density3 : this.state.total_batch_density3,
            batch1 : this.state.batch1,
            batch2 : this.state.batch2,
            batch3 : this.state.batch3,
            weight: this.state.weight,
            agg_type: this.state.agg_type,
            weight_balance: this.state.weight_balance,
            weight_of_water: this.state.weight_of_water,
            density_agreegate3 : this.state.density_agreegate3,
            density_agreegate1: this.state.density_agreegate1,
            density_agreegate2: this.state.density_agreegate2,
            weight_of_agreegate1: this.state.weight_of_agreegate1,
            weight_of_aggregate2: this.state.weight_of_aggregate2,
            weight_of_aggregate3 : this.state.weight_of_aggregate3,
            weight_of_concrete1 : this.state.weight_of_concrete1,
            weight_of_concrete2  : this.state.weight_of_concrete2,
            weight_of_concrete3 : this.state.weight_of_concrete3,
            pto_comment: this.state.pto_comment,
            plant: localStorage.getItem("plant_name"),
            date: this.state.date,
            type: "RF_8",
            s_y2 : this.state.s_y2,
            s_y3 : this.state.s_y3,
            s_y5 : this.state.s_y5,
            s_t1: this.state.s_t1,
            s_t2: this.state.s_t2,
            s_t3: this.state.s_t3,
            s_t5 : this.state.s_t5,
            total_yield3 : this.state.total_yield3,
            total_yield1 : this.state.total_yield1,
            total_yield2 : this.state.total_yield2
          };
          console.log(body);
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
              this.props.history.push("/TableRf8");
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
      total_weight_water = e => {
        function isNumber(n) {
          return !isNaN(parseFloat(n)) && isFinite(n);
        }
        e.preventDefault();
        if (isNumber(this.state.s_t1) && isNumber(this.state.weight)) {
          let B = this.state.s_t1 - this.state.weight;
          this.state.weight_of_water = B.toFixed(2);
          console.log(B);
        } 
        // else alert("please give correct input");
    
        this.setState({
          amount_status: true
        });
      };
      total_weight_aggregate = e => {
        function isNumber(n) {
          return !isNaN(parseFloat(n)) && isFinite(n);
        }
        e.preventDefault();
        if (isNumber(this.state.s_t2) && isNumber(this.state.weight)) {
          let Q = this.state.s_t2 - this.state.weight;
          this.state.weight_of_agreegate1 = Q.toFixed(2);
          console.log(Q);
        } 
        // else alert("please give correct input");
    
        //agg2
        if (isNumber(this.state.s_t3) && isNumber(this.state.weight)) {
          let R = this.state.s_t3 - this.state.weight;
          this.state.weight_of_aggregate2 = R.toFixed(2);
          console.log(R);
        } 
        // else alert("please give correct input");
    
        //agg3
        if (isNumber(this.state.s_t5) && isNumber(this.state.weight)) {
            let newTest5 = this.state.s_t5 - this.state.weight;
            this.state.weight_of_aggregate3 = newTest5.toFixed(2);
            console.log(newTest5);
          } 
          // else alert("please give correct input");
        this.setState({
          amount_status: true
        });
      };
      total_volume_density = e => {
        function isNumber(n) {
          return !isNaN(parseFloat(n)) && isFinite(n);
        }
        e.preventDefault();
        if (isNumber(this.state.weight_of_water)) {
          let D = this.state.weight_of_water / 1000;
          this.state.volume_density = D.toFixed(2);
          console.log(D);
        } 
        // else alert("please give correct input");
    
        this.setState({
          amount_status: true
        });
      };
      total_density_aggregate = e => {
        function isNumber(n) {
          return !isNaN(parseFloat(n)) && isFinite(n);
        }
        e.preventDefault();
        if (
          isNumber(this.state.weight_of_agreegate1) &&
          isNumber(this.state.volume_density)
        ) {
          let G = this.state.weight_of_agreegate1 / this.state.volume_density;
          this.state.density_agreegate1 = G.toFixed(2);
          console.log(G);
        } 
        // else alert("please give correct input");
    
        //density2
        if (
          isNumber(this.state.weight_of_aggregate2) &&
          isNumber(this.state.volume_density)
        ) {
          let Z = this.state.weight_of_aggregate2 / this.state.volume_density;
          this.state.density_agreegate2 = Z.toFixed(2);
          console.log(Z);
        } 
        // else alert("please give correct input");

         //density3
         if (
            isNumber(this.state.weight_of_aggregate3) &&
            isNumber(this.state.volume_density)
          ) {
            let newDensity3 = this.state.weight_of_aggregate3 / this.state.volume_density;
            this.state.density_agreegate3 = newDensity3.toFixed(2);
            console.log(newDensity3);
          } 
          // else alert("please give correct input");
    
        this.setState({
          amount_status: true
        });
      };
      total_yield_concrete = e => {
        let yield1, yield2, yield3

        function isNumber(n) {
          return !isNaN(parseFloat(n)) && isFinite(n);
        }
        e.preventDefault();
        if (
          isNumber(this.state.s_y2) &&
          isNumber(this.state.density_agreegate1)
        ) {
          yield1 = this.state.s_y2 / this.state.density_agreegate1;
          this.state.total_yield1 = yield1.toFixed(2);
          console.log(yield1);
        } 
        // else alert("please give correct input");
    
        //density2
        if (
          isNumber(this.state.s_y3) &&
          isNumber(this.state.density_agreegate2)
        ) {
          yield2 = this.state.s_y3 / this.state.density_agreegate2;
          this.state.total_yield2 = yield2.toFixed(2);
          console.log(yield2);
        } 
        // else alert("please give correct input");

         //density3
         if (
            isNumber(this.state.s_y5) &&
            isNumber(this.state.density_agreegate3)
          ) {
             yield3 = this.state.s_y5 / this.state.density_agreegate3;
            this.state.total_yield3 = yield3.toFixed(2);
            console.log(yield3);
          }
          //  else alert("please give correct input");
    
        this.setState({
          amount_status: true
        });
      };
      total_concrete_weight = e => {
        function isNumber(n) {
          return !isNaN(parseFloat(n)) && isFinite(n);
        }
        e.preventDefault();
        if (isNumber(this.state.w_f1) && isNumber(this.state.w_e1)) {
          let con_weg1 = this.state.w_f1 - this.state.w_e1;
          this.state.weight_of_concrete1 = con_weg1.toFixed(2);
          console.log(con_weg1);
        } 
        // else alert("please give correct input");
    
        //agg2
        if (isNumber(this.state.w_f2) && isNumber(this.state.w_e2)) {
            let con_weg2 = this.state.w_f2 - this.state.w_e2;
            this.state.weight_of_concrete2 = con_weg2.toFixed(2);
            console.log(con_weg2);
          } 
          // else alert("please give correct input");
        //agg3
        if (isNumber(this.state.w_f3) && isNumber(this.state.w_e3)) {
            let con_weg3 = this.state.w_f3 - this.state.w_e3;
            this.state.weight_of_concrete3 = con_weg3.toFixed(2);
            console.log(con_weg3);
          } 
          // else alert("please give correct input");
        this.setState({
          amount_status: true
        });
      };
      total_batch_concrete_density = e => {
        function isNumber(n) {
          return !isNaN(parseFloat(n)) && isFinite(n);
        }
        e.preventDefault();
        if (
          isNumber(this.state.weight_of_concrete1) &&
          isNumber(this.state.v_c1)
        ) {
          let batch_density1 = this.state.weight_of_concrete1 / this.state.v_c1;
          this.state.total_batch_density1 = batch_density1.toFixed(2);
          console.log(batch_density1);
        } 
        // else alert("please give correct input");
    
        //density2
        if (
            isNumber(this.state.weight_of_concrete2) &&
            isNumber(this.state.v_c2)
          ) {
            let batch_density2 = this.state.weight_of_concrete2 / this.state.v_c2;
            this.state.total_batch_density2 = batch_density2.toFixed(2);
            console.log(batch_density2);
          } 
          // else alert("please give correct input");

         //density3
         if (
            isNumber(this.state.weight_of_concrete3) &&
            isNumber(this.state.v_c3)
          ) {
            let batch_density3 = this.state.weight_of_concrete3 / this.state.v_c3;
            this.state.total_batch_density3 = batch_density3.toFixed(2);
            console.log(batch_density3);
          } 
          // else alert("please give correct input");
    
        this.setState({
          amount_status: true
        });
      };
      total_batch_difference = e => {
        function isNumber(n) {
          return !isNaN(parseFloat(n)) && isFinite(n);
        }
        e.preventDefault();
        if (isNumber(this.state.w_b1) && isNumber(this.state.weight_of_concrete1)) {
          let dif_batch1 = this.state.w_b1 - this.state.weight_of_concrete1;
          this.state.batch1 = dif_batch1.toFixed(2);
          console.log(dif_batch1);
        } 
        // else alert("please give correct input");
    
        //agg2
        if (isNumber(this.state.w_b2) && isNumber(this.state.weight_of_concrete2)) {
            let dif_batch2 = this.state.w_b2 - this.state.weight_of_concrete2;
            this.state.batch2 = dif_batch2.toFixed(2);
            console.log(dif_batch2);
          } 
          // else alert("please give correct input");
        //agg3
        if (isNumber(this.state.w_b3) && isNumber(this.state.weight_of_concrete3)) {
            let dif_batch3 = this.state.w_b3 - this.state.weight_of_concrete3;
            this.state.batch3 = dif_batch3.toFixed(2);
            console.log(dif_batch3);
          } 
          // else alert("please give correct input");
        this.setState({
          amount_status: true
        });
      };
      total_average_yield_show = e => {
        e.preventDefault();
        this.setState({
          amount_status: true
        });
        let averga_yield_value;
        if(this.state.total_yield1 != 0 && this.state.total_yield2 == 0 && this.state.total_yield3 == 0)
        {
          this.state.new_average_yield_value = this.state.total_yield1
        }
        else if(this.state.total_yield1 == 0 && this.state.total_yield2 != 0 && this.state.total_yield3 == 0)
        {
          this.state.new_average_yield_value = this.state.total_yield2
        }
        else if(this.state.total_yield1 == 0 && this.state.total_yield2 == 0 && this.state.total_yield3 != 0)
        {
          this.state.new_average_yield_value = this.state.total_yield3
        }
        else{
          averga_yield_value = +this.state.total_yield1 + +this.state.total_yield2 + +this.state.total_yield3
          this.state.new_average_yield_value = averga_yield_value.toFixed(2)
        }
       

      }
      total_average_density_concrete = e => {
        e.preventDefault();
        this.setState({
          amount_status: true
        });
        let average_density_concrete;
        if(this.state.total_batch_density1 != 0 && this.state.total_batch_density2 == 0 && this.state.total_batch_density3 == 0)
        {
          this.state.new_average_density_concrete = this.state.total_batch_density1.toFixed(2)
        }
        else if(this.state.total_batch_density1 == 0 && this.state.total_batch_density2 != 0 && this.state.total_batch_density3 == 0)
        {
          this.state.new_average_density_concrete = this.state.total_batch_density2.toFixed(2)
        }
        else if(this.state.total_batch_density1 == 0 && this.state.total_batch_density2 == 0 && this.state.total_batch_density3 != 0)
        {
          this.state.new_average_density_concrete = this.state.total_batch_density3.toFixed(2)
        }
        else{
          average_density_concrete = +this.state.total_batch_density1 + +this.state.total_batch_density2 + +this.state.total_batch_density3
          this.state.new_average_density_concrete = average_density_concrete.toFixed(2)
        }
       

      }
    
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
                        RF - 08
                        </li>
                      </ol>
                    </nav>
                  </div>
                </div>
              </div>
    
              {/*Form content begin */}
    
              <div className="product-form-upper">
                <div className="container">
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
                        <h3>RF -08</h3>
                        Determination of Fresh Wet Density and Yield of concrete IS : 1199 - 1959 
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
                             Grade Of Concrete
                            </label>
                            <div class="col-sm-10">
                            <input
                                list="browsers"
                                name="grade_concrete"
                                value={this.state.grade_concrete}
                                onChange={e => this.change(e)}
                                className="form-control"
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
                              date
                            </label>
                            <div class="col-sm-10">{this.state.date}</div>
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
                              Plant
                            </label>
                            <div class="col-sm-10">
                             {localStorage.getItem('plant_name')}
                            </div>
                          </div>
                        </div>
                        <div class="form-group col-md-6">
                <div class="form-group row">
                  <label for="inputPassword" class="col-sm-2 col-form-label">
                    Sampling Location
                  </label>
                  <div class="col-sm-10">
                  <select className="form-control" onChange={e => this.change(e)} value={this.state.sample_location} name="sample_location">
                  <option value="None">Choose...</option>
                    <option value="Truck">Truck</option>
                    <option value="Bin">Bin</option>
                    <option value="StockYard">StockYard</option>
                  </select>
                  <span className="text-danger">
                        {this.validator.message(
                          "sample location",
                          this.state.sample_location,
                          "required"
                        )}
                      </span>
                  </div>
                </div>
              </div>
                        <div class="form-group col-md-6">
                          <div class="form-group row">
                            <label
                              for="inputSubcategory"
                              className="col-sm-2 col-form-label"
                            >
                              Weight of empty Cylinder (W)
                            </label>
                            <div class="col-sm-10">
                              <input
                                type="text"
                                class="form-control"
                                id="inputPassword"
                                name="weight"
                                value={this.state.weight}
                                onChange={e => this.change(e)}
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
                            Concrete Slump
                            </label>
                            <div class="col-sm-9">
                       
                              <input
                                type="text"
                                class="form-control"
                                id="inputPassword"
                                name="concrete_slump"
                                value={this.state.concrete_slump}
                                onChange={e => this.change(e)}
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
                              Weighing Balance Details
                            </label>
                            <div class="col-sm-9">
                              <input
                                type="text"
                                class="form-control"
                                id="inputPassword"
                                name="weight_balance"
                                value={this.state.weight_balance}
                                onChange={e => this.change(e)}
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
                      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                        <p>Calibration of density container</p>
                        <hr />
                      </div>
                    </div>
                    <form className="custom-content-form">
                      <div className="form-row">
                        <div class="form-group col-md-12">
                          <table class="table table-bordered">
                            <thead class="thead-light">
                              <tr>
                                <th scope="col">#</th>
                                <th>#</th>
                                <th scope="col">Kg</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <th scope="row">
                                  Total weight of water + container
                                </th>
                                <th>(A)</th>
                                <td>
                                  <input
                                    type="text"
                                    className="form-control"
                                    name="s_t1"
                                    value={this.state.s_t1}
                                    onChange={e => this.change(e)}
                                  />
                                </td>
                              </tr>
                              <tr>
                                <th scope="row">Weight of water</th>
                                <td>
                                  <button
                                    type="button"
                                    className="btn btn-info"
                                    onClick={e => this.total_weight_water(e)}
                                  >
                                    Show
                                  </button>
                                </td>
                                <td>{this.state.weight_of_water}</td>
                              </tr>
                              <tr>
                                <th scope="row">
                                  Volume of Density Container <br />V <br />{" "}
                                  [B/1000]{" "}
                                </th>
    
                                <td>
                                  <button
                                    type="button"
                                    className="btn btn-info"
                                    onClick={e => this.total_volume_density(e)}
                                  >
                                    Show
                                  </button>
                                </td>
                                <td>{this.state.volume_density}</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </form>
                    <hr />
                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                      <p>Fresh Wet Density Test </p>
                      <hr />
                    </div>
                    <form className="custom-content-form">
                      <div className="form-row">
                        <div class="form-group col-md-12">
                          <table class="table table-bordered">
                            <thead class="thead-light">
                              <tr>
                                <th scope="col">#</th>
                                <th scope="col">#</th>
                                <th scope="col">TEST 1 </th>
                                <th scope="col">TEST 2</th>
                                <th scope="col">TEST 3</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <th scope="row">
                                  Weight of aggregates + container
                                </th>
                                <th> (p) </th>
                                <td>
                                  <input
                                    type="text"
                                    className="form-control"
                                    name="s_t2"
                                    value={this.state.s_t2}
                                    onChange={e => this.change(e)}
                                  />
                                </td>
    
                                <td>
                                  <input
                                    type="text"
                                    className="form-control"
                                    name="s_t3"
                                    value={this.state.s_t3}
                                    onChange={e => this.change(e)}
                                  />
                                </td>
                                <td>
                                  <input
                                    type="text"
                                    className="form-control"
                                    name="s_t5"
                                    value={this.state.s_t5}
                                    onChange={e => this.change(e)}
                                  />
                                </td>
                              </tr>
                              <tr>
                                <th scope="row">
                                Weight of Concrete (Q) <br /> [P-W Kg]
                                </th>
                                <td>
                                  <button
                                    type="button"
                                    className="btn btn-info"
                                    onClick={e => this.total_weight_aggregate(e)}
                                  >
                                    Show Total
                                  </button>
                                </td>
                                <td>{this.state.weight_of_agreegate1}</td>
                                <td>{this.state.weight_of_aggregate2}</td>
                                <td>{this.state.weight_of_aggregate3}</td>
                              </tr>
                              <tr>
                                <th scope="row">
                                Density of Concrete  (D) <br /> [Q/V]
                                </th>
    
                                <td>
                                  <button
                                    type="button"
                                    className="btn btn-info"
                                    onClick={e => this.total_density_aggregate(e)}
                                  >
                                    Show Total
                                  </button>
                                </td>
                                <td>{this.state.density_agreegate1}</td>
                                <td>{this.state.density_agreegate2}</td>
                                <td>{this.state.density_agreegate3}</td>
                              </tr>
                              <tr>
                                <th scope="row">
                                Unit weight of Concrete in batch sheet (actual batched)
                                </th>
                                <th> (D1) </th>
                                <td>
                                  <input
                                    type="text"
                                    className="form-control"
                                    name="s_y2"
                                    value={this.state.s_y2}
                                    onChange={e => this.change(e)}
                                  />
                                </td>
    
                                <td>
                                  <input
                                    type="text"
                                    className="form-control"
                                    name="s_y3"
                                    value={this.state.s_y3}
                                    onChange={e => this.change(e)}
                                  />
                                </td>
                                <td>
                                  <input
                                    type="text"
                                    className="form-control"
                                    name="s_y5"
                                    value={this.state.s_y5}
                                    onChange={e => this.change(e)}
                                  />
                                </td>
                              </tr>
                              <tr>
                                <th scope="row">
                                Yield of concrete <br />(D1 / D)
                                </th>
                                <td>
                                  <button
                                    type="button"
                                    className="btn btn-info"
                                    onClick={e => this.total_yield_concrete(e)}
                                  >
                                    Show Total
                                  </button>
                                </td>
                                <td>{this.state.total_yield1}</td>
                                <td>{this.state.total_yield2}</td>
                                <td>{this.state.total_yield3}</td>
                              </tr>
                              <tr>
                                <th scope="row">Average Yield</th>
                                <td>
                                <button
                                    type="button"
                                    className="btn btn-info"
                                    onClick={e => this.total_average_yield_show(e)}
                                  >
                                    Show Total
                                  </button>
                                </td>
                               <td colSpan="3">{this.state.new_average_yield_value || 0}</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </form>
                    <hr />
                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                      <p>TM Weighing details </p>
                      <hr />
                    </div>
                    <form className="custom-content-form">
                      <div className="form-row">
                        <div class="form-group col-md-12">
                          <table class="table table-bordered">
                            <thead class="thead-light">
                              <tr>
                                <th scope="col">#</th>
                                <th scope="col">#</th>
                                <th scope="col">TEST 1 </th>
                                <th scope="col">TEST 2</th>
                                <th scope="col">TEST 3</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <th scope="row">
                                Weight of Empty TM 
                                </th>
                                <th> (W<sub>E</sub>) </th>
                                <td>
                                  <input
                                    type="text"
                                    className="form-control"
                                    name="w_e1"
                                    value={this.state.w_e1}
                                    onChange={e => this.change(e)}
                                  />
                                </td>
    
                                <td>
                                  <input
                                    type="text"
                                    className="form-control"
                                    name="w_e2"
                                    value={this.state.w_e2}
                                    onChange={e => this.change(e)}
                                  />
                                </td>
                                <td>
                                  <input
                                    type="text"
                                    className="form-control"
                                    name="w_e3"
                                    value={this.state.w_e3}
                                    onChange={e => this.change(e)}
                                  />
                                </td>
                              </tr>
                              <tr>
                                <th scope="row">
                                Weight of TM + Concrete (WF)
                                </th>
                                <td> = </td>
                                <td>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="w_f1"
                                    value={this.state.w_f1}
                                    onChange={e => this.change(e)}
                                  />
                                </td>
                                <td> <input
                                    type="text"
                                    className="form-control"
                                    name="w_f2"
                                    value={this.state.w_f2}
                                    onChange={e => this.change(e)}
                                  /></td>
                                <td> <input
                                    type="text"
                                    className="form-control"
                                    name="w_f3"
                                    value={this.state.w_f3}
                                    onChange={e => this.change(e)}
                                  /></td>
                               
                              </tr>
                              <tr>
                                <th scope="row">
                                Weight of Concrete in TM (WC)  <br />[Wf - We]
                                </th>
    
                                <td>
                                  <button
                                    type="button"
                                    className="btn btn-info"
                                    onClick={e => this.total_concrete_weight(e)}
                                  >
                                    Show Total
                                  </button>
                                </td>
                                <td>{this.state.weight_of_concrete1}</td>
                                <td>{this.state.weight_of_concrete2}</td>
                                <td>{this.state.weight_of_concrete3}</td>
                              </tr>
                              <tr>
                                <th scope="row">
                                Weight as per batch slip 
                                </th>
                                <th> (Wb) </th>
                                <td>
                                  <input
                                    type="text"
                                    className="form-control"
                                    name="w_b1"
                                    value={this.state.w_b1}
                                    onChange={e => this.change(e)}
                                  />
                                </td>
    
                                <td>
                                  <input
                                    type="text"
                                    className="form-control"
                                    name="w_b2"
                                    value={this.state.w_b2}
                                    onChange={e => this.change(e)}
                                  />
                                </td>
                                <td>
                                  <input
                                    type="text"
                                    className="form-control"
                                    name="w_b3"
                                    value={this.state.w_b3}
                                    onChange={e => this.change(e)}
                                  />
                                </td>
                              </tr>
                              <tr>
                                <th scope="row">
                                Difference in batched quantity <br /> [(Wb - WC) ]
                                </th>
                                <td>
                                  <button
                                    type="button"
                                    className="btn btn-info"
                                    onClick={e => this.total_batch_difference(e)}
                                  >
                                    Show Total
                                  </button>
                                </td>
                                <td>{this.state.batch1}</td>
                                <td>{this.state.batch2}</td>
                                <td>{this.state.batch3}</td>
                              </tr>
                              <tr>
                                <th scope="row">
                                Volume of Concrete batched in TM 
                                </th>
                                <th> (Vc) </th>
                                <td>
                                  <input
                                    type="text"
                                    className="form-control"
                                    name="v_c1"
                                    value={this.state.v_c1}
                                    onChange={e => this.change(e)}
                                  />
                                </td>
    
                                <td>
                                  <input
                                    type="text"
                                    className="form-control"
                                    name="v_c2"
                                    value={this.state.v_c2}
                                    onChange={e => this.change(e)}
                                  />
                                </td>
                                <td>
                                  <input
                                    type="text"
                                    className="form-control"
                                    name="v_c3"
                                    value={this.state.v_c3}
                                    onChange={e => this.change(e)}
                                  />
                                </td>
                              </tr>
                              <tr>
                                <th scope="row">
                                Density of Concrete <br /> [(Wc / Vc) ]
                                </th>
                                <td>
                                  <button
                                    type="button"
                                    className="btn btn-info"
                                    onClick={e => this.total_batch_concrete_density(e)}
                                  >
                                    Show Total
                                  </button>
                                </td>
                                <td>{this.state.total_batch_density1}</td>
                                <td>{this.state.total_batch_density2}</td>
                                <td>{this.state.total_batch_density3}</td>
                              </tr>
                              <tr>
                                <th scope="row">Average Density of Concrete </th>
                                <td>
                                  <button
                                    type="button"
                                    className="btn btn-info"
                                    onClick={e => this.total_average_density_concrete(e)}
                                  >
                                    Show Total
                                  </button>
                                </td>
                               <td colSpan="3">{this.state.new_average_density_concrete}</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </form>
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
                  {/*end comment pto */}
                </div>
              </div>
            </div>
          </div>
        );
      }
    }

export default RF8
