import { Environment } from "../constants/constants";

/*eslint no-undef: 0*/

export default class StripeService {
	constructor() {
		this.initialized = false;
	}

	init() {
		if (!this.initialized) {
			Stripe.setPublishableKey(Environment.STRIPE_PUBLIC_KEY);
		}
	}

	responseHandling(status, response, callback) {
		if (response.error) {
			// Problem!
			return callback(response.error, null);
		} else {
			return callback(null, response);
		}
	}

	createBankToken(data, callback) {
		this.init();
		Stripe.bankAccount.createToken(
			{
				country: data.account_country,
				currency: data.account_currency,
				routing_number: data.account_routing,
				account_number: data.account_number,
				account_holder_name: data.account_holder_name,
				account_holder_type: "individual"
			},
			(status, response) => this.responseHandling(status, response, callback)
		);
	}

	validateRoutingNumberDKK(num) {
		this.init();
		return Stripe.bankAccount.validateRoutingNumber(num, "DK");
	}

	validateAccountNumberDKK(num) {
		this.init();
		return Stripe.bankAccount.validateAccountNumber(num, "DK");
	}
}
