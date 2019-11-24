import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import './Login.css';

class Register extends Component {
	constructor(props)
	{
		super(props)
		this.state = {
			user_name : "",
			user_email : "",
			user_password: "",
			user_agree : ""
		}	
	}
	change = e => 
	{
	 this.setState({
		 [e.target.name] : e.target.value
	 })
	}
	getWebsite = () => {
        fetch("/").then(console.log(this.state));
    };
	onSubmit = e =>
	{
		e.preventDefault();
		console.log(this.state);
		this.setState({
			user_name : "",
			user_email : "",
			user_password: "",
			user_agree : ""
		})


		fetch('admin/signup', {
			method : "POST",
            headers : {
			  "Content-Type" : "application/json"
			},
			body : JSON.stringify(this.state),
          }).then(console.log(this.state));
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
							<h4 class="card-title">Register</h4>
							<form method="POST">
							 
								<div class="form-group">
									<label for="name">Name</label>
									<input id="name" type="text" class="form-control" name="user_name" value={this.state.user_name} onChange={e => this.change(e)} required autofocus />
								</div>

								<div class="form-group">
									<label for="email">E-Mail Address</label>
									<input id="email" type="email" class="form-control" name="user_email"value={this.state.user_email} onChange={e => this.change(e)} required />
								</div>

								<div class="form-group">
									<label for="password">Password</label>
									<input id="password" type="password" class="form-control" name="user_password" value={this.state.user_password} onChange={e => this.change(e)} required data-eye />
								</div>

								<div class="form-group">
									<label>
										<input type="checkbox" name="user_agree" value={this.state.user_agree} onChange={e => this.change(e)}  /> I agree to the Terms and Conditions
									</label>
								</div>

								<div class="form-group no-margin">
									<button class="btn btn-primary btn-block" onClick={e => this.onSubmit(e)}>
										Register
									</button>
								</div>
								<div class="margin-top20 text-center">
									Already have an account? <a onClick={() => onRouteChange('signin')}>Login</a>
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

export default Register;