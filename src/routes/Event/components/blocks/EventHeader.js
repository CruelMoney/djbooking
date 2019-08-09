import React, { Component, Fragment } from "react";
import Navlink from "../../../../components/common/Navlink";
import EventNavigation from "./EventNavigation";
import Notification from "../../../../components/common/Notification";
import { getTranslate } from "react-localize-redux";
import { connect } from "react-redux";
import { notificationService } from "../../../../utils/NotificationService";

class eventHeader extends Component {
	state = { notification: "You have no new notifications", loadString: "..." };

	setValues = () => {
		const { height } = window.getComputedStyle(this.eventHeader);
		this.headerHeight = Number.parseInt(height);
		this.disabled = window.innerWidth <= 480;
		if (!this.disabled) {
			this.eventHeader.style.top = -this.headerHeight + 46 + "px";
		}
	};

	componentDidMount() {
		this.setValues();
		window.addEventListener("resize", this.setValues);
		notificationService.init(this.props.customerId);
	}

	componentWillUnmount() {
		window.removeEventListener("scroll", this.handleScroll);
		window.removeEventListener("resize", this.setValues);
		clearInterval(this.intervalID);
	}

	UNSAFE_componentWillReceiveProps(nextProps) {
		const { translate } = this.props;
		const { event, notifications } = nextProps;
		if (event) {
			notificationService.init(event.organizer.id);
			if (
				event.gigs &&
				event.gigs.some(gig => {
					return notifications.some(noti => {
						return String(noti.room) === String(gig.id);
					});
				})
			) {
				this.setState({
					notification: translate("event.notifications.unread-messages")
				});
				return;
			}

			this.setState({
				notification:
					event.status === "CANCELLED"
						? translate("event.notifications.cancelled")
						: event.status === "INITIAL"
						? translate("event.notifications.initial")
						: event.status === "OFFERING"
						? event.referredBy > 0
							? translate("event.notifications.offering-referred")
							: translate("event.notifications.offering")
						: event.status === "NO_MATCHES"
						? translate("event.notifications.no-matches")
						: event.status === "ACCEPTED"
						? event.referredBy > 0
							? translate("event.notifications.accepted-referred")
							: translate("event.notifications.accepted")
						: event.status === "CONFIRMED"
						? translate("event.notifications.confirmed")
						: event.status === "FINISHED"
						? translate("event.notifications.finished-review")
						: translate("event.notifications.default")
			});
		} else {
			this.setState({
				notification: translate("event.notifications.default")
			});
		}
	}

	componentDidUpdate() {
		this.setValues();
	}

	shouldComponentUpdate() {
		return true;
	}

	render() {
		const { translate } = this.props;
		return (
			<header ref={ref => (this.eventHeader = ref)} className="user-header">
				<div id="stripes" className="v2">
					<span />
					<span />
					<span />
					<span />
					<span />
				</div>

				<Notification message={this.state.notification} />

				<div className="container">
					<div
						style={{
							display: "flex",
							justifyContent: "center",
							textAlign: "center",
							alignItems: "center"
						}}
						className="row"
					>
						{this.props.loggedIn ? (
							<div className="back-button userNavigation">
								<Navlink
									to={translate("routes./user/:username/events", {
										username: this.props.permaLink
									})}
									label="< Events"
								/>
							</div>
						) : null}
						<div className="event-header-content col-sm-7">
							<div className="header-info">
								<div className="user-name">
									<h1>
										{this.props.loading || !this.props.event
											? "..."
											: translate("Welcome") +
											  " " +
											  this.props.event.contactName}
									</h1>
								</div>
								<div className="user-location">
									<h2>
										{this.props.loading || !this.props.event
											? "Loading"
											: this.props.event.name}
									</h2>
								</div>
							</div>

							{this.props.loading || !this.props.event ? null : (
								<Fragment>
									<div className="header-divider" />
									<EventNavigation
										paid={this.props.event.chosenOfferId !== 0}
										hash={this.props.hash}
										isFinished={this.props.event.status === "FINISHED"}
										id={this.props.event.id}
									/>
								</Fragment>
							)}
						</div>
					</div>
				</div>
			</header>
		);
	}
}

const mapStateToProps = state => ({
	translate: getTranslate(state.locale),
	notifications: state.notifications.data
});

const SmartNavigation = connect(
	mapStateToProps,
	null,
	null,
	{ pure: false }
)(eventHeader);

export default SmartNavigation;
