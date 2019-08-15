import React, { Component } from "react";
import PropTypes from "prop-types";
import EventHeader from "./blocks/EventHeader";
import Footer from "../../../components/common/Footer";
import { LoadingCard } from "../../../components/common/LoadingPlaceholder";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import * as commonActions from "../../../actions/Common";
import "../../../css/transitions.css";
import { EVENT } from "../gql";
import { Query } from "react-apollo";

class event extends Component {
	themeColor = "#25F4D2";
	secondColor = "#31DAFF";

	constructor(props) {
		super(props);
		console.log("Mounting event wrapper ");
	}

	static childContextTypes = {
		color: PropTypes.string
	};

	state = {
		redirected: false
	};

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

	getChildContext() {
		return {
			color: this.themeColor
		};
	}

	render() {
		const {
			children,
			loggedIn,
			profile,
			match,
			translate,
			currentLanguage
		} = this.props;

		function renderLoadingItem() {
			return <LoadingCard />;
		}

		return (
			<Query
				query={EVENT}
				variables={{
					id: match.params.id,
					hash: match.params.hash,
					locale: currentLanguage
				}}
			>
				{({ data = {}, error, loading }) => {
					const { event: theEvent } = data;

					return (
						<div>
							<EventHeader
								event={theEvent}
								loggedIn={loggedIn}
								permaLink={loggedIn ? profile.user_metadata.permaLink : ""}
								loading={loading}
								hash={match.params.hash}
							/>

							<div className="user-container container">
								<div className="row">
									<div style={{ paddingTop: "11px" }} className={"col-xs-12"}>
										{loading || !theEvent ? (
											<div className="row center">{renderLoadingItem()}</div>
										) : (
											children({
												theEvent,
												loading,
												hashKey: match.params.hash
											})
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
				}}
			</Query>
		);
	}
}

function mapStateToProps(state, ownProps) {
	return {
		profile: state.login.profile,
		loggedIn: state.login.status.signedIn
	};
}

function mapDispatchToProps(dispatch, ownProps) {
	return {
		registerMenuItem: (name, route) =>
			dispatch(commonActions.registerMenuItem(name, route)),
		removeMenuItem: name => dispatch(commonActions.registerMenuItem(name))
	};
}

const SmartEvent = withRouter(
	connect(
		mapStateToProps,
		mapDispatchToProps
	)(event)
);

export default props => <SmartEvent {...props} />;
