import c from '../constants/constants'
import assign from 'lodash.assign'
import profile from './Profile'



var ActionTypes = c.ActionTypes

const initialState = { //define initial state - an empty form
  signedIn: false,
  isWaiting: false,
  isRedirect: false,
  editMode: false,
  onlyAuth: false,
  publicProfileMode: false
}

const status = (state = initialState, action) => {
  switch (action.type) {

  case ActionTypes.CHECK_EMAIL_SUCCEEDED:
      return assign({}, state, {
              emailExists: action.value
            })

  case ActionTypes.LOGIN_REQUESTED:
      return assign({}, state, {
              isWaiting: true,
              isRedirect: false
            })
        
    case ActionTypes.LOGIN_REQUESTED_REDIRECT:
        return assign({}, state, {
                isWaiting: true,
                isRedirect:true
                })

  case ActionTypes.LOGIN_SUCCEEDED:
      return assign({}, state, {
        signedIn: !!action.loggedInCueup,
        onlyAuth: !action.loggedInCueup,
        isWaiting: false,
        isRedirect: false
      })

 case ActionTypes.LOGIN_FAILED:
     return assign({}, state, {
       signedIn: false,
       err: action.err,
       isWaiting: false,
       isRedirect: false
     })

  case ActionTypes.LOGOUT_SUCCEEDED:
      return initialState
  case ActionTypes.UPDATEPROFILE_REQUESTED:
      return assign({}, state, {
                isWaiting: true
             })
 case ActionTypes.UPDATEPROFILE_SUCCEEDED:
     return  assign({}, state, {
               isWaiting: false
            })


 case ActionTypes.UPDATEPROFILE_FAILED:
     return assign({}, state, {
               err: action.err,
               isWaiting: false
            })

  case ActionTypes.TOGGLE_EDIT_MODE:
      return  assign({}, state, {
                editMode: !state.editMode,
             })

   case ActionTypes.DELETE_PROFILE_REQUESTED:
       return assign({}, state, {
               isWaiting: true
             })

   case ActionTypes.DELETE_PROFILE_SUCCEEDED:
       return assign({}, state, {
         signedIn: false,
         isWaiting: false
       })

   case ActionTypes.DELETE_PROFILE_FAILED:
      return assign({}, state, {
        signedIn: true,
        err: action.err,
        isWaiting: false
      })

    case ActionTypes.UPDATE_GEOLOCATION:
      return assign({}, state, {
              geoLocation: action.value
            })
    case ActionTypes.TOGGLE_PUBLIC_PROFILE:
        return assign({}, state, {
            publicProfileMode: !state.publicProfileMode
            })

  default:
    return state
  }
}

const editableProfile = (state = {}, action, profile) => {

    switch (action.type) {

    case ActionTypes.LOGOUT_SUCCEEDED:
        return {}

    case ActionTypes.TOGGLE_EDIT_MODE:
        return  assign({}, profile)

    case ActionTypes.UPDATE_PROFILE_VALUE:
        return  assign({}, state, {
            [action.name]: action.value
        })

   default:
       return state

   }
  }


function composition(state = {}, action) {
  let statusResult =            status(state.status, action)
  let profileResult =           profile(state.profile, action)
  let editableProfileResult =   editableProfile(state.editableProfile, action, profileResult)

  return { status:            statusResult,
           profile:           profileResult,
           editableProfile:   editableProfileResult
          }
}

export default composition
