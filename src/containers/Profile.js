import React from 'react'
import { connect } from 'react-redux'
import Profile from '../components/session/Profile'
import * as actions from '../actions/actions'

//TODO move magic information about the filters out of container.
//Should be grabbed from the children that are set as filters
function mapStateToProps(state, ownProps) {
  return {
    profile:  state.editMode ? state.user.editableProfile : state.user.profile,
    editMode: state.user.status.editMode,
  }
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    toggleEditMode: () => { dispatch(actions.toggleEditMode()) },
    updateProfileValue: (name, value) => { dispatch(actions.updateProfileValue(name, value)) },
}}



const SmartProfile = connect(mapStateToProps, mapDispatchToProps)(Profile)

export default props => (
    <SmartProfile {...props}/>
)
