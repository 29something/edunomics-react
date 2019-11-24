import React, { Component } from "react";
import "./Assets.css";
import { Link } from "react-router-dom";
import axios from "axios";
import authService from "../../services/auth-service";
import axiosService from "../../services/axios-service";
import { API_URL } from "../../services/url";
import SimpleReactValidator from "simple-react-validator";
export class AssetPlant extends Component {
  constructor(props) {
    super(props);
    this.state = {
      plant_asset: "",
      asset_type: "",
      asset_condition: "",
      asset_make_date: "",
      asset_img: ""
    };
    this.validator = new SimpleReactValidator();
  }

  change = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  getWebsite = () => {
    fetch("/");
  };
  async onSubmit(e) {
    e.preventDefault();
    console.log(this.state);
    if (this.validator.allValid()) {
      let body = {
        asset_type: this.state.asset_type,
        asset_brief: this.state.asset_brief,
        asset_img: this.state.asset_img
      };
      this.props.history.push("/ViewAssetPlant");
      console.log("body state hre", body);
      try {
        const response = await axios.post(
          `${API_URL}area/add`,
          body,
          (axios.defaults.headers.common["authorization"] =
            "Bearer " + authService.getToken())
        );

        console.log(response);
        // this.props.history.push("/ViewArea");
        //   .then(console.log(this.state));
        // .then(
        //   function(response) {
        //     //console.log(error);
        //     if (response.data.success) {
        //       alert(response.data.msg);
        //       this.props.history.push("/ViewArea");
        //     } else {
        //       alert(response.data.msg);
        //     }
        //   }.bind(this)
        // )
        // .catch(error => {
        //   // alert(error.response.data.msg)
        //   console.log(error.response);
        // });
      } catch (error) {
        console.log(error);
      }
    } else {
      this.validator.showMessages();
      // rerender to show messages for the first time
      this.forceUpdate();
    }
  }

  getCurrentPosition() {
    console.log(this.prop.latitude);
    //   {this.props.getCurrentPosition}
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
                      <Link to="/">Home</Link>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                      Asset At Plant
                    </li>
                  </ol>
                </nav>
              </div>
            </div>
          </div>

          {/*Form content begin */}

          <div className="product-form-upper">
            <div className="container">
              <div className="below-custom-form below-custom-blog-form">
                <div className="row">
                  <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    <h3>Asset At Plant</h3>
                    <hr />
                    <br />
                  </div>
                </div>

                <form className="custom-content-form">
                  <div class="form-group row">
                    <label
                      for="inputSubcategory"
                      className="col-sm-1 col-form-label"
                    >
                      Plant Asset
                    </label>
                    <div class="col-sm-11">
                      <input
                        type="text"
                        className="form-control"
                        value={this.state.plant_asset}
                        name="plant_asset"
                        onChange={e => this.change(e)}
                      />
                      <span className="text-danger">
                        {this.validator.message(
                          "asset",
                          this.state.plant_asset,
                          "required"
                        )}
                      </span>
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group col-md-6">
                      <div className="form-group row">
                        <label
                          for="inputSubcategory"
                          className="col-sm-2 col-form-label"
                        >
                          Asset Type
                        </label>
                        <div class="col-sm-10">
                          <select
                            className="form-control"
                            value={this.state.asset_type}
                            name="asset_type"
                            onChange={e => this.change(e)}
                          >
                            <option value="0">Choose...</option>
                            <option value="1">Type 1</option>
                            <option value="2">Type 2</option>
                            <option value="3">Type 3</option>
                          </select>
                          <span className="text-danger">
                        {this.validator.message(
                          "asset type",
                          this.state.asset_type,
                          "required"
                        )}
                      </span>
                        </div>
                      </div>
                    </div>
                    <div className="form-group col-md-6">
                      <div class="form-group row">
                        <label
                          for="inputSubcategory"
                          className="col-sm-2 col-form-label"
                        >
                          Asset Make Date
                        </label>
                        <div class="col-sm-10">
                          <input
                            type="date"
                            className="form-control"
                            value={this.state.asset_make_date}
                            name="asset_make_date"
                            onChange={e => this.change(e)}
                          />
                           <span className="text-danger">
                        {this.validator.message(
                          "date",
                          this.state.asset_make_date,
                          "required"
                        )}
                      </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group col-md-6">
                      <div class="form-group row">
                        <label
                          for="inputSubcategory"
                          className="col-sm-2 col-form-label"
                        >
                          Asset Condition
                        </label>
                        <div class="col-sm-10">
                          <select
                            className="form-control"
                            value={this.state.asset_condition}
                            name="asset_condition"
                            onChange={e => this.change(e)}
                          >
                            <option value="0">Choose...</option>
                            <option value="1">Type 1</option>
                            <option value="2">Type 2</option>
                            <option value="3">Type 3</option>
                          </select>
                          <span className="text-danger">
                        {this.validator.message(
                          "condition",
                          this.state.asset_condition,
                          "required"
                        )}
                      </span>
                        </div>
                      </div>
                    </div>
                    <div className="form-group col-md-6">
                      <div class="form-group row">
                        <label
                          for="inputSubcategory"
                          className="col-sm-2 col-form-label"
                        >
                          Asset Image
                        </label>
                        <div class="col-sm-10">
                          <input
                            type="file"
                            className="form-control"
                            value={this.state.asset_img}
                            name="asset_img"
                            onChange={e => this.change(e)}
                          />
                          
                        </div>
                      </div>
                    </div>
                  </div>

                  <button
                    class="btn btn-primary"
                    onClick={e => this.onSubmit(e)}
                  >
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

export default AssetPlant;
