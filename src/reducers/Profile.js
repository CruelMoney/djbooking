import c from '../constants/constants';
import assign from 'lodash.assign';
import cloneDeep from 'lodash/cloneDeep';



var ActionTypes = c.ActionTypes;

const initialState = { //define initial state - an empty form

};

const profile = (state = initialState, action) => {
  switch (action.type) {

  case ActionTypes.LOGIN_SUCCEEDED:
      return   cloneDeep(action.profile )
       break

  case ActionTypes.UPDATEPROFILE_SUCCEEDED:
     return  cloneDeep(action.profile )
     break

  case ActionTypes.LOGOUT_SUCCEEDED:
      return initialState
      break


 default:
     return state;

 }
}

 export default profile
