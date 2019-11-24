import React, { Component } from "react";
import { Link, Redirect, withRouter, NavLink } from "react-router-dom";
import "../Test/Test.css";
import axios from "axios";
import { API_URL } from "../../services/url";
import SimpleReactValidator from "simple-react-validator";
export class VerifyRf22 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      verify_comment  :"",
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
    console.log("verifyrf22 data", response);
    let res = response.data.data;
    const map = {};
    res.map(async (item, i) => {
      console.log(item.question + "  " + item.answer);
      map[item.question] = item.answer;
    });

    console.log(map);
    await this.setState({
      total_b_d_average  :map.total_b_d_average,
      manual_specific_gravityt_total1 : map.manual_specific_gravityt_total1,
      manual_specific_gravityt_total2 : map.manual_specific_gravityt_total2,
      manual_specific_gravity : map.manual_specific_gravity,
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
      weight_of_water: map.weight_of_water,
      density_agreegate1: map.density_agreegate1,
      density_agreegate2: map.density_agreegate2,
      volume_density: map.volume_density,
      weight_of_agreegate1: map.weight_of_agreegate1,
      weight_of_agreegate2: map.weight_of_agreegate2,
      plant: map.plant,
      date: map.date,
      s_t1: map.s_t1,
      s_t2: map.s_t2,
      s_t3: map.s_t3
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
      let type;
      if (this.state.formstatus) {
        type = "RF_14";
      } else {
        type = "RF_13";
      }
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
                      Verify RF 22
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
                    RF - 22 : Determination of Dry Loose ad Dry Rodded Bulk Density
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
                          for="inputSubcategory"
                          className="col-sm-2 col-form-label"
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
                          AggregateType
                        </label>
                        <div class="col-sm-9">
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
                              
                                disabled
                              />
                            </td>
                          </tr>
                          <tr>
                            <th scope="row">Weight of water</th>
                            <td>
                              #
                            </td>
                            <td>{this.state.weight_of_water}</td>
                          </tr>
                          <tr>
                            <th scope="row">
                              Volume of Density Container <br />V <br />{" "}
                              [B/1000]{" "}
                            </th>

                            <td>
                             #
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
                          </tr>
                          <tr>
                            <th scope="row">
                              Weight of aggregates (Q) <br /> [P-W Kg]
                            </th>
                            <td>
                             #
                            </td>
                            <td>{this.state.weight_of_agreegate1}</td>
                            <td>{this.state.weight_of_agreegate2}</td>
                          </tr>
                          <tr>
                            <th scope="row">
                              Density of Aggregate (D) <br /> [Q/V]
                            </th>

                            <td>
                             #
                            </td>
                            <td>{this.state.density_agreegate1}</td>
                            <td>{this.state.density_agreegate2}</td>
                          </tr>
                          <tr>
                            <th scope="row">
                              % Voids (Specific gravity of sample - D)/(Specific
                              Gravity of sample)
                            </th>
                                  <td> #</td>
                            <td>
                             {this.state.manual_specific_gravityt_total1}
                            </td>
                            <td>
                            {this.state.manual_specific_gravityt_total2}
                            </td>
                          </tr>
                          <tr>
                            <th scope="row">Average Bulk Density</th>
                            <td>#</td>
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

export default VerifyRf22;
