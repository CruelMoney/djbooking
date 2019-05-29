import React, { Component } from "react";
import OfferCard from "./OfferCard";
import { notificationService } from "../../../../../utils/NotificationService";
import { connect } from "react-redux";
import moment from "moment-timezone";
import EmptyPage from "../../../../../components/common/EmptyPage";
import Helmet from "react-helmet-async";
import { getTranslate, getActiveLanguage } from "react-localize-redux";
import { Query } from "react-apollo";
import { EVENT } from "../../../gql";
import { LoadingCard } from "../../../../../components/common/LoadingPlaceholder";

class EventOffers extends Component {
	componentWillMount() {
		var daysUntil = moment(this.props.eventDate).diff(moment(), "days");

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
			event,
			currency,
			notifications,
			translate,
			currentLanguage
		} = this.props;
		const title = this.props.event.name + " | " + translate("Offers");

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
								{this.props.status === "Confirmed"
									? translate("event.paid-message")
									: translate("event.contact-dj-message")}
							</p>
						</div>
					</div>
					<div className="row event-information">
						<Query
							query={EVENT}
							variables={{
								id: event.id,
								hash: event.hashKey.toString(),
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
												eventId={this.props.event.id}
												notification={notification}
												profileId={this.props.eventContactId}
												profileName={this.props.eventContactName}
												profilePicture={this.props.eventContactPicture}
												paymentPossible={this.state.paymentPossible}
												eventFinished={this.state.eventFinished}
												currency={this.props.currency}
												paymentAmount={this.props.paymentAmount}
												paymentCurrency={this.props.paymentCurrency}
												gig={o}
												event={this.props.event}
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
		event: state.events.values[0],
		eventContactId: state.events.values[0].auth0Id,
		eventContactName: state.events.values[0].contactName,
		eventContactPicture:
			state.login.profile.picture ||
			"/static/media/default-profile-pic.228cd63f.png",
		notifications: state.notifications.data,
		status: state.events.values[0].status,
		paymentAmount: state.events.values[0].paymentAmount,
		paymentCurrency: state.events.values[0].paymentCurrency,
		eventName: state.events.values[0].name,
		offers: state.events.values[0].offers,
		eventDate: state.events.values[0].startTime,
		currency: state.login.status.signedIn
			? state.login.profile.settings.currency
			: state.session.currency,
		currentLanguage: getActiveLanguage(state.locale).code
	};
}

export default connect(mapStateToProps)(EventOffers);
