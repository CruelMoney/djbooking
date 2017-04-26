import c from '../constants/constants'
var ActionTypes = c.ActionTypes

import AuthService from '../utils/AuthService'
import converter from '../utils/AdapterDTO'
import CueupService from '../utils/CueupService'
const cueup = new CueupService()
const auth = new AuthService()
import GeoCoder from '../utils/GeoCoder'
import StripeService from '../utils/StripeService'
const stripe = new StripeService()
import * as tracker from '../utils/analytics/autotrack'


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



var getLocation = (location) => {
  return new Promise(function(resolve, reject){
    if (location.toUpperCase() === "CURRENT LOCATION") {
      if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(
          position=>{
          resolve({position:{lat: position.coords.latitude, lng: position.coords.longitude}});
        }, 
        err=>reject("Current location could not be found. Please enter the city."));
      }else{
        (reject("Current location not supported in this browser. Please enter the city."))
      }
    }else{
      GeoCoder.codeAddress(location, function(geoResult) {
              if (geoResult.error) {
                  (reject("The location could not be found, try another city"))
                }else{
                  resolve(geoResult)
                }
          })
          }
      })
  }



export function postEvent(form, callback) {
  return function (dispatch) {
      getLocation(form.location).then((geoResult)=>{
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
                  console.log(typeof tracker.trackEventPosted)
                  tracker.trackEventPosted()
                }
              })}
      ).catch(errMessage=>callback(errMessage))
         
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
  var self = this
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
        Address: data.card_address,
        Name: data.card_name
      }
      cueup.payEvent(token, id, hash, data, function(err, result){
        if (err) {
          (callback(err))
        }else{
          tracker.trackEventPaid(data.Amount+data.Fee)
          dispatch(self.fetchEvent(id, hash, null, callback))
        }
      })

    }
  });

}
}
