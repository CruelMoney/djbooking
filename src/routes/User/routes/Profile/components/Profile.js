import React, {PropTypes} from 'react'
import UserProfile from './UserProfile'
import OwnProfile from './OwnProfile'

class Profile extends React.Component {
  render() {
          if (this.props.isOwnProfile){
          return <OwnProfile 
                {...this.props}
              />
          }else{
            return <UserProfile 
                {...this.props}
              />
          }    
 }
}

import { connect } from 'react-redux'
import * as actions from '../../../../../actions/UserActions'

//TODO move magic information about the filters out of container.
//Should be grabbed from the children that are set as filters
function mapStateToProps(state, ownProps) {
   const isOwnProfile = 
     state.login.status.publicProfileMode ? false :
    (state.login.profile.user_metadata) 
    ? state.login.profile.user_metadata.permaLink.toLowerCase() === ownProps.params.permalink.toLowerCase()
    : false
    
  return {
    profile: isOwnProfile ? state.login.profile : state.user.profile,
    isOwnProfile:isOwnProfile,
    publicProfileMode: state.login.status.publicProfileMode
  }
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
      save: (profile,callback) => {dispatch(actions.save(profile, callback))},
      deleteProfile: (callback) => {dispatch(actions.deleteProfile(callback))},
      togglePublicProfile: () => {dispatch(actions.togglePublicProfile())},
}}

function mergeProps(stateProps, dispatchProps, ownProps) {
  return {
    ...ownProps,
    ...stateProps,
    ...dispatchProps
  }}


const SmartProfile = connect(mapStateToProps, mapDispatchToProps, mergeProps, { pure: false })(Profile)

export default props => (
    <SmartProfile {...props}/>
)
