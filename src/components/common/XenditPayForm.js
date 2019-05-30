import React, { PureComponent, useState, useReducer, useEffect } from "react";

import { Environment } from "../../constants/constants";
import Textfield from "./Textfield";
import Form from "./Form-v2";
import SubmitButton from "./SubmitButton";
import { getTranslate } from "react-localize-redux";
import { connect } from "react-redux";
import CountrySelector from "./CountrySelector";
import connectToForm from "../higher-order/connectToForm";
import Card from "react-credit-card-input";

class XenditForm extends PureComponent {
	constructor(props) {
		super(props);

		const { offer } = props.paymentIntent;
		// For full documentation of the available paymentRequest options, see:
		// https://stripe.com/docs/stripe.js#the-payment-request-object
		this.state = {
			valid: false
		};
	}

	getCardToken = async ({ cvc, expiry, number }) => {
		return null;
	};

	confirmPayment = async (form, cb) => {
		const { card_email, card_name, card_country, card } = form.values;

		const token = await this.getCardToken(card);
		throw new Error("not implemented");

		try {
			await this.handlePayment({
				email: card_email,
				name: card_name,
				country: card_country
			});
			cb();
		} catch (error) {
			cb(error.message || "Something went wrong");
		}
	};

	handlePayment = async ({ email, name, country, cardToken }) => {
		const { stripe, paymentIntent, onPaymentConfirmed } = this.props;
		const { token } = paymentIntent;
		const PAYMENT_INTENT_CLIENT_SECRET = token.token;

		try {
			const options = {
				payment_method_data: {
					billing_details: {
						address: {
							country
						},
						name,
						email
					}
				},
				receipt_email: email
			};
			if (cardToken) {
				options.payment_method_data.card = cardToken;
			}
			const result = cardToken
				? await stripe.handleCardPayment(PAYMENT_INTENT_CLIENT_SECRET, options)
				: await stripe.handleCardPayment(
						PAYMENT_INTENT_CLIENT_SECRET,
						this.cardElement.current,
						options
				  );
			const { error, paymentIntent } = result;
			if (error) {
				throw new Error(error.message || "Something went wrong");
			}
			onPaymentConfirmed();
			return paymentIntent;
		} catch (error) {
			throw error;
		}
	};

	render() {
		const { translate } = this.props;
		return (
			<Form
				formValidCallback={() => this.setState({ valid: true })}
				formInvalidCallback={() => this.setState({ valid: false })}
				name="pay-form"
			>
				<Textfield
					name="card_email"
					type="email"
					validate={["required", "email"]}
					placeholder={translate("Billing email")}
				/>
				<div className="row">
					<div className="col-xs-6">
						<Textfield
							name="card_name"
							type="text"
							validate={["required", "lastName"]}
							placeholder={translate("Cardholder name")}
						/>
					</div>
					<div className="col-xs-6">
						<CountrySelector
							name="card_country"
							validate={["required"]}
							placeholder={translate("country")}
						/>
					</div>
				</div>
				<ConnectedCard name="card" validate={["required"]} />
				<div style={{ marginTop: "24px" }}>
					<SubmitButton
						glow
						active={this.state.valid}
						rounded={true}
						name={"confirm_payment"}
						onClick={this.confirmPayment}
					>
						{translate("Confirm & pay")}
					</SubmitButton>
				</div>
			</Form>
		);
	}
}

const ConnectedCard = connectToForm(({ refForward, onChange }) => {
	const cardReducer = (state, action) => {
		if (!action) return {};
		const { value, key } = action;
		return {
			...state,
			[key]: value
		};
	};

	const [hasError, setError] = useState(null);
	const [isFocus, setFocus] = useState(null);
	const [card, dispatch] = useReducer(cardReducer, {});

	useEffect(
		() => {
			const { cvc, expiry, number } = card;
			if (cvc && expiry && number) {
				onChange(card);
			} else {
				onChange(null);
			}
		},
		[card]
	);

	const className = `${hasError ? "StripeElement--invalid" : ""} ${
		isFocus ? "StripeElement--focus" : ""
	}`;

	return (
		<div className="stripe-card">
			<Card
				containerClassName={"StripeElement " + className}
				inputStyle={{
					color: "#32325d",
					fontFamily: '"AvenirNext-Regular", Helvetica, sans-serif',
					fontSmoothing: "antialiased",
					fontSize: "14px",
					"::placeholder": {
						color: "#BBBBBB"
					}
				}}
				fieldStyle={{
					flex: 1,
					border: "none !important",
					padding: 0
				}}
				dangerTextClassName="error"
				dangerTextStyle={{ top: "2.2em !important" }}
				cardCVCInputProps={{
					onFocus: e => setFocus(true),
					onBlur: e => setFocus(false),
					onChange: e => {
						setError(false);
						dispatch({ key: "cvc", value: e.target.value });
					},
					onError: e => {
						dispatch(null);
						setError(true);
					}
				}}
				cardExpiryInputProps={{
					onFocus: e => setFocus(true),
					onBlur: e => setFocus(false),
					onChange: e => {
						setError(false);
						dispatch({ key: "expiry", value: e.target.value });
					},
					onError: e => {
						dispatch(null);
						setError(true);
					}
				}}
				cardNumberInputProps={{
					onFocus: e => setFocus(true),
					onBlur: e => setFocus(false),
					onChange: e => {
						setError(false);
						dispatch({ key: "number", value: e.target.value });
					},
					onError: e => {
						dispatch(null);
						setError(true);
					}
				}}
			/>
		</div>
	);
});

function mapStateToProps(state, ownprops) {
	return {
		...ownprops,
		translate: getTranslate(state.locale)
	};
}

export default connect(mapStateToProps)(XenditForm);
