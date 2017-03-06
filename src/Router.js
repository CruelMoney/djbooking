import React, {PropTypes} from 'react'
import { Router, browserHistory } from 'react-router'
import { createStore, applyMiddleware } from 'redux'
import { connect } from 'react-redux'
import { Provider } from 'react-redux'
import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger'
import * as actions from './actions/LoginActions'
import store from './reducers/Store'
import {init as analytics} from './utils/analytics/autotrack'

class app extends React.Component {
   
     state = {
         didCheckLogin: false,
     }

     componentWillMount() {
         // Setup custom analytics
         analytics()
     }


     checkForLogin = (nextState, replace) => {
       if (!this.state.didCheckLogin) {
         this.setState({
           didCheckLogin: true,
           checking: true,
         }, this.props.checkForLogin())

       }
     }


      render(){
        const routes = {
        childRoutes: [ {
          path: '/',
          onEnter: this.checkForLogin,
          component: require('./components/Navigation').default,
          indexRoute: require('./routes/Home'),
          childRoutes: [
            require('./routes/Event'),
            require('./routes/User'),
            require('./routes/HowItWorks'),
            require('./routes/Signup'),
            require('./routes/Terms'),
            require('./routes/Faq'),
            require('./routes/About'),
            require('./routes/NotFound'),
          ]
        } ]
      }

        return  ( <Router
          routes={routes}
          onUpdate={(e) => {
            if(!window.location.hash){
            window.scrollTo(0, 0)}}
            }
            history={browserHistory}
           />)
      }
}


function mapStateToProps(state, ownprops) {
  return {
    loggedIn: state.login.status.signedIn,
    profile: state.login.profile
  }
}

function mapDispatchToProps(dispatch, ownprops) {
  return {
    checkForLogin: (route) => dispatch(actions.checkForLogin(route)),
  }
}

const SmartApp = connect(mapStateToProps, mapDispatchToProps)(app)

var reduxMiddleware

if (process.env.NODE_ENV === "development"){
  reduxMiddleware = applyMiddleware(thunkMiddleware, createLogger())
}else{
  reduxMiddleware = applyMiddleware(thunkMiddleware)
}

let appStore = createStore(store,reduxMiddleware)

export default props => (
  <Provider store={appStore}>
    <SmartApp {...props}/>
  </Provider>
)
