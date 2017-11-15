import c from '../constants/constants'
import {authService as auth} from '../utils/AuthService'
import CueupService from '../utils/CueupService'
import converter from '../utils/AdapterDTO'



var ActionTypes = c.ActionTypes
const cueup = new CueupService()


  const handleCueupFeedBack = (dispatch, callback, redirect) =>{
       return (error, result)=>{
              if (error && error.message !== 'user not found') {
                  dispatch (function() {return {
                    type: ActionTypes.LOGIN_FAILED,
                    err: error.message
                  }}())
                  return callback(error.message)
              }
            var user = converter.user.fromDTO(result)  
            // dispatch (function() {return {
            //   type: ActionTypes.UPDATE_GEOLOCATION,
            //   value: authRes.user_metadata.geoip
            // }}())
            dispatch (function() {return {
                type: ActionTypes.LOGIN_SUCCEEDED,
                profile: user
              }}())
            callback(null, user)
          }
  }

function handleLoginFeedback(dispatch, callback, redirect = false){
  return function (err, token) {    
      if (err){
        dispatch( function() { return {
            type: ActionTypes.LOGIN_FAILED,
            err : err.message
          }}())
          callback(err.message)
      }else {
        auth.getProfileFromToken(token, (err, res)=>{
          if(err){
            dispatch( function() { return {
              type: ActionTypes.LOGIN_FAILED,
              err : err.message
            }}())
            callback(err.message)
          }else{
            dispatch( function() { return {
              type: ActionTypes.LOGIN_SUCCEEDED,
              profile : res,
              loggedInCueup: false
            }}())
            callback(null, res)
          }
        })
      }
    }
}


export function checkForLogin(){
  return function(dispatch){
    // Try parse hash
    auth.parseHash()
    .then((hash) =>{
      if(!!hash){
        dispatch( function() { return {type: ActionTypes.LOGIN_REQUESTED_REDIRECT} }());
        handleLoginFeedback(dispatch, (err,res)=>{})(null, hash.accessToken);
      }
    })
    .catch(err => {
      if (auth.loggedIn()) {
        console.log('logged in')
        dispatch( function() { return {type: ActionTypes.LOGIN_REQUESTED} }())
        const token = auth.getAccessToken();
        handleLoginFeedback(dispatch, (err,res)=>{})(null, token) 
      }else{
        err = {
          message: 'Error validating token'
        }
        handleLoginFeedback(dispatch, (err,res)=>{})(err, null)
      }
    });

    
  }
}




export function login(form){
  return function (dispatch) {
    // First dispatch: the app state is updated to inform
    // that the API call is starting.

    dispatch( function() { return {type: ActionTypes.LOGIN_REQUESTED} }() )
      switch (form.type) {
        case "EMAIL":
          return loginEmail(form, handleLoginFeedback(dispatch))

        case "FACEBOOK":
          return loginFacebook(handleLoginFeedback(dispatch))

        case "SOUNDCLOUD":
          return loginSoundcloud(handleLoginFeedback(dispatch))

        default:
      }
  }
}

export function loginFacebook() {
      auth.login({
        connection: 'facebook'
      })
}

export function loginSoundcloud() {
      auth.login({
        connection: 'soundcloud'
      })
}

export function loginEmail(form) {
      auth.login({
        connection: 'Username-Password-Authentication',
        sso: false,
        email: form.email,
        password: form.password,
      })
}

export function userLogout() {
     auth.logout()
      return  {
          type: ActionTypes.LOGOUT_SUCCEEDED
        }
}
