import React, { Component } from "react";
import PropTypes from "prop-types";
import TextField from "./Textfield";
import TextWrapper from "./TextElement";
import PoweredByStripe from "../../assets/powered_by_stripe.png";
import Form from "./Form-v2";
import Button from "./Button-v2";
import SubmitButton from "./SubmitButton";
import { connect } from "react-redux";
import * as actions from "../../actions/EventActions";
import { datePipeCard, cardNumberPipe } from "../../utils/TextPipes";
import Formatter from "../../utils/Formatter";
import MoneyTable, { TableItem } from "./MoneyTable";
import assign from "lodash.assign";
import { getTranslate, getActiveLanguage } from "react-localize-redux";
import { Query } from "react-apollo";
import { REQUEST_PAYMENT_INTENT } from "../../routes/Event/gql";
import StripeFormWrapper from "./StripePayForm";

class payForm extends Component {
	notify = (form, callback) => {
		const { translate, notify, event } = this.props;

		try {
			notify(event.id, event.hashKey, callback);
		} catch (error) {
			callback(translate("unknown-error"));
		}
	};

	state = {
		valid: false
	};

	render() {
		const {
			translate,
			paymentPossible,
			offer,
			id,
			currency,
			currentLanguage,
			country
		} = this.props;

		return (
			<div className="pay-form">
				<div className="left">
					<TextWrapper
						label={translate("Pay")}
						showLock={true}
						text={
							paymentPossible
								? translate("event.offer.payment-info")
								: translate("event.offer.pay-later")
						}
					/>

					{paymentPossible && (
						<Query
							query={REQUEST_PAYMENT_INTENT}
							variables={{
								id,
								currency,
								locale: currentLanguage
							}}
							onError={console.log}
							onCompleted={console.log}
						>
							{({ data, loading }) => {
								if (loading) {
									return (
										<LoadingIndicator label={translate("gettingPayment")} />
									);
								} else {
									return (
										<StripeFormWrapper
											paymentIntent={data.requestPaymentIntent}
										/>
									);
								}
							}}
						</Query>
					)}
				</div>

				<div className="right">
					<MoneyTable>
						<TableItem label={translate("DJ price")}>
							{offer.offer.formatted}
						</TableItem>
						<TableItem
							label={translate("Service fee")}
							info={<div>{translate("event.offer.fee")}</div>}
						>
							{offer.serviceFee.formatted}
						</TableItem>
						<TableItem label="Total">{offer.totalPayment.formatted}</TableItem>
					</MoneyTable>
					<p className="terms_link">{translate("event.offer.terms")}</p>
				</div>

				{/* {paymentPossible ? (
								<div className="col-md-pull-5 col-md-7">
									<div>
										<div className="row ">
											<div className="col-xs-12">
												<TextField
													big
													name="card_name"
													hintStyle={styles.medium.hint}
													style={styles.medium.textarea}
													inputStyle={styles.medium.input}
													type="text"
													validate={["required", "lastName"]}
													onUpdatePipeFunc={cardNumberPipe}
													fullWidth={false}
													placeholder={translate("Cardholder name")}
													underlineDisabledStyle={styles.plainBorder}
													underlineStyle={styles.dottedBorderStyle}
												/>
											</div>
										</div>
										<div className="row">
											<div className="col-xs-12">
												<TextField
													big
													name="card_number"
													hintStyle={styles.medium.hint}
													style={styles.medium.textarea}
													inputStyle={styles.medium.input}
													type="text"
													maxLength="19"
													validate={["required", "validateCardNumber"]}
													onUpdatePipeFunc={cardNumberPipe}
													fullWidth={false}
													placeholder="1234 1234 1234 1234"
													underlineDisabledStyle={styles.plainBorder}
													underlineStyle={styles.dottedBorderStyle}
												/>
											</div>
										</div>
										<div className="row">
											<div className="col-xs-6">
												<TextField
													big
													name="card_expiry"
													onUpdatePipeFunc={datePipeCard}
													maxLength="5"
													hintStyle={styles.medium.hint}
													style={styles.medium.textarea}
													inputStyle={styles.medium.input}
													validate={["required", "validateCardExpiry"]}
													type="text"
													fullWidth={true}
													placeholder={translate("mm/yy")}
													underlineDisabledStyle={styles.plainBorder}
													underlineStyle={styles.dottedBorderStyle}
												/>
											</div>
											<div className="col-xs-6">
												<TextField
													big
													name="card_cvc"
													hintStyle={styles.medium.hint}
													style={styles.medium.textarea}
													inputStyle={styles.medium.input}
													validate={["required", "validateCardCVC"]}
													type="number"
													fullWidth={false}
													placeholder="CVC"
													underlineDisabledStyle={styles.plainBorder}
													underlineStyle={styles.dottedBorderStyle}
												/>
											</div>
										</div>
									</div>
								</div>
							) : null} */}
			</div>
		);
	}
}

const LoadingIndicator = ({ label }) => (
	<div
		style={{
			height: "200px",
			textAlign: "center",
			display: "flex",
			alignItems: "center",
			justifyContent: "center",
			flexDirection: "column"
		}}
	>
		<Button rounded glow active disabled isLoading />
		<p style={{ marginTop: "1em" }}>{label}</p>
	</div>
);

function mapStateToProps(state, ownprops) {
	return {
		event: state.events.values[0],
		translate: getTranslate(state.locale),
		currentLanguage: getActiveLanguage(state.locale).code
	};
}

function mapDispatchToProps(dispatch, ownprops) {
	return {
		confirmPayment: (id, hash, data, callback) =>
			dispatch(actions.payEvent(id, hash, data, callback)),
		notify: (id, hash, callback) =>
			dispatch(actions.notifyPayment(id, hash, callback))
	};
}

const SmartPay = connect(
	mapStateToProps,
	mapDispatchToProps
)(payForm);

export default props => <SmartPay {...props} />;
