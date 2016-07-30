import c from '../constants/constants'
import AuthService from '../utils/AuthService'
import AdapterDTO from '../utils/AdapterDTO'
import { browserHistory } from 'react-router'
import m from '../constants/Mocks'

var ActionTypes = c.ActionTypes
const auth = new AuthService()
const converter = new AdapterDTO()
var geocoder = new google.maps.Geocoder()


function codeAddress(address, callback)  {
  console.log(address)
  geocoder.geocode( { 'address': address}, function(results, status) {
       if (status == google.maps.GeocoderStatus.OK) {
         var lat = (results[0].geometry.location.lat())
         var lng = (results[0].geometry.location.lng())
        return callback({error: null, position:{lat: lat, lng: lng }})
       } else {
         return callback({error: ("Geocode was not successful for the following reason: " + status), position:null})
       }
     })
   }


export function updateFormValue(name, value) {
  return {
    type: ActionTypes.FORM_UPDATE_VALUE,
    name, value
  }
}

export function updateFilters(filter, value) {
  return {
    type: ActionTypes.FORM_UPDATE_FILTERS,
    filter, value
  }
}

export function resetForm() {
  return {
    type: ActionTypes.FORM_RESET
  }
}

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


export function signup(form) {
  return function (dispatch) {
    dispatch( function() { return {type: ActionTypes.SIGNUP_REQUESTED} }() )
    switch (form.signup) {
      case "EMAIL":
        return signupEmail(form, handleSignupFeedback(dispatch, form))

      case "FACEBOOK":
        return loginFacebook(handleSignupFeedback(dispatch, form))


      case "SOUNDCLOUD":
        return loginSoundcloud(handleSignupFeedback(dispatch, form))

    }
  }
}

  export function handleSignupFeedback(dispatch, form){
    return function (err, result) {
      if (err){
        dispatch( function() { return {
            type: ActionTypes.SIGNUP_FAILED,
            err
          }}())

      }else {
        //Getting the coordinates of the address
        codeAddress(form.location, function(geoResult){
          if (geoResult.error) {
            dispatch( function() { return {
                type: ActionTypes.SIGNUP_FAILED,
                err: geoResult.error
              }}())
          }else{
            const data = {
              user_metadata: {
                locationCoords : geoResult.position,
                location:        form.location,
                genres:          form.genres,
                name:            form.name ? form.name : ""
              },
            }

            auth.setToken(result.idToken)
            auth.getProfileFromToken(result.idToken, function(profile){
              updateProfile(profile.user_id, data, result.idToken, function(err2, result2){
                if (err2) {
                  dispatch( function() { return {
                      type: ActionTypes.SIGNUP_FAILED,
                      err: err2.message
                    }}())
                }else{
                  dispatch (function() {return {
                      type: ActionTypes.SIGNUP_SUCCEEDED
                    }}())

                  checkForLogin()(dispatch)
                }
              })(dispatch)
            })
          }
        })
      }
      }
}

export function signupEmail(form, callback) {
      auth.signup({
        popup: true,
        connection: 'Username-Password-Authentication',
        responseType: 'token',
        email: form.email,
        password: form.password,
      }, callback)
}


function handleLoginFeedback(dispatch){
return function (err, result) {
    if (err){
      dispatch( function() { return {
          type: ActionTypes.LOGIN_FAILED,
          err
        }}())

    }else {
      auth.setToken(result.idToken)
      auth.getProfileFromToken(result.idToken, function(dtoProfile){

        //Hack for checking if user trying to login before signing up
        if (dtoProfile.user_metadata !== undefined && dtoProfile.user_metadata.genres) {

          const profile = converter.convertDTO(dtoProfile)

          dispatch (function() {return {
              type: ActionTypes.LOGIN_SUCCEEDED,
              profile
            }}())
          browserHistory.push('/user/profile')

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

export function checkForLogin(){
  return function(dispatch){
    if (auth.loggedIn()) {
          auth.getProfileFromStoredToken(function(err, dtoProfile){
            if (err) {
              dispatch( function() { return {
                  type: ActionTypes.LOGIN_FAILED,
                  err
                }}())
            }else {
              console.log(dtoProfile)
              const profile = converter.convertDTO(dtoProfile)

              dispatch (function() {return {
                  type: ActionTypes.LOGIN_SUCCEEDED,
                  profile
                }}())
              browserHistory.push('/user/profile')
            }
      })
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

export function fetchGigs() {
  return function (dispatch) {
    dispatch( function() { return {
        type: ActionTypes.FETCHING_GIGS,
      }}())
    setTimeout(function(){
      dispatch( function() { return {
        type: ActionTypes.GIGS_FETCHED,
        value: m.GIGS
        }}())
    }, 1000)
      }
}
