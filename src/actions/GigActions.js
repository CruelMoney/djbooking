import c from '../constants/constants'
import AuthService from '../utils/AuthService'
import converter from '../utils/AdapterDTO'
import CueupService from '../utils/CueupService'
const cueup = new CueupService()
const auth = new AuthService()



var ActionTypes = c.ActionTypes


export function fetchGigs(userID) {
  return function (dispatch) {

    dispatch( function() { return {
        type: ActionTypes.FETCH_GIGS_REQUESTED,
      }}())

      const token = auth.getToken()
      cueup.getUserGigsIDs(token, userID, function(err, result){
        if (err) {
          dispatch( function() { return {type: ActionTypes.FETCH_GIGS_FAILED, err: err.message}}() )
        }else{
          dispatch( function() { return {type: ActionTypes.FETCH_GIGS_SUCCEEDED} }() )

          const ids =
            function* ids(){
              yield* result.reverse()
            }()
        
          const fetchGig = (id) =>{
            dispatch( function() { return {type: ActionTypes.FETCH_GIG_REQUESTED} }() )
            cueup.getUserGig(token,  id, (err, result)=>{
              if(err){
                dispatch( function() { return {type: ActionTypes.FETCH_GIG_FAILED} }() )
              }
              else{
              const gig = converter.cueupGig.fromDTO(result)
              dispatch( function() { return {type: ActionTypes.FETCH_GIG_SUCCEEDED, gig: gig} }())
            } 
              const nxt = ids.next()
              if(!nxt.done){
                fetchGig(nxt.value)
              }
            })
          }
          
          const nxt = ids.next()
          if(!nxt.done){
            fetchGig(nxt.value)
          }

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
      //timeout to show success button
      setTimeout(()=>dispatch( {type: ActionTypes.GIG_OFFER_UPDATED, offer:offer} ), 1500)
      callback(null)
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
      callback(null, offer)
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
      //setTimeout(()=>dispatch( dispatch(  {type: ActionTypes.GIG_DECLINED, id: id} ), 1500))
      callback(null)
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
      //setTimeout(()=>dispatch(dispatch( {type: ActionTypes.GIG_CANCELLED, id: id} ),1500))
      callback(null)
    }
  })
}
}
