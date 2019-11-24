import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import './assets/css/style.css'
import './assets/css/font-awesome.css'

import App from './App'
import registerServiceWorker from './registerServiceWorker'
import { HashRouter } from 'react-router-dom'

ReactDOM.render(<HashRouter basepath={process.env.PUBLIC_URL + '/'}><App /></HashRouter>, document.getElementById('root'))
registerServiceWorker()
