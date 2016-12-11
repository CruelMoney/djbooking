import React from 'react'
import { connect } from 'react-redux'
import Event from '../components/pages/Event'
import * as actions from '../actions/EventActions'

function mapStateToProps(state, ownProps) {
  return {
    event:  state.events.values[0],
    profile: state.login.profile,
    loading: state.events.isWaiting
  }
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    fetchEvent: (id, authId) => dispatch(actions.fetchEvent(id, authId)),
    updateEvent: (event, callback) => dispatch(actions.updateEvent(event,callback)),
    payEvent: () => {console.log("not implemented")},
    reviewEvent: (review, callback) => dispatch(actions.reviewEvent(review,callback)),
    cancelEvent: (id, callback) => dispatch(actions.cancelEvent(id,callback)),
}}

const SmartEvent = connect(mapStateToProps, mapDispatchToProps)(Event)

export default props => (
    <SmartEvent {...props}/>
)
