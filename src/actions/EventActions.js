import c from '../constants/constants'
import m from '../constants/Mocks'
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

export function fetchGigs() {
  return function (dispatch) {
    dispatch( function() { return {
        type: ActionTypes.FETCHING_GIGS,
      }}())
    setTimeout(function(){
      dispatch( function() { return {
        type: ActionTypes.GIGS_FETCHED,
        value: m.GIGS
        }}())
    }, 1000)
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


export function postEvent(form) {
  return function (dispatch) {
    dispatch( function() { return {type: ActionTypes.CREATE_EVENT_REQUESTED} }() )

    //Getting the coordinates of the playing location
    GeoCoder.codeAddress(form.values.location, function(geoResult) {
        if (geoResult.error) {
            dispatch(function() {
                return {
                    type: ActionTypes.CREATE_EVENT_FAILED,
                    err: "Error defining location: " + geoResult.error
                }
            }())
            return
          }

        //If the geocoding does not fail
        else {
          var data = createEvent(form.values, geoResult.position)
          const token = auth.getToken()
          cueup.createEvent(token, data, function(err, result){
            if (err) {
              dispatch( function() { return {type: ActionTypes.CREATE_EVENT_FAILED, err: err.message}}() )
            }else{
              dispatch( function() { return {type: ActionTypes.CREATE_EVENT_SUCCEEDED} }() )
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
