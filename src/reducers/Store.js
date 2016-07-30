import { combineReducers } from 'redux'
import form from './Form'
import user from './User'




const store = combineReducers({
  form,
  user
})

export default store
