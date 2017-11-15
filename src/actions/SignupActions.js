import {
  authService as auth
} from '../utils/AuthService'
import CueupService from '../utils/CueupService'
import Formatter from '../utils/Formatter'
import GeoCoder from '../utils/GeoCoder'
import * as LoginActions from './LoginActions'
import * as tracker from '../utils/analytics/autotrack'
import {
  Environment
} from '../constants/constants'
const cueup = new CueupService()

export function signup(form, isDj, callback) {
  return function (dispatch) {
    try {
        const data = {
          form
        }

        switch (form.signup) {
          case "EMAIL":
            return signupEmail(data, callback)

          case "FACEBOOK":
            return LoginActions.loginFacebook(data)

          case "SOUNDCLOUD":
            return LoginActions.loginSoundcloud(data)

          default:
            callback("Something went wrong")
        }

    } catch (e) {
      callback("Something went wrong")
    } finally {}
  }
}


function createDJ(form, auth0Profile, geoResult) {
  return {
    email: form.email || auth0Profile.email,
    picture: auth0Profile.picture_large || auth0Profile.picture,
    indentities: auth0Profile.identities,
    genres: form.genres,
    bio: form.bio || "",
    playingRadius: form.playingRadius || 25000,
    playingLocation: {
      lat: !geoResult.error ? geoResult.position.lat : 55.6760979, // defaulting to copenhagen if theres an error finding the location
      lng: !geoResult.error ? geoResult.position.lng : 12.5683374, // defaulting to copenhagen if theres an error finding the location
    },
    app_metadata: {
      auth0Id: auth0Profile.user_id,
      referredBy: form.reference
    },
    user_metadata: {
      geoip: auth0Profile.user_metadata.geoip,
      phone: form.phone || auth0Profile.user_metadata.phone,
      // Some facebook users does not have birhtday 
      //birthDay: auth0Profile.birthday || Formatter.date.FromEUStringToUSDate(form.birthday),
      // birthDay: form.birthday ? Formatter.date.FromEUStringToUSDate(form.birthday) : Date.now(),
      firstName: Formatter.name.GetFirstAndLast(form.name || auth0Profile.name).firstName,
      lastName: Formatter.name.GetFirstAndLast(form.name || auth0Profile.name).lastName,
      city: form.location
    },
  }
}


function createCustomer(form, auth0Profile) {
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




export function finishSignup(form, isDJ = false, callback) {
  console.log(form)
}

//Create the user
function postUser(token, user, callback) {
  cueup.createUser(token, user, (error, cueupResult) => {
    if (error) {
      callback(error)
    } else {
      tracker.trackSignup()
      callback(null)
      //LoginActions.checkForLogin(false)(dispatch)
    }
  })
}

export function signupEmail({form}, callback) {
  auth.signup({
    connection: 'Username-Password-Authentication',
    email: form.email,
    password: form.password,
  }, callback);
}