import c from '../constants/constants'

var ActionTypes = c.ActionTypes


const initialState = { //define initial state - an empty form
  values:[],
  isWaiting: false
}

const events = (state = initialState, action) => {
  switch (action.type) {
  case ActionTypes.FETCHING_EVENTS:
      return {
              isWaiting: true
             }
  case ActionTypes.EVENTS_FETCHED:
      return {
        values: action.value,
        isWaiting: false
             }
 case ActionTypes.EVENTS_FETCH_FAILED:
     return {
       err: action.err,
       isWaiting: false
            }

  default:
    return state
  }
}

export default events
