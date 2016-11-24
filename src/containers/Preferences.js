import React from 'react'
import { connect } from 'react-redux'
import Preferences from '../components/pages/Preferences'
import * as actions from '../actions/UserActions'

//TODO move magic information about the filters out of container.
//Should be grabbed from the children that are set as filters
function mapStateToProps(state, ownProps) {
  return {
    user:  state.user.profile,
    provider: state.user.profile.provider,
  }
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    connectFacebook: () => {console.log("not implemented")},
    connectSoundCloud: () =>{console.log("not implemented")},
    connectDB:  () => {console.log("not implemented")},
    updateSettings: (settings, callback) => dispatch(actions.updateSettings(settings,callback)),
    deleteAccount: (callback) => dispatch(actions.deleteProfile(callback)),
}}


const SmartPreferences = connect(mapStateToProps, mapDispatchToProps)(Preferences)

export default props => (
    <SmartPreferences {...props}/>
)
