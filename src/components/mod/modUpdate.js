import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom';
import '../Test/Test.css'
import './modForm.css'
import axios from 'axios'
import ReactTable from 'react-table'
import 'react-table/react-table.css'

// const { API_KEY } = process.env
const API_URL = 'http://34.93.244.58/api/bom/';


export class modUpdate extends Component {

  constructor(props) {
    super(props)

    this.state = {
      fgCodes: [], fgDescriptions: [], fgCodeData: [], suggestions: [], tempBomData: [], text: '', destext: '', minorSegment: '', majorSegment: '',
      itemSequence: '', targetid: '', itemtext: '', itemCodes: [], itemSuggestions: [], itemDes: '',
      editbtnStyle: {
        display: 'block'
      },
      fgulStyle: {
        marginLeft: '1.5rem'
      },
      desulStyle: {
        marginLeft: '31rem'
      },
      editinputStyle: {
        display: 'none'
      },
      updateBtnState: true,
      tokenvalue: '',
      redirect: false
    }

    this.itemUpdate.bind(this)
    this.itemSuggestionSelected.bind(this)
    this.handleSearchInput.bind(this)
    this.suggestionSelected.bind(this)
    this.handleItemCodeInput.bind(this)
    this.handleUpdate.bind(this)
    this.submitData.bind(this)
    this.addItem.bind(this)
  }

  componentDidMount() {
    this.setState({ tokenvalue: localStorage.getItem('token') })
  }

  async getFGCodeData(value) {
    let fgCodeData = []

    try {
      const response = await axios({
        method: 'post',
        url: API_URL + `view`,
        headers: {},
        data: {
          code: value,
        },
        params: {
          token: this.state.tokenvalue
        }
      });
      if (response.status === 200) {
        fgCodeData = response.data
      }
      await this.setState({ fgCodeData });
    } catch (error) {
      console.log(error);
    }
  }

  async handleSearchInput(e) {
    this.state.targetid = e.target.id
    let suggestions = [], fgCodes = [], fgDescriptions = [], itemCodes = [], url, value = ''
this.setState({
  text: e.target.value
})
    if (this.state.targetid === 'fgcodeIn') {
      url = API_URL + `search`
      value = this.search.value
    } else if (this.state.targetid === 'fgdesIn') {
      url = API_URL + `search_desc`
      value = this.desSearch.value
    } else {
      url = API_URL + `item_search`
      value = this.itemsearch.value
    }

    if (value.length > 0) {
      const regex = new RegExp(`^${value}`, `i`)
      try {
        let data = { 'code': value }
        const response = await axios.post(url, data,
          (axios.defaults.headers.common['x-access-token'] = this.state.tokenvalue), {
          headers: {
            'content-type': 'application/x-www-form-urlencoded',
          },
        })

        if (response.status === 200 && this.state.targetid === 'fgcodeIn') {
          fgCodes = response.data.map((item) => item.FG_Code)
          suggestions = fgCodes.sort().filter(v => regex.test(v))
        } else if (response.status === 200 && this.state.targetid === 'fgdesIn') {
          fgDescriptions = response.data.map((item) => item.FG_Code_Description)
          suggestions = fgDescriptions.sort().filter(v => regex.test(v))
        } else {
          itemCodes = response.data.map((item) => item.ITEM_CODE)
          suggestions = itemCodes.sort().filter(v => regex.test(v))
        }
      } catch (error) {
        console.log(error)
      }
    }
    this.state.targetid === 'fgcodeIn' ? await this.setState({ suggestions, text: value }) : this.state.targetid === 'fgdesIn' ? await this.setState({ suggestions, destext: value }) : await this.setState({ itemSuggestions: suggestions, itemtext: value })
  }

  renderSuggestions = () => {
    const { suggestions } = this.state
    if (suggestions.length === 0) {
      return null
    }
    return (
      <ul className='list-group search-ul' style={this.state.targetid === 'fgcodeIn' ? this.state.fgulStyle : this.state.desulStyle}>{suggestions.map((item) => <li onClick={() => this.suggestionSelected(item)} key={Math.random()} className='list-group-item list-group-item-action'>{item}</li>)}</ul>
    )
  }

  renderItemSuggestions = () => {
    const { itemSuggestions } = this.state
    if (itemSuggestions.length === 0) {
      return null
    }
    return (
      <ul className='list-group item-search-ul'>{itemSuggestions.map((item) => <li key={Math.random()} className='list-group-item list-group-item-action' onClick={() => this.itemSuggestionSelected(item)}>{item}</li>)}</ul>
    )
  }

  async itemSuggestionSelected(value) {
    await this.setState({
      itemtext: value,
      itemSuggestions: []
    })
    let data = { 'code': value }
    try {
      const response = await axios.post(API_URL + `item_search`, data,
        (axios.defaults.headers.common['x-access-token'] = this.state.tokenvalue), {
        headers: {
          'content-type': 'application/x-www-form-urlencoded',
        },
      })
      if (response.status === 200) {
        await this.setState({ itemDes: response.data[0].ITEM_DESCRIPTION })
      }
    } catch (error) {
      console.log(error);
    }
  }

  async suggestionSelected(value) {
    await this.setState({
      text: value,
      suggestions: []
    })
    await this.getFGCodeData(value)
    await this.setState({
      minorSegment: this.state.fgCodeData[0].FG_Code_Minor_Segment,
      majorSegment: this.state.fgCodeData[0].FG_Code_Major_Segment,
      destext: this.state.fgCodeData[0].FG_Code_Description,
      itemSequence: this.state.fgCodeData[0].ITEM_SEQUENCE
    })
  }

  async handleItemCodeInput() {
    const value = this.itemsearch.value
    let suggestions = []
    if (value.length > 0) {
      const regex = new RegExp(`^${value}`, `i`)
      suggestions = this.state.itemCodes.sort().filter(v => regex.test(v))
    }
    await this.setState({ suggestions, itemtext: value });
  }

  // UPDATE FUNCTION
  async itemUpdate() {
    await this.setState({
      editbtnStyle: { display: 'none' },
      editinputStyle: { display: 'block' },
      updateBtnState: false
    })
  }

  async handleUpdate() {
    let quantityArr = 0, quantitySum = 0, alertQuantity = 0, updatedQT = 0, temp = [], update_arr = []
    const { text, destext, itemtext, minorSegment, majorSegment, itemSequence, fgCodeData } = this.state
    let d = new Date()

    quantityArr = this.state.fgCodeData.map((item) => quantityArr + parseInt(item.QUANTITY.split(" ")[0]))
    quantityArr.forEach(element => {
      quantitySum += element
    });
    alertQuantity = Math.round(10 / 100 * quantitySum) + quantitySum

    const currentRecords = this.selectTable.getResolvedState().sortedData

    for (let i = 0; i < currentRecords.length; i++) {
      if (Number.isNaN(parseInt(document.getElementById('updateQ-' + i).value))) {
        temp[i] = 0
      } else {
        temp[i] = parseInt(document.getElementById('updateQ-' + i).value)
      }
    }

    updatedQT = quantitySum
    for (let i = 0; i < temp.length; i++) {
      if (temp[i] > 0) {
        updatedQT = updatedQT - quantityArr[i] + temp[i]
      }
    }

    let date = (d.getDate() + '-' + (d.getMonth() + 1) + '-' + d.getFullYear() + ' ' + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds()).toString
    if (updatedQT > alertQuantity) {
      const con = window.confirm('Updated quantity is much greater than previous quantity. Do you still want to continue ?')
      if (con === true) {
        for (let u = 0; u < currentRecords.length; u++) {
          update_arr[u] = {
            "BILL_SEQUENCE_ID": 8189,
            "FG_Code": text,
            "FG_Code_Description": destext,
            "FG_Code_Major_Segment": minorSegment,
            "FG_Code_Minor_Segment": majorSegment,
            "ITEM_SEQUENCE": itemSequence.toString(),
            "Item_Code": currentRecords[u].Item_Code,
            "Item_Description": currentRecords[u].Item_Description,
            "QUANTITY": quantityArr[u].toString() + ' KG',
            "Organization": fgCodeData[0].Organization,
            "Org_Code": fgCodeData[0].Org_Code,
            "Org_Id": fgCodeData[0].Org_Id,
            "FG_CODE_STATUS": fgCodeData[0].FG_CODE_STATUS,
            "UPDATED_QUANTITY": temp[u].toString() + ' KG',
            "STATUS": null,
            "TRANSACTION_TYPE": "UPDATE",
            "ATTRIBUTE1": null,
            "ATTRIBUTE2": null,
            "ERROR": null,
            "Update_DATE": date,
            "created_by": "Ganesh Pawar",
            "verified_by": null,
            "PROCESS_STATE": null,
            "STATE": null
          }
          update_arr.push(update_arr[u])
        }
        console.log('Updating...')
        this.submitData(update_arr)

      } else if (con === false) {
        console.log('Update stopped !')
      }

    } else {
      for (let u = 0; u < currentRecords.length; u++) {
        update_arr = [
          update_arr[u] = {
            "BILL_SEQUENCE_ID": 8189,
            "FG_Code": text,
            "FG_Code_Description": destext,
            "FG_Code_Major_Segment": minorSegment,
            "FG_Code_Minor_Segment": majorSegment,
            "ITEM_SEQUENCE": itemSequence.toString(),
            "Item_Code": itemtext,
            "Item_Description": currentRecords[u].Item_Description,
            "QUANTITY": quantityArr[u].toString() + ' KG',
            "Organization": fgCodeData[0].Organization,
            "Org_Code": fgCodeData[0].Org_Code,
            "Org_Id": fgCodeData[0].Org_Id,
            "FG_CODE_STATUS": fgCodeData[0].FG_CODE_STATUS,
            "UPDATED_QUANTITY": temp[u].toString() + ' KG',
            "STATUS": "0",
            "TRANSACTION_TYPE": "UPDATE",
            "ATTRIBUTE1": null,
            "ATTRIBUTE2": null,
            "ERROR": null,
            "Update_DATE": (d.getDate() + '-' + (d.getMonth() + 1) + '-' + d.getFullYear() + ' ' + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds()).toString,
            "created_by": "Ganesh Pawar",
            "verified_by": null,
            "PROCESS_STATE": null,
            "STATE": null
          }]
      }
      console.log('Updating...')
      this.submitData(update_arr)
    }

  }

  async submitData(update_arr) {
    let obj = {}
    obj = {
      'update_arr': update_arr
    }

    try {
      const response = await axios.post(API_URL + `update`, obj, {
        headers: {
          'content-type': 'application/json',
          'x-access-token': this.state.tokenvalue
        },
      })
      if (response.status === 200) {
        if (response.data.success === true) {
          window.alert('Updated sucessfully !')
          this.setState({ redirect: true })
        } else {
          window.alert('Update failed !')
        }
      }
    } catch (error) {
      console.log(error);
    }

  }

  async addItem() {
    const { text, destext, itemtext, minorSegment, majorSegment, itemSequence, itemDes } = this.state
    let fgCodeData = this.state.fgCodeData
    let quantity = document.getElementById('quantity').value
    let d = new Date()

    let newItem = {
      "BILL_SEQUENCE_ID": 8189,
      "FG_Code": text,
      "FG_Code_Description": destext,
      "FG_Code_Major_Segment": minorSegment,
      "FG_Code_Minor_Segment": majorSegment,
      "ITEM_SEQUENCE": itemSequence.toString(),
      "Item_Code": itemtext,
      "Item_Description": itemDes,
      "QUANTITY": quantity.toString() + ' KG',
      "Organization": fgCodeData[0].Organization,
      "Org_Code": fgCodeData[0].Org_Code,
      "Org_Id": fgCodeData[0].Org_Id,
      "FG_CODE_STATUS": fgCodeData[0].FG_CODE_STATUS,
      "CREATION_DATE": (d.getDate() + '-' + (d.getMonth() + 1) + '-' + d.getFullYear() + ' ' + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds()).toString
    }

    fgCodeData.push(newItem)
    await this.setState({ fgCodeData })
  }

  render() {

    const columns = [
      {
        Header: 'Sr No.',
        id: "row",
        filterable: false,
        Cell: (row) => {
          return <div>{row.index}</div>;
        },
        sortable: false,
        className: 'text-center'
      },
      {
        Header: 'Item Code',
        accessor: 'Item_Code',
        sortable: false,
        className: 'text-center'
      },
      {
        Header: 'Item Description',
        accessor: 'Item_Description',
        width: 380,
        sortable: false,
      },
      {
        Header: 'Item Sequence',
        accessor: 'ITEM_SEQUENCE',
        sortable: false,
        className: 'text-center'
      },
      {
        Header: 'Quantity',
        accessor: 'QUANTITY',
        sortable: false,
        className: 'text-center'
      },
      {
        Header: 'Update Quantity',
        Cell: ({ row }) => {
          return (
            <div>
              <button className='btn btn-sm btn-info' style={this.state.editbtnStyle} onClick={this.itemUpdate.bind(this)}>Edit</button>
              <input type='number' className='form-control form-control-sm' id={'updateQ-' + row._index} style={this.state.editinputStyle} />
            </div>
          )
        },
        sortable: false,
        className: 'text-center'
      }
    ]

    if (this.state.redirect) {
      return <Redirect push to={{
        pathname: '/modPending'
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
                      Auto complete Form -
                    </li>
                  </ol>
                </nav>
              </div>
            </div>
          </div>
          <form className='w-100 align-items-center justify-content-center container'>
            <div className='py-2 autocomplete bg-info'>
              <input
                style={{ width: '25rem' }}
                type='text'
                className='form-control mx-4 my-1'
                value={this.state.text}
                placeholder='Search by FG Code..'
                ref={input => this.search = input}
                id='fgcodeIn'
                onChange={e => this.handleSearchInput(e)}
              />
              <label className='h4' style={{ color: '#fff' }}>OR</label>
              <input
                style={{ width: '35rem' }}
                type='text'
                className='form-control mx-4'
                value={this.state.destext}
                placeholder='Search by FG Description..'
                ref={desinput => this.desSearch = desinput}
                onChange={e => this.handleSearchInput(e)}
                id='fgdesIn'
              />
              {this.renderSuggestions()}
            </div>

            <div className='my-4'>
              <label className='ml-4 mr-3'>Minor Segment:</label>
              <input
                style={{ width: '15rem' }}
                type='text'
                className='form-control'
                value={this.state.minorSegment}
                disabled
              />
              <label className='ml-5 mr-3'>Major Segment:</label>
              <input
                style={{ width: '15rem' }}
                type='text'
                className='form-control'
                value={this.state.majorSegment}
                disabled
              />
              <button type='button' className='btn btn-success float-right mr-4' style={{ width: '6rem' }}
                data-toggle="modal" data-target="#exampleModal">Add Item</button>
              <button type='button' id='updateBtn' className='btn btn-success float-right mr-4 ml-3' style={{ width: '6rem' }}
                onClick={this.handleUpdate.bind(this)} disabled={this.state.updateBtnState}>Update</button>
            </div>
            <div className='container'>
              <ReactTable
                columns={columns}
                data={this.state.fgCodeData}
                className='table table-light -striped -highlight'
                showPagination={false}
                defaultPageSize={10}
                loading={false}
                noDataText='Data not found.'
                ref={(r) => {
                  this.selectTable = r;
                }}
              />
              <div className='my-4 autocomplete float-right'>
              </div>
            </div>
          </form>

          <div class="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" role="document">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="exampleModalCenterTitle">Add item</h5>
                  <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div class="modal-body">
                  <form>
                    <div class="form-group">
                      <label htmlFor="FGCode" class="col-form-label mr-2">FG Code:</label>
                      <input type="text" class="form-control small-input" id='FGCode' value={this.state.text} disabled />
                    </div>
                    <div class="form-group">
                      <label htmlFor="FGDescription" class="col-form-label">FG Description:</label>
                      <input type="text" class="form-control" id="FGDescription" value={this.state.destext} disabled />
                    </div>
                    <div class="form-group">
                      <label htmlFor="minorSegment" class="col-form-label mr-2">Minor Segment:</label>
                      <input type="text" class="form-control small-input" id="minorSegment" value={this.state.minorSegment} disabled />
                      <label htmlFor="majorSegment" class="col-form-label ml-4 mr-2">Major Segment:</label>
                      <input type="text" class="form-control small-input" id="majorSegment" value={this.state.majorSegment} disabled />
                    </div>
                    <div class="form-group">
                      <label htmlFor="itemCode" class="col-form-label mr-2">Item Code:</label>
                      <input
                        value={this.state.itemtext}
                        type="text"
                        class="form-control small-input"
                        id="itemCode"
                        autoFocus
                        ref={input => this.itemsearch = input}
                        onChange={e => this.handleSearchInput(e)} />
                      {this.renderItemSuggestions()}
                    </div>
                    <div class="form-group">
                      <label htmlFor="itemDescription" class="col-form-label mr-2">Item Description:</label>
                      <input type='text' class="form-control" id="itemDescription" value={this.state.itemDes} />
                    </div>
                    <div class="form-group">
                      <label htmlFor="itemSequence" class="col-form-label mr-2">Item Sequence:</label>
                      <input type="text" class="form-control small-input" id="itemSequence" value={this.state.itemSequence} disabled />
                      <label htmlFor="quantity" class="col-form-label ml-4 mr-2">Quantity:</label>
                      <input type="text" class="form-control small-input" id="quantity" />
                    </div>
                  </form>
                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                  <button type="button" class="btn btn-primary" data-dismiss="modal" onClick={this.addItem.bind(this)}>Add</button>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div >
    )
  }
}

export default modUpdate
