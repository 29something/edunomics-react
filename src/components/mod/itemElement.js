import React, { Component } from 'react'

export class itemElement extends Component {

  constructor(props) {
    super(props)
    this.props = props
  }

  render() {
    return (
      <li key={Math.random()} className='list-group-item'>
        <div className='bg-light w-100 p-3' style={{ boxShadow: '0 4px 6px 0 rgba(0, 0, 0, 0.1), 0 4px 16px 0 rgba(0, 0, 0, 0.1)', borderRadius: '4px' }}>
          <p><span className='font-weight-bold'>Item Code: </span>{this.props.item_code}</p>
          <p><span className='font-weight-bold'>Item Description: </span>{this.props.item_des}</p>
          <p><span className='font-weight-bold'>Item Sequence: </span>{this.props.item_sequence}</p>
          <p><span className='font-weight-bold'>Item Quantity: </span>{this.props.item_quantity}</p>
        </div>
      </li>
    )
  }
}

export default itemElement
