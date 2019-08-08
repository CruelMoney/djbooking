import emailValidator from "email-validator";
import StripeService from "./StripeService";
var stripe = new StripeService();

export function required(value, errorMsg) {
	if (Array.isArray(value)) {
		return !value.length ? ["At least 1 option should be selected"] : [];
	} else {
		return !value && value !== 0 ? ["This field cannot be empty"] : [];
	}
}

export function lastName(value) {
	return value && !value.split(" ")[1] ? ["Please enter your last name"] : [];
}

export function minLength(str) {
	return str && str.length < 6 ? ["Password must be 6 or more characters"] : [];
}

export function email(value) {
	return value && !emailValidator.validate(value)
		? ["This email address is invalid"]
		: [];
}

// export function date(value) {
//   const  validate1 = dateValidator({ format: "D-M-YYYY" })
//   const  validate2 = dateValidator({ format: "D/M/YYYY" })
//   //No dates earlier than 1900
//   const  validate3 = function(value){
//     if (value.length === 10) {
//       const year = parseInt(value.substring(6, value.length), 10)
//       return year >= 1900
//     }else {
//       return true
//     }
//   }

//   try {
//     return !(validate3(value) && (validate1(value) || validate2(value))) ? ['This date is invalid']: []
//   }
//   catch (e) {
//      // statements to handle any exceptions
//     return ['This date is invalid']
//   }
// }

export function validateCardNumber(number) {
	return number && !stripe.validateCardNumber(number.replace(/\s/g, ""))
		? ["The card number is not valid"]
		: [];
}

export function validateCardExpiry(date) {
	if (!date) return ["The expiry date is not valid"];
	const dateArr = date.split("/");
	const month = dateArr[0];
	const year = dateArr[1];
	return !stripe.validateCardExpiry(month, year)
		? ["The expiry date is not valid"]
		: [];
}

export function validateCardCVC(cvc) {
	return cvc && !stripe.validateCardCVC(cvc)
		? ["The security code is not valid"]
		: [];
}

export function getCardType(cardNumber) {
	return cardNumber && stripe.cardType(cardNumber);
}

export function validateRoutingNumberDKK(num) {
	return num && !stripe.validateRoutingNumberDKK(num)
		? ["The routing number is not valid"]
		: [];
}

export function validateAccountNumberDKK(num) {
	return num && !stripe.validateAccountNumberDKK(num)
		? ["The account number is not valid"]
		: [];
}

// export function validateDKSSN(num){
//   try {
//     num = num ? num : "0"
//     var ssn = cpr(num)
//     return ssn.valid ? [] : ["The CPR is invalid"]
//   } catch (error) {
//     return [error.message]
//   }
// }
