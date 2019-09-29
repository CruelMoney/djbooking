import c from "../constants/constants";
import { combineReducers } from "redux";
import assign from "lodash/assign";

var ActionTypes = c.ActionTypes;

const initialState = {
  //define initial state - an empty form
};

const filters = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.FORM_UPDATE_FILTERS:
      return assign({}, state, {
        [action.filter]: action.value
      });

    case ActionTypes.FORM_RESET:
      return initialState;

    default:
      return state;
  }
};

const values = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.FORM_UPDATE_VALUE:
      return assign({}, state, {
        [action.name]: action.value
      });

    case ActionTypes.FORM_RESET:
      return initialState;

    default:
      return state;
  }
};

const status = (state = { loading: {}, succeeded: {} }, action) => {
  switch (action.type) {
    case ActionTypes.FORM_RESET:
      return initialState;
    case ActionTypes.FORM_SUBMIT_REQUESTED:
      return {
        succeeded: assign({}, state.succeeded, {
          [action.submitName]: false
        }),
        loading: assign({}, state.loading, {
          [action.submitName]: true
        })
      };
    case ActionTypes.FORM_SUBMIT_FAILED:
      return {
        succeeded: assign({}, state.succeeded, {
          [action.submitName]: false
        }),
        loading: assign({}, state.loading, {
          [action.submitName]: false
        }),
        err: action.err
      };
    case ActionTypes.FORM_SUBMIT_SUCCEEDED:
      return {
        succeeded: assign({}, state.succeeded, {
          [action.submitName]: true
        }),
        loading: assign({}, state.loading, {
          [action.submitName]: false
        })
      };
    case ActionTypes.FORM_RESET_STATUS:
      return {
        succeeded: assign({}, state.succeeded, {
          [action.submitName]: false
        }),
        loading: assign({}, state.loading, {
          [action.submitName]: false
        })
      };
    default:
      return state;
  }
};

export default combineReducers({
  values,
  filters,
  status
});
