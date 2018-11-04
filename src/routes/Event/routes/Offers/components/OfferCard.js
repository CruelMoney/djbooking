import React, { Component } from "react";
import PropTypes from "prop-types";
import Button from "../../../../../components/common/Button-v2";
import Rating from "../../../../../components/common/Rating";
import PayForm from "../../../../../components/common/PayForm";
import Popup from "../../../../../components/common/Popup";
import Chat from "../../../../../components/common/Chat";
import EmptyPage from "../../../../../components/common/EmptyPage";
import ReactPixel from "react-facebook-pixel";
import moment from "moment";
import CurrencyValue from "../../../../../components/common/CurrencyValue";
import { getTranslate } from "react-localize-redux";
import * as actions from "../../../../../actions/EventActions";
import { connect } from "react-redux";
import { ReactComponent as PhoneIcon } from "../../../../../assets/phone.svg";
import { ReactComponent as EmailIcon } from "../../../../../assets/email.svg";
import { PayUsingCueupOrganizer } from "../../../../../components/common/modals";

class OfferCard extends Component {
	static propTypes = {
		offer: PropTypes.object,
		paymentPossible: PropTypes.bool,
		disabled: PropTypes.bool
	};

	state = {
		showPopup: false,
		showChat: false,
		errors: null,
		loadingDecline: false
	};

	hidePopup = () => {
		this.setState({
			showPopup: false
		});
	};
	hideChat = () => {
		this.setState({
			showChat: false
		});
	};

	showPayment = () => {
		this.setState({ showPopup: true });
		ReactPixel.track("InitiateCheckout");
	};

	declineDJ = () => {
		const { declineDJ } = this.props;
		this.setState({
			error: null,
			loadingDecline: true
		});
		declineDJ((err, res) => {
			if (err) {
				this.setState({
					error: err.message,
					loadingDecline: false
				});
			} else {
				this.setState({
					loadingDecline: false
				});
			}
		});
	};

	render() {
		const { translate } = this.props;

		const memberSince = moment(this.props.offer.dj.createdAt).fromNow(true);

		const image = {
			backgroundImage: "url(" + this.props.offer.dj.picture + ")",
			backgroundRepeat: "no-repeat",
			backgroundPosition: "center",
			backgroundSize: "auto 100%",
			width: "80px",
			height: "80px",
			minWidth: "80px",
			borderRadius: "50%",
			marginRight: "20px"
		};

		const confirmed = this.props.offer.gigStatus === "Confirmed";
		return (
			<>
				<Popup showing={this.state.showPopup} onClickOutside={this.hidePopup}>
					<PayForm
						paymentPossible={this.props.paymentPossible}
						gigId={this.props.offer.gigID}
						fee={this.props.offer.serviceFeeAmount}
						amount={this.props.offer.amount}
						currency={this.props.currency}
						offerCurrency={this.props.offer.currency}
					/>
				</Popup>
				<Popup
					hideClose
					noPadding
					showing={this.state.showChat}
					onClickOutside={this.hideChat}
				>
					<Chat
						ModalContent={PayUsingCueupOrganizer}
						eventId={this.props.eventId}
						receiver={{
							id: this.props.offer.dj.auth0Id,
							name: this.props.offer.dj.censoredName,
							image: this.props.offer.dj.picture
						}}
						sender={{
							id: this.props.profileId,
							name: this.props.profileName,
							image: this.props.profilePicture
						}}
						chatId={this.props.offer.gigID}
						placeholder={
							<EmptyPage
								title="  "
								message={<div>{translate("event.offer.empty-chat")}</div>}
							/>
						}
					/>
				</Popup>
				<div className="card offer-card">
					<div style={{ display: "flex" }}>
						<div style={image} />
						<div className="top">
							<div>
								<div>
									<h4>{this.props.offer.dj.censoredName}</h4>

									<div className="dj-location">
										<svg
											version="1.1"
											id="Capa_1"
											x="0px"
											y="0px"
											width="1em"
											height="1em"
											viewBox="0 0 466.583 466.582"
											style={{ enableBackground: "new 0 0 466.583 466.582" }}
										>
											<g>
												<path d="M233.292,0c-85.1,0-154.334,69.234-154.334,154.333c0,34.275,21.887,90.155,66.908,170.834   c31.846,57.063,63.168,104.643,64.484,106.64l22.942,34.775l22.941-34.774c1.317-1.998,32.641-49.577,64.483-106.64   c45.023-80.68,66.908-136.559,66.908-170.834C387.625,69.234,318.391,0,233.292,0z M233.292,233.291c-44.182,0-80-35.817-80-80   s35.818-80,80-80c44.182,0,80,35.817,80,80S277.473,233.291,233.292,233.291z" />
											</g>
										</svg>
										{this.props.offer.dj.city}
									</div>
									<div className="dj-location">
										<PhoneIcon />
										{confirmed ? (
											<a href={"tel:" + this.props.offer.dj.phone}>
												{this.props.offer.dj.phone}
											</a>
										) : (
											translate("Phone number visible after confirmation")
										)}
									</div>
									<div className="dj-location">
										<EmailIcon />
										{confirmed ? (
											<a href={"mailto:" + this.props.offer.dj.email}>
												{this.props.offer.dj.email}
											</a>
										) : (
											translate("Email visible after confirmation")
										)}
									</div>
								</div>
								{this.props.offer.dj.avgRating === 0 ? (
									<p
										style={{
											fontSize: "12px",
											textAlign: "right",
											margin: "0"
										}}
									>
										{translate("Member for") + " " + memberSince}
									</p>
								) : (
									<Rating rating={this.props.offer.dj.avgRating} />
								)}
							</div>

							<Button
								className="send-message-button"
								onClick={() => this.setState({ showChat: true })}
								name="show-chat-popup"
							>
								{this.props.notification ? (
									<div className="notification-bubble">1</div>
								) : null}
								{translate("Message")}
							</Button>
						</div>
					</div>

					<div className="user-bio">{this.props.offer.dj.bio}</div>

					<div className="cancelation-policy">
						{this.props.onlyChat
							? null
							: translate("event.offer.refund", {
									days: this.props.offer.cancelationDays,
									percentage: this.props.offer.refundPercentage
								})}
					</div>

					<div className="bottom">
						{this.props.offer.gigStatus === "Confirmed" ||
						this.props.offer.gigStatus === "Accepted" ? (
							<div
								className="offer-price"
								style={{
									width: "100%",
									textAlign: "center"
								}}
							>
								{this.props.offer.gigStatus === "Confirmed" ? (
									<CurrencyValue
										amount={this.props.paymentAmount}
										from={this.props.paymentCurrency}
										to={this.props.currency}
										safeConvert
									/>
								) : (
									<CurrencyValue
										amount={
											this.props.offer.amount +
											this.props.offer.serviceFeeAmount
										}
										from={this.props.offer.currency}
										to={this.props.currency}
										safeConvert
									/>
								)}
							</div>
						) : null}

						{this.props.disabled ? null : (
							<div
								style={{
									display: "flex",
									alignItems: "center",
									justifyContent: "center",
									marginTop: "15px"
								}}
							>
								{this.props.offer.gigStatus === "Accepted" ? (
									<Button
										warning={translate("decline-warning")}
										dangerous={true}
										disabled={this.props.disabled}
										active={false}
										onClick={this.declineDJ}
										isLoading={this.state.loadingDecline}
										name="decline-dj"
									>
										{translate("Decline DJ")}
									</Button>
								) : null}

								{this.props.offer.gigStatus === "Confirmed" ||
								this.props.offer.gigStatus === "Requested" ||
								this.props.eventFinished ? null : (
									<Button
										glow
										disabled={this.props.disabled}
										active={true}
										onClick={this.showPayment}
										name="show-payout-popup"
									>
										{translate("Confirm")}
									</Button>
								)}
							</div>
						)}
						<div className="errors">
							<p className="error">{this.state.error}</p>
						</div>
					</div>
				</div>
			</>
		);
	}
}

export const mapStateToProps = state => {
	return {
		...state,
		translate: getTranslate(state.locale)
	};
};

export const mapDispatchToProps = (dispatch, ownProps) => {
	console.log({ ownProps });
	return {
		declineDJ: callback =>
			dispatch(
				actions.declineDJ(ownProps.event, ownProps.offer.gigID, callback)
			)
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(OfferCard);
