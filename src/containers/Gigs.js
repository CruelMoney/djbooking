import React from 'react'
import { connect } from 'react-redux'
import Gigs from '../components/session/Gigs'
import * as actions from '../actions/actions'


function mapStateToProps(state, ownProps) {
  return {
    gigs:  state.gigs.values,
  }
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    fetchGigs: () => { dispatch(actions.fetchGigs()) },
    acceptGig: (gigID, price) => {dispatch(actions.acceptGig(gigID, price))},
    declineGig: (gigID) => {dispatch(actions.declineGig(gigID))},
}}


const SmartPreferences = connect(mapStateToProps, mapDispatchToProps)(Gigs)

export default props => (
    <SmartPreferences {...props}/>
)
