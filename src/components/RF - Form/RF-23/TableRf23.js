import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'
import '../../Test/Test.css'
import axios from 'axios'
import ReactTable from 'react-table'
import 'react-table/react-table.css'
import '../../mod/modForm.css'
import { API_URL } from '../../../services/url'

// const tokenvalue = 'eyJhbGciOiJIUzM4NCIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjg5LCJyb2xlX2lkIjo1LCJwbGFudElkcyI6MzMsIm5hbWUiOiJHYW5lc2ggUGF3YXIiLCJpYXQiOjE1NjY2NzA0MTcsImV4cCI6MTU2Njg0MzIxN30.QywTd2-LLxWxeQ7yHg67SieYqWW1Qg4OUfLZzkfi3q5V9TQ5VJOVAyZ1tyeEkdnv'
const tokenvalue = localStorage.getItem('token')
console.log(tokenvalue)

export class TableRf23 extends Component {
  constructor(props) {
    super(props)

    this.state = {
      data: [], displayId: '', redirect: false
    }

  }

  async componentDidMount() {
    let data = []
    try {
      const response = await axios.get(API_URL + `cube/view_inc_rf7/casted`, (axios.defaults.headers.common['x-access-token'] = tokenvalue), {
        headers: {
          'content-type': 'application/x-www-form-urlencoded'
        }
      })
      if (response.status === 200) {
        data = response.data
      }
    } catch (error) {
      console.log(error)
    }

    await this.setState({ data })
  }

  async displayReport(e) {
    const displayId = e.target.id.split('-')[1]
    console.log(displayId)
    await this.setState({ displayId, redirect: true })
  }

  render() {
    const columns = [
      {
        Header: 'ID',
        accessor: 'id',
        sortable: false,
        width: 90
      },
      {
        Header: 'Submit Date',
        accessor: 'submit_date',
        sortable: false
      },
      {
        Header: 'Plant Name',
        accessor: 'plant_name',
        sortable: false
      },
      {
        Header: 'Ticket No',
        accessor: 'EXCISE_NUMBER',
        sortable: false
      },
      {
        Header: 'Batch No',
        accessor: 'BATCH_NUMBER',
        sortable: false
      },
      {
        Header: 'Customer Name',
        accessor: 'CUSTOMER_NAME',
        sortable: false
      },
      {
        Cell: ({ row }) => {
          return (
            <div>
              <button className='btn btn-sm btn-info' id={'view-' + row.id} onClick={e => this.displayReport(e)}>
                View<i class='fa fa-eye ml-1' aria-hidden='true' /></button>
            </div>
          )
        },
        Header: 'View',
        sortable: false
      }
    ]

    if (this.state.redirect) {
      return <Redirect push to={{
        pathname: '/ViewRf23',
        state: {
          displayid: this.state.displayId
        }
      }} />
    }

    return (
      <div className='skin-blue fixed-layout'>
        <div className='page-wrapper'>
          <div className='container-fluid'>
            <div className='row page-titles'>
              <div className='col-md-5 align-self-center'>
                {/* <h4 className="text-themecolor">Forms</h4> */}
                <nav aria-label='breadcrumb'>
                  <ol class='breadcrumb'>
                    <li className='breadcrumb-item'>
                      <Link to={process.env.PUBLIC_URL + '/'}>Home</Link>
                    </li>
                    <li className='breadcrumb-item active' aria-current='page'>
                      RF - 23
                    </li>
                  </ol>
                </nav>
              </div>
            </div>
          </div>
          <div className='container'>
            <ReactTable
              columns={columns}
              data={this.state.data}
              className='table table-light -striped -highlight table-responsive text-center'
              headerClassName='bg-info'
              showPagination={false}
              defaultPageSize={10}
              id='Rf23Table'
            />
          </div>
        </div>
      </div>
    )
  }
}

export default TableRf23
