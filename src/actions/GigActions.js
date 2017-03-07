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


export function makeOffer(offer, callback) {
  return function(dispatch){
  var data = converter.offer.toDTO(offer);
  var id = offer.gigID;

  const token = auth.getToken()
  cueup.makeOffer(token, id, data, function(err, result){
    if (err) {
      (callback(err))
    }else{
      (callback(null))
    }
  })
}
}

export function getFee(offer, callback) {
  var data = converter.offer.toDTO(offer);
  var id = offer.gigID;

  const token = auth.getToken()
  cueup.getFees(token, id, data, function(err, result){
    if (err) {
      (callback(err))
    }else{
      const offer = converter.offer.fromDTO(result);
      (callback(null, offer))
    }
  })
}

export function declineGig(id, callback) {
  return function(dispatch){

  const token = auth.getToken()
  cueup.declineGig(token, id, function(err, result){
    if (err) {
      (callback(err))
    }else{
      (callback(null))
    }
  })
}
}


export function cancelGig(id, callback) {
  return function(dispatch){

  const token = auth.getToken()
  cueup.cancelGig(token, id, function(err, result){
    if (err) {
      (callback(err))
    }else{
      (callback(null))
    }
  })
}
}
