import React from 'react'
import { connect } from 'react-redux'
import Gig from '../components/blocks/Gig'
import  * as actions from '../actions/GigActions'

function mapStateToProps(state, ownProps){
  return {payoutInfoValid:  state.user.profile.stripeID ? true : false,  }
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    cancelGig:  (id, callback) => dispatch(actions.cancelGig(id,callback)),
    declineGig: (id, callback) => dispatch(actions.declineGig(id,callback)),
    updateGig:  (offer, callback)  => dispatch(actions.makeOffer(offer,callback)),
}}


const SmartGig = connect(mapStateToProps, mapDispatchToProps)(Gig)

export default props => (
    <SmartGig {...props}/>
)
