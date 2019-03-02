import React, { Component } from "react";
import PropTypes from "prop-types";
import TextField from "./Textfield";
import TextWrapper from "./TextElement";
import PoweredByStripe from "../../assets/powered_by_stripe.png";
import Form from "./Form-v2";
import SubmitButton from "./SubmitButton";
import { connect } from "react-redux";
import * as actions from "../../actions/UserActions";
import Button from "./Button-v2";
import ToggleOptions from "./ToggleOptions";
import Formatter from "../../utils/Formatter";
import InfoPopup from "./InfoPopup";
import { localize } from "react-localize-redux";
import CountryCurrency from "../../utils/CountryCurrency";
import { Elements, StripeProvider, injectStripe } from "react-stripe-elements";
import IbanField from "./IbanField";
import { Environment } from "../../constants/constants";

const countryCur = new CountryCurrency();
class payoutForm extends Component {
	propTypes = {
		user: PropTypes.object,
		updatePayoutInfo: PropTypes.func
	};

	updatePayoutInfo = (form, callback) => {
		const { translate, stripe } = this.props;
		let info = form.values;
		const country = this.state.area === "usa" ? "USA" : info.bank_country;
		info.account_holder_name = this.props.user.name;

		countryCur
			.getCurrency(country)
			.then(async result => {
				// update info with the country info
				const data = {
					...info,
					type: "bank_account",
					account_holder_type: "individual",
					bank_country: country,
					birthday: Formatter.date.FromEUStringToUSDate(info.birthday),
					country: result.countryTwoLetter,
					currency: result.currency
				};

				// custom if iban element
				if (this.state.area === "other") {
					delete data.country;
				}

				const { token, error } = await stripe.createToken(data);
				if (error) throw new Error(error.message);
				data.token = token;
				data.country = result.countryTwoLetter;

				this.props.updatePayoutInfo(data, callback);
			})
			.catch(err => {
				if (err.message) {
					callback(err.message);
				} else {
					callback(translate("payout.country-not-found"));
				}
			});
	};

	state = {
		valid: false,
		area: "other"
	};

	render() {
		const { translate } = this.props;
		return (
			<div className="payout-form">
				<Form
					formValidCallback={() => {
						this.setState({ valid: true });
					}}
					formInvalidCallback={() => {
						this.setState({ valid: false });
					}}
					name="payout-form"
				>
					<TextWrapper
						label={translate("Payout")}
						showLock={true}
						text={translate("payout.description")}
					>
						<div className="row" style={{ marginBottom: "10px" }}>
							<div className="col-md-12">
								<label style={{ marginBottom: "10px" }}>
									{translate("payout.location")}
								</label>
								<ToggleOptions
									name="area"
									glued={true}
									value={this.state.area}
									onChange={val => this.setState({ area: val })}
								>
									<Button name="usa">USA</Button>
									<Button name="other">{translate("other")}</Button>
								</ToggleOptions>
							</div>
						</div>
						{this.state.area === "other" ? (
							<div className="row">
								<div className="col-xs-12">
									<label>{translate("country")}</label>
									<TextField
										name="bank_country"
										type="text"
										validate={["required"]}
										value={this.props.country || null}
										fullWidth={false}
									/>
								</div>
							</div>
						) : null}
						<div className="row">
							<div className="col-sm-6">
								<label>{translate("city")}</label>
								<TextField
									name="bank_city"
									type="text"
									fullWidth={false}
									validate={["required"]}
									value={this.props.city || null}
								/>
							</div>
							<div className="col-sm-6">
								<label>{translate("postal-code")}</label>
								<TextField
									name="bank_zip"
									type="text"
									validate={["required"]}
									fullWidth={false}
								/>
							</div>
						</div>
						<div className="row">
							<div className="col-xs-12">
								<label>{translate("address")}</label>
								<TextField
									name="bank_address"
									type="text"
									validate={["required"]}
									fullWidth={false}
								>
									<InfoPopup info={translate("payout.address-description")} />
								</TextField>
							</div>
						</div>

						{this.state.area === "other" ? (
							<div className="row">
								<div className="col-xs-12">
									<label>{translate("payout.IBAN-number")}</label>

									<IbanField validate={["required"]}>
										<InfoPopup info={translate("payout.IBAN-description")} />
									</IbanField>

									{/* <TextField
										name="account_number"
										validate={["required"]}
										type="text"
										fullWidth={false}
										placeholder={translate("payout.IBAN-number")}
									> 
										<InfoPopup info={translate("payout.IBAN-description")} />
									 </TextField> */}
								</div>
							</div>
						) : (
							<div className="row">
								<div className="col-xs-6">
									<label>{translate("payout.routing-number")}</label>
									<TextField
										name="account_routing"
										validate={["required"]}
										type="text"
										fullWidth={false}
									/>
								</div>
								<div className="col-xs-6">
									<label>{translate("payout.account-number")}</label>
									<TextField
										name="account_number"
										validate={["required"]}
										type="text"
										fullWidth={false}
									/>
								</div>
							</div>
						)}
					</TextWrapper>

					<div className="row">
						<div className="col-xs-12">
							<p className="terms_link">{translate("payout.terms")}</p>
						</div>
					</div>

					<div className="row buttons-wrapper">
						<div className="col-xs-6">
							<SubmitButton
								glow
								type="submit"
								active={this.state.valid}
								name="save_payout_info"
								onClick={this.updatePayoutInfo}
							>
								{translate("save")}
							</SubmitButton>
						</div>
						<div className="col-xs-6">
							<a
								style={{ float: "right" }}
								href="https://stripe.com/"
								target="_blank"
								rel="noopener noreferrer"
							>
								<img alt="payment system stripe" src={PoweredByStripe} />
							</a>
						</div>
					</div>
				</Form>
			</div>
		);
	}
}

function mapStateToProps(state, ownprops) {
	return {
		user: state.login.profile,
		country: state.session.country,
		city: state.session.city
	};
}

function mapDispatchToProps(dispatch, ownprops) {
	return {
		updatePayoutInfo: (data, callback) =>
			dispatch(actions.updatePayoutInfo(data, callback))
	};
}

const SmartPayout = injectStripe(
	localize(
		connect(
			mapStateToProps,
			mapDispatchToProps
		)(payoutForm),
		"locale"
	)
);

class StripeWrapper extends Component {
	constructor() {
		super();
		this.state = { stripe: null };
	}
	componentDidMount() {
		if (window.Stripe) {
			this.setState({ stripe: window.Stripe(Environment.STRIPE_PUBLIC_KEY) });
		} else {
			document.querySelector("#stripe-js").addEventListener("load", () => {
				// Create Stripe instance once Stripe.js loads
				this.setState({ stripe: window.Stripe(Environment.STRIPE_PUBLIC_KEY) });
			});
		}
	}
	render() {
		// this.state.stripe will either be null or a Stripe instance
		// depending on whether Stripe.js has loaded.
		return (
			<StripeProvider stripe={this.state.stripe}>
				<Elements>
					<SmartPayout />
				</Elements>
			</StripeProvider>
		);
	}
}

export default StripeWrapper;
