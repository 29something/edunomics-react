import React, { Component } from "react";
import axios from "axios";
import { Link, Redirect } from "react-router-dom";
import "../Test/Test.css";
import ReactTable from "react-table";

const API_URL = "http://35.234.215.61/api/";

export class modDetailView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      update: "",
      tokenvalue: "",
      redirect: false,
      sample: {},
      acceptType: "",
      plantIds: [],
      orgcode: ""
    };

    this.updateAccept.bind(this);
    this.createAccept.bind(this);
    this.rejectCode.bind(this);
  }

  async componentDidMount() {
    await this.setState({
      tokenvalue: localStorage.getItem("token")
    });
    const fgcode = this.props.location.state.fgcode;
    const orgcode = this.props.location.state.orgcode;
    const uid = this.props.location.state.update_id;
    const type = this.props.location.state.type;

    if (type === "update") {
      const body = {
        FG_Code: fgcode,
        Org_Code: orgcode
      };
      this.fetchUpdateData(body);
    } else if (type === "create") {
      const body = {
        FG_Code: fgcode,
        Org_Code: orgcode,
        type: type
      };
      this.fetchCreateData(body);
    }

    let plantIds = [];
    try {
      const response = await axios.get(
        `${API_URL}/employee/viewplant`,
        (axios.defaults.headers.common[
          "x-access-token"
        ] = this.state.tokenvalue),
        {
          headers: {
            "content-type": "application/x-www-form-urlencoded"
          }
        }
      );
      if (response.status === 200) {
        response.data.viewplant.map(item => {
          plantIds.push(item.plant_id);
        });
      }
    } catch (error) {
      console.log(error);
    }
    await this.setState({
      update: uid,
      acceptType: type,
      plantIds,
      orgcode
    });
  }

  async fetchUpdateData(body) {
    let data = [],
      sample = {};
    try {
      const response = await axios.post(
        `${API_URL}/bom/bom_description`,
        body,
        (axios.defaults.headers.common[
          "x-access-token"
        ] = this.state.tokenvalue),
        {
          headers: {
            "content-type": "application/x-www-form-urlencoded"
          }
        }
      );
      if (response.status === 200) {
        data = response.data.Description_BOM;
        sample = response.data.Description_BOM[0];
      }
    } catch (error) {
      console.log(error);
    }
    this.setState({
      data,
      sample
    });
  }

  async fetchCreateData(body) {
    let data = [];
    let sample = {};
    try {
      const response = await axios.post(
        `${API_URL}/bom/bom_description`,
        body,
        (axios.defaults.headers.common[
          "x-access-token"
        ] = this.state.tokenvalue),
        {
          headers: {
            "content-type": "application/x-www-form-urlencoded"
          }
        }
      );
      if (response.status === 200) {
        const d = response.data.item;
        d.map(item => {
          let t = {};
          for (let key in item) {
            switch (key) {
              case "COMPONENT_ITEM_CODE":
                t["componentcode"] = item[key];
                break;
              case "ITEM_SEQUENCE":
                t["itemsequence"] = item[key];
                break;
              case "QUANTITY":
                t["quantity"] = item[key];
                break;
            }
          }
          data.push(t);
        });
        sample = response.data.result[0];
      }
    } catch (error) {
      console.log(error);
    }
    this.setState({
      data,
      sample
    });
  }

  renderPlantIds = () => {
    const ids = this.state.plantIds;
    return (
      <div>
        {ids.map(i => {
          if (i === this.state.orgcode) {
            return (
              <div class='form-check' id={i + "-div"}>
                <input
                  class='form-check-input'
                  name='orgcode'
                  type='checkbox'
                  value={i}
                  id={i}
                  disabled
                  checked
                />
                <label class='form-check-label' htmlFor={i}>
                  {i}
                </label>
              </div>
            );
          } else {
            return (
              <div class='form-check' id={i + "-div"}>
                <input
                  class='form-check-input'
                  name='orgcode'
                  type='checkbox'
                  value={i}
                  id={i}
                />
                <label class='form-check-label' htmlFor={i}>
                  {i}
                </label>
              </div>
            );
          }
        })}
      </div>
    );
  };

  acceptCode() {
    const modalTrigger = document.getElementById("acceptModalBtn");
    this.state.acceptType === "update"
      ? this.updateAccept()
      : modalTrigger.click();
  }

  async updateAccept() {
    const body = {
      update_id: this.state.update,
      status: "1"
    };
    try {
      const response = await axios.post(
        `${API_URL}/bom/update_accept`,
        body,
        (axios.defaults.headers.common[
          "x-access-token"
        ] = this.state.tokenvalue),
        {
          headers: {
            "content-type": "application/x-www-form-urlencoded"
          }
        }
      );
      if (response.status === 200 && response.data.success === true) {
        window.alert("Accepted successfully !");
        await this.setState({
          redirect: true
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  async createAccept() {
    let arr = [];
    const a = document.getElementsByName("orgcode");
    a.forEach((x, index) =>
      x.checked === true && a[index].value !== this.state.orgcode
        ? arr.push(a[index].value)
        : console.log("nothing checked")
    );
    const body = {
      orgcode: this.state.orgcode,
      neworgcode: arr,
      fgcode: this.state.sample.FGCODE,
      items: this.state.data
    };
    try {
      const response = await axios.post(
        `${API_URL}/bom/acceptBom`,
        body,
        (axios.defaults.headers.common[
          "x-access-token"
        ] = this.state.tokenvalue),
        {
          headers: {
            "content-type": "application/x-www-form-urlencoded"
          }
        }
      );
      if (response.status === 200 && response.data.success === true) {
        window.alert("Accepted successfully !");
        await this.setState({
          redirect: true
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  async rejectCode() {
    const body = {
      update_id: this.state.update,
      status: "3"
    };
    try {
      const response = await axios.post(
        `${API_URL}/bom/update_accept`,
        body,
        (axios.defaults.headers.common[
          "x-access-token"
        ] = this.state.tokenvalue),
        {
          headers: {
            "content-type": "application/x-www-form-urlencoded"
          }
        }
      );
      if (response.status === 200 && response.data.success === true) {
        window.alert("Rejected successfully !");
        await this.setState({
          redirect: true
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    const columns = [
      {
        Header: "Item Code",
        accessor: "Item_Code",
        sortable: false
      },
      {
        Header: "Item Description",
        accessor: "Item_Description",
        sortable: false
      },
      {
        Header: "Initial Quantity",
        accessor: "Initial Quantity",
        sortable: false
      },
      {
        Header: "Updated Quantity",
        accessor: "UPDATED_QUANTITY",
        sortable: false
      }
    ];

    const columnsForNewBOM = [
      {
        Header: "Item Code",
        accessor: "componentcode",
        sortable: false
      },
      {
        Header: "Item Sequence",
        accessor: "itemsequence",
        sortable: false
      },
      {
        Header: "Quantity",
        accessor: "quantity",
        sortable: false
      }
    ];

    if (this.state.redirect) {
      return (
        <Redirect
          push
          to={{
            pathname: "/modPending"
          }}
        />
      );
    }

    return (
      <div className='skin-blue fixed-layout'>
        <div className='page-wrapper'>
          <div className='container-fluid'>
            <div className='row page-titles'>
              <div className='col-md-5 align-self-center'>
                <nav aria-label='breadcrumb'>
                  <ol class='breadcrumb'>
                    <li className='breadcrumb-item'>
                      <Link to={process.env.PUBLIC_URL + "/"}> Home </Link>
                    </li>
                    <li className='breadcrumb-item active' aria-current='page'>
                      BOM Detail View
                    </li>
                  </ol>
                </nav>
              </div>
            </div>
          </div>
          <div className='container'>
            <div className='row'>
              {this.state.acceptType === "update" && (
                <div className='col-lg-9 col-sm-12 col-md-9'>
                  <p>
                    <span className='font-weight-bold'> FG Code: </span>
                    {this.state.sample.FG_Code}
                    <span className='font-weight-bold ml-5'>
                      FG Code Description:
                    </span>
                    {this.state.sample.FG_Code_Description}
                  </p>
                  <p>
                    <span className='font-weight-bold'>
                      FG Code Minor Segment:
                    </span>
                    {this.state.sample.FG_Code_Minor_Segment}
                    <span className='font-weight-bold ml-5'>
                      FG Code Major Segment:
                    </span>
                    {this.state.sample.FG_Code_Major_Segment}
                  </p>
                </div>
              )}
              {this.state.acceptType === "create" && (
                <div className='col-lg-9 col-sm-12 col-md-9'>
                  <p>
                    <span className='font-weight-bold'> FG Code: </span>
                    {this.state.sample.FGCODE}
                    <span className='font-weight-bold ml-5'>
                      FG Code Description Short:
                    </span>
                    {this.state.sample.item_description_short}
                  </p>
                  <p>
                    <span className='font-weight-bold'>
                      FG Code Description Long:
                    </span>
                    {this.state.sample.item_description_long}
                  </p>
                  <p>
                    <span className='font-weight-bold'>
                      FG Code Minor Segment:
                    </span>
                    {this.state.sample.minor_segment}
                    <span className='font-weight-bold ml-5'>
                      FG Code Major Segment:
                    </span>
                    {this.state.sample.major_segment}
                  </p>
                </div>
              )}
              {localStorage.getItem("user_type") === "quality incharge" && (
                <div className='my-3 col-lg-3 col-md-3 col-sm-12'>
                  <button
                    className='btn btn-success ml-auto mr-1'
                    onClick={this.acceptCode.bind(this)}>
                    Accept
                  </button>
                  <button
                    className='btn btn-danger mx-3'
                    onClick={this.rejectCode.bind(this)}>
                    Reject
                  </button>
                </div>
              )}
              <button
                style={{ display: "none" }}
                data-toggle='modal'
                data-target='#createAcceptModal'
                id='acceptModalBtn'
              />
            </div>
            {this.state.acceptType === "update" && (
              <ReactTable
                columns={columns}
                data={this.state.data}
                className='table table-light -striped -highlight table-responsive text-center'
                headerClassName='bg-info'
                showPagination
                defaultPageSize={10}
                id='rejectedTable'
              />
            )}
            {this.state.acceptType === "create" && (
              <ReactTable
                columns={columnsForNewBOM}
                data={this.state.data}
                className='table table-light -striped -highlight table-responsive text-center'
                headerClassName='bg-info'
                showPagination
                defaultPageSize={10}
                id='rejectedTable'
              />
            )}
          </div>

          <div
            class='modal fade'
            id='createAcceptModal'
            tabIndex='-1'
            role='dialog'
            aria-labelledby='exampleModalCenterTitle'
            aria-hidden='true'>
            <div class='modal-dialog modal-dialog-centered' role='document'>
              <div class='modal-content'>
                <div class='modal-header'>
                  <h5 class='modal-title' id='exampleModalCenterTitle'>
                    Select Plants to Add BOM
                  </h5>
                  <button
                    type='button'
                    class='close'
                    data-dismiss='modal'
                    aria-label='Close'>
                    <span aria-hidden='true'> &times; </span>
                  </button>
                </div>
                <div class='modal-body'>
                  <form>
                    <label htmlFor='vendorName' class='col-form-label mr-2'>
                      Add this BOM in following plants:
                    </label>
                    {this.renderPlantIds()}
                  </form>
                </div>
                <div class='modal-footer'>
                  <button
                    type='button'
                    class='btn btn-secondary'
                    data-dismiss='modal'>
                    Close
                  </button>
                  <button
                    type='button'
                    class='btn btn-primary'
                    data-dismiss='modal'
                    onClick={this.createAccept.bind(this)}>
                    Proceed
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default modDetailView;
