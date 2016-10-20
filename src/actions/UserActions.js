import c from '../constants/constants'
import AuthService from '../utils/AuthService'
import converter from '../utils/AdapterDTO'
import CueupService from '../utils/CueupService'
const cueup = new CueupService()
const auth = new AuthService()

var ActionTypes = c.ActionTypes

  export function save(profile){
    return function (dispatch) {
      dispatch( function() { return {type: ActionTypes.UPDATEPROFILE_REQUESTED} }() )
          const token = auth.getToken()
          const data = converter.user.toDTO(profile)
          cueup.updateUser(token, data, function(err, result){
            if (err) {
              dispatch( function() { return {type: ActionTypes.UPDATEPROFILE_FAILED, err: err.message}}() )
            }else{
              dispatch( function() { return {type: ActionTypes.UPDATEPROFILE_SUCCEEDED, profile} }() )
            }
          })
        }
  }


  export function deleteProfile(){
    return function (dispatch) {
      dispatch( function() { return {type: ActionTypes.DELETE_PROFILE_REQUESTED} }() )
          const token = auth.getToken()
          cueup.deleteUser(token, function(err, result){
            if (err) {
              dispatch( function() { return {type: ActionTypes.DELETE_PROFILE_FAILED, err: err.message}}() )
            }else{
              dispatch( function() { return {type: ActionTypes.DELETE_PROFILE_SUCCEEDED} }() )
            }
          })
        }
  }

  export function checkEmail(email){
    return function (dispatch) {
      dispatch( function() { return {type: ActionTypes.CHECK_EMAIL_REQUESTED} }() )
          cueup.checkEmailExists(email, function(err, result){
            if (err) {
              dispatch( function() { return {type: ActionTypes.CHECK_EMAIL_FAILED, err: err.message}}() )
            }else{
              dispatch( function() { return {type: ActionTypes.CHECK_EMAIL_SUCCEEDED, value: result} }() )
            }
          })
        }
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
  console.log(profile);
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
