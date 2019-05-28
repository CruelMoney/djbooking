import c from "../constants/constants";

var ActionTypes = c.ActionTypes;

export function changeCurrency(currency) {
	return {
		type: ActionTypes.CHANGE_CURRENCY,
		value: currency
	};
}

export function setGeodata(data) {
	return function(dispatch) {};
}
