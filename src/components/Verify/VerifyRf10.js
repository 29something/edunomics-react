import React, { Component } from "react";
import { Link, Redirect, withRouter, NavLink } from "react-router-dom";
import "../Test/Test.css";
import axios from "axios";
import authService from "../../services/auth-service";
import axiosService from "../../services/axios-service";
import { API_URL } from "../../services/url";
import SimpleReactValidator from "simple-react-validator";
export class VerifyRf10 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      verify_comment : "",
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
      total_t: "",
      total_r: "",
      total_flakiness_index: "",
      amount_status: false,
      testing_quantity: "",
      plant: localStorage.getItem("plant_name"),
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
      s_t1: "",
      s_t2: "",
      s_t3: "",
      s_t4: "",
      s_t5: "",
      s_t6: "",
      s_t7: "",
      s_t8: "",
      s_t9: ""
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
    console.log("verifyrf10 data", response);
    let res = response.data.data;
    const map = {};
    res.map(async (item, i) => {
      console.log(item.question + "  " + item.answer);
      map[item.question] = item.answer;
    });

    console.log(map);
    await this.setState({
      supplier: map.supplier,
      source: map.source,
      sample_location: map.sample_location,
      plant: map.plant,
      testing_quantity: map.testing_quantity,
      total_flakiness_index: map.total_flakiness_index,
      total_r: map.total_r,
      total_t: map.total_t,
      weight_balance: map.weight_balance,
      weight_sample_testing: map.weight_sample_testing,
      agg_type: map.agg_type,
      date: map.date,
      pto_comment: map.pto_comment,
      total_t: map.total_t,
      total_r: map.total_r,
      total_flakiness_index: map.total_flakiness_index,
      testing_quantity: map.testing_quantity,
      plant: map.plant,
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
      s_t1: map.s_t1,
      s_t2: map.s_t2,
      s_t3: map.s_t3,
      s_t4: map.s_t4,
      s_t5: map.s_t5,
      s_t6: map.s_t6,
      s_t7: map.s_t7,
      s_t8: map.s_t8,
      s_t9: map.s_t9
    });
    console.log(this.state);
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

        if (response.data === 'verified') {
          alert(response.data);
          this.props.history.push("/ViewTestSeven");
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
    let total_amount_r;
    let total_amount =
      +this.state.s_t1 +
      +this.state.s_t2 +
      +this.state.s_t3 +
      +this.state.s_t4 +
      +this.state.s_t5 +
      +this.state.s_t6 +
      +this.state.s_t7 +
      +this.state.s_t8 +
      +this.state.s_t9;
    this.state.total_t = total_amount;
    total_amount_r =
      +this.state.s_r1 +
      +this.state.s_r2 +
      +this.state.s_r3 +
      +this.state.s_r4 +
      +this.state.s_r5 +
      +this.state.s_r6 +
      +this.state.s_r7 +
      +this.state.s_r8 +
      +this.state.s_r9;
    this.state.total_r = total_amount_r;
    let flak_ind_amount = (total_amount_r / total_amount) * 100;
    this.state.total_flakiness_index = flak_ind_amount;
    console.log("flak aomounth ere", flak_ind_amount);
    console.log(this.state.total_t, this.state.total_r);
    this.setState({
      amount_status: true
    });
  };
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
                      Verify RF 10
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
                    RF - 10 : (Determination of Aggregate Elongation Index 
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
                        <div class="col-sm-10"> <input
                          type="text"
                          class="form-control"
                          id="inputPassword"
                          name="date"
                          value={this.state.date}
                          onChange={e => this.change(e)}
                          disabled
                        /></div>
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
                          name="weight_sample_testing"
                          value={this.state.weight_sample_testing}
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
                          Aggregate Type
                        </label>
                        <div class="col-sm-9">
                          <div class="form-check form-check-inline">
                          <input
                          type="text"
                          class="form-control"
                          id="inputPassword"
                          name="agg_type"
                          value={this.state.agg_type}
                          onChange={e => this.change(e)}
                          disabled
                        />
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
                            <th scope="col">Passing Through IS Sieve (mm)</th>
                            <th scope="col">Retained On IS Sieve (mm)</th>
                            <th scope="col">
                              Sample Taken on Each Fraction (gm)
                            </th>
                            <th scope="col">
                              Sample Retained on Each Fraction (gm)
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <th scope="row">63.0</th>
                            <td>50.0</td>
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
                                name="s_r1"
                                value={this.state.s_r1}
                                onChange={e => this.change(e)}
                              
                                disabled
                              />
                            </td>
                          </tr>
                          <tr>
                            <th scope="row">50.0</th>
                            <td>40.0</td>
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
                                name="s_r2"
                                value={this.state.s_r2}
                                onChange={e => this.change(e)}
                              
                                disabled
                              />
                            </td>
                          </tr>
                          <tr>
                            <th scope="row">40.0</th>
                            <td>25.0</td>
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
                                name="s_r3"
                                value={this.state.s_r3}
                                onChange={e => this.change(e)}
                              
                                disabled
                              />
                            </td>
                          </tr>
                          <tr>
                            <th scope="row">31.5</th>
                            <td>25.0</td>
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
                            <td>
                              <input
                                type="text"
                                className="form-control"
                                name="s_r4"
                                value={this.state.s_r4}
                                onChange={e => this.change(e)}
                              
                                disabled
                              />
                            </td>
                          </tr>
                          <tr>
                            <th scope="row">25.0</th>
                            <td>20.0</td>
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
                                name="s_r5"
                                value={this.state.s_r5}
                                onChange={e => this.change(e)}
                              
                                disabled
                              />
                            </td>
                          </tr>
                          <tr>
                            <th scope="row">20.0</th>
                            <td>16.0</td>
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
                                name="s_r6"
                                value={this.state.s_r6}
                                onChange={e => this.change(e)}
                              
                                disabled
                              />
                            </td>
                          </tr>
                          <tr>
                            <th scope="row">16.0</th>
                            <td>12.5</td>
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
                                name="s_r7"
                                value={this.state.s_r7}
                                onChange={e => this.change(e)}
                              
                                disabled
                              />
                              
                            </td>
                          </tr>
                          <tr>
                            <th scope="row">12.5</th>
                            <td>10.0</td>
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
                            <td>
                              <input
                                type="text"
                                className="form-control"
                                name="s_r8"
                                value={this.state.s_r8}
                                onChange={e => this.change(e)}
                              
                                disabled
                              />
                            </td>
                          </tr>
                          <tr>
                            <th scope="row">10.0</th>
                            <td>6.3</td>
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
                                name="s_r9"
                                value={this.state.s_r9}
                                onChange={e => this.change(e)}
                              
                                disabled
                              />
                            </td>
                          </tr>
                          <tr>
                            <td colSpan="2" style={{ textAlign: "center" }}>
                             #
                            </td>
                            <td>
                              <strong>{this.state.total_t}</strong>
                             
                            </td>
                            <td>{this.state.total_r}</td>
                          </tr>
                          <tr>
                            <td colSpan="2" style={{ textAlign: "center" }}>
                              Flakiness Index [ (W1 ÷ W) × 100 ] =
                            
                            </td>
                            <td colSpan="2">
                            <strong> {this.state.total_flakiness_index}</strong>
                             
                            </td>
                          </tr>
                        </tbody>
                      </table>
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
export default VerifyRf10;
