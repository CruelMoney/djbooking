import { combineReducers } from 'redux'
import form from './Form'
import user from './User'
import gigs from './Gigs'
import reviews from './Reviews'





const store = combineReducers({
  form,
  gigs,
  reviews,
  user
})

export default store
