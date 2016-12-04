import c from '../constants/constants'
import AuthService from '../utils/AuthService'
import converter from '../utils/AdapterDTO'
import CueupService from '../utils/CueupService'
import StripeService from '../utils/StripeService'

const cueup = new CueupService()
const auth = new AuthService()
const stripe = new StripeService()

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


  export function deleteProfile(callback) {
    return function(dispatch){

    const token = auth.getToken()
    cueup.deleteUser(token, function(err, result){
      if (err) {
        (callback(err))
      }else{
        (callback(null))
      }
    })
  }
  }

  export function changePassword(email, callback) {
    return function(dispatch){

    auth.requestPasswordChange(email, function(err, result){
      if (err) {
        (callback(err))
      }else{
        (callback(null))
      }
    })
  }
  }


  export function checkEmail(email, callback){
    return function (dispatch) {
          auth.checkEmailExists(email, function(err, result){
            if (err) {
              (callback(err))
            }else{
              dispatch( function() { return {type: ActionTypes.CHECK_EMAIL_SUCCEEDED, value: result} }() )
              callback(null)
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


export function updatePayoutInfo(data, callback) {
  return function(dispatch){

  stripe.createBankToken(data, (err, result)=>{
    if (err) {
      (callback(err))
    }else{
      const token = auth.getToken()

      data = {
        token: result.id,
        zip: data.bank_zip,
        address: data.bank_address,
        city: data.bank_city
      }
      cueup.updateUserBankInfo(token, data, function(err, result){
        if (err) {
          (callback(err))
        }else{
          (callback(null))
        }
      })

    }
  });

}
}


export function updateSettings(settings, callback) {
  return function(dispatch){
  const data = converter.settings.toDTO(settings)

  const token = auth.getToken()
  cueup.updateSettings(token, data, function(err, result){
    if (err) {
      (callback(err))
    }else{
      (callback(null))
    }
  })
}
}