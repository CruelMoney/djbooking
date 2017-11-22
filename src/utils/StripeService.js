import {Environment} from '../constants/constants'


/*eslint no-undef: 0*/

export default class StripeService {
    constructor() {
      this.initialized = false;
    }

    init(){
      if(!this.initialized){
        Stripe.setPublishableKey(Environment.STRIPE_PUBLIC_KEY)
      }
    }

    responseHandling(status, response, callback) {
      if (response.error) { // Problem!
        return callback(response.error, null)
      } else {
        return callback(null, response)
      }
    }

    createBankToken(data, callback){
      this.init();
      Stripe.bankAccount.createToken({
        country: data.account_country,        
        currency: data.account_currency,      
        routing_number: data.account_routing,
        account_number: data.account_number,
        account_holder_name: data.account_holder_name,
        account_holder_type: "individual"
      }, (status, response) => this.responseHandling(status, response, callback));
    }

    createCardToken(data, callback){
      this.init();

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
      this.init();
       return Stripe.card.validateCardNumber(number)
    }

    validateCardExpiry(month, year){
      this.init();
      return Stripe.card.validateExpiry(month, year)
    }

    validateCardCVC(cvc){
      this.init();
      return Stripe.card.validateCVC(cvc)
    }

    getCardType(cardNumber){
      this.init();
      return Stripe.card.cardType(cardNumber)
    }

    validateRoutingNumberDKK(num){
      this.init();
    return Stripe.bankAccount.validateRoutingNumber(num, "DK")
    }

    validateAccountNumberDKK(num){
      this.init();
      return Stripe.bankAccount.validateAccountNumber(num, "DK")
    }
}
