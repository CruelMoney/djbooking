import React from 'react'
import { connect } from 'react-redux'
import Event from '../components/blocks/Event'
import * as actions from '../actions/EventActions'

// function mapStateToProps(state, ownProps) {
//   return {
//     events:  state.events.values,
//   }
// }

function mapDispatchToProps(dispatch, ownProps) {
  return {
    updateEvent: (event, callback) => dispatch(actions.updateEvent(event,callback)),
    payEvent: () => {console.log("not implemented")},
    reviewEvent: (review, callback) => dispatch(actions.reviewEvent(review,callback)),
    cancelEvent: (id, callback) => dispatch(actions.cancelEvent(id,callback)),
}}

const SmartEvent = connect(state=>state, mapDispatchToProps)(Event)

export default props => (
    <SmartEvent {...props}/>
)
