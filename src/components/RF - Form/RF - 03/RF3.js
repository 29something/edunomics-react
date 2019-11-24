import React, { Component } from "react";
import { Link, Redirect, withRouter, NavLink } from "react-router-dom";
import "../RF-02/Rf2.css";
import axios from "axios";
import authService from "../../../services/auth-service";
import axiosService from "../../../services/axios-service";
import { API_URL } from "../../../services/url";
import SimpleReactValidator from "simple-react-validator";
import { RfButtonLink } from "../RfButtonLink";
import { SuccessModal } from "../../Test/SuccessModal";
const initialState = {
  userdata: []
};

export class ConcreteMoulds extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // initialState,
      btnstatus: false,
      supplier: "",
      source: "",
      plant: localStorage.getItem("plant_name"),
      date: "",
      remarks: "",
      type: "RF_03"
      // len: "",
      // length: "",
      // bre: "",
      // breadth: "",
      // h1: "",
      // h2: "",
      // diagonal1: "",
      // diagonal2: ""
    };
    this.userdata = [];
    this.onSubmit = this.onSubmit.bind(this);
    this.validator = new SimpleReactValidator();
  }
  // let userdata = [];
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

    console.log(this.state.initialState);
  };

  async componentDidMount() {
    await this.handleClick();
  }
  async handleClick() {
    let userdata = new Array();
    let tokenvalue = localStorage.getItem("token");
    console.log("value", tokenvalue);
    try {
      const response = await axios.get(
        `${API_URL}asset/view_rf3`,
        (axios.defaults.headers.common["x-access-token"] = tokenvalue)
      );
      console.log("userdata response", response);
      console.log("userdata response", response.data.assetTypedata);
      // if (response.data.assetTypedata.length) {
      //   // this.setState({ userdata: response.data.assetTypedata });
      //   userdata = response.data.assetTypedata
      // }
      this.userdata = await response.data.assetTypedata;
      for (let i = 0; i < this.userdata.length; i++) {
        let mould = "mould_num_" + i;
        console.log(mould);
        this.setState({
          [mould]: this.userdata[i].asset_description
        });
      }
      console.log("userdata", this.userdata);
    } catch (error) {
      console.log(error);
    }
    console.log(this.userdata);
  }
  openModal() {
    this.setState({
      visible: true
    });
  }

  closeModal() {
    this.setState({
      visible: false
    });
  }
  change = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handlechange = (event, id, item) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    const na = name + "_" + id;
    const name2 = na;
    console.log(name2, name, na, value);
    this.setState(
      {
        [na]: value,
        [name]: target.value
      }
      // () => {
      //   const {
      //     len,
      //     length,
      //     bre,
      //     breadth,
      //     h1,
      //     h2,
      //     diagonal1,
      //     diagonal2
      //   } = this.state;
      //   if (len != length) {
      //     document.getElementById(target.id).style.borderBottom =
      //       "thick solid green";
      //     document.getElementById(target.id + 1).style.borderBottom =
      //       "thick solid red";
      //   } else {
      //     document.getElementById(target.id).style.borderBottom =
      //       "thick solid green";
      //     document.getElementById(target.id + 1).style.borderBottom =
      //       "thick solid green";
      //   }
      //   if (bre != breadth) {
      //     document.getElementById("a3").style.borderBottom =
      //       "thick solid green";
      //     document.getElementById("a4").style.borderBottom = "thick solid red";
      //   } else {
      //     document.getElementById("a3").style.borderBottom =
      //       "thick solid green";
      //     document.getElementById("a4").style.borderBottom =
      //       "thick solid green";
      //   }
      //   if (h1 != h2) {
      //     document.getElementById("a5").style.borderBottom =
      //       "thick solid green";
      //     document.getElementById("a6").style.borderBottom = "thick solid red";
      //   } else {
      //     document.getElementById("a5").style.borderBottom =
      //       "thick solid green";
      //     document.getElementById("a6").style.borderBottom =
      //       "thick solid green";
      //   }
      //   if (diagonal1 != diagonal2) {
      //     document.getElementById("a7").style.borderBottom =
      //       "thick solid green";
      //     document.getElementById("a8").style.borderBottom = "thick solid red";
      //   } else {
      //     document.getElementById("a7").style.borderBottom =
      //       "thick solid green";
      //     document.getElementById("a8").style.borderBottom =
      //       "thick solid green";
      //   }
      // }
    );
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
        plant: this.state.plant,
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
        s_t25: this.state.s_t25,
        remarks: this.state.remarks,
        type: "RF_03"
      };
      console.log("body here", body);
      this.openModal();
      this.setState({
        btnstatus: true
      });
      try {
        const response = await axios.post(
          `${API_URL}rf_form/submit`,
          this.state,
          (axios.defaults.headers.common["x-access-token"] = tokenvalue)
        );
        console.log(response);
        //   .then(console.log(this.state));

        if (response.data === "success") {
          alert(response.data.msg);
          this.props.history.push("/TableRf3");
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

    let userdata_show_table = this.userdata;
    let manual_userdata;
    console.log("userdata_show_table length here", userdata_show_table.length);
    if (userdata_show_table.length) {
      console.log(
        "userdata_shoe_table legth inside if loop",
        userdata_show_table.length
      );
      manual_userdata = (
        <div>
          <div className="below-custom-form">
            <form className="custom-content-form">
              <div className="form-row">
                <div class="form-group col-md-12">
                  <table className="table table-hover table-bordered ">
                    <thead className="bg-info custom-thead-color">
                      <tr>
                        <th scope="col">S.No.</th>
                        <th scope="col">Mould Number</th>
                        <th scope="colgroup" colspan="2">
                          Length(L1 |L1)
                        </th>
                        <th scope="colgroup" colspan="2">
                          Breadth(B2 | B2)
                        </th>
                        <th scope="col" colspan="2">
                          Height (h1 | h2)
                        </th>
                        <th scope="col" colspan="2">
                          Diagonal (D1 | D2)
                        </th>
                        <th scope="col">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.userdata.length ? (
                        this.userdata
                          .map(function(item, id) {
                            return (
                              <tr key={id}>
                                <th>#</th>
                                <th scope="row">{item.asset_description}</th>
                                <td>
                                  <input
                                    type="text"
                                    className="form-control"
                                    name="len"
                                    id={item.assets_id + "-" + id}
                                    value={item.id}
                                    onChange={e => this.handlechange(e, id)}
                                  />
                                </td>
                                <td>
                                  <input
                                    type="text"
                                    className="form-control"
                                    name="length"
                                    id={item.assets_id + "-" + id + 1}
                                    value={item.id}
                                    onChange={e => this.handlechange(e, id)}
                                  />
                                </td>
                                <td>
                                  <input
                                    type="text"
                                    className="form-control"
                                    name="bre"
                                    id="a3"
                                    value={item.id}
                                    onChange={e => this.handlechange(e, id)}
                                  />
                                </td>
                                <td>
                                  <input
                                    type="text"
                                    className="form-control"
                                    name="breadth"
                                    id="a4"
                                    value={item.id}
                                    onChange={e => this.handlechange(e, id)}
                                  />
                                </td>
                                <td>
                                  <input
                                    type="text"
                                    className="form-control"
                                    name="h1"
                                    id="a5"
                                    value={item.id}
                                    onChange={e => this.handlechange(e, id)}
                                  />
                                </td>
                                <td>
                                  <input
                                    type="text"
                                    className="form-control"
                                    name="h2"
                                    id="a6"
                                    value={item.id}
                                    onChange={e => this.handlechange(e, id)}
                                  />
                                </td>
                                <td>
                                  <input
                                    type="text"
                                    className="form-control"
                                    name="diagonal1"
                                    id="a7"
                                    value={item.id}
                                    onChange={e => this.handlechange(e, id)}
                                  />
                                </td>
                                <td>
                                  <input
                                    type="text"
                                    className="form-control"
                                    name="diagonal2"
                                    id="a8"
                                    value={item.id}
                                    onChange={e => this.handlechange(e, id)}
                                  />
                                </td>
                                <td className="customrf2status">
                                  {" "}
                                  <select
                                    className="form-control"
                                    name="status1"
                                    value={item.id}
                                    onChange={e => this.handlechange(e, id)}
                                  >
                                    <option value="None">Choose...</option>
                                    <option value="OK">OK</option>
                                    <option value="Need Repair">
                                      Need Repair
                                    </option>
                                    <option value="Need Replacement">
                                      Need Replacement
                                    </option>
                                  </select>
                                </td>
                              </tr>
                            );
                          }, this)
                          .reverse()
                      ) : (
                        <span>Data is loading....</span>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </form>
          </div>
        </div>
      );
    } else {
      console.log(
        "userdata_shoe_table legth inside if loop on false cond",
        userdata_show_table.length
      );
      manual_userdata = (
        <div>
          <center>
            <h1>NO DATA HERE </h1>
          </center>
        </div>
      );
    }
    let sbmtbtn, btnmsg;
    if (this.state.visible) {
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
    if (this.state.btnstatus) {
      sbmtbtn = (
        <button
          class="btn btn-primary"
          onClick={this.onSubmit.bind(this)}
          disabled
        >
          Submit
        </button>
      );
      btnmsg = (
        <div>
          <hr />
          <p>
            Your Form Has Already Been Submitted.Please Don't Click SUMBIT
            Button AGAIN!!
          </p>
        </div>
      );
    } else {
      sbmtbtn = (
        <button class="btn btn-primary" onClick={this.onSubmit.bind(this)}>
          Submit
        </button>
      );
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
                        RF - 03
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
                        RF-3 Verification of dimensions of concrete moulds
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
                    </div>
                  </form>
                </div>
                {/*test form */}
                {manual_userdata}
                {/* <div className="below-custom-form">
                  <form className="custom-content-form">
                    <div className="form-row">
                      <div class="form-group col-md-12">
                      <table className="table table-hover table-bordered ">
                          <thead className="bg-info custom-thead-color">
                            <tr>
                            <th scope="col">S.No.</th>
                              <th scope="col">Mould Number</th>
                              <th scope="colgroup" colspan="2">Length(L1 |L1)</th>
                              <th scope="colgroup" colspan="2">Breadth(B2 | B2)</th>
                              <th scope="col" colspan="2">Height (h1 | h2)</th>
                              <th scope="col" colspan="2">Diagonal (D1 | D2)</th>
                              <th scope="col">Status</th>
                            </tr>
                          </thead>
                          <tbody>
                            {userdata_show_table.length ? (
                              userdata_show_table
                                .map(function(item, id) {
                                
                                  return (
                                    <tr key={id}>
                                      <th>#</th>
                                      <th scope="row">
                                     {item.asset_description}
                                      </th>
                                      <td>
                                        <input
                                          type="text"
                                          className="form-control"
                                          name="len"
                                          value={item.id}
                                          onChange={e => this.handlechange(e,id)}
                                        />
                                      </td>
                                      <td>
                                        <input
                                          type="text"
                                          className="form-control"
                                          name="length"
                                          value={item.id}
                                          onChange={e => this.handlechange(e,id)}
                                        />
                                      </td>
                                      <td>
                                        <input
                                          type="text"
                                          className="form-control"
                                          name="bre"
                                          value={item.id}
                                          onChange={e => this.handlechange(e,id)}
                                        />
                                      </td>
                                      <td>
                                        <input
                                          type="text"
                                          className="form-control"
                                          name="breadth"
                                          value={item.id}
                                          onChange={e => this.handlechange(e,id)}
                                        />
                                      </td>
                                      <td>
                                        <input
                                          type="text"
                                          className="form-control"
                                          name="h1"
                                          value={item.id}
                                          onChange={e => this.handlechange(e,id)}
                                        />
                                      </td>
                                      <td>
                                        <input
                                          type="text"
                                          className="form-control"
                                          name="h2"
                                          value={item.id}
                                          onChange={e => this.handlechange(e,id)}
                                        />
                                      </td>
                                      <td>
                                        <input
                                          type="text"
                                          className="form-control"
                                          name="diagonal1"
                                          value={item.id}
                                          onChange={e => this.handlechange(e,id)}
                                        />
                                      </td>
                                      <td>
                                        <input
                                          type="text"
                                          className="form-control"
                                          name="diagonal2"
                                          value={item.id}
                                          onChange={e => this.handlechange(e,id)}
                                        />
                                      </td>
                                      <td className="customrf2status">  <select className="form-control" name="status1" value={item.id} onChange={e => this.handlechange(e, id)}>
                                              <option value="None">Choose...</option>            
                                              <option value="OK">OK</option>
                                              <option value="Need Repair">Need Repair</option>
                                              <option value="Need Replacement">Need Replacement</option>
                                        </select></td>
                                    </tr>
                                  );
                                }, this)
                                .reverse()
                            ) : (
                              <span>Data is loading....</span>
                            )}
                          </tbody>
                        </table>
                       
                      </div>
                    </div>
                  </form>
                </div> */}
                {/*test form */}
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
                            Remarks
                          </label>
                          <div class="col-sm-10">
                            <textarea
                              className="form-control"
                              name="remarks"
                              value={this.state.remarks}
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
                    onClickAway={() => this.closeModal()}
                  />
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

export default ConcreteMoulds;
