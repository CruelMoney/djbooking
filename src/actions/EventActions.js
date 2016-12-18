import c from '../constants/constants'
import AuthService from '../utils/AuthService'
import converter from '../utils/AdapterDTO'
import CueupService from '../utils/CueupService'
const cueup = new CueupService()
const auth = new AuthService()
import GeoCoder from '../utils/GeoCoder'
import StripeService from '../utils/StripeService'
const stripe = new StripeService()


var ActionTypes = c.ActionTypes


export function fetchEvents() {
  return function (dispatch) {

    dispatch( function() { return {
        type: ActionTypes.FETCH_EVENTS_REQUESTED,
      }}())

      const token = auth.getToken()
      cueup.getUserEvent(token, function(err, result){
        if (err) {
          dispatch( function() { return {type: ActionTypes.FETCH_EVENTS_FAILED, err: err.message}}() )
        }else{
          var events = result.map(e => converter.cueupEvent.fromDTO(e))
          dispatch( function() { return {type: ActionTypes.FETCH_EVENTS_SUCCEEDED, events: events} }() )
        }
      })
  }
}


export function fetchEvent(id, hash, authID, callback = null) {
  return function (dispatch) {

    dispatch( function() { return {
        type: ActionTypes.FETCH_EVENTS_REQUESTED,
      }}())

      const token = auth.getToken()

      cueup.getEvent(token, id, hash, function(err, result){
        if (err) {
          dispatch( function() { return {type: ActionTypes.FETCH_EVENTS_FAILED, err: err.message}}() )
          if (callback) {
            callback(err.message)
          }
        }else{
          var event = converter.cueupEvent.fromDTO(result)
          dispatch( function() { return {type: ActionTypes.FETCH_EVENTS_SUCCEEDED, events: [event]} }() )
          if (callback) {
            callback(null)
          }
        }
      })
  }
}

function createEvent(form, geoResult){
      return {
            Name: form.eventName,
            Genres: form.genres,
            Description: form.description,
            Location: {
              lat:geoResult.lat,
              lng: geoResult.lng,
              name: form.location
            },
            StartTime: form.startTime,
            EndTime: form.endTime,
            GuestsCount: form.guests[0],
            Currency: "DKK",
            MinPrice : form.minPrice,
            MaxPrice: form.maxPrice,
            NeedSpeakers: form.speakers,
          }
      }



export function postEvent(form, callback) {
  return function (dispatch) {

    //Getting the coordinates of the playing location
    GeoCoder.codeAddress(form.location, function(geoResult) {
        if (geoResult.error) {
            (callback("Error defining location: " + geoResult.error))
          }

        //If the geocoding does not fail
        else {
          var event = converter.cueupEvent.toDTO(form);
          var data ={...event, location:{
            lat:geoResult.position.lat,
            lng: geoResult.position.lng,
            name: event.location}, }
          const token = auth.getToken()
          cueup.createEvent(token, data, function(err, result){
            if (err) {
              (callback(err))
            }else{
              (callback(null))
            }
          })
        }})
  }
}


export function updateEvent(event, callback) {
  var self = this
  return function(dispatch){
  var data = converter.cueupEvent.toDTO(event);
  var id = event.id;

  const token = auth.getToken()
  cueup.updateEvent(token, id, data, function(err, result){
    if (err) {
      (callback(err))
    }else{
      dispatch(self.fetchEvent(event.id, event.hashKey, null, callback))
    }
  })
}
}
export function notifyPayment(id, hash, callback) {
  return function(dispatch){

  const token = auth.getToken()
  cueup.notifyPayEvent(token, id, hash, function(err, result){
    if (err) {
      (callback(err))
    }else{
      dispatch(null)
    }
  })
}
}

export function reviewEvent(id, hash, review, callback) {
  var self= this
  return function(dispatch){
  var data = converter.review.toDTO(review);
  console.log(data);
  const token = auth.getToken()
  cueup.reviewEvent(token, id, hash, data, function(err, result){
    if (err) {
      (callback(err))
    }else{
      dispatch(self.fetchEvent(id, hash, null, callback))
    }
  })
}
}


export function cancelEvent(id, hash, callback) {
  return function(dispatch){

  const token = auth.getToken()
  cueup.cancelEvent(token, id, hash, function(err, result){
    if (err) {
      (callback(err))
    }else{
      (callback(null))
    }
  })
}
}


export function payEvent(id, hash, data, callback) {
  return function(dispatch){

  stripe.createCardToken(data, (err, result)=>{
    if (err) {
      (callback(err))
    }else{
      const token = auth.getToken()

      data = {
        CardToken: result.id,
        Amount: data.amount,
        Fee: data.fee,
        Currency: data.currency,
        ChosenGigID: data.chosenGigID,
        City: data.card_city,
        Zip: data.card_zip,
        Address: data.card_address
      }
      cueup.payEvent(token, id, hash, data, function(err, result){
        if (err) {
          (callback(err))
        }else{
          (callback(null))
        }
      })

    }
  });

}
}
