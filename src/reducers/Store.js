import { combineReducers } from 'redux'
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/es/storage'; // default: localStorage if web, AsyncStorage if react-native
import forms from './Forms'
import user from './User'
import gigs from './Gigs'
import events from './Events'
import reviews from './Reviews'
import signup from './Signup'
import login from './Login'
import session from './Session'
import notifications from './Notifications'

import menu from './Menu'

import c from '../constants/constants'
var ActionTypes = c.ActionTypes

const persistConfig = {
  key: 'root',
  storage
};

const store = combineReducers({
  forms,
  gigs,
  reviews,
  signup,
  events,
  menu,
  notifications,
  session,
  user:   persistReducer(persistConfig, user),
  login:  persistReducer(persistConfig, login),
});




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
