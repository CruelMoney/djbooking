import React from 'react'
import { connect } from 'react-redux'
import Profile from '../components/pages/Profile'
import * as actions from '../actions/UserActions'

//TODO move magic information about the filters out of container.
//Should be grabbed from the children that are set as filters
function mapStateToProps(state, ownProps) {
  return {
    profile:  state.user.status.editMode ? state.user.editableProfile : state.user.profile,
    originalProfile: state.user.profile,
    editMode: state.user.status.editMode,
  }
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    toggleEditMode: () => { dispatch(actions.toggleEditMode()) },
      save: (profile) => {dispatch(actions.save(profile))},
      reset:  (profile) => {dispatch(actions.resetProfile(profile))},
      deleteProfile: () => {dispatch(actions.deleteProfile())},
      updateProfileValue: (name, value) => { dispatch(actions.updateProfileValue(name, value)) },

}}

function mergeProps(stateProps, dispatchProps, ownProps) {
  return Object.assign({}, ownProps, {
    profile: stateProps.profile,
    editMode: stateProps.editMode,
    updateProfileValue: dispatchProps.updateProfileValue,
    toggleEditMode: dispatchProps.toggleEditMode,
    save: () => dispatchProps.save(stateProps.profile),
    reset: () => dispatchProps.reset(stateProps.originalProfile),
    deleteProfile: dispatchProps.deleteProfile
  })}


const SmartProfile = connect(mapStateToProps, mapDispatchToProps, mergeProps)(Profile)

export default props => (
    <SmartProfile {...props}/>
)
