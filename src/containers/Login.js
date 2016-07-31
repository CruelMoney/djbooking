import React from 'react'
import { connect } from 'react-redux'
import Login from '../components/session/Login'
import * as actions from '../actions/actions'


function mapDispatchToProps(dispatch, ownprops) {
  return {
    login: (email, password) => dispatch(actions.login({type:"EMAIL", email, password})),
    loginFacebook: ()        => dispatch(actions.login({type:"FACEBOOK"})),
    loginSoundcloud: ()      => dispatch(actions.login({type:"SOUNDCLOUD"}))
  }
}

const SmartLogin = connect(state=>state, mapDispatchToProps)(Login)


export default props => (
    <SmartLogin {...props}/>
)
