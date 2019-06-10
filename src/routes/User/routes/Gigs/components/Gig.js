import React, { Component } from "react";
import TextWrapper from "../../../../../components/common/TextElement";
import {
	CollapsibleContainer,
	Collapsible
} from "../../../../../components/common/Collapsible";
import OfferForm from "./OfferForm";
import PayoutForm from "../../../../../components/common/PayoutForm";
import Popup from "../../../../../components/common/Popup";
import Chat from "../../../../../components/common/Chat";
import moment from "moment-timezone";
import { connect } from "react-redux";
import * as actions from "../../../../../actions/GigActions";
import { localize } from "react-localize-redux";
import { PayUsingCueupDJ } from "../../../../../components/common/modals";
class Gig extends Component {
	state = {
		showPopup: false,
		gigStatus: ""
	};

	showPopup = () => {
		this.setState({
			showPopup: true
		});
	};

	componentWillUnmount() {
		if (this.timeLeft) {
			clearInterval(this.timeLeft);
		}
	}

	componentWillReceiveProps(nextprops) {
		if (this.props.gig.status !== nextprops.gig.status) {
			this.setGigStatus(nextprops);
		}
	}

	render() {
		const { translate, gig, payoutInfoValid, notification, user } = this.props;
		const { event, statusHumanized } = gig;
		const {
			organizer,
			genres,
			status,
			location,
			start,
			end,
			guestsCount
		} = event;

		const { userSettings = {}, userMetadata = {}, picture = {} } = user;

		const showContactInfo = status === "CONFIRMED" && payoutInfoValid;

		return (
			<div>
				<Popup
					showing={this.state.showPopup}
					onClickOutside={() => this.setState({ showPopup: false })}
				>
					<PayoutForm />
				</Popup>

				<div className="card gig">
					<div className="col-xs-12">
						<div className="event-top">
							<div>
								<div className="event-name">{event.name}</div>
								<div className="event-location">
									<svg
										version="1.1"
										id="Capa_1"
										x="0px"
										y="0px"
										width="15px"
										height="15px"
										viewBox="0 0 466.583 466.582"
										style={{ enableBackground: "new 0 0 466.583 466.582" }}
									>
										<g>
											<path d="M233.292,0c-85.1,0-154.334,69.234-154.334,154.333c0,34.275,21.887,90.155,66.908,170.834   c31.846,57.063,63.168,104.643,64.484,106.64l22.942,34.775l22.941-34.774c1.317-1.998,32.641-49.577,64.483-106.64   c45.023-80.68,66.908-136.559,66.908-170.834C387.625,69.234,318.391,0,233.292,0z M233.292,233.291c-44.182,0-80-35.817-80-80   s35.818-80,80-80c44.182,0,80,35.817,80,80S277.473,233.291,233.292,233.291z" />
										</g>
									</svg>
									{" " + location.name}
								</div>
							</div>
							<div className="gig-from-now">{moment(start).fromNow()}</div>
							<div className="gig-status">{statusHumanized}</div>
						</div>

						<CollapsibleContainer>
							<Collapsible name="EventInfo" label={translate("gig.event.info")}>
								<p style={{ marginBottom: "30px" }}>
									{translate("gig.event.info-description")}
								</p>
								<TextWrapper label={translate("date")}>
									<p>{moment(start).format("dddd, MMMM Do YYYY")}</p>
								</TextWrapper>

								<TextWrapper label={translate("description")}>
									<p>{event.description}</p>
								</TextWrapper>
								<TextWrapper label={translate("guests")}>
									<p>
										{translate("request-form.step-3.guests-description", {
											prefix:
												guestsCount === 1000
													? translate("over")
													: translate("around"),
											amount: guestsCount
										})}
									</p>
								</TextWrapper>
							</Collapsible>

							<Collapsible
								name="Requirements"
								label={translate("gig.event.requirements")}
							>
								<TextWrapper label={translate("equipment")}>
									<p>{event.rider.formatted}</p>
								</TextWrapper>

								<TextWrapper label={translate("duration")}>
									<p>
										{translate("gig.event.duration-description", {
											end: moment(end).format("HH:mm"),
											start: moment(start).format("HH:mm")
										})}
									</p>
								</TextWrapper>

								<TextWrapper label={translate("gig.event.genres")}>
									<p>{genres.join(", ")}</p>
								</TextWrapper>
							</Collapsible>

							{gig.status === "LOST" ? null : (
								<Collapsible
									lazyLoad
									name="ContactInfo"
									label={translate("gig.event.contact", {
										unread: notification ? "(Unread message 📫)" : ""
									})}
								>
									<p>
										{translate("gig.event.contact-description", {
											name: organizer.userMetadata.firstName
										})}
									</p>
									<div>
										{organizer.userMetadata.phone ? (
											<TextWrapper label={translate("Phone number")}>
												{showContactInfo ? (
													<a href={"tel:" + organizer.userMetadata.phone}>
														{organizer.userMetadata.phone}
													</a>
												) : (
													<p>
														{translate(
															"Appears after the offer is confirmed by the organizer."
														)}
													</p>
												)}
											</TextWrapper>
										) : null}

										<TextWrapper label="Email">
											{showContactInfo ? (
												<a href={"mailto:" + organizer.email}>
													{organizer.email}
												</a>
											) : (
												<p>
													{translate(
														"Appears after the offer is confirmed by the organizer."
													)}
												</p>
											)}
										</TextWrapper>
									</div>
									<TextWrapper label="Chat">
										<Chat
											ModalContent={PayUsingCueupDJ}
											eventId={event.id}
											receiver={{
												id: organizer.id,
												name: organizer.userMetadata.firstName,
												image: organizer.picture.path
											}}
											sender={{
												id: user.id,
												name: userMetadata.firstName,
												image: picture && picture.path
											}}
											chatId={gig.id}
										/>
									</TextWrapper>
								</Collapsible>
							)}

							{
								<Collapsible name="Offer" label={translate("Offer")}>
									<OfferForm
										showPopup={this.showPopup}
										profileCurrency={userSettings.currency}
										gig={gig}
										event={event}
										payoutInfoValid={!!userMetadata.bankAccount}
									/>
								</Collapsible>
							}
						</CollapsibleContainer>
					</div>
				</div>
			</div>
		);
	}
}

function mapDispatchToProps(dispatch, ownProps) {
	return {
		updateGig: (offer, callback) => dispatch(actions.makeOffer(offer, callback))
	};
}

const SmartGig = connect(
	_ => {},
	mapDispatchToProps
)(Gig);

export default localize(SmartGig, "locale");
