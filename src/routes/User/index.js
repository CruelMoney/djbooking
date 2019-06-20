import React, { Component } from "react";
import { Switch, Route } from "react-router";
import User from "./components/pages/User";
import FinishSignup from "./components/pages/FinishSignup";
import Profile from "./routes/Profile";
import Events from "./routes/Events";
import Gigs from "./routes/Gigs";
import Preferences from "./routes/Preferences";
import content from "./content.json";
import requestformContent from "../../components/common/RequestForm/content.json";
import modalContent from "../../components/common/modals/content.json";
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
			<Query query={ME}>
				{({ data = {}, loading }) => {
					const { me = {} } = data;
					const { permalink } = me || {};

					const isOwnProfile = permalink === match.params.permalink;

					const forward = {
						...this.props,
						loading,
						user: me || {},
						isOwnProfile
					};

					return (
						<User {...forward}>
							{renderProps => (
								<Switch>
									<Route
										path={`${baseurl}/profile`}
										render={props => <Profile {...renderProps} {...props} />}
									/>

									<Route
										path={`${baseurl}/${translate("preferences")}`}
										render={props => (
											<Preferences {...renderProps} {...props} />
										)}
									/>
									<Route
										path={`${baseurl}/events`}
										render={props => <Events {...renderProps} {...props} />}
									/>
									<Route
										path={`${baseurl}/gigs`}
										render={props => <Gigs {...renderProps} {...props} />}
									/>
								</Switch>
							)}
						</User>
					);
				}}
			</Query>
		);
	}
}

function mapStateToProps(state, ownProps) {
	return {
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

export default addTranslate(Index, [content, requestformContent, modalContent]);
