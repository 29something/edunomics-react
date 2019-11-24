import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import "./Plant.css";
import axios from "axios";
import authService from "../../services/auth-service";
import axiosService from "../../services/axios-service";
import { API_URL } from "../../services/url";
export class ViewPlant extends Component {
  constructor() {
    super();
    this.state = {
      userdata: [],
      detailsdata: [],
      currentPage: 1,
      todosPerPage: 8
    };
    this.handleCheck = this.handleCheck.bind(this);
    this.handlepagenumber = this.handlepagenumber.bind(this);
  }
  handlepagenumber(event) {
    this.setState({
      currentPage: Number(event.target.id)
    });
  }
  // printDocument() {
  //   const input = document.getElementById('divToPrint');
  //   html2canvas(input)
  //     .then((canvas) => {
  //       const imgData = canvas.toDataURL('image/png');
  //       const pdf = new jsPDF();
  //       pdf.addImage(imgData, 'JPEG', 20, 20);
  //       // pdf.output('dataurlnewwindow');
  //       pdf.save("download.pdf");
  //     })
  //   ;
  // }
  handleCheck(todo) {
    console.log(todo.area_id);
    let stodoeet = todo.area_id;
    if (window.confirm("Are You Sure You Want To Delete This Plant?")) {
      axios
        .delete(
          `${API_URL}area/delete/${stodoeet}`,
          (axios.defaults.headers.common["authorization"] =
            "Bearer " + authService.getToken())
        )
        .then(response => {
          console.log(response);
          if (response.data.success === true) {
            // console.log('Area delete view');
            alert(response.data.msg);
            //window.location.reload();
            this.handleClick();
          } else {
            console.log(response.data.msg);
          }
        })
        .catch(error => {
          alert(error.response.data.msg);
          //console.log(error);
        });
    }
  }
  componentDidMount() {
    this.handleClick();
  }
  async handleClick() {
    let tokenvalue = localStorage.getItem("token");
    try {
      const response = await axios.get(
        `${API_URL}plant/view`,
        (axios.defaults.headers.common["x-access-token"] = tokenvalue)
      );
      console.log(response);
      if (response.data) {
      await this.setState({ userdata: response.data.Plant });
      }
    } catch (error) {
      console.log(error);
    }
  }
  render() {
    const { todos, currentPage, todosPerPage } = this.state;

    let renderTodos;

    // Logic for displaying todos
    const indexOfLastTodo = currentPage * todosPerPage;
    const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
    const currentTodos = this.state.userdata.slice(
      indexOfFirstTodo,
      indexOfLastTodo
    );

    let areatabledata = "";
    let serial = 0;

    if (this.state.userdata.length === 0) {
      renderTodos = (
        <div className="text-center">
          <h4>
            <strong>No Plant Has Been Addedd Yet !!!</strong>
          </h4>
        </div>
      );
    } else {
      renderTodos = currentTodos.map((todo, index) => {
        return (
          <tr key={index}>
            <th scope="row">{todo.plant_name}</th>
            <th scope="row">{todo.city}</th>
            <th scope="row">{todo.area_name}</th>
            <th scope="row">{todo.region_name}</th>
            {/* <td>
       <span class="tooltip-toggle" aria-label="Suspend" tabindex="0">
           <button  className="btn btn-danger custom-edit-btn btn-sm" onClick={this.handleCheck.bind(this, todo)}><i class="fa fa-trash-o" aria-hidden="true"></i></button>
               </span>
           </td> */}
          </tr>
        );
      });
      //       areatabledata = (

      //             <tbody>
      // {
      //         this.state.userdata ?
      //         this.state.userdata.map(function(todo, id) {
      //           return(

      //   <tr key = {id}>
      //   <td>{++serial}</td>
      //     <th scope="row">{todo.area_name}</th>
      //     <td>
      //     {/* <Link to ={process.env.PUBLIC_URL+`/EditMasterEquipment/${todo.equipment_master_id}`}>
      //     <span class="tooltip-toggle" aria-label="Edit" tabindex="0">
      //     <button className="btn btn-warning custom-edit-btn btn-sm"><i class="fa fa-pencil" aria-hidden="true"></i></button>
      //             </span>
      //     </Link> */}
      //     <span class="tooltip-toggle" aria-label="Suspend" tabindex="0">
      //         <button  className="btn btn-danger custom-edit-btn btn-sm" onClick={this.handleCheck.bind(this, todo)}><i class="fa fa-trash-o" aria-hidden="true"></i></button>
      //             </span>
      //         </td>
      //   </tr>
      // )
      //         }, this
      // )
      //         :
      //         <span>Data is loading....</span>
      //       }
      // </tbody>

      //       )
    }
    // Logic for displaying page numbers
    const pageNumbers = [];
    for (
      let i = 1;
      i <= Math.ceil(this.state.userdata.length / todosPerPage);
      i++
    ) {
      pageNumbers.push(i);
    }

    const renderPageNumbers = pageNumbers.map(number => {
      return (
        <li
          key={number}
          id={number}
          className="active"
          onClick={this.handlepagenumber}
        >
          {number}
        </li>
      );
    });
    return (
      <React.Fragment>
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
                          View Plant
                        </li>
                      </ol>
                    </nav>
                  </div>
                </div>
              </div>
              <div className="custom-table-here">
                <div className="container">
                  <div className="row">
                    <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12 text-center center-block">
                      <Link to={process.env.PUBLIC_URL + "/ZoneLoc"}>
                        <button class="btn btn-info">Region</button>
                      </Link>
                    </div>
                    <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12 text-center center-block">
                      <Link to={process.env.PUBLIC_URL + "/ViewArea"}>
                        <button class="btn btn-info">Area</button>
                      </Link>
                    </div>
                    <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12 text-center center-block">
                      <Link to={process.env.PUBLIC_URL + "/ViewPlant"}>
                        <button class="btn btn-info">Plant</button>
                      </Link>
                    </div>
                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                      <hr />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                      <div className="custom-table-product">
                        <Link to={process.env.PUBLIC_URL + "/Plant"}>
                          {" "}
                          <button
                            type="button"
                            className="btn btn-info"
                            style={{ float: "right" }}
                          >
                            <i
                              className="fa fa-plus-circle"
                              aria-hidden="true"
                            />
                            &nbsp;&nbsp;&nbsp;Add Plant
                          </button>
                        </Link>
                        <br />
                        <br />

                        <table className="table table-hover table-bordered table-responsive-sm">
                          <thead className="custom-table-head-color">
                            <tr>
                              <th scope="col">Plant Name</th>
                              <th scope="col">City Name</th>
                              <th scope="col">Area Name</th>
                              <th scope = "col">Region Name</th>
                            </tr>
                          </thead>
                          {renderTodos}
                        </table>
                        <div className="custom-listitem">
                          <ul id="page-numbers">{renderPageNumbers}</ul>
                        </div>
                      </div>
                      {/*</div>*/}
                      {/* details modal here */}
                      <div
                        class="modal fade bd-example-modal-lg"
                        tabindex="-1"
                        role="dialog"
                        aria-labelledby="myLargeModalLabel"
                        aria-hidden="true"
                      >
                        <div class="modal-dialog modal-lg">
                          <div class="modal-content">
                            {/* <table className="table table-hover table-bordered ">
      <thead className="custom-table-head-color">
        <tr>
        <th scope="col">Category</th>
      <th scope="col">Capacity</th>
      <th scope="col">Brand</th>
      <th scope="col">Model</th>
      <th scope="col">Year Of Launch</th>
      <th scope="col">Year Of Discontinued</th>
        </tr>
      </thead>
      <tbody>
      {
              this.state.detailsdata ?
              this.state.detailsdata.map(function(todo, id) {
                return(
                    
        <tr key = {id}>
        <th scope="row"> {todo.category_name}</th>
      <td>{todo.capacity}</td>
      <td>{todo.brand}</td>
      <td>{todo.model}</td>
      <td>{todo.year_of_launch}</td>
      <td>{todo.year_of_discontinued}</td>
        </tr>
      )
              }, this
      )
              :
              <span>Data is loading....</span>
            }
      </tbody>
    </table> */}
                            <div class="modal-footer">
                              <button
                                type="button"
                                class="btn btn-secondary"
                                data-dismiss="modal"
                              >
                                Close
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default ViewPlant;
