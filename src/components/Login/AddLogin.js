import React, { Component } from "react";
import "./Login.css";
import { Link, Redirect, withRouter, NavLink } from "react-router-dom";
import axios from "axios";
import authService from "../../services/auth-service";
import axiosService from "../../services/axios-service";
import { API_URL } from "../../services/url";

class AddLogin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    };
    this.onSubmit = this.onSubmit.bind(this);
  }
  change = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  async onSubmit(e) {
    e.preventDefault();
    // this.setState({
    //   email: "",
    //   password: ""
    // });
    try {
      const response = await axios.post(`${API_URL}employee/login`, this.state);
      console.log(response);
      if (response.data.success) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user_type', response.data.user_type);
        if (response.data.user_type === 'plant technical officer') {
          const res = await axios.get(`${API_URL}plant/plant_name`, (axios.defaults.headers.common["x-access-token"] = response.data.token));
          // window.location.reload('/ComingSoon');
          console.log(res);
          if (res.data.success) {
            this.props.history.push('/');
            localStorage.setItem('plant_name', res.data.plant_data.plant_name);

          }
        }
        else {
          this.props.history.push('/');
        }
      }
      // console.log(response.data)
      //   .then(
      //     function(response) {
      //       console.log(this.props);
      //       console.og("reponse here", response);
      //       console.log("authservice gettoke");
      // if(response.data.success){

      // 	const tokentext = response.data.tokenKey
      // 	localStorage.setItem('token', tokentext);
      // 	this.props.onRouteChange('home');
      // 	window.location.reload('/')
      // 	// this.props.history.push('/')
      // 	// window.location.reload('/')

      // 	//window.location.reload('home')
      // }

      // alert(response.data.msg)
      //console.log(authService.getToken())
    } catch (err) {
      console.error(err.response.data.msg);
      alert(err.response.data.msg)
    }
  }

  render() {
    const onRouteChange = this.props.onRouteChange;
    return (
      <div>
        <div class="my-login-page">
          <section class="h-100">
            <div class="container h-100">
              <div class="row justify-content-md-center h-100">
                <div class="card-wrapper">
                  <div class="card fat custom-card-margin">
                    <div class="card-body">
                      <h4 class="card-title">Login</h4>
                      <form method="POST">
                        <div class="form-group">
                          <label for="email">User Email</label>

                          <input
                            id="email"
                            type="email"
                            class="form-control"
                            name="email"
                            value={this.state.email}
                            onChange={e => this.change(e)}
                            required
                            autofocus
                          />
                        </div>

                        <div class="form-group">
                          <label for="password">
                            Password
                            {/*<a href="forgot.html" class="float-right">
											Forgot Password?
										</a>*/}
                          </label>
                          <input
                            id="password"
                            type="password"
                            class="form-control"
                            name="password"
                            value={this.state.password}
                            onChange={e => this.change(e)}
                            required
                            data-eye
                          />
                        </div>

                        {/*<div class="form-group">
									<label>
										<input type="checkbox" name="user_remember" value={this.state.user_remember} onchange={e => this.change(e)}/> Remember Me
									</label>
									</div>*/}

                        <div class="form-group no-margin">
                          <button
                            class="btn btn-info btn-block"
                            onClick={e => this.onSubmit(e)}
                          >
                            Login
                          </button>
                        </div>
                        <div class="margin-top20 text-center custom-frgpswd">
                          {/* <p onClick={() => onRouteChange('register')}>Forgot Password</p> */}
                          <a href={'http://35.200.166.14/api/employee/forgot'}><p>Forgot Password</p></a>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    );
  }
}

export default withRouter(AddLogin);
