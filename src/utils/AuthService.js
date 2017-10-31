import Auth0 from 'auth0-js'
import {Environment} from '../constants/constants'
import {
    EventEmitter
} from 'events'

//Usage
// import AuthService from '../../utils/AuthService'
// const auth0 = new AuthService();
// auth0.signUpGreet(window.location.hash)


class AuthService extends EventEmitter {
    constructor() {   
        super()
        // Configure Auth0
        this.auth0 = new Auth0.WebAuth({
            domain: Environment.AUTH0_CLIENT_DOMAIN,
            clientID: Environment.AUTH0_CLIENT_ID,
            redirectUri: Environment.CALLBACK_DOMAIN,
            audience: Environment.AUTH0_AUDIENCE,
            responseType: 'token id_token',
            scope: 'openid'
            });

        this.domain = Environment.AUTH0_CLIENT_DOMAIN // setting domain parameter as an instance attribute
        this.login = this.login.bind(this)
        this.signup = this.signup.bind(this)
    }

    
    handleLogin = (err,result, onError) => {
        if(err !=null && err.message === "invalid_user_password"){
          onError({message:"The email or password is wrong"}, result)
        }else{
            if (result && result.idToken) {
                this.setToken(result.idToken)
            }
          onError(err, result)
        }
    }

    login = (params, onError) => {
        if(params.connection === 'Username-Password-Authentication'){
            if(!params.username){
                params = {
                    ...params,
                    username: params.email,
                    realm: params.connection,
                    responseType: 'token id_token',
                }
            }
            this.auth0.redirect.loginWithCredentials(params, (err,res) => this.handleLogin(err,res,onError))
        }else{
            this.auth0.authorize({
                ...params, 
                responseType: 'token id_token',
            })
        } 
    }

    parseHash = () => {
        return new Promise((resolve, reject)=>{
            this.auth0.parseHash((err, authResult) => {          
                if (authResult && authResult.accessToken && authResult.idToken) {
                  this.setSession(authResult);
                  return resolve(authResult.idToken)
                }else if(err){
                    return reject(err)
                }
                reject('No id_token');
              });
        })
      }
    

    setSession(authResult) {
        // Set the time that the access token will expire at
        let expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
        localStorage.setItem('access_token', authResult.accessToken);
        localStorage.setItem('id_token', authResult.idToken);
        localStorage.setItem('expires_at', expiresAt);
    }

    logout() {
        // Clear access token and ID token from local storage
        localStorage.removeItem('access_token');
        localStorage.removeItem('id_token');
        localStorage.removeItem('expires_at');
    }
    
    loggedIn() {
        // Check whether the current time is past the 
        // access token's expiry time
        let expiresAt = JSON.parse(localStorage.getItem('expires_at'));
        return new Date().getTime() < expiresAt;
    }

    signup = (params, onError) => {
        //redirects the call to auth0 instance
        this.auth0.signup(params, onError)
    }

    getProfileFromToken = (token, callback) => {
        this.auth0.client.userInfo(token, function(err, profile) {
            console.log(err, profile)
            return callback(err,profile)
        })
    }

    getProfileFromStoredToken(callback) {
        const token = this.getToken()

        this.auth0.client.userInfo(token, function(err, profile) {
            return callback(err, profile)
        });
    }

    setToken(idToken) {
        // Saves user token to localStorage
        localStorage.setItem('id_token', idToken)
    }

    getToken() {
        // Retrieves the user token from localStorage
        return localStorage.getItem('id_token')
    }


    setProfile(profile) {
        // Saves profile data to localStorage
        localStorage.setItem('profile', JSON.stringify(profile))
            // Triggers profile_updated event to update the UI
        this.emit('profile_updated', profile)
    }

    getProfile() {
        // Retrieves the profile data from localStorage
        const profile = localStorage.getItem('profile')
        return profile ? JSON.parse(localStorage.profile) : {}
    }


    updateProfile(userId, data, token, callback) {
        const headers = {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token //setting authorization header
            }
            // making the PATCH http request to auth0 api
        return fetch(`https://${this.domain}/api/v2/users/${userId}`, {
                method: 'PATCH',
                headers: headers,
                body: JSON.stringify(data)
            })
            .then(function(response) {
                if (response.ok) {
                    response.json().then(function(result) {
                        return callback(null, result)
                    })
                } else {
                    response.json().then(function(result) {
                        return callback({
                            message: result.message
                        }, null)
                    })
                }
            })
    }

    requestPasswordChange(email, callback) {
        this.auth0.changePassword({
          connection: 'Username-Password-Authentication',
          email:   email
        }, function (err, resp) {
          return callback(err,resp)
        })
    }

}


export let authService = new AuthService();