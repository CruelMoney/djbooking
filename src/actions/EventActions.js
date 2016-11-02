import c from '../constants/constants'
import AuthService from '../utils/AuthService'
import converter from '../utils/AdapterDTO'
import CueupService from '../utils/CueupService'
const cueup = new CueupService()
const auth = new AuthService()
import GeoCoder from '../utils/GeoCoder'



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
          var data = createEvent(form, geoResult.position)
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
  return function(dispatch){
  var data = converter.cueupEvent.toDTO(event);
  var id = event.id;

  const token = auth.getToken()
  cueup.updateEvent(token, id, data, function(err, result){
    if (err) {
      (callback(err))
    }else{
      (callback(null))
    }
  })
}
}

export function reviewEvent(review, callback) {
  return function(dispatch){
  var data = converter.review.toDTO(review);
  var id = review.eventId;

  const token = auth.getToken()
  cueup.reviewEvent(token, id, data, function(err, result){
    if (err) {
      (callback(err))
    }else{
      (callback(null))
    }
  })
}
}


export function cancelEvent(id, callback) {
  return function(dispatch){

  const token = auth.getToken()
  cueup.cancelEvent(token, id, function(err, result){
    if (err) {
      (callback(err))
    }else{
      (callback(null))
    }
  })
}
}
