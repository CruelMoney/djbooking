import React from 'react'
import { connect } from 'react-redux'
import User from '../components/session/User'
import * as actions from '../actions/actions'

//TODO move magic information about the filters out of container.
//Should be grabbed from the children that are set as filters
function mapStateToProps(state, ownProps) {
  return {
    profile:  state.editMode ? state.user.editableProfile : state.user.profile,
    resetProfile: state.user.profile,
    editMode: state.user.status.editMode,
  }
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    toggleEditMode: () => { dispatch(actions.toggleEditMode()) },
    updateProfileValue: (name, value) => { dispatch(actions.updateProfileValue(name, value)) },
    updateProfile: (profile) => {dispatch(actions.updateFullProfile(profile))},
    resetProfile:  (profile) => {dispatch(actions.resetProfile(profile))}
}}

function mergeProps(stateProps, dispatchProps, ownProps) {
  return Object.assign({}, ownProps, {
    profile: stateProps.profile,
    editMode: stateProps.editMode,
    updateProfileValue: dispatchProps.updateProfileValue,
    toggleEditMode: dispatchProps.toggleEditMode,
    updateProfile: () => dispatchProps.updateProfile(stateProps.profile),
    resetProfile: () => dispatchProps.resetProfile(stateProps.resetProfile)
  })}


const SmartUser = connect(mapStateToProps, mapDispatchToProps, mergeProps, {pure:false})(User)

export default props => (
    <SmartUser {...props}/>
)
