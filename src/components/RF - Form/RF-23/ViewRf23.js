import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import '../../Test/Test.css'
import './table.css'
import axios from 'axios'
import ReactHTMLTableToExcel from 'react-html-table-to-excel'
import XLSX from 'xlsx';
import FileSaver from 'file-saver'
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'

// const { API_KEY } = process.env
const API_URL = 'http://35.234.215.61/api/'
const tokenvalue = localStorage.getItem('token')

export class ViewRf23 extends Component {
  constructor(props) {
    super(props)

    this.state = {
      date: '',
      data1: [],
      data2: [],
      data3: [],
      data4: [],
      metadata: [],
      employeeData: [],
      id: '',
      xlsFilename: ''
    }

    this.handleChange.bind(this)
  }

  async componentDidMount() {
    let data = []; let employeeData = []; let xlsFilename = ''
    let data1 = []; let data2 = []; let data3 = []; let metadata = []
    const id = this.props.location.state.displayid
    const url = API_URL + `cube/view_rf7/view/` + id
    try {
      const response = await axios.get(url, (axios.defaults.headers.common['x-access-token'] = tokenvalue), {
        headers: {
          'content-type': 'application/x-www-form-urlencoded'
        }
      })
      if (response.status === 200) {
        data = response.data
        data1 = data.data1[0]
        data2 = data.data2[0]
        data3 = data.data3
        metadata = data.meta
        xlsFilename = 'cctc-' + data2.EXCISE_NUMBER
      }

      const employeeResponse = await axios.get('http://35.234.215.61/api/employee/profile', (axios.defaults.headers.common['x-access-token'] = tokenvalue), {
        headers: {
          'content-type': 'application/x-www-form-urlencoded'
        }
      })
      if (employeeResponse.status === 200) {
        employeeData = employeeResponse.data.user_data
      }
    } catch (error) {
      console.log(error)
    }

    data3.forEach(element => {
      delete element.id
      delete element.mould_no
      delete element.density
      element.date_casting = metadata[0].submit_date
    });

    const d = new Date().toString().split(' ')
    switch (d[1].toLowerCase()) {
      case 'jan': d[1] = '01'; break
      case 'feb': d[1] = '02'; break
      case 'mar': d[1] = '03'; break
      case 'apr': d[1] = '04'; break
      case 'may': d[1] = '05'; break
      case 'jun': d[1] = '06'; break
      case 'jul': d[1] = '07'; break
      case 'aug': d[1] = '08'; break
      case 'sep': d[1] = '09'; break
      case 'oct': d[1] = '10'; break
      case 'nov': d[1] = '11'; break
      case 'dec': d[1] = '12'; break
    }
    let date = d[3] + '-' + d[1] + '-' + d[2]

    await this.setState({ employeeData, data1, data2, data3, metadata, xlsFilename, date })

  }

  async handleChange(e) { await this.setState({ date: e.target.value }) }

  renderTable = () => {
    let rows = ''

    if (this.state.data3 !== []) {
      rows = `<tr id='dynamicTable-head'>
    <td>CUBE IDENTIFICATION</td>
    <td>CASTING DATE</td>
    <td>TESTING DATE</td>
    <td>AGE AT TEST (Days)</td>
    <td>CUBE WEIGHT</td>
    <td>LOAD (Kn)</td>
    <td>STRENGTH (Mpa)</td>
    <td>FAILURE TYPE</td>
  </tr>`
      this.state.data3.forEach(row => {
        // console.log(row)
        rows += `<tr><td>${row.cube_ref_no.toString()}</td>
        <td>${row.date_casting}</td>
        <td>${row.date_testing}</td>
        <td>${row.agecube_con}</td>
        <td>${row.weight}</td>
        <td>${row.loads}</td>
        <td>${row.strength}</td>
        <td>${row.fracture_type}</td></tr>`
      })
      console.log(rows)
      return (<tbody dangerouslySetInnerHTML={{ __html: rows }} id='dynamic-table'></tbody>)
    } else {
      rows = ''
      return (<React.Fragment></React.Fragment>)
    }
  }

  stringTobinary = s => {
    let buf = new ArrayBuffer(s.length);
    let view = new Uint8Array(buf);
    for (let i = 0; i < s.length; i++) view[i] = s.charCodeAt(i) & 0xFF;
    return buf;
  }

  exportExcel = () => {
    let workbook = XLSX.utils.table_to_book(document.getElementById('table-to-print'), { sheet: 'rf-23' })
    console.log(workbook)
    let wbout = XLSX.write(workbook, { bookType: 'xlsx', bookSST: true, type: 'binary' });
    FileSaver.saveAs(new Blob([this.stringTobinary(wbout)], { type: "application/octet-stream" }), `${this.state.xlsFilename}.xlsx`);
  }

  exportPDF = () => {
    const input = document.getElementById('div-for-pdf')
    console.log(input)
    html2canvas(input)
      .then((canvas) => {
        const imgData = canvas.toDataURL('image/png')
        const unit = "pt";
        const size = "A3"; // Use A1, A2, A3 or A4
        const orientation = "portrait"; // portrait or landscape
        const pdf = new jsPDF(orientation, unit, size)
        pdf.addImage(imgData, 'PNG', 0, 0)
        pdf.save(`${this.state.xlsFilename}.pdf`)
      })

    // npm install jspdf --save
    // npm install html2canvas --save


    // let specialElementHandlers = {
    //   '.no-export': function (element, renderer) {
    //     return true;
    //   }
    // };

    // let doc = new jsPDF('p', 'pt', 'a4')
    // let source = document.getElementById('div-for-pdf').innerHTML
    // let margins = {
    //   top: 10,
    //   bottom: 10,
    //   left: 10,
    //   right: 10,
    // }
    // doc.fromHTML(
    //   source,
    //   margins.left,
    //   margins.top, {
    //     'elementHandlers': specialElementHandlers
    //   },
    //   function (dispose) {
    //     doc.save('Test.pdf');
    //   }, margins);

    // doc.autoTable({ html: '#table-to-print' })
    // doc.save(`${this.state.xlsFilename}.pdf`);

  }

  render() {
    const { data1, data2, employeeData, date } = this.state

    return (
      <div className='skin-blue fixed-layout'>
        <div className='page-wrapper'>
          <div className='container-fluid'>
            <div className='row page-titles'>
              <div className='col-md-5 align-self-center'>
                <h4 className="text-themecolor">Forms</h4>
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
          <div className='container bg-light' id='div-for-pdf'>
            <table className='table table-bordered w-100' id='table-to-print'>
              <thead>
                <tr>
                  <th colSpan='8' className='text-center h2 font-weight-bold'>RDC CONCRETE (INDIA) PVT. LTD.</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td colSpan='8'>
                    <p><span className='font-weight-bold'>Reg. Office: </span>7th Floor, Thane One Corporate IT Park, DIL Complex,Next to Tatvagyan Vidyapeeth,Ghodbunder Road, Thane (West), 400 610</p>
                  </td>
                </tr>
                <tr>
                  <td colSpan='8'>
                    <p><span className='font-weight-bold'>Plant Office: </span>{data1.sampling_loc}</p>
                  </td>
                </tr>
                <tr>
                  <td colSpan='8'>
                    <p><span className='font-weight-bold'>Mobile: </span>{employeeData.name}, {employeeData.contact_number}</p>
                  </td>
                </tr>
                <tr>
                  <td colSpan='8' rowSpan='2' className='text-center h3'>CONCRETE COMPRESSIVE TEST CERTIFICATE, RF-23
                  </td>
                </tr>
                <tr></tr>
                <tr>
                  <td colSpan='4'><span>Name &amp; Address of Customer</span></td>
                  <td colSpan='4' width='50%'><span>Name &amp; Address of Project</span></td>
                </tr>
                <tr>
                  <td colSpan='4'><p>{data2.CUSTOMER_NAME}</p></td>
                  <td colSpan='4'><p>Project Name</p></td>
                </tr>
                <tr>
                  <td><span>Ticket No: </span></td>
                  <td colSpan='3'><p>{data2.EXCISE_NUMBER}</p></td>
                  <td><span>Test report date: </span></td>
                  <td colSpan='3'>
                    <input type='date'
                      value={date}
                      onChange={e => this.handleChange(e)}
                      className='form-control'
                    />
                  </td>
                </tr>
                <tr>
                  <td colSpan='8' id='renderTable'>
                    {this.renderTable()}
                  </td>
                </tr>
                <tr>
                  <td className='text-center' colSpan='8' rowSpan='2'><p> Average Compressive Strength for 7 Days: <span>25.29 Mpa</span></p>
                    <p> Average Compressive Strength for 28 Days: <span> #DIV/0! </span></p></td>
                </tr>
                <tr></tr>
                <tr>
                  <td colSpan='8' rowSpan='2' className='text-center h3'>INFORMATION OF CONCRETE SAMPLE</td>
                </tr>
                <tr></tr>
                <tr>
                  <td colSpan='5'><p>Grade of Concrete</p></td>
                  <td colSpan='3'><span>M30</span></td>
                </tr>
                <tr>
                  <td colSpan='5'><p>Slump (mm) at the time of cube casting	</p></td>
                  <td colSpan='3'><span>{data1.casting_slump}mm</span></td>
                </tr>
                <tr>
                  <td colSpan='5'><p>Specimen Size (mm)	</p></td>
                  <td colSpan='3'><span>{data1.size} </span></td>
                </tr>
                <tr>
                  <td colSpan='8' rowSpan='2'>
                    <span>Note: </span>Casting, crushing &amp; testing of specimens carried out as per IS 516-1959(Reaffirmed 1999).
                  </td>
                </tr>
                <tr></tr>
                <tr>
                  <td colSpan='3' className='m-0'><span>For RDC CONCRETE (INDIA) PVT. LTD.</span></td>
                  <td colSpan='2' className='m-0'><span>OFFICIAL STAMP</span></td>
                  <td colSpan='3' className='m-0'><span>ACKNOWLEDGEMENT</span></td>
                </tr>
                <tr>
                  <td colSpan='3' id='d' height={120}> </td>
                  <td colSpan='2' rowSpan='2'> </td>
                  <td colSpan='3' rowSpan='2'> </td>
                </tr>
                <tr>
                  <td colSpan='3' className='m-0 p-2'><p className='font-weight-bold my-auto'>Location Quality Incharge/TO-Plant</p></td>
                </tr>
                <tr></tr>
                <tr>
                  <td colSpan='8'><p>Note: Any test certificate shall not be reproduced without written permission from RDC Concrete (India) Pvt. Ltd.</p></td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className='d-flex container py-3 pr-5 mb-5'>
            {/* <ReactHTMLTableToExcel
              id='table-xls-button'
              className='btn btn-md btn-info ml-auto'
              table='table-to-xls'
              filename={this.state.xlsFilename}
              sheet='rf-23'
            /> */}
            <br />
            <button onClick={this.exportExcel} className='btn btn-md btn-info ml-auto' >Download as excel</button>
            <button onClick={this.exportPDF} className='btn btn-md btn-info ml-3' >Download as pdf</button>
          </div>
        </div>
      </div >
    )
  }
}

export default ViewRf23
