import React from 'react'
import { render } from 'react-dom'
import { Router, Route, browserHistory, IndexRoute, IndexRedirect } from 'react-router'
import Signup from './components/stories/Signup'
import User from './containers/User'
import HowItWorks from './components/stories/HowItWorks'
import Navigation from './containers/Navigation'
import Profile from './containers/Profile'
import Preferences from './containers/Preferences'
import Gigs from './containers/Gigs'
import Reviews from './containers/Reviews'
import Home from './components/stories/Home'
import Auth from './components/stories/Auth'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import '../css/style.css'

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
          <Route path="/user/reviews" component={Reviews}/>
          <Route path="/user/preferences" component={Preferences}/>
        </Route>

        <Route path="/auth/" component={Auth}/>
        <Route path="/howitworks" component={HowItWorks}/>
        <Route path="/signup" component={Signup}/>

      </Route>
    </Router>
</MuiThemeProvider>
), document.getElementById('container'))
