import c from '../constants/constants'


var ActionTypes = c.ActionTypes


const initialState = { //define initial state - an empty form
isWaiting: false
}

const signup = (state = initialState, action) => {
  switch (action.type) {
  case ActionTypes.SIGNUP_REQUESTED:
      return {
              isWaiting: true
             }
  case ActionTypes.SIGNUP_SUCCEEDED:
      return {
        signedUp: true,
        isWaiting: false
             }

 case ActionTypes.SIGNUP_FAILED:
     return {
       signedUp: false,
       err: action.err,
       isWaiting: false
            }

  case ActionTypes.CHECK_EMAIL_REQUESTED:
  return {
          isWaiting: true
         }
   case ActionTypes.CHECK_EMAIL_SUCCEEDED:
       return {
         emailExists: action.value,
         isWaiting: false
              }

  case ActionTypes.CHECK_EMAIL_FAILED:
      return {
        emailExists: action.value,
        isWaiting: false
             }

  default:
    return state
  }
}

export default signup
