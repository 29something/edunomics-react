import React, { Component } from "react";
import { Link, withRouter, Redirect } from "react-router-dom";
import "./Plant.css";
import axios from "axios";
import authService from "../../services/auth-service";
import axiosService from "../../services/axios-service";
import { API_URL } from "../../services/url";
import SimpleReactValidator from "simple-react-validator";
export class PlantAllocate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      uid: "",
      region_id: "",
      from_date: "",
      to_date: "",
      area_id: "",
      plant_id: "",
      userdata: [],
      employee: [],
      area: [],
      plant:[]
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.validator = new SimpleReactValidator();
  }

  change = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  componentDidMount() {
    this.region();
    
  }

  async region() {
    let tokenvalue = localStorage.getItem("token");
    console.log('value', tokenvalue)
    try {
      const response = await Promise.all( [axios.get(
        `${API_URL}region/view`,
        (axios.defaults.headers.common["x-access-token"] = tokenvalue)
      ),axios.get(
        `${API_URL}employee/view_pto`,
        (axios.defaults.headers.common["x-access-token"] = tokenvalue)
        ),
        axios.get(
          `${API_URL}area/view`,
          (axios.defaults.headers.common["x-access-token"] = tokenvalue)
        ),
        axios.get(
          `${API_URL}plant/view`,
          (axios.defaults.headers.common["x-access-token"] = tokenvalue)
        )]);

      console.log(response[3].data);
      if (response.length>0) {
       await this.setState({
          userdata: response[0].data.Regiondata,
          employee: response[1].data.User,
          area: response[2].data.Area,
          plant:response[3].data.Plant
        });

      }
    } catch (error) {
      console.log(error.response);
    }
  }
  async onSubmit(event) {
    event.preventDefault();
    let tokenvalue = localStorage.getItem("token");
    if (this.validator.allValid()) {
    console.log(this.state);
    try {
      const response = await axios.post(
        `${API_URL}plant/user_plant`,
        {
          uid: this.state.uid,
          pid: this.state.plant_id,
          start: this.state.from_date,
          // stop: this.state.to_date,
          status:2
        },
        (axios.defaults.headers.common["x-access-token"] = tokenvalue)
      );
      console.log(response);

        if (response.data.success) {
          alert(response.data.msg);
          this.props.history.push("/AllocatedPlant");
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

  //   fileSelectedHandler = e => {
  //       e.preventDefault();
  //     let files = e.target.files;
  //     console.log('data',files[0]);
  //   }
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
                      Plant Allocation
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
                    <h3>Plant Allocation</h3>
                    <br />
                  </div>
                </div>
                <form className="custom-content-form" method="POST">
                  <div className="form-group row">
                    <label for="inputPassword" class="col-sm-1 col-form-label">
                      Employee Name
                    </label>
                    <div class="col-sm-11">
                    <select className="form-control" name="uid" value={this.state.uid}  onChange={e => this.change(e)}>
                            <option>All Employee</option>
                    {
                              this.state.employee ?
                              this.state.employee.map(function(item, id) {
                                return(
                                    
                        <option key ={id} value={item.uid}>{item.name}</option>
                      )
                              }
                      )
                              :
                              <span>Data is loading....</span>
                            }

                    </select>
                      <span className="text-danger">
                        {this.validator.message(
                          "name",
                          this.state.uid,
                          "required"
                        )}
                      </span>
                    </div>
                  </div>
                  <div class="form-group row">
                    <label
                      for="inputSubcategory"
                      className="col-sm-1 col-form-label"
                    >
                      Region Name
                    </label>
                    <div class="col-sm-11">
                    <select className="form-control" name="region_id" value={this.state.region_id}  onChange={e => this.change(e)}>
                                <option>All Region</option>
                        {
                                  this.state.userdata ?
                                  this.state.userdata.map(function(item, id) {
                                    return(
                                        
                            <option key ={id} value={item.region_id}>{item.region_name}</option>
                          )
                                  }
                          )
                                  :
                                  <span>Data is loading....</span>
                                }

                        </select>
                      <span className="text-danger">
                        {this.validator.message(
                          "region",
                          this.state.region_id,
                          "required"
                        )}
                      </span>
                    </div>
                  </div>
                  <div class="form-group row">
                    <label
                      for="inputSubcategory"
                      className="col-sm-1 col-form-label"
                    >
                      Area Name
                    </label>
                    <div class="col-sm-11">
                    <select className="form-control" name="area_id" value={this.state.area_id}  onChange={e => this.change(e)}>
                                <option>All Area</option>
                        {
                                  this.state.area ?
                            this.state.area.filter(item => item.region_id == this.state.region_id).map(function (item, id) {
                              
                                return (
                                      
                                  <option key={id} value={item.area_id}>{item.area_name}</option>
                                )
                              
                                  }
                          )
                                  :
                                  <span>Data is loading....</span>
                                }

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
                  <div class="form-group row">
                    <label
                      for="inputSubcategory"
                      className="col-sm-1 col-form-label"
                    >
                      Plant Name
                    </label>
                    <div class="col-sm-11">
                    <select className="form-control" name="plant_id" value={this.state.plant_id}  onChange={e => this.change(e)}>
                                <option>All Plant</option>
                        {
                                  this.state.plant ?
                                  this.state.plant.filter(item => item.region_id == this.state.region_id && item.area_id ==this.state.area_id).map(function(item, id) {
                                    return(
                                        
                            <option key ={id} value={item.pid}>{item.plant_name}</option>
                          )
                                  }
                          )
                                  :
                                  <span>Data is loading....</span>
                                }

                        </select>
                      <span className="text-danger">
                        {this.validator.message(
                          "plant name",
                          this.state.plant_id,
                          "required"
                        )}
                      </span>
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group col-md-6">
                      <div class="form-group row">
                        <label
                          for="inputSubcategory"
                          className="col-sm-2 col-form-label"
                        >
                          From Date
                        </label>
                        <div class="col-sm-10">
                          <input
                            type="date"
                            className="form-control"
                            value={this.state.from_date}
                            name="from_date"
                            onChange={e => this.change(e)}
                          />
                         
                        </div>
                      </div>
                    </div>
                    <div className="form-group col-md-6">
                      <div class="form-group row">
                        {/* <label
                          for="inputSubcategory"
                          className="col-sm-2 col-form-label"
                        >
                          To Date
                        </label>
                        <div class="col-sm-10">
                          <input
                            type="date"
                            className="form-control"
                            value={this.state.to_date}
                            name="to_date"
                            onChange={e => this.change(e)}
                          />
                          
                        </div> */}
                      </div>
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

export default PlantAllocate;
