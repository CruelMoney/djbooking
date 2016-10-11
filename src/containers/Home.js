import React from 'react'
import { connect } from 'react-redux'
import Home from '../components/pages/Home'
import * as actions from '../actions/EventActions'

//TODO move magic information about the filters out of container.
//Should be grabbed from the children that are set as filters
function mapStateToProps(state, ownProps) {
  return {
    isLoggedIn: state.user.status.signedIn,
    form: state.forms.requestForm
  }
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    onSubmit: (form) => {
      dispatch(actions.postEvent(form)) },
}}


const SmartProfile = connect(mapStateToProps, mapDispatchToProps)(Home)

export default props => (
    <SmartProfile {...props}/>
)
