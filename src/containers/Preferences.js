import React from 'react'
import { connect } from 'react-redux'
import Preferences from '../components/session/Preferences'
import * as actions from '../actions/actions'

//TODO move magic information about the filters out of container.
//Should be grabbed from the children that are set as filters
function mapStateToProps(state, ownProps) {
  return {
    profile:  state.user.status.editMode ? state.user.editableProfile : state.user.profile,
    editMode: state.user.status.editMode,
  }
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    toggleEditMode: () => { dispatch(actions.toggleEditMode()) },
    connectFacebook: () => null,
    connectSoundCloud: () => null,
    connectDB:  () => null,
    deleteAccount: () => null
}}


const SmartPreferences = connect(mapStateToProps, mapDispatchToProps)(Preferences)

export default props => (
    <SmartPreferences {...props}/>
)
