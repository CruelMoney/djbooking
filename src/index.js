import React from 'react'
import { render } from 'react-dom'
import Router from './containers/Routing'

import './css/style.css'
import './css/calendar.css'


render((
  <Router/>
), document.getElementById('root'))
