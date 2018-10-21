import React, { Component } from "react";
import PropTypes from "prop-types";
import Button from "../../../../../components/common/Button-v2";
import SubmitButton from "../../../../../components/common/SubmitButton";
import Genres from "../../../../../components/common/ToggleButtonHandler";
import connectToForm from "../../../../../components/higher-order/connectToForm";
import { default as SimpleMap } from "../../../../../components/common/Map";
import TextField from "../../../../../components/common/Textfield";
import TextBox from "../../../../../components/common/TextBox";
import LoadingPlaceholder from "../../../../../components/common/LoadingPlaceholder";
import TextWrapper from "../../../../../components/common/TextElement";
import c from "../../../../../constants/constants";
import ErrorMessage from "../../../../../components/common/ErrorMessage";
import {
	FB,
	Tweet,
	QR,
	Embed,
	Link
} from "../../../../../components/common/Sharing";
import { Environment } from "../../../../../constants/constants";
import { localize } from "react-localize-redux";

const Map = connectToForm(SimpleMap);

class OwnProfile extends Component {
	static propTypes = {
		profile: PropTypes.object,
		save: PropTypes.func,
		deleteProfile: PropTypes.func
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

	componentWillMount() {
		if (this.context.registerActions) {
			this.context.registerActions(this.getActionButtons);
		}

		this.bookURL =
			Environment.API_DOMAIN +
			"/api/user/" +
			this.props.profile.user_metadata.permaLink +
			"/bookme";

		this.signupURL =
			Environment.API_DOMAIN +
			"/api/user/join?referredBy=" +
			this.props.profile.user_metadata.permaLink;
	}

	state = {
		showHelp: false
	};

	submit = (form, callback) => {
		const profile = {
			...this.props.profile,
			...form.values
		};

		this.props.save(profile, callback);
	};

	getActionButtons = (props = this.props) => {
		const { translate } = this.props;
		const editing = this.context.editing;

		return (
			<div className="context-actions" key="profile_actions">
				{editing ? (
					<SubmitButton
						active={this.context.valid}
						onClick={this.submit}
						name="save_edit_profile"
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
							{translate("Edit information")}
						</Button>
					</div>
				)}

				<FB link={this.bookURL} generatePreview>
					{translate("Share profile on facebook")}
				</FB>
				<Button onClick={this.props.togglePublicProfile} name="toggle_public">
					{translate("See public profile")}
				</Button>

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
		const { translate } = this.props;
		const isDJ = this.props.profile.isDJ;

		let genres = new Set([
			...c.GENRES.map(g => g.name),
			...this.props.profile.genres
		]);

		genres = [...genres];

		return (
			<div>
				{this.context.loadingUser ? (
					<div>
						<LoadingPlaceholder />
						<LoadingPlaceholder />
						<LoadingPlaceholder />
						<LoadingPlaceholder />
					</div>
				) : (
					<div>
						<div className="profile">
							<TextWrapper
								onDisabledClick={this.showHelp}
								label={translate("Name")}
								text={translate("profile.name")}
							>
								<TextField
									value={this.props.profile.name}
									name="name"
									disabled={!this.context.editing}
									type="text"
									validate={["required", "lastName"]}
								/>
							</TextWrapper>
							<TextWrapper
								onDisabledClick={this.showHelp}
								label={"Email"}
								text={translate("profile.email")}
							>
								<TextField
									value={this.props.profile.email}
									name="email"
									disabled={!this.context.editing}
									type="email"
									validate={["required", "email"]}
								/>
							</TextWrapper>

							<TextWrapper
								onDisabledClick={this.showHelp}
								label={translate("Phone number")}
								text={translate("profile.phone")}
							>
								<TextField
									validate={["required"]}
									name="phone"
									value={this.props.profile.phone}
									disabled={!this.context.editing}
									type="tel"
								/>
							</TextWrapper>

							{isDJ ? (
								<TextWrapper
									onDisabledClick={this.showHelp}
									label={translate("Genres")}
									text={translate("profile.genres")}
								>
									<Genres
										key={this.props.profile.genres.length}
										enableAdditions
										updateBeforeSubmit
										name="genres"
										validate={["required"]}
										potentialValues={genres}
										columns={4}
										value={this.props.profile.genres}
										disabled={!this.context.editing}
									/>
								</TextWrapper>
							) : null}

							{isDJ ? (
								<TextWrapper
									onDisabledClick={this.showHelp}
									label={translate("Bio")}
									text={translate("profile.bio")}
								>
									<TextBox
										validate={["required"]}
										width="100%"
										height="150px"
										name="bio"
										disabled={!this.context.editing}
										value={this.props.profile.bio}
									/>
								</TextWrapper>
							) : null}

							{isDJ ? (
								<TextWrapper
									onDisabledClick={this.showHelp}
									label={translate("Location")}
									text={translate("profile.location")}
								>
									<Map
										radius={this.props.profile.playingRadius}
										value={this.props.profile.playingLocation}
										editable={this.context.editing}
										themeColor={this.context.color}
										radiusName="playingRadius"
										locationName="playingLocation"
									/>
								</TextWrapper>
							) : null}

							{isDJ ? (
								<TextWrapper
									label={translate("Refer organizers")}
									text={translate("profile.refer-1-description")}
								>
									<div className="sharing-buttons">
										<Tweet generatePreview link={this.bookURL}>
											Twitter
										</Tweet>
										<FB generatePreview link={this.bookURL}>
											Facebook
										</FB>
										<QR generatePreview link={this.bookURL}>
											QR CODE
										</QR>
										<Link generatePreview link={this.bookURL}>
											{translate("Copy link")}
										</Link>
										<Embed
											embedURL={
												Environment.API_DOMAIN +
												"/api/user/" +
												this.props.profile.user_id +
												"/embedcard"
											}
										>
											Embed code
										</Embed>
									</div>
								</TextWrapper>
							) : null}

							{isDJ ? (
								<TextWrapper
									label={translate("Refer DJs")}
									text={translate("profile.refer-2-description")}
								>
									<div className="sharing-buttons">
										<Tweet link={this.signupURL}>Twitter</Tweet>
										<FB link={this.signupURL}>Facebook</FB>
										<QR link={this.signupURL}>QR CODE</QR>
										<Link link={this.signupURL}>{translate("Copy link")}</Link>
									</div>
								</TextWrapper>
							) : null}
						</div>
					</div>
				)}
			</div>
		);
	}
}

export default localize(OwnProfile, "locale");
