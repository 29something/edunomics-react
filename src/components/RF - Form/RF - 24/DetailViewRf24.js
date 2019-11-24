import React, { Component } from 'react'
import '../../Test/Test.css'
import { Link, NavLink, Redirect } from 'react-router-dom'
import axios from 'axios'
import { API_URL } from '../../../services/url'
import './RF24.css'

const tokenvalue = localStorage.getItem('token')

export class DetailViewRf24 extends Component {
  constructor() {
    super()
    this.state = {
      data: {}, supervisor: false, redirect: false
    }

  }

  async componentDidMount() {
    // console.log('TOKEN -> ' + tokenvalue)
    const formId = this.props.location.state.formId
    if (localStorage.getItem('user_type') !== 'quality incharge') { await this.setState({ supervisor: false }) } else { await this.setState({ supervisor: true }) }
    let data = {}
    try {
      const response = await axios.get(`${API_URL}rf_form/view/${formId}`, (axios.defaults.headers.common['x-access-token'] = tokenvalue), {
        headers: {
          'content-type': 'application/x-www-form-urlencoded'
        }
      })
      if (response.status === 200) {
        response.data.data.map((item) => {
          data[item.question] = item.answer
        })
        await this.setState({ data })
      }
    } catch (error) {
      console.log(error)
    }

    let k = ''
    for (k in data) {
      document.getElementById(k).value = data[k]
    }
  }

  change = event => {
    event.preventDefault()
    this.setState({ [event.target.id]: event.target.value })
  }

  async qicAction(e) {
    let body = {}
    e.target.id === 'accept' ? body = { status: 1, formid: this.props.location.state.formId } : body = { status: 2, formid: this.props.location.state.formId }
    try {
      const response = await axios.post(`${API_URL}rf_form/verify`, body, (axios.defaults.headers.common['x-access-token'] = tokenvalue), {
        headers: {
          'content-type': 'application/x-www-form-urlencoded'
        }
      })
      if (response.status === 200) {
        response.data === 'verified' ? this.setState({ redirect: true }) : alert(response.data)
      }
    } catch (error) {
      console.log(error)
    }
  }


  render() {

    if (this.state.redirect) {
      return <Redirect push to={{
        pathname: '/PendingRf24'
      }} />
    }
    const { data, supervisor } = this.state

    return (
      < React.Fragment >
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
                    <div className='col-lg-12 col-md-12 col-sm-12 col-xs-12'>
                      <h3 className='text-center'>RF -24</h3>
                      <p className='text-center'>
                        Determination of Fresh Wet Density and Yield of concrete IS : 1199 - 1959
                </p>
                      <hr />
                    </div>

                    <form>
                      <table className='table table-borderless text-center table-responsive'>
                        <tbody>
                          <tr>
                            <td colSpan='5'>Client/Project name:</td>
                            <td colSpan='10'><input type='text' id='project_name' className='form-control form-control-sm custom-input' disabled /></td>
                          </tr>
                          <tr>
                            <td colSpan='2'>Date: </td>
                            <td colSpan='3'><input type='date' id='date' className='form-control form-control-sm custom-input' disabled /></td>
                            <td colSpan='3'>Water added at instant: </td>
                            <td colSpan='2'><input type='text' id='instant_water_added' className='form-control form-control-sm custom-input' disabled /></td>
                            <td colSpan='2' rowSpan='2'>Trial conducted by</td>
                            <td colSpan='3' rowSpan='2'><input type='text' id='trial_conducted_by' className='form-control form-control-sm custom-input' disabled /></td>
                          </tr>
                          <tr>
                            <td colSpan='4'>Admixture batch no: </td>
                            <td colSpan='4'><input type='text' id='admixture_batch_no' className='form-control form-control-sm custom-input' disabled /></td>
                            <td colSpan='2' />
                          </tr>
                          <tr>
                            <td colSpan='2'>Batch weight: </td>
                            <td colSpan='3'><input type='number' className='form-control form-control-sm custom-input' id='batch_weight' disabled /></td>
                            <td colSpan='3'>Concreate Grade: </td>
                            <td colSpan='2'><input type='text' id='concrete_grade' className='form-control form-control-sm custom-input' disabled /></td>
                            <td colSpan='3'>Ambient temperature: </td>
                            <td colSpan='2'><input type='text' id='ambient_temperature' className='form-control form-control-sm custom-input' disabled /></td>
                          </tr>
                          <tr>
                            <td colSpan='4' rowSpan='3'>Material Details</td>
                            <td rowSpan='3'>Type</td>
                            <td rowSpan='3'>Source/ Brand</td>
                            <td colSpan='2' rowSpan='3'>Mass kg/m3</td>
                            <td>Absorption</td>
                            <td>Moisture</td>
                            <td colSpan='2' rowSpan='3'>Final Quantity kg/m3</td>
                            <td colSpan='2' rowSpan='3'>Batch weight for {data.batch_weight} kg</td>
                            <td colSpan='1' rowSpan='3'>Water correction (lt)</td>
                          </tr>
                          <tr>
                            <td colSpan='2'>Correction</td>
                          </tr>
                          <tr>
                            <td>(%)</td>
                            <td>(%)</td>
                          </tr>
                          <tr>
                            <td colSpan='4'>Cement</td>
                            <td ><input type='text' id='cement_brand' className='form-control form-control-sm custom-input text-input' disabled /></td>
                            <td><input type='text' id='cement_type' className='form-control form-control-sm custom-input text-input' disabled /></td>
                            <td colSpan='2'><input type='text' className='form-control form-control-sm custom-input' id='cement_mass' disabled /></td>
                            <td colSpan='2' rowSpan='7' />
                            <td colSpan='2'><input type='text' className='form-control form-control-sm custom-input' disabled id='cement_final_quantity' /></td>
                            <td colSpan='2'><input type='text' className='form-control form-control-sm custom-input' id='cement_batch_weight' disabled /></td>
                            <td colSpan='1' rowSpan='6' />
                          </tr>
                          <tr>
                            <td colSpan='4'>Flyash</td>
                            <td><input type='text' id='flyash_brand' className='form-control form-control-sm custom-input text-input' disabled /></td>
                            <td><input type='text' id='flyash_type' className='form-control form-control-sm custom-input text-input' disabled /></td>
                            <td colSpan='2'><input type='text' className='form-control form-control-sm custom-input' id='flyash_mass' disabled /></td>
                            <td colSpan='2'><input type='text' className='form-control form-control-sm custom-input' id='flyash_final_quantity' disabled /></td>
                            <td colSpan='2'><input type='text' className='form-control form-control-sm custom-input' id='flyash_batch_weight' disabled /></td>
                          </tr>
                          <tr>
                            <td colSpan='4'>GGBFS</td>
                            <td><input type='text' id='ggbfs_brand' className='form-control form-control-sm custom-input text-input' disabled /></td>
                            <td><input type='text' id='ggbfs_type' className='form-control form-control-sm custom-input text-input' disabled /></td>
                            <td colSpan='2'><input type='text' className='form-control form-control-sm custom-input' id='ggbfs_mass' disabled /></td>
                            <td colSpan='2'><input type='text' className='form-control form-control-sm custom-input' id='ggbfs_final_quantity' disabled /></td>
                            <td colSpan='2'><input type='text' className='form-control form-control-sm custom-input' id='ggbfs_batch_weight' disabled /></td>
                          </tr>
                          <tr>
                            <td colSpan='4'>Micro Silica</td>
                            <td><input type='text' id='microsilica_brand' className='form-control form-control-sm custom-input text-input' disabled /></td>
                            <td><input type='text' id='microsilica_type' className='form-control form-control-sm custom-input text-input' disabled /></td>
                            <td colSpan='2'><input type='text' className='form-control form-control-sm custom-input' id='microsilica_mass' disabled /></td>
                            <td colSpan='2'><input type='text' className='form-control form-control-sm custom-input' id='microsilica_final_quantity' disabled /></td>
                            <td colSpan='2'><input type='text' className='form-control form-control-sm custom-input' id='microsilica_batch_weight' disabled /></td>
                          </tr>
                          <tr>
                            <td colSpan='4'>Alccofine</td>
                            <td><input type='text' id='alccofine_brand' className='form-control form-control-sm custom-input text-input' disabled /></td>
                            <td><input type='text' id='alccofine_type' className='form-control form-control-sm custom-input text-input' disabled /></td>
                            <td colSpan='2'><input type='text' className='form-control form-control-sm custom-input' id='alccofine_mass' disabled /></td>
                            <td colSpan='2'><input type='text' className='form-control form-control-sm custom-input' id='alccofine_final_quantity' disabled /></td>
                            <td colSpan='2'><input type='text' className='form-control form-control-sm custom-input' id='alccofine_batch_weight' disabled /></td>
                          </tr>
                          <tr>
                            <td colSpan='4'>Altraslag</td>
                            <td><input type='text' id='altraslag_brand' className='form-control form-control-sm custom-input text-input' disabled /></td>
                            <td><input type='text' id='altraslag_type' className='form-control form-control-sm custom-input text-input' disabled /></td>
                            <td colSpan='2'><input type='text' className='form-control form-control-sm custom-input' id='altraslag_mass' disabled /></td>
                            <td colSpan='2'><input type='text' className='form-control form-control-sm custom-input' id='altraslag_final_quantity' disabled /></td>
                            <td colSpan='2'><input type='text' className='form-control form-control-sm custom-input' id='altraslag_batch_weight' disabled /></td>
                          </tr>
                          <tr>
                            <td colSpan='4'>Water</td>
                            <td><input type='text' id='water_brand' className='form-control form-control-sm custom-input text-input' disabled /></td>
                            <td><input type='text' id='water_type' className='form-control form-control-sm custom-input text-input' disabled /></td>
                            <td colSpan='2'><input type='text' className='form-control form-control-sm custom-input' id='water_mass' disabled /></td>
                            <td colSpan='2'><input type='text' className='form-control form-control-sm custom-input' id='water_final_quantity' disabled /></td>
                            <td colSpan='2'><input type='text' className='form-control form-control-sm custom-input' id='water_batch_weight' disabled /></td>
                            <td colSpan='1' ><input type='text' className='form-control form-control-sm custom-input' id='water_waterCorrection' disabled /></td>
                          </tr>
                          <tr>
                            <td colSpan='4'>20mm</td>
                            <td><input type='text' id='twenty_brand' className='form-control form-control-sm custom-input text-input' disabled /></td>
                            <td><input type='text' id='twenty_type' className='form-control form-control-sm custom-input text-input' disabled /></td>
                            <td colSpan='2'><input type='text' className='form-control form-control-sm custom-input' id='twenty_mass' disabled /></td>
                            <td><input type='text' className='form-control form-control-sm custom-input' id='twenty_absorption_correction' disabled /></td>
                            <td><input type='text' className='form-control form-control-sm custom-input' id='twenty_moisture_correction' disabled /></td>
                            <td colSpan='2'><input type='text' className='form-control form-control-sm custom-input' id='twenty_final_quantity' disabled /></td>
                            <td colSpan='2'><input type='text' className='form-control form-control-sm custom-input' id='twenty_batch_weight' disabled /></td>
                            <td>  <input type='text' className='form-control form-control-sm custom-input' id='twenty_waterCorrection' disabled />  </td>
                          </tr>
                          <tr>
                            <td colSpan='4'>10mm</td>
                            <td><input type='text' id='ten_brand' className='form-control form-control-sm custom-input text-input' disabled /></td>
                            <td><input type='text' id='ten_type' className='form-control form-control-sm custom-input text-input' disabled /></td>
                            <td colSpan='2'><input type='text' className='form-control form-control-sm custom-input' id='ten_mass' disabled /></td>
                            <td><input type='text' className='form-control form-control-sm custom-input' id='ten_absorption_correction' disabled /></td>
                            <td><input type='text' className='form-control form-control-sm custom-input' id='ten_moisture_correction' disabled /></td>
                            <td colSpan='2'><input type='text' className='form-control form-control-sm custom-input' id='ten_final_quantity' disabled /></td>
                            <td colSpan='2'><input type='text' className='form-control form-control-sm custom-input' id='ten_batch_weight' disabled /></td>
                            <td><input type='text' className='form-control form-control-sm custom-input' id='ten_waterCorrection' disabled /></td>
                          </tr>
                          <tr>
                            <td colSpan='4'>M. Sand</td>
                            <td><input type='text' id='msand_brand' className='form-control form-control-sm custom-input text-input' disabled /></td>
                            <td><input type='text' id='msand_type' className='form-control form-control-sm custom-input text-input' disabled /></td>
                            <td colSpan='2'><input type='text' className='form-control form-control-sm custom-input' id='msand_mass' disabled /></td>
                            <td><input type='text' className='form-control form-control-sm custom-input' id='msand_absorption_correction' disabled /></td>
                            <td><input type='text' className='form-control form-control-sm custom-input' id='msand_moisture_correction' disabled /></td>
                            <td colSpan='2'><input type='text' className='form-control form-control-sm custom-input' id='msand_final_quantity' disabled /></td>
                            <td colSpan='2'><input type='text' className='form-control form-control-sm custom-input' id='msand_batch_weight' disabled /></td>
                            <td><input type='text' className='form-control form-control-sm custom-input' id='msand_waterCorrection' disabled /></td>
                          </tr>
                          <tr>
                            <td colSpan='4'>N. Sand</td>
                            <td><input type='text' id='nsand_brand' className='form-control form-control-sm custom-input text-input' disabled /></td>
                            <td><input type='text' id='nsand_type' className='form-control form-control-sm custom-input text-input' disabled /></td>
                            <td colSpan='2'><input type='text' className='form-control form-control-sm custom-input' id='nsand_mass' disabled /></td>
                            <td><input type='text' className='form-control form-control-sm custom-input' id='nsand_absorption_correction' disabled /></td>
                            <td><input type='text' className='form-control form-control-sm custom-input' id='nsand_moisture_correction' disabled /></td>
                            <td colSpan='2'><input type='text' className='form-control form-control-sm custom-input' disabled id='nsand_final_quantity' /></td>
                            <td colSpan='2'><input type='text' className='form-control form-control-sm custom-input' id='nsand_batch_weight' disabled /></td>
                            <td><input type='text' className='form-control form-control-sm custom-input' id='nsand_waterCorrection' disabled /></td>
                          </tr>
                          <tr>
                            <td colSpan='4'>Admixture 1</td>
                            <td><input type='text' id='admix1_brand' className='form-control form-control-sm custom-input text-input' disabled /></td>
                            <td><input type='text' id='admix1_type' className='form-control form-control-sm custom-input text-input' disabled /></td>
                            <td colSpan='2'><input type='text' className='form-control form-control-sm custom-input' id='admix1_mass' disabled /></td>
                            <td colSpan='2' rowSpan='4' />
                            <td colSpan='2'><input type='text' className='form-control form-control-sm custom-input' id='admix1_final_quantity' disabled /></td>
                            <td colSpan='2'><input type='text' className='form-control form-control-sm custom-input' id='admix1_batch_weight' disabled /></td>
                            <td rowSpan='4'>                            </td>
                          </tr>
                          <tr>
                            <td colSpan='4'>Admixture 2</td>
                            <td><input type='text' id='admix2_brand' className='form-control form-control-sm custom-input text-input' disabled /></td>
                            <td><input type='text' id='admix2_type' className='form-control form-control-sm custom-input text-input' disabled /></td>
                            <td colSpan='2'><input type='text' className='form-control form-control-sm custom-input' id='admix2_mass' disabled /></td>
                            <td colSpan='2'><input type='text' className='form-control form-control-sm custom-input' id='admix2_final_quantity' disabled /></td>
                            <td colSpan='2'><input type='text' className='form-control form-control-sm custom-input' id='admix2_batch_weight' disabled /></td>
                          </tr>
                          <tr>
                            <td colSpan='4'>Admixture 3</td>
                            <td><input type='text' id='admix3_brand' className='form-control form-control-sm custom-input text-input' disabled /></td>
                            <td><input type='text' id='admix3_type' className='form-control form-control-sm custom-input text-input' disabled /></td>
                            <td colSpan='2'><input type='text' className='form-control form-control-sm custom-input' id='admix3_mass' disabled /></td>
                            <td colSpan='2'><input type='text' className='form-control form-control-sm custom-input' id='admix3_final_quantity' disabled /></td>
                            <td colSpan='2'><input type='text' className='form-control form-control-sm custom-input' id='admix3_batch_weight' disabled /></td>
                          </tr>
                          <tr>
                            <td colSpan='8'>Concrete Density</td>
                            <td colSpan='2'><input type='text' className='form-control form-control-sm custom-input' id='concreteDensity_final_quantity' disabled /></td>
                            <td colSpan='2'><input type='text' className='form-control form-control-sm custom-input' id='concreteDensity_batch_weight' disabled /></td>
                          </tr>
                          <tr>
                            <td colSpan='15'>Fresh Concrete Properties</td>
                          </tr>
                          <tr>
                            <td colSpan='6'>Time (min.)</td>
                            <td>Initial</td>
                            <td>60 min</td>
                            <td>90 min</td>
                            <td>120 min</td>
                            <td>150 min</td>
                            <td>180 min</td>
                            <td rowSpan='4' colSpan='5'><textarea className='form-control' id='concrete_properties_observation' disabled /></td>
                            <td rowSpan='4' className='crap' />
                          </tr>
                          <tr>
                            <td colSpan='6'>Slump/ Flow (mm)</td>
                            <td><input type='text' id='slump_0' className='form-control form-control-sm custom-input fc-input' disabled /></td>
                            <td><input type='text' id='slump_60' className='form-control form-control-sm custom-input fc-input' disabled /></td>
                            <td><input type='text' id='slump_90' className='form-control form-control-sm custom-input fc-input' disabled /></td>
                            <td><input type='text' id='slump_120' className='form-control form-control-sm custom-input fc-input' disabled /></td>
                            <td><input type='text' id='slump_150' className='form-control form-control-sm custom-input fc-input' disabled /></td>
                            <td><input type='text' id='slump_180' className='form-control form-control-sm custom-input fc-input' disabled /></td>
                          </tr>
                          <tr>
                            <td colSpan='6'>Concrete Temperature</td>
                            <td><input type='text' id='concreteTemperature_0' className='form-control form-control-sm custom-input fc-input' disabled /></td>
                            <td><input type='text' id='concreteTemperature_60' className='form-control form-control-sm custom-input fc-input' disabled /></td>
                            <td><input type='text' id='concreteTemperature_90' className='form-control form-control-sm custom-input fc-input' disabled /></td>
                            <td><input type='text' id='concreteTemperature_120' className='form-control form-control-sm custom-input fc-input' disabled /></td>
                            <td><input type='text' id='concreteTemperature_150' className='form-control form-control-sm custom-input fc-input' disabled /></td>
                            <td><input type='text' id='concreteTemperature_180' className='form-control form-control-sm custom-input fc-input' disabled /></td>
                          </tr>
                          <tr>
                            <td colSpan='6'>Ambient Temperature</td>
                            <td><input type='text' id='ambientTemperature_0' className='form-control form-control-sm custom-input fc-input' disabled /></td>
                            <td><input type='text' id='ambientTemperature_60' className='form-control form-control-sm custom-input fc-input' disabled /></td>
                            <td><input type='text' id='ambientTemperature_90' className='form-control form-control-sm custom-input fc-input' disabled /></td>
                            <td><input type='text' id='ambientTemperature_120' className='form-control form-control-sm custom-input fc-input' disabled /></td>
                            <td><input type='text' id='ambientTemperature_150' className='form-control form-control-sm custom-input fc-input' disabled /></td>
                            <td><input type='text' id='ambientTemperature_180' className='form-control form-control-sm custom-input fc-input' disabled /></td>
                          </tr>
                          <tr>
                            <td colSpan='15'>Compressive Strength</td>
                          </tr>
                          <tr>
                            <td colSpan='3'>Cube No.</td>
                            <td>1</td>
                            <td>2</td>
                            <td>3</td>
                            <td>4</td>
                            <td>5</td>
                            <td>6</td>
                            <td>7</td>
                            <td>8</td>
                            <td>9</td>
                            <td>10</td>
                            <td>11</td>
                            <td>12</td>
                          </tr>
                          <tr>
                            <td colSpan='3'>Age</td>
                            {/* disabled = { supervisor } */}
                            <td><input type='text' id='age_1' onChange={e => this.change(e)} className='form-control form-control-sm custom-input' disabled /></td>
                            <td><input type='text' id='age_2' onChange={e => this.change(e)} className='form-control form-control-sm custom-input' disabled /></td>
                            <td><input type='text' id='age_3' onChange={e => this.change(e)} className='form-control form-control-sm custom-input' disabled /></td>
                            <td><input type='text' id='age_4' onChange={e => this.change(e)} className='form-control form-control-sm custom-input' disabled /></td>
                            <td><input type='text' id='age_5' onChange={e => this.change(e)} className='form-control form-control-sm custom-input' disabled /></td>
                            <td><input type='text' id='age_6' onChange={e => this.change(e)} className='form-control form-control-sm custom-input' disabled /></td>
                            <td><input type='text' id='age_7' onChange={e => this.change(e)} className='form-control form-control-sm custom-input' disabled /></td>
                            <td><input type='text' id='age_8' onChange={e => this.change(e)} className='form-control form-control-sm custom-input' disabled /></td>
                            <td><input type='text' id='age_9' onChange={e => this.change(e)} className='form-control form-control-sm custom-input' disabled /></td>
                            <td><input type='text' id='age_10' onChange={e => this.change(e)} className='form-control form-control-sm custom-input' disabled /></td>
                            <td><input type='text' id='age_11' onChange={e => this.change(e)} className='form-control form-control-sm custom-input' disabled /></td>
                            <td><input type='text' id='age_12' onChange={e => this.change(e)} className='form-control form-control-sm custom-input' disabled /></td>
                          </tr>
                          <tr>
                            <td colSpan='3'>Cube Weight</td>
                            <td><input type='text' id='cubeWeight_1' onChange={e => this.change(e)} className='form-control form-control-sm custom-input' disabled /></td>
                            <td><input type='text' id='cubeWeight_2' onChange={e => this.change(e)} className='form-control form-control-sm custom-input' disabled /></td>
                            <td><input type='text' id='cubeWeight_3' onChange={e => this.change(e)} className='form-control form-control-sm custom-input' disabled /></td>
                            <td><input type='text' id='cubeWeight_4' onChange={e => this.change(e)} className='form-control form-control-sm custom-input' disabled /></td>
                            <td><input type='text' id='cubeWeight_5' onChange={e => this.change(e)} className='form-control form-control-sm custom-input' disabled /></td>
                            <td><input type='text' id='cubeWeight_6' onChange={e => this.change(e)} className='form-control form-control-sm custom-input' disabled /></td>
                            <td><input type='text' id='cubeWeight_7' onChange={e => this.change(e)} className='form-control form-control-sm custom-input' disabled /></td>
                            <td><input type='text' id='cubeWeight_8' onChange={e => this.change(e)} className='form-control form-control-sm custom-input' disabled /></td>
                            <td><input type='text' id='cubeWeight_9' onChange={e => this.change(e)} className='form-control form-control-sm custom-input' disabled /></td>
                            <td><input type='text' id='cubeWeight_10' onChange={e => this.change(e)} className='form-control form-control-sm custom-input' disabled /></td>
                            <td><input type='text' id='cubeWeight_11' onChange={e => this.change(e)} className='form-control form-control-sm custom-input' disabled /></td>
                            <td><input type='text' id='cubeWeight_12' onChange={e => this.change(e)} className='form-control form-control-sm custom-input' disabled /></td>
                          </tr>
                          <tr>
                            <td colSpan='3'>Load (kN)</td>
                            <td><input type='text' id='load_1' onChange={e => this.change(e)} className='form-control form-control-sm custom-input' disabled /></td>
                            <td><input type='text' id='load_2' onChange={e => this.change(e)} className='form-control form-control-sm custom-input' disabled /></td>
                            <td><input type='text' id='load_3' onChange={e => this.change(e)} className='form-control form-control-sm custom-input' disabled /></td>
                            <td><input type='text' id='load_4' onChange={e => this.change(e)} className='form-control form-control-sm custom-input' disabled /></td>
                            <td><input type='text' id='load_5' onChange={e => this.change(e)} className='form-control form-control-sm custom-input' disabled /></td>
                            <td><input type='text' id='load_6' onChange={e => this.change(e)} className='form-control form-control-sm custom-input' disabled /></td>
                            <td><input type='text' id='load_7' onChange={e => this.change(e)} className='form-control form-control-sm custom-input' disabled /></td>
                            <td><input type='text' id='load_8' onChange={e => this.change(e)} className='form-control form-control-sm custom-input' disabled /></td>
                            <td><input type='text' id='load_9' onChange={e => this.change(e)} className='form-control form-control-sm custom-input' disabled /></td>
                            <td><input type='text' id='load_10' onChange={e => this.change(e)} className='form-control form-control-sm custom-input' disabled /></td>
                            <td><input type='text' id='load_11' onChange={e => this.change(e)} className='form-control form-control-sm custom-input' disabled /></td>
                            <td><input type='text' id='load_12' onChange={e => this.change(e)} className='form-control form-control-sm custom-input' disabled /></td>
                          </tr>
                          <tr>
                            <td colSpan='3'>Comp. Str.</td>
                            <td><input type='text' id='compStr_1' onChange={e => this.change(e)} className='form-control form-control-sm custom-input' disabled /></td>
                            <td><input type='text' id='compStr_2' onChange={e => this.change(e)} className='form-control form-control-sm custom-input' disabled /></td>
                            <td><input type='text' id='compStr_3' onChange={e => this.change(e)} className='form-control form-control-sm custom-input' disabled /></td>
                            <td><input type='text' id='compStr_4' onChange={e => this.change(e)} className='form-control form-control-sm custom-input' disabled /></td>
                            <td><input type='text' id='compStr_5' onChange={e => this.change(e)} className='form-control form-control-sm custom-input' disabled /></td>
                            <td><input type='text' id='compStr_6' onChange={e => this.change(e)} className='form-control form-control-sm custom-input' disabled /></td>
                            <td><input type='text' id='compStr_7' onChange={e => this.change(e)} className='form-control form-control-sm custom-input' disabled /></td>
                            <td><input type='text' id='compStr_8' onChange={e => this.change(e)} className='form-control form-control-sm custom-input' disabled /></td>
                            <td><input type='text' id='compStr_9' onChange={e => this.change(e)} className='form-control form-control-sm custom-input' disabled /></td>
                            <td><input type='text' id='compStr_10' onChange={e => this.change(e)} className='form-control form-control-sm custom-input' disabled /></td>
                            <td><input type='text' id='compStr_11' onChange={e => this.change(e)} className='form-control form-control-sm custom-input' disabled /></td>
                            <td><input type='text' id='compStr_12' onChange={e => this.change(e)} className='form-control form-control-sm custom-input' disabled /></td>
                          </tr>
                          <tr>
                            <td colSpan='3'>Average</td>
                            <td colSpan='3'><input type='text' id='average_1' onChange={e => this.change(e)} className='form-control form-control-sm custom-input' disabled /></td>
                            <td colSpan='3'><input type='text' id='average_2' onChange={e => this.change(e)} className='form-control form-control-sm custom-input' disabled /></td>
                            <td colSpan='3'><input type='text' id='average_3' onChange={e => this.change(e)} className='form-control form-control-sm custom-input' disabled /></td>
                            <td colSpan='3'><input type='text' id='average_4' onChange={e => this.change(e)} className='form-control form-control-sm custom-input' disabled /></td>
                          </tr>
                        </tbody>
                      </table>
                    </form>
                    <div className='d-flex my-3'>
                      {/* {
                        this.state.supervisor === false &&
                        <button className='btn btn-info ml-auto mr-4' onClick={this.onUpdate}>Update</button>
                      } */}
                      {
                        this.state.supervisor === true &&
                        <button className='btn btn-success ml-auto mr-4' id='accept' onClick={e => this.qicAction(e)}>Accept</button>
                      }
                      {
                        this.state.supervisor === true &&
                        <button className='btn btn-danger mr-4' id='reject' onClick={e => this.qicAction(e)}>Reject</button>
                      }
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment >
    )
  }
}

export default DetailViewRf24
