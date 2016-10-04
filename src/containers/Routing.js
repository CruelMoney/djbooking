import React, { PropTypes } from 'react'
import { Router, Route, browserHistory, IndexRoute, IndexRedirect, Redirect } from 'react-router'
import Signup from '../components/pages/Signup'
import User from './User'
import HowItWorks from '../components/pages/HowItWorks'
import Navigation from './Navigation'
import Profile from './Profile'
import Preferences from './Preferences'
import Gigs from './Gigs'
import Events from './Events'
import Reviews from './Reviews'
import Home from '../components/pages/Home'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { createStore, applyMiddleware } from 'redux'
import { connect } from 'react-redux'
import { Provider } from 'react-redux'
import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger'
import * as actions from '../actions/LoginActions'
import store from '../reducers/Store'

const theme = getMuiTheme()

var router = React.createClass({

  propTypes: {
     loggedIn: PropTypes.bool,
     checkForLogin: PropTypes.func.isRequired,
   },


   componentWillMount() {
     if (!this.props.loggedIn) {
       this.props.checkForLogin()
     }
   },

 redirectNotAuth(nextState, replace){
      if (!this.props.loggedIn) {
        replace({
        pathname: '/',
        state: { nextPathname: nextState.location.pathname }
      })
      this.props.checkForLogin(nextState.location.pathname)
    }
  },


  render() {
    return(
    <MuiThemeProvider muiTheme={theme}>
      <Router history={browserHistory}>
        <Route path="/" component={Navigation}>

          <IndexRoute component={Home}/>

          <Route component={User} onEnter={this.redirectNotAuth}>
            <Route path="profile" component={Profile}/>
            <Route path="gigs" component={Gigs}/>
            <Route path="events" component={Events}/>
            <Route path="reviews" component={Reviews}/>
            <Route path="preferences" component={Preferences}/>
          </Route>



          <Route path="howitworks" component={HowItWorks}/>
          <Route path="signup" component={Signup}/>

        </Route>
      </Router>
    </MuiThemeProvider>
)
}
})

function mapStateToProps(state, ownprops) {
  return {
    loggedIn: state.user.status.signedIn,
    profile: state.user.profile
  }
}

function mapDispatchToProps(dispatch, ownprops) {
  return {
    checkForLogin: (route) => dispatch(actions.checkForLogin(route)),
  }
}

const SmartRouter = connect(mapStateToProps, mapDispatchToProps)(router)
const reduxMiddleware = applyMiddleware(thunkMiddleware, createLogger())

let appStore = createStore(store,reduxMiddleware)
console.log(appStore.getState())

export default props => (
  <Provider store={appStore}>
    <SmartRouter {...props}/>
  </Provider>
)
