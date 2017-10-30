import React  from 'react'
import { render } from 'react-dom'
import Router from './Router'
import injectTapEventPlugin from 'react-tap-event-plugin'
import 'url-polyfill';
import './css/style.css'

injectTapEventPlugin()


render((
  <Router/>
), document.getElementById('root'))
