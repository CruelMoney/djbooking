import React, { PureComponent, useState, useEffect, useRef } from "react";
import {
	CardElement,
	injectStripe,
	Elements,
	StripeProvider,
	PaymentRequestButtonElement
} from "react-stripe-elements";
import { Environment } from "../../constants/constants";
import Textfield from "./Textfield";
import Form from "./Form-v2";
import SubmitButton from "./SubmitButton";
import { getTranslate } from "react-localize-redux";
import { connect } from "react-redux";
import CountrySelector from "./CountrySelector";
import connectToForm from "../higher-order/connectToForm";

class StripeForm extends PureComponent {
	constructor(props) {
		super(props);

		this.state = {
			valid: false,
			error: null
		};

		this.cardElement = React.createRef();
	}

	confirmPayment = async (form, cb) => {
		const { card_email, card_name, card_country } = form.values;

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

	handlePayment = async ({ email, name, country }) => {
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
			const result = await stripe.handleCardPayment(
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

				<ConnectedCard validate={["required"]} refForward={this.cardElement} />

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

const PaymentRequestButtonWrapper = ({
	paymentIntent,
	stripe,
	onPaymentConfirmed
}) => {
	const [canMakePayment, setCanMakePayment] = useState(false);
	const paymentRequest = useRef();

	useEffect(() => {
		const confirmPaymentRequest = async ({ complete, paymentMethod }) => {
			console.log("Confirming payment");
			try {
				const { token } = paymentIntent;
				const PAYMENT_INTENT_CLIENT_SECRET = token.token;

				complete("success");
				const result = await stripe.handleCardPayment(
					PAYMENT_INTENT_CLIENT_SECRET,
					{
						payment_method: paymentMethod.id
					}
				);
				const { error } = result;
				if (error) {
					console.log({ error });
					throw new Error(error.message || "Something went wrong");
				}
				onPaymentConfirmed(true);
			} catch (error) {
				setTimeout(() => {
					alert(error.message);
				}, 1000);
				console.log({ error });
				complete("fail");
			}
		};

		const { offer } = paymentIntent;
		// For full documentation of the available paymentRequest options, see:
		// https://stripe.com/docs/stripe.js#the-payment-request-object
		paymentRequest.current = stripe.paymentRequest({
			currency: offer.totalPayment.currency.toLowerCase(),
			country: "DK",
			total: {
				label: "Total",
				amount: offer.totalPayment.amount
			},
			displayItems: [
				{
					label: "DJ offer",
					amount: offer.offer.amount
				},
				{
					label: "Service fee",
					amount: offer.serviceFee.amount
				}
			],
			requestPayerName: true,
			requestPayerEmail: true
		});

		paymentRequest.current.on("paymentmethod", confirmPaymentRequest);

		paymentRequest.current.canMakePayment().then(result => {
			setCanMakePayment(!!result);
		});
	}, [onPaymentConfirmed, paymentIntent, stripe]);

	if (!canMakePayment || !paymentRequest.current) {
		return null;
	}

	return (
		<>
			<PaymentRequestButtonElement
				paymentRequest={paymentRequest.current}
				className="PaymentRequestButton"
				style={{
					paymentRequestButton: {
						theme: "dark",
						height: "40px"
					}
				}}
			/>
			<div className="or-divider">
				<hr />
				<span>OR</span>
			</div>
		</>
	);
};

const SmartButton = injectStripe(PaymentRequestButtonWrapper);

const SmartForm = injectStripe(StripeForm);

class StripeFormWrapper extends PureComponent {
	render() {
		return (
			<StripeProvider apiKey={Environment.STRIPE_PUBLIC_KEY}>
				<>
					<Elements>
						<SmartButton {...this.props} />
					</Elements>
					<Elements>
						<SmartForm {...this.props} />
					</Elements>
				</>
			</StripeProvider>
		);
	}
}

function mapStateToProps(state, ownprops) {
	return {
		...ownprops,
		translate: getTranslate(state.locale)
	};
}

const ConnectedCard = connectToForm(({ refForward, onChange }) => {
	return (
		<div className="stripe-card">
			<CardElement
				style={{
					base: {
						color: "#32325d",
						fontFamily: '"AvenirNext-Regular", Helvetica, sans-serif',
						fontSmoothing: "antialiased",
						fontSize: "14px",
						"::placeholder": {
							color: "#BBBBBB"
						}
					},
					invalid: {
						color: "#f44336",
						iconColor: "#f44336"
					}
				}}
				onReady={el => {
					refForward.current = el;
				}}
				onChange={({ complete }) => {
					if (complete) {
						onChange(true);
					} else {
						onChange(null);
					}
				}}
			/>
		</div>
	);
});

export default connect(mapStateToProps)(StripeFormWrapper);
