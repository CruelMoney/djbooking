import React, { Component } from "react";
import OfferCard from "./OfferCard";
import { notificationService } from "../../../../../utils/NotificationService";
import { connect } from "react-redux";
import moment from "moment-timezone";
import EmptyPage from "../../../../../components/common/EmptyPage";
import { Helmet } from "react-helmet-async";

import { getTranslate, getActiveLanguage } from "react-localize-redux";
import { Query } from "react-apollo";
import { EVENT, EVENT_GIGS } from "../../../gql";
import { LoadingCard } from "../../../../../components/common/LoadingPlaceholder";

class EventOffers extends Component {
	componentWillMount() {
		const { theEvent } = this.props;

		var daysUntil = moment(theEvent.start).diff(moment(), "days");

		this.setState({
			paymentPossible: daysUntil <= 80,
			eventFinished: daysUntil < 0,
			gigMessages: {}
		});
	}

	componentDidMount() {
		notificationService.getChatStatus().then((res, err) => {
			if (!!err) {
				return;
			}
			this.setState({
				gigMessages: res
			});
		});
	}

	render() {
		const {
			theEvent,
			currency,
			notifications,
			translate,
			currentLanguage,
			hashKey
		} = this.props;
		const title = theEvent.name + " | " + translate("Offers");

		return (
			<div className="offers">
				<Helmet>
					<title>{title}</title>
					<meta property="og:title" content={title} />
					<meta name="twitter:title" content={title} />
				</Helmet>

				<div>
					<div className="row center">
						<div className="col-sm-6 col-xs-12">
							<p
								style={{
									textAlign: "center",
									marginBottom: "20px"
								}}
							>
								{theEvent.status === "Confirmed"
									? translate("event.paid-message")
									: translate("event.contact-dj-message")}
							</p>
						</div>
					</div>
					<div className="row event-information">
						<Query
							query={EVENT_GIGS}
							variables={{
								id: theEvent.id,
								hash: hashKey.toString(),
								currency,
								locale: currentLanguage
							}}
							onError={console.log}
						>
							{({ data = {}, loading }) => {
								if (loading) {
									return <LoadingCard />;
								}
								const { event = {} } = data;
								const { gigs = [] } = event;
								const renderGigs = [];

								gigs.forEach((o, i) => {
									const notification = notifications.find(
										n => String(n.room) === String(o.id)
									);
									const hasMessages = !!this.state.gigMessages[o.id];
									const hasOffer =
										o.status === "ACCEPTED" || o.status === "CONFIRMED";

									if (hasOffer || hasMessages) {
										const offer = (
											<OfferCard
												key={o.id}
												onlyChat={!hasOffer && hasMessages}
												eventId={event.id}
												notification={notification}
												profileId={theEvent.organizer.id}
												profileName={theEvent.contactName}
												profilePicture={theEvent.organizer.picture.path}
												paymentPossible={this.state.paymentPossible}
												eventFinished={this.state.eventFinished}
												currency={currency}
												gig={o}
												event={event}
											/>
										);

										renderGigs.push(offer);
									}
								});

								if (renderGigs.length === 0) {
									return (
										<EmptyPage
											message={
												<div style={{ marginBottom: "180px" }}>
													{translate("event.no-offers-message")}
												</div>
											}
										/>
									);
								}

								return renderGigs;
							}}
						</Query>
					</div>
				</div>
			</div>
		);
	}
}

function mapStateToProps(state, ownProps) {
	return {
		translate: getTranslate(state.locale),
		notifications: state.notifications.data,
		currency: state.login.status.signedIn
			? state.login.profile.settings.currency
			: state.session.currency,
		currentLanguage: getActiveLanguage(state.locale).code
	};
}

export default connect(mapStateToProps)(EventOffers);
