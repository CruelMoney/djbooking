import { combineReducers } from 'redux'
import form from './Form'
import user from './User'
import gigs from './Gigs'




const store = combineReducers({
  form,
  gigs,
  user
})

export default store
