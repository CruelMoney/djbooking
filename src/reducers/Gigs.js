import c from '../constants/constants'

var ActionTypes = c.ActionTypes


const initialState = { //define initial state - an empty form
  values:[]
}

const gigs = (state = initialState, action) => {
  switch (action.type) {
  case ActionTypes.FETCHING_GIGS:
      return {
              isWaiting: true
             }
  case ActionTypes.GIGS_FETCHED:
      return {
        values: action.value,
        isWaiting: false
             }
 case ActionTypes.GIGS_FETCH_FAILED:
     return {
       err: action.err,
       isWaiting: false
            }

  default:
    return state
  }
}

export default gigs
