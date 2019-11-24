import React, { Component } from 'react'
import { Link, Redirect, withRouter, NavLink } from "react-router-dom";
import "../Test/Test.css";
import axios from "axios";
import { API_URL } from "../../services/url";
import SimpleReactValidator from "simple-react-validator";
export class VerifyRf16 extends Component {
    constructor(props) {
        super(props);
        this.state = {
          verify_comment: "",
          total_SMC1 : "",
          total_SMC2 : "",
          total_SMC3 : "",
          total_SMC4 : "",
          query :"",
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
          total_wa1 : "",
          total_wa2 : "",
          total_wa3 : "",
          total_wa4: "",
          wa1 : "",
          wa2 : "",
          wa3 : "",
          wa4 : "",
          total_vs1: "",
          total_vs2: "",
          total_vs3: "",
          total_vs4: "",
          total_vd1: "",
          total_vd2: "",
          total_vd3: "",
          total_vd4: "",
          total_surf_moist1 : "",
          total_surf_moist2 : "",
          total_surf_moist3 : "",
          total_surf_moist4 : "",
          testing_quantity: "",
          plant: "",
          spg1: "",
          spg2: "",
          spg3: "",
          spg4: "",
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
        console.log("verifyrf15 data", response);
        let res = response.data.data;
        const map = {};
        res.map(async (item, i) => {
          console.log(item.question + "  " + item.answer);
          map[item.question] = item.answer;
        });
    
        console.log(map);
        await this.setState({
          total_SMC1 : map.total_SMC1,
      total_SMC2 : map.total_SMC2,
      total_SMC3 : map.total_SMC3,
      total_SMC4 : map.total_SMC4,
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
      total_wa1 : map.total_wa1,
      total_wa2 : map.total_wa2,
      total_wa3 : map.total_wa3,
      total_wa4: map.total_wa4,
      wa1 : map.wa1,
      wa2 : map.wa2,
      wa3 : map.wa3,
      wa4 : map.wa4,
      total_vs1: map.total_vs1,
      total_vs2: map.total_vs2,
      total_vs3: map.total_vs3,
      total_vs4: map.total_vs4,
      total_vd1: map.total_vd1,
      total_vd2: map.total_vd2,
      total_vd3: map.total_vd3,
      total_vd4: map.total_vd4,
      total_surf_moist1 : map.total_surf_moist1,
      total_surf_moist2 : map.total_surf_moist2,
      total_surf_moist3 : map.total_surf_moist3,
      total_surf_moist4 : map.total_surf_moist4,
      testing_quantity: map.testing_quantity,
      plant: map.plant,
      spg1: map.spg1,
      spg2: map.spg2,
      spg3: map.spg3,
      spg4: map.spg4,
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
      showformhandle() {
        const doesShow = this.state.formstatus;
        this.setState({ formstatus: !doesShow });
      }
      getInfo = async () => {
        try {
          const response = await axios.get(
            `${API_URL}region/view`,
            (axios.defaults.headers.common["x-access-token"] = localStorage.getItem(
              "token"
            ))
          );
          // console.log(response.data.User);
          //console.log(this.state.supl);
    
          if (response.data.success) {
            await this.setState({
              supl: response.data.Regiondata
            });
            console.log(this.state.supl);
          }
          // this.parseJSON(this.state)
        } catch (error) {
          console.log(error);
        }
      };
      handleInputChange = e => {
        console.log(e.target.value);
        this.setState(
          {
            query: e.target.value
          },
          () => {
            if (this.state.query && this.state.query.length > 1) {
              if (this.state.query.length % 2 === 0) {
                this.getInfo();
              }
            } else if (!this.state.query) {
            }
          }
        );
      };
    
      async onSubmit(event) {
        event.preventDefault();
        if (this.validator.allValid()) {
          let tokenvalue = localStorage.getItem("token");
          let body = {
            verify_comment: this.state.verify_comment,
            formid: this.props.match.params.id
          };
          console.log("body here", body);
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
              this.props.history.push("/ViewTestTwo");
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
                          Verify RF 16
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
                        RF - 16 : Determination of surface moisture content of Aggregates (Oven Drying Method) IS : 2386 (Part 3) – 1963
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
                                name="plant"
                                value={this.state.plant}
                                onChange={e => this.handleInputChange(e)}
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
                              <input
                                type="text"
                                name="supplier"
                                value={this.state.supplier}
                                onChange={e => this.handleInputChange(e)}
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
                        <div class="form-group col-md-12">
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
                       
            
                        <div class="form-group col-md-12">
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
                        <th scope="col" />
                        <th scope="col" />
                        <th scope="col">CA - I (gm)</th>
                        <th scope="col">CA - II (gm)</th>
                        <th scope="col">FA - I (gm)</th>
                        <th scope="col">FA - II (gm)</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <th scope="row">Standard Water absorption of aggregates</th>
                        <td>
                          <em>W<sub>a</sub></em>
                        </td>
                        <td>
                          {" "}
                          <input
                            type="text"
                            className="form-control"
                            name="wa1"
                            value={this.state.wa1}
                            onChange={e => this.change(e)}
                            disabled
                          />
                        </td>
                        <td>
                          {" "}
                          <input
                            type="text"
                            className="form-control"
                            name="wa2"
                            value={this.state.wa2}
                            onChange={e => this.change(e)}
                          
                            disabled
                          />
                        </td>
                        <td>
                          {" "}
                          <input
                            type="text"
                            className="form-control"
                            name="wa3"
                            value={this.state.wa3}
                            onChange={e => this.change(e)}
                          
                            disabled
                          />
                        </td>
                        <td>
                          {" "}
                          <input
                            type="text"
                            className="form-control"
                            name="wa4"
                            value={this.state.wa4}
                            onChange={e => this.change(e)}
                          
                            disabled
                          />
                        </td>
                      </tr>
                      <tr>
                        <th scope="row">
                        Wet Weight of aggregates 
                        </th>
                        <td>
                         A
                        </td>
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
                        <td>
                          <input
                            type="text"
                            className="form-control"
                            name="s_t2"
                            value={this.state.s_t2}
                            onChange={e => this.change(e)}
                         
                            disabled />
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
                        <th scope="row">DRY weight of aggregates</th>
                        <td>B</td>
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
                        <th scope="row">
                          Total water content in aggregates (C)
                          <br />(A -B)/B * 100
                        </th>
                        <td>
                        #
                        </td>
                        <td>{this.state.total_wa1}</td>
                        <td>
                          {this.state.total_wa2}
                        </td>
                        <td>
                         {this.state.total_wa3}
                        </td>
                        <td>
                        {this.state.total_wa4}
                        </td>
                      </tr>
                      <tr>
                        <th scope="row">Surface moisture content</th>
                        <td>#</td>
                        <td>
                          {this.state.total_SMC1}
                        </td>
                        <td>
                         {this.state.total_SMC2}
                        </td>
                        <td>
                          {this.state.total_SMC3}
                        </td>
                        <td>
                        {this.state.total_SMC4}
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

export default VerifyRf16
