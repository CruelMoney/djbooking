import emailValidator from 'email-validator'
import dateValidator from 'is-my-date-valid'
import StripeService from './StripeService'
var stripe = new StripeService();

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
      const year = parseInt(value.substring(6, value.length), 10)
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
   number = number.replace(/\s/g,'')
   console.log(number);
   return !stripe.validateCardNumber(number) ? ['The card number is not valid'] : []
}

export function validateCardExpiry(date){
  const dateArr = date.split('/');
  const month = dateArr[0]
  const year = dateArr[1]
  return !stripe.validateCardExpiry(month, year) ? ['The expiry date is not valid'] : []
}

export function validateCardCVC(cvc){
  return !stripe.validateCardCVC(cvc) ? ['The security code is not valid'] : []
}

export function getCardType(cardNumber){
  return stripe.cardType(cardNumber)
}

export function validateRoutingNumberDKK(num){
return !stripe.validateRoutingNumberDKK(num) ? ['The routing number is not valid'] : []
}

export function validateAccountNumberDKK(num){
  return !stripe.validateAccountNumberDKK(num) ? ['The account number is not valid'] : []
}
