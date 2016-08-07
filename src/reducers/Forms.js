import c from '../constants/constants'
import { combineReducers } from 'redux'
import assign from 'lodash.assign'
import form from './form'

var ActionTypes = c.ActionTypes




const initialState = { //define initial state - an empty form
}

const forms  = (state = initialState, action) => {
  switch (action.type) {

  case ActionTypes.FORM_UPDATE_FILTERS:
    return assign({}, state, {
              [action.formName]: form(state[action.formName], action)
    })

  case ActionTypes.FORM_RESET:
     return assign({}, state, {
              [action.formName]: form(state[action.formName], action)
    })

  case ActionTypes.FORM_UPDATE_VALUE:
    return assign({}, state, {
              [action.formName]: form(state[action.formName], action)
    })
  case ActionTypes.FORM_SUBMIT_REQUESTED:
    return assign({}, state, {
              [action.formName]: form(state[action.formName], action)
    })
  case ActionTypes.FORM_SUBMIT_FAILED:
    return assign({}, state, {
              [action.formName]: form(state[action.formName], action)
    })
  case ActionTypes.FORM_SUBMIT_SUCCEEDED:
    return assign({}, state, {
              [action.formName]: form(state[action.formName], action)
    })



  default:
    return state
  }
}

export default forms
