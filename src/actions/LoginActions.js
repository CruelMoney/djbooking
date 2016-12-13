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

      auth.setToken(result.idToken)
      cueup.getUser(result.idToken, (error, result)=>
      {
        if (error) {
          dispatch (function() {return {
              type: ActionTypes.LOGIN_FAILED,
              err: error.message
            }}())
            callback(error.message)
        }else{
          dispatch (function() {return {
              type: ActionTypes.LOGIN_SUCCEEDED,
              profile: converter.user.fromDTO(result)
            }}())
          callback(null)
        }
      })
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
      cueup.getUser(auth.getToken(), (error, result)=>
      {
        if (error) {
          dispatch( function() { return {
              type: ActionTypes.LOGIN_FAILED,
              err:  ""
            }}())
            if (redirect) {browserHistory.push('/')}
        }else{
          dispatch (function() {return {
              type: ActionTypes.LOGIN_SUCCEEDED,
              profile: converter.user.fromDTO(result)
            }}())
          if (redirect) {
            console.log("redirecting!");
            browserHistory.push(redirect) }
        }
      })

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

    // The function called by the thunk middleware can return a value,
    // that is passed on as the return value of the dispatch method.

    // In this case, we return a promise to wait for.
    // This is not required by thunk middleware, but it is convenient for us.

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
        connection: 'facebook',
        responseType: 'token',
      }, callback)
}

export function loginSoundcloud(callback) {
      auth.login({
        popup: true,
        connection: 'soundcloud',
        responseType: 'token',
      }, callback)
}

export function loginEmail(form, callback) {
    console.log(form);
      auth.login({
        connection: 'Username-Password-Authentication',
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
