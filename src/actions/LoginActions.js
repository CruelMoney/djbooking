import c from '../constants/constants'
import AuthService from '../utils/AuthService'
import CueupService from '../utils/CueupService'
import converter from '../utils/AdapterDTO'



var ActionTypes = c.ActionTypes
const auth = new AuthService()
const cueup = new CueupService()


  const handleCueupFeedBack = (dispatch, callback, redirect) =>{
       return (error, result)=>{
              if (error) {
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
  return function (err, result) {
      if (err){
        dispatch( function() { return {
            type: ActionTypes.LOGIN_FAILED,
            err : err.message
          }}())
          callback(err.message)
      }else {
        const token = result.idToken;
        cueup.getOwnUser(token, handleCueupFeedBack(dispatch, callback, redirect))
      }
    }
}

/**
 * Checking if theres an token stored locally
 * And keeps the state updated accordingly
 * @param  {Boolean} [redirect=true] if true the function will push
 * the appropriate window location to the front
 */
export function checkForLogin(redirect = null){
  return function(dispatch){
    if (auth.loggedIn()) {
      dispatch( function() { return {type: ActionTypes.LOGIN_REQUESTED} }())
      const token = auth.getToken()
      handleLoginFeedback(dispatch, (err,res)=>{})(null, {idToken:token}) 
    }else{
      //If trying to access user restricted area, but not logged in
      // if (window.location.pathname.split('/')[1] === 'user') {
      //     if (redirect) {browserHistory.push('/') }
      // }
    }
  }
}




export function login(form, redirect, callback){
  return function (dispatch) {
    // First dispatch: the app state is updated to inform
    // that the API call is starting.

    dispatch( function() { return {type: ActionTypes.LOGIN_REQUESTED} }() )
      switch (form.type) {
        case "EMAIL":
          return loginEmail(form, handleLoginFeedback(dispatch, callback, redirect))

        case "FACEBOOK":
          return loginFacebook(handleLoginFeedback(dispatch, callback, redirect))

        case "SOUNDCLOUD":
          return loginSoundcloud(handleLoginFeedback(dispatch, callback, redirect))

        default:
      }
  }
}

export function loginFacebook(callback) {
      auth.login({
        popup: true,
        sso: false,
        connection: 'facebook',
        responseType: 'token',
      }, callback)
}

export function loginSoundcloud(callback) {
      auth.login({
        popup: true,
        sso: false,
        connection: 'soundcloud',
        responseType: 'token',
      }, callback)
}

export function loginEmail(form, callback) {
      auth.login({
        connection: 'Username-Password-Authentication',
        sso: false,
        responseType: 'token',
        email: form.email,
        password: form.password,
      }, callback)
}

export function userLogout() {
     auth.logout()
      return  {
          type: ActionTypes.LOGOUT_SUCCEEDED
        }
}
