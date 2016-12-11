import AuthService from '../utils/AuthService'
import CueupService from '../utils/CueupService'
import Formatter from '../utils/Formatter'
import GeoCoder from '../utils/GeoCoder'
import LoginActions from './LoginActions'
const cueup = new CueupService()

const auth = new AuthService()

export function signup(form, isDj, callback) {
  return function (dispatch) {
    switch (form.signup) {
      case "EMAIL":
        return signupEmail(form, handleSignupFeedback(form, isDj, callback))

      case "FACEBOOK":
        return LoginActions.loginFacebook(handleSignupFeedback(form, isDj, callback))


      case "SOUNDCLOUD":
        return LoginActions.loginSoundcloud(handleSignupFeedback(form, isDj, callback))

      default:
        callback("Something went wrong")
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
          },
          app_metadata: {
              auth0Id: auth0Profile.user_id,
          },
          user_metadata: {
              geoip: auth0Profile.user_metadata.geoip,
              phone: form.phone || auth0Profile.user_metadata.phone,
              birthDay: auth0Profile.birthday || Formatter.date.FromEUStringToUSDate(form.birthday),
              firstName: Formatter.name.GetFirstAndLast(form.name || auth0Profile.name).firstName,
              lastName: Formatter.name.GetFirstAndLast(form.name || auth0Profile.name).lastName,
              city: form.location
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
          firstName: Formatter.name.GetFirstAndLast(form.name || auth0Profile.name).firstName,
          lastName: Formatter.name.GetFirstAndLast(form.name || auth0Profile.name).lastName
      }
  }
}




  export function handleSignupFeedback(form, isDJ = false, callback) {
    return function(err, result) {
        if (err) {
            callback(err)
        } else {

          auth.setToken(result.idToken)
          auth.getProfileFromToken(result.idToken, function(auth0Profile){

          if (isDJ){
            //Getting the coordinates of the playing location
            GeoCoder.codeAddress(form.location, function(geoResult) {
                if (geoResult.error) {
                    callback("The location could not be found, try another city.")
                    return
                  }

                //If the geocoding does not fail
                else {
                  var user = createDJ(form, auth0Profile, geoResult)
                  postUser(result.idToken, user, callback)
                }})

            //If it is not a dj
            } else {
              var user = createCustomer(form, auth0Profile)
              postUser(result.idToken, user, callback)
            }
          })
        }
    }
}

//Create the user
function postUser(token, user, callback){
  cueup.createUser(token, user, (error, cueupResult) => {
      if (error) {
          callback(error.message)
      } else {
        callback(null)
        //LoginActions.checkForLogin(false)(dispatch)
      }
  })
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
