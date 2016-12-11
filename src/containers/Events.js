import React from 'react'
import { connect } from 'react-redux'
import Events from '../components/pages/Events'
import * as actions from '../actions/EventActions'


function mapStateToProps(state, ownProps) {
  return {
    events:  state.events.values,
    loading: state.events.isWaiting
  }
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    fetchEvents: () => { dispatch(actions.fetchEvents()) },
}}


const SmartEvents = connect(mapStateToProps, mapDispatchToProps)(Events)

export default props => (
    <SmartEvents {...props}/>
)
