import c from '../constants/constants'
import AuthService from '../utils/AuthService'
import AdapterDTO from '../utils/AdapterDTO'
import { browserHistory } from 'react-router'
import m from '../constants/Mocks'

var ActionTypes = c.ActionTypes

export function updateFormValue(name, value, formName) {
  return {
    type: ActionTypes.FORM_UPDATE_VALUE,
    name, value, formName
  }
}

export function updateFilters(filter, value, formName) {
  return {
    type: ActionTypes.FORM_UPDATE_FILTERS,
    filter, value, formName
  }
}

/**
 * The action creator for submitting for. Makes us able to show loading
 * @param  {[type]} formName     the name of the form
 * @param  {[type]} submitAction the action that should happen when submitting.
 *                               needs a callback for updating state when finished
 */
export function submitForm(formName, submitAction) {
  return function(dispatch){
    dispatch( function() { return {type: ActionTypes.FORM_SUBMIT_REQUESTED, formName} }() )
    submitAction(function(err=null){
      if (err) {
        dispatch( function() { return {type: ActionTypes.FORM_SUBMIT_FAILED, formName, err: err.message}}() )
      }else{
        dispatch( function() { return {type: ActionTypes.FORM_SUBMIT_SUCCEEDED, formName} }() )
      }
    })
  }
}

export function resetForm(formName) {
  return {
    type: ActionTypes.FORM_RESET,
    formName
  }
}
