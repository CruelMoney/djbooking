

/*eslint no-undef: 0*/

export default class StripeService {
    constructor() {
      Stripe.setPublishableKey('pk_test_9HMoU3Zkhtu5aoXTYWDgmEgp')
    }

       responseHandling(status, response, callback) {
        if (response.error) { // Problem!
          return callback(response.error, null)
        } else {
          return callback(null, response)
        }
      }

    createBankToken(data, callback){
      Stripe.bankAccount.createToken({
        country: "US",
        currency: "USD",
        routing_number: data.bank_number,
        account_number: data.account_number,
        account_holder_name: data.account_holder_name,
        account_holder_type: "individual"
      }, (status, response) => this.responseHandling(status, response, callback));
    }

    validateCardNumber(number){
       return Stripe.card.validateCardNumber(number)
    }

    validateCardExpiry(month, year){
      return Stripe.card.validateExpiry(month, year)
    }

    validateCardCVC(cvc){
      return Stripe.card.validateCVC(cvc)
    }

    getCardType(cardNumber){
      return Stripe.card.cardType(cardNumber)
    }

    validateRoutingNumberDKK(num){
    return Stripe.bankAccount.validateRoutingNumber(num, "DK")
    }

    validateAccountNumberDKK(num){
      return Stripe.bankAccount.validateAccountNumber(num, "DK")
    }
}
