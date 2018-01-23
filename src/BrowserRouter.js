/* eslint-disable import/first */
import React, {Component} from 'react'
import {
  BrowserRouter as Router
} from 'react-router-dom'
import { Provider } from 'react-redux'
import ErrorHandling from './components/common/ErrorPage'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import App from './App'; 
import { configureStore } from "./store";
const theme = getMuiTheme();

class MyRouter extends Component {
      render(){        
        return  ( 
          <Router>
            <ErrorHandling>
              <MuiThemeProvider muiTheme={theme}>
                <App/>
              </MuiThemeProvider>
            </ErrorHandling>
          </Router>
          )
      }
}

// Grab the state from a global variable injected into the server-generated HTML
const preloadedState = 
  typeof window !== 'undefined' 
  ? window.__PRELOADED_STATE__
  : {};

// Allow the passed state to be garbage-collected
typeof window !== 'undefined' && delete window.__PRELOADED_STATE__;

export let store = configureStore(preloadedState);
 
export default props => (
  <Provider store={store}>
    <MyRouter {...props}/>
  </Provider>
);



