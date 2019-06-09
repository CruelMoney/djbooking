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
		const { translate } = this.props;
		if (props.profile.app_metadata && props.isOwnProfile) {
			if (props.notifications && props.notifications.length > 0) {
				const notification = props.notifications.sort((a, b) => a > b)[0];
				this.setState({ notification: notification.content });
				return;
			}
			if (!props.profile.app_metadata.emailVerified) {
				this.setState({
					notification: translate("user.notifications.email")
				});
				return;
			}
			if (props.profile.settings && props.profile.settings.standby) {
				this.setState({
					notification: translate("user.notifications.standby")
				});
				return;
			}
			if (
				props.profile.picture &&
				props.profile.picture.indexOf("default-profile-pic") !== -1
			) {
				this.setState({
					notification: translate("user.notifications.picture")
				});
				return;
			}
			if (props.profile.app_metadata.notification) {
				const serverNoti = props.profile.app_metadata.notification;
				let noti = translate(serverNoti);
				noti = noti.indexOf("Missing translation") === -1 ? noti : serverNoti;
				this.setState({ notification: noti });
				return;
			}
			this.setState({
				notification: translate("user.notifications.empty")
			});
		} else {
			if (props.profile.settings && props.profile.settings.standby) {
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
				query={USER}
				variables={{
					permalink: match.params.permalink
				}}
			>
				{({ loading, data = {} }) => {
					const { user = {} } = data;
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
									isOwnProfile={isOwnProfile}
									user={user}
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

const SmartUser = connect(state => state)(User);

export default localize(SmartUser, "locale");
