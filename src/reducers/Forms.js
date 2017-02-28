import c from '../constants/constants'
import assign from 'lodash.assign'
import form from './Form'

var ActionTypes = c.ActionTypes




const initialState = { //define initial state - an empty form
}

const forms  = (state = initialState, action) => {
   return assign({}, state, {
              [action.formName]: form(state[action.formName], action)
    })
}

export default forms
