import c from "../constants/constants";

var ActionTypes = c.ActionTypes;

let initialState = {
	currency: typeof localStorage !== "undefined" ? localStorage.currency : null,
	city: "",
	country: "",
	countryCode: "DK",
	promises: []
};

const session = (state = initialState, action) => {
	//  document.cookie = state

	switch (action.type) {
		case ActionTypes.CHANGE_CURRENCY:
			if (c.OrganizerCurrencies.includes(action.value)) {
				localStorage.currency = action.value;
				return { ...state, currency: action.value };
			} else {
				localStorage.removeItem("currency");
				return { ...state, currency: null };
			}

		case ActionTypes.SET_GEO_SESSION:
			return { ...state, ...action.values, ...localStorage };

		case ActionTypes.PUSH_PROMISE:
			return {
				...state,
				promises: [...state.promises, action.promise]
			};

		default:
			return state;
	}
};

export default session;
