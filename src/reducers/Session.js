import c from '../constants/constants'

var ActionTypes = c.ActionTypes


const initialState = {
    currency: localStorage.currency || "DKK",
    city: "",
    country: "",
    countryCode: localStorage.countryCode || "DK"
}

const session = (state = initialState, action) => {

    document.cookie = state

  switch (action.type) {
  case ActionTypes.CHANGE_CURRENCY:
        localStorage.currency = action.value
        return {...state,
                currency: action.value
                }
  case ActionTypes.SET_GEO_SESSION:
      return {...state,
              ...action.values,
              ...localStorage
            }

  default:
    return state
  }
}

export default session
