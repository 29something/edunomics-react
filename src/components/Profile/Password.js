import React, { Component } from 'react'
import './Profile.css'
import {Link} from 'react-router-dom'
import axios from 'axios'
import { API_URL } from '../../services/url';
import authService from '../../services/auth-service';
import axiosService from '../../services/axios-service';
export class Password extends Component {
    constructor(props)
    {
        super(props)
        this.state = {
          //  ui_user_name : "",
           old_password: "",
           new_password: ""
           };

    }
    // componentWillMount ()
    // {
    //   this.handleClick();
    // }
    // handleClick () {
    //   fetch('product_type/view',{
    //     method : 'GET',
    //     headers : {
    //      
    //       "Content-Type" : "application/json"
    //   }
    //   })
    //     .then((res) => {
    //       res.json().then((resp) => { 
    //         console.log(resp.product_type_data)
    //         this.setState({ userdata:resp.product_type_data})
    //         // this.parseJSON(this.state)
    //       })
    //     }
      
    //   )
    //   }
    
    
      change  = e => {
        this.setState ({
          [e.target.name]: e.target.value
        });
      };
      getWebsite = () =>
      {
          fetch('/');
      }
      onSubmit = e =>
      {
          e.preventDefault();
          console.log(this.state);
          axios.post(`${API_URL}profile/change_password`,this.state,axios.defaults.headers.common['authorization'] = 'Bearer ' +	authService.getToken())
          .then((resp) => {
            console.log(resp.data)
           if(resp.data.success === true)
           {
             alert('Password has been change. PLEASE LOGIN AGAIN')
            //  fetch('admin/logout', { method: 'GET' }).then(() =>{
            //   localStorage.removeItem('tokenKey');
            //   this.props.history.push('/')
            // window.location.reload() // stay at the same url
            this.props.onRouteChange('signout')
         this.props.history.push('/')
          // })
           }
           else {
             alert(resp.data.msg)
           }
            } )
            .catch(error => {
            console.log(error.response);
            })
        //   axios.post('profile/change_password', this.state)
        //   //   .then(console.log(this.state));
        // .then(function(response){ 
        //    console.log(response.data);
        //    if(response.data.success === true)
        //    {
        //      alert('Password Changes successfully Please LOGIN Again')
        // //       this.setState ({
        // //         ui_user_name : "",
        // //         ui_old_password: "",
        // //         ui_new_password: ""
        // //   })
        //   this.props.history.push('/')
        //   window.location.reload();
        //    }
        // }.bind(this))
        // .catch(error => {
        //     console.log(error);
        //   })
      };
      
      fileSelectedHandler = e => {     
          e.preventDefault();
        let files = e.target.files;
        console.log('data',files[0]);
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
                                <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                                <li className="breadcrumb-item active" aria-current="page">Change Password</li>
                            </ol>
                            </nav>
                   </div>
                  
               </div>


            </div>

    {/*Form content begin */}
   
<div className = "product-form-upper">
    <div className = "container">
    <div className = "below-custom-form below-custom-blog-form">
        <div className = "row">
           <div className = "col-lg-12 col-md-12 col-sm-12 col-xs-12">
                   <h3>Change Password</h3><br />
           </div>
        </div>
        
        <form className="custom-content-form" autoComplete = "OFF">
  <div class="form-row">
    {/* <div class="form-group col-md-12">
    <label for="inputCategory">Enter User Name</label>
     <input type="text" className="form-control" placeholder="" name="ui_user_name" value = {this.state.ui_user_name} onChange = {e => this.change(e)} />
    </div> */}

    <div class="form-group col-md-12">
    <label for="inputSubcategory">Enter Old Password</label><br />              
    <input type="password" className="form-control" placeholder="" name="old_password" value = {this.state.old_password} onChange = {e => this.change(e)} />
    </div>
    <div class="form-group col-md-12">
    <label for="inputSubcategory">Enter New Password</label><br />              
     <input type="password" className="form-control" placeholder="" value = {this.state.new_password} name = "new_password" onChange = {e => this.change(e)} />
    </div>
  </div>
 
  <button class="btn btn-primary" onClick = {e => this.onSubmit(e)}>Submit</button>
</form>
    </div>
    </div>
</div>






        </div>
        </div>

    )
  }
}

export default Password
