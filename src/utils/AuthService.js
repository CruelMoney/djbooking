import Auth0 from 'auth0-js'
import {
    EventEmitter
} from 'events'

//Usage
// import AuthService from '../../utils/AuthService'
// const auth0 = new AuthService();
// auth0.signUpGreet(window.location.hash)


export default class AuthService extends EventEmitter {
    constructor() {
        super()
            // Configure Auth0
        this.auth0 = new Auth0({
            clientID: 'vsGIZE2f4TIyHNV1l5meZSiXyYrV2JP9',
            domain: 'queup.eu.auth0.com',
            callbackOnLocationHash: true,
            callbackURL: 'http://localhost:8888/',
        })

        this.domain = 'queup.eu.auth0.com' // setting domain parameter as an instance attribute
        this.login = this.login.bind(this)
        this.signup = this.signup.bind(this)
    }

    login(params, onError) {
        //redirects the call to auth0 instance
        this.auth0.login(params, onError)
    }

    signup(params, onError) {
        //redirects the call to auth0 instance
        this.auth0.signup(params, onError)
    }

    getProfileFromToken(token, callback) {
        this.auth0.getProfile(token, function(err, profile) {
            return callback(profile)
        })
    }

    getProfileFromStoredToken(callback) {
        const token = this.getToken()

        this.auth0.getProfile(token, function(err, profile) {
            return callback(err, profile)
        })
    }

    parseHash(hash) {
        // uses auth0 parseHash method to extract data from url hash
        const authResult = this.auth0.parseHash(hash)
        if (authResult && authResult.idToken) {
            this.setToken(authResult.idToken)
        }
    }

    loggedIn() {
        // Checks if there is a saved token and it's still valid
        return !!this.getToken()
    }

    setToken(idToken) {
        // Saves user token to localStorage
        localStorage.setItem('id_token', idToken)
    }

    getToken() {
        // Retrieves the user token from localStorage
        return localStorage.getItem('id_token')
    }

    logout() {
        // Clear user token and profile data from localStorage
        localStorage.removeItem('id_token')
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

    requestPasswordChange(userName, token, callback) {
            this.auth0.changePassword({
          connection: 'Username-Password-Authentication',
          username:   userName
        }, function (err, resp) {
          return callback(err,resp)
        })
    }





}
