import React, { Component } from "react";
import { Link, Redirect, withRouter } from "react-router-dom";
import "./Test.css";
import axios from "axios";
import authService from "../../services/auth-service";
import axiosService from "../../services/axios-service";
import { API_URL } from "../../services/url";
export class ComingSoon extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userdata: []
    };
    this.onSubmit = this.onSubmit.bind(this);
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

  async componentDidMount() {
    let tokenvalue = localStorage.getItem("token");
    // console.log("value", tokenvalue);
    const response = await axios.get(
      `${API_URL}cube/view_inc_rf7/casted`,
      (axios.defaults.headers.common["x-access-token"] = tokenvalue)
    );
    console.log(response.data);
    if (response.status === 200) {
      this.setState({ userdata: response.data });
      console.log(this.state.userdata);
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
                <h1>ComingSoon</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ComingSoon;
