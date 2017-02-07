import React, {PropTypes} from 'react'
import { Router, browserHistory } from 'react-router'
import { createStore, applyMiddleware } from 'redux'
import { connect } from 'react-redux'
import { Provider } from 'react-redux'
import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger'
import * as actions from './actions/LoginActions'
import store from './reducers/Store'

class app extends React.Component {
    propTypes: {
       loggedIn: PropTypes.bool,
       checkForLogin: PropTypes.func.isRequired,
     }

     state = {
         didCheckLogin: false,
     }

     componentWillMount() {

     }
     checkForLogin = (nextState, replace) => {
       if (!this.state.didCheckLogin) {
         this.setState({
           didCheckLogin: true,
           checking: true,
         }, this.props.checkForLogin(nextState.location.pathname))

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
            require('./routes/NotFound')
          ]
        } ]
      }

        return  ( <Router
          routes={routes}
          //onUpdate={(e) => {window.scrollTo(0, 0)}}
          history={browserHistory}
                  />)
      }
}


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

const SmartApp = connect(mapStateToProps, mapDispatchToProps)(app)
var appStore

if (process.env.NODE_ENV === "development"){
  const reduxMiddleware = applyMiddleware(thunkMiddleware, createLogger())
  appStore = createStore(store,reduxMiddleware)
  console.log(appStore.getState())

}else{
  appStore = createStore(store)
}
            


export default props => (
  <Provider store={appStore}>
    <SmartApp {...props}/>
  </Provider>
)
