import React, { Component } from "react";
import { Link, Redirect, withRouter, NavLink } from "react-router-dom";
import "../Test/Test.css";
import axios from "axios";
import authService from "../../services/auth-service";
import axiosService from "../../services/axios-service";
import { API_URL } from "../../services/url";
import SimpleReactValidator from "simple-react-validator";
export class VerifyRf5 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      supplier : "",
      verify_comment : "",
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
      testing_quantity: "",
      plant: "",
      total_pan: "",
      date: "",
      s_r1: "",
      s_r2: "",
      s_r3: "",
      s_r4: "",
      s_r5: "",
      s_r6: "",
      s_r7: "",
      s_r8: "",
      s_r9: "",
      s_r10: "",
      s_r11: "",
      s_t1: "",
      s_t2: "",
      s_t3: "",
      s_t4: "",
      s_t5: "",
      s_t6: "",
      s_t7: "",
      s_t8: "",
      s_t9: "",
      s_t10: "",
      s_t11: "",
      s_t12: "",
      s_t13: "",
      s_t14: "",
      s_t15: "",
      s_t16: "",
      s_t17: "",
      s_t18: "",
      s_t19: "",
      s_t20: "",
      s_t21: "",
      s_t22: "",
      s_t23: "",
      s_t24: "",
      s_t25: "",
      s_t26: "",
      s_t27: "",
      s_t28: "",
      s_t29: "",
      s_t30: "",
      s_t31: "",
      s_t32: "",
      s_t33: "",
      s_t34: "",
      s_t35: "",
      s_t36: "",
      s_t37: "",
      s_t38: "",
      s_t39: "",
      s_t40: "",
      s_t41: "",
      s_t42: "",
      s_t43: "",
      s_t44: "",
      s_t45: "",
      s_t46: "",
      s_t47: "",
      s_t48: "",
      s_t50 : '',
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
    console.log("verifyrf05 data", response);
    let res = response.data.data;
    const map = {};
    res.map(async (item, i) => {
      console.log(item.question + "  " + item.answer);
      map[item.question] = item.answer;
    });

    console.log(map);
    await this.setState({
      supplier : map.supplier,
      source: map.source,
      sample_location: map.sample_location,
      weight: map.weight,
      agg_type: map.agg_type,
      weight_balance: map.weight_balance,
      weight_sample_testing: map.weight_sample_testing,
      weight_sample_sieving: map.weight_sample_sieving,
      material_passing: map.material_passing,
      pto_comment: map.pto_comment,
      total: map.total,
      testing_quantity: map.testing_quantity,
      plant: map.plant,
      total_pan: map.total_pan,
      date: map.date,
      s_r1: map.s_r1,
      s_r2: map.s_r2,
      s_r3: map.s_r3,
      s_r4: map.s_r4,
      s_r5: map.s_r5,
      s_r6: map.s_r6,
      s_r7: map.s_r7,
      s_r8: map.s_r8,
      s_r9: map.s_r9,
      s_r10: map.s_r10,
      s_r11: map.s_r11,
      s_t1: map.s_t1,
      s_t2: map.s_t2,
      s_t3: map.s_t3,
      s_t4: map.s_t4,
      s_t5: map.s_t5,
      s_t6: map.s_t6,
      s_t7: map.s_t7,
      s_t8: map.s_t8,
      s_t9: map.s_t9,
      s_t10: map.s_t10,
      s_t11: map.s_t11,
      s_t12: map.s_t12,
      s_t13: map.s_t13,
      s_t14: map.s_t14,
      s_t15: map.s_t15,
      s_t16: map.s_t16,
      s_t17: map.s_t17,
      s_t18: map.s_t18,
      s_t19: map.s_t19,
      s_t20: map.s_t20,
      s_t21: map.s_t21,
      s_t22: map.s_t22,
      s_t23: map.s_t23,
      s_t24: map.s_t24,
      s_t25: map.s_t25,
      s_t26: map.s_t26,
      s_t27: map.s_t27,
      s_t28: map.s_t28,
      s_t29: map.s_t29,
      s_t30: map.s_t30,
      s_t31: map.s_t31,
      s_t32: map.s_t32,
      s_t33: map.s_t33,
      s_t34: map.s_t34,
      s_t35: map.s_t35,
      s_t36: map.s_t36,
      s_t37: map.s_t37,
      s_t38: map.s_t38,
      s_t39: map.s_t39,
      s_t40: map.s_t40,
      s_t41: map.s_t41,
      s_t42: map.s_t42,
      s_t43: map.s_t43,
      s_t44: map.s_t44,
      s_t45: map.s_t45,
      s_t46: map.s_t46,
      s_t47: map.s_t47,
      s_t48: map.s_t48,
      s_t50 : map.s_t50,
    });
    console.log(this.state);
  };

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
        verify_comment: this.state.verify_comment,
        formid: this.props.match.params.id
      };
      console.log("body hare", body);
      try {
        const response = await axios.post(
          `${API_URL}rf_form/verify`,
          body,
          (axios.defaults.headers.common["x-access-token"] = tokenvalue)
        );
        console.log(response);
        //   .then(console.log(this.state));

        if (response.data === "verified") {
          alert(response.data);
          this.props.history.push("/ViewParticleSize");
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
  render() {
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
                      Verify RF 05
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
                  RF:5 (Determination of Particle Size for Coarse aggregate)
                    <hr />
                  </div>
                  {/* <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                              <h3>View RF 13</h3>
                              <hr />
                              <br />
                            </div> */}
                </div>
                <form className="custom-content-form" autoComplete="OFF">
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
                        <input
                          type="text"
                          class="form-control"
                          id="inputPassword"
                          name="plant"
                          value={this.state.plant}
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
                          date
                        </label>
                        <div class="col-sm-10">
                        <input
                          type="text"
                          class="form-control"
                          id="inputPassword"
                          name="date"
                          value={this.state.date}
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
                          Supplier
                        </label>
                        <div class="col-sm-10">
                        <input
                          type="text"
                          class="form-control"
                          id="inputPassword"
                          name="supplier"
                          value={this.state.supplier}
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
                          Sampling Location
                        </label>
                        <div class="col-sm-10">
                        <input
                          type="text"
                          class="form-control"
                          id="inputPassword"
                          name="sample_location"
                          value={this.state.sample_location}
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
                          Weight For Sample Testing
                        </label>
                        <div class="col-sm-10">
                        <input
                          type="text"
                          class="form-control"
                          id="inputPassword"
                          name="weight_balance"
                          value={this.state.weight_balance}
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
                        <th scope="col">seive size mm</th>
                        <th scope="col">Weight Retained gm (W1)</th>
                        <th scope="col">Cumulative retained gm (W2)</th>
                        <th scope="col">Cumulative retained % (A1)</th>
                        <th scope="col">Passing % (100 - A1)</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <th scope="row">80</th>
                        <td>
                          <input
                            type="text"
                            className="form-control"
                            name="s_t1"
                            value={this.state.s_t1}
                            onChange={e => this.change(e)}
                            disabled
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            className="form-control"
                            name="s_t2"
                            value={this.state.s_t2}
                            onChange={e => this.change(e)}
                            disabled
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            className="form-control"
                            name="s_t3"
                            value={this.state.s_t3}
                            onChange={e => this.change(e)}
                            disabled

                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            className="form-control"
                            name="s_t4"
                            value={this.state.s_t4}
                            onChange={e => this.change(e)}
                          
                            disabled
                          />
                        </td>
                      </tr>
                      <tr>
                        <th scope="row">63</th>
                        <td>
                          <input
                            type="text"
                            className="form-control"
                            name="s_t5"
                            value={this.state.s_t5}
                            onChange={e => this.change(e)}
                          
                            disabled
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            className="form-control"
                            name="s_t6"
                            value={this.state.s_t6}
                            onChange={e => this.change(e)}
                          
                            disabled
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            className="form-control"
                            name="s_t7"
                            value={this.state.s_t7}
                            onChange={e => this.change(e)}
                          
                            disabled
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            className="form-control"
                            name="s_t8"
                            value={this.state.s_t8}
                            onChange={e => this.change(e)}
                          
                            disabled
                          />
                        </td>
                      </tr>
                      <tr>
                        <th scope="row">40</th>
                        <td>
                          <input
                            type="text"
                            className="form-control"
                            name="s_t9"
                            value={this.state.s_t9}
                            onChange={e => this.change(e)}
                          
                            disabled
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            className="form-control"
                            name="s_t10"
                            value={this.state.s_t10}
                            onChange={e => this.change(e)}
                          
                            disabled
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            className="form-control"
                            name="s_t11"
                            value={this.state.s_t11}
                            onChange={e => this.change(e)}
                          
                            disabled
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            className="form-control"
                            name="s_t12"
                            value={this.state.s_t12}
                            onChange={e => this.change(e)}
                          
                            disabled
                          />
                        </td>
                      </tr>
                      <tr>
                        <th scope="row">25</th>
                        <td>
                          <input
                            type="text"
                            className="form-control"
                            name="s_t13"
                            value={this.state.s_t13}
                            onChange={e => this.change(e)}
                          
                            disabled
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            className="form-control"
                            name="s_t14"
                            value={this.state.s_t14}
                            onChange={e => this.change(e)}
                          
                            disabled
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            className="form-control"
                            name="s_t15"
                            value={this.state.s_t15}
                            onChange={e => this.change(e)}
                          
                            disabled
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            className="form-control"
                            name="s_t16"
                            value={this.state.s_t16}
                            onChange={e => this.change(e)}
                          
                            disabled
                          />
                        </td>
                      </tr>
                      <tr>
                        <th scope="row">20</th>

                        <td>
                          <input
                            type="text"
                            className="form-control"
                            name="s_t17"
                            value={this.state.s_t17}
                            onChange={e => this.change(e)}
                          
                            disabled
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            className="form-control"
                            name="s_t18"
                            value={this.state.s_t18}
                            onChange={e => this.change(e)}
                          
                            disabled
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            className="form-control"
                            name="s_t19"
                            value={this.state.s_t19}
                            onChange={e => this.change(e)}
                          
                            disabled
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            className="form-control"
                            name="s_t20"
                            value={this.state.s_t20}
                            onChange={e => this.change(e)}
                          
                            disabled
                          />
                        </td>
                      </tr>
                      <tr>
                        <th scope="row">16</th>
                        <td>
                          <input
                            type="text"
                            className="form-control"
                            name="s_t21"
                            value={this.state.s_t21}
                            onChange={e => this.change(e)}
                          
                            disabled
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            className="form-control"
                            name="s_t22"
                            value={this.state.s_t22}
                            onChange={e => this.change(e)}
                          
                            disabled
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            className="form-control"
                            name="s_t23"
                            value={this.state.s_t23}
                            onChange={e => this.change(e)}
                          
                            disabled
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            className="form-control"
                            name="s_t24"
                            value={this.state.s_t24}
                            onChange={e => this.change(e)}
                          
                            disabled
                          />
                        </td>
                      </tr>
                      <tr>
                        <th scope="row">12.5</th>
                        <td>
                          <input
                            type="text"
                            className="form-control"
                            name="s_t25"
                            value={this.state.s_t25}
                            onChange={e => this.change(e)}
                          
                            disabled
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            className="form-control"
                            name="s_t26"
                            value={this.state.s_t26}
                            onChange={e => this.change(e)}
                          
                            disabled
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            className="form-control"
                            name="s_t27"
                            value={this.state.s_t27}
                            onChange={e => this.change(e)}
                          
                            disabled
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            className="form-control"
                            name="s_t28"
                            value={this.state.s_t28}
                            onChange={e => this.change(e)}
                          
                            disabled
                          />
                        </td>
                      </tr>
                      <tr>
                        <th scope="row">10</th>
                        <td>
                          <input
                            type="text"
                            className="form-control"
                            name="s_t29"
                            value={this.state.s_t29}
                            onChange={e => this.change(e)}
                          
                            disabled
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            className="form-control"
                            name="s_t30"
                            value={this.state.s_t30}
                            onChange={e => this.change(e)}
                          
                            disabled
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            className="form-control"
                            name="s_t31"
                            value={this.state.s_t31}
                            onChange={e => this.change(e)}
                          
                            disabled
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            className="form-control"
                            name="s_t32"
                            value={this.state.s_t32}
                            onChange={e => this.change(e)}
                          
                            disabled
                          />
                        </td>
                      </tr>
                      <tr>
                        <th scope="row">4.75</th>
                        <td>
                          <input
                            type="text"
                            className="form-control"
                            name="s_t33"
                            value={this.state.s_t33}
                            onChange={e => this.change(e)}
                          
                            disabled
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            className="form-control"
                            name="s_t34"
                            value={this.state.s_t34}
                            onChange={e => this.change(e)}
                          
                            disabled
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            className="form-control"
                            name="s_t35"
                            value={this.state.s_t35}
                            onChange={e => this.change(e)}
                          
                            disabled
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            className="form-control"
                            name="s_t36"
                            value={this.state.s_t36}
                            onChange={e => this.change(e)}
                          
                            disabled
                          />
                        </td>
                      </tr>
                      <tr>
                        <th scope="row">2.36</th>
                        <td>
                          <input
                            type="text"
                            className="form-control"
                            name="s_t37"
                            value={this.state.s_t37}
                            onChange={e => this.change(e)}
                          
                            disabled
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            className="form-control"
                            name="s_t38"
                            value={this.state.s_t38}
                            onChange={e => this.change(e)}
                          
                            disabled
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            className="form-control"
                            name="s_t39"
                            value={this.state.s_t39}
                            onChange={e => this.change(e)}
                          
                            disabled
                          />
                        </td>
                        <td>
                          <input
                            type="text"
                            className="form-control"
                            name="s_t40"
                            value={this.state.s_t40}
                            onChange={e => this.change(e)}
                          
                            disabled
                          />
                        </td>
                      </tr>
                      <tr>
                        <th scope="row">
                        #
                        {/* <button
                                type="button"
                                className="btn btn-info custom-total-show-btn"
                                onClick={this.totalshow.bind(this)}
                              >
                                Show Pan&nbsp;&nbsp;{" "}
                                <i
                                  class="fa fa-arrow-circle-right"
                                  aria-hidden="true"
                                />
                              </button> */}
                              </th>
                        <td>
                          <em>
                            <strong>{this.state.s_t50}</strong>
                          </em>
                        </td>
                        <td>
                          <em>
                            <strong>{this.state.weight_balance}</strong>
                          </em>
                        </td>
                        <td>
                          <em>
                            <strong> 100</strong>
                          </em>
                        </td>
                        <td>
                          <em>
                            <strong>0</strong>
                          </em>
                        </td>
                      </tr>
                      <tr>
                        <th scope="row">Total</th>
                        <td colSpan="4">{this.state.weight_balance}</td>
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
                        <input
                          type="text"
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
                <hr />
                <form className="custom-content-form">
                  <div className="form-row">
                    <div class="form-group col-md-12">
                      <div class="form-group row">
                        <label
                          for="inputPassword"
                          class="col-sm-2 col-form-label"
                        >
                          Verify Remark
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
              </div>
              {/*end comment pto */}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default VerifyRf5;
