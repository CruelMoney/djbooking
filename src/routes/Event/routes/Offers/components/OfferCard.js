import React, { Component } from "react";
import PropTypes from "prop-types";
import Button from "../../../../../components/common/Button-v2";
import Rating from "../../../../../components/common/Rating";
import PayForm from "../../../../../components/common/PayForm";
import Popup from "../../../../../components/common/Popup";
import Chat from "../../../../../components/common/Chat";
import EmptyPage from "../../../../../components/common/EmptyPage";
import ReactPixel from "react-facebook-pixel";
import { getTranslate } from "react-localize-redux";
import { connect } from "react-redux";
import { ReactComponent as PhoneIcon } from "../../../../../assets/phone.svg";
import { ReactComponent as EmailIcon } from "../../../../../assets/email.svg";
import { PayUsingCueupOrganizer } from "../../../../../components/common/modals";
import { Mutation } from "react-apollo";
import { PAYMENT_CONFIRMED, DECLINE_DJ } from "../../../gql";
import NotifyPayment from "../../../../../components/common/NotifyPayment";

class OfferCard extends Component {
	static propTypes = {
		offer: PropTypes.object,
		paymentPossible: PropTypes.bool,
		disabled: PropTypes.bool
	};

	state = {
		showPopup: false,
		showNotificationPopup: false,
		showChat: false,
		errors: null
	};

	hidePopup = () => {
		this.setState({
			showPopup: false,
			showNotificationPopup: false
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

	showNotifyPopup = () => {
		this.setState({ showNotificationPopup: true });
	};

	render() {
		const {
			disabled,
			translate,
			paymentPossible,
			currency,
			gig,
			profileId,
			eventId,
			profileName,
			profilePicture,
			notification,
			onlyChat,
			event,
			hashKey
		} = this.props;

		const { offer, dj } = gig;
		const image = dj
			? {
					backgroundImage: "url(" + dj.picture.path + ")",
					backgroundRepeat: "no-repeat",
					backgroundPosition: "center",
					backgroundSize: "auto 100%",
					width: "80px",
					height: "80px",
					minWidth: "80px",
					borderRadius: "50%",
					marginRight: "20px"
			  }
			: null;
		const confirmed = gig.status === "CONFIRMED";
		return (
			<>
				{offer && (
					<Popup
						showing={this.state.showNotificationPopup}
						onClickOutside={this.hidePopup}
					>
						<NotifyPayment
							hashKey={hashKey}
							eventId={eventId}
							daysUntilPaymentPossible={offer.daysUntilPaymentPossible}
						/>
					</Popup>
				)}
				{offer && (
					<Popup
						showing={this.state.showPopup}
						onClickOutside={this.hidePopup}
						noPadding
					>
						<Mutation
							mutation={PAYMENT_CONFIRMED}
							variables={{ gigId: gig.id, eventId }}
						>
							{mutate => (
								<PayForm
									paymentPossible={paymentPossible}
									onPaymentConfirmed={mutate}
									id={gig.id}
									offer={offer}
									event={event}
									currency={currency}
								/>
							)}
						</Mutation>
					</Popup>
				)}
				{dj && (
					<Popup
						hideClose
						noPadding
						showing={this.state.showChat}
						onClickOutside={this.hideChat}
					>
						<Chat
							showPersonalInformation={confirmed}
							ModalContent={PayUsingCueupOrganizer}
							eventId={eventId}
							receiver={{
								id: dj.id,
								name: dj.userMetadata.firstName,
								image: dj.picture.path
							}}
							sender={{
								id: profileId,
								name: profileName,
								image: profilePicture
							}}
							chatId={gig.id}
							placeholder={
								<EmptyPage
									title="  "
									message={<div>{translate("event.offer.empty-chat")}</div>}
								/>
							}
						/>
					</Popup>
				)}
				<div className="card offer-card">
					{dj ? (
						<>
							<div style={{ display: "flex" }}>
								<div style={image} />
								<div className="top">
									<div>
										<div style={{ width: "55%" }}>
											<h4>{dj.userMetadata.firstName}</h4>

											<div className="dj-location">
												<svg
													version="1.1"
													id="Capa_1"
													x="0px"
													y="0px"
													width="1em"
													height="1em"
													viewBox="0 0 466.583 466.582"
													style={{
														enableBackground: "new 0 0 466.583 466.582"
													}}
												>
													<g>
														<path d="M233.292,0c-85.1,0-154.334,69.234-154.334,154.333c0,34.275,21.887,90.155,66.908,170.834   c31.846,57.063,63.168,104.643,64.484,106.64l22.942,34.775l22.941-34.774c1.317-1.998,32.641-49.577,64.483-106.64   c45.023-80.68,66.908-136.559,66.908-170.834C387.625,69.234,318.391,0,233.292,0z M233.292,233.291c-44.182,0-80-35.817-80-80   s35.818-80,80-80c44.182,0,80,35.817,80,80S277.473,233.291,233.292,233.291z" />
													</g>
												</svg>
												{dj.playingLocation.name}
											</div>
											{dj.userMetadata.phone && (
												<div className="dj-location">
													<PhoneIcon />
													{confirmed ? (
														<a href={"tel:" + dj.userMetadata.phone}>
															{dj.userMetadata.phone}
														</a>
													) : (
														translate("Phone number visible after confirmation")
													)}
												</div>
											)}
											<div className="dj-location">
												<EmailIcon />
												{confirmed ? (
													<a href={"mailto:" + dj.email}>{dj.email}</a>
												) : (
													translate("Email visible after confirmation")
												)}
											</div>
										</div>
										{dj.averageRating && dj.averageRating > 0 && (
											<Rating
												rating={
													dj.averageRating // </p> // 	{translate("Member for") + " " + memberSince} // > // 	}} // 		lineHeight: "1.2em" // 		margin: "0", // 		textAlign: "right", // 		fontSize: "12px", // 	style={{ // <p
												}
											/>
										)}
									</div>

									<Button
										className="send-message-button"
										onClick={() => this.setState({ showChat: true })}
										name="show-chat-popup"
									>
										{notification ? (
											<div className="notification-bubble">1</div>
										) : null}
										{translate("Message")}
									</Button>
								</div>
							</div>

							<div className="user-bio">{dj.userMetadata.bio}</div>
						</>
					) : null}

					<div className="cancelation-policy">
						{onlyChat
							? null
							: translate("event.offer.refund", {
									days: offer.cancelationPolicy.days,
									percentage: offer.cancelationPolicy.percentage
							  })}
					</div>

					<div className="bottom">
						{["CONFIRMED", "ACCEPTED", "FINISHED"].includes(gig.status) ? (
							<div
								className="offer-price"
								style={{
									width: "100%",
									textAlign: "center"
								}}
							>
								{["CONFIRMED", "FINISHED"].includes(gig.status) ? (
									<p>Paid</p>
								) : null}
								{offer.totalPayment.formatted}
							</div>
						) : null}

						{disabled ? null : (
							<div
								style={{
									display: "flex",
									alignItems: "center",
									justifyContent: "center",
									marginTop: "15px"
								}}
							>
								{["ACCEPTED", "REQUESTED"].includes(gig.status) ? (
									<Mutation
										mutation={DECLINE_DJ}
										variables={{ gigId: gig.id }}
										onCompleted={_ => {
											window.location.reload();
										}}
									>
										{(mutate, { loading }) => (
											<Button
												warning={translate("decline-warning")}
												dangerous={true}
												active={false}
												onClick={_ => mutate()}
												isLoading={loading}
												name="decline-dj"
											>
												{translate("Decline DJ")}
											</Button>
										)}
									</Mutation>
								) : null}

								{["CONFIRMED", "REQUESTED", "FINISHED"].includes(
									gig.status
								) ? null : (
									<Button
										glow
										disabled={disabled}
										active={true}
										onClick={
											offer.canBePaid ? this.showPayment : this.showNotifyPopup
										}
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
		translate: getTranslate(state.locale)
	};
};

export default connect(mapStateToProps)(OfferCard);
