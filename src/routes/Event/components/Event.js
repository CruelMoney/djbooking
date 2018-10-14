import React, { Component } from "react";
import PropTypes from "prop-types";
import EventHeader from "./blocks/EventHeader";
import Footer from "../../../components/common/Footer";
import LoadingPlaceholder from "../../../components/common/LoadingPlaceholder";
import { notificationService } from "../../../utils/NotificationService";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import * as actions from "../../../actions/EventActions";
import * as commonActions from "../../../actions/Common";
import "../../../css/transitions.css";

class event extends Component {
	themeColor = "#25F4D2";
	secondColor = "#31DAFF";

	static childContextTypes = {
		color: PropTypes.string
	};

	state = {
		notification: "You have no new notifications",
		redirected: false
	};

	componentWillMount() {
		const { fetchEvent, match } = this.props;
		fetchEvent(match.params.id, match.params.hash, null);
	}

	goToOffers = () => {
		const { history } = this.props;
		if (!this.state.redirected) {
			let newPath = history.location.pathname.split("/");
			if (newPath.length > 4) {
				newPath.pop();
			}
			newPath.push("offers");
			newPath = newPath.join("/");
			this.setState(
				{
					redirected: true
				},
				() => history.replace(newPath)
			);
		}
	};

	componentDidMount() {
		notificationService.init(this.props.customerId);
	}

	componentWillReceiveProps(nextProps) {
		const { translate } = this.props;
		const { event, notifications, customerId } = nextProps;
		notificationService.init(customerId);
		if (event && !event.emailVerified) {
			this.setState({
				notification: translate("event.notifications.verify-email")
			});
		} else if (event) {
			if (
				event.offers &&
				event.offers.some(offer => {
					return notifications.some(noti => {
						return String(noti.room) === String(offer.gigID);
					});
				})
			) {
				this.setState({
					notification: translate("event.notifications.unread-messages")
				});
				this.goToOffers();
				return;
			}

			this.setState({
				notification:
					event.status === "Cancelled"
						? translate("event.notifications.cancelled")
						: event.status === "Initial"
							? translate("event.notifications.initial")
							: event.status === "Offering"
								? event.referredBy > 0
									? translate("event.notifications.offering-referred")
									: translate("event.notifications.offering")
								: event.status === "NoMatches"
									? translate("event.notifications.no-matches")
									: event.status === "Accepted"
										? event.referredBy > 0
											? translate("event.notifications.accepted-referred")
											: translate("event.notifications.accepted")
										: event.status === "Confirmed"
											? translate("event.notifications.confirmed")
											: event.status === "Finished" && event.chosenOfferId === 0
												? translate("event.notifications.finished")
												: event.status === "Finished"
													? translate("event.notifications.finished-review")
													: translate("event.notifications.default")
			});
		} else {
			this.setState({
				notification: translate("event.notifications.default")
			});
		}
	}

	getChildContext() {
		return {
			color: this.themeColor
		};
	}

	render() {
		const { translate } = this.props;

		function renderLoadingItem() {
			return [
				<LoadingPlaceholder />,
				<LoadingPlaceholder />,
				<LoadingPlaceholder />,
				<LoadingPlaceholder />,
				<LoadingPlaceholder />
			];
		}

		return (
			<div>
				<EventHeader
					event={this.props.event}
					notification={this.state.notification}
					loggedIn={this.props.loggedIn}
					permaLink={
						this.props.loggedIn
							? this.props.profile.user_metadata.permaLink
							: ""
					}
					loading={this.props.loading}
					hash={this.props.match.params.hash}
				/>

				<div className="user-container container">
					<div className="row">
						<div style={{ paddingTop: "11px" }} className={"col-xs-12"}>
							{this.props.loading || !this.props.event ? (
								<div className="row">
									<div className="col-xs-push-3 col-xs-7">
										{renderLoadingItem()}
									</div>
								</div>
							) : (
								this.props.children
							)}
						</div>
					</div>
				</div>

				<Footer
					color={this.secondColor}
					firstTo={translate("routes./how-it-works")}
					secondTo={translate("routes./")}
					firstLabel={translate("how-it-works")}
					secondLabel={translate("arrange-event")}
					title={translate("Organizing a new event?")}
					subTitle={translate("See how it works, or arrange an event.")}
				/>
			</div>
		);
	}
}

function mapStateToProps(state, ownProps) {
	const id = ownProps.match.params.id;
	const theEvent = state.events.values.find(e => e.id === Number(id));
	return {
		event: theEvent,
		customerId: theEvent ? theEvent.auth0Id : null,
		profile: state.login.profile,
		loading: state.events.isWaiting,
		loggedIn: state.login.status.signedIn,
		notifications: state.notifications.data
	};
}

function mapDispatchToProps(dispatch, ownProps) {
	return {
		fetchEvent: (id, hash, authId) =>
			dispatch(actions.fetchEvent(id, hash, authId)),
		updateEvent: (event, callback) =>
			dispatch(actions.updateEvent(event, callback)),
		payEvent: () => {
			console.log("not implemented");
		},
		reviewEvent: (review, callback) =>
			dispatch(actions.reviewEvent(review, callback)),
		cancelEvent: (id, callback) => dispatch(actions.cancelEvent(id, callback)),
		registerMenuItem: (name, route) =>
			dispatch(commonActions.registerMenuItem(name, route)),
		removeMenuItem: name => dispatch(commonActions.registerMenuItem(name))
	};
}

const SmartEvent = withRouter(
	connect(mapStateToProps, mapDispatchToProps)(event)
);

export default props => <SmartEvent {...props} />;
