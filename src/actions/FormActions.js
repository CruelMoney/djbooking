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

export function submitRequested(formName, submitName) {
  return {
    type: ActionTypes.FORM_SUBMIT_REQUESTED,
    formName,
    submitName
  }
}


export function handleSubmitResult(formName, err, submitName) {
  return function(dispatch) {
    if (err) {
      dispatch(function() {
        return {
        type: ActionTypes.FORM_SUBMIT_FAILED,
        formName,
        submitName,
        err: err
      }}())
    }else{
      dispatch(function() { return {
        type: ActionTypes.FORM_SUBMIT_SUCCEEDED,
        formName,
        submitName
      }}())
    }
  }
}


export function resetForm(formName) {
  return {
    type: ActionTypes.FORM_RESET,
    formName
  }
}
