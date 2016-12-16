import React from 'react'
import { connect } from 'react-redux'
import Home from '../components/pages/Home'
import * as eventActions from '../actions/EventActions'
import * as userActions from '../actions/UserActions'

//TODO move magic information about the filters out of container.
//Should be grabbed from the children that are set as filters
function mapStateToProps(state, ownProps) {
  return {
    isLoggedIn: state.user.status.signedIn,
    form:   Object.assign(
        {},
        state.forms["requestForm-step-1"] ? state.forms["requestForm-step-1"].values : {} ,
        state.forms["requestForm-step-2"] ? state.forms["requestForm-step-2"].values : {} ,
        state.forms["requestForm-step-3"] ? state.forms["requestForm-step-3"].values : {} ,
      ),
    emailExists: state.user.status.emailExists
  }
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    onSubmit: (form, callback)    => {dispatch(eventActions.postEvent(form, callback))},
    checkEmail: (email, callback) => {dispatch(userActions.checkEmail(email, callback))}
}}


const SmartProfile = connect(mapStateToProps, mapDispatchToProps)(Home)

export default props => (
    <SmartProfile {...props}/>
)
