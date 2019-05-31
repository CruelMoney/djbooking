import React, { Component } from "react";
import Button from "../../../../../components/common/Button-v2";
import TextField from "../../../../../components/common/Textfield";
import SubmitButton from "../../../../../components/common/SubmitButton";
import MoneyTable, {
	TableItem
} from "../../../../../components/common/MoneyTable";
import * as actions from "../../../../../actions/GigActions";
import { connect } from "react-redux";
import { localize } from "react-localize-redux";
import moment from "moment-timezone";
import formatter from "../../../../../utils/Formatter";
import { ConnectedCurrencySelector } from "../../../../../components/common/CountrySelector";

class OfferForm extends Component {
	componentWillMount() {
		const { profileCurrency, gig } = this.props;
		let { offer } = gig;

		offer = offer
			? {
					amount: offer.offer.amount,
					serviceFeeAmount: offer.serviceFee.amount,
					djFeeAmount: offer.djFee.amount,
					currency: offer.totalPayment.currency
			  }
			: {
					currency: profileCurrency.toUpperCase()
			  };

		this.setState({
			...offer
		});
	}

	updateOffer = (form, callback) => {
		const { payoutInfoValid, updateGig } = this.props;
		if (payoutInfoValid) {
			updateGig(this.state, callback);
		}
	};

	init = true;

	getFees = () => {
		//Dont fire first time
		if (this.init) {
			this.init = false;
			return;
		}

		this.setState(
			{
				loading: true
			},
			() =>
				actions.getFee(
					{
						...this.state
					},
					(err, res) => {
						if (err) {
							this.setState({
								loading: false
							});
						} else {
							this.setState({
								...res,
								loading: false
							});
						}
					}
				)
		);
	};

	render() {
		const {
			translate,
			currentLanguage,
			payoutInfoValid,
			gig,
			event,
			cancelGig,
			declineGig,
			showPopup
		} = this.props;
		const { currency } = this.state;
		return (
			<div>
				<div name={"gig-offer-" + gig.id}>
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
										onChange={val =>
											this.setState({ amount: parseInt(val, 10) })
										}
										value={this.state.amount}
									/>
								</div>
								<div className="col-sm-6">
									<ConnectedCurrencySelector initialValue={currency} />
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
											this.state.amount,
											this.state.currency,
											currentLanguage
										)}
									</TableItem>
									<TableItem
										label={translate("Service fee")}
										info={<div>{translate("gig.offer.service-fee-info")}</div>}
									>
										{this.state.loading
											? "loading..."
											: formatter.money.price(
													this.state.serviceFeeAmount,
													this.state.currency,
													currentLanguage
											  )}
									</TableItem>
									<TableItem label="Total">
										{this.state.loading
											? "loading..."
											: formatter.money.price(
													this.state.serviceFeeAmount + this.state.amount,
													this.state.currency,
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
											this.state.amount,
											this.state.currency,
											currentLanguage
										)}
									</TableItem>
									<TableItem
										label={translate("DJ fee")}
										info={<div>{translate("gig.offer.dj-fee-info")}</div>}
									>
										{this.state.loading
											? "loading..."
											: formatter.money.price(
													-this.state.djFeeAmount,
													this.state.currency,
													currentLanguage
											  )}
									</TableItem>
									<TableItem label="Total">
										{this.state.loading
											? "loading..."
											: formatter.money.price(
													this.state.amount - this.state.djFeeAmount,
													this.state.currency,
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
									<SubmitButton
										rounded={true}
										dangerous
										warning={translate("gig.offer.decline-warning")}
										name="cancel_gig"
										onClick={(form, callback) => declineGig(gig.id, callback)}
									>
										{translate("Decline gig")}
									</SubmitButton>
								) : null}

								{gig.status === "CONFIRMED" ? (
									<SubmitButton
										rounded={true}
										dangerous
										warning={translate("gig.offer.cancel-warning")}
										name="cancel_gig"
										onClick={(form, callback) => cancelGig(gig.id, callback)}
									>
										{translate("Cancel gig")}
									</SubmitButton>
								) : null}
							</div>

							{gig.status === "REQUESTED" && payoutInfoValid ? (
								<SubmitButton
									rounded={true}
									name="send_offer"
									onClick={this.updateOffer}
								>
									{translate("Send offer")}
								</SubmitButton>
							) : null}

							{gig.status === "ACCEPTED" && payoutInfoValid ? (
								<SubmitButton
									rounded={true}
									name="update_offer"
									onClick={this.updateOffer}
								>
									{translate("Update offer")}
								</SubmitButton>
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
				</div>
			</div>
		);
	}
}

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
