import React, { useState } from "react";
import TextField from "./Textfield";
import TextWrapper from "./TextElement";
import Form from "./Form-v2";
import SubmitButton from "./SubmitButton";
import { connect } from "react-redux";
import * as actions from "../../actions/UserActions";
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
import { USER_BANK_ACCOUNT } from "../gql";
import { LoadingIndicator } from "./LoadingPlaceholder";
import { Query } from "react-apollo";

const PayoutForm = ({ isUpdate, translate }) => {
	const [valid, setValidity] = useState(false);

	const submit = (form, cb) => {
		console.log({ form });
		cb();
	};

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
					<Query query={USER_BANK_ACCOUNT}>
						{({ data, loading }) => {
							if (loading) {
								return (
									<div style={{ height: 200, justifyContent: "center" }}>
										<LoadingIndicator label={"Loading bank information"} />
									</div>
								);
							}

							const {
								me: {
									userMetadata: { bankAccount = {} }
								}
							} = data;

							return (
								<MainForm bankAccount={bankAccount} translate={translate} />
							);
						}}
					</Query>
				</TextWrapper>

				<div className="row buttons-wrapper">
					<div className="col-xs-6">
						<SubmitButton
							glow
							type="submit"
							active={valid}
							onClick={submit}
							name="save_payout_info"
						>
							{isUpdate ? translate("update") : translate("save")}
						</SubmitButton>
					</div>
				</div>

				<div className="row">
					<div className="col-xs-12">
						<p className="terms_link">{translate("payout.terms")}</p>
					</div>
				</div>
			</Form>
		</div>
	);
};

const MainForm = ({ bankAccount, translate }) => {
	const [country, setCountry] = useState(bankAccount.countryCode);

	const inIndonesia = country === "ID";

	return (
		<>
			<div className="row">
				<div className="col-xs-12">
					<label>{translate("country")}</label>
					<CountrySelector
						initialValue={bankAccount.countryCode}
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
						key={country}
						name="bank_currency"
						validate={["required"]}
						value={inIndonesia ? "IDR" : undefined}
						disabled={inIndonesia}
						initialValue={bankAccount.currency}
						placeholder={inIndonesia ? undefined : translate("currency")}
					/>
				</div>
			</div>
			<div className="row">
				<div className="col-xs-12">
					<label>{translate("payout.account-name")}</label>
					<Textfield
						initialValue={bankAccount.accountHolderName}
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
								initialValue={bankAccount.bankCode}
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
		</>
	);
};

const StripeWrapper = props => {
	return (
		<StripeProvider apiKey={Environment.STRIPE_PUBLIC_KEY}>
			<Elements>
				<PayoutForm {...props} />
			</Elements>
		</StripeProvider>
	);
};

function mapStateToProps(state, ownprops) {
	return {
		translate: getTranslate(state.locale),
		currentLanguage: getActiveLanguage(state.locale).code
	};
}

export default connect(mapStateToProps)(StripeWrapper);
