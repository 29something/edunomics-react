import React, { Component } from "react";
import "./Assets.css";
import { Link } from "react-router-dom";
import axios from "axios";
import authService from "../../services/auth-service";
import axiosService from "../../services/axios-service";
import { API_URL } from "../../services/url";
import SimpleReactValidator from "simple-react-validator";
import { SuccessModal } from "../Test/SuccessModal";
export class AssetType extends Component {
  constructor(props) {
    super(props);
    this.state = {
      btnstatus : false,
      asset_type: ""
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
  async onSubmit(e) {
    e.preventDefault();
    console.log(this.state);
    if (this.validator.allValid()) {
        let tokenvalue = localStorage.getItem("token");
      let body = {
       asset_type  :this.state.asset_type
      };
    //   this.props.history.push("/ViewAssetPlant");
      console.log("body state hre", body);
      this.openModal();
      this.setState({
        btnstatus : true
      })
      try {
        const response = await axios.post(
            `${API_URL}asset_type/add`,
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
              this.props.history.push("/ViewAssetType");
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
                      Asset Type
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
                    <h3>Asset Type</h3>
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
                      Asset Type
                    </label>
                    <div class="col-sm-10">
                      <input
                        type="text"
                        className="form-control"
                        value={this.state.asset_type}
                        name="asset_type"
                        onChange={e => this.change(e)}
                      />
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

export default AssetType;
