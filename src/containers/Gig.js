import React from 'react'
import { connect } from 'react-redux'
import Gig from '../components/blocks/Gig'
import * as actions from '../actions/EventActions'

function mapDispatchToProps(dispatch, ownProps) {
  return {
    acceptGig: (gigID, price) => {console.error("not implemented")},
    declineGig: (gigID) => {console.error("not implemented")},
    updateGig: (gigID,price) => {console.error("not implemented")}
}}


const SmartGig = connect(state=>state, mapDispatchToProps)(Gig)

export default props => (
    <SmartGig {...props}/>
)
