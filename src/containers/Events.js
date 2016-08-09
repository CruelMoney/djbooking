import React from 'react'
import { connect } from 'react-redux'
import Events from '../components/pages/Events'
import * as actions from '../actions/EventsActions'


function mapStateToProps(state, ownProps) {
  return {
    events:  state.events.values,
  }
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    fetchEvents: () => { dispatch(actions.fetchEvents()) },
    payEvent: () => {console.log("not implemented")},
    editEvent: () => {console.log("not implemented")},
    cancelEvent: () => {console.log("not implemented")},
}}


const SmartEvents = connect(mapStateToProps, mapDispatchToProps)(Events)

export default props => (
    <SmartEvents {...props}/>
)
