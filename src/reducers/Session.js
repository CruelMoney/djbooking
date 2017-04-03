import c from '../constants/constants'

var ActionTypes = c.ActionTypes


const initialState = {
    currency: localStorage.currency || "DKK"
}

const session = (state = initialState, action) => {

    document.cookie = state

  switch (action.type) {
  case ActionTypes.CHANGE_CURRENCY:
        localStorage.currency = action.value
        return {...state,
                currency: action.value
                }
  
  default:
    return state
  }
}

export default session
