import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import authService from "../../services/auth-service";
import axiosService from "../../services/axios-service";
import { API_URL } from "../../services/url";
class RegionAllocated extends Component {
  constructor() {
    super();
    this.state = {
      userdata: [],
      detailsdata: [],
      currentPage: 1,
      todosPerPage: 8,
      designation: ""
    };
    this.handlepagenumber = this.handlepagenumber.bind(this);
    this.handleCheck = this.handleCheck.bind(this);
    this.detailCheck = this.detailCheck.bind(this);
  }
  handlepagenumber(event) {
    this.setState({
      currentPage: Number(event.target.id)
    });
  }
  handleCheck(todo) {
    console.log(todo.employe_id);
    let sitemeet = todo.employe_id;
    axios
      .get(
        `${API_URL}employe/delete?id=${sitemeet}`,
        (axios.defaults.headers.common["authorization"] =
          "Bearer " + authService.getToken())
      )
      .then(
        function(json) {
          if (json.data.success === true) {
            //   console.log(json);
            //  window.location.reload('/ViewAdmin')
            alert("Employee has been deleted ");
            // window.location.reload();
            this.handleClick();
          } else {
            console.log(json);
          }
        }.bind(this)
      );
  }
  detailCheck(todo) {
    // console.log(item.admin_id);
    let sitemeet = todo.employe_id;
    axios
      .get(
        `${API_URL}employe/detail?id=${sitemeet}`,
        (axios.defaults.headers.common["authorization"] =
          "Bearer " + authService.getToken())
      )
      .then(response => {
        //console.log(response.employedata)
        this.setState({ detailsdata: response.data.employedata });
        // this.parseJSON(this.state)
      });
  }

  componentDidMount() {
    this.handleClick();
  }
  async handleClick() {
    let tokenvalue = localStorage.getItem("token");
    try {
      const response = await axios.get(
        `${API_URL}plant/view_user`,
        (axios.defaults.headers.common["x-access-token"] = tokenvalue)
      );
      console.log(response);

      if (response.data.success) {
       await this.setState({ userdata: response.data.Plant });
      }
      // this.parseJSON(this.state)
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

    let serial = 0;
    // let employedatatable;
    if (this.state.userdata.length == 0) {
      renderTodos = (
        <div>
          <br />
          <center>
            <h4>
              <strong>There Is No Region Allocated Yet.</strong>
            </h4>
          </center>
        </div>
      );
    } else {
      renderTodos = currentTodos.map((todo, index) => {
        return (
          <tr key={index}>
            {/* <th scope="row">{++serial}</th> */}
            <td>{todo.name || "NO DATA"}</td>
            <td>{todo.plant_name.toUpperCase() ||"NO DATA"}</td>
            <td>{new Date(todo.relation_start).toString().split(' ').slice(0, 4).join(' ') || "NO DATA"}</td>
            {/* <td>{new Date(todo.relation_stop).toString().split(' ').slice(0, 4).join(' ') || "NO DATA"}</td> */}
            {/* <td>
                      <Link to ={process.env.PUBLIC_URL +`/EditEmploye/${todo.employe_id}`}>
      <span class="tooltip-toggle" aria-label="Edit" tabindex="0">
        <button className="btn btn-warning custom-edit-btn btn-sm"><i class="fa fa-pencil" aria-hidden="true"></i></button>
        </span>
        </Link>
        <span class="tooltip-toggle" aria-label="Suspend" tabindex="0">
           <button  className="btn btn-danger custom-edit-btn btn-sm" onClick={this.handleCheck.bind(this, todo)}><i class="fa fa-trash-o" aria-hidden="true"></i></button>
          </span>

           <span class="tooltip-toggle" aria-label="Detail" tabindex="0">
           <button className="btn btn-success custom-edit-btn btn-sm" onClick={this.detailCheck.bind(this, todo)} data-toggle="modal" data-target=".bd-example-modal-lg"><i class="fa fa-eye" aria-hidden="true"></i></button>
             </span>
                      </td> */}
          </tr>
        );
      });
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
                          View Allocated Plant
                        </li>
                      </ol>
                    </nav>
                  </div>
                </div>
              </div>
              <div className="custom-table-here custom-buttons">
                {/* <div className="container">
                        <div className="row">
                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                <div className="custom-inner-buttons text-center">
                                   <Link to ={process.env.PUBLIC_URL +"/AdminEmp"}> <button type="button" className="btn btn-info">View Admin</button></Link>
                                </div>

                            </div>
                        </div>
                    </div> */}

                <br />

                <div className="">
                  <div className="container">
                    <div className="row">
                      <div className="offset-md-1 col-lg-2 col-md-2 col-sm-12 col-xs-12 text-center center-block">
                        <Link to={process.env.PUBLIC_URL + "/ViewEmployee"}>
                          <button class="btn btn-info">User</button>
                        </Link>
                      </div>
                      <div className="col-lg-2 col-md-2 col-sm-12 col-xs-12 text-center center-block">
                        <Link to={process.env.PUBLIC_URL + "/RegionAllocated"}>
                          <button class="btn btn-info">Allocated Region</button>
                        </Link>
                      </div>
                      <div className="col-lg-2 col-md-2 col-sm-12 col-xs-12 text-center center-block">
                        <Link to={process.env.PUBLIC_URL + "/AllocatedArea"}>
                          <button class="btn btn-info">Allocated Area</button>
                        </Link>
                      </div>
                      <div className="col-lg-2 col-md-2 col-sm-12 col-xs-12 text-center center-block">
                        <Link to={process.env.PUBLIC_URL + "/AllocatedPlant"}>
                          <button class="btn btn-info">Allocated Plant</button>
                        </Link>
                      </div>
                      <div className="col-lg-2 col-md-2 col-sm-12 col-xs-12 text-center center-block">
                        <Link to={process.env.PUBLIC_URL + "/ParticleSize"}>
                          <button class="btn btn-info">List Of Users</button>
                        </Link>
                      </div>
                      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                        <hr />
                      </div>
                    </div>
                    <div className="row">
                      {/* <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                    <Link to={process.env.PUBLIC_URL +"/SuspendedEmploye"}> <button type="button" className="btn btn-danger delete-employee-btn"><i className="fa fa-trash-o" aria-hidden="true"></i>&nbsp;&nbsp;Suspended Employe List</button></Link>      
                    </div> */}
                      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                        <Link to={process.env.PUBLIC_URL + "/PlantAllocate"}>
                          {" "}
                          <button
                            type="button"
                            className="btn btn-info add-employee-btn"
                            style={{ float: "right" }}
                          >
                            <i
                              className="fa fa-plus-circle"
                              aria-hidden="true"
                            />
                            &nbsp;&nbsp;Allocate Plant
                          </button>
                        </Link>
                      </div>
                      <br />
                      <br />
                      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                        {/* <table class="table table-bordered">
  <thead className="thead-light">
    <tr>
      <th scope="col">#</th>
      <th scope="col">Name</th>
      <th scope="col">E - Mail</th>
      <th scope="col">Number</th>
      <th scope="col">Designation</th>
      <th scope="col">City</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">1</th>
      <td>Mark</td>
      <td>Otto</td>
      <td>@mdo</td>
      <td>Otto</td>
      <td>@mdo</td>
    </tr>
    <tr>
      <th scope="row">2</th>
      <td>Jacob</td>
      <td>Thornton</td>
      <td>@fat</td>
      <td>Thornton</td>
      <td>@fat</td>
    </tr>
    <tr>
      <th scope="row">3</th>
      <td>Jacob</td>
      <td>Thornton</td>
      <td>@fat</td>
      <td>Thornton</td>
      <td>@fat</td>
    </tr>
  </tbody>
</table> */}
                        <table className="table table-hover table-bordered table-responsive-md table-responsive-sm">
                          <thead className="bg-info custom-thead-color">
                            <tr>
                              <th scope="col">Employee Name</th>
                              <th scope="col">Plant Name</th>
                              <th scope="col">Start Date</th>
                              {/* <th scope="col">Stop Date</th> */}
                              {/* <th scope="col">Action</th> */}
                            </tr>
                          </thead>
                          <tbody>{renderTodos}</tbody>
                        </table>

                        <div className="custom-listitem">
        <ul id="page-numbers">
          {renderPageNumbers}
        </ul>
        </div>
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
                              <table className="table table-hover table-bordered table-responsive-md table-responsive-sm">
                                <thead className="bg-info custom-thead-color">
                                  <tr>
                                    <th scope="col">Name</th>
                                    <th scope="col">Position</th>
                                    <th scope="col">Email</th>
                                    <th scope="col">Contact Number</th>
                                    <th scope="col">Blood Group</th>
                                    <th scope="col">Account Detail</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {this.state.detailsdata ? (
                                    this.state.detailsdata.map(function(
                                      item,
                                      id
                                    ) {
                                      return (
                                        <tr key={id}>
                                          <th scope="row">
                                            {" "}
                                            {item.employe_name || "NO DATA"}
                                          </th>
                                          <td>
                                            {item.position
                                              ? "Supervisor"
                                              : "Executive"}
                                          </td>
                                          <td>
                                            {item.employe_email || "NO DATA"}
                                          </td>
                                          <td>
                                            {item.employe_mobile1 || "NO DATA"}
                                          </td>
                                          <td>
                                            {item.employe_blood_group ||
                                              "NO DATA"}
                                          </td>
                                          <td>
                                            {item.employe_account_detail ||
                                              "NO DATA"}
                                          </td>
                                        </tr>
                                      );
                                    },
                                    this)
                                  ) : (
                                    <span>Data is loading....</span>
                                  )}
                                </tbody>
                              </table>
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
        </div>
      </React.Fragment>
    );
  }
}

export default RegionAllocated;
