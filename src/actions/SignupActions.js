import {
  authService as auth
} from '../utils/AuthService'
import CueupService from '../utils/CueupService'
import Formatter from '../utils/Formatter'
import GeoCoder from '../utils/GeoCoder'
import * as LoginActions from './LoginActions'
import * as tracker from '../utils/analytics/autotrack'
import {
  Environment,
  ActionTypes
} from '../constants/constants'
import converter from '../utils/AdapterDTO'

const cueup = new CueupService()

export function signup(form, isDj, callback) {
  return function (dispatch) {
    try {
        const data = {
          form
        }

        switch (form.signup) {
          case "EMAIL":
            return dispatch(signupEmail(data, callback))

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


function createDJ(form, auth0Profile) {
  const geoResult = form.playingLocation; 
  const user_metadata = auth0Profile['https://cueup.io/user_metadata'];
  return {
    email: form.email || auth0Profile.email,
    picture: auth0Profile.picture_large || auth0Profile.picture,
    genres: form.genres,
    bio: form.bio || "",
    playingRadius: form.playingRadius || 25000,
    playingLocation: {
      lat: geoResult.lat || 55.6760979, // defaulting to copenhagen if theres an error finding the location
      lng: geoResult.lng || 12.5683374, // defaulting to copenhagen if theres an error finding the location
    },
    app_metadata: {
      auth0Id: auth0Profile.sub,
      referredBy: form.reference
    },
    user_metadata: {
      geoip: user_metadata.geoip,
      phone: form.phone || user_metadata.phone,
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
  const geoResult = form.playingLocation; 
  const user_metadata = auth0Profile['https://cueup.io/user_metadata'];
  return {
    email: form.email || auth0Profile.email,
    picture: auth0Profile.picture_large || auth0Profile.picture,
    indentities: auth0Profile.identities,

    app_metadata: {
      auth0Id: auth0Profile.sub,
    },
    user_metadata: {
      geoip: user_metadata.geoip,
      phone: form.phone || user_metadata.phone,
      //  birthDay: auth0Profile.birthday || form.birthday || null,
      firstName: Formatter.name.GetFirstAndLast(form.name || auth0Profile.name).firstName,
      lastName: Formatter.name.GetFirstAndLast(form.name || auth0Profile.name).lastName
    }
  }
}




export function finishSignup({form, auth0Profile}, isDJ = false, callback) {
  return function(dispatch){
    let user = {};
    if(isDJ){
      user = createDJ(form, auth0Profile);
    }else{
      user = createCustomer(form, auth0Profile);
    }
    postUser(user, (err, user)=>{
      if(!err && isDJ){
        dispatch({
          type: ActionTypes.LOGIN_SUCCEEDED,
          profile : converter.user.fromDTO(user),
          loggedInCueup: true,
          redirect: true
        });
      }
      callback(err,user)
    })
  }
}

//Create the user
function postUser(user, callback) {
  const token = auth.getAccessToken();
  cueup.createUser(token, user, (error, cueupResult) => {
    if (error) {
      callback(error, cueupResult)
    } else {
      tracker.trackSignup()
      callback(null, cueupResult)
    }
  })
}

export function signupEmail({form}, callback) {
  return function(dispatch){
    cueup.checkEmailExists(form.email, (err,res)=>{
      if(err){
        callback(err)
      }else if(res === true){
        return callback('Email already in use', null);
      }else{
        auth.signup({
          connection: 'Username-Password-Authentication',
          email: form.email,
          password: form.password,
        }, (err, res)=>{
          if(err){
            callback(err, res)
          }else{
            dispatch(LoginActions.login({
              ...form,
              type: 'EMAIL',
              redirect: true
            }, callback))
          }
        });
      }
    })
  }
}