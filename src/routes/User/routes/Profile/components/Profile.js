import React, {Component} from 'react'
import UserProfile from './UserProfile'
import OwnProfile from './OwnProfile'

import { connect } from 'react-redux'
import * as actions from '../../../../../actions/UserActions'

class Profile extends Component {
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


const SmartProfile = connect(state=>state, mapDispatchToProps, mergeProps, { pure: false })(Profile)

export default props => (
    <SmartProfile {...props}/>
)
