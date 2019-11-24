import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import "./Plant.css";
import axios from "axios";
import authService from "../../services/auth-service";
import { API_URL } from "../../services/url";
import SimpleReactValidator from "simple-react-validator";
export class Plant extends Component {
  constructor(props) {
    super(props);
    this.state = {
      plantId: "",
      plantName: "",
      city: "",
      areadata: [],
      regiondata: [],
      area_id: "",
      region_id : ""
      //    pin : ""
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.validator = new SimpleReactValidator();
  }
  componentDidMount() {
    this.handleClick();
  }
  async handleClick() {
    let tokenvalue = localStorage.getItem("token");
    try {
      const response = await axios.get(
        `${API_URL}region/view`,
        (axios.defaults.headers.common["x-access-token"] = tokenvalue)
      );

      console.log(response);
      if (response.data.success) {
        this.setState({ regiondata: response.data.Regiondata });
      }
    } catch (error) {
      console.log(error);
    }

    //area list here
    try {
      const response = await axios.get(
        `${API_URL}area/view`,
        (axios.defaults.headers.common["x-access-token"] = tokenvalue)
      );
      console.log(response);
      if (response.data.success) {
        this.setState({ areadata: response.data.Area });
      }
    } catch (error) {
      console.log(error);
    }
  }

  change = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  getWebsite = () => {
    fetch("/").then(console.log(this.state));
  };
  async onSubmit(event) {
    let tokenvalue = localStorage.getItem("token");
    event.preventDefault();
    if (this.validator.allValid()) {
      console.log(this.state);
      let body = {
        plantId: this.state.plantId,
      plantName: this.state.plantName,
      city: this.state.city,
      area_id: this.state.area_id
      };
      try {
        const response = await axios.post(
          `${API_URL}plant/add`,
          body,
          (axios.defaults.headers.common["x-access-token"] = tokenvalue)
        );
        console.log(response);

          if (response.data.success) {
            alert(response.data.msg);
            this.props.history.push("/ViewPlant");
          } else {
            alert(response.data.msg);
          }
      } catch (error) {
       alert(error);
      //  console.log(error)
      }
    } else {
      this.validator.showMessages();
      // rerender to show messages for the first time
      this.forceUpdate();
    }
  }

  render() {
    let i = 1;
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
                      Add Plant
                    </li>
                  </ol>
                </nav>
              </div>
            </div>
          </div>

          {/*Form content begin */}

          <div className="product-form-upper">
            <div className="container">
              <div className="below-custom-form">
                <div className="row">
                  <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    <h3>Add Plant</h3>
                    <hr />
                    <br />
                  </div>
                </div>
                <form className="custom-content-form" method="POST">
                  <div class="form-group row">
                    <label
                      for="inputSubcategory"
                      className="col-sm-2 col-form-label"
                    >
                      Plant ID
                    </label>
                    <div class="col-sm-10">
                      <input
                        type="text"
                        className="form-control"
                        value={this.state.plantId}
                        name="plantId"
                        onChange={e => this.change(e)}
                      />
                      <span className="text-danger">
                        {this.validator.message(
                          "plant id",
                          this.state.plantId,
                          "required"
                        )}
                      </span>
                    </div>
                  </div>
                  <div class="form-group row">
                    <label
                      for="inputSubcategory"
                      className="col-sm-2 col-form-label"
                    >
                      Plant Name
                    </label>
                    <div class="col-sm-10">
                      <input
                        type="text"
                        className="form-control"
                        value={this.state.plantName}
                        name="plantName"
                        onChange={e => this.change(e)}
                      />
                      <span className="text-danger">
                        {this.validator.message(
                          "plant name",
                          this.state.plantName,
                          "required"
                        )}
                      </span>
                    </div>
                  </div>
                  <div class="form-group row">
                    <label
                      for="inputSubcategory"
                      className="col-sm-2 col-form-label"
                    >
                      Under City
                    </label>
                    <div class="col-sm-10">
                      <input
                        type="text"
                        className="form-control"
                        value={this.state.city}
                        name="city"
                        onChange={e => this.change(e)}
                      />
                      <span className="text-danger">
                        {this.validator.message(
                          "city name",
                          this.state.city,
                          "required"
                        )}
                      </span>
                    </div>
                  </div>
                  
                  <div class="form-group row">
                    <label
                      for="inputSubcategory"
                      className="col-sm-2 col-form-label"
                    >
                      Under Region
                    </label>
                    <div class="col-sm-10">
                      <select
                        className="form-control"
                        value={this.state.region_id}
                        name="region_id"
                        onChange={e => this.change(e)}
                      >
                        <option>Select One</option>
                        {this.state.regiondata ? (
                          this.state.regiondata.map(function(item, id) {
                            return (
                              <option key={id} value={item.region_id}>
                                {item.region_name}
                              </option>
                            );
                          })
                        ) : (
                          <span>Data is loading....</span>
                        )}
                      </select>
                    </div>
                  </div>
                  <div class="form-group row">
                    <label
                      for="inputSubcategory"
                      className="col-sm-2 col-form-label"
                    >
                      Under Area
                    </label>
                    <div class="col-sm-10">
                      <select
                        className="form-control"
                        value={this.state.area_id}
                        name="area_id"
                        onChange={e => this.change(e)}
                      >
                        <option>Select One</option>
                        {this.state.areadata ? (
                          this.state.areadata.filter(item => item.region_id == this.state.region_id).map(function(item, id) {
                            return (
                              <option key={id} value={item.area_id}>
                                {item.area_name}
                              </option>
                            );
                          })
                        ) : (
                          <span>Data is loading....</span>
                        )}
                      </select>
                      <span className="text-danger">
                        {this.validator.message(
                          "area",
                          this.state.area_id,
                          "required"
                        )}
                      </span>
                    </div>
                  </div>

                  <button class="btn btn-primary" onClick={this.onSubmit}>
                    Submit
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Plant;
