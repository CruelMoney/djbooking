import {Environment} from '../constants/constants'

export default class CueupService {
    constructor() {
        this.domain = Environment.API_DOMAIN

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
                return callback({message:result.message}, null)
            }).catch((e)=>  callback({message:"Something went wrong"}, null))
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

    //USER ACTIONS
    getUser(permaLink, callback) {
      return this.fetchHandling(
        `${this.domain}/api/user/permalink/${permaLink}`,
        this.getInit(this.getHeaders("")),
        callback
      )}

    getOwnUser(token, callback) {
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
   getUserReviews(id, callback) {
     return this.fetchHandling(
       `${this.domain}/api/user/reviews/${id}`,
       this.getInit(this.getHeaders("")),
       callback
     )}
     updateSettings(token, data, callback) {
       return this.fetchHandling(
       `${this.domain}/api/user/settings`,
       this.postInit(data, this.getHeaders(token)),
       callback)
    }
    resendVerification(token, callback){
      return this.fetchHandling(
      `${this.domain}/api/user/send_verification_email`,
      this.getInit(this.getHeaders(token)),callback
    )}
    requestPasswordChange(email, callback){
      return this.fetchHandling(
      `${this.domain}/api/user/change_password/${email}`,
      this.postInit(email, this.getHeaders("")),callback
    )}
    SaveBookMePreview(token, data, callback){
      return this.fetchHandling(
      `${this.domain}/api/user/SaveBookMePreview`,
      this.postInit(data, this.getHeaders(token)),
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
     getEvent(token, id, hash, callback) {
       return this.fetchHandling(
         `${this.domain}/api/event/${id}/${hash}`,
         this.getInit(this.getHeaders(token)),
         callback
       )}
   updateEvent(token, id, data, callback) {
     return this.fetchHandling(
       `${this.domain}/api/event/${id}/`,
       this.putInit(data, this.getHeaders(token)),
       callback
     )}

   reviewEvent(token, id, hash, data, callback) {
     return this.fetchHandling(
       `${this.domain}/api/event/${id}/${hash}/review`,
       this.postInit(data, this.getHeaders(token)),
       callback
     )}

   cancelEvent(token, id, hash, callback) {
     return this.fetchHandling(
       `${this.domain}/api/event/${id}/${hash}/cancel`,
       this.putInit("", this.getHeaders(token)),
       callback
     )}

     payEvent(token, id, hash, data, callback) {
       return this.fetchHandling(
         `${this.domain}/api/event/${id}/${hash}/pay`,
         this.putInit(data, this.getHeaders(token)),
         callback
       )}
     notifyPayEvent(token, id, hash, callback) {
       return this.fetchHandling(
         `${this.domain}/api/event/${id}/${hash}/notifyPay`,
         this.getInit(this.getHeaders(token)),
         callback
       )}
    //EVENT ACTIONS END


    //GIG ACTIONS
    
    //Depcreated
    getUserGigs(token, callback) {
      return this.fetchHandling(
        `${this.domain}/api/gig/user`,
        this.getInit(this.getHeaders(token)),
        callback
      )}

    getUserGigsIDs(token, userID, callback) {
      return this.fetchHandling(
        `${this.domain}/api/gig/user/${userID}`,
        this.getInit(this.getHeaders(token)),
        callback
      )}

     getUserGig(token, id, callback) {
      return this.fetchHandling(
        `${this.domain}/api/gig/${id}`,
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
          this.putInit(offerDTO, this.getHeaders(token)),
          callback
        )}

    getFees(token, id, offerDTO, callback){
        return this.fetchHandling(
          `${this.domain}/api/gig/${id}/potentialOffer`,
          this.putInit(offerDTO, this.getHeaders(token)),
          callback
        )}

          
}
