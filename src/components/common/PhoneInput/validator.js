import PhoneNumber from "awesome-phonenumber";

export const phoneErrors = {
	"invalid-country-code":
		"Enter it phone number with country code first. +62 813... etc.",
	"too-long": "Phone number invalid, too long",
	"too-short": "Phone number invalid, too short",
	unknown: "Phone number invalid",
	"is-possible": "Phone number invalid"
};

export const validator = (number, returnArray) => {
	const num = PhoneNumber(number);
	if (!num.isValid()) {
		const error = phoneErrors[num.a.possibility];
		return returnArray ? [error] : error;
	}
	return returnArray ? [] : null;
};
