import {Environment} from '../constants/constants'


/*eslint no-undef: 0*/

export default class StripeService {
    constructor() {
      Stripe.setPublishableKey(Environment.STRIPE_PUBLIC_KEY)
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
        // country: "DK",
        // currency: "DKK",
        routing_number: data.bank_number,
        account_number: data.account_number,
        account_holder_name: data.account_holder_name,
        account_holder_type: "individual"
      }, (status, response) => this.responseHandling(status, response, callback));
    }

    createCardToken(data, callback){
      const dateArr = data.card_expiry.split('/');
      const month = dateArr[0]
      const year = dateArr[1]

      Stripe.card.createToken({
        number: data.card_number,
        cvc: data.card_cvc,
        exp_month: month,
        exp_year:year,
        name:data.card_name
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
