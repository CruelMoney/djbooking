import React, { Component } from "react";
import PropTypes from "prop-types";
import { Helmet } from "react-helmet-async";

import UserHeader from "../blocks/UserHeader";
import Footer from "../../../../components/common/Footer";
import Form from "../../../../components/common/Form-v2";
import { localize } from "react-localize-redux";
import { connect } from "react-redux";
import "../../../../css/transitions.css";
import { Query } from "react-apollo";
import { USER } from "../../gql";
import { ME } from "../../../../components/gql";

class User extends Component {
	themeColor = "#25F4D2";
	textColor = "rgb(18, 119, 103)";
	secondColor = "#31DAFF";

	static propTypes = {
		profile: PropTypes.object,
		isOwnProfile: PropTypes.bool
	};

	static childContextTypes = {
		profile: PropTypes.object,
		hideUserCard: PropTypes.func,
		showUserCard: PropTypes.func,
		registerActions: PropTypes.func,
		toggleEditMode: PropTypes.func,
		editing: PropTypes.bool,
		valid: PropTypes.bool,
		color: PropTypes.string,
		loadingUser: PropTypes.bool,
		textColor: PropTypes.string,
		disableEditMode: PropTypes.func,
		isOwnProfile: PropTypes.bool,
		updateAction: PropTypes.func
	};

	updateNotification = props => {
		const { translate, user = {}, isOwnProfile, notifications } = this.props;
		const { appMetadata = {}, userSettings = {}, picture } = user;
		if (appMetadata && isOwnProfile) {
			if (notifications && notifications.length > 0) {
				const notification = notifications.sort((a, b) => a > b)[0];
				this.setState({ notification: notification.content });
				return;
			}
			if (!appMetadata.emailVerified) {
				this.setState({
					notification: translate("user.notifications.email")
				});
				return;
			}
			if (userSettings.standby) {
				this.setState({
					notification: translate("user.notifications.standby")
				});
				return;
			}
			if (!picture) {
				this.setState({
					notification: translate("user.notifications.picture")
				});
				return;
			}

			this.setState({
				notification: translate("user.notifications.empty")
			});
		} else {
			if (userSettings.standby) {
				this.setState({
					notification: translate("user.notifications.standby-public")
				});
			} else {
				this.setState({ notification: "" });
			}
		}
	};

	setActions = () => {
		this.setState({ actions: this.getActions() });
	};

	getChildContext() {
		return {
			hideUserCard: this.hideUserCard,
			showUserCard: this.showUserCard,
			registerActions: getActionsFunc => {
				this.getActions = getActionsFunc;
				this.setState(
					{
						editing: false
					},
					this.setActions()
				);
			},
			toggleEditMode: () => {
				this.setState(
					{
						editing: !this.state.editing
					},
					this.setActions
				);
			},

			disableEditMode: () => {
				this.setState(
					{
						editing: false
					},
					this.setActions
				);
			},
			updateAction: this.setActions,
			color: this.themeColor,
			editing: this.state.editing,
			valid: this.state.valid,
			textColor: this.textColor
		};
	}

	state = {
		showUserCard: true,
		actions: [],
		editing: false,
		valid: false
	};

	hideUserCard = () => {
		this.setState({
			showUserCard: false
		});
	};

	showUserCard = () => {
		this.setState({
			showUserCard: true
		});
	};

	render() {
		const { translate, match, isOwnProfile, children } = this.props;

		return (
			<Query
				query={isOwnProfile ? ME : USER}
				variables={
					isOwnProfile
						? {}
						: {
								permalink: match.params.permalink
						  }
				}
			>
				{({ loading, data = {} }) => {
					let { user = {}, me = {} } = data;

					if (me.id) {
						user = me;
					}

					const { picture, userMetadata = {} } = user;
					const { firstName, bio } = userMetadata;

					return (
						<>
							<Helmet>
								<title>{`${firstName} | Cueup`}</title>
								<meta property="og:title" content={`${firstName} | Cueup`} />
								<meta property="og:type" content={"profile"} />
								<meta name="description" content={bio} />
								<meta property="og:description" content={bio} />
								<meta property="og:image" content={picture && picture.path} />
							</Helmet>

							<Form
								noError
								resetStatusOnSucces
								name="user-form"
								formValidCallback={() => {
									this.setState({ valid: true }, this.setActions);
								}}
								formInvalidCallback={() => {
									this.setState({ valid: false }, this.setActions);
								}}
							>
								<UserHeader
									{...this.props}
									hideInfo={!this.state.showUserCard}
									actions={this.state.actions}
									notification={this.state.notification}
									loading={loading}
								/>

								<div className="user-container container">
									<div className="row">
										<div className={"col-sm-4"} />
										<div className={"col-sm-8"}>
											<div className="mobileActions">
												{isOwnProfile ? this.state.actions : null}
											</div>
											{children}
										</div>
									</div>
								</div>
							</Form>

							<Footer
								noSkew
								color={this.secondColor}
								firstTo={translate("routes./how-it-works")}
								secondTo={translate("routes./")}
								firstLabel={translate("how-it-works")}
								secondLabel={translate("arrange-event")}
								title={translate("Wonder how it works?")}
								subTitle={translate("See how it works, or arrange an event.")}
							/>
						</>
					);
				}}
			</Query>
		);
	}
}

export default localize(User, "locale");
