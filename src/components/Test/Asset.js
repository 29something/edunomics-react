import React, { Component } from "react";
import { Link, Redirect, withRouter, NavLink } from "react-router-dom";
import "./Test.css";
import axios from "axios";
import authService from "../../services/auth-service";
import axiosService from "../../services/axios-service";
import { API_URL } from "../../services/url";
import SimpleReactValidator from "simple-react-validator";
import { SuccessModal } from "./SuccessModal";
export class Asset extends Component {
  constructor(props) {
    super(props);
    this.state = {
      btnstatus  :false,
      pid: "",
      asset_type_id: "",
      description: "",
      yom: "",
      asset_img: "",
      asset_make: "",
      number: "",
      userdata:[]
    };
    this.validator = new SimpleReactValidator();
  }
  componentDidMount() {
    this.asset();
    
  }
  async asset() {
    let tokenvalue = localStorage.getItem("token");
    console.log('value', tokenvalue)
    try {
      const response = await axios.get(
        `${API_URL}asset_type/view`,
        (axios.defaults.headers.common["x-access-token"] = tokenvalue)
      );

      console.log(response.data);
      if (response.data.success) {
       await this.setState({
          userdata: response.data.assetTypedata,
        });

      }
    } catch (error) {
      console.log(error.response);
    }
  }
  openModal() {
    this.setState({
        visible : true
    });
}

  closeModal() {
    this.setState({
        visible : false
    });
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
        let tokenvalue = localStorage.getItem("token");
      let body = {
        //pid: localStorage.getItem("plant_name"),
        asset_type_id: this.state.asset_type_id,
        description: this.state.description,
        yom: this.state.yom,
        asset_img: this.state.asset_img,
        make: this.state.asset_make,
        number:this.state.number
      };
    //   this.props.history.push("/ViewAssetPlant");
      console.log("body state hre", body);
      this.openModal();
      this.setState({
        btnstatus : true
      })
      try {
        const response = await axios.post(
            `${API_URL}asset/add`,
           body,
            (axios.defaults.headers.common["x-access-token"] = tokenvalue)
          );

        console.log(response);
        // this.props.history.push("/ViewArea");
        //   .then(console.log(this.state));
        // .then(
        //   function(response) {
        //     //console.log(error);
            if (response.data.success) {
              alert(response.data.msg);
              this.props.history.push("/ViewAssets");
            } else {
              alert(response.data.msg);
            }
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
  render() {
         // let showmodal;
         let sbmtbtn, btnmsg;
         if(this.state.visible)
         {
           // showmodal = (
           //   <div>
           //     <SuccessModal  
           //          visible={this.state.visible}
           //               width={this.props.width}
           //               height={this.props.height}
           //               effect={this.props.effect}
           //               onClickAway={() => this.closeModal()} />
           //   </div>
           // )
         }
         if(this.state.btnstatus)
         {
           sbmtbtn = (
             <button
             class="btn btn-primary"
             onClick={this.onSubmit.bind(this)}
             disabled
           >
             Submit
           </button>
           )
           btnmsg = (
             <div>
             <hr />
             <p>Your Form Has Already Been Submitted.Please Don't Click SUMBIT Button AGAIN!!</p>
             </div>
           )
         }
         else
         {
           sbmtbtn=(
             <button
             class="btn btn-primary"
             onClick={this.onSubmit.bind(this)}
           >
             Submit
           </button>
           )
         }
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
                      Asset
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
                    <h3>Asset</h3>
                    <hr />
                    <br />
                  </div>
                </div>

                <form className="custom-content-form">
                  <div class="form-group row">
                    <label
                      for="inputSubcategory"
                      className="col-sm-2 col-form-label"
                    >
                      Plant
                    </label>
                    <div class="col-sm-10">
                    {localStorage.getItem("plant_name")}
                      {/* <span className="text-danger">
                            {this.validator.message(
                              "asset",
                              this.state.plant_asset,
                              "required"
                            )}
                          </span> */}
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group col-md-12">
                      <div className="form-group row">
                        <label
                          for="inputSubcategory"
                          className="col-sm-2 col-form-label"
                        >
                          Equipment Type
                        </label>
                        <div class="col-sm-10">
                          
                          <select className="form-control" name="asset_type_id" value={this.state.asset_type_id}  onChange={e => this.change(e)}>
                                <option>All Asset</option>
                        {
                                  this.state.userdata ?
                                  this.state.userdata.map(function(item, id) {
                                    return(
                                        
                            <option key ={id} value={item.asset_type_id}>{item.asset_type_name}</option>
                          )
                                  }
                          )
                                  :
                                  <span>Data is loading....</span>
                                }

                        </select>
                          {/* <span className="text-danger">
                            {this.validator.message(
                              "asset type",
                              this.state.asset_type,
                              "required"
                            )}
                          </span> */}
                        </div>
                      </div>
                    </div>
                    <div className="form-group col-md-12">
                      <div class="form-group row">
                        <label
                          for="inputSubcategory"
                          className="col-sm-2 col-form-label"
                        >
                          Equipment Make Date
                        </label>
                        <div class="col-sm-10">
                          <input
                            type="date"
                            className="form-control"
                            value={this.state.yom}
                            name="yom"
                            onChange={e => this.change(e)}
                          />
                          {/* <span className="text-danger">
                            {this.validator.message(
                              "date",
                              this.state.asset_make_date,
                              "required"
                            )}
                          </span> */}
                        </div>
                      </div>
                    </div>
                    <div className="form-group col-md-12">
                      <div class="form-group row">
                        <label
                          for="inputSubcategory"
                          className="col-sm-2 col-form-label"
                        >
                          Equipment Make 
                        </label>
                        <div class="col-sm-10">
                          <input
                            type="text"
                            className="form-control"
                            value={this.state.asset_make}
                            name="asset_make"
                            onChange={e => this.change(e)}
                          />
                          {/* <span className="text-danger">
                            {this.validator.message(
                              "date",
                              this.state.asset_make_date,
                              "required"
                            )}
                          </span> */}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="form-group col-md-12">
                      <div class="form-group row">
                        <label
                          for="inputSubcategory"
                          className="col-sm-2 col-form-label"
                        >
                         Equipment Number 
                        </label>
                        <div class="col-sm-10">
                          <input
                            type="text"
                            className="form-control"
                            value={this.state.number}
                            name="number"
                            onChange={e => this.change(e)}
                          />
                        </div>
                      </div>
                    </div>
                  
                  <div className="form-row">
                    <div className="form-group col-md-12">
                      <div class="form-group row">
                        <label
                          for="inputSubcategory"
                          className="col-sm-2 col-form-label"
                        >
                          Equipment Description
                        </label>
                        <div class="col-sm-10">
                          <textarea
                            className="form-control"
                            name="description"
                            value={this.state.description}
                            onChange={e => this.change(e)}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="form-group col-md-12">
                      <div class="form-group row">
                        <label
                          for="inputSubcategory"
                          className="col-sm-2 col-form-label"
                        >
                          Equipment Image
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

                  {sbmtbtn}
                
                {btnmsg}
                </form>
                 {/*modal experiment */}
               {/* {showmodal} */}
               
              
               <SuccessModal  
               visible={this.state.visible}
                    width={this.props.width}
                    height={this.props.height}
                    effect={this.props.effect}
                    onClickAway={() => this.closeModal()} />
                {/*end model experiment */}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Asset;
