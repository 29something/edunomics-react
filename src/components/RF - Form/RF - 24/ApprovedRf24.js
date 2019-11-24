import React, { Component } from 'react';
import '../../Test/Test.css';
import { Link, NavLink, Redirect } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '../../../services/url';
import ReactTable from 'react-table';

export class ApprovedRf24 extends Component {
  constructor () {
    super()
    this.state = {
      approvedData: []
    }
  }

  async componentWillMount () {
    const tokenvalue = localStorage.getItem('token')
    // let approvedData = []
    try {
      const response = await axios.get(
        API_URL + `rf_form/approved-rf/rf-24`,
        (axios.defaults.headers.common['x-access-token'] = tokenvalue),
        {
          headers: {
            'content-type': 'application/x-www-form-urlencoded'
          }
        }
      )
      if (response.status === 200) {
        this.setState({ approvedData: response.data })
      }
    } catch (error) {
      console.log(error)
    }
    // await this.setState({ approvedData })
  }

  render () {
    const temp = 35

    const columns = [
      {
        Header: 'ID',
        accessor: 'id',
        sortable: false
      },
      {
        Header: 'Plant Name',
        accessor: 'plant_name',
        sortable: false
      },
      {
        Header: 'Submited by',
        accessor: 'name',
        sortable: false
      },
      {
        Header: 'Submit Date',
        accessor: 'submit_date',
        sortable: false
      },
      {
        Header: 'Verified by',
        accessor: 'verified_by_name',
        sortable: false
      },
      {
        Header: 'Verify Date',
        accessor: 'verify_date',
        sortable: false
      }
    ]

    if (this.state.redirect) {
      return (
        <Redirect
          push
          to={{
            pathname: '/modDetailView',
            state: {
              fgcode: this.state.fgcode,
              orgcode: this.state.orgcode
            }
          }}
        />
      )
    }

    return (
      <React.Fragment>
        <div>
          <div className='skin-blue fixed-layout'>
            <div className='page-wrapper'>
              <div className='container-fluid'>
                <div className='row page-titles'>
                  <div className='col-md-5 align-self-center'>
                    <nav aria-label='breadcrumb'>
                      <ol class='breadcrumb'>
                        <li className='breadcrumb-item'>
                          <Link to={process.env.PUBLIC_URL + '/'}>Home</Link>
                        </li>
                        <li
                          className='breadcrumb-item active'
                          aria-current='page'>
                          View All Test
                        </li>
                      </ol>
                    </nav>
                  </div>
                </div>
              </div>
              <div className='custom-table-here custom-buttons'>
                <div className=''>
                  <div className='container'>
                    <div className='row'>
                      <div className='col-lg-12 col-md-12 col-sm-12 col-xs-12'>
                        <div className='product-form-upper'>
                          <div className=''>
                            <div className=''>
                              <div className='row'>
                                <div className='col-lg-12 col-md-12 col-sm-12 col-xs-12'>
                                  <hr />
                                </div>
                              </div>
                              <div className='row'>
                                <NavLink to='PendingRf24' className='mx-2'>
                                  <button
                                    className='btn btn-info'
                                    id='pendingBtn'>
                                    {' '}
                                    View Pending
                                  </button>
                                </NavLink>
                                <NavLink to='ApprovedRf24' className='mx-2'>
                                  <button
                                    className='btn btn-info'
                                    id='approvedBtn'
                                    disabled>
                                    {' '}
                                    View Approved
                                  </button>
                                </NavLink>
                                <NavLink to='RejectedRf24' className='mx-2'>
                                  <button
                                    className='btn btn-info'
                                    id='rejectedBtn'>
                                    {' '}
                                    View Rejected
                                  </button>
                                </NavLink>
                                {/* <NavLink to='' className='mx-2'>
                                  <button className='btn btn-info' id='purgedBtn' > View Purged</button>
                                </NavLink> */}
                                {localStorage.getItem('user_type') ===
                                  'plant technical officer' && (
                                  <NavLink to='RF24' className='ml-auto mr-2'>
                                    <button className='btn btn-info'>
                                      Add
                                    </button>
                                  </NavLink>
                                )}
                                {/* {
                                  localStorage.getItem('user_type') === 'plant technical officer' &&
                                  <NavLink to='' className='mx-2'>
                                    <button className='btn btn-info'>Update</button>
                                  </NavLink>
                                } */}
                                <div className='col-lg-12 col-md-12 col-sm-12 col-xs-12'>
                                  <hr />
                                  <p className='h5'>Approved Tests (RF - 24)</p>
                                  <hr />
                                  <ReactTable
                                    columns={columns}
                                    data={this.state.approvedData}
                                    className='table table-light -striped -highlight table-responsive text-center'
                                    headerClassName='bg-info'
                                    showPagination={false}
                                    defaultPageSize={temp}
                                    id='pendingTable'
                                    noDataText='Data not found.'
                                  />
                                </div>
                              </div>
                              {/* end new row */}
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
    )
  }
}

export default ApprovedRf24
