import React from 'react'
import { connect } from 'react-redux'
import Login from '../components/blocks/Login'
import * as actions from '../actions/LoginActions'



function mapDispatchToProps(dispatch, ownprops) {
  return {
    login: (email, password, callback) => dispatch(actions.login({type:"EMAIL", email, password}, callback)),
    loginFacebook: (form,callback)        => dispatch(actions.login({type:"FACEBOOK"},callback)),
    loginSoundcloud: (form,callback)      => dispatch(actions.login({type:"SOUNDCLOUD"},callback)),
  }
}

const SmartLogin = connect(state=>state, mapDispatchToProps)(Login)


export default props => (
    <SmartLogin {...props}/>
)
