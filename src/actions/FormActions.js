import c from '../constants/constants'

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

export function resetForm(formName) {
  return {
    type: ActionTypes.FORM_RESET,
    formName
  }
}
