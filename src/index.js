import React  from 'react'
import { hydrate, render } from 'react-dom';
import Router from './Router'
import './css/style.css'
/* POLYFILLS */
import injectTapEventPlugin from 'react-tap-event-plugin'
import 'url-polyfill';

injectTapEventPlugin()


const rootElement = document.getElementById('root');
if (rootElement.hasChildNodes()) {
  hydrate(<Router />, rootElement);
} else {
  render(<Router />, rootElement);
}