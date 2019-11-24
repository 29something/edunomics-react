import React, { Component } from "react";
import { Link, Redirect, withRouter, NavLink } from "react-router-dom";
import "../Test/Test.css";
import axios from "axios";
import { API_URL } from "../../services/url";
import SimpleReactValidator from "simple-react-validator";
export class VerifyRf20 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      verify_comment : "",
      total_average_score : "",
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
      plant: "",
      date: "",
      average_test2: "",
      average_test1: "",
      s_r1: "",
      s_t1: "",
      s_r3: "",
      s_t3: "",
      s_r5: "",
      s_t5: ""
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
    console.log("verifyrf20 data", response);
    let res = response.data.data;
    const map = {};
    res.map(async (item, i) => {
      console.log(item.question + "  " + item.answer);
      map[item.question] = item.answer;
    });

    console.log(map);
    await this.setState({
      total_average_score : map.total_average_score,
      supplier: map.supplier,
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
      plant: map.plant,
      date: map.date,
      average_test2: map.average_test2,
      average_test1: map.average_test1,
      s_r1: map.s_r1,
      s_t1: map.s_t1,
      s_r3: map.s_r3,
      s_t3: map.s_t3,
      s_r5: map.s_r5,
      s_t5: map.s_t5
    });
    console.log(this.state);
    //   // this.parseJSON(this.state)
    // } catch (error) {
    //   console.log(error);
    // }
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
          this.props.history.push("/ViewTestFive");
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
                      Verify RF 20
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
                    RF - 20 : Determination of Aggregate crushing value
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
                          Weight of empty cup
                        </label>
                        <div class="col-sm-10">
                        <input
                          type="text"
                          class="form-control"
                          id="inputPassword"
                          name="weight"
                          value={this.state.weight}
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
                            <th scope="col">Specific Gravity of Material</th>
                            <th scope="col">
                              <em>spg</em>
                            </th>
                            <th scope="col">Test 1 </th>
                            <th scope="col">Test 2</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <th scope="row">Weight of aggregates + cup</th>
                            <td>W1</td>
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
                            <th scope="row">Weight of aggregates </th>
                            <td>A</td>
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
                            <th scope="row">
                              Weight of material passing 2.36mm sleeve
                            </th>
                            <td>B</td>
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
                            <th scope="row">Aggregate Crushing Value</th>
                            <td>
                           #
                            </td>
                            <td>
                             {this.state.average_test1}
                            </td>
                            <td>
                             {this.state.average_test2}
                            </td>
                          </tr>
                          <tr>
                            <th scope="row">Avergae Crushing Value</th>
                            <td>
                           #
                            </td>
                          <td colSpan="2">
                                 {this.state.total_average_score}
                          </td>
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

export default VerifyRf20;
