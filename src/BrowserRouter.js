/* eslint-disable import/first */
import React, {Component} from 'react'
import {
  BrowserRouter as Router
} from 'react-router-dom'
import { Provider } from 'react-redux'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import App from './App'; 
import {store} from './store';
import './polyfills';

const theme = getMuiTheme();

class MyRouter extends Component {
      render(){        
        return  ( 
          <Router>
              <MuiThemeProvider muiTheme={theme}>
                <App/>
              </MuiThemeProvider>
          </Router>
          )
      }
}
 
export default props => (
  <Provider store={store}>
    <MyRouter {...props}/>
  </Provider>
);



