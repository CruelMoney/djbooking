import { combineReducers } from 'redux'
import forms from './Forms'
import user from './User'
import gigs from './Gigs'
import reviews from './Reviews'
import signup from './Signup'
import login from './Login'





const store = combineReducers({
  forms,
  gigs,
  reviews,
  user,
  signup,
  login
})

export default store
