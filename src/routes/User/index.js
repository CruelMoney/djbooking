import React, { Component } from "react";
import { Switch, Route, Redirect } from "react-router";
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
import { Query } from "react-apollo";
import { ME } from "../../components/gql";
class ControlUser extends Component {
	render() {
		const { translate, match } = this.props;
		const baseurl = match.url;

		return (
			<Query query={ME} fetchPolicy="cache-only">
				{({ data = {}, loading }) => {
					const { me = {} } = data;
					const { permalink } = me;

					const isOwnProfile = permalink === match.params.permalink;
					console.log({ me, data, match });
					return (
						<User {...this.props} isOwnProfile={isOwnProfile}>
							<Switch>
								{/* <Redirect exact from={`${baseurl}`} to={`${baseurl}/profile`} /> */}
							</Switch>
						</User>
					);
				}}
			</Query>
		);
	}
}

function mapStateToProps(state, ownProps) {
	console.log({ state });
	return {
		loading: state.login.status.isWaiting || state.user.status.isWaiting,
		notifications: state.notifications.data
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
