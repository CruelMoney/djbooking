import c from '../constants/constants';

var ActionTypes = c.ActionTypes;


const initialState = { //define initial state - an empty form

};

const signup = (state = initialState, action) => {
  console.log(action);
  switch (action.type) {
  case ActionTypes.SIGNUP_REQUESTED:
      return {
              isWaiting: true
             }
       break
  case ActionTypes.SIGNUP_SUCCEEDED:
      return {
        signedUp: true,
        isWaiting: false
             }
       break
 case ActionTypes.SIGNUP_FAILED:
     return {
       signedUp: false,
       err: action.err,
       isWaiting: false
            }
      break

  default:
    return state;
  }
}

export default signup
