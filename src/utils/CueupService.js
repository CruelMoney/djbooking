export default class CueupService {
    constructor() {
        this.domain = 'http://cueup.azurewebsites.net';

        this.getHeaders = function(token) {
          console.log(token);
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
          console.log(JSON.stringify(data));
            return {method: 'POST', headers: headers, body: JSON.stringify(data)};
        }
        this.putInit = function(data, headers) {
          console.log(data);

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

    //USER ACTIONS
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
          `${this.domain}/api/user/bank/`,
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
    checkEmailExists(data, callback) {
      return this.fetchHandling(
      `${this.domain}/api/user/email`,
      this.postInit(data, this.getHeaders("")),
      callback)
   }
   getUserReviews(token, callback) {
     return this.fetchHandling(
       `${this.domain}/api/user/review`,
       this.getInit(this.getHeaders(token)),
       callback
     )}
   //USER ACTIONS END



   //EVENT ACTIONS
   createEvent(token, data, callback) {
     return this.fetchHandling(
       `${this.domain}/api/event`,
       this.postInit(data, this.getHeaders(token)),
       callback
     )}

   getUserEvent(token, callback) {
     return this.fetchHandling(
       `${this.domain}/api/event/user`,
       this.getInit(this.getHeaders(token)),
       callback
     )}

   updateEvent(token, id, data, callback) {
     return this.fetchHandling(
       `${this.domain}/api/event/${id}`,
       this.putInit(data, this.getHeaders(token)),
       callback
     )}

   reviewEvent(token, id, data, callback) {
     return this.fetchHandling(
       `${this.domain}/api/event/${id}/review`,
       this.postInit(data, this.getHeaders(token)),
       callback
     )}

   cancelEvent(token, id, callback) {
     return this.fetchHandling(
       `${this.domain}/api/event/${id}/cancel`,
       this.putInit("", this.getHeaders(token)),
       callback
     )}
    //EVENT ACTIONS END


    //GIG ACTIONS
    getUserGigs(token, callback) {
      return this.fetchHandling(
        `${this.domain}/api/gig/user`,
        this.getInit(this.getHeaders(token)),
        callback
      )}

    cancelGig(token, id, callback){
      return this.fetchHandling(
        `${this.domain}/api/gig/${id}/cancel`,
        this.getInit(this.getHeaders(token)),
        callback
      )}

    declineGig(token, id, callback){
        return this.fetchHandling(
          `${this.domain}/api/gig/${id}/decline`,
          this.getInit(this.getHeaders(token)),
          callback
        )}

    makeOffer(token, id, offerDTO, callback){
        return this.fetchHandling(
          `${this.domain}/api/gig/${id}/offer`,
          this.postInit(offerDTO, this.getHeaders(token)),
          callback
        )}
}
