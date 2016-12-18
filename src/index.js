import React  from 'react'
import { render } from 'react-dom'
import Router from './Router'
import injectTapEventPlugin from 'react-tap-event-plugin'

injectTapEventPlugin()

import './css/style.css'

render((
  <Router/>
), document.getElementById('root'))
