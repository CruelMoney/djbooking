import assign from "lodash/assign";
import form from "./Form";

const initialState = {
  //define initial state - an empty form
};

const forms = (state = initialState, action) => {
  return assign({}, state, {
    [action.formName]: form(state[action.formName], action)
  });
};

export default forms;
