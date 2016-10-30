import c from '../constants/constants'
import AuthService from '../utils/AuthService'
import converter from '../utils/AdapterDTO'
import CueupService from '../utils/CueupService'
const cueup = new CueupService()
const auth = new AuthService()



var ActionTypes = c.ActionTypes


export function fetchGigs() {
  return function (dispatch) {

    dispatch( function() { return {
        type: ActionTypes.FETCH_GIGS_REQUESTED,
      }}())

      const token = auth.getToken()
      cueup.getUserGigs(token, function(err, result){
        if (err) {
          dispatch( function() { return {type: ActionTypes.FETCH_GIGS_FAILED, err: err.message}}() )
        }else{
          var gigs = result.map(e => converter.cueupGig.fromDTO(e))
          dispatch( function() { return {type: ActionTypes.FETCH_GIGS_SUCCEEDED, gigs: gigs} }() )
        }
      })
  }
}
