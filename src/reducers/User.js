import c from "../constants/constants";
import assign from "lodash/assign";
import cloneDeep from "lodash/cloneDeep";

var ActionTypes = c.ActionTypes;

const initialState = {
  //define initial state - an empty form
  status: {
    isWaiting: true
  },
  profile: {}
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.FETCH_USER_REQUESTED:
      return assign({}, state, {
        status: {
          err: null,
          isWaiting: true
        }
      });

    case ActionTypes.FETCH_USER_SUCCEEDED:
      return assign({}, state, {
        status: {
          isWaiting: false
        },
        profile: cloneDeep(action.profile)
      });

    case ActionTypes.FETCH_USER_FAILED:
      return assign({}, state, {
        status: {
          err: action.err,
          isWaiting: true
        }
      });

    case ActionTypes.LOGIN_SUCCEEDED:
      if (state.profile.user_id) return state;
      return {
        ...state,
        status: {
          err: null,
          isWaiting: false
        },
        profile: cloneDeep(action.profile)
      };

    default:
      return state;
  }
};
