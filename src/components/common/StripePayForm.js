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
			this.setState({ canMakePayment: !!result });
		});

		this.state = {
			canMakePayment: false,
			paymentRequest,
			valid: false
		};
	}

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
					<PaymentRequestButtonElement
						paymentRequest={this.state.paymentRequest}
						className="PaymentRequestButton"
						style={{
							// For more details on how to style the Payment Request Button, see:
							// https://stripe.com/docs/elements/payment-request-button#styling-the-element
							paymentRequestButton: {
								theme: "light",
								height: "64px"
							}
						}}
					/>
				)}
				<Textfield
					big
					name="card_name"
					type="text"
					validate={["required", "lastName"]}
					placeholder={translate("Cardholder name")}
				/>
				<Textfield
					big
					name="card_email"
					type="email"
					validate={["required", "email"]}
					placeholder={translate("Billing email")}
				/>
				<CardElement />

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

export default connect(mapStateToProps)(StripeFormWrapper);
