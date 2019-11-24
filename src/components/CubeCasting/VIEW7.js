import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
//
import { API_URL } from "../../services/url";
import SimpleReactValidator from "simple-react-validator";
export class VIEW7 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      verified_by1: "",
      verify_comment: "",
      res: "",
      res1: "",
      res2: "",
      res3: "",
      res4: ""
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.validator = new SimpleReactValidator();
  }
  componentDidMount() {
    this.getFormDetail();
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

    today = yyyy + "/" + mm + "/" + dd;
    console.log("date here", today);
    this.state.date = today;
    console.log(this.state.date);
  }

  async change(e, id) {
    let load = e.target.value;
    let weight = e.target.value;
    let testdate = e.target.value;
    const oneDay = 24 * 60 * 60 * 1000;
    console.log(load);
    console.log(id);

    switch (e.target.id) {
      case "load":
        let strength = load / 10;
        document.getElementById(`strength${id}`).value = strength;
        break;
      case "weight":
        let density = weight * 1000;
        document.getElementById(`density${id}`).value = density;
        break;
      case "testdate":
        let cubeage = Math.round(
          (Date.parse(this.state.date) - Date.parse(testdate)) / oneDay
        );
        document.getElementById(`cubeage${id}`).value = cubeage;
        break;
    }
    // {
    //    [e.target.name]: e.target.value
    // }

    // () => {
    //   const { wa1, load1, d1, date } = this.state;
    //   const oneDay = 24 * 60 * 60 * 1000;

    //   this.setState({
    //     // density_air1: wa1 * 1000,
    //     // strength1: load1 / 10,
    //     // cubeage1: Math.round((Date.parse(date) - Date.parse(d1)) / oneDay)
    //   });
    //   console.log(this.state.cubeage1);
    // }
  }

  getFormDetail = async () => {
    // try {
    console.log(this.props.match.params.id);
    const response = await axios.get(
      `${API_URL}cube/view_rf7/view/${this.props.match.params.id}`,
      (axios.defaults.headers.common["x-access-token"] = localStorage.getItem(
        "token"
      ))
    );
    console.log("verifyrf7 data", response.data);
    // this.state.res2 = response.data.data4;
    // let res3 = response.data.data3;
    // res3.push(...this.state.res2);
    const res3 = [...response.data.data3, ...response.data.data4];

    await this.setState({
      res1: response.data.data1[0],
      res: response.data.data2[0],
      res4: res3
    });
    console.log(this.state.res4);

    // const map = {};
    // res.map(async (item, i) => {
    //   console.log(item.question + "  " + item.answer);
    // map[item.question] = item.answer;
    // });
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
                      RF - 07
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
                  <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12" />

                  <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    <p style={{ textAlign: "center" }}>
                      <h3>RF - 07</h3>
                      Certification of sampling and testing of concrete
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
                          <input
                            type="text"
                            name="plant"
                            value={this.state.res.ORG_NAME}
                            onChange={e => this.change(e)}
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
                          Batching Time
                        </label>
                        <div class="col-sm-10">
                          {" "}
                          <input
                            type="text"
                            name="batch_time"
                            value={this.state.res.PRODUCTION_TIME}
                            onChange={e => this.change(e)}
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
                          Date Of Supply
                        </label>
                        <div class="col-sm-10">
                          <input
                            type="text"
                            name="date"
                            value={this.state.date}
                            onChange={e => this.change(e)}
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
                          Sampling Location
                        </label>
                        <div class="col-sm-10">
                          <input
                            type="text"
                            class="form-control"
                            id="inputPassword"
                            name="sample_location"
                            value={this.state.res.sampling_loc}
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
                          Customer
                        </label>
                        <div class="col-sm-10">
                          <input
                            type="text"
                            class="form-control"
                            id="inputPassword"
                            name="customer"
                            value={this.state.res.CUSTOMER_NAME}
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
                          Plant Slump
                        </label>
                        <div class="col-sm-10">
                          <input
                            type="text"
                            class="form-control"
                            id="inputPassword"
                            name="plant_slump"
                            value={this.state.res.plant_slump}
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
                          Project / Site
                        </label>
                        <div class="col-sm-9">
                          <input
                            type="text"
                            class="form-control"
                            id="inputPassword"
                            name="project"
                            value={"NO DATA"}
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
                          Sampling Time
                        </label>
                        <div class="col-sm-9">
                          <input
                            type="text"
                            class="form-control"
                            id="inputPassword"
                            name="sampling_time"
                            value={this.state.res.sampling_time}
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
                          Sampling Slump
                        </label>
                        <div class="col-sm-9">
                          <input
                            type="text"
                            class="form-control"
                            id="inputPassword"
                            name="sampling_slump"
                            value={this.state.res.sampling_slump}
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
                          Delivery Ticket No
                        </label>
                        <div class="col-sm-9">
                          <input
                            type="text"
                            class="form-control"
                            id="inputPassword"
                            name="delivery"
                            value={this.state.res.BATCH_NUMBER}
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
                          Casting Time
                        </label>
                        <div class="col-sm-9">
                          <input
                            type="text"
                            class="form-control"
                            id="inputPassword"
                            name="casting_time"
                            value={this.state.res.casting_time}
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
                          Mix Code
                        </label>
                        <div class="col-sm-9">
                          <input
                            type="text"
                            class="form-control"
                            id="inputPassword"
                            name="mix_code"
                            value={this.state.res.FG_CODE}
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
                          Casting Slump
                        </label>
                        <div class="col-sm-9">
                          <input
                            type="text"
                            class="form-control"
                            id="inputPassword"
                            name="casting_slump"
                            value={this.state.res.casting_slump}
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
                          Grade Of Concrete
                        </label>
                        <div class="col-sm-9">
                          <input
                            type="text"
                            class="form-control"
                            id="inputPassword"
                            name="grade_concrete"
                            value={"NO DATA"}
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
                          Specimen Size
                        </label>
                        <div class="col-sm-9">
                          <input
                            className="form-control"
                            type="text"
                            id="inputPassword"
                            value={this.state.res1.size}
                            name="specimen_size"
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
                          Specified Slump
                        </label>
                        <div class="col-sm-9">
                          <input
                            type="text"
                            class="form-control"
                            id="inputPassword"
                            name="specified_slump"
                            value={this.state.res.sampling_slump}
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
                          Weather
                        </label>
                        <div class="col-sm-9">
                          <input
                            type="text"
                            class="form-control"
                            id="inputPassword"
                            name="weather"
                            value={this.state.res.weather}
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
                          Truck Number
                        </label>
                        <div class="col-sm-9">
                          <input
                            type="text"
                            class="form-control"
                            id="inputPassword"
                            name="truck_number"
                            value={this.state.res.TM_NUMBER}
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
                          Ambient Temperature
                        </label>
                        <div class="col-sm-9">
                          <input
                            type="text"
                            class="form-control"
                            id="inputPassword"
                            name="ambient_temp"
                            value={this.state.res.temp}
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
                          Load Size
                        </label>
                        <div class="col-sm-9">
                          <input
                            type="text"
                            class="form-control"
                            id="inputPassword"
                            name="load_size"
                            value={this.state.res.PRODUCTION_QTY}
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
                          Location Of Pour
                        </label>
                        <div class="col-sm-9">
                          <input
                            type="text"
                            class="form-control"
                            id="inputPassword"
                            name="location_pour"
                            value={"NO DATA"}
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
                          Batcher Name
                        </label>
                        <div class="col-sm-9">
                          <input
                            type="text"
                            class="form-control"
                            id="inputPassword"
                            name="batcher_name"
                            value={"NO DATA"}
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
                          Water / Admixture
                        </label>
                        <div class="col-sm-9">
                          <input
                            type="text"
                            class="form-control"
                            id="inputPassword"
                            name="water_admixture"
                            value={"NO DATA"}
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
                          System Entry No.
                        </label>
                        <div class="col-sm-9">
                          <input
                            type="text"
                            class="form-control"
                            id="inputPassword"
                            name="system_entry"
                            value={"NO DATA"}
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
                          Mix Placement
                        </label>
                        <div class="col-sm-9">
                          <input
                            type="text"
                            class="form-control"
                            id="inputPassword"
                            name="mix_placement"
                            value={this.state.res1.placement}
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
                          System Entry Done By
                        </label>
                        <div class="col-sm-9">
                          <input
                            type="text"
                            class="form-control"
                            id="inputPassword"
                            name="system_entry_by"
                            value={"NO DATA"}
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
                          Sampled By
                        </label>
                        <div class="col-sm-9">
                          <input
                            type="text"
                            class="form-control"
                            id="inputPassword"
                            name="sample_by"
                            value={this.state.res.ft_name}
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
                  {/* <div className="row">
                    <div class="form-group col-md-12"> */}
                  <table class="table table-bordered table-responsive">
                    <thead>
                      <tr>
                        <th scope="col">Cube reference No</th>

                        <th scope="col">Date of Testing</th>

                        <th scope="col">Cube Condition</th>

                        <th scope="col">Cube Age</th>

                        <th scope="col">Weight of Cube in Air</th>

                        <th scope="col">Density in Air</th>

                        <th scope="col">Load</th>

                        <th scope="col">Strength</th>

                        <th scope="col">Type of fracture</th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.res4.length > 0 ? (
                        this.state.res4.map((item, id) => {
                          return (
                            <tr key={id}>
                              <td>{item.cube_ref_no}</td>

                              <td>
                                {item.date_testing ? (
                                  <input
                                    type="date"
                                    className="form-control"
                                    value={item.date_testing}
                                    disabled
                                  />
                                ) : (
                                  <input
                                    type="date"
                                    className="form-control"
                                    value={item.date_testing}
                                    id="testdate"
                                    onChange={e => this.change(e, id)}
                                  />
                                )}
                              </td>

                              <td>
                                {item.mould_no ? (
                                  <select
                                    // type="text"
                                    className="form-control"
                                    value={item.mould_no}
                                    disabled
                                  >
                                    <option value="none">choose...</option>
                                    <option value="Intact">Intact</option>
                                    <option value="Damaged">Damaged</option>
                                  </select>
                                ) : (
                                  <select
                                    // type="text"
                                    className="form-control"
                                    value={item.mould_no}
                                    id={"cubecondition" + id}
                                    onChange={e => this.change(e, id)}
                                  >
                                    <option value="none">choose...</option>
                                    <option value="Intact">Intact</option>
                                    <option value="Damaged">Damaged</option>
                                  </select>
                                )}
                              </td>

                              <td>
                                {item.agecube_con !== undefined ? (
                                  <input
                                    type="text"
                                    className="form-control"
                                    value={item.agecube_con + "Days"}
                                    disabled
                                  />
                                ) : (
                                  <input
                                    type="text"
                                    className="form-control"
                                    id={"cubeage" + id}
                                    value={"0 Days"}
                                    disabled
                                  />
                                )}
                              </td>

                              <td>
                                {item.weight !== undefined ? (
                                  <input
                                    type="text"
                                    className="form-control"
                                    value={item.weight}
                                    disabled
                                  />
                                ) : (
                                  <input
                                    type="text"
                                    className="form-control"
                                    value={item.weight}
                                    id="weight"
                                    onChange={e => this.change(e, id)}
                                  />
                                )}
                              </td>

                              <td>
                                {item.density !== undefined ? (
                                  <input
                                    type="text"
                                    className="form-control"
                                    value={item.density + "Kg/m3"}
                                    disabled
                                  />
                                ) : (
                                  <input
                                    type="text"
                                    className="form-control"
                                    id={"density" + id}
                                    value="0 Kg/m3"
                                    disabled
                                  />
                                )}
                              </td>

                              <td>
                                {item.loads !== undefined ? (
                                  <input
                                    type="text"
                                    className="form-control"
                                    value={item.loads}
                                    disabled
                                  />
                                ) : (
                                  <input
                                    type="text"
                                    className="form-control"
                                    id={"load"}
                                    onChange={e => this.change(e, id)}
                                  />
                                )}
                              </td>

                              <td>
                                {item.strength !== undefined ? (
                                  <input
                                    type="text"
                                    className="form-control"
                                    value={item.strength + " N/mm2"}
                                    disabled
                                  />
                                ) : (
                                  <input
                                    type="text"
                                    className="form-control"
                                    id={"strength" + id}
                                    value={"0 N/mm2"}
                                    disabled
                                  />
                                )}
                              </td>

                              <td>
                                <input
                                  type="text"
                                  className="form-control"
                                  name="m1"
                                  value={item.fracture_type}
                                  onChange={e => this.change(e, id)}
                                />
                              </td>
                            </tr>
                          );
                        })
                      ) : (
                        <span>data loading....</span>
                      )}

                      {/* <th>
                              <input
                                type="date"
                                className="form-control"
                                name="d1"
                                value={this.state.d1}
                                onChange={e => this.change(e)}
                              />
                            </th>
                            <td>
                              <input
                                type="date"
                                className="form-control"
                                name="d2"
                                value={this.state.d2}
                                onChange={e => this.change(e)}
                              />
                            </td>
                            <td>
                              <input
                                type="date"
                                className="form-control"
                                name="d3"
                                value={this.state.d3}
                                onChange={e => this.change(e)}
                              />
                            </td>
                            <td>
                              <input
                                type="date"
                                className="form-control"
                                name="d4"
                                value={this.state.d4}
                                onChange={e => this.change(e)}
                              />
                            </td>
                          </tr>
                          <tr> */}
                      {/* <th scope="row">Cube Condition</th> */}
                      {/* <th>
                              <select
                                type="text"
                                className="form-control"
                                name="cube_cas1"
                                value={this.state.cube_cas1}
                                onChange={e => this.change(e)}
                              >
                                <option value="none">choose...</option>
                                <option value="Intact">Intact</option>
                                <option value="Damaged">Damaged</option>
                              </select>
                            </th>
                            <td>
                              <select
                                type="text"
                                className="form-control"
                                name="cube_cas2"
                                value={this.state.cube_cas2}
                                onChange={e => this.change(e)}
                              >
                                <option value="none">choose...</option>
                                <option value="Intact">Intact</option>
                                <option value="Damaged">Damaged</option>
                              </select>
                            </td>
                            <td>
                              <select
                                type="text"
                                className="form-control"
                                name="cube_cas3"
                                value={this.state.cube_cas3}
                                onChange={e => this.change(e)}
                              >
                                <option value="none">choose...</option>
                                <option value="Intact">Intact</option>
                                <option value="Damaged">Damaged</option>
                              </select>
                            </td>
                            <td>
                              <select
                                type="text"
                                className="form-control"
                                name="cube_cas4"
                                value={this.state.cube_cas4}
                                onChange={e => this.change(e)}
                              >
                                <option value="none">choose...</option>
                                <option value="Intact">Intact</option>
                                <option value="Damaged">Damaged</option>
                              </select>
                            </td>
                          </tr>
                          <tr> */}
                      {/* <th scope="row">Cube Age</th> */}
                      {/* <th>
                              <input
                                type="text"
                                className="form-control"
                                name="cubeage1"
                                value={this.state.cubeage1 + "Days"}
                                onChange={e => this.change(e)}
                                disabled
                              />
                            </th>
                            <td>
                              <input
                                type="text"
                                className="form-control"
                                name="cubeage2"
                                value={this.state.cubeage2 + "Days"}
                                onChange={e => this.change(e)}
                                disabled
                              />
                            </td>
                            <td>
                              <input
                                type="text"
                                className="form-control"
                                name="cubeage3"
                                value={this.state.cubeage3 + "Days"}
                                onChange={e => this.change(e)}
                                disabled
                              />
                            </td>
                            <td>
                              <input
                                type="text"
                                className="form-control"
                                name="cubeage4"
                                value={this.state.cubeage4 + "Days"}
                                onChange={e => this.change(e)}
                                disabled
                              />
                            </td>
                          </tr>
                          <tr> */}
                      {/* <th scope="row">Weight of Cube in Air</th> */}
                      {/* <th>
                              <input
                                type="text"
                                className="form-control"
                                name="wa1"
                                value={this.state.wa1}
                                onChange={e => this.change(e)}
                              />
                            </th>
                            <td>
                              <input
                                type="text"
                                className="form-control"
                                name="wa2"
                                value={this.state.wa2}
                                onChange={e => this.change(e)}
                              />
                            </td>
                            <td>
                              <input
                                type="text"
                                className="form-control"
                                name="wa3"
                                value={this.state.wa3}
                                onChange={e => this.change(e)}
                              />
                            </td>
                            <td>
                              <input
                                type="text"
                                className="form-control"
                                name="wa4"
                                value={this.state.wa4}
                                onChange={e => this.change(e)}
                              />
                            </td>
                          </tr>
                          <tr> */}
                      {/* <th scope="row">Density in Air</th> */}
                      {/* <th>
                              <input
                                type="text"
                                className="form-control"
                                name="density_air1"
                                value={this.state.density_air1 + "Kg/m3"}
                                onChange={e => this.change(e)}
                                disabled
                              />
                            </th>
                            <td>
                              <input
                                type="text"
                                className="form-control"
                                name="density_air2"
                                value={this.state.density_air2 + "Kg/m3"}
                                onChange={e => this.change(e)}
                                disabled
                              />
                            </td>
                            <td>
                              <input
                                type="text"
                                className="form-control"
                                name="density_air3"
                                value={this.state.density_air3 + "Kg/m3"}
                                onChange={e => this.change(e)}
                                disabled
                              />
                            </td>
                            <td>
                              <input
                                type="text"
                                className="form-control"
                                name="density_air4"
                                value={this.state.density_air4 + "Kg/m3"}
                                onChange={e => this.change(e)}
                                disabled
                              />
                            </td>
                          </tr>
                          <tr> */}
                      {/* <th scope="row">Load</th> */}
                      {/* <th>
                              <input
                                type="text"
                                className="form-control"
                                name="load1"
                                value={this.state.load1}
                                onChange={e => this.change(e)}
                              />
                            </th>
                            <td>
                              <input
                                type="text"
                                className="form-control"
                                name="load2"
                                value={this.state.load2}
                                onChange={e => this.change(e)}
                              />
                            </td>
                            <td>
                              <input
                                type="text"
                                className="form-control"
                                name="load3"
                                value={this.state.load3}
                                onChange={e => this.change(e)}
                              />
                            </td>
                            <td>
                              <input
                                type="text"
                                className="form-control"
                                name="load4"
                                value={this.state.load4}
                                onChange={e => this.change(e)}
                              />
                            </td>
                          </tr>
                          <tr> */}
                      {/* <th scope="row">Strength</th> */}
                      {/* <th>
                              <input
                                type="text"
                                className="form-control"
                                name="strength1"
                                value={this.state.strength1 + "N/mm2"}
                                onChange={e => this.change(e)}
                                disabled
                              />
                            </th>
                            <td>
                              <input
                                type="text"
                                className="form-control"
                                name="strength2"
                                value={this.state.strength2 + "N/mm2"}
                                onChange={e => this.change(e)}
                                disabled
                              />
                            </td>
                            <td>
                              <input
                                type="text"
                                className="form-control"
                                name="strength3"
                                value={this.state.strength3 + "N/mm2"}
                                onChange={e => this.change(e)}
                                disabled
                              />
                            </td>
                            <td>
                              <input
                                type="text"
                                className="form-control"
                                name="strength4"
                                value={this.state.strength4 + "N/mm2"}
                                onChange={e => this.change(e)}
                                disabled
                              />
                            </td>
                          </tr>
                          <tr> */}
                      {/* <th scope="row">Type of fracture</th> */}
                      {/* <th>
                              <input
                                type="text"
                                className="form-control"
                                name="fracture1"
                                value={this.state.fracture1}
                                onChange={e => this.change(e)}
                              />
                            </th>
                            <td>
                              <input
                                type="text"
                                className="form-control"
                                name="fracture2"
                                value={this.state.fracture2}
                                onChange={e => this.change(e)}
                              />
                            </td>
                            <td>
                              <input
                                type="text"
                                className="form-control"
                                name="fracture3"
                                value={this.state.fracture3}
                                onChange={e => this.change(e)}
                              />
                            </td>
                            <td>
                              <input
                                type="text"
                                className="form-control"
                                name="fracture4"
                                value={this.state.fracture4}
                                onChange={e => this.change(e)}
                              />
                            </td> */}
                    </tbody>
                  </table>
                  {/* </div>
                  </div> */}
                </form>
                <hr />
              </div>
              {/*end test detail form */}
              {/*comment pto */}
              <div class="below-custom-form">
                <div class="row">
                  <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    <h3>More Details</h3>
                    <hr />
                    <br />
                  </div>
                </div>
                <form class="custom-content-form">
                  <div class="form-row">
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
                          ></textarea>
                        </div>
                      </div>
                    </div>
                  </div>
                  <small>* This Fields are Mandatory . </small>
                  <br />
                  <button class="btn btn-primary">Submit</button>
                </form>
                <div>
                  <div></div>
                </div>
              </div>
              {/*end comment pto */}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default VIEW7;
