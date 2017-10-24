import {Environment} from '../constants/constants'

export default class CueupService {
    constructor() {
        this.domain = Environment.CHAT_DOMAIN

        this.getHeaders = function(token) {
            var headers = new Headers();
            headers.append('Accept', 'application/json');
            headers.append("Content-Type", "application/json");
            headers.append('Authorization', 'Bearer ' + token);
            return headers;
        }
        this.getInit = function(headers) {
            return {method: 'GET', headers: headers};
        }
        this.postInit = function(data, headers) {
            return {method: 'POST', headers: headers, body: JSON.stringify(data)};
        }
        this.putInit = function(data, headers) {
            return {method: 'PUT', headers: headers, body: JSON.stringify(data)};
        }
        this.deleteInit = function(headers) {
            return {method: 'DELETE', headers: headers};
        }

    }

    responseHandling(response, callback) {
        //Checking if statuscode is in 200-299 interval
        if (response.ok) {
            //Checking if response content is json
            var contentType = response.headers.get("content-type");

            if (contentType && contentType.indexOf("application/json") !== -1) {
                response.json().then(function(result) {
                    return callback(null, result)
                }).catch(function(error){console.log(error)})
            } else {
                //The case that its not json
                return callback(null, "ok")
            }
        } else {
            //The case that Network response was not ok
            response.json().then(function(result) {
                console.log(result)
                return callback({message:result.message}, null)
            }).catch((e)=>  {
              console.log(e)
              callback({message:"Something went wrong"}, null)})
        }
    }

    fetchHandling(uri, init, callback){
      var self = this;
      return fetch(uri, init)
        .then(function(response) {
          return self.responseHandling(response, callback);
      }).catch(function(error) {
          callback(error)
      });
    }

    //MESSAGE ACTIONS
    getChat(id, token, callback) {
      return this.fetchHandling(
        `${this.domain}/api/messages/to/${id}`,
        this.getInit(this.getHeaders(token)),
        callback
      )}

    sendMessage(token, data, callback) {
      return this.fetchHandling(
        `${this.domain}/api/messages`,
        this.postInit(data, this.getHeaders(token)),
        callback
      )}
    
    }