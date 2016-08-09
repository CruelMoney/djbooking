import c from '../constants/constants'
import AuthService from '../utils/AuthService'
import AdapterDTO from '../utils/AdapterDTO'

var ActionTypes = c.ActionTypes
const auth = new AuthService()
const converter = new AdapterDTO()




export function updateProfile(userId, data, token, callback) {
  return function (dispatch) {
    dispatch( function() { return {type: ActionTypes.UPDATEPROFILE_REQUESTED} }() )
        auth.updateProfile(userId, data, token, function(err, result){
          if (err) {
            dispatch( function() { return {type: ActionTypes.UPDATEPROFILE_FAILED, err: err.message}}() )
          }else{

            const newProfile = converter.convertDTO(result)
            dispatch( function() { return {type: ActionTypes.UPDATEPROFILE_SUCCEEDED, newProfile} }() )
          }
          return callback(err, result)
        })

      }
  }

  export function updateFullProfile(profile){
   return {type: ActionTypes.UPDATEPROFILE_SUCCEEDED, profile}
  }



export function toggleEditMode() {
      return  {
          type: ActionTypes.TOGGLE_EDIT_MODE
        }
}

export function updateProfileValue(name, value) {
      return  {
          type: ActionTypes.UPDATE_PROFILE_VALUE,
          name,
          value
        }
}

export function resetProfile(profile) {
  return function (dispatch) {
    dispatch( function() { return {
        type: ActionTypes.RESET_PROFILE,
        profile
      }}())
    dispatch( function() { return {
      type: ActionTypes.TOGGLE_EDIT_MODE
      }}())
      }
}
