import React from 'react'
import { connect } from 'react-redux'
import Gig from '../components/blocks/Gig'

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
