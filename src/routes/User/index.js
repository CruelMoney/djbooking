import React, { Component } from "react";
import { Switch, Route } from "react-router";
import User from "./components/pages/User";
import FinishSignup from "./components/pages/FinishSignup";
import Profile from "./routes/Profile";
import Book from "./routes/Book";
import Events from "./routes/Events";
import Gigs from "./routes/Gigs";
import Preferences from "./routes/Preferences";
import Reviews from "./routes/Reviews";
import content from "./content.json";
import requestformContent from "../../components/common/RequestForm/content.json";
import { connect } from "react-redux";
import addTranslate from "../../components/higher-order/addTranslate";
import "./index.css";
class ControlUser extends Component {
	render() {
		const { translate } = this.props;
		const baseurl = translate("routes./user/:permalink");

		return (
			<User {...this.props}>
				<Switch>
					<Route
						path={`${baseurl}/profile`}
						render={props => <Profile {...this.props} {...props} />}
					/>
					<Route
						path={`${baseurl}/book`}
						render={props => <Book {...this.props} {...props} />}
					/>
					<Route
						path={`${baseurl}/${translate("preferences")}`}
						render={props => <Preferences {...this.props} {...props} />}
					/>
					<Route
						path={`${baseurl}/events`}
						render={props => <Events {...this.props} {...props} />}
					/>
					<Route
						path={`${baseurl}/gigs`}
						render={props => <Gigs {...this.props} {...props} />}
					/>
					<Route
						path={`${baseurl}/${translate("reviews")}`}
						render={props => <Reviews {...this.props} {...props} />}
					/>
				</Switch>
			</User>
		);
	}
}

function mapStateToProps(state, ownProps) {
	const isOwnProfile = state.login.status.publicProfileMode
		? false
		: !!state.login.profile.user_metadata &&
			!!state.login.profile.user_metadata.permaLink
			? state.login.profile.user_metadata.permaLink.toLowerCase() ===
				ownProps.match.params.permalink.toLowerCase()
			: false;

	return {
		publicProfileMode: state.login.status.publicProfileMode,
		profile: isOwnProfile ? state.login.profile : state.user.profile,
		loading: isOwnProfile
			? state.login.status.isWaiting
			: state.user.status.isWaiting,
		geoCity: state.session.city,
		geoCountry: state.session.country,
		notifications: state.notifications.data,
		isOwnProfile: isOwnProfile
	};
}

const SmartUser = connect(mapStateToProps)(ControlUser);

class Index extends Component {
	render() {
		const { translate } = this.props;
		return (
			<Switch>
				<Route
					exact
					path={translate("routes./user/signup")}
					component={FinishSignup}
				/>
				<Route
					path={translate("routes./user/:permalink")}
					render={props => {
						return <SmartUser {...this.props} {...props} />;
					}}
				/>
			</Switch>
		);
	}
}

export default addTranslate(Index, [content, requestformContent]);
