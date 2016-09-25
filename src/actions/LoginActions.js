import c from '../constants/constants'
import AuthService from '../utils/AuthService'
import AdapterDTO from '../utils/AdapterDTO'
import { browserHistory } from 'react-router'

var ActionTypes = c.ActionTypes
const auth = new AuthService()
const converter = new AdapterDTO()


function handleLoginFeedback(dispatch){
return function (err, result) {
    if (err){
      dispatch( function() { return {
          type: ActionTypes.LOGIN_FAILED,
          err : err.message
        }}())

    }else {
      auth.setToken(result.idToken)
      auth.getProfileFromToken(result.idToken, function(dtoProfile){

        //Hack for checking if user trying to login before signing up.
        //The user will still get created in the db without any info
        if (dtoProfile.user_metadata !== undefined && dtoProfile.user_metadata.genres) {

          const profile = converter.convertDTO(dtoProfile)
          const token = result.idToken;

          dispatch (function() {return {
              type: ActionTypes.LOGIN_SUCCEEDED,
              profile,
              token
            }}())

        }else{
            dispatch (function() {return {
                type: ActionTypes.LOGIN_FAILED,
                err: "The user is not signed up"
              }}())
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
export function checkForLogin(redirect = true){
  return function(dispatch){
    if (auth.loggedIn()) {
          auth.getProfileFromStoredToken(function(err, DTOProfile){
            if (err) {
              dispatch( function() { return {
                  type: ActionTypes.LOGIN_FAILED,
                  err:  err.message
                }}())
                if (redirect) {browserHistory.push('/')}
            }else {
              const profile = converter.convertDTO(DTOProfile)
              const token = auth.getToken();

              dispatch (function() {return {
                  type: ActionTypes.LOGIN_SUCCEEDED,
                  profile,
                  token

                }}())
                if (redirect) {browserHistory.push('/user/profile') }
            }
      })
    }else{
      //If trying to access user restricted area, but not logged in
      if (window.location.pathname.split('/')[1] === 'user') {
          if (redirect) {browserHistory.push('/') }
      }
    }
  }
}


export function login(form){
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
        return loginEmail(form, handleLoginFeedback(dispatch))

      case "FACEBOOK":
        return loginFacebook(handleLoginFeedback(dispatch))


      case "SOUNDCLOUD":
        return loginSoundcloud(handleLoginFeedback(dispatch))

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
