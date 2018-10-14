import React, { Component, Fragment } from "react";
import Navlink from "../../../../components/common/Navlink";
import EventNavigation from "./EventNavigation";
import Notification from "../../../../components/common/Notification";
import { getTranslate } from "react-localize-redux";
import { connect } from "react-redux";
class eventHeader extends Component {
	setValues = () => {
		const { height, ...rest } = window.getComputedStyle(this.eventHeader);
		this.headerHeight = Number.parseInt(height);
		this.disabled = window.innerWidth <= 480;
		if (!this.disabled) {
			this.eventHeader.style.top = -this.headerHeight + 46 + "px";
		}
	};

	componentDidMount() {
		this.setValues();
		window.addEventListener("resize", this.setValues);
	}

	componentWillUnmount() {
		window.removeEventListener("scroll", this.handleScroll);
		window.removeEventListener("resize", this.setValues);
		clearInterval(this.intervalID);
	}

	state = { loadString: "..." };

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

				<Notification message={this.props.notification} />

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
										isFinished={this.props.event.status === "Finished"}
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

const mapStateToProps = state => ({ translate: getTranslate(state.locale) });

const SmartNavigation = connect(mapStateToProps, null, null, { pure: false })(
	eventHeader
);

export default SmartNavigation;
