import React from 'react'
import { connect } from 'react-redux'
import Reviews from '../components/pages/Reviews'
import * as actions from '../actions/ReviewActions'


function mapStateToProps(state, ownProps) {
  return {
    reviews:  state.reviews.values ? state.reviews.values : [],
    loading: state.reviews.isWaiting
  }
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    fetchReviews: () => { dispatch(actions.fetchReviews()) },
}}
function mergeProps(stateProps, dispatchProps, ownProps) {
  return {...stateProps, ...dispatchProps}
}

const SmartReviews = connect(mapStateToProps, mapDispatchToProps, mergeProps,{ pure: false })(Reviews)

export default props => (
    <SmartReviews {...props}/>
)
