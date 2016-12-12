import React from 'react'
import { connect } from 'react-redux'
import User from '../components/pages/User'

//TODO move magic information about the filters out of container.
//Should be grabbed from the children that are set as filters
function mapStateToProps(state, ownProps) {
  return {
    profile:  state.user.profile,
    loading: state.user.status.isWaiting
  }
}

const SmartUser = connect(mapStateToProps)(User)

export default props => (
    <SmartUser {...props}/>
)
