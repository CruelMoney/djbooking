import React, { useRef } from "react";
import useComponentSize from "@rehooks/component-size";
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
import { LoadingPlaceholder2, LoadingIndicator } from "./LoadingPlaceholder";

const PayForm = ({
	translate,
	event,
	onPaymentConfirmed,
	currency,
	offer,
	eventConfirmed,
	changeCurrency,
	id,
	currentLanguage
}) => {
	const div = useRef();
	const size = useComponentSize(div);

	const paymentConfirmed = () => {
		tracker.trackEventPaid(offer.totalPayment.amount);
		ReactPixel.track("Purchase", {
			currency: currency,
			value: offer.totalPayment.amount
		});
		onPaymentConfirmed();
		eventConfirmed();
	};

	if (event.status === "Confirmed") {
		return <ThankYouContent style={size} translate={translate} />;
	}

	return (
		<div className="pay-form" ref={div}>
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
				{({ data = {}, loading, error }) => {
					const { requestPaymentIntent = {} } = data;
					const {
						recommendedCurrency,
						__typename,
						offer
					} = requestPaymentIntent;
					const showCurrencyChange = recommendedCurrency !== currency;

					console.log({ error });
					if (error) return null;
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
										onPaymentConfirmed={paymentConfirmed}
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
												href="#recommended"
												onClick={_ => {
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
};

const ThankYouContent = ({ translate, style }) => {
	return (
		<div className="payment-confirmation" style={style}>
			<Button succes={true} rounded active glow />
			<h3>{translate("payment-succes-message")}</h3>
		</div>
	);
};

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
)(PayForm);

export default props => <SmartPay {...props} />;
