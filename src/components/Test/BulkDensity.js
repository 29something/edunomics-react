import React, { Component } from "react";
import { Link, Redirect, withRouter, NavLink } from "react-router-dom";
import "./Test.css";
import axios from "axios";
import authService from "../../services/auth-service";
import axiosService from "../../services/axios-service";
import { API_URL } from "../../services/url";
import SimpleReactValidator from "simple-react-validator";
import { SuccessModal } from "./SuccessModal";
export class BulkDensity extends Component {
  constructor(props) {
    super(props);
    this.state = {
      _isMounted : false,
      btnstatus : false,
      total_b_d_average  :"",
      manual_specific_gravityt_total1 : "",
      manual_specific_gravityt_total2 : "",
      manual_specific_gravity : "",
      query : "",
      supplier: "",
      source: "",
      sample_location: "",
      weight: "",
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
      volume_density: "",
      weight_of_agreegate1: "",
      weight_of_agreegate2: "",
      plant: "",
      date: "",
      s_t1: "",
      s_t2: "",
      s_t3: ""
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

    this.setState({
      _isMounted  :true
    })
  };

  change = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
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
  handleInputChange = (e) => {
    console.log(e.target.value)
    this.setState({
      query: e.target.value
    }, () => {
      if (this.state.query && this.state.query.length > 1) {
        if (this.state.query.length % 2 === 0) {
          if(this.state._isMounted)
          {
          this.getInfo()
          }
        }
      } else if (!this.state.query) {
      }
    })
  }
  getWebsite = () => {
    fetch("/").then(console.log(this.state));
  };
  async onSubmit(event) {
    event.preventDefault();
    console.log(this.state);
    if (this.validator.allValid()) {
      let tokenvalue = localStorage.getItem("token");
      let body = {
        total_b_d_average : this.state.total_b_d_average,
        manual_specific_gravity : this.state.manual_specific_gravity,
        manual_specific_gravityt_total1 : this.state.manual_specific_gravityt_total1,
        manual_specific_gravityt_total2 : this.state.manual_specific_gravityt_total2,
        supplier: this.state.query,
        source: this.state.source,
        sample_location: this.state.sample_location,
        weight: this.state.weight,
        agg_type: this.state.agg_type,
        weight_balance: this.state.weight_balance,
        weight_of_water: this.state.weight_of_water,
        density_agreegate1: this.state.density_agreegate1,
        density_agreegate2: this.state.density_agreegate2,
        weight_of_agreegate1: this.state.weight_of_agreegate1,
        weight_of_agreegate2: this.state.weight_of_agreegate2,
        pto_comment: this.state.pto_comment,
        plant: localStorage.getItem("plant_name"),
        date: this.state.date,
        type: "RF_22",
        s_t1: this.state.s_t1,
        s_t2: this.state.s_t2,
        s_t3: this.state.s_t3,
        volume_density: this.state.volume_density
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

        if (response.data==='success') {
          // alert(response.data);
          this.props.history.push("/ViewTestSix");
        } else {
          alert(response.data);
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
      this.state.weight_of_agreegate2 = R.toFixed(2);
      console.log(R);
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
      isNumber(this.state.weight_of_agreegate2) &&
      isNumber(this.state.volume_density)
    ) {
      let Z = this.state.weight_of_agreegate2 / this.state.volume_density;
      this.state.density_agreegate2 = Z.toFixed(2);
      console.log(Z);
    } 
    // else alert("please give correct input");

    this.setState({
      amount_status: true
    });
  };
  manual_specific_gravity_func = e => {
    function isNumber(n) {
      return !isNaN(parseFloat(n)) && isFinite(n);
    }
    e.preventDefault();
    if (
      isNumber(this.state.manual_specific_gravity) &&
      isNumber(this.state.density_agreegate1)
    ) {
      let man_spc_gra1 = (+this.state.manual_specific_gravity - +this.state.density_agreegate1) / +this.state.manual_specific_gravity;
      this.state.manual_specific_gravityt_total1 = man_spc_gra1.toFixed(2);
      console.log(man_spc_gra1);
    }
    //  else alert("please give correct input");

    //density2
    if (
      isNumber(this.state.manual_specific_gravity) &&
      isNumber(this.state.density_agreegate2)
    ) {
      let man_spc_gra2 = (+this.state.manual_specific_gravity - +this.state.density_agreegate2) / +this.state.manual_specific_gravity;
      this.state.manual_specific_gravityt_total2 = man_spc_gra2.toFixed(2);
      console.log(man_spc_gra2);
    }
    //  else alert("please give correct input");

    this.setState({
      amount_status: true
    });
  };
  total_bulk_density_average = e => {
    e.preventDefault();
    console.log('heelo')
    let bulk_density_average = 0;
    if(this.state.density_agreegate1 == 0 && this.state.density_agreegate2 != 0)
    {
      this.state.total_b_d_average = this.state.density_agreegate2
      console.log(this.state.total_b_d_average)
    }
    else if(this.state.density_agreegate1 != 0 && this.state.density_agreegate2 == 0)
    {
      this.state.total_b_d_average = this.state.density_agreegate1
      console.log(this.state.total_b_d_average)
    }
    else
    {
      bulk_density_average = (+this.state.density_agreegate1 + +this.state.density_agreegate2) / 2
      this.state.total_b_d_average = bulk_density_average
      console.log(this.state.total_b_d_average)
    }
    this.setState({
      amount_status: true
    });
  }

  componentWillUnmount() {
    this.state._isMounted = false
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
          Bulk Density
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
                      Bulk Density
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
                    <div className="custom-btn-lists">
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
                              Silt
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

                    <hr />
                  </div>

                  <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    <p style={{ textAlign: "center" }}>
                      Test Format - RF:22 (Determination of Dry Loose Bulk Density and Dry Rodded Bulk Density IS : 2386 (Part 3) – 1963)
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
                          Source
                        </label>
                        <div class="col-sm-10">
                          <input
                            type="text"
                            class="form-control"
                            id="inputPassword"
                            name="source"
                            value={this.state.source}
                            onChange={e => this.change(e)}
                          />
                          <span className="text-danger">
                        {this.validator.message(
                          "source",
                          this.state.source,
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
                          <span className="text-danger">
                        {this.validator.message(
                          " weight of empty cylinder",
                          this.state.weight,
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
                          class="col-sm-3 col-form-label"
                        >
                          AggregateType
                        </label>
                        <div class="col-sm-9">
                          <div class="form-check form-check-inline">
                            <input
                              className="form-check-input"
                              type="radio"
                              id="inlineCheckbox1"
                              value="20mm"
                              name="agg_type"
                              onClick={e => this.change(e)}
                              onClick={e => this.change(e)}
                            />
                            <label
                              className="form-check-label"
                              for="inlineCheckbox1"
                            >
                              20mm
                            </label>
                          </div>
                          <div className="form-check form-check-inline">
                            <input
                              className="form-check-input"
                              type="radio"
                              id="inlineCheckbox1"
                              value="12.5mm"
                              name="agg_type"
                              onClick={e => this.change(e)}
                            />
                            <label
                              className="form-check-label"
                              for="inlineCheckbox1"
                            >
                              12.5mm
                            </label>
                          </div>
                          <div className="form-check form-check-inline">
                            <input
                              className="form-check-input"
                              type="radio"
                              id="inlineCheckbox1"
                              value="10mm"
                              name="agg_type"
                              onClick={e => this.change(e)}
                            />
                            <label
                              className="form-check-label"
                              for="inlineCheckbox1"
                            >
                              10mm
                            </label>
                            <span className="text-danger">
                        {this.validator.message(
                          "aggregate type",
                          this.state.agg_type,
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
                          <span className="text-danger">
                        {this.validator.message(
                          "weight balance details",
                          this.state.weight_balance,
                          "required"
                        )}
                      </span>
                        </div>
                      </div>
                    </div>
                    <div class="form-group col-md-12">
                      <div class="form-group row">
                        <label
                          for="inputPassword"
                          class="col-sm-3 col-form-label"
                        >
                         Specifiv Gravity
                        </label>
                        <div class="col-sm-9">
                          <input
                            type="text"
                            class="form-control"
                            id="inputPassword"
                            name="manual_specific_gravity"
                            value={this.state.manual_specific_gravity}
                            onChange={e => this.change(e)}
                          />
                          <span className="text-danger">
                        {this.validator.message(
                          "specific gravity",
                          this.state.manual_specific_gravity,
                          "required"
                        )}
                      </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* <small>* This Fields are Mandatory . </small> */}
                  {/* <br />
                              <button
                                class="btn btn-primary"
                                onClick={this.onSubmit.bind(this)}
                              >
                                Submit
                              </button> */}
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
                  <p>Bulk Density Test</p>
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
                            <th scope="col">DLBD</th>
                            <th scope="col">DRBD</th>
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
                          </tr>
                          <tr>
                            <th scope="row">
                              Weight of aggregates (Q) <br /> [P-W Kg]
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
                            <td>{this.state.weight_of_agreegate2}</td>
                          </tr>
                          <tr>
                            <th scope="row">
                              Density of Aggregate (D) <br /> [Q/V]
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
                          </tr>
                          <tr>
                            <th scope="row">
                              % Voids (Specific gravity of sample - D)/(Specific
                              Gravity of sample)
                            </th>
                                  <td> <button
                                type="button"
                                className="btn btn-info"
                                onClick={e => this.manual_specific_gravity_func(e)}
                              >
                                Show Total
                              </button></td>
                            <td>
                             {this.state.manual_specific_gravityt_total1}
                            </td>
                            <td>
                            {this.state.manual_specific_gravityt_total2}
                            </td>
                          </tr>
                          <tr>
                            <th scope="row">Average Bulk Density</th>
                            <td> <button
                                type="button"
                                className="btn btn-info"
                                onClick={e => this.total_bulk_density_average(e)}
                              >
                                Show Total
                              </button></td>
                           <td colSpan="2">{this.state.total_b_d_average}</td>
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
export default BulkDensity;
