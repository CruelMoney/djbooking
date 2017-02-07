import c from '../constants/constants'
import AuthService from '../utils/AuthService'
import { browserHistory } from 'react-router'
import CueupService from '../utils/CueupService'
import converter from '../utils/AdapterDTO'



var ActionTypes = c.ActionTypes
const auth = new AuthService()
const cueup = new CueupService()



function handleLoginFeedback(dispatch, callback){
return function (err, result) {
    if (err){
      dispatch( function() { return {
          type: ActionTypes.LOGIN_FAILED,
          err : err.message
        }}())
        callback(err.message)
    }else {
      const token = result.idToken;
      auth.setToken(token)
      cueup.getUser(token, (error, result)=>
      {
        if (error) {
          dispatch (function() {return {
              type: ActionTypes.LOGIN_FAILED,
              err: error.message
            }}())
            callback(error.message)
        }else{
          var user = converter.user.fromDTO(result)
          
          auth.getProfileFromToken(token, (err, authProfile)=>{

         if(!err){
              dispatch (function() {return {
                type: ActionTypes.UPDATE_GEOLOCATION,
                value: authProfile.user_metadata.geoip
              }}())
            }


          dispatch (function() {return {
              type: ActionTypes.LOGIN_SUCCEEDED,
              profile: user
            }}())
          callback(null)
        
        })
      }})
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

      cueup.getUser(token, (error, result)=>
      {
        if (error) {
          dispatch( function() { return {
              type: ActionTypes.LOGIN_FAILED,
              err:  ""
            }}())
            if (redirect) {browserHistory.push('/')}
        }else{

          var user = converter.user.fromDTO(result)
          
          auth.getProfileFromToken(token, (err, authProfile)=>{
              
            if(!err){
              dispatch (function() {return {
                type: ActionTypes.UPDATE_GEOLOCATION,
                value: authProfile.user_metadata.geoip
              }}())
            }

          dispatch (function() {return {
              type: ActionTypes.LOGIN_SUCCEEDED,
              profile: user
            }}())
           if (redirect) {
            console.log("redirecting!");
            browserHistory.push(redirect) }
        })
        }})
    }else{
      //If trying to access user restricted area, but not logged in
      // if (window.location.pathname.split('/')[1] === 'user') {
      //     if (redirect) {browserHistory.push('/') }
      // }
    }
  }
}


export function login(form, callback){
  return function (dispatch) {


    // First dispatch: the app state is updated to inform
    // that the API call is starting.

    dispatch( function() { return {type: ActionTypes.LOGIN_REQUESTED} }() )


      switch (form.type) {
        case "EMAIL":
          return loginEmail(form, handleLoginFeedback(dispatch, callback))

        case "FACEBOOK":
          return loginFacebook(handleLoginFeedback(dispatch, callback))


        case "SOUNDCLOUD":
          return loginSoundcloud(handleLoginFeedback(dispatch, callback))

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
