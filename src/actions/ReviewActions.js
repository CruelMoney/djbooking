import c from '../constants/constants'
import m from '../constants/Mocks'

var ActionTypes = c.ActionTypes

export function fetchReviews() {
  return function (dispatch) {
    dispatch( function() { return {
        type: ActionTypes.FETCHING_REVIEWS,
      }}())
    setTimeout(function(){
      dispatch( function() { return {
        type: ActionTypes.REVIEWS_FETCHED,
        value: m.REVIEWS
        }}())
    }, 1000)
      }
}
