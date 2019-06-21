import React, { Component } from "react";
import PropTypes from "prop-types";
import ToggleOptions from "../../../../../components/common/ToggleOptions";
import Button from "../../../../../components/common/Button-v2";
import PayoutForm from "../../../../../components/common/PayoutForm";
import Popup from "../../../../../components/common/Popup";
import SubmitButton from "../../../../../components/common/SubmitButton";
import TextWrapper from "../../../../../components/common/TextElement";
import LoadingPlaceholder from "../../../../../components/common/LoadingPlaceholder";
import Slider from "../../../../../components/common/Slider";
import ErrorMessage from "../../../../../components/common/ErrorMessage";
import TextField from "../../../../../components/common/Textfield";
import Login from "../../../../../components/common/Login";
import { localize } from "react-localize-redux";
import { graphql, Mutation } from "react-apollo";
import { UPDATE_USER_SETTINGS, DELETE_USER } from "../../../gql";
import { getErrorMessage } from "../../../../../components/common/ErrorMessageApollo";
import { reset } from "../../../../../ApolloProvider";

class Preferences extends Component {
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

	updateSettings = async (form, cb) => {
		const { mutate, user } = this.props;

		var variables = {
			...form.values,
			id: user.id,
			refundPercentage: this.state.refundPercentage
		};
		try {
			await mutate({ variables });
			cb();
		} catch (error) {
			cb(error.message);
		}
	};

	hidePopup = () => {
		this.setState({
			showPopup: false
		});
	};

	getActionButtons = (props = this.props) => {
		const { translate, user, history } = props;
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

				<Mutation
					mutation={DELETE_USER}
					variables={{
						id: user.id
					}}
					onCompleted={() => {
						reset();
						history.push(`/`);
					}}
					onError={e => {
						window.alert(getErrorMessage(e));
					}}
				>
					{(deleteUser, { loading }) => {
						return (
							<Button
								dangerous
								isLoading={loading}
								warning={translate("user.preferences.delete-warning")}
								onClick={_ => deleteUser()}
								name="Delete_profile"
							>
								{translate("Delete profile")}
							</Button>
						);
					}}
				</Mutation>

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
		const { translate, user = {}, loading, isDJ, isOwnProfile } = this.props;
		const { userSettings = {}, userMetadata = {} } = user;
		const hasPayout = userMetadata.bankAccount;
		const { bankAccount = {} } = userMetadata;

		return (
			<div>
				{loading ? (
					<div>
						<LoadingPlaceholder />
						<LoadingPlaceholder />
						<LoadingPlaceholder />
						<LoadingPlaceholder />
					</div>
				) : null}

				{!loading && isOwnProfile ? (
					<div>
						<Popup
							showing={this.state.showPopup}
							onClickOutside={this.hidePopup}
						>
							<PayoutForm isUpdate={hasPayout} user={user} />
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
												{"..." + bankAccount.last4}
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
											value={userSettings.cancelationPolicy.days}
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
											value={[userSettings.cancelationPolicy.percentage]}
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
											value={userSettings.standby ? true : false}
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
										value={user.permalink}
										name="permalink"
										disabled={!this.context.editing}
										type="text"
										validate={["required"]}
									/>
								</p>
							</TextWrapper>
						</div>
					</div>
				) : null}

				{!isOwnProfile && !loading ? (
					<Popup
						width={"400px"}
						showing={this.state.loginPopup}
						onClickOutside={() => this.setState({ loginPopup: false })}
					>
						<p>{translate("user.preferences.login")}</p>
						<Login
							redirect={false}
							onLogin={async _ => {
								window.location.reload();
							}}
						/>
					</Popup>
				) : null}
			</div>
		);
	}
}

const SmartPreferences = graphql(UPDATE_USER_SETTINGS)(Preferences);

export default localize(SmartPreferences, "locale");
