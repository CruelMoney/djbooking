import { combineReducers } from 'redux'
import forms from './Forms'
import user from './User'
import gigs from './Gigs'
import events from './Events'
import reviews from './Reviews'
import signup from './Signup'
import login from './Login'
import session from './Session'

import menu from './Menu'

import c from '../constants/constants'
var ActionTypes = c.ActionTypes


const store = combineReducers({
  forms,
  gigs,
  reviews,
  user,
  signup,
  login,
  events,
  menu,
  session
})

const rootReducer = (state, action) => {
  switch (action.type) {
  case ActionTypes.LOGOUT_SUCCEEDED:
      state = undefined
      break
      
  default:
      break
  }

  return store(state, action)
}

export default rootReducer
