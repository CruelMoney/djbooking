import c from '../constants/constants'
import { combineReducers } from 'redux'
import assign from 'lodash.assign'
import signup from './Signup'

var ActionTypes = c.ActionTypes




const initialState = { //define initial state - an empty form
}

const filters  = (state = initialState, action) => {
  switch (action.type) {

  case ActionTypes.FORM_UPDATE_FILTERS:
    return assign({}, state, {

              [action.filter]: action.value

    })

  case ActionTypes.FORM_RESET:
    return initialState

  default:
    return state
  }
}

const values  = (state = initialState, action) => {
  switch (action.type) {

  case ActionTypes.FORM_UPDATE_VALUE:
    return assign({}, state, {
        [action.name]: action.value
    })

  case ActionTypes.FORM_RESET:
    return initialState

  default:
    return state
  }
}

export default combineReducers({
  values,
  filters,
  signup
})
