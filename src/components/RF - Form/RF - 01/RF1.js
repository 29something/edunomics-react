import React, { Component } from "react";
import { Link, Redirect, withRouter, NavLink } from "react-router-dom";
import "../../Test/Test.css";
import axios from "axios";
import authService from "../../../services/auth-service";
import axiosService from "../../../services/axios-service";
import { API_URL } from "../../../services/url";
import SimpleReactValidator from "simple-react-validator";
import { SuccessModal } from "../../Test/SuccessModal";

export class Audits extends Component {
  constructor(props) {
    super(props);
    this.state = {
      btnstatus : false,
      supplier: "",
      source: "",
      plant: "",
      date: "",
      s_t1: "",
      s_t2: "",
      s_t3: "",
      s_t4: "",
      s_t5: "",
      s_t6: "",
      s_t7: "",
      s_t8: " ",
      s_t9: "",
      s_t10: "",
      s_t11: "",
      s_t12: "",
      s_t13: "",
      s_t14: "",
      s_t15: "",
      s_t16: "",
      s_t17: "",
      s_t18: "",
      s_t19: "",
      s_t20: "",
      s_t21: "",
      s_t22: "",
      s_t23: "",
      s_t24: "",
      rf_img: "",
      userdata: [],
      userCount: [],
      user:[],
      ui_user_order_array: [{ 
        s_t16 : "",
        s_t17  :"",
        s_t18 : ""
       }],
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.validator = new SimpleReactValidator();
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
  async componentDidMount() {
    await this.handleClick();
  }
  async handleClick() {
    let userdata =  new Array();
    let tokenvalue = localStorage.getItem("token");
    console.log("value", tokenvalue);
    try {
      const response = await axios.get(
        `${API_URL}asset/view_rf1`,
        (axios.defaults.headers.common["x-access-token"] = tokenvalue)
      );
      console.log("userdata response", response.data);
     let Count=response.data.assetcountdata
      // console.log("userdata response", response.data.assetTypedata);
      if (response.data.success) {
       await this.setState({
          userdata: response.data.assetTypedata,
        userCount:response.data.assetcountdata});
      //   this.setState({
      //     ui_user_order_array: this.state.ui_user_order_array.concat([{
      //  s_t16 : "",
      //  s_t17  :"",
      //  s_t18 : ""
      //     }])
      // });
      }
      // this.userdata = await response.data.assetTypedata;
      // for (let i = 0; i < this.userdata.length; i++){
      //   let mould = "mould_num_" + i;
      //   console.log(mould);
      //   this.setState({
      //     [mould]: this.userdata[i].asset_description
      //   });
      // }
      console.log("userdata", this.state.userdata);
      console.log("userCount", this.state.userCount);

      let use = [];
      let user = [];
      Count.map((item, id) => {
         if (id === 0 ||id ===1 ||id ===2) {
          use.push(item);
        }else if (id % 3 !== 0) {
           use.push(item);
        } else if (id % 3 === 0 && id !==0) {
          user.push(use);
           use = [];
           use.push(item);
        } 
        
        // console.log("id ",id);
        // console.log("use ",use);
        // console.log("user",user);
        
      })
      user.push(use);
      // console.log("user",user);
      await this.setState({ user: user });
      console.log("user state",
        this.state.user)
    } catch (error) {
      console.log(error);
    }
  }
  manualchange  = (idx) => (e) => {
    const newShareholders = this.state. ui_user_order_array.map((shareholder, sidx) => {
      if (idx !== sidx) return shareholder;
      return { ...shareholder, [e.target.name]: e.target.value };
    // this.setState ({
    //   [e.target.name]: e.target.value
    // });
    })
    this.setState({  ui_user_order_array: newShareholders });
  };
  // handleAddShareholder = () => {
  //   this.setState({
  //       ui_user_order_array: this.state.ui_user_order_array.concat([{
  //    s_t16 : "",
  //    s_t17  :"",
  //    s_t18 : ""
  //       }])
  //   });
  // }
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
    fetch("/").then(console.log(this.state));
  };
  async onSubmit(event) {
    event.preventDefault();
    console.log(this.state);
    if (this.validator.allValid()) {
      let tokenvalue = localStorage.getItem("token");
      let body = {
        supplier: this.state.supplier,
        source: this.state.source,
        plant: localStorage.getItem("plant_name"),
        date: this.state.date,
        s_t1: this.state.s_t1,
        s_t2: this.state.s_t2,
        s_t3: this.state.s_t3,
        s_t4: this.state.s_t4,
        s_t5: this.state.s_t5,
        s_t6: this.state.s_t6,
        s_t7: this.state.s_t7,
        s_t8: this.state.s_t8,
        s_t9: this.state.s_t9,
        s_t10: this.state.s_t10,
        s_t11: this.state.s_t11,
        s_t12: this.state.s_t12,
        s_t13: this.state.s_t13,
        s_t14: this.state.s_t14,
        s_t15: this.state.s_t15,
        s_t16: this.state.s_t16,
        s_t17: this.state.s_t17,
        s_t18: this.state.s_t18,
        s_t19: this.state.s_t19,
        s_t20: this.state.s_t20,
        s_t21: this.state.s_t21,
        s_t22: this.state.s_t22,
        s_t23: this.state.s_t23,
        s_t24: this.state.s_t24,
        rf_img: this.state.rf_img,
        type: "RF_01"
      };
      console.log("body here", body);
      this.openModal();
      this.setState({
        btnstatus : true
      })
      try {
        const response = await axios.post(
          `${API_URL}rf_form/submit`,
          body,
          (axios.defaults.headers.common["x-access-token"] = tokenvalue)
        );
        console.log(response);
        //   .then(console.log(this.state));

        if (response.data.success) {
          alert(response.data.msg);
          //   this.props.history.push("/ViewTestEight");
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
      <div>
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
                      <li
                        className="breadcrumb-item active"
                        aria-current="page"
                      >
                        RF - 01
                      </li>
                    </ol>
                  </nav>
                </div>
              </div>
            </div>
            {/*form comtent begin */}

            <div className="product-form-upper">
              <div className="container-fluid">
                <div className="below-custom-form">
                  <div className="row">
                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                      {/* <RfButtonLink /> */}

                      <hr />
                    </div>

                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                      <p style={{ textAlign: "center" }}>
                        RF-1 Laboratory equipment List, Caliberations
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
                            Agency representative
                          </label>
                          <div class="col-sm-10">
                            <input
                              list="browsers"
                              name="supplier"
                              value={this.state.supplier}
                              onChange={e => this.change(e)}
                              className="form-control"
                            />
                            <datalist id="browsers">
                              <option value="supplier 1" />
                              <option value="supplier 2" />
                              <option value="supplier 3" />
                              <option value="supplier 4" />
                              <option value="supplier 5" />
                            </datalist>
                            <span className="text-danger">
                        {this.validator.message(
                          "agency representative",
                          this.state.supplier,
                          "required"
                        )}
                      </span>
                          </div>
                        </div>
                      </div>
                      <div class="form-group col-md-6">
                        <div class="form-group row">
                          <label
                            for="inputPassword"
                            class="col-sm-2 col-form-label"
                          >
                            Agency contact number
                          </label>
                          <div class="col-sm-10">
                            <input
                              type="number"
                              class="form-control"
                              id="inputPassword"
                              name="source"
                              value={this.state.source}
                              onChange={e => this.change(e)}
                            />
                            <span className="text-danger">
                        {this.validator.message(
                          "contact number",
                          this.state.source,
                          "required"
                        )}
                      </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
                {/*test form */}
                <div className="below-custom-form">
                
                  <form className="custom-content-form">
                    <div className="form-row">
                      <div class="form-group col-md-12">
                        <table class="table table-bordered">
                          <thead class="thead-light">
                            <tr>
                              <th scope="col">Instrument / Apparatus </th>
                              <th scope="col">Quantity</th>
                              <th scope="col">Instrument / Apparatus </th>
                              <th scope="col">Quantity</th>
                              <th scope="col">Instrument / Apparatus </th>
                              <th scope="col">Quantity</th>
                            </tr>
                          </thead>
                          <tbody>
                            { 
                              this.state.user.length ? (
                              
                              this.state.user
                                .map(function (items, id) {
                                  return (
                                    <React.Fragment>
                                      <tr>
                                        {
                                          items.length ?(
                                          items.map(ite => {
                                              return (
                                                  <React.Fragment>
                                                      <td scope="row">
                                                                  <div class="form-check">
                                                                    <label
                                                                      class="form-check-label"
                                                                      for="exampleCheck1"
                                                                    >
                                                                      {ite.asset_type_name}
                                                               </label>
                                                                  </div>
                                                                </td>
                              
                                                                <td>
                                                                  <input
                                                                    type="text"
                                                                    className="form-control"
                                                                    name="s_t1"
                                                                    value={ite["count(asset_type_id)"]||"0"}
                                                      onChange={e => this.change(e)}
                                                      disabled
                                                                  />
                                                                </td>
                                                  </React.Fragment>
                                              )
                                  })):<React.Fragment></React.Fragment>}
                                      {/* <td scope="row">
                                        <div class="form-check">
                                          <label
                                            class="form-check-label"
                                            for="exampleCheck1"
                                          >
                                            {item.asset_type_name}
                                     </label>
                                        </div>
                                      </td>

                                      <td>
                                        <input
                                          type="text"
                                          className="form-control"
                                          name="s_t1"
                                          value={item["count(asset_type_id)"]}
                                          onChange={e => this.change(e)}
                                        />
                                      </td>
                                      <td>
                                        <div class="form-check">
                                  
                                          <label
                                            class="form-check-label"
                                            for="exampleCheck1"
                                          >
                                           {item.asset_type_name}
                                  </label>
                                        </div>
                                      </td>
                                      <td>
                                        <input
                                          type="text"
                                          className="form-control"
                                          name="s_t2"
                                          value={item["count(asset_type_id)"]}
                                          onChange={e => this.change(e)}
                                        />
                                      </td>
                                      <td>
                                        <div class="form-check">
                                  
                                          <label
                                            class="form-check-label"
                                            for="exampleCheck1"
                                          >
                                           {item.asset_type_name}
                                  </label>
                                        </div>
                                      </td>
                                      <td>
                                        <input
                                          type="text"
                                          className="form-control"
                                          name="s_t3"
                                          value={item["count(asset_type_id)"]}
                                          onChange={e => this.change(e)}
                                        />
                                      </td> */}
                                      
                                      </tr>
                                      </React.Fragment>
                                  );
                                }, this)) : <div></div>}</tbody>
                      
                        </table>
                      </div>
                    </div>
                  </form>
                </div>
                {/*test form */}
                {/*eq type form */}
                <div className="below-custom-form">
               
                  <form className="custom-content-form">
                    <div className="form-row">
                      <div class="form-group col-md-12">
                        <table class="table table-bordered">
                          <thead class="thead-light">
                            <tr>
                              <th scope="col">Equipment type & Description</th>
                              <th scope="col">Equipment number</th>
                              <th scope="col">Make</th>
                              <th scope="col">Check/Caliberation</th>
                              <th scope="col">
                                Date of last check/caliberation
                              </th>
                              <th scope="col">
                                Date of next check/caliberation
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {
                              this.state.userdata.length ? (
                              
                                this.state.userdata
                                  .map(function (item, id) {
                                    return (
                                      <React.Fragment>
                                      {this.state.ui_user_order_array.map((shareholder, idx) => (
                                        <tr>
                              <th scope="row">
                                <input
                                  type="text"
                                  className="form-control"
                                  name="s_t13"
                                  value={item.asset_description}
                                             
                                              disabled
                                />
                              </th>

                              <td>
                                <input
                                  type="text"
                                  className="form-control"
                                  name="s_t14"
                                  value={item.asset_number}
                                             
                                              disabled
                                />
                              </td>

                              <td>
                                <input
                                  type="text"
                                  className="form-control"
                                  name="s_t15"
                                  value={item.asset_make}
                                             
                                              disabled
                                />
                              </td>
                              <td>
                                <input
                                  type="text"
                                  className="form-control"
                                  name="s_t16"
                                  value={shareholder.s_t16}
                                  onChange={this.manualchange(idx)}
                                />
                              </td>
                              <td>
                                <input
                                  type="text"
                                  className="form-control"
                                  name="s_t17"
                                  value={shareholder.s_t17}
                                  onChange={this.manualchange(idx)}
                                />
                              </td>
                              <td>
                                <input
                                  type="text"
                                  className="form-control"
                                  name="s_t18"
                                  value={shareholder.s_t18}
                                  onChange={this.manualchange(idx)}
                                />
                                        </td>
                                        </tr>
                                      ))}
                                      </React.Fragment>
                                      
                                    )
                                  },this)):<React.Fragment></React.Fragment>}
                            {/* <tr>
                              <th scope="row">
                                <input
                                  type="text"
                                  className="form-control"
                                  name="s_t13"
                                  value={this.state.s_t13}
                                  onChange={e => this.change(e)}
                                />
                              </th>

                              <td>
                                <input
                                  type="text"
                                  className="form-control"
                                  name="s_t14"
                                  value={this.state.s_t14}
                                  onChange={e => this.change(e)}
                                />
                              </td>

                              <td>
                                <input
                                  type="text"
                                  className="form-control"
                                  name="s_t15"
                                  value={this.state.s_t15}
                                  onChange={e => this.change(e)}
                                />
                              </td>
                              <td>
                                <input
                                  type="text"
                                  className="form-control"
                                  name="s_t16"
                                  value={this.state.s_t16}
                                  onChange={e => this.change(e)}
                                />
                              </td>
                              <td>
                                <input
                                  type="text"
                                  className="form-control"
                                  name="s_t17"
                                  value={this.state.s_t17}
                                  onChange={e => this.change(e)}
                                />
                              </td>
                              <td>
                                <input
                                  type="text"
                                  className="form-control"
                                  name="s_t18"
                                  value={this.state.s_t18}
                                  onChange={e => this.change(e)}
                                />
                              </td>
                            </tr>
                            <tr>
                              <th scope="row">
                                <input
                                  type="text"
                                  className="form-control"
                                  name="s_t19"
                                  value={this.state.s_t19}
                                  onChange={e => this.change(e)}
                                />
                              </th>

                              <td>
                                <input
                                  type="text"
                                  className="form-control"
                                  name="s_t20"
                                  value={this.state.s_t20}
                                  onChange={e => this.change(e)}
                                />
                              </td>

                              <td>
                                <input
                                  type="text"
                                  className="form-control"
                                  name="s_t21"
                                  value={this.state.s_t21}
                                  onChange={e => this.change(e)}
                                />
                              </td>
                              <td>
                                <input
                                  type="text"
                                  className="form-control"
                                  name="s_t22"
                                  value={this.state.s_t22}
                                  onChange={e => this.change(e)}
                                />
                              </td>
                              <td>
                                <input
                                  type="text"
                                  className="form-control"
                                  name="s_t23"
                                  value={this.state.s_t23}
                                  onChange={e => this.change(e)}
                                />
                              </td>
                              <td>
                                <input
                                  type="text"
                                  className="form-control"
                                  name="s_t24"
                                  value={this.state.s_t24}
                                  onChange={e => this.change(e)}
                                />
                              </td>
                            </tr> */}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </form>
             
                </div>
                {/*end equip type form */}
                {/*remark form */}
                <div className="below-custom-form">
                  <form className="custom-content-form">
                    <div className="form-row">
                      <div class="form-group col-md-12">
                        <div class="form-group row">
                          <label
                            for="inputPassword"
                            class="col-sm-2 col-form-label"
                          >
                            Upload Image
                          </label>
                          <div class="col-sm-10">
                            <input
                              type="file"
                              name="rf_img"
                              value={this.state.rf_img}
                              onChange={e => this.change(e)}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <small>* This Fields are Mandatory . </small>
                    <br />
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
                {/*end remark */}
              </div>
            </div>
          </div>
          {/*ed form content */}
        </div>
      </div>
    );
  }
}

export default Audits;
