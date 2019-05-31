import React, { useReducer, useState } from "react";
import Button from "../../../../../components/common/Button-v2";
import TextField from "../../../../../components/common/Textfield";
import MoneyTable, {
	TableItem
} from "../../../../../components/common/MoneyTable";
import * as actions from "../../../../../actions/GigActions";
import { connect } from "react-redux";
import { localize } from "react-localize-redux";
import moment from "moment-timezone";
import formatter from "../../../../../utils/Formatter";
import { ConnectedCurrencySelector } from "../../../../../components/common/CountrySelector";
import debounce from "lodash.debounce";

const OfferForm = ({
	gig,
	profileCurrency,
	translate,
	currentLanguage,
	payoutInfoValid,
	event,
	cancelGig,
	updateGig,
	declineGig,
	showPopup
}) => {
	let { offer } = gig;

	const initState = offer
		? {
				amount: offer.offer.amount,
				serviceFeeAmount: offer.serviceFee.amount,
				djFeeAmount: offer.djFee.amount,
				currency: offer.totalPayment.currency
		  }
		: {
				currency: profileCurrency.toUpperCase()
		  };

	const [state, setState] = useState(initState);
	const [error, setError] = useState(null);
	const [currency, setCurrency] = useState(initState.currency);
	const [loading, setLoading] = useState(false);
	const [cancelLoading, setCancelLoading] = useState(false);
	const [submitLoading, setSubmitLoading] = useState(false);

	const updateOffer = () => {
		if (payoutInfoValid) {
			setSubmitLoading(true);
			updateGig(
				{ currency, amount: state.amount, gigId: gig.id },
				(err, res) => {
					setError(err.message);
					setSubmitLoading(false);
				}
			);
		}
	};

	const cancelOffer = () => {
		setCancelLoading(true);
		cancelGig(gig.id, (err, res) => {
			setError(err.message);
			setCancelLoading(false);
		});
	};

	const declineOffer = () => {
		setCancelLoading(true);
		declineGig(gig.id, (err, res) => {
			setError(err.message);
			setCancelLoading(false);
		});
	};

	const setCurrencyAndFetch = c => {
		setCurrency(c);
		getFees({ currency: c, amount: state.amount });
	};

	const getFeesDebounced = debounce(
		({ amount, newCurrency = currency }) => {
			actions.getFee(
				{
					...state,
					gigId: gig.id,
					amount: amount,
					currency: newCurrency
				},
				(err, res) => {
					setState({ ...state, ...res });
					setLoading(false);
				}
			);
		},
		1000,
		{ trailing: true }
	);

	const getFees = data => {
		setLoading(true);
		getFeesDebounced(data);
	};

	const canSubmit =
		(state.amount !== initState.amount || currency !== initState.currency) &&
		parseInt(state.amount, 10) > 0 &&
		!loading;

	return (
		<div>
			<div>
				{payoutInfoValid &&
				gig.status !== "CONFIRMED" &&
				gig.status !== "FINISHED" ? (
					<div>
						<div className="row">
							<div className="col-xs-12">
								<p>{translate("gig.offer.intro")}</p>

								{gig.referred ? <p>{translate("gig.offer.direct")}</p> : null}
							</div>
						</div>
						<div className="row" style={{ marginTop: "20px" }}>
							<div className="col-sm-6">
								<TextField
									name="amount"
									placeholder="00,00"
									//onUpdatePipeFunc={(oldVal,val)=>moneyPipe(oldVal,val,"DKK")}
									disabled={
										gig.status === "CANCELLED" ||
										gig.status === "LOST" ||
										gig.status === "CONFIRMED" ||
										gig.status === "FINISHED"
									}
									type="string"
									fullWidth={true}
									onChange={val => getFees({ amount: parseInt(val, 10) * 100 })}
									initialValue={initState.amount && initState.amount / 100}
								/>
							</div>
							<div className="col-sm-6">
								<ConnectedCurrencySelector
									initialValue={currency}
									onChange={setCurrencyAndFetch}
								/>
							</div>
						</div>
					</div>
				) : null}

				{payoutInfoValid ? (
					<div
						className="row card offer-table"
						style={{
							padding: "20px",
							marginBottom: "30px",
							marginTop: "20px"
						}}
					>
						<div className="col-sm-6">
							<h4 style={{ textAlign: "center" }}>
								{translate("Organizer pays")}
							</h4>
							<MoneyTable>
								<TableItem label={translate("Your price")}>
									{formatter.money.price(
										state.amount,
										currency,
										currentLanguage
									)}
								</TableItem>
								<TableItem
									label={translate("Service fee")}
									info={<div>{translate("gig.offer.service-fee-info")}</div>}
								>
									{loading
										? "loading..."
										: formatter.money.price(
												state.serviceFeeAmount,
												currency,
												currentLanguage
										  )}
								</TableItem>
								<TableItem label="Total">
									{loading
										? "loading..."
										: formatter.money.price(
												state.serviceFeeAmount + state.amount,
												currency,
												currentLanguage
										  )}
								</TableItem>
							</MoneyTable>
						</div>
						<div className="col-sm-6">
							<h4 style={{ textAlign: "center" }}>{translate("You earn")}</h4>
							<MoneyTable>
								<TableItem label={translate("Your price")}>
									{formatter.money.price(
										state.amount,
										currency,
										currentLanguage
									)}
								</TableItem>
								<TableItem
									label={translate("DJ fee")}
									info={<div>{translate("gig.offer.dj-fee-info")}</div>}
								>
									{loading
										? "loading..."
										: formatter.money.price(
												-state.djFeeAmount,
												currency,
												currentLanguage
										  )}
								</TableItem>
								<TableItem label="Total">
									{loading
										? "loading..."
										: formatter.money.price(
												state.amount - state.djFeeAmount,
												currency,
												currentLanguage
										  )}
								</TableItem>
							</MoneyTable>
						</div>
					</div>
				) : null}

				{gig.status === "LOST" ? <p>{translate("gig.offer.lost")}</p> : null}

				{!payoutInfoValid ? (
					<p>{translate("gig.offer.update-payout")}</p>
				) : null}

				{moment(event.start) > moment() ? (
					<div className="offer-buttons">
						<div name={"gig-cancel-" + gig.id}>
							{gig.status === "REQUESTED" || gig.status === "ACCEPTED" ? (
								<Button
									rounded={true}
									dangerous
									valid={true}
									warning={translate("gig.offer.decline-warning")}
									name="cancel_gig"
									isLoading={cancelLoading}
									onClick={declineOffer}
								>
									{translate("Decline gig")}
								</Button>
							) : null}

							{gig.status === "CONFIRMED" ? (
								<Button
									rounded={true}
									dangerous
									valid={true}
									warning={translate("gig.offer.cancel-warning")}
									name="cancel_gig"
									isLoading={cancelLoading}
									onClick={cancelOffer}
								>
									{translate("Cancel gig")}
								</Button>
							) : null}
						</div>

						{gig.status === "REQUESTED" && payoutInfoValid ? (
							<Button
								disabled={!canSubmit}
								active={canSubmit}
								rounded={true}
								name="send_offer"
								isLoading={submitLoading}
								onClick={updateOffer}
							>
								{translate("Send offer")}
							</Button>
						) : null}

						{gig.status === "ACCEPTED" && payoutInfoValid ? (
							<Button
								disabled={!canSubmit}
								active={canSubmit}
								rounded={true}
								name="update_offer"
								isLoading={submitLoading}
								onClick={updateOffer}
							>
								{translate("Update offer")}
							</Button>
						) : null}

						{!payoutInfoValid ? (
							<Button
								rounded={true}
								onClick={showPopup}
								name="show-payout-popup"
							>
								{translate("Update payout information")}
							</Button>
						) : null}
					</div>
				) : null}

				{error && <p className="error">{error}</p>}
			</div>
		</div>
	);
};

function mapStateToProps(state, ownProps) {
	const { profile } = state.login;
	const payoutInfoValid = profile.stripeID || profile.last4;

	return {
		discountPoints: profile.discountPoints,
		payoutInfoValid: !!payoutInfoValid
	};
}

function mapDispatchToProps(dispatch, ownProps) {
	return {
		cancelGig: (id, callback) => dispatch(actions.cancelGig(id, callback)),
		declineGig: (id, callback) => dispatch(actions.declineGig(id, callback)),
		updateGig: (offer, callback) => dispatch(actions.makeOffer(offer, callback))
	};
}

const SmartGig = connect(
	mapStateToProps,
	mapDispatchToProps
)(OfferForm);

export default localize(SmartGig, "locale");
