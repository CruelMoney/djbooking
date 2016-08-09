import React from 'react'
import { connect } from 'react-redux'
import Signup from '../components/blocks/signup'
import * as actions from '../actions/actions'


function mapDispatchToProps(dispatch, ownprops) {
  return {
    signup: (name, email, password, phone) => dispatch(actions.signup({signup:"EMAIL", name, email, password, phone}, false)),
    signupFacebook: (name, phone)        => dispatch(actions.signup({signup:"FACEBOOK", name, phone}, false)),
    signupSoundcloud: (name, phone)      => dispatch(actions.signup({signup:"SOUNDCLOUD", name, phone}, false))
  }
}

const SmartSignup = connect(state=>state, mapDispatchToProps)(Signup)


export default props => (
    <SmartSignup {...props}/>
)
