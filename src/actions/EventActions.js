import c from '../constants/constants'
import m from '../constants/Mocks'

var ActionTypes = c.ActionTypes


export function fetchEvents() {
  return function (dispatch) {
    dispatch( function() { return {
        type: ActionTypes.FETCHING_EVENTS,
      }}())
    setTimeout(function(){
      dispatch( function() { return {
        type: ActionTypes.EVENTS_FETCHED,
        value: m.EVENTS
        }}())
    }, 1000)
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
