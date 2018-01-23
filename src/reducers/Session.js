import c from '../constants/constants'

var ActionTypes = c.ActionTypes


let initialState = {
  currency: "DKK",
  city: "",
  country: "",
  countryCode: "DK",
  promises: []
}

const session = (state = initialState, action) => {

  //  document.cookie = state

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
  
  case ActionTypes.PUSH_PROMISE:
    return {
        ...state,
        promises:[ ...state.promises, action.promise ]
      }

  default:
    return state
  }
}

export default session
