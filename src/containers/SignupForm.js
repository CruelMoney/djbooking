import React from 'react'
import { connect } from 'react-redux'
import SignupForm from '../components/session/SignUpForm'
import * as actions from '../actions/actions'


function mapStateToProps(state, ownProps) {
  return {
    form: state.forms.signupForm,
    isloading: state.signup.isWaiting
  }
}


function mapDispatchToProps(dispatch, ownprops) {
  return {
    handleSubmit: (form) => dispatch(actions.signup(form.values, true))
  }
}

function mergeProps(stateProps, dispatchProps, ownProps) {
  return Object.assign({}, ownProps, {
    isloading: stateProps.isloading,
    handleSubmit: () => dispatchProps.handleSubmit(stateProps.form),
  })
}

const SmartSignupForm = connect(mapStateToProps, mapDispatchToProps, mergeProps)(SignupForm)


export default props => (
    <SmartSignupForm {...props}/>
)
