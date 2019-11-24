
import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'
import '../../Test/Test.css'
import './RF24.css'
import { API_URL } from '../../../services/url'
import axios from "axios"

const tokenvalue = localStorage.getItem("token")

export class RF24 extends Component {

  constructor(props) {
    super(props)

    this.state = {
      batchweight: '', cementMass: '', flyashMass: '', ggbfsMass: '', microsilicaMass: '', alccofineMass: '', altraslagMass: '',
      waterMass: '', twentyMass: '', tenMass: '', msandMass: '', nsandMass: '', admix1Mass: '', admix2Mass: '',
      admix3Mass: '', twentyWC: '', twentyAbsorption: '', twentyMoisture: '', tenAbsorption: '', tenMoisture: '', msandAbsorption: '',
      msandMoisture: '', nsandAbsorption: '', nsandMoisture: '', tenWC: '', msandWC: '', nsandWC: '', waterWC: '',
      waterFQ: '', twentyFQ: '', tenFQ: '', msandFQ: '',
      nsandFQ: '', concretedensityFQ: '', cementBW: '', flyashBW: '',
      ggbfsBW: '', microsilicaBW: '', alccofineBW: '', altraslagBW: '', waterBW: '', twentyBW: '', tenBW: '', msandBW: '',
      nsandBW: '', admixture1BW: '', admixture2BW: '', admixture3BW: '', concretedensityBW: '',

      cement_brand: '', cement_type: '', flyash_brand: '', flyash_type: '', ggbfs_brand: '', ggbfs_type: '', microsilica_brand: '', microsilica_type: '',
      alccofine_brand: '', alccofine_type: '', altraslag_brand: '', altraslag_type: '', water_brand: '', water_type: '', twenty_brand: '', twenty_type: '',
      ten_brand: '', ten_type: '', msand_brand: '', msand_type: '', nsand_brand: '', nsand_type: '', admix1_brand: '', admix1_type: '',
      admix2_brand: '', admix2_type: '', admix3_brand: '', admix3_type: '',

      slump_0: '', slump_60: '', slump_90: '', slump_120: '', slump_150: '', slump_180: '', concreteTemperature_0: '', concreteTemperature_60: '',
      concreteTemperature_90: '', concreteTemperature_120: '', concreteTemperature_150: '', concreteTemperature_180: '', ambient_0: '',
      ambient_60: '', ambient_90: '', ambient_120: '', ambient_150: '', ambient_180: '',
      age_1: '', age_2: '', age_3: '', age_4: '', age_5: '', age_6: '', age_7: '', age_8: '', age_9: '', age_10: '', age_11: '', age_12: '',
      cubeWeight_1: '', cubeWeight_2: '', cubeWeight_3: '', cubeWeight_4: '', cubeWeight_5: '', cubeWeight_6: '', cubeWeight_7: '', cubeWeight_8: '',
      cubeWeight_9: '', cubeWeight_10: '', cubeWeight_11: '', cubeWeight_12: '', load_1: '', load_2: '', load_3: '', load_4: '', load_5: '', load_6: '', load_7: '',
      load_8: '', load_9: '', load_10: '', load_11: '', load_12: '', compStr_1: '', compStr_2: '', compStr_3: '', compStr_4: '', compStr_5: '', compStr_6: '', compStr_7: '',
      compStr_8: '', compStr_9: '', compStr_10: '', compStr_11: '', compStr_12: '', average_1: '', average_2: '', average_3: '', average_4: '', observation: '',

      project_name: '', instant_water_added: '', date: '', conducted_by: '', admix_batch_no: '', concrete_grade: '', ambient_temperature: '', redirect: false
    }

    this.calculateFQValues.bind(this)
    this.calculateWCValues.bind(this)
    this.calculateBWValues.bind(this)
    this.onSubmit.bind(this)
  }


  async calculateWCValues() {
    let { twentyMass, tenMass, msandMass, nsandMass, twentyAbsorption, twentyMoisture, tenAbsorption, tenMoisture, msandAbsorption,
      msandMoisture, nsandAbsorption, nsandMoisture } = this.state

    const float = parseFloat;

    const twentyWC = (float(twentyMass) * (float(twentyAbsorption) - float(twentyMoisture)) / 100).toFixed(2)
    const tenWC = (float(tenMass) * (float(tenAbsorption) - float(tenMoisture)) / 100).toFixed(2)
    const msandWC = (float(msandMass) * (float(msandAbsorption) - float(msandMoisture)) / 100).toFixed(2)
    const nsandWC = (float(nsandMass) * (float(nsandAbsorption) - float(nsandMoisture)) / 100).toFixed(2)
    const waterWC = (float(twentyWC) + float(tenWC) + float(nsandWC) + float(msandWC))

    await this.setState({ twentyWC, tenWC, msandWC, nsandWC, waterWC })
  }

  async calculateFQValues() {
    let { cementMass, flyashMass, ggbfsMass, microsilicaMass, alccofineMass, altraslagMass,
      waterMass, twentyMass, tenMass, msandMass, nsandMass, admix1Mass, admix2Mass,
      admix3Mass, twentyWC, tenWC, msandWC, nsandWC, waterWC } = this.state

    const float = parseFloat;

    const twentyFQ = (float(twentyMass) + float(twentyWC)).toFixed(2)
    const tenFQ = (float(tenMass) + float(tenWC)).toFixed(2)
    const msandFQ = (float(msandMass) + float(msandWC)).toFixed(2)
    const nsandFQ = (float(nsandMass) + float(nsandWC)).toFixed(2)
    const waterFQ = (float(waterMass) + float(waterWC)).toFixed(2)
    const concretedensityFQ = (float(cementMass) + float(flyashMass) + float(ggbfsMass) + float(microsilicaMass) + float(alccofineMass) + float(altraslagMass) + float(waterFQ) + float(twentyFQ) + float(tenFQ) + float(msandFQ) + float(nsandFQ) + float(admix1Mass) + float(admix2Mass) + float(admix3Mass)).toFixed(2)

    await this.setState({ twentyFQ, tenFQ, msandFQ, nsandFQ, waterFQ, concretedensityFQ })
  }

  async calculateBWValues() {
    let { batchweight, cementMass, flyashMass, ggbfsMass, microsilicaMass, alccofineMass, altraslagMass,
      admix1Mass, admix2Mass, admix3Mass, waterFQ, twentyFQ, tenFQ, msandFQ, nsandFQ, concretedensityFQ } = this.state

    const float = parseFloat;

    if (batchweight === '') {
      window.alert('Please enter the batch weight.')
    } else {
      const cementBW = (float(cementMass) * float(batchweight) / float(concretedensityFQ)).toFixed(2)
      const flyashBW = (float(flyashMass) * float(batchweight) / float(concretedensityFQ)).toFixed(2)
      const ggbfsBW = (float(ggbfsMass) * float(batchweight) / float(concretedensityFQ)).toFixed(2)
      const microsilicaBW = (float(microsilicaMass) * float(batchweight) / float(concretedensityFQ)).toFixed(2)
      const alccofineBW = (float(alccofineMass) * float(batchweight) / float(concretedensityFQ)).toFixed(2)
      const altraslagBW = (float(altraslagMass) * float(batchweight) / float(concretedensityFQ)).toFixed(2)
      const waterBW = (float(waterFQ) * float(batchweight) / float(concretedensityFQ)).toFixed(2)
      const twentyBW = (float(twentyFQ) * float(batchweight) / float(concretedensityFQ)).toFixed(2)
      const tenBW = (float(tenFQ) * float(batchweight) / float(concretedensityFQ)).toFixed(2)
      const msandBW = (float(msandFQ) * float(batchweight) / float(concretedensityFQ)).toFixed(2)
      const nsandBW = (float(nsandFQ) * float(batchweight) / float(concretedensityFQ)).toFixed(2)
      const admixture1BW = (float(admix1Mass) * float(batchweight) / float(concretedensityFQ)).toFixed(2)
      const admixture2BW = (float(admix2Mass) * float(batchweight) / float(concretedensityFQ)).toFixed(2)
      const admixture3BW = (float(admix3Mass) * float(batchweight) / float(concretedensityFQ)).toFixed(2)
      const concretedensityBW = (float(cementBW) + float(flyashBW) + float(ggbfsBW) + float(microsilicaBW) + float(alccofineBW) + float(altraslagBW) + float(twentyBW) + float(waterBW) + float(tenBW) + float(msandBW) + float(nsandBW) + float(admixture1BW) + float(admixture2BW) + float(admixture3BW)).toFixed(2)

      await this.setState({
        cementBW, flyashBW, ggbfsBW, microsilicaBW, alccofineBW, altraslagBW, waterBW, twentyBW, tenBW, msandBW,
        nsandBW, admixture1BW, admixture2BW, admixture3BW, concretedensityBW
      })
    }
  }

  change = event => {
    event.preventDefault()
    this.setState({ [event.target.id]: event.target.value })
  }

  onCPchange = event => {
    let slump = [0, 0, 0, 0, 0, 0]; let concrete_temperature = [0, 0, 0, 0, 0, 0]; let ambient = [0, 0, 0, 0, 0, 0]
    event.preventDefault()
    switch (event.target.id) {
      case 'slump_0': slump[0] = event.target.value; break
      case 'slump_60': slump[1] = event.target.value; break
      case 'slump_90': slump[2] = event.target.value; break
      case 'slump_120': slump[3] = event.target.value; break
      case 'slump_150': slump[4] = event.target.value; break
      case 'slump_180': slump[5] = event.target.value; break
      case 'concreteTemperature_0': concrete_temperature[0] = event.target.value; break
      case 'concreteTemperature_60': concrete_temperature[1] = event.target.value; break
      case 'concreteTemperature_90': concrete_temperature[2] = event.target.value; break
      case 'concreteTemperature_120': concrete_temperature[3] = event.target.value; break
      case 'concreteTemperature_150': concrete_temperature[4] = event.target.value; break
      case 'concreteTemperature_180': concrete_temperature[5] = event.target.value; break
      case 'ambient_0': ambient[0] = event.target.value; break
      case 'ambient_60': ambient[1] = event.target.value; break
      case 'ambient_90': ambient[2] = event.target.value; break
      case 'ambient_120': ambient[3] = event.target.value; break
      case 'ambient_150': ambient[4] = event.target.value; break
      case 'ambient_180': ambient[5] = event.target.value; break
    }

    this.setState({ slump, concrete_temperature, ambient })
  }

  onCSchange = event => {
    let age = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]; let cube_weight = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]; let load = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    let comp_str = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]; let average = [0, 0, 0, 0]
    event.preventDefault()
    switch (event.target.id) {
      case 'age_1': age[0] = event.target.value; break
      case 'age_2': age[1] = event.target.value; break
      case 'age_3': age[2] = event.target.value; break
      case 'age_4': age[3] = event.target.value; break
      case 'age_5': age[4] = event.target.value; break
      case 'age_6': age[5] = event.target.value; break
      case 'age_7': age[6] = event.target.value; break
      case 'age_8': age[7] = event.target.value; break
      case 'age_9': age[8] = event.target.value; break
      case 'age_10': age[9] = event.target.value; break
      case 'age_11': age[10] = event.target.value; break
      case 'age_12': age[11] = event.target.value; break
      case 'cubeWeight_1': cube_weight[0] = event.target.value; break
      case 'cubeWeight_2': cube_weight[1] = event.target.value; break
      case 'cubeWeight_3': cube_weight[2] = event.target.value; break
      case 'cubeWeight_4': cube_weight[3] = event.target.value; break
      case 'cubeWeight_5': cube_weight[4] = event.target.value; break
      case 'cubeWeight_6': cube_weight[5] = event.target.value; break
      case 'cubeWeight_7': cube_weight[6] = event.target.value; break
      case 'cubeWeight_8': cube_weight[7] = event.target.value; break
      case 'cubeWeight_9': cube_weight[8] = event.target.value; break
      case 'cubeWeight_10': cube_weight[9] = event.target.value; break
      case 'cubeWeight_11': cube_weight[10] = event.target.value; break
      case 'cubeWeight_12': cube_weight[11] = event.target.value; break
      case 'load_1': load[0] = event.target.value; break
      case 'load_2': load[1] = event.target.value; break
      case 'load_3': load[2] = event.target.value; break
      case 'load_4': load[3] = event.target.value; break
      case 'load_5': load[4] = event.target.value; break
      case 'load_6': load[5] = event.target.value; break
      case 'load_7': load[6] = event.target.value; break
      case 'load_8': load[7] = event.target.value; break
      case 'load_9': load[8] = event.target.value; break
      case 'load_10': load[9] = event.target.value; break
      case 'load_11': load[10] = event.target.value; break
      case 'load_12': load[11] = event.target.value; break
      case 'compStr_1': comp_str[0] = event.target.value; break
      case 'compStr_2': comp_str[1] = event.target.value; break
      case 'compStr_3': comp_str[2] = event.target.value; break
      case 'compStr_4': comp_str[3] = event.target.value; break
      case 'compStr_5': comp_str[4] = event.target.value; break
      case 'compStr_6': comp_str[5] = event.target.value; break
      case 'compStr_7': comp_str[6] = event.target.value; break
      case 'compStr_8': comp_str[7] = event.target.value; break
      case 'compStr_9': comp_str[8] = event.target.value; break
      case 'compStr_10': comp_str[9] = event.target.value; break
      case 'compStr_11': comp_str[10] = event.target.value; break
      case 'compStr_12': comp_str[11] = event.target.value; break
      case 'average_1': average[0] = event.target.value; break
      case 'average_2': average[1] = event.target.value; break
      case 'average_3': average[2] = event.target.value; break
      case 'average_4': average[3] = event.target.value; break
    }
    this.setState({ age, cube_weight, load, comp_str, average })

  }

  async onSubmit(event) {
    const { batchweight, cementMass, flyashMass, ggbfsMass, microsilicaMass, alccofineMass, altraslagMass, waterMass, twentyMass,
      tenMass, msandMass, nsandMass, admix1Mass, admix2Mass, admix3Mass, twentyWC, twentyAbsorption, twentyMoisture,
      tenAbsorption, tenMoisture, msandAbsorption, msandMoisture, nsandAbsorption, nsandMoisture, tenWC, msandWC, nsandWC, waterWC,
      waterFQ, twentyFQ, tenFQ, msandFQ, nsandFQ, concretedensityFQ, cementBW, flyashBW, ggbfsBW, microsilicaBW, alccofineBW,
      altraslagBW, waterBW, twentyBW, tenBW, msandBW, nsandBW, admixture1BW, admixture2BW, admixture3BW, concretedensityBW,

      cement_brand, cement_type, flyash_brand, flyash_type, ggbfs_brand, ggbfs_type, microsilica_brand, microsilica_type,
      alccofine_brand, alccofine_type, altraslag_brand, altraslag_type, water_brand, water_type, twenty_brand, twenty_type,
      ten_brand, ten_type, msand_brand, msand_type, nsand_brand, nsand_type, admix1_brand, admix1_type,
      admix2_brand, admix2_type, admix3_brand, admix3_type, observation,
      project_name, instant_water_added, date, conducted_by, admix_batch_no, concrete_grade, ambient_temperature,

      slump_0, slump_60, slump_90, slump_120, slump_150, slump_180, concreteTemperature_0, concreteTemperature_60,
      concreteTemperature_90, concreteTemperature_120, concreteTemperature_150, concreteTemperature_180, ambient_0,
      ambient_60, ambient_90, ambient_120, ambient_150, ambient_180,
      age_1, age_2, age_3, age_4, age_5, age_6, age_7, age_8, age_9, age_10, age_11, age_12,
      cubeWeight_1, cubeWeight_2, cubeWeight_3, cubeWeight_4, cubeWeight_5, cubeWeight_6, cubeWeight_7, cubeWeight_8,
      cubeWeight_9, cubeWeight_10, cubeWeight_11, cubeWeight_12, load_1, load_2, load_3, load_4, load_5, load_6, load_7,
      load_8, load_9, load_10, load_11, load_12, compStr_1, compStr_2, compStr_3, compStr_4, compStr_5, compStr_6, compStr_7,
      compStr_8, compStr_9, compStr_10, compStr_11, compStr_12, average_1, average_2, average_3, average_4 } = this.state

    event.preventDefault();
    const data = {
      'type': 'RF-24',
      'project_name': project_name,
      'date': date,
      'instant_water_added': instant_water_added,
      'trial_conducted_by': conducted_by,
      'admixture_batch_no': admix_batch_no,
      'batch_weight': batchweight,
      'concrete_grade': concrete_grade,
      'ambient_temperature': ambient_temperature,
      'cement_type': cement_type,
      'cement_brand': cement_brand,
      'cement_mass': cementMass,
      'cement_final_quantity': cementMass,
      'cement_batch_weight': cementBW,
      'flyash_type': flyash_type,
      'flyash_brand': flyash_brand,
      'flyash_mass': flyashMass,
      'flyash_final_quantity': flyashMass,
      'flyash_batch_weight': flyashBW,
      'ggbfs_type': ggbfs_type,
      'ggbfs_brand': ggbfs_brand,
      'ggbfs_mass': ggbfsMass,
      'ggbfs_final_quantity': ggbfsMass,
      'ggbfs_batch_weight': ggbfsBW,
      'microsilica_type': microsilica_type,
      'microsilica_brand': microsilica_brand,
      'microsilica_mass': microsilicaMass,
      'microsilica_final_quantity': microsilicaMass,
      'microsilica_batch_weight': microsilicaBW,
      'alccofine_type': alccofine_type,
      'alccofine_brand': alccofine_brand,
      'alccofine_mass': alccofineMass,
      'alccofine_final_quantity': alccofineMass,
      'alccofine_batch_weight': alccofineBW,
      'altraslag_type': altraslag_type,
      'altraslag_brand': altraslag_brand,
      'altraslag_mass': altraslagMass,
      'altraslag_final_quantity': altraslagMass,
      'altraslag_batch_weight': altraslagBW,
      'water_type': water_type,
      'water_brand': water_brand,
      'water_mass': waterMass,
      'water_final_quantity': waterFQ,
      'water_batch_weight': waterBW,
      'water_waterCorrection': waterWC.toString(),
      'twenty_type': twenty_type,
      'twenty_brand': twenty_brand,
      'twenty_mass': twentyMass,
      'twenty_absorption_correction': twentyAbsorption,
      'twenty_moisture_correction': twentyMoisture,
      'twenty_final_quantity': twentyFQ,
      'twenty_batch_weight': twentyBW,
      'twenty_waterCorrection': twentyWC,
      'ten_type': ten_type,
      'ten_brand': ten_brand,
      'ten_mass': tenMass,
      'ten_absorption_correction': tenAbsorption,
      'ten_moisture_correction': tenMoisture,
      'ten_final_quantity': tenFQ,
      'ten_batch_weight': tenBW,
      'ten_waterCorrection': tenWC,
      'msand_type': msand_type,
      'msand_brand': msand_brand,
      'msand_mass': msandMass,
      'msand_absorption_correction': msandAbsorption,
      'msand_moisture_correction': msandMoisture,
      'msand_final_quantity': msandFQ,
      'msand_batch_weight': msandBW,
      'msand_waterCorrection': msandWC,
      'nsand_type': nsand_type,
      'nsand_brand': nsand_brand,
      'nsand_mass': nsandMass,
      'nsand_absorption_correction': nsandAbsorption,
      'nsand_moisture_correction': nsandMoisture,
      'nsand_final_quantity': nsandFQ,
      'nsand_batch_weight': nsandBW,
      'nsand_waterCorrection': nsandWC,
      'admix1_type': admix1_type,
      'admix1_brand': admix1_brand,
      'admix1_mass': admix1Mass,
      'admix1_final_quantity': admix1Mass,
      'admix1_batch_weight': admixture1BW,
      'admix2_type': admix2_type,
      'admix2_brand': admix2_brand,
      'admix2_mass': admix2Mass,
      'admix2_final_quantity': admix2Mass,
      'admix2_batch_weight': admixture2BW,
      'admix3_type': admix3_type,
      'admix3_brand': admix3_brand,
      'admix3_mass': admix3Mass,
      'admix3_final_quantity': admix3Mass,
      'admix3_batch_weight': admixture3BW,
      'concreteDensity_final_quantity': concretedensityFQ,
      'concreteDensity_batch_weight': concretedensityBW,
      'concrete_properties_observation': observation,
      'slump_0': slump_0,
      'slump_60': slump_60,
      'slump_90': slump_90,
      'slump_120': slump_120,
      'slump_150': slump_150,
      'slump_180': slump_180,
      'concreteTemperature_0': concreteTemperature_0,
      'concreteTemperature_60': concreteTemperature_60,
      'concreteTemperature_90': concreteTemperature_90,
      'concreteTemperature_120': concreteTemperature_120,
      'concreteTemperature_150': concreteTemperature_150,
      'concreteTemperature_180': concreteTemperature_180,
      'ambientTemperature_0': ambient_0,
      'ambientTemperature_60': ambient_60,
      'ambientTemperature_90': ambient_90,
      'ambientTemperature_120': ambient_120,
      'ambientTemperature_150': ambient_150,
      'ambientTemperature_180': ambient_180,
      'age_1': age_1, 'age_2': age_2, 'age_3': age_1, 'age_4': age_4, 'age_5': age_5, 'age_6': age_6, 'age_7': age_7, 'age_8': age_8,
      'age_9': age_9, 'age_10': age_10, 'age_11': age_11, 'age_12': age_12,
      'cubeWeight_1': cubeWeight_1, 'cubeWeight_2': cubeWeight_2, 'cubeWeight_3': cubeWeight_1, 'cubeWeight_4': cubeWeight_4,
      'cubeWeight_5': cubeWeight_5, 'cubeWeight_6': cubeWeight_6, 'cubeWeight_7': cubeWeight_7, 'cubeWeight_8': cubeWeight_8,
      'cubeWeight_9': cubeWeight_9, 'cubeWeight_10': cubeWeight_10, 'cubeWeight_11': cubeWeight_11, 'cubeWeight_12': cubeWeight_12,
      'load_1': load_1, 'load_2': load_2, 'load_3': load_1, 'load_4': load_4, 'load_5': load_5, 'load_6': load_6, 'load_7': load_7, 'load_8': load_8,
      'load_9': load_9, 'load_10': load_10, 'load_11': load_11, 'load_12': load_12,
      'compStr_1': compStr_1, 'compStr_2': compStr_2, 'compStr_3': compStr_1, 'compStr_4': compStr_4, 'compStr_5': compStr_5, 'compStr_6': compStr_6, 'compStr_7': compStr_7, 'compStr_8': compStr_8,
      'compStr_9': compStr_9, 'compStr_10': compStr_10, 'compStr_11': compStr_11, 'compStr_12': compStr_12,
      'average_1': average_1, 'average_2': average_2, 'average_3': average_3, 'average_4': average_4
    }

    try {
      const response = await axios.post(
        `${API_URL}rf_form/submit`,
        data,
        (axios.defaults.headers.common["x-access-token"] = tokenvalue)
      );

      if (response.status === 200 && response.data === 'success') {
        alert('Data submitted successfully !')
        this.setState({ redirect: true })
      } else {
        alert('Data submittion failed !')
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
                      RF - 24
                    </li>
                  </ol>
                </nav>
              </div>
            </div>

          </div>

          {/* Form content begin */}

          <div className='product-form-upper'>
            <div className='container'>
              {/* <div className="below-custom-form"> */}

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
                      <td colSpan='10'><input type='text' id='project_name' className='form-control form-control-sm custom-input' onChange={e => this.change(e)} /></td>
                    </tr>
                    <tr>
                      <td colSpan='2'>Date: </td>
                      <td colSpan='3'><input type='date' id='date' className='form-control form-control-sm custom-input' onChange={e => this.change(e)} /></td>
                      <td colSpan='3'>Water added at instant: </td>
                      <td colSpan='2'><input type='text' id='instant_water_added' className='form-control form-control-sm custom-input' onChange={e => this.change(e)} /></td>
                      <td colSpan='2' rowSpan='2'>Trial conducted by</td>
                      <td colSpan='3' rowSpan='2'><input type='text' id='conducted_by' className='form-control form-control-sm custom-input' onChange={e => this.change(e)} /></td>
                    </tr>
                    <tr>
                      <td colSpan='4'>Admixture batch no: </td>
                      <td colSpan='4'><input type='text' id='admix_batch_no' className='form-control form-control-sm custom-input' onChange={e => this.change(e)} /></td>
                      <td colSpan='2' />
                    </tr>
                    <tr>
                      <td colSpan='2'>Batch weight: </td>
                      <td colSpan='3'><input type='number' className='form-control form-control-sm custom-input' id='batchweight' onChange={e => this.change(e)} /></td>
                      <td colSpan='3'>Concreate Grade: </td>
                      <td colSpan='2'><input type='text' id='concrete_grade' className='form-control form-control-sm custom-input' onChange={e => this.change(e)} /></td>
                      <td colSpan='3'>Ambient temperature: </td>
                      <td colSpan='2'><input type='text' id='ambient_temperature' className='form-control form-control-sm custom-input' onChange={e => this.change(e)} /></td>
                    </tr>
                    <tr>
                      <td colSpan='4' rowSpan='3'>Material Details</td>
                      <td rowSpan='3'>Type</td>
                      <td rowSpan='3'>Source/ Brand</td>
                      <td colSpan='2' rowSpan='3'>Mass kg/m3</td>
                      <td>Absorption</td>
                      <td>Moisture</td>
                      <td colSpan='2' rowSpan='3'>Final Quantity kg/m3</td>
                      <td colSpan='2' rowSpan='3'>Batch weight for {this.state.batchweight} kg</td>
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
                      <td ><input type='text' id='cement_brand' className='form-control form-control-sm custom-input text-input' onChange={e => this.change(e)} /></td>
                      <td><input type='text' id='cement_type' className='form-control form-control-sm custom-input text-input' onChange={e => this.change(e)} /></td>
                      <td colSpan='2'><input type='number' className='form-control form-control-sm custom-input' id='cementMass' onChange={e => this.change(e)} /></td>
                      <td colSpan='2' rowSpan='7' />
                      <td colSpan='2'><input type='text' className='form-control form-control-sm custom-input' value={this.state.cementMass} disabled /></td>
                      <td colSpan='2'><input type='text' className='form-control form-control-sm custom-input' id='cementBW' value={this.state.cementBW} disabled /></td>
                      <td colSpan='1' rowSpan='6' />
                    </tr>
                    <tr>
                      <td colSpan='4'>Flyash</td>
                      <td><input type='text' id='flyash_brand' className='form-control form-control-sm custom-input text-input' onChange={e => this.change(e)} /></td>
                      <td><input type='text' id='flyash_type' className='form-control form-control-sm custom-input text-input' onChange={e => this.change(e)} /></td>
                      <td colSpan='2'><input type='number' className='form-control form-control-sm custom-input' id='flyashMass' onChange={e => this.change(e)} /></td>
                      <td colSpan='2'><input type='text' className='form-control form-control-sm custom-input' disabled value={this.state.flyashMass} /></td>
                      <td colSpan='2'><input type='text' className='form-control form-control-sm custom-input' id='flyashBW' value={this.state.flyashBW} disabled /></td>
                    </tr>
                    <tr>
                      <td colSpan='4'>GGBFS</td>
                      <td><input type='text' id='ggbfs_brand' className='form-control form-control-sm custom-input text-input' onChange={e => this.change(e)} /></td>
                      <td><input type='text' id='ggbfs_type' className='form-control form-control-sm custom-input text-input' onChange={e => this.change(e)} /></td>
                      <td colSpan='2'><input type='number' className='form-control form-control-sm custom-input' id='ggbfsMass' onChange={e => this.change(e)} /></td>
                      <td colSpan='2'><input type='text' className='form-control form-control-sm custom-input' disabled value={this.state.ggbfsMass} /></td>
                      <td colSpan='2'><input type='text' className='form-control form-control-sm custom-input' id='ggbfsBW' value={this.state.ggbfsBW} disabled /></td>
                    </tr>
                    <tr>
                      <td colSpan='4'>Micro Silica</td>
                      <td><input type='text' id='microsilica_brand' className='form-control form-control-sm custom-input text-input' onChange={e => this.change(e)} /></td>
                      <td><input type='text' id='microsilica_type' className='form-control form-control-sm custom-input text-input' onChange={e => this.change(e)} /></td>
                      <td colSpan='2'><input type='number' className='form-control form-control-sm custom-input' id='microsilicaMass' onChange={e => this.change(e)} /></td>
                      <td colSpan='2'><input type='text' className='form-control form-control-sm custom-input' disabled value={this.state.microsilicaMass} /></td>
                      <td colSpan='2'><input type='text' className='form-control form-control-sm custom-input' id='microsilicaBW' value={this.state.microsilicaBW} disabled /></td>
                    </tr>
                    <tr>
                      <td colSpan='4'>Alccofine</td>
                      <td><input type='text' id='alccofine_brand' className='form-control form-control-sm custom-input text-input' onChange={e => this.change(e)} /></td>
                      <td><input type='text' id='alccofine_type' className='form-control form-control-sm custom-input text-input' onChange={e => this.change(e)} /></td>
                      <td colSpan='2'><input type='number' className='form-control form-control-sm custom-input' id='alccofineMass' onChange={e => this.change(e)} /></td>
                      <td colSpan='2'><input type='text' className='form-control form-control-sm custom-input' disabled value={this.state.alccofineMass} /></td>
                      <td colSpan='2'><input type='text' className='form-control form-control-sm custom-input' id='alccofineBW' value={this.state.alccofineBW} disabled /></td>
                    </tr>
                    <tr>
                      <td colSpan='4'>Altraslag</td>
                      <td><input type='text' id='altraslag_brand' className='form-control form-control-sm custom-input text-input' onChange={e => this.change(e)} /></td>
                      <td><input type='text' id='altraslag_type' className='form-control form-control-sm custom-input text-input' onChange={e => this.change(e)} /></td>
                      <td colSpan='2'><input type='number' className='form-control form-control-sm custom-input' id='altraslagMass' onChange={e => this.change(e)} /></td>
                      <td colSpan='2'><input type='text' className='form-control form-control-sm custom-input' disabled value={this.state.altraslagMass} /></td>
                      <td colSpan='2'><input type='text' className='form-control form-control-sm custom-input' id='altraslagBW' value={this.state.altraslagBW} disabled /></td>
                    </tr>
                    <tr>
                      <td colSpan='4'>Water</td>
                      <td><input type='text' id='water_brand' className='form-control form-control-sm custom-input text-input' onChange={e => this.change(e)} /></td>
                      <td><input type='text' id='water_type' className='form-control form-control-sm custom-input text-input' onChange={e => this.change(e)} /></td>
                      <td colSpan='2'><input type='number' className='form-control form-control-sm custom-input' id='waterMass' onChange={e => this.change(e)} /></td>
                      <td colSpan='2'><input type='text' className='form-control form-control-sm custom-input' disabled id='waterFQ' value={this.state.waterFQ} /></td>
                      <td colSpan='2'><input type='text' className='form-control form-control-sm custom-input' id='waterBW' value={this.state.waterBW} disabled /></td>
                      <td colSpan='1' ><input type='text' className='form-control form-control-sm custom-input' id='waterWC' disabled value={this.state.waterWC} /></td>
                    </tr>
                    <tr>
                      <td colSpan='4'>20mm</td>
                      <td><input type='text' id='twenty_brand' className='form-control form-control-sm custom-input text-input' onChange={e => this.change(e)} /></td>
                      <td><input type='text' id='twenty_type' className='form-control form-control-sm custom-input text-input' onChange={e => this.change(e)} /></td>
                      <td colSpan='2'><input type='number' className='form-control form-control-sm custom-input' id='twentyMass' onChange={e => this.change(e)} /></td>
                      <td><input type='number' className='form-control form-control-sm custom-input' id='twentyAbsorption' onChange={e => this.change(e)} /></td>
                      <td><input type='number' className='form-control form-control-sm custom-input' id='twentyMoisture' onChange={e => this.change(e)} /></td>
                      <td colSpan='2'><input type='text' className='form-control form-control-sm custom-input' disabled id='twentyFQ' value={this.state.twentyFQ} /></td>
                      <td colSpan='2'><input type='text' className='form-control form-control-sm custom-input' id='twentyBW' value={this.state.twentyBW} disabled /></td>
                      <td>  <input type='text' className='form-control form-control-sm custom-input' id='twentyWC' disabled value={this.state.twentyWC} />  </td>
                    </tr>
                    <tr>
                      <td colSpan='4'>10mm</td>
                      <td><input type='text' id='ten_brand' className='form-control form-control-sm custom-input text-input' onChange={e => this.change(e)} /></td>
                      <td><input type='text' id='ten_type' className='form-control form-control-sm custom-input text-input' onChange={e => this.change(e)} /></td>
                      <td colSpan='2'><input type='number' className='form-control form-control-sm custom-input' id='tenMass' onChange={e => this.change(e)} /></td>
                      <td><input type='number' className='form-control form-control-sm custom-input' id='tenAbsorption' onChange={e => this.change(e)} /></td>
                      <td><input type='number' className='form-control form-control-sm custom-input' id='tenMoisture' onChange={e => this.change(e)} /></td>
                      <td colSpan='2'><input type='text' className='form-control form-control-sm custom-input' disabled id='tenFQ' value={this.state.tenFQ} /></td>
                      <td colSpan='2'><input type='text' className='form-control form-control-sm custom-input' id='tenBW' value={this.state.tenBW} disabled /></td>
                      <td><input type='text' className='form-control form-control-sm custom-input' id='tenWC' disabled value={this.state.tenWC} /></td>
                    </tr>
                    <tr>
                      <td colSpan='4'>M. Sand</td>
                      <td><input type='text' id='msand_brand' className='form-control form-control-sm custom-input text-input' onChange={e => this.change(e)} /></td>
                      <td><input type='text' id='msand_type' className='form-control form-control-sm custom-input text-input' onChange={e => this.change(e)} /></td>
                      <td colSpan='2'><input type='number' className='form-control form-control-sm custom-input' id='msandMass' onChange={e => this.change(e)} /></td>
                      <td><input type='number' className='form-control form-control-sm custom-input' id='msandAbsorption' onChange={e => this.change(e)} /></td>
                      <td><input type='number' className='form-control form-control-sm custom-input' id='msandMoisture' onChange={e => this.change(e)} /></td>
                      <td colSpan='2'><input type='text' className='form-control form-control-sm custom-input' disabled id='msandFQ' value={this.state.msandFQ} /></td>
                      <td colSpan='2'><input type='text' className='form-control form-control-sm custom-input' id='msandBW' value={this.state.msandBW} disabled /></td>
                      <td><input type='text' className='form-control form-control-sm custom-input' id='msandWC' disabled value={this.state.msandWC} /></td>
                    </tr>
                    <tr>
                      <td colSpan='4'>N. Sand</td>
                      <td><input type='text' id='nsand_brand' className='form-control form-control-sm custom-input text-input' onChange={e => this.change(e)} /></td>
                      <td><input type='text' id='nsand_type' className='form-control form-control-sm custom-input text-input' onChange={e => this.change(e)} /></td>
                      <td colSpan='2'><input type='number' className='form-control form-control-sm custom-input' id='nsandMass' onChange={e => this.change(e)} /></td>
                      <td><input type='number' className='form-control form-control-sm custom-input' id='nsandAbsorption' onChange={e => this.change(e)} /></td>
                      <td><input type='number' className='form-control form-control-sm custom-input' id='nsandMoisture' onChange={e => this.change(e)} /></td>
                      <td colSpan='2'><input type='text' className='form-control form-control-sm custom-input' disabled id='nsandFQ' value={this.state.nsandFQ} /></td>
                      <td colSpan='2'><input type='text' className='form-control form-control-sm custom-input' id='nsandBW' value={this.state.nsandBW} disabled /></td>
                      <td><input type='text' className='form-control form-control-sm custom-input' id='nsandWC' disabled value={this.state.nsandWC}
                      /></td>
                    </tr>
                    <tr>
                      <td colSpan='4'>Admixture 1</td>
                      <td><input type='text' id='admix1_brand' className='form-control form-control-sm custom-input text-input' onChange={e => this.change(e)} /></td>
                      <td><input type='text' id='admix1_type' className='form-control form-control-sm custom-input text-input' onChange={e => this.change(e)} /></td>
                      <td colSpan='2'><input type='number' className='form-control form-control-sm custom-input' id='admix1Mass' onChange={e => this.change(e)} /></td>
                      <td colSpan='2' rowSpan='4' />
                      <td colSpan='2'><input type='text' className='form-control form-control-sm custom-input' disabled value={this.state.admix1Mass} /></td>
                      <td colSpan='2'><input type='text' className='form-control form-control-sm custom-input' id='admixture1BW' value={this.state.admixture1BW} disabled /></td>
                      <td rowSpan='4'>
                        <label>Calculate ></label>
                        <button type="button" className="btn btn-sm btn-info custom-total-show-btn mb-2" onClick={this.calculateWCValues.bind(this)}>
                          Water Correction
                          <i class="fa fa-arrow-circle-right ml-1" aria-hidden="true" />
                        </button>
                        <button type="button" className="btn btn-sm btn-info custom-total-show-btn mt-2" onClick={this.calculateFQValues.bind(this)}>
                          Final Quantity
                          <i class="fa fa-arrow-circle-right ml-1" aria-hidden="true" />
                        </button>
                        <button type="button" className="btn btn-sm btn-info custom-total-show-btn mt-2" onClick={this.calculateBWValues.bind(this)}>
                          Batch Weight
                          <i class="fa fa-arrow-circle-right ml-1" aria-hidden="true" />
                        </button>
                      </td>
                    </tr>
                    <tr>
                      <td colSpan='4'>Admixture 2</td>
                      <td><input type='text' id='admix2_brand' className='form-control form-control-sm custom-input text-input' onChange={e => this.change(e)} /></td>
                      <td><input type='text' id='admix2_type' className='form-control form-control-sm custom-input text-input' onChange={e => this.change(e)} /></td>
                      <td colSpan='2'><input type='number' className='form-control form-control-sm custom-input' id='admix2Mass' onChange={e => this.change(e)} /></td>
                      <td colSpan='2'><input type='text' className='form-control form-control-sm custom-input' disabled value={this.state.admix2Mass} /></td>
                      <td colSpan='2'><input type='text' className='form-control form-control-sm custom-input' id='admixture2BW' value={this.state.admixture2BW} disabled /></td>
                    </tr>
                    <tr>
                      <td colSpan='4'>Admixture 3</td>
                      <td><input type='text' id='admix3_brand' className='form-control form-control-sm custom-input text-input' onChange={e => this.change(e)} /></td>
                      <td><input type='text' id='admix3_type' className='form-control form-control-sm custom-input text-input' onChange={e => this.change(e)} /></td>
                      <td colSpan='2'><input type='number' className='form-control form-control-sm custom-input' id='admix3Mass' onChange={e => this.change(e)} /></td>
                      <td colSpan='2'><input type='text' className='form-control form-control-sm custom-input' disabled value={this.state.admix3Mass} /></td>
                      <td colSpan='2'><input type='text' className='form-control form-control-sm custom-input' id='admixture3BW' value={this.state.admixture3BW} disabled /></td>
                    </tr>
                    <tr>
                      <td colSpan='8'>Concrete Density</td>
                      <td colSpan='2'><input type='text' className='form-control form-control-sm custom-input' id='concretedensityFQ' value={this.state.concretedensityFQ} disabled /></td>
                      <td colSpan='2'><input type='text' className='form-control form-control-sm custom-input' id='concretedensityBW' value={this.state.concretedensityBW} disabled /></td>
                    </tr>
                    <tr>
                      <td colSpan='15'>Fresh Concrete Properties</td>
                    </tr>
                    <tr>
                      <td colSpan='8'>Time (min.)</td>
                      <td>Initial</td>
                      <td>60 min</td>
                      <td>90 min</td>
                      <td>120 min</td>
                      <td>150 min</td>
                      <td>180 min</td>
                      <td rowSpan='4' colSpan='3'><textarea placeholder='Observations' id='observation' onChange={e => this.change(e)} /></td>
                      <td rowSpan='4' className='crap' />
                    </tr>
                    <tr>
                      <td colSpan='8'>Slump/ Flow (mm)</td>
                      <td><input type='number' id='slump_0' className='form-control form-control-sm custom-input fc-input' onChange={e => this.change(e)} /></td>
                      <td><input type='number' id='slump_60' className='form-control form-control-sm custom-input fc-input' onChange={e => this.change(e)} /></td>
                      <td><input type='number' id='slump_90' className='form-control form-control-sm custom-input fc-input' onChange={e => this.change(e)} /></td>
                      <td><input type='number' id='slump_120' className='form-control form-control-sm custom-input fc-input' onChange={e => this.change(e)} /></td>
                      <td><input type='number' id='slump_150' className='form-control form-control-sm custom-input fc-input' onChange={e => this.change(e)} /></td>
                      <td><input type='number' id='slump_180' className='form-control form-control-sm custom-input fc-input' onChange={e => this.change(e)} /></td>
                    </tr>
                    <tr>
                      <td colSpan='8'>Concrete Temperature</td>
                      <td><input type='number' id='concreteTemperature_0' className='form-control form-control-sm custom-input fc-input' onChange={e => this.change(e)} /></td>
                      <td><input type='number' id='concreteTemperature_60' className='form-control form-control-sm custom-input fc-input' onChange={e => this.change(e)} /></td>
                      <td><input type='number' id='concreteTemperature_90' className='form-control form-control-sm custom-input fc-input' onChange={e => this.change(e)} /></td>
                      <td><input type='number' id='concreteTemperature_120' className='form-control form-control-sm custom-input fc-input' onChange={e => this.change(e)} /></td>
                      <td><input type='number' id='concreteTemperature_150' className='form-control form-control-sm custom-input fc-input' onChange={e => this.change(e)} /></td>
                      <td><input type='number' id='concreteTemperature_180' className='form-control form-control-sm custom-input fc-input' onChange={e => this.change(e)} /></td>
                    </tr>
                    <tr>
                      <td colSpan='8'>Ambient Temperature</td>
                      <td><input type='number' id='ambient_0' className='form-control form-control-sm custom-input fc-input' onChange={e => this.change(e)} /></td>
                      <td><input type='number' id='ambient_60' className='form-control form-control-sm custom-input fc-input' onChange={e => this.change(e)} /></td>
                      <td><input type='number' id='ambient_90' className='form-control form-control-sm custom-input fc-input' onChange={e => this.change(e)} /></td>
                      <td><input type='number' id='ambient_120' className='form-control form-control-sm custom-input fc-input' onChange={e => this.change(e)} /></td>
                      <td><input type='number' id='ambient_150' className='form-control form-control-sm custom-input fc-input' onChange={e => this.change(e)} /></td>
                      <td><input type='number' id='ambient_180' className='form-control form-control-sm custom-input fc-input' onChange={e => this.change(e)} /></td>
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
                      <td><input type='text' id='age_1' onChange={e => this.change(e)} className='form-control form-control-sm custom-input' /></td>
                      <td><input type='text' id='age_2' onChange={e => this.change(e)} className='form-control form-control-sm custom-input' /></td>
                      <td><input type='text' id='age_3' onChange={e => this.change(e)} className='form-control form-control-sm custom-input' /></td>
                      <td><input type='text' id='age_4' onChange={e => this.change(e)} className='form-control form-control-sm custom-input' /></td>
                      <td><input type='text' id='age_5' onChange={e => this.change(e)} className='form-control form-control-sm custom-input' /></td>
                      <td><input type='text' id='age_6' onChange={e => this.change(e)} className='form-control form-control-sm custom-input' /></td>
                      <td><input type='text' id='age_7' onChange={e => this.change(e)} className='form-control form-control-sm custom-input' /></td>
                      <td><input type='text' id='age_8' onChange={e => this.change(e)} className='form-control form-control-sm custom-input' /></td>
                      <td><input type='text' id='age_9' onChange={e => this.change(e)} className='form-control form-control-sm custom-input' /></td>
                      <td><input type='text' id='age_10' onChange={e => this.change(e)} className='form-control form-control-sm custom-input' /></td>
                      <td><input type='text' id='age_11' onChange={e => this.change(e)} className='form-control form-control-sm custom-input' /></td>
                      <td><input type='text' id='age_12' onChange={e => this.change(e)} className='form-control form-control-sm custom-input' /></td>
                    </tr>
                    <tr>
                      <td colSpan='3'>Cube Weight</td>
                      <td><input type='text' id='cubeWeight_1' onChange={e => this.change(e)} className='form-control form-control-sm custom-input' /></td>
                      <td><input type='text' id='cubeWeight_2' onChange={e => this.change(e)} className='form-control form-control-sm custom-input' /></td>
                      <td><input type='text' id='cubeWeight_3' onChange={e => this.change(e)} className='form-control form-control-sm custom-input' /></td>
                      <td><input type='text' id='cubeWeight_4' onChange={e => this.change(e)} className='form-control form-control-sm custom-input' /></td>
                      <td><input type='text' id='cubeWeight_5' onChange={e => this.change(e)} className='form-control form-control-sm custom-input' /></td>
                      <td><input type='text' id='cubeWeight_6' onChange={e => this.change(e)} className='form-control form-control-sm custom-input' /></td>
                      <td><input type='text' id='cubeWeight_7' onChange={e => this.change(e)} className='form-control form-control-sm custom-input' /></td>
                      <td><input type='text' id='cubeWeight_8' onChange={e => this.change(e)} className='form-control form-control-sm custom-input' /></td>
                      <td><input type='text' id='cubeWeight_9' onChange={e => this.change(e)} className='form-control form-control-sm custom-input' /></td>
                      <td><input type='text' id='cubeWeight_10' onChange={e => this.change(e)} className='form-control form-control-sm custom-input' /></td>
                      <td><input type='text' id='cubeWeight_11' onChange={e => this.change(e)} className='form-control form-control-sm custom-input' /></td>
                      <td><input type='text' id='cubeWeight_12' onChange={e => this.change(e)} className='form-control form-control-sm custom-input' /></td>
                    </tr>
                    <tr>
                      <td colSpan='3'>Load (kN)</td>
                      <td><input type='text' id='load_1' onChange={e => this.change(e)} className='form-control form-control-sm custom-input' /></td>
                      <td><input type='text' id='load_2' onChange={e => this.change(e)} className='form-control form-control-sm custom-input' /></td>
                      <td><input type='text' id='load_3' onChange={e => this.change(e)} className='form-control form-control-sm custom-input' /></td>
                      <td><input type='text' id='load_4' onChange={e => this.change(e)} className='form-control form-control-sm custom-input' /></td>
                      <td><input type='text' id='load_5' onChange={e => this.change(e)} className='form-control form-control-sm custom-input' /></td>
                      <td><input type='text' id='load_6' onChange={e => this.change(e)} className='form-control form-control-sm custom-input' /></td>
                      <td><input type='text' id='load_7' onChange={e => this.change(e)} className='form-control form-control-sm custom-input' /></td>
                      <td><input type='text' id='load_8' onChange={e => this.change(e)} className='form-control form-control-sm custom-input' /></td>
                      <td><input type='text' id='load_9' onChange={e => this.change(e)} className='form-control form-control-sm custom-input' /></td>
                      <td><input type='text' id='load_10' onChange={e => this.change(e)} className='form-control form-control-sm custom-input' /></td>
                      <td><input type='text' id='load_11' onChange={e => this.change(e)} className='form-control form-control-sm custom-input' /></td>
                      <td><input type='text' id='load_12' onChange={e => this.change(e)} className='form-control form-control-sm custom-input' /></td>
                    </tr>
                    <tr>
                      <td colSpan='3'>Comp. Str.</td>
                      <td><input type='text' id='compStr_1' onChange={e => this.change(e)} className='form-control form-control-sm custom-input' /></td>
                      <td><input type='text' id='compStr_2' onChange={e => this.change(e)} className='form-control form-control-sm custom-input' /></td>
                      <td><input type='text' id='compStr_3' onChange={e => this.change(e)} className='form-control form-control-sm custom-input' /></td>
                      <td><input type='text' id='compStr_4' onChange={e => this.change(e)} className='form-control form-control-sm custom-input' /></td>
                      <td><input type='text' id='compStr_5' onChange={e => this.change(e)} className='form-control form-control-sm custom-input' /></td>
                      <td><input type='text' id='compStr_6' onChange={e => this.change(e)} className='form-control form-control-sm custom-input' /></td>
                      <td><input type='text' id='compStr_7' onChange={e => this.change(e)} className='form-control form-control-sm custom-input' /></td>
                      <td><input type='text' id='compStr_8' onChange={e => this.change(e)} className='form-control form-control-sm custom-input' /></td>
                      <td><input type='text' id='compStr_9' onChange={e => this.change(e)} className='form-control form-control-sm custom-input' /></td>
                      <td><input type='text' id='compStr_10' onChange={e => this.change(e)} className='form-control form-control-sm custom-input' /></td>
                      <td><input type='text' id='compStr_11' onChange={e => this.change(e)} className='form-control form-control-sm custom-input' /></td>
                      <td><input type='text' id='compStr_12' onChange={e => this.change(e)} className='form-control form-control-sm custom-input' /></td>
                    </tr>
                    <tr>
                      <td colSpan='3'>Average</td>
                      <td colSpan='3'><input type='text' id='average_1' onChange={e => this.change(e)} className='form-control form-control-sm custom-input' /></td>
                      <td colSpan='3'><input type='text' id='average_2' onChange={e => this.change(e)} className='form-control form-control-sm custom-input' /></td>
                      <td colSpan='3'><input type='text' id='average_3' onChange={e => this.change(e)} className='form-control form-control-sm custom-input' /></td>
                      <td colSpan='3'><input type='text' id='average_4' onChange={e => this.change(e)} className='form-control form-control-sm custom-input' /></td>
                    </tr>
                  </tbody>
                </table>
              </form>
              <div className='d-flex my-3'>
                <button className='btn btn-danger ml-auto mr-4' onClick={e => this.onSubmit(e)}>Submit</button>
              </div>
            </div>
          </div>

        </div>
      </div>

    )
  }
}

export default RF24
