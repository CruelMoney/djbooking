import React, { PureComponent } from "react";
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

		// For full documentation of the available paymentRequest options, see:
		// https://stripe.com/docs/stripe.js#the-payment-request-object
		const paymentRequest = props.stripe.paymentRequest({
			country: "US",
			currency: "usd",
			total: {
				label: "Demo total",
				amount: 1000
			}
		});

		paymentRequest.on("token", ({ complete, token, ...data }) => {
			console.log("Received Stripe token: ", token);
			console.log("Received customer information: ", data);
			complete("success");
		});

		paymentRequest.canMakePayment().then(result => {
			console.log({ result });
			this.setState({ canMakePayment: !!result });
		});

		this.state = {
			canMakePayment: false,
			paymentRequest,
			valid: false
		};

		this.cardElement = React.createRef();
	}

	handleCardPayment = async ({
		PAYMENT_INTENT_CLIENT_SECRET,
		email,
		name,
		country,
		cardToken
	}) => {
		const { stripe } = this.props;

		try {
			const options = {
				payment_method_data: {
					billing_details: {
						address: {
							country
						},
						name,
						email
					},
					receipt_email: email
				}
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

			console.log({ result });
		} catch (error) {
			console.log({ paymnetError: error });
		}
	};

	render() {
		const { canMakePayment } = this.state;

		const { translate } = this.props;
		return (
			<Form
				formValidCallback={() => this.setState({ valid: true })}
				formInvalidCallback={() => this.setState({ valid: false })}
				name="pay-form"
			>
				{canMakePayment && (
					<>
						<PaymentRequestButtonElement
							paymentRequest={this.state.paymentRequest}
							className="PaymentRequestButton"
							style={{
								// For more details on how to style the Payment Request Button, see:
								// https://stripe.com/docs/elements/payment-request-button#styling-the-element
								paymentRequestButton: {
									theme: "dark",
									height: "50px"
								}
							}}
						/>
						<div className="or-divider">
							<hr />
							<span>OR</span>
						</div>
					</>
				)}

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

				<ConnectedCard validate={["required"]} />

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

const SmartForm = injectStripe(StripeForm);

class StripeFormWrapper extends PureComponent {
	render() {
		return (
			<StripeProvider apiKey={Environment.STRIPE_PUBLIC_KEY}>
				<Elements>
					<SmartForm {...this.props} />
				</Elements>
			</StripeProvider>
		);
	}
}

function mapStateToProps(state, ownprops) {
	return {
		translate: getTranslate(state.locale)
	};
}

const ConnectedCard = connectToForm(({ ref, onChange }) => {
	return (
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
			onReady={el => (ref = el)}
			onChange={({ complete }) => {
				if (complete) {
					onChange(true);
				} else {
					onChange(null);
				}
			}}
		/>
	);
});

export default connect(mapStateToProps)(StripeFormWrapper);
