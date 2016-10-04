import React from 'react'
import { connect } from 'react-redux'
import Navigation from '../components/blocks/Navigation'
import * as actions from '../actions/LoginActions'


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

const SmartNavigation = connect(mapStateToProps, mapDispatchToProps)(Navigation)

export default props => (
    <SmartNavigation {...props}/>
)
