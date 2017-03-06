import c from '../constants/constants'
import assign from 'lodash.assign'
import profile from './Profile'
import cloneDeep from 'lodash/cloneDeep'



var ActionTypes = c.ActionTypes

const initialState = { //define initial state - an empty form
  status:{
            isWaiting: true,
        },
    profile:{}
}

export default (state = initialState, action) => {
  switch (action.type) {
 
 case ActionTypes.FETCH_USER_REQUESTED:
      return assign({}, state, {
        status:{
            err: null,
            isWaiting: true,
        }
      })

   case ActionTypes.FETCH_USER_SUCCEEDED:
       return assign({}, state, {
          status:{
            isWaiting: false,
        },
         profile: cloneDeep(action.profile )
       })

   case ActionTypes.FETCH_USER_FAILED:
      return assign({}, state, {
        status:{
            err: action.err,
            isWaiting: true,
        }
      })

  default:
    return state
  }
}
