import c from '../constants/constants'

var ActionTypes = c.ActionTypes


const initialState = { //define initial state - an empty form
  values:[]
}

const reviews = (state = initialState, action) => {
  switch (action.type) {
  case ActionTypes.FETCH_REVIEWS_REQUESTED:
      return {
              isWaiting: true
             }
  case ActionTypes.FETCH_REVIEWS_SUCCEEDED:
      return {
        values: action.reviews,
        isWaiting: false
             }
 case ActionTypes.FETCH_REVIEWS_FAILED:
     return {
       err: action.err,
       isWaiting: false
            }

  default:
    return state
  }
}

export default reviews
