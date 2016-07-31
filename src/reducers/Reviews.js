import c from '../constants/constants'

var ActionTypes = c.ActionTypes


const initialState = { //define initial state - an empty form
  values:[]
}

const reviews = (state = initialState, action) => {
  switch (action.type) {
  case ActionTypes.FETCHING_REVIEWS:
      return {
              isWaiting: true
             }
  case ActionTypes.REVIEWS_FETCHED:
      return {
        values: action.value,
        isWaiting: false
             }
 case ActionTypes.REVIEWS_FETCH_FAILED:
     return {
       err: action.err,
       isWaiting: false
            }

  default:
    return state
  }
}

export default reviews
