import c from '../constants/constants'

var ActionTypes = c.ActionTypes

const initialState = { //define initial state - an empty form
  signedIn: false,
}

const login = (state = initialState, action) => {
  switch (action.type) {
  case ActionTypes.LOGIN_REQUESTED:
      return {
              isWaiting: true
             }

  case ActionTypes.LOGIN_SUCCEEDED:
      return {
        signedIn: true,
        profile: action.profile,
        isWaiting: false,
        token: action.token
             }

 case ActionTypes.LOGIN_FAILED:
     return {
       signedIn: false,
       err: action.err,
       isWaiting: false
            }
  case ActionTypes.LOGOUT_SUCCEEDED:
      return initialState

  default:
    return state
  }
}

export default login
