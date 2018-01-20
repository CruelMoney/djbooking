/* eslint-disable import/first */
import React, {Component} from 'react'
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom'
import { createStore, applyMiddleware } from 'redux'
import { connect } from 'react-redux'
import { Provider } from 'react-redux'
import thunkMiddleware from 'redux-thunk'
import logger from 'redux-logger'
import reducers from './reducers/Store'
import {init as analytics} from './utils/analytics/autotrack'
import Loadable from 'react-loadable';
import NotFoundPage from './components/common/NotFoundPage'
import LoadHandler from './components/common/LoadingScreen'
import ErrorHandling from './components/common/ErrorPage'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

const theme = getMuiTheme()


const AsyncNavigation = Loadable({
  loader: () => import('./components/Navigation'),
  loading: LoadHandler
});
const AsyncAbout = Loadable({
  loader: () => import('./routes/About'),
  loading: LoadHandler
});
const AsyncHome = Loadable({
  loader: () => import('./routes/Home'),
  loading: LoadHandler
});
const AsyncEvent = Loadable({
  loader: () => import('./routes/Event'),
  loading: LoadHandler
});
const AsyncHowItWorks = Loadable({
  loader: () => import('./routes/HowItWorks'),
  loading: LoadHandler
});
const AsyncSignup = Loadable({
  loader: () => import('./routes/Signup'),
  loading: LoadHandler
});
const AsyncUser = Loadable({
  loader: () => import('./routes/User'),
  loading: LoadHandler
});
const AsyncFaq = Loadable({
  loader: () => import('./routes/Faq'),
  loading: LoadHandler
});
const AsyncTerms = Loadable({
  loader: () => import('./routes/Terms'),
  loading: LoadHandler
});

class App extends Component {
   
     componentWillMount() {
   
     }

     componentDidMount(){
        // Setup custom analytics
        analytics();
        // Preload common pages
        AsyncHowItWorks.preload();
        AsyncSignup.preload();
     }


     componentWillReceiveProps(props){
        if(props.loggedIn){
          AsyncUser.preload();
        }
     }



      render(){
        return  ( 
          <Router>
            <ErrorHandling>
              <MuiThemeProvider muiTheme={theme}>
              <AsyncNavigation/>
              <div id="content">
                <Switch>
                  <Route exact path="/" component={AsyncHome}/>
                  <Route path="/about" component={AsyncAbout}/>
                  <Route path="/user" component={AsyncUser}/>
                  <Route path="/howitworks" component={AsyncHowItWorks}/>
                  <Route path="/signup" component={AsyncSignup}/>
                  <Route path="/faq" component={AsyncFaq}/>
                  <Route path="/terms" component={AsyncTerms}/>
                  <Route path="/event/:id/:hash" component={AsyncEvent}/>
                  <Route component={NotFoundPage}/>
                </Switch>
                </div>
                <div id="popup-container"></div>
              </MuiThemeProvider>
            </ErrorHandling>
          </Router>
          )
      }
}


function mapStateToProps(state, ownprops) {
  return {
    loggedIn: state.login.status.signedIn,
    profile: state.login.profile
  }
}


const SmartApp = connect(mapStateToProps)(App)

var reduxMiddleware

if (process.env.NODE_ENV === "development"){
  reduxMiddleware = applyMiddleware(thunkMiddleware, logger)
}else{
  reduxMiddleware = applyMiddleware(thunkMiddleware)
}

export let store = createStore(reducers,reduxMiddleware)
 
export default props => (
  <Provider store={store}>
    <SmartApp {...props}/>
  </Provider>
)
