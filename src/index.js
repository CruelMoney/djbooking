import React  from 'react'
import { render } from 'react-dom'
import Router from './Router'
import './css/style.css'
/* POLYFILLS */
import injectTapEventPlugin from 'react-tap-event-plugin'
import 'url-polyfill';

injectTapEventPlugin()

render((
  <Router/>
), document.getElementById('root'))
