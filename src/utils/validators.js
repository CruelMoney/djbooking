import emailValidator from 'email-validator'
import dateValidator from 'is-my-date-valid'
import Stripe from './StripeService'


export function required(value) {
  return !value ? ['This field cannot be empty'] : []
}

export function lastName(value) {
  return !value.split(' ')[1] ? ['Please enter your last name'] : []
}


export function email(value) {
  return !emailValidator.validate(value) ? ['This email address is invalid']: []
}

export function date(value) {
  const  validate1 = dateValidator({ format: "D-M-YYYY" })
  const  validate2 = dateValidator({ format: "D/M/YYYY" })
  //No dates earlier than 1900
  const  validate3 = function(value){
    if (value.length === 10) {
      const year = parseInt(value.substring(6, value.length))
      return year >= 1900
    }else {
      return true
    }
  }

  try {
    return !(validate3(value) && (validate1(value) || validate2(value))) ? ['This date is invalid']: []
  }
  catch (e) {
     // statements to handle any exceptions
    return ['This date is invalid']
  }
}

export function validateCardNumber(number){
   return !Stripe.card.validateCardNumber(number) ? ['The card number is not valid'] : []
}

export function validateCardExpiry(month, year){
  return !Stripe.card.validateExpiry(month, year) ? ['The expiry date is not valid'] : []
}

export function validateCardCVC(cvc){
  return !Stripe.card.validateCVC(cvc) ? ['The security code is not valid'] : []
}

export function getCardType(cardNumber){
  return Stripe.card.cardType(cardNumber)
}

export function validateRoutingNumber(num, countryCode){
  return !Stripe.bankAccount.validateRoutingNumber(num, countryCode) ? ['The routing number is not valid'] : []
}

export function validateAccountNumber(num, countryCode){
  return !Stripe.bankAccount.validateAccountNumber(num, countryCode) ? ['The account number is not valid'] : []
}
