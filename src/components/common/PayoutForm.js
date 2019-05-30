import React, { useState } from "react";
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
import {
	localize,
	getTranslate,
	getActiveLanguage
} from "react-localize-redux";
import { Elements, StripeProvider, injectStripe } from "react-stripe-elements";
import IbanField from "./IbanField";
import { Environment } from "../../constants/constants";
import CountrySelector, {
	ConnectedCurrencySelector,
	ConnectedBankSelector
} from "./CountrySelector";
import Textfield from "./Textfield";

const PayoutForm = () => {
	const { translate } = useTranslate();
	const [country, setCountry] = useState(null);
	const [valid, setValidity] = useState(false);

	const inIndonesia = country === "ID";

	return (
		<div className="payout-form">
			<Form
				formValidCallback={() => {
					setValidity(true);
				}}
				formInvalidCallback={() => {
					setValidity(false);
				}}
				name="payout-form"
			>
				<TextWrapper
					label={translate("Payout")}
					showLock={true}
					text={translate("payout.description")}
				>
					<div className="row">
						<div className="col-xs-12">
							<label>{translate("country")}</label>
							<CountrySelector
								name="bank_country"
								validate={["required"]}
								placeholder={translate("country")}
								onChange={setCountry}
							/>
						</div>
					</div>

					<div className="row">
						<div className="col-xs-12">
							<label>{translate("currency")}</label>
							<ConnectedCurrencySelector
								name="bank_currency"
								validate={["required"]}
								value={inIndonesia ? "IDR" : null}
								placeholder={translate("currency")}
							/>
						</div>
					</div>

					<div className="row">
						<div className="col-xs-12">
							<label>{translate("payout.account-name")}</label>
							<Textfield
								name="bank_accountholder_name"
								type="text"
								validate={["required", "lastName"]}
								placeholder={translate("Full name")}
							/>
						</div>
					</div>

					{inIndonesia ? (
						<>
							<div className="row">
								<div className="col-xs-12">
									<label>{translate("Bank")}</label>
									<ConnectedBankSelector
										name="bankCode"
										validate={["required"]}
										placeholder={" "}
									/>
								</div>
							</div>

							<div className="row">
								<div className="col-xs-12">
									<label>{translate("payout.account-number")}</label>
									<TextField
										name="account_number"
										validate={["required"]}
										type="tel"
										fullWidth={false}
										placeholder={"000000000"}
									/>
								</div>
							</div>
						</>
					) : (
						<div className="row">
							<div className="col-xs-12">
								<label>{translate("payout.IBAN-number")}</label>
								<IbanField validate={["required"]}>
									<InfoPopup info={translate("payout.IBAN-description")} />
								</IbanField>
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
				</div>
			</Form>
		</div>
	);
};

const StripeWrapper = () => {
	return (
		<StripeProvider apiKey={Environment.STRIPE_PUBLIC_KEY}>
			<Elements>
				<PayoutForm />
			</Elements>
		</StripeProvider>
	);
};

export default StripeWrapper;

function mapStateToProps(state, ownprops) {
	return {
		translate: getTranslate(state.locale),
		currentLanguage: getActiveLanguage(state.locale).code
	};
}

const useTranslate = connect(mapStateToProps)(
	({ translate, currentLanguage }) => {
		return { translate, currentLanguage };
	}
);
