import { Environment } from "../constants/constants";
import Formatter from "./Formatter";

class CurrencyConverter {
	constructor() {
		if (typeof window !== "undefined") {
			this.fx = window.fx;
			this.error = false;
			this.initialized = false;
			this.observers = [];

			if (this.fx) {
				this.initialize();
			} else {
				document.querySelector("#money-js").addEventListener("load", () => {
					this.fx = window.fx;
					this.initialize();
				});
			}
		}
	}

	initialize = () => {
		var domain =
			"https://openexchangerates.org/api/latest.json?app_id=" +
			Environment.OPENEXCHANGERATE_APP_ID;

		fetch(domain)
			.then(response => {
				if (response.ok) {
					var contentType = response.headers.get("content-type");
					if (contentType && contentType.indexOf("application/json") !== -1) {
						response
							.json()
							.then(data => {
								this.fx.rates = data.rates;
								this.fx.base = data.base;
								this.initialized = true;
								this.notify();
							})
							.catch(error => {
								console.log(error);
								this.error = true;
								return error;
							});
					} else {
						this.error = true;
						throw Error("Response not JSON");
					}
				} else {
					this.error = true;
					response.json().then(function(result) {
						throw Error(result);
					});
				}
			})
			.catch(error => {
				this.error = true;
				console.log(error);
				throw error;
			});
	};

	//Safeconvert -> add 2 percent to conversion. Used when displaying offers from other currency
	convert(amount, from, to = null, safeConvert = false) {
		if (!to || from === to) return amount;
		if (!this.fx.rates || !this.fx.rates[from] || !this.fx.rates[to])
			return "Could not convert";

		this.fx.settings = { from: from, to: to };
		amount += safeConvert ? amount * 0.02 : 0;
		return this.fx.convert(amount);
	}

	getConvertedFormatted(amount, from, to = null, safeConvert = false) {
		if (this.error) return "???";
		var conAmount =
			to && to !== from ? this.convert(amount, from, to, safeConvert) : amount;
		return Formatter.money.FormatNumberToString(conAmount, to || from);
	}

	isInitialized = _ => this.initialized;

	subscribe(f) {
		this.observers.push(f);
	}

	unsubscribe(f) {
		this.observers = this.observers.filter(subscriber => subscriber !== f);
	}

	notify(data) {
		this.observers.forEach(observer => observer(data));
	}
}

// Singleton
export let currencyConverter = new CurrencyConverter();
