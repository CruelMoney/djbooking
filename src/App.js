import React from 'react'
import { render } from 'react-dom'
import { Router, Route, browserHistory, IndexRoute, IndexRedirect } from 'react-router'
import Signup from './components/pages/Signup'
import User from './containers/User'
import HowItWorks from './components/pages/HowItWorks'
import Navigation from './containers/Navigation'
import Profile from './containers/Profile'
import Preferences from './containers/Preferences'
import Gigs from './containers/Gigs'
import Events from './containers/Events'
import Reviews from './containers/Reviews'
import Home from './components/pages/Home'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import './css/style.css'

const theme = getMuiTheme()



render((
  <MuiThemeProvider muiTheme={theme}>
    <Router history={browserHistory}>
      <Route path="/" component={Navigation}>

        <IndexRoute component={Home}/>


        <Route path="/user" component={User}>
          <IndexRedirect to="/user/profile" />

          <Route path="/user/profile" component={Profile}/>
          <Route path="/user/gigs" component={Gigs}/>
          <Route path="/user/events" component={Events}/>
          <Route path="/user/reviews" component={Reviews}/>
          <Route path="/user/preferences" component={Preferences}/>
        </Route>

        <Route path="/howitworks" component={HowItWorks}/>
        <Route path="/signup" component={Signup}/>

      </Route>
    </Router>
</MuiThemeProvider>
), document.getElementById('container'))
