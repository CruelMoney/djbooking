import React from 'react'
import { connect } from 'react-redux'
import Profile from '../components/pages/Profile'
import * as actions from '../actions/UserActions'

//TODO move magic information about the filters out of container.
//Should be grabbed from the children that are set as filters
function mapStateToProps(state, ownProps) {
  return {
    profile:   state.user.profile,
  }
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
      save: (profile,callback) => {dispatch(actions.save(profile, callback))},
      deleteProfile: (callback) => {dispatch(actions.deleteProfile(callback))},
}}

function mergeProps(stateProps, dispatchProps, ownProps) {
  return Object.assign({}, ownProps, {
    profile: stateProps.profile,
    save: dispatchProps.save,
    deleteProfile: dispatchProps.deleteProfile,
  })}


const SmartProfile = connect(mapStateToProps, mapDispatchToProps, mergeProps, { pure: false })(Profile)

export default props => (
    <SmartProfile {...props}/>
)
