import React, { Component } from 'react'
import { NavLink, Link, Redirect } from 'react-router-dom'
import '../Test/Test.css'
import './modForm.css'
import axios from 'axios'
import ReactTable from 'react-table'
import 'react-table/react-table.css'

// const { API_KEY } = process.env
const API_URL = 'http://34.93.244.58/api/bom/';
// const tokenvalue = 'eyJhbGciOiJIUzM4NCIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjg5LCJyb2xlX2lkIjo1LCJwbGFudElkcyI6MzMsIm5hbWUiOiJHYW5lc2ggUGF3YXIiLCJpYXQiOjE1NjY4ODQyMTgsImV4cCI6MTU2NzA1NzAxOH0.LMJysgF8_Hvy9a1xNLjPkrdtt0GwI_Wm3VCZmfVxpTP-PdClpIClVKieX4accwVe'

export class modPending extends Component {
  constructor(props) {
    super(props)

    this.state = {
      pendingData: [], fgcode: '', orgcode: '', redirect: false, update_id: '', type: '', data: []
    }
  }

  async componentDidMount() {
    const tokenvalue = localStorage.getItem('token')
    let pendingData = []; let data = []
    try {
      const response = await axios.get(API_URL + `view`, (axios.defaults.headers.common['x-access-token'] = tokenvalue), {
        headers: {
          'content-type': 'application/x-www-form-urlencoded'
        }
      })
      if (response.status === 200) {
        response.data.map((item) => {
          if (item.STATUS === '0') {
            pendingData.push(item)
          }
        })
      }
    } catch (error) {
      console.log(error)
    }

    await this.setState({ pendingData, data })
  }

  async displayDescription(e) {
    const id = e.target.id
    const currentRecords = this.selectTable.getResolvedState().sortedData
    const fgcode = currentRecords[id].FG_Code
    const orgcode = currentRecords[id].Org_Code
    const type = currentRecords[id].type
    const update_id = this.state.pendingData[id].bom_update_id
    await this.setState({ fgcode, orgcode, update_id, type, redirect: true })
  }

  render() {
    const temp = 35

    const columns = [
      {
        Header: 'FG Code',
        accessor: 'FG_Code',
        sortable: false
      },
      {
        Header: 'Organisation Code',
        accessor: 'Org_Code',
        sortable: false
      },
      {
        Header: 'Type',
        accessor: 'type',
        sortable: false
      },
      {
        Header: 'Updated by',
        accessor: 'update_by',
        sortable: false
      },
      {
        Header: 'Update Time',
        accessor: 'update_time',
        sortable: false
      },
      {
        Header: 'View',
        Cell: ({ row, rowValue, index }) => {
          return <p style={{ color: '#fb9475', cursor: 'pointer' }} onClick={e => this.displayDescription(e)} id={row._index}> View Details</p>
        },
        sortable: false,
        className: 'text-center'
      }
    ]

    if (this.state.redirect) {
      return <Redirect push to={{
        pathname: '/modDetailView',
        state: {
          fgcode: this.state.fgcode,
          orgcode: this.state.orgcode,
          update_id: this.state.update_id,
          type: this.state.type
        }
      }} />
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
                      <Link to={process.env.PUBLIC_URL + '/'}>Home</Link>
                    </li>
                    <li className='breadcrumb-item active' aria-current='page'>
                      Mod Table
                    </li>
                  </ol>
                </nav>
              </div>
            </div>
          </div>
          <div className='container my-3 w-100'>
            <NavLink to='modPending' className='mx-4'>
              <button className='btn btn-info' id='pendingBtn' disabled > View Pending</button>
            </NavLink>
            <NavLink to='modApproved' className='mx-4'>
              <button className='btn btn-info' id='approvedBtn' > View Approved</button>
            </NavLink>
            <NavLink to='modRejected' className='mx-4'>
              <button className='btn btn-info' id='rejectedBtn'> View Rejected</button>
            </NavLink>
            <NavLink to='modPurged' className='mx-4'>
              <button className='btn btn-info' id='purgedBtn' > View Purged</button>
            </NavLink>
            {
              window.localStorage.getItem('user_type') === 'plant technical officer' &&
              <NavLink to='modCreate' className='mx-4' style={{ float: 'right' }}>
                <button className='btn btn-info'>Create BOM</button>
              </NavLink>
            }
            {
              window.localStorage.getItem('user_type') === 'plant technical officer' &&
              <NavLink to='modUpdate' className='mx-4' style={{ float: 'right' }}>
                <button className='btn btn-info'>Update BOM</button>
              </NavLink>
            }
          </div>
          <div className='container'>
            <ReactTable
              columns={columns}
              data={this.state.pendingData}
              className='table table-light -striped -highlight table-responsive text-center'
              headerClassName='bg-info'
              showPagination={false}
              defaultPageSize={temp}
              id='pendingTable'
              noDataText='Data not found.'
              ref={(r) => {
                this.selectTable = r;
              }}
            />
          </div>
        </div>
      </div>
    )
  }
}

export default modPending
