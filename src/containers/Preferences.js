import React from 'react'
import { connect } from 'react-redux'
import Preferences from '../components/pages/Preferences'
import * as actions from '../actions/UserActions'

//TODO move magic information about the filters out of container.
//Should be grabbed from the children that are set as filters
function mapStateToProps(state, ownProps) {
  return {
    isDJ:  state.user.profile.isDJ,
    provider: state.user.profile.provider,
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
