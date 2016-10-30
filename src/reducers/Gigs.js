import c from '../constants/constants'

var ActionTypes = c.ActionTypes


const initialState = { //define initial state - an empty form
  values:[]
}

const gigs = (state = initialState, action) => {
  switch (action.type) {
  case ActionTypes.FETCH_GIGS_REQUESTED:
      return {
              isWaiting: true
             }
  case ActionTypes.FETCH_GIGS_SUCCEEDED:
      return {
        values: action.gigs,
        isWaiting: false
             }
 case ActionTypes.FETCH_GIGS_FAILED:
     return {
       err: action.err,
       isWaiting: false
            }

  default:
    return state
  }
}

export default gigs
