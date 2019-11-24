import React, { Component } from 'react'
import { Link, Redirect, withRouter, NavLink } from "react-router-dom";
import "../Test/Test.css";
import axios from "axios";
import { API_URL } from "../../services/url";
import SimpleReactValidator from "simple-react-validator";
export class VerifyRf13 extends Component {
    constructor(props) {
        super(props);
        this.state = {
          verify_comment : "",
          query: '',
          supplier: "",
          source: "",
          sample_location: "",
          weight: "",
          agg_type: "",
          agg_type1: "",
          agg_type2: "",
          agg_type3: "",
          weight_balance: "",
          weight_sample_testing: "",
          weight_sample_sieving: "",
          material_passing: "",
          pto_comment: "",
          total: "",
          amount_status: false,
          plant: "",
          date: "",
          formstatus: false,
          response:[]
        };
        this.onSubmit = this.onSubmit.bind(this);
        this.validator = new SimpleReactValidator();
        }
        componentDidMount() {
            this.getFormDetail();
        }
        getFormDetail = async () => {
           // try {
            console.log(this.props.match.params.id)
              const response = await axios.get(
                `${API_URL}rf_form/view/${this.props.match.params.id}`,
                (axios.defaults.headers.common["x-access-token"] = localStorage.getItem("token"))
              );
              console.log('verifyrf13 data',response);
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
          weight:map.weight,
          agg_type: map.agg_type,
          weight_balance: map.weight_balance,
          weight_sample_testing: map.weight_sample_testing,
          weight_sample_sieving: map.weight_sample_sieving,
          material_passing: map.material_passing,
          pto_comment: map.pto_comment,
          total: map.total,
          plant: map.plant,
          date: map.date,
              });
              console.log(this.state);
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
            (axios.defaults.headers.common["x-access-token"] = localStorage.getItem("token"))
          );
         // console.log(response.data.User);
          //console.log(this.state.supl);
    
          if (response.data.success) {
            await this.setState({
              supl: response.data.Regiondata
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
        if (this.validator.allValid()) {
          let tokenvalue = localStorage.getItem("token");
          let type;
          if(this.state.formstatus)
          {
            type = 'RF_14'
          }
          else
          {
            type = 'RF_13'
          }
          let body = {
            verify_comment : this.state.verify_comment,
           formid : this.props.match.params.id
          };
          console.log('body here',body);
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
              this.props.history.push("/ViewTestOne");
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
                          Verify RF 13
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
                        RF - 13 : Determination of Silt content by volume 
                        <hr />
                      </div>
                      {/* <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                        <h3>View RF 13</h3>
                        <hr />
                        <br />
                      </div> */}
                    </div>
                    <form className="custom-content-form" autoComplete='OFF'>
                <div className="form-row">
                  <div class="form-group col-md-6">
                    <div class="form-group row">
                      <label for="inputPassword" class="col-sm-2 col-form-label">
                        Plant
                      </label>
                      <div class="col-sm-10">
                    <input type="text" className="form-control" name="plant" value={this.state.plant} disabled />
                      </div>
                    </div>
                  </div>
                  <div class="form-group col-md-6">
                    <div class="form-group row">
                      <label for="inputPassword" class="col-sm-2 col-form-label">
                        date
                      </label>
                      <div class="col-sm-10"><input type="text" value={this.state.date} className="form-control" name="date" disabled /> </div>
                    </div>
                  </div>
                  <div class="form-group col-md-6">
                    <div class="form-group row">
                      <label for="inputPassword" class="col-sm-2 col-form-label">
                        Supplier
                      </label>
                      <div class="col-sm-10">
                     <input type="text" className="form-control" value={this.state.supplier} name="supplier" disabled />
                      </div>
                    </div>
                  </div>
                  <div class="form-group col-md-6">
                    <div class="form-group row">
                      <label for="inputPassword" class="col-sm-2 col-form-label">
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
                      <label for="inputPassword" class="col-sm-2 col-form-label">
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
                        for="inputSubcategory"
                        className="col-sm-2 col-form-label"
                      >
                        Weight of Sample For Testing
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
                      <label for="inputPassword" class="col-sm-3 col-form-label">
                        AggregateType
                      </label>
                      <div class="col-sm-9">
                        <div class="form-check form-check-inline">
                          <input
                            className="form-control"
                            type="text"
                            id="inlineCheckbox1"
                            value={this.state.agg_type}
                            name="agg_type"
                                  onClick={e => this.change(e)}
                                  disabled
                          />
                          
                        </div>
                        
                      </div>
                    </div>
                  </div>
                  <div class="form-group col-md-6">
                    <div class="form-group row">
                      <label for="inputPassword" class="col-sm-3 col-form-label">
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
                      <div class="form-group row">
                        <label for="inputPassword" class="col-sm-4 col-form-label">
                          Weight of Sample Taken for Testing (A)
                        </label>
                        <div class="col-sm-8">
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
                    <div class="form-group col-md-12">
                      <div class="form-group row">
                        <label for="inputPassword" class="col-sm-4 col-form-label">
                          Weight of Sample Retained After Sieving (B)
                        </label>
                        <div class="col-sm-8">
                          <input
                            type="text"
                            class="form-control"
                            id="inputPassword"
                            name="weight_sample_sieving"
                            value={this.state.weight_sample_sieving}
                            onChange={e => this.change(e)}
                            disabled
                          />
                        </div>
                      </div>
                    </div>
                    <div class="form-group col-md-12">
                      <div class="form-group row">
                        <label for="inputPassword" class="col-sm-4 col-form-label">
                          Material Passing
                          <br />
                          (A-B)/A*100
                        </label>
                        <div class="col-sm-8">
                          {/* <p>para here </p> */}
                          {this.state.material_passing}
                          {/* {this.state.total || 'NO DATA'} */}
                        </div>
                      </div>
                      {/* <button
                        className="btn btn-danger"
                        onClick={e => this.totalshow(e)}
                      >
                        Total
                      </button> */}
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

export default VerifyRf13
