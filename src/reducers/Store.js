import { combineReducers } from 'redux'
import form from './Form'
import user from './User'
import {reducer as formReducer} from 'redux-form'




const store = combineReducers({
  formReducer,
  form,
  user
})

export default store
