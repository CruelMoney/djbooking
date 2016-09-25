import c from '../constants/constants'
import AuthService from '../utils/AuthService'
import * as LoginActions from './LoginActions'
import * as UserActions from './UserActions'

var ActionTypes = c.ActionTypes
const auth = new AuthService()

/*eslint no-undef: 0*/
var geocoder = new google.maps.Geocoder()


function codeAddress(address, callback)  {
  geocoder.geocode( { 'address': address}, function(results, status) {
       if (status === google.maps.GeocoderStatus.OK) {
         var lat = (results[0].geometry.location.lat())
         var lng = (results[0].geometry.location.lng())
        return callback({error: null, position:{lat: lat, lng: lng }})
       } else {
         return callback({error: ("Geocode was not successful for the following reason: " + status), position:null})
       }
     })
   }

export function signup(form, isDJ = true) {
  return function (dispatch) {
    dispatch( function() { return {type: ActionTypes.SIGNUP_REQUESTED} }() )
    switch (form.signup) {
      case "EMAIL":
        return signupEmail(form, handleSignupFeedback(dispatch, form, isDJ))

      case "FACEBOOK":
        return LoginActions.loginFacebook(handleSignupFeedback(dispatch, form, isDJ))


      case "SOUNDCLOUD":
        return LoginActions.loginSoundcloud(handleSignupFeedback(dispatch, form, isDJ))

      default:

    }
  }
}

  export function handleSignupFeedback(dispatch, form, isDJ){
    return function (err, result) {
      if (err){
        dispatch( function() { return {
            type: ActionTypes.SIGNUP_FAILED,
            err
          }}())
      }else {
        //Getting the coordinates of the address
        codeAddress(form.location, function(geoResult){
          if (geoResult.error && isDJ) {
            dispatch( function() { return {
                type: ActionTypes.SIGNUP_FAILED,
                err: geoResult.error
              }}())

          }else{

            const data =
            isDJ ?
            {
              user_metadata: {
                locationCoords : geoResult.position,
                location:        form.location,
                genres:          form.genres,
                name:            form.name ? form.name : "",
                phone:           form.phone,
              },
            }
            :
            {
              user_metadata: {
                phone:           form.phone,
                name:            form.name ? form.name : ""
              },
            }

            auth.setToken(result.idToken)
            auth.getProfileFromToken(result.idToken, function(profile){
              UserActions.updateProfile(profile.user_id, data, result.idToken, function(err2, result2){
                if (err2) {
                  dispatch( function() { return {
                      type: ActionTypes.SIGNUP_FAILED,
                      err: err2.message
                    }}())


                }else{
                  dispatch (function() {return {
                      type: ActionTypes.SIGNUP_SUCCEEDED
                    }}())


                  LoginActions.checkForLogin(false)(dispatch)
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
