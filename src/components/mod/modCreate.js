import React, { Component } from 'react'
import { Redirect, Link } from 'react-router-dom'
import '../Test/Test.css'
import './modForm.css'
import axios from 'axios'
import itemElement from './itemElement';

const API_URL = 'http://35.234.215.61/api/bom/'

export class modCreate extends Component {

  constructor(props) {
    super(props)

    this.state = {
      fgCheckResult: '',
      fgCheckResultColor: {
        color: '#dc3545'
      },
      itemSuggestions: [],
      itemtext: '',
      itemDes: '',
      ulitemCodes: [],
      ulitemDes: [],
      ulitemSeq: [],
      ulitemQuantity: [],
      ulitems: [],
      createDiv: {
        display: 'none'
      },
      tokenvalue: '',
      redirect: false
    }

    this.checkBom.bind(this)
    this.handleSearchInput.bind(this)
    this.itemSuggestionSelected.bind(this)
    this.addItem.bind(this)
    this.submitData.bind(this)
  }

  componentDidMount() {
    this.setState({ tokenvalue: localStorage.getItem('token') })
  }

  async checkBom() {
    const data = { 'code': 'f' }
    let result
    const userIn = document.getElementById('fgcodeIn').value.toLowerCase()

    if (userIn.length > 0) {
      try {
        const response = await axios.post(API_URL + `search`, data,
          (axios.defaults.headers.common['x-access-token'] = this.state.tokenvalue), {
          headers: {
            'content-type': 'application/x-www-form-urlencoded',
          }
        })

        if (response.status === 200) {
          for (let i = 0; i < response.data.length; i++) {
            const code = response.data[i].FG_Code.toLowerCase()
            if (code === userIn) {
              result = false
              break
            } else { result = true }
          }
        }
      } catch (error) {
        console.log(error)
      }

      if (result === true) {
        await this.setState({
          fgCheckResult: 'Entered FG Code available.',
          fgCheckResultColor: {
            color: '#28a745'
          },
          createDiv: {
            display: 'block'
          }
        })
      } else if (result === false) {
        await this.setState({
          fgCheckResult: 'Entered FG Code already exist, please update if required.',
          fgCheckResultColor: {
            color: '#dc3545'
          },
          createDiv: {
            display: 'none'
          }
        })
      }
    } else {
      await this.setState({
        fgCheckResult: 'No data entered !',
        fgCheckResultColor: {
          color: '#dc3545'
        },
        createDiv: {
          display: 'none'
        }
      })
    }
  }

  async handleSearchInput(e) {
    e.preventDefault()
    this.state.targetid = e.target.id
    let suggestions = [], itemCodes = []
    const url = API_URL + `item_search`
    const value = this.itemsearch.value

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

        if (response.status === 200) {
          itemCodes = response.data.map((item) => item.ITEM_CODE)
          suggestions = itemCodes.sort().filter(v => regex.test(v))
        }
      } catch (error) {
        console.log(error)
      }
    }
    await this.setState({ itemSuggestions: suggestions, itemtext: value })
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

  async addItem() {
    const { itemtext, itemDes, ulitems } = this.state
    let obj = {}
    obj.componentcode = itemtext
    obj.item_des = itemDes
    obj.itemsequence = document.getElementById('itemSequence').value
    obj.quantity = document.getElementById('itemQuantity').value
    ulitems[ulitems.length] = obj

    await this.setState({ ulitems })
    document.getElementById('itemSequence').value = ''
    document.getElementById('itemQuantity').value = ''
    await this.setState({ itemtext: '', itemDes: '' })
  }

  renderItemList = () => {
    const { ulitems } = this.state
    if (ulitems.length === 0) {
      return null
    } else {
      return (
        <ul className='list-group item-list-group' style={{ listStyleType: 'none' }}>
          {ulitems.map((item, index) => {
            return (
              <li key={index} className='list-group-item item-list-listchild' style={{ backgroundColor: 'inherit', border: 'none' }}>
                <div className='bg-light p-3' style={{ boxShadow: '0 4px 6px 0 rgba(0, 0, 0, 0.1), 0 4px 16px 0 rgba(0, 0, 0, 0.1)', borderRadius: '4px' }}>
                  <p><span className='font-weight-bold'>Item Code: </span>{item.componentcode}</p>
                  <p><span className='font-weight-bold'>Item Description: </span>{item.item_des}</p>
                  <p><span className='font-weight-bold'>Item Sequence: </span>{item.itemsequence}</p>
                  <p><span className='font-weight-bold'>Item Quantity: </span>{item.quantity}<span className='float-right mr-4' style={{ color: '#FB9475', fontSize: '1rem', cursor: 'default' }} id={index} onClick={e => this.deleteItem(e)}>Delete</span></p>
                </div>
              </li>
            )
          })}
        </ul>
      )
    }
  }

  async deleteItem(e) {
    const id = e.target.id
    let ulitems = this.state.ulitems
    ulitems.splice(id, 1)
    await this.setState({ ulitems })
  }

  checkQuantity = () => {
    const items = this.state.ulitems
    let finalQuantity = 0
    items.every((item) => {
      finalQuantity = + parseInt(item.quantity)
    })
    if (finalQuantity > 2400) {
      return false
    } else {
      return true
    }
  }

  validateData = () => {
    const minor = document.getElementById("minor-input")
    const major = document.getElementById("major-input")
    let data = {}
    data.fgcode = (document.getElementById('fgcodeIn').value).toUpperCase()
    data.shortdescription = document.getElementById('des-short').value.toUpperCase()
    data.longdescription = document.getElementById('des-long').value.toUpperCase()
    data.minorsegmnt = minor.options[minor.selectedIndex].text
    // data.majorsegment = major.options[major.selectedIndex].text
    // orgcode = document.getElementById('orgCode'),
    data.items = this.state.ulitems
    if (this.checkQuantity() === true) {
      this.submitData(data)
    } else {
      const con = window.confirm('Quantity of items exceeds 2400kg. Do you still want to continue ? ')
      con === true ? this.submitData(data) : console.log('New BOM submission stopped')
    }
  }

  async submitData(data) {
    try {
      const response = await axios.post(API_URL + `addBom`, data,
        (axios.defaults.headers.common['x-access-token'] = this.state.tokenvalue), {
        headers: {
          'content-type': 'application/x-www-form-urlencoded',
        }
      })

      if (response.status === 200) {
        if (response.data.msg === 'BOM added successfully') {
          window.alert(response.data.msg)
          this.setState({ redirect: true })
        } else {
          window.alert('BOM addition failed')
        }
      }

    } catch (error) {
      console.log(error)
    }
  }

  render() {

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
                      Create Mod
                    </li>
                  </ol>
                </nav>
              </div>
            </div>
          </div>
          <div className='container h-100 w-100'>
            <div className='row py-2 autocomplete bg-info w-100 justify-content-center' style={{ borderRadius: '4px' }}>
              <p className='h4 my-auto ml-5' style={{ color: '#fff' }}>Enter new FG Code: </p>
              <input
                style={{ width: '40rem' }}
                type='text'
                className='form-control mx-4'
                placeholder='FG Code..'
                id='fgcodeIn'
                autoFocus
                formValidate
                minLength={6}
              />
              <button className='btn btn-success' onClick={this.checkBom.bind(this)}>Check</button>
            </div>
            <p className='text-center h5 my-3' style={this.state.fgCheckResultColor}>{this.state.fgCheckResult}</p>

            <div style={this.state.createDiv}>
              <p className='h4 mt-5'>Details of BOM - </p>
              <hr />
              <div className='row'>
                <div className='col-lg-7 col-md-7 col-sm-12'>
                  <table className='table table-borderless'>
                    <tbody>
                      <tr>
                        <td style={{ borderTop: 'none' }}><label htmlFor='des-long' >Description (long) : </label></td>
                        <td style={{ borderTop: 'none' }}><textarea className='form-control' id='des-long' /></td>
                      </tr>
                      <tr>
                        <td><label htmlFor='des-short'>Description (short) : </label></td>
                        <td><input type='text' className='form-control' id='des-short' /></td>
                      </tr>
                      <tr>
                        <td><label htmlFor='minor-input'>Minor segment : </label></td>
                        <td>
                          <select className='form-control' id='minor-input'>
                            <option value='1' >M 05</option>
                            <option value='2' >M 20</option>
                            <option value='3' >M 7.5</option>
                            <option value='4' >M 10</option>
                            <option value='5' >M 15</option>
                            <option value='6' >M 30</option>
                          </select>
                        </td>
                      </tr>
                      <tr>
                        <td><label>Major segment : </label></td>
                        <td>
                          <select className='form-control' id='major-input'>
                            <option value='1' >Con-Grade</option>
                          </select>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <button className='btn btn-success float-right my-3 mx-4' style={{ width: '6rem' }} onClick={this.validateData}>Create</button>
                </div>
                <div className='col-lg-5 col-md-5 col-sm-12' style={{ overflow: 'hidden' }}>
                  <button type='button' className='btn btn-info btn-sm mt-2 mb-3'
                    data-toggle="modal" data-target="#addItemModal">Add Item</button>
                  {this.renderItemList()}
                </div>
              </div>
            </div>
          </div>

          <div class="modal fade" id="addItemModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
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
                      <input type='text' class="form-control" id="itemDescription" value={this.state.itemDes} onChange='' />
                    </div>
                    <div class="form-group">
                      <label htmlFor="itemSequence" class="col-form-label mr-2">Item Sequence:</label>
                      <input type="number" class="form-control small-input" id="itemSequence" />
                      <label htmlFor="quantity" class="col-form-label ml-4 mr-2">Quantity:</label>
                      <input type="number" class="form-control small-input" id="itemQuantity" />
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

export default modCreate
