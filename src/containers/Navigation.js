import React, {PropTypes} from 'react';
import { createStore, applyMiddleware, compose } from 'redux';
import { connect } from 'react-redux';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import Navigation from '../components/stories/Navigation';
import * as actions from '../actions/actions';
import store from '../reducers/Store';
import injectTapEventPlugin from 'react-tap-event-plugin';


function mapStateToProps(state, ownprops) {
  return {
    loggedIn: state.user.status.signedIn,
    profile: state.user.profile
  }
}

function mapDispatchToProps(dispatch, ownprops) {
  return {
    checkForLogin: () => dispatch(actions.checkForLogin()),
    logout: ()        => dispatch(actions.userLogout())
  }
}

const SmartNavigation = connect(mapStateToProps, mapDispatchToProps)(Navigation);
const reduxMiddleware = applyMiddleware(thunkMiddleware, createLogger());

let appStore = createStore(store,reduxMiddleware);
console.log(appStore.getState());

export default props => (
  <Provider store={appStore}>
    <SmartNavigation {...props}/>
  </Provider>
);
