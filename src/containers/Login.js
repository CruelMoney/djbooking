import React, {PropTypes} from 'react';
import { createStore, applyMiddleware, compose } from 'redux';
import { connect } from 'react-redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import Login from '../components/session/Login';
import * as actions from '../actions/actions';
import store from '../reducers/Store';
import injectTapEventPlugin from 'react-tap-event-plugin';
import AuthService from '../utils/AuthService'

function handleLogin(email, password, dispatch){
  console.log("starting dispatch");
  dispatch(actions.loginRequest(email, password))
}

function handleLoginface(dispatch){
  console.log("starting dispatch");
  dispatch(actions.loginFacebook())
}



function mapDispatchToProps(dispatch, ownprops) {
  return {
    login: (email, password) => dispatch(actions.login({type:"EMAIL", email, password})),
    loginFacebook: ()        => dispatch(actions.login({type:"FACEBOOK"})),
    loginSoundcloud: ()      => dispatch(actions.login({type:"SOUNDCLOUD"}))
  }
}

const SmartLogin = connect(state=>state, mapDispatchToProps)(Login);


export default props => (
    <SmartLogin {...props}/>
);
