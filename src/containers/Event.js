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
    updateEventValue: () => {console.log("not implemented")},
    payEvent: () => {console.log("not implemented")},
    updateEvent: () => {console.log("not implemented")},
    cancelEvent: () => {console.log("not implemented")},
}}


const SmartEvent = connect(state=>state, mapDispatchToProps)(Event)

export default props => (
    <SmartEvent {...props}/>
)
