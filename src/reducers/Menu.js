import c from '../constants/constants'
import assign from 'lodash.assign'

var ActionTypes = c.ActionTypes




const initialState = { //define initial state - an empty menu
    
}

//Action has a name and route
const menu  = (state = initialState, item) => {
  switch (item.type) {

  case ActionTypes.REGISTER_MENU_ITEM:
    return assign({}, state, {
              [item.name]: item.route
    })
 case ActionTypes.REMOVE_MENU_ITEM:
    return assign({}, state, {
              [item.name]: null
    })

  default:
    return state
  }
}

export default menu
