import c from '../constants/constants'
import AuthService from '../utils/AuthService'
import converter from '../utils/AdapterDTO'
import CueupService from '../utils/CueupService'
const cueup = new CueupService()
const auth = new AuthService()

var ActionTypes = c.ActionTypes

export function fetchReviews(userIdD) {
  return function (dispatch) {
    dispatch( function() { return {
        type: ActionTypes.FETCH_REVIEWS_REQUESTED,
      }}())

      cueup.getUserReviews(userIdD, function(err, result){
        if (err) {
          dispatch( function() { return {type: ActionTypes.FETCH_REVIEWS_FAILED, err: err.message}}() )
        }else{
          var reviews = result.map(r => converter.review.fromDTO(r))
          dispatch( function() { return {type: ActionTypes.FETCH_REVIEWS_SUCCEEDED, reviews: reviews} }() )
        }
      })
}
}
