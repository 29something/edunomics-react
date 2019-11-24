import React, { Component } from "react";
import { Link, Redirect, withRouter } from "react-router-dom";
import "./Plant.css";
import axios from "axios";
import authService from "../../services/auth-service";
import axiosService from "../../services/axios-service";
import { API_URL } from "../../services/url";
import $ from "jquery";
export class PlantScale extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      dd1: "",
      dd2: "",
      dd3: 0,
      demo: 0
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.handleChange.bind(this);
  }

  change = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
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

  async handleChange(e) {
    let dd3 = 0;
    await this.setState({
      [e.target.name]: e.target.value
    });
    // () => {
    // var tbody = document.querySelector("#list tbody");
    // var tr = document.createElement("tr");
    // if (dd1 != "" && dd2 != "")
    // }
    // );
    const { dd1, dd2 } = this.state;
    dd3 = parseInt(dd1 / dd2);
    console.log(dd3);
    console.log(dd2);
    await this.setState({ dd3 });
  }

  renderTable = dd3 => {
    let rows = "";
    let i;
    console.log(dd3);

    if (dd3 === 0) {
      return null;
    } else {
      for (i = 0; i <= dd3; i++) {
        // let x = document.createElement("INPUT");
        // x.setAttribute("type", "text");
        let { dd1, dd2 } = this.state;
        let y = 0;
        let z = 0;

        rows += `<tr><td>${i + 1}</td><td>${i *
          dd2}</td><td><input type="number" name='name' id=${"a" +
          i} onChange=${e =>
          this.chan(e.target.value, i)} /></td><td>${y}</td><td>${z}</td></tr>`;
        // tr.innerHTML = rows;
        // tbody.appendChild(tr);
        // chan(e) {
        //   this.setState({
        //     demo: (i * dd2) - document.getElementById("a" + i).value
        //   });
        // };
        // $(# ${"a" + i}).on("change", "name", e => this.chan(e, i));
      }

      return <tbody dangerouslySetInnerHTML={{ __html: rows }} />;
    }
  };

  chan = (e, i) => {
    let demo = e.target.value;
    console.log(demo);
  };

  //  document.getElementById(`a${i}`).value;
  // console.log(demo);

  renderTable1 = dd3 => {
    let rows = "";
    console.log(dd3);

    if (dd3 === 0) {
      return null;
    } else {
      for (let i = 0; i <= dd3; i++) {
        // let x = document.createElement("INPUT");
        // x.setAttribute("type", "text");
        let { dd1, dd2 } = this.state;
        let y = 0;
        let z = 0;

        rows += `<tr><td>${i + 1}</td><td>${dd1 -
          i *
            dd2}</td><td><input type="number" className="form-control" id=${"a" +
          i} /></td><td>${y}</td><td>${z}</td></tr>`;
        // tr.innerHTML = rows;
        // tbody.appendChild(tr);
      }
      return <tbody dangerouslySetInnerHTML={{ __html: rows }} />;
    }
  };

  getWebsite = () => {
    fetch("/").then(console.log(this.state));
  };
  async onSubmit(event) {
    event.preventDefault();
    console.log(this.state);
    try {
      const response = await axios.post(
        `${API_URL}zone/add`,
        this.state,
        (axios.defaults.headers.common["authorization"] =
          "Bearer " + authService.getToken())
      );
      console.log(response);
      //   .then(console.log(this.state));

      //   if (response.data.success) {
      //     alert(response.data.msg);
      //     this.props.history.push("/ZoneLoc");
      //   } else {
      //     alert(response.data.msg);
      //   }
    } catch (error) {
      console.log(error);
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
                      Add Test
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
                {/* <div className="row">
                  <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    <h3>Add </h3>
                  </div>
                </div> */}
                <form className="custom-content-form" method="POST">
                  <hr />
                  <p style={{ textAlign: "center" }}>RF30</p>
                  <hr />
                  <div className="row">
                    <div class="form-group col-md-6">
                      <div class="form-group row">
                        <label
                          for="inputPassword"
                          class="col-sm-2 col-form-label"
                        >
                          Plant Location
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
                          Plant Make And Cap
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
                          Date Of Calliberation
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
                          Due Date Of Calliberation
                        </label>
                        <div class="col-sm-10">{this.state.date}</div>
                      </div>
                    </div>
                  </div>

                  <div class="form-group col-md-12">
                    <div class="form-group row">
                      <label
                        for="inputPassword"
                        class="col-sm-2 col-form-label"
                      >
                        Scale
                      </label>
                      <div class="col-sm-10">
                        <select
                          className="form-control"
                          onChange={e => this.change(e)}
                          value={this.state.sample_location}
                          name="sample_location"
                        >
                          <option value="None">Choose...</option>
                          <option value="Truck">Cement</option>
                          <option value="Bin">Water</option>
                          <option value="StockYard">Aggregates</option>
                          <option value="StockYard">Admixture</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div class="form-group col-md-12">
                    <div class="form-group row">
                      <label
                        for="inputPassword"
                        class="col-sm-3 col-form-label"
                      >
                        Frequency
                      </label>
                      <div class="col-sm-9">
                        <p>Weekly</p>
                      </div>
                    </div>
                  </div>

                  <div class="row">
                    <div class="form-group col-md-6">
                      <div class="form-group row">
                        <label
                          for="inputPassword"
                          class="col-sm-2 col-form-label"
                        >
                          Load Upto (in Kg)
                        </label>
                        <div class="col-sm-10">
                          <select
                            className="form-control"
                            onChange={e => this.handleChange(e)}
                            value={this.state.dd1}
                            name="dd1"
                            id="a1"
                          >
                            <option value="None">Choose...</option>
                            <option value="150">150</option>
                            <option value="200">200</option>
                            <option value="250">250</option>
                            <option value="300">300</option>
                            <option value="350">350</option>
                            <option value="400">400</option>
                            <option value="450">450</option>
                            <option value="500">500</option>
                            <option value="550">550</option>
                            <option value="600">600</option>
                            <option value="650">650</option>
                            <option value="700">700</option>
                            <option value="750">750</option>
                            <option value="800">800</option>
                            <option value="850">850</option>
                            <option value="900">900</option>
                            <option value="950">950</option>
                            <option value="1000">1000</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    <div class="form-group col-md-6">
                      <div class="form-group row">
                        <label
                          for="inputPassword"
                          class="col-sm-2 col-form-label"
                        >
                          Rate Of Increment (Kg)
                        </label>
                        <div class="col-sm-10">
                          <select
                            className="form-control"
                            onChange={e => this.handleChange(e)}
                            value={this.state.dd2}
                            name="dd2"
                            id="a2"
                          >
                            <option value="None">Choose...</option>
                            <option value="5">5</option>
                            <option value="10">10</option>
                            <option value="20">20</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>

          <div className="product-form-upper">
            <div className="container-fluid">
              <div className="below-custom-form">
                <div class="row">
                  <div class="col-6">
                    <h2>Loading Table</h2>
                    <table class="table table-bordered">
                      <thead class="thead-light">
                        <tr>
                          <th scope="col">Sr. No.</th>
                          <th scope="col">Cumulative Weight</th>
                          <th scope="col">
                            Reading Obsereved (Kg) on digital scale of BP
                          </th>
                          <th scope="col">Variation ± kg</th>
                          <th scope="col">%Variation (±)</th>
                        </tr>
                      </thead>
                      {this.renderTable(this.state.dd3)}
                    </table>
                  </div>
                  <div class="col-6">
                    <h2>Un Loading Table</h2>
                    <table class="table table-bordered">
                      <thead class="thead-light">
                        <tr>
                          <th scope="col">Sr. No.</th>
                          <th scope="col">Cumulative Weight</th>
                          <th scope="col">
                            Reading Obsereved (Kg) on digital scale of BP
                          </th>
                          <th scope="col">Variation ± kg</th>
                          <th scope="col">%Variation (±)</th>
                        </tr>
                      </thead>
                      {this.renderTable1(this.state.dd3)}
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="product-form-upper">
            <div className="container-fluid">
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
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default PlantScale;
