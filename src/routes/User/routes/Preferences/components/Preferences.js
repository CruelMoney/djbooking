import React, { Component } from "react";
import PropTypes from "prop-types";
import ToggleOptions from "../../../../../components/common/ToggleOptions";
import ToggleHandler from "../../../../../components/common/ToggleButtonHandler";
import Button from "../../../../../components/common/Button-v2";
import PayoutForm from "../../../../../components/common/PayoutForm";
import Popup from "../../../../../components/common/Popup";
import SubmitButton from "../../../../../components/common/SubmitButton";
import TextWrapper from "../../../../../components/common/TextElement";
import assign from "lodash.assign";
import LoadingPlaceholder from "../../../../../components/common/LoadingPlaceholder";
import Slider from "../../../../../components/common/Slider";
import ErrorMessage from "../../../../../components/common/ErrorMessage";
import entries from "object.entries";
import TextField from "../../../../../components/common/Textfield";
import Login from "../../../../../components/common/Login";
import { connect } from "react-redux";
import * as actions from "../../../../../actions/UserActions";
import { userLogout } from "../../../../../actions/LoginActions";
import { withRouter } from "react-router-dom";
import { localize } from "react-localize-redux";
import c from "../../../../../constants/constants";

class Preferences extends Component {
	static propTypes = {
		user: PropTypes.object,
		provider: PropTypes.string,
		changePassword: PropTypes.func,
		connectFacebook: PropTypes.func,
		connectSoundCloud: PropTypes.func,
		connectDB: PropTypes.func,
		deleteProfile: PropTypes.func,
		updateSettings: PropTypes.func
	};
	static contextTypes = {
		loadingUser: PropTypes.bool,
		reset: PropTypes.func,
		registerActions: PropTypes.func,
		toggleEditMode: PropTypes.func,
		editing: PropTypes.bool,
		valid: PropTypes.bool,
		disableEditMode: PropTypes.func,
		updateAction: PropTypes.func
	};

	state = {
		showPopup: false,
		loginPopup: true
	};

	componentWillMount() {
		this.context.registerActions(this.getActionButtons);
	}

	updateSettings = (form, callback) => {
		const { profile, updateSettings } = this.props;
		var eSettings = profile.settings.emailSettings;

		//setting all settings to false initially
		for (var s in eSettings) {
			if (eSettings.hasOwnProperty(s)) {
				eSettings[s] = false;
			}
		}

		//setting the selected to true
		form.values.emailSettings.forEach(function(s) {
			eSettings[s] = true;
		});

		var settings = assign({}, form.values, {
			emailSettings: eSettings,
			refundPercentage: this.state.refundPercentage
		});

		updateSettings(settings, callback);
	};

	hidePopup = () => {
		this.setState({
			showPopup: false
		});
	};

	getUserEmailNotifications = () => {
		// Using the experimental Object.entries
		// var vals = Object.entries(profile.settings.emailSettings)
		// using shim from npm instead
		var vals = entries(this.props.profile.settings.emailSettings)
			.filter(s => s[1] === true)
			.map(s => s[0]);

		return vals;
	};

	getPotentialEmailNotifications = () => {
		return Object.keys(this.props.profile.settings.emailSettings);
	};

	getActionButtons = (props = this.props) => {
		const { translate, deleteProfile, logout } = this.props;
		const editing = this.context.editing;

		return (
			<div className="context-actions" key="profile_actions">
				{editing ? (
					<SubmitButton
						active={this.context.valid}
						onClick={this.updateSettings}
						name="save_edit_preferences"
						onSucces={() =>
							setTimeout(() => {
								this.context.disableEditMode();
							}, 1700)
						}
					>
						{translate("save")}
					</SubmitButton>
				) : (
					<div className={this.state.showHelp ? "pulse" : ""}>
						<Button onClick={this.context.toggleEditMode} name="edit_profile">
							{translate("Edit settings")}
						</Button>
					</div>
				)}

				<SubmitButton
					dangerous
					warning={translate("user.preferences.delete-warning")}
					onClick={(form, callback) => deleteProfile(callback)}
					name="Delete_profile"
					onSucces={() => {
						setTimeout(() => {
							logout();
						}, 1000);
					}}
				>
					{translate("Delete profile")}
				</SubmitButton>
				<ErrorMessage />
			</div>
		);
	};

	showHelp = () => {
		this.setState(
			{
				showHelp: true
			},
			this.context.updateAction
		);

		setTimeout(() => {
			this.setState(
				{
					showHelp: false
				},
				this.context.updateAction
			);
		}, 1500);
	};

	render() {
		const { translate, profile } = this.props;
		const isDJ = profile.isDJ;
		const hasPayout = profile.stripeID || profile.last4;
		console.log({ profile });
		return (
			<div>
				{this.context.loading ? (
					<div>
						<LoadingPlaceholder />
						<LoadingPlaceholder />
						<LoadingPlaceholder />
						<LoadingPlaceholder />
					</div>
				) : null}

				{!this.context.loading && profile.user_id ? (
					<div>
						<Popup
							showing={this.state.showPopup}
							onClickOutside={this.hidePopup}
						>
							<PayoutForm />
						</Popup>

						<div>
							{isDJ ? (
								<TextWrapper
									label={translate("Payout")}
									text={translate("user.preferences.payout-info")}
								>
									{hasPayout ? (
										<div className="user-card-info">
											<div className="user-card-fact">
												<p>{translate("user.preferences.card-info")}</p>
												{"..." + profile.last4}
											</div>
										</div>
									) : null}
									<div style={{ display: "inline-block" }}>
										<Button
											rounded={true}
											onClick={() => this.setState({ showPopup: true })}
											name="show-payout-popup"
										>
											{translate("Update payout information")}
										</Button>
									</div>
								</TextWrapper>
							) : null}

							<TextWrapper
								onDisabledClick={this.showHelp}
								label={translate("Currency")}
								text={translate("user.preferences.currency")}
							>
								<ToggleOptions
									name="currency"
									glued={true}
									disabled={!this.context.editing}
									value={profile.settings.currency}
								>
									{c.Currencies.map(c => (
										<Button name={c}>{c}</Button>
									))}
								</ToggleOptions>
							</TextWrapper>

							<div>
								<TextWrapper
									onDisabledClick={this.showHelp}
									label={translate("Email notifications")}
									text={translate("user.preferences.email")}
								>
									<ToggleHandler
										disabled={!this.context.editing}
										name="emailSettings"
										potentialValues={this.getPotentialEmailNotifications()}
										value={this.getUserEmailNotifications()}
										columns={3}
									/>
								</TextWrapper>
							</div>

							{isDJ ? (
								<div>
									<TextWrapper
										onDisabledClick={this.showHelp}
										label={translate("Cancelation policy")}
										text={translate("user.preferences.cancelation")}
									>
										<ToggleOptions
											disabled={!this.context.editing}
											name="cancelationDays"
											glued={true}
											value={profile.settings.cancelationDays}
										>
											<Button name={1}>1 {translate("day")}</Button>
											<Button name={2}>2 {translate("days")}</Button>
											<Button name={7}>1 {translate("week")}</Button>

											<Button name={14}>2 {translate("weeks")}</Button>

											<Button name={30}>1 {translate("month")}</Button>
										</ToggleOptions>
									</TextWrapper>

									<TextWrapper
										onDisabledClick={this.showHelp}
										label={translate("Refund percentage")}
										text={translate("user.preferences.refund")}
									>
										<Slider
											disabled={!this.context.editing}
											name="refundPercentage"
											range={{ min: 0, max: 100 }}
											step={1}
											connect="lower"
											value={[profile.settings.refundPercentage]}
											onChange={values =>
												this.setState({
													refundPercentage: values[0]
												})
											}
										/>
										<p style={{ marginTop: "15px" }}>
											{translate("user.preferences.refunded", {
												percentage: this.state.refundPercentage
											})}
										</p>
									</TextWrapper>
									<TextWrapper
										onDisabledClick={this.showHelp}
										label={translate("Standby")}
										text={translate("user.preferences.standby")}
									>
										<ToggleOptions
											name="standby"
											glued={true}
											disabled={!this.context.editing}
											value={profile.settings.standby ? true : false}
										>
											<Button name={true}>{translate("Unavailable")}</Button>
											<Button name={false}>{translate("Available")}</Button>
										</ToggleOptions>
									</TextWrapper>
								</div>
							) : null}

							<TextWrapper
								onDisabledClick={this.showHelp}
								label={translate("Profile URL")}
								text={translate("user.preferences.permalink")}
							>
								<p className="permalink-input">
									www.cueup.io/user/
									<TextField
										value={profile.user_metadata.permaLink}
										name="permaLink"
										disabled={!this.context.editing}
										type="text"
										validate={["required"]}
									/>
								</p>
							</TextWrapper>
						</div>
					</div>
				) : null}

				{!profile.user_id && !this.context.loadingUser ? (
					<Popup
						showing={this.state.loginPopup}
						onClickOutside={() => this.setState({ loginPopup: false })}
					>
						<p>{translate("user.preferences.login")}</p>
						<Login redirect={false} />
					</Popup>
				) : null}
			</div>
		);
	}
}

function mapStateToProps(state, ownProps) {
	return {
		profile: state.login.profile,
		provider: state.login.profile.provider
	};
}

function mapDispatchToProps(dispatch, ownProps) {
	return {
		updateSettings: (settings, callback) =>
			dispatch(actions.updateSettings(settings, callback)),
		deleteProfile: callback => {
			dispatch(actions.deleteProfile(callback));
		},
		logout: () => {
			ownProps.history.push(`/`);
			dispatch(userLogout());
		}
	};
}

function mergeProps(stateProps, dispatchProps, ownProps) {
	return { ...ownProps, ...stateProps, ...dispatchProps };
}

const SmartPreferences = connect(
	mapStateToProps,
	mapDispatchToProps,
	mergeProps,
	{ pure: false }
)(withRouter(Preferences));

export default localize(SmartPreferences, "locale");
