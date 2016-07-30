import emailValidator from 'email-validator'
import dateValidator from 'is-my-date-valid'


export function required(value) {
  return !value ? ['This field cannot be empty'] : []
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
