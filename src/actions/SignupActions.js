import c from '../constants/constants'
import AuthService from '../utils/AuthService'
import * as LoginActions from './LoginActions'
import CueupService from '../utils/CueupService'
import Formatter from '../utils/Formatter'
const cueup = new CueupService()

var ActionTypes = c.ActionTypes
const auth = new AuthService()

/*eslint no-undef: 0*/
var geocoder = new google.maps.Geocoder()


function getNameParts(name){
  if (name.indexOf(' ') === -1)
     return {firstName: name, lastName: ""}
 else
      var firstName = name.substr(0, name.indexOf(' '))
      var lastName  = name.substr(name.indexOf(' '), name.lastIndexOf(''))
     return {firstName: firstName, lastName: lastName}
}

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

export function signup(form, isDj) {
  return function (dispatch) {
    dispatch( function() { return {type: ActionTypes.SIGNUP_REQUESTED} }() )
    switch (form.signup) {
      case "EMAIL":
        return signupEmail(form, handleSignupFeedback(dispatch, form, isDj))

      case "FACEBOOK":
        return LoginActions.loginFacebook(handleSignupFeedback(dispatch, form, isDj))


      case "SOUNDCLOUD":
        return LoginActions.loginSoundcloud(handleSignupFeedback(dispatch, form, isDj))

      default:

    }
  }
}

function createDJ(form, auth0Profile, geoResult){
      return {
          email: form.email || auth0Profile.email,
          picture: auth0Profile.picture_large || auth0Profile.picture,
          indentities: auth0Profile.identities,
          genres: form.genres,
          bio: form.bio || "",
          playingRadius: form.playingRadius || 25000,
          playingLocation: {
              lat: geoResult.position.lat,
              lng: geoResult.position.lng,
              name: form.location
          },
          app_metadata: {
              auth0Id: auth0Profile.user_id,
          },
          user_metadata: {
              geoip: auth0Profile.user_metadata.geoip,
              phone: form.phone || auth0Profile.user_metadata.phone,
              birthDay: auth0Profile.birthday || Formatter.date.FromEUStringToUSDate(form.birthday),
              firstName: getNameParts(form.name || auth0Profile.name).firstName,
              lastName: getNameParts(form.name || auth0Profile.name).lastName
          }
      }
}


function createCustomer(form, auth0Profile){
  return {
      email: form.email || auth0Profile.email,
      picture: auth0Profile.picture_large || auth0Profile.picture,
      indentities: auth0Profile.identities,
      app_metadata: {
          auth0Id: auth0Profile.user_id,
      },
      user_metadata: {
          geoip: auth0Profile.user_metadata.geoip,
          phone: form.phone || auth0Profile.user_metadata.phone,
        //  birthDay: auth0Profile.birthday || form.birthday || null,
          firstName: getNameParts(form.name || auth0Profile.name).firstName,
          lastName: getNameParts(form.name || auth0Profile.name).lastName
      }
  }
}

//Create the user
function postUser(token, user, dispatch){
  cueup.createUser(token, user, (error, cueupResult) => {
      if (error) {
          dispatch(function() {
              return {type: ActionTypes.SIGNUP_FAILED, err: error.message}
          }())
      } else {
          dispatch(function() {
              return {type: ActionTypes.SIGNUP_SUCCEEDED}
          }())

          LoginActions.checkForLogin(false)(dispatch)
      }
  })
}


  export function handleSignupFeedback(dispatch, form, isDJ = false) {
    return function(err, result) {
        if (err) {
            dispatch(function() {
                return {type: ActionTypes.SIGNUP_FAILED, err}
            }())
        } else {

          auth.setToken(result.idToken)
          auth.getProfileFromToken(result.idToken, function(auth0Profile){

          if (isDJ){
            //Getting the coordinates of the playing location
            codeAddress(form.location, function(geoResult) {
                if (geoResult.error) {
                    dispatch(function() {
                        return {
                            type: ActionTypes.SIGNUP_FAILED,
                            err: "Error defining location: " + geoResult.error
                        }
                    }())
                    return
                  }

                //If the geocoding does not fail
                else {
                  var user = createDJ(form, auth0Profile, geoResult)
                  postUser(result.idToken, user, dispatch)
                }})

            //If it is not a dj
            } else {
              var user = createCustomer(form, auth0Profile)
              postUser(result.idToken, user, dispatch)
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
