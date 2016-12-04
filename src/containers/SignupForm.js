import React from 'react'
import { connect } from 'react-redux'
import SignupForm from '../components/blocks/SignUpForm'
import * as actions from '../actions/SignupActions'


// function mapStateToProps(state, ownProps) {
//   return {
//     form: state.forms.signupForm,
//     isloading: state.signup.isWaiting
//   }
// }


function mapDispatchToProps(dispatch, ownprops) {
  return {
    handleSubmit: (form,callback) => dispatch(actions.signup(form.values, true, callback))
  }
}

const SmartSignupForm = connect(state=>state, mapDispatchToProps)(SignupForm)


export default props => (
    <SmartSignupForm {...props}/>
)
