import React, { useState, useEffect } from "react";
import TextField from "./Textfield";
import TextWrapper from "./TextElement";
import Form from "./Form-v2";
import SubmitButton from "./SubmitButton";
import { connect } from "react-redux";
import InfoPopup from "./InfoPopup";
import { getTranslate, getActiveLanguage } from "react-localize-redux";
import { Elements, StripeProvider, injectStripe } from "react-stripe-elements";
import IbanField from "./IbanField";
import { Environment } from "../../constants/constants";
import CountrySelector, {
	ConnectedCurrencySelector,
	ConnectedBankSelector
} from "./CountrySelector";
import Textfield from "./Textfield";
import { USER_BANK_ACCOUNT, UPDATE_USER_PAYOUT } from "../gql";
import { LoadingIndicator } from "./LoadingPlaceholder";
import { Query, Mutation } from "react-apollo";

const getStripeData = async ({ country, stripe, name, currency }) => {
	let tokenData = {
		currency,
		account_holder_name: name,
		account_holder_type: "individual"
	};

	const { error, token } = await stripe.createToken(tokenData);

	if (error) {
		throw new Error(error.message);
	} else {
		console.log({ token });
		return { payoutInfo: token };
	}
};

const getXenditData = ({ country, name, bankCode, bankAccountNumber }) => {
	return {
		payoutInfo: {
			country,
			currency: "IDR",
			bankAccountHolderName: name,
			bankAccountNumber: bankAccountNumber.trim(),
			bankCode
		}
	};
};

const PayoutForm = ({ user, isUpdate, translate, stripe }) => {
	const [valid, setValidity] = useState(false);
	const submit = mutate => async ({ values }, cb) => {
		try {
			const useXendit = values.country === "ID";
			const data = useXendit
				? getXenditData(values)
				: await getStripeData({ ...values, stripe });
			await mutate({
				variables: {
					...data,
					id: user.id,
					paymentProvider: useXendit ? "XENDIT" : "STRIPE"
				}
			});
			cb();
		} catch (error) {
			cb(error.message || "Something went wrong");
		}
	};

	return (
		<div className="payout-form">
			<Mutation mutation={UPDATE_USER_PAYOUT}>
				{mutate => (
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
										<>
											<MainForm
												bankAccount={bankAccount}
												translate={translate}
											/>
											<div className="row  center">
												<div className="col-xs-6">
													<SubmitButton
														glow
														type="submit"
														active={valid}
														onClick={submit(mutate)}
														name="save_payout_info"
													>
														{isUpdate ? translate("update") : translate("save")}
													</SubmitButton>
												</div>
											</div>

											<div className="row center">
												<div className="col-xs-10">
													<p className="terms_link text-center">
														{translate("payout.terms")}
													</p>
												</div>
											</div>
										</>
									);
								}}
							</Query>
						</TextWrapper>
					</Form>
				)}
			</Mutation>
		</div>
	);
};

const MainForm = ({ bankAccount, translate }) => {
	const bankAccountParsed = bankAccount || {};
	const [country, setCountry] = useState(bankAccountParsed.countryCode);
	const [bankName, setBankName] = useState(null);

	const inIndonesia = country === "ID";

	return (
		<>
			<div className="row">
				<div className="col-xs-12">
					<label>{translate("country")}</label>
					<CountrySelector
						value={bankAccountParsed.countryCode}
						name="country"
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
						name="currency"
						validate={["required"]}
						value={inIndonesia ? "IDR" : bankAccountParsed.currency}
						disabled={inIndonesia}
						placeholder={inIndonesia ? undefined : translate("currency")}
					/>
				</div>
			</div>
			<div className="row">
				<div className="col-xs-12">
					<label>{translate("payout.account-name")}</label>
					<Textfield
						value={bankAccountParsed.accountHolderName}
						name="name"
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
							<label>{translate("payout.account-number")}</label>
							<TextField
								name="bankAccountNumber"
								validate={["required"]}
								type="tel"
								fullWidth={false}
								placeholder={"000000000"}
							/>
						</div>
					</div>
					<div className="row">
						<div className="col-xs-12">
							<label>{translate("Bank")}</label>
							<ConnectedBankSelector
								value={bankAccountParsed.bankCode}
								name="bankCode"
								validate={["required"]}
								placeholder={" "}
							/>
						</div>
					</div>
				</>
			) : (
				<>
					<div className="row">
						<div className="col-xs-12">
							<label>{translate("payout.IBAN-number")}</label>
							<IbanField
								onChange={setBankName}
								name="iban"
								validate={["required"]}
							>
								<InfoPopup info={translate("payout.IBAN-description")} />
							</IbanField>
						</div>
					</div>
					{typeof bankName === "string" && (
						<div className="row">
							<div className="col-xs-12">
								<label>{translate("Bank")}</label>
								<Textfield disabled value={bankName} />
							</div>
						</div>
					)}
				</>
			)}
		</>
	);
};

const Injected = injectStripe(PayoutForm);

const StripeWrapper = props => {
	const [stripe, setStripe] = useState(null);

	useEffect(() => {
		setStripe(window.Stripe(Environment.STRIPE_PUBLIC_KEY));
	}, []);

	return (
		<StripeProvider stripe={stripe}>
			<Elements>
				<Injected {...props} />
			</Elements>
		</StripeProvider>
	);
};

function mapStateToProps(state, ownprops) {
	return {
		...ownprops,
		translate: getTranslate(state.locale),
		currentLanguage: getActiveLanguage(state.locale).code
	};
}

export default connect(mapStateToProps)(StripeWrapper);
