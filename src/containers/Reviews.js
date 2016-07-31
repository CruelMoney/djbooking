import React from 'react'
import { connect } from 'react-redux'
import Reviews from '../components/session/Reviews'
import * as actions from '../actions/actions'


function mapStateToProps(state, ownProps) {
  return {
    reviews:  state.reviews.values,
  }
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    fetchReviews: () => { dispatch(actions.fetchReviews()) },
}}


const SmartReviews = connect(mapStateToProps, mapDispatchToProps)(Reviews)

export default props => (
    <SmartReviews {...props}/>
)
