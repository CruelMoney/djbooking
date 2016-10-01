export default class CueupService {
    constructor() {
        this.domain = 'http://cueup20160926115922.azurewebsites.net';

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
                })
            } else {
                //The case that its not json
                return callback({
                    message: "Reply was not json"
                }, null)
            }
        } else {

            //The case that Network response was not ok
            response.text().then(function(result) {
                return callback({message:result}, null)
            })
        }
    }

    fetchHandling(uri, init, callback){
      var self = this;
      return fetch(uri, init)
        .then(function(response) {
          return self.responseHandling(response, callback);
      }).catch(function(error) {
          return callback({
              message: 'There has been a problem with your fetch operation: ' + error.message
          }, null)
      });
    }

    getUser(token, callback) {
      return this.fetchHandling(
        `${this.domain}/api/user`,
        this.getInit(this.getHeaders(token)),
        callback
      )}

    createUser(token, data, callback) {
      return this.fetchHandling(
        `${this.domain}/api/user`,
        this.postInit(data, this.getHeaders(token)),
        callback
      )}

    updateUser(token, data, callback) {
          return this.fetchHandling(
          `${this.domain}/api/user`,
          this.putInit(data, this.getHeaders(token)),
          callback
    )}

    updateUserBankInfo(token, bankToken, callback) {
          return this.fetchHandling(
          `${this.domain}/api/user/bank/${bankToken}`,
          //not really necessary to use put or include the banktoken here
          this.putInit(bankToken, this.getHeaders(token)),
          callback
    )}

    deleteUser(token, callback) {
          return this.fetchHandling(
          `${this.domain}/api/user`,
          this.deleteInit(this.getHeaders(token)),
          callback
    )}


}
