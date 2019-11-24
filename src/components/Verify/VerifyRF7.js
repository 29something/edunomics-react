import React, { Component } from 'react'
import { Link, Redirect, withRouter, NavLink } from "react-router-dom";
import "../Test/Test.css";
import axios from "axios";
import authService from "../../services/auth-service";
import axiosService from "../../services/axios-service";
import { API_URL } from "../../services/url";
import SimpleReactValidator from "simple-react-validator";
export class VerifyRF7 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            verify_comment : "",
          pto_comment: "",
          amount_status: false,
          plant: "",
          batch_time: "",
          date: "",
          sample_location: "",
          customer: "",
          plant_slump: "",
          project: "",
          sampling_time: "",
          sampling_slump: "",
          delivery: "",
          casting_time: "",
          casting_slump: "",
          mix_code: "",
          specimen_size: "",
          specified_slump: "",
          weather: "",
          truck_number: "",
          ambient_temp: "",
          load_size: "",
          location_pour: "",
          batcher_name: "",
          water_admixture: "",
          system_entry: "",
          mix_placement: "",
          system_entry_by: "",
          sample_by: "",
          cube1: "",
          cube2: "",
          cube3: "",
          cube4: "",
          cube5: "",
          cube6: "",
          m1: "",
          m2: "",
          m3: "",
          m4: "",
          m5: "",
          m6: "",
          date_casting1: "",
          date_casting2: "",
          date_casting3: "",
          date_casting4: "",
          date_casting5: "",
          date_casting6: "",
          date_testing1: "",
          date_testing2: "",
          date_testing3: "",
          date_testing4: "",
          date_testing5: "",
          date_testing6: "",
          age1: "",
          age2: "",
          age3: "",
          age4: "",
          age5: "",
          age6: "",
          cube_cond1: "",
          cube_cond2: "",
          cube_cond3: "",
          cube_cond4: "",
          cube_cond5: "",
          cube_cond6: "",
          weight_cube1: "",
          weight_cube2: "",
          weight_cube3: "",
          weight_cube4: "",
          weight_cube5: "",
          weight_cube6: "",
          density_air1: "",
          density_air2: "",
          density_air3: "",
          density_air4: "",
          density_air5: "",
          density_air6: "",
          load1: "",
          load2: "",
          load3: "",
          load4: "",
          load5: "",
          load6: "",
          strength1: "",
          strength2: "",
          strength3: "",
          strength4: "",
          strength5: "",
          strength6: "",
          average_strength1: "",
          average_strength2: "",
          fracture1: "",
          fracture2: "",
          fracture3: "",
          fracture4: "",
          fracture5: "",
          fracture6: "",
          tested1: "",
          tested2: "",
          verified_by1: ""
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
        console.log("verifyrf06 data", response);
        let res = response.data.data;
        const map = {};
        res.map(async (item, i) => {
          console.log(item.question + "  " + item.answer);
          map[item.question] = item.answer;
        });
    
        console.log(map);
        await this.setState({
          pto_comment: map.pto_comment,
          plant: map.plant,
          batch_time: map.batch_time,
          date: map.data,
          sample_location: map.smaple_location,
          customer: map.customer,
          plant_slump: map.plant_slump,
          project: map.project,
          sampling_time: map.sampling_time,
          sampling_slump: map.sampling_slump,
          delivery: map.delivery,
          casting_time: map.casting_time,
          casting_slump: map.casting_slump,
          mix_code: map.mix_code,
          specimen_size: map.specimen_size,
          specified_slump: map.specified_slump,
          weather: map.weather,
          truck_number: map.truck_number,
          ambient_temp: map.ambient_temp,
          load_size: map.load_size,
          location_pour: map.location_pour,
          batcher_name: map.batcher_name,
          water_admixture: map.water_admixture,
          system_entry: map.system_entry,
          mix_placement: map.mix_placement,
          system_entry_by: map.system_entry_by,
          sample_by: map.sample_by,
          cube1: map.cube1,
          cube2: map.cube2,
          cube3: map.cube3,
          cube4: map.cube4,
          cube5: map.cube5,
          cube6: map.cube6,
          m1: map.m1,
          m2: map.m2,
          m3: map.m3,
          m4: map.m4,
          m5: map.m5,
          m6: map.m6,
          date_casting1: map.date_casting1,
          date_casting2: map.date_casting2,
          date_casting3: map.date_casting3,
          date_casting4: map.date_casting4,
          date_casting5: map.date_casting5,
          date_casting6: map.date_casting6,
          date_testing1: map.date_testing1,
          date_testing2: map.date_testing2,
          date_testing3: map.date_testing3,
          date_testing4: map.date_testing4,
          date_testing5: map.date_testing5,
          date_testing6: map.date_testing6,
          age1: map.age1,
          age2: map.age2,
          age3: map.age3,
          age4: map.age4,
          age5: map.age5,
          age6: map.age6,
          cube_cond1: map.cube_cond1,
          cube_cond2: map.cube_cond2,
          cube_cond3: map.cube_cond3,
          cube_cond4: map.cube_cond4,
          cube_cond5: map.cube_cond5,
          cube_cond6: map.cube_cond6,
          weight_cube1: map.weight_cube1,
          weight_cube2: map.weight_cube2,
          weight_cube3: map.weight_cube3,
          weight_cube4: map.weight_cube4,
          weight_cube5: map.weight_cube5,
          weight_cube6: map.weight_cube6,
          density_air1: map.density_air1,
          density_air2: map.density_air2,
          density_air3: map.density_air3,
          density_air4: map.density_air4,
          density_air5: map.density_air5,
          density_air6: map.density_air6,
          load1: map.load1,
          load2: map.load2,
          load3: map.load3,
          load4: map.load4,
          load5: map.load5,
          load6: map.load6,
          strength1: map.strength1,
          strength2: map.strength2,
          strength3: map.strength3,
          strength4: map.strength4,
          strength5: map.strength5,
          strength6: map.strength6,
          average_strength1: map.average_strength1,
          average_strength2: map.average_strength2,
          fracture1: map.fracture1,
          fracture2: map.fracture2,
          fracture3: map.fracture3,
          fracture4: map.fracture4,
          fracture5: map.fracture5,
          fracture6: map.fracture6,
          tested1: map.tested1,
          tested2: map.tested2,
          verified_by1: map.verified_by1
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
              this.props.history.push("/TableRf7");
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
                                value={this.state.plant}
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
                                value={this.state.batch_time}
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
                                value={this.state.smaple_location}
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
                                value={this.state.customer}
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
                                value={this.state.plant_slump}
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
                                value={this.state.project}
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
                                value={this.state.sampling_time}
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
                                value={this.state.sampling_slump}
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
                                value={this.state.delivery}
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
                                value={this.state.casting_time}
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
                                value={this.state.mix_code}
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
                                value={this.state.casting_slump}
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
                                value={this.state.grade_concrete}
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
                              <div class="form-check form-check-inline">
                                <input
                                  className="form-check-input"
                                  type="text"
                                 
                                  value={this.state.specimen_size}
                                  name="specimen_size"
                                  onClick={e => this.change(e)}
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
                              Specified Slump
                            </label>
                            <div class="col-sm-9">
                              <input
                                type="text"
                                class="form-control"
                                id="inputPassword"
                                name="specified_slump"
                                value={this.state.specified_slump}
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
                                value={this.state.weather}
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
                                value={this.state.truck_number}
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
                                value={this.state.ambient_temp}
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
                                value={this.state.load_size}
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
                                value={this.state.location_pour}
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
                                value={this.state.batcher_name}
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
                                value={this.state.water_admixture}
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
                                value={this.state.system_entry}
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
                                value={this.state.mix_placement}
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
                                value={this.state.system_entry_by}
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
                                value={this.state.sample_by}
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
                                <th>#</th>
                                <th scope="col">#</th>
                                <th scope="col">#</th>
                                <th scope="col">#</th>
                                <th scope="col">#</th>
                                <th scope="col">#</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <th scope="row">
                                  Cube reference No (last 4 digit of DC)
                                </th>
                                <th>:</th>
                                <th>
                                  <input
                                    type="text"
                                    className="form-control"
                                    name="cube1"
                                    value={this.state.cube1}
                                    onChange={e => this.change(e)}
                                    disabled
                                  />
                                </th>
                                <td>
                                  <input
                                    type="text"
                                    className="form-control"
                                    name="cube2"
                                    value={this.state.cube2}
                                    onChange={e => this.change(e)}
                                  
                                    disabled
                                  />
                                </td>
                                <td>
                                  <input
                                    type="text"
                                    className="form-control"
                                    name="cube3"
                                    value={this.state.cube3}
                                    onChange={e => this.change(e)}
                                  
                                    disabled
                                  />
                                </td>
                                <td>
                                  <input
                                    type="text"
                                    className="form-control"
                                    name="cube4"
                                    value={this.state.cube4}
                                    onChange={e => this.change(e)}
                                    disabled
                                  
                                    disabled
                                  />
                                </td>
                                <td>
                                  <input
                                    type="text"
                                    className="form-control"
                                    name="cube5"
                                    value={this.state.cube5}
                                    onChange={e => this.change(e)}
                                    disabled
                                  
                                    disabled
                                  />
                                </td>
                                <td>
                                  <input
                                    type="text"
                                    className="form-control"
                                    name="cube6"
                                    value={this.state.cube6}
                                    onChange={e => this.change(e)}
                                  
                                    disabled
                                  />
                                </td>
                              </tr>
                              <tr>
                                <th scope="row">Mould No</th>
                                <th>#</th>
                                <th>
                                  <input
                                    type="text"
                                    className="form-control"
                                    name="m1"
                                    value={this.state.m1}
                                    onChange={e => this.change(e)}
                                    disabled
                                  />
                                </th>
                                <td>
                                  <input
                                    type="text"
                                    className="form-control"
                                    name="m2"
                                    value={this.state.m2}
                                    onChange={e => this.change(e)}
                                    disabled
                                  />
                                </td>
                                <td>
                                  <input
                                    type="text"
                                    className="form-control"
                                    name="m3"
                                    value={this.state.m3}
                                    onChange={e => this.change(e)}
                                    disabled
                                  />
                                </td>
                                <td>
                                  <input
                                    type="text"
                                    className="form-control"
                                    name="m4"
                                    value={this.state.m4}
                                    onChange={e => this.change(e)}
                                    disabled
                                  />
                                </td>
                                <td>
                                  <input
                                    type="text"
                                    className="form-control"
                                    name="m5"
                                    value={this.state.m5}
                                    onChange={e => this.change(e)}
                                    disabled
                                  />
                                </td>
                                <td>
                                  <input
                                    type="text"
                                    className="form-control"
                                    name="m6"
                                    value={this.state.m6}
                                    onChange={e => this.change(e)}
                                    disabled
                                  />
                                </td>
                              </tr>
                              <tr>
                                <th scope="row">Date of Casting</th>
                                <th>#</th>
                                <th>
                                  <input
                                    type="text"
                                    className="form-control"
                                    name="date_casting1"
                                    value={this.state.date_casting1}
                                    onChange={e => this.change(e)}
                                    disabled
                                  />
                                </th>
                                <td>
                                  <input
                                    type="text"
                                    className="form-control"
                                    name="date_casting2"
                                    value={this.state.date_casting2}
                                    onChange={e => this.change(e)}
                                    disabled
                                  />
                                </td>
                                <td>
                                  <input
                                    type="text"
                                    className="form-control"
                                    name="date_casting3"
                                    value={this.state.date_casting3}
                                    onChange={e => this.change(e)}
                                    disabled
                                  />
                                </td>
                                <td>
                                  <input
                                    type="text"
                                    className="form-control"
                                    name="date_casting4"
                                    value={this.state.date_casting4}
                                    onChange={e => this.change(e)}
                                    disabled
                                  />
                                </td>
                                <td>
                                  <input
                                    type="text"
                                    className="form-control"
                                    name="date_casting5"
                                    value={this.state.date_casting5}
                                    onChange={e => this.change(e)}
                                    disabled
                                  />
                                </td>
                                <td>
                                  <input
                                    type="text"
                                    className="form-control"
                                    name="date_casting6"
                                    value={this.state.date_casting6}
                                    onChange={e => this.change(e)}
                                    disabled
                                  />
                                </td>
                              </tr>
                              <tr>
                                <th scope="row">Date of Testing</th>
                                <th>:</th>
                                <th>
                                  <input
                                    type="text"
                                    className="form-control"
                                    name="date_testing1"
                                    value={this.state.date_testing1}
                                    onChange={e => this.change(e)}
                                    disabled
                                  />
                                </th>
                                <td>
                                  <input
                                    type="text"
                                    className="form-control"
                                    name="date_testing2"
                                    value={this.state.date_testing2}
                                    onChange={e => this.change(e)}
                                  
                                    disabled
                                  />
                                </td>
                                <td>
                                  <input
                                    type="text"
                                    className="form-control"
                                    name="date_testing3"
                                    value={this.state.date_testing3}
                                    onChange={e => this.change(e)}
                                  
                                    disabled
                                  />
                                </td>
                                <td>
                                  <input
                                    type="text"
                                    className="form-control"
                                    name="date_testing4"
                                    value={this.state.date_testing4}
                                    onChange={e => this.change(e)}
                                  
                                    disabled
                                  />
                                </td>
                                <td>
                                  <input
                                    type="text"
                                    className="form-control"
                                    name="date_testing5"
                                    value={this.state.date_testing5}
                                    onChange={e => this.change(e)}
                                  
                                    disabled
                                  />
                                </td>
                                <td>
                                  <input
                                    type="text"
                                    className="form-control"
                                    name="date_testing6"
                                    value={this.state.date_testing6}
                                    onChange={e => this.change(e)}
                                  
                                    disabled
                                  />
                                </td>
                              </tr>
                              <tr>
                                <th scope="row">Age (days)</th>
                                <th>:</th>
                                <th>
                                  <input
                                    type="text"
                                    className="form-control"
                                    name="age1"
                                    value={this.state.ag1}
                                    onChange={e => this.change(e)}
                                    disabled
                                  />
                                </th>
                                <td>
                                  <input
                                    type="text"
                                    className="form-control"
                                    name="age2"
                                    value={this.state.age2}
                                    onChange={e => this.change(e)}
                                    disabled
                                  />
                                </td>
                                <td>
                                  <input
                                    type="text"
                                    className="form-control"
                                    name="age3"
                                    value={this.state.age3}
                                    onChange={e => this.change(e)}
                                    disabled
                                  />
                                </td>
                                <td>
                                  <input
                                    type="text"
                                    className="form-control"
                                    name="age4"
                                    value={this.state.age4}
                                    onChange={e => this.change(e)}
                                    disabled
                                  />
                                </td>
                                <td>
                                  <input
                                    type="text"
                                    className="form-control"
                                    name="age5"
                                    value={this.state.age5}
                                    onChange={e => this.change(e)}
                                    disabled
                                  />
                                </td>
                                <td>
                                  <input
                                    type="text"
                                    className="form-control"
                                    name="age6"
                                    value={this.state.age6}
                                    onChange={e => this.change(e)}
                                    disabled
                                  />
                                </td>
                              </tr>
                              <tr>
                                <th scope="row">Cube condition</th>
                                <th>:</th>
                                <th>
                                  <input
                                    type="text"
                                    className="form-control"
                                    name="cube_cond1"
                                    value={this.state.cube_cond1}
                                    onChange={e => this.change(e)}
                                  
                                    disabled
                                  />
                                </th>
                                <td>
                                  <input
                                    type="text"
                                    className="form-control"
                                    name="cube_cond2"
                                    value={this.state.cube_cond2}
                                    onChange={e => this.change(e)}
                                  
                                    disabled
                                  />
                                </td>
                                <td>
                                  <input
                                    type="text"
                                    className="form-control"
                                    name="cube_cond3"
                                    value={this.state.cube_cond3}
                                    onChange={e => this.change(e)}
                                  
                                    disabled
                                  />
                                </td>
                                <td>
                                  <input
                                    type="text"
                                    className="form-control"
                                    name="cube_cond4"
                                    value={this.state.cube_cond4}
                                    onChange={e => this.change(e)}
                                  
                                    disabled
                                  />
                                </td>
                                <td>
                                  <input
                                    type="text"
                                    className="form-control"
                                    name="cube_cond5"
                                    value={this.state.cube_cond5}
                                    onChange={e => this.change(e)}
                                  
                                    disabled
                                  />
                                </td>
                                <td>
                                  <input
                                    type="text"
                                    className="form-control"
                                    name="cube_cond6"
                                    value={this.state.cube_cond6}
                                    onChange={e => this.change(e)}
                                  
                                    disabled
                                  />
                                </td>
                              </tr>
                              <tr>
                                <th scope="row">Weight of cube in air</th>
                                <th>:</th>
                                <th>
                                  <input
                                    type="text"
                                    className="form-control"
                                    name="weight_cube1"
                                    value={this.state.weight_cube1}
                                    onChange={e => this.change(e)}
                                  
                                    disabled
                                  />
                                </th>
                                <td>
                                  <input
                                    type="text"
                                    className="form-control"
                                    name="weight_cube2"
                                    value={this.state.weight_cube2}
                                    onChange={e => this.change(e)}
                                  
                                    disabled
                                  />
                                </td>
                                <td>
                                  <input
                                    type="text"
                                    className="form-control"
                                    name="weight_cube3"
                                    value={this.state.weight_cube3}
                                    onChange={e => this.change(e)}
                                  
                                    disabled
                                  />
                                </td>
                                <td>
                                  <input
                                    type="text"
                                    className="form-control"
                                    name="weight_cube4"
                                    value={this.state.weight_cube4}
                                    onChange={e => this.change(e)}
                                  
                                    disabled
                                  />
                                </td>
                                <td>
                                  <input
                                    type="text"
                                    className="form-control"
                                    name="weight_cube5"
                                    value={this.state.weight_cube5}
                                    onChange={e => this.change(e)}
                                  
                                    disabled
                                  />
                                </td>
                                <td>
                                  <input
                                    type="text"
                                    className="form-control"
                                    name="weight_cube6"
                                    value={this.state.weight_cube6}
                                    onChange={e => this.change(e)}
                                  
                                    disabled
                                  />
                                </td>
                              </tr>
                              <tr>
                                <th scope="row">Density in Air</th>
                                <th>:</th>
                                <th>
                                  <input
                                    type="text"
                                    className="form-control"
                                    name="density_air1"
                                    value={this.state.density_air1}
                                    onChange={e => this.change(e)}
                                  
                                    disabled
                                  />
                                </th>
                                <td>
                                  <input
                                    type="text"
                                    className="form-control"
                                    name="density_air2"
                                    value={this.state.density_air2}
                                    onChange={e => this.change(e)}
                                  
                                    disabled
                                  />
                                </td>
                                <td>
                                  <input
                                    type="text"
                                    className="form-control"
                                    name="density_air3"
                                    value={this.state.density_air3}
                                    onChange={e => this.change(e)}
                                  
                                    disabled
                                  />
                                </td>
                                <td>
                                  <input
                                    type="text"
                                    className="form-control"
                                    name="density_air4"
                                    value={this.state.density_air4}
                                    onChange={e => this.change(e)}
                                  
                                    disabled
                                  />
                                </td>
                                <td>
                                  <input
                                    type="text"
                                    className="form-control"
                                    name="density_air5"
                                    value={this.state.density_air5}
                                    onChange={e => this.change(e)}
                                  
                                    disabled
                                  />
                                </td>
                                <td>
                                  <input
                                    type="text"
                                    className="form-control"
                                    name="density_air6"
                                    value={this.state.density_air6}
                                    onChange={e => this.change(e)}
                                  
                                    disabled
                                  />
                                </td>
                              </tr>
                              <tr>
                                <th scope="row">Load</th>
                                <th>:</th>
                                <th>
                                  <input
                                    type="text"
                                    className="form-control"
                                    name="load1"
                                    value={this.state.load1}
                                    onChange={e => this.change(e)}
                                  
                                    disabled
                                  />
                                </th>
                                <td>
                                  <input
                                    type="text"
                                    className="form-control"
                                    name="load2"
                                    value={this.state.load2}
                                    onChange={e => this.change(e)}
                                  
                                    disabled
                                  />
                                </td>
                                <td>
                                  <input
                                    type="text"
                                    className="form-control"
                                    name="load3"
                                    value={this.state.load3}
                                    onChange={e => this.change(e)}
                                  
                                    disabled
                                  />
                                </td>
                                <td>
                                  <input
                                    type="text"
                                    className="form-control"
                                    name="load4"
                                    value={this.state.load4}
                                    onChange={e => this.change(e)}
                                  
                                    disabled
                                  />
                                </td>
                                <td>
                                  <input
                                    type="text"
                                    className="form-control"
                                    name="load5"
                                    value={this.state.load5}
                                    onChange={e => this.change(e)}
                                  
                                    disabled
                                  />
                                </td>
                                <td>
                                  <input
                                    type="text"
                                    className="form-control"
                                    name="load6"
                                    value={this.state.load6}
                                    onChange={e => this.change(e)}
                                  
                                    disabled
                                  />
                                </td>
                              </tr>
                              <tr>
                                <th scope="row">Strength</th>
                                <th>:</th>
                                <th>
                                  <input
                                    type="text"
                                    className="form-control"
                                    name="strength1"
                                    value={this.state.strength1}
                                    onChange={e => this.change(e)}
                                    disabled
                                  />
                                </th>
                                <td>
                                  <input
                                    type="text"
                                    className="form-control"
                                    name="strength2"
                                    value={this.state.strength2}
                                    onChange={e => this.change(e)}
                                    disabled
                                  />
                                </td>
                                <td>
                                  <input
                                    type="text"
                                    className="form-control"
                                    name="strength3"
                                    value={this.state.strength3}
                                    onChange={e => this.change(e)}
                                    disabled
                                  />
                                </td>
                                <td>
                                  <input
                                    type="text"
                                    className="form-control"
                                    name="strength4"
                                    value={this.state.strength4}
                                    onChange={e => this.change(e)}
                                    disabled
                                  />
                                </td>
                                <td>
                                  <input
                                    type="text"
                                    className="form-control"
                                    name="strength5"
                                    value={this.state.strength5}
                                    onChange={e => this.change(e)}
                                    disabled
                                  />
                                </td>
                                <td>
                                  <input
                                    type="text"
                                    className="form-control"
                                    name="strength6"
                                    value={this.state.strength6}
                                    onChange={e => this.change(e)}
                                    disabled
                                  />
                                </td>
                              </tr>
                              <tr>
                                <th scope="row">Average strength</th>
                                <th>:</th>
                                <th colSpan="3">
                                  <input
                                    type="text"
                                    className="form-control"
                                    name="average_strength1"
                                    value={this.state.average_strength1}
                                    onChange={e => this.change(e)}
                                    disabled
                                  />
                                </th>
                                <td colSpan="3">
                                  <input
                                    type="text"
                                    className="form-control"
                                    name="average_strength2"
                                    value={this.state.average_strength2}
                                    onChange={e => this.change(e)}
                                    disabled
                                  />
                                </td>
                              </tr>
                              <tr>
                                <th scope="row">Type of fracture</th>
                                <th>:</th>
                                <th>
                                  <input
                                    type="text"
                                    className="form-control"
                                    name="fracture1"
                                    value={this.state.fracture1}
                                    onChange={e => this.change(e)}
                                  
                                    disabled
                                  />
                                </th>
                                <td>
                                  <input
                                    type="text"
                                    className="form-control"
                                    name="fracture2"
                                    value={this.state.fracture2}
                                    onChange={e => this.change(e)}
                                  
                                    disabled
                                  />
                                </td>
                                <td>
                                  <input
                                    type="text"
                                    className="form-control"
                                    name="fracture3"
                                    value={this.state.fracture3}
                                    onChange={e => this.change(e)}
                                  
                                    disabled
                                  />
                                </td>
                                <td>
                                  <input
                                    type="text"
                                    className="form-control"
                                    name="fracture4"
                                    value={this.state.fracture4}
                                    onChange={e => this.change(e)}
                                  
                                    disabled
                                  />
                                </td>
                                <td>
                                  <input
                                    type="text"
                                    className="form-control"
                                    name="fracture5"
                                    value={this.state.fracture5}
                                    onChange={e => this.change(e)}
                                  
                                    disabled
                                  />
                                </td>
                                <td>
                                  <input
                                    type="text"
                                    className="form-control"
                                    name="fracture6"
                                    value={this.state.fracture6}
                                    onChange={e => this.change(e)}
                                  
                                    disabled
                                  />
                                </td>
                              </tr>
                              <tr>
                                <th scope="row">Tested By</th>
                                <th>:</th>
                                <th colSpan="3">
                                  <input
                                    type="text"
                                    className="form-control"
                                    name="tested1"
                                    value={this.state.tested1}
                                    onChange={e => this.change(e)}
                                  
                                    disabled
                                  />
                                </th>
                                <td colSpan="3">
                                  <input
                                    type="text"
                                    className="form-control"
                                    name="tested2"
                                    value={this.state.tested2}
                                    onChange={e => this.change(e)}
                                  
                                    disabled
                                  />
                                </td>
                              </tr>
                              <tr>
                                <th>Verified By </th>
                                <th>:</th>
                                <td colSpan="6">
                                  <input
                                    type="text"
                                    className="form-control"
                                    name="verified_by1"
                                    value={this.state.verified_by1}
                                    onChange={e => this.change(e)}
                                  
                                    disabled
                                  />
                                </td>
                              </tr>
                              {/* <tr>
                                    <td colSpan="8">
                                    <button
                                    type="button"
                                    className="btn btn-info custom-total-show-btn"
                                    onClick={this.totalshow.bind(this)}
                                  >
                                    Show &nbsp;&nbsp;{" "}
                                    <i
                                      class="fa fa-arrow-circle-right"
                                      aria-hidden="true"
                                    />
                                  </button>
                                    </td>
                                  </tr> */}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </form>
                    <hr />
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
export default VerifyRF7
