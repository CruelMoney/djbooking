import { combineReducers } from 'redux'
import forms from './Forms'
import user from './User'
import gigs from './Gigs'
import reviews from './Reviews'





const store = combineReducers({
  forms,
  gigs,
  reviews,
  user
})

export default store
