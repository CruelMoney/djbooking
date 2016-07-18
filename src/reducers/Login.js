import c from '../constants/constants';
import assign from 'lodash.assign';

var ActionTypes = c.ActionTypes;

const initialState = { //define initial state - an empty form
  signedIn: false,
};

const login = (state = initialState, action) => {
  console.log(action);
  switch (action.type) {
  case ActionTypes.LOGIN_REQUESTED:
      return {
              isWaiting: true
             }
       break
  case ActionTypes.LOGIN_SUCCEEDED:
      return {
        signedIn: true,
        profile: action.profile,
        isWaiting: false
             }
       break
 case ActionTypes.LOGIN_FAILED:
     return {
       signedIn: false,
       err: action.err,
       isWaiting: false
            }
      break
  case ActionTypes.LOGOUT_SUCCEEDED:
      return initialState
      break
  default:
    return state;
  }
}

export default login
