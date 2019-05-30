import React, { Component } from "react";

import TextWrapper from "./TextElement";
import Button from "./Button-v2";
import { connect } from "react-redux";
import * as actions from "../../actions/EventActions";
import MoneyTable, { TableItem } from "./MoneyTable";
import { getTranslate, getActiveLanguage } from "react-localize-redux";
import { Query } from "react-apollo";
import { REQUEST_PAYMENT_INTENT } from "../../routes/Event/gql";
import StripeFormWrapper from "./StripePayForm";
import * as tracker from "../../utils/analytics/autotrack";
import ReactPixel from "react-facebook-pixel";
import { changeCurrency } from "../../actions/SessionActions";
import XenditPayForm from "./XenditPayForm";
import LoadingPlaceholder, { LoadingPlaceholder2 } from "./LoadingPlaceholder";

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

	onPaymentConfirmed = () => {
		const { onPaymentConfirmed, currency, offer, eventConfirmed } = this.props;
		tracker.trackEventPaid(offer.totalPayment.amount);
		ReactPixel.track("Purchase", {
			currency: currency,
			value: offer.totalPayment.amount
		});
		onPaymentConfirmed();
		eventConfirmed();
	};

	render() {
		const {
			translate,
			changeCurrency,
			id,
			currency,
			currentLanguage
		} = this.props;

		return (
			<div className="pay-form">
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
						const { requestPaymentIntent = {} } = data;
						const {
							recommendedCurrency,
							__typename,
							offer
						} = requestPaymentIntent;
						const showCurrencyChange = recommendedCurrency !== currency;

						return (
							<>
								<div className="left">
									<TextWrapper
										label={translate("Pay")}
										showLock={true}
										text={translate("event.offer.payment-info")}
									/>
									{loading ? (
										<LoadingIndicator label={translate("gettingPayment")} />
									) : (
										<StripeFormWrapper
											onPaymentConfirmed={this.onPaymentConfirmed}
											paymentIntent={requestPaymentIntent}
										/>
									)}
								</div>

								<div className="right">
									{!loading &&
										showCurrencyChange && (
											<p className="notice">
												This DJ uses a different currency than {currency}, you
												might getter a better deal by paying in{" "}
												{recommendedCurrency}.{" "}
												<a
													href
													onClick={_ => {
														console.log({ recommendedCurrency });
														changeCurrency(recommendedCurrency);
													}}
												>
													Change to {recommendedCurrency}
												</a>
											</p>
										)}
									{loading ? (
										<LoadingPlaceholder2 />
									) : (
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
											<TableItem label="Total">
												{offer.totalPayment.formatted}
											</TableItem>
										</MoneyTable>
									)}
									<p className="terms_link">{translate("event.offer.terms")}</p>
								</div>
							</>
						);
					}}
				</Query>
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
		notify: (id, hash, callback) =>
			dispatch(actions.notifyPayment(id, hash, callback)),
		eventConfirmed: id => dispatch(actions.eventConfirmed(id)),
		changeCurrency: currency => {
			dispatch(changeCurrency(currency));
		}
	};
}

const SmartPay = connect(
	mapStateToProps,
	mapDispatchToProps
)(payForm);

export default props => <SmartPay {...props} />;
