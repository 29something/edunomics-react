import React, { Component } from 'react'
import '../../Test/Test.css'
import { Link, NavLink, Redirect } from 'react-router-dom'
import axios from 'axios'
import { API_URL } from '../../../services/url'
import ReactTable from 'react-table'

export class PendingRf24 extends Component {
  constructor () {
    super()
    this.state = {
      pendingData: [], displayId: '', redirect: false
    }
    this.displayForm.bind(this)
  }

  async componentWillMount () {
    const tokenvalue = window.localStorage.getItem('token')
    try {
      const response = await axios.get(API_URL + `rf_form/pending/rf-24`, (axios.defaults.headers.common['x-access-token'] = tokenvalue), {
        headers: {
          'content-type': 'application/x-www-form-urlencoded'
        }
      })
      if (response.status === 200) {
        await this.setState({ pendingData: response.data })
      }
    } catch (error) {
      console.log(error)
    }
  }

  async displayForm (e) {
    const displayId = e.target.id
    await this.setState({ displayId, redirect: true })
  }

  render () {
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
        Header: 'View',
        Cell: ({ row }) => {
          return <p style={{ color: '#fb9475', cursor: 'pointer' }} onClick={e => this.displayForm(e)} id={row.id}> View Details</p>
        },
        sortable: false,
        className: 'text-center'
      }
    ]

    if (this.state.redirect) {
      return <Redirect push to={{
        pathname: '/DetailViewRf24',
        state: {
          formId: this.state.displayId
        }
      }} />
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
                          aria-current='page'
                        >
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
                                  <button className='btn btn-info' id='pendingBtn' disabled > View Pending</button>
                                </NavLink>
                                <NavLink to='ApprovedRf24' className='mx-2'>
                                  <button className='btn btn-info' id='approvedBtn' > View Approved</button>
                                </NavLink>
                                <NavLink to='RejectedRf24' className='mx-2'>
                                  <button className='btn btn-info' id='rejectedBtn'> View Rejected</button>
                                </NavLink>
                                {/* <NavLink to='' className='mx-2'>
                                  <button className='btn btn-info' id='purgedBtn' > View Purged</button>
                                </NavLink> */}
                                {
                                  localStorage.getItem('user_type') === 'plant technical officer' &&
                                  <NavLink to='RF24' className='ml-auto mr-2' >
                                    <button className='btn btn-info'>Add</button>
                                  </NavLink>
                                }
                                {/* {
                                  localStorage.getItem('user_type') === 'plant technical officer' &&
                                  <NavLink to='' className='mx-2'>
                                    <button className='btn btn-info'>Update</button>
                                  </NavLink>
                                } */}
                                <div className='col-lg-12 col-md-12 col-sm-12 col-xs-12'>
                                  <hr />
                                  <p className='h5'>Pending Tests (RF - 24)</p>
                                  <hr />
                                  <ReactTable
                                    columns={columns}
                                    data={this.state.pendingData}
                                    className='table table-light -striped -highlight table-responsive text-center'
                                    headerClassName='bg-info'
                                    id='pendingTable'
                                    noDataText='Data not found.'
                                    ref={(r) => {
                                      this.selectTable = r
                                    }}
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

export default PendingRf24
