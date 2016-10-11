import c from '../constants/constants'

var ActionTypes = c.ActionTypes


const initialState = { //define initial state - an empty form
  values:[],
  isWaiting: false
}

const events = (state = initialState, action) => {
  switch (action.type) {
  case ActionTypes.FETCH_EVENTS_REQUESTED:
      return {
              isWaiting: true
             }
  case ActionTypes.FETCH_EVENTS_SUCCEEDED:
      return {
        values: action.value,
        isWaiting: false
             }
 case ActionTypes.FETCH_EVENTS_FAILED:
     return {
       err: action.err,
       isWaiting: false
            }

  default:
    return state
  }
}

export default events
