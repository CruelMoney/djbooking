import React, { Component } from "react";
import PropTypes from "prop-types";
import Button from "../../../../../components/common/Button-v2";
import Genres from "../../../../../components/common/ToggleButtonHandler";
import connectToForm from "../../../../../components/higher-order/connectToForm";
import { default as SimpleMap } from "../../../../../components/common/Map";
import LoadingPlaceholder from "../../../../../components/common/LoadingPlaceholder";
import TextWrapper from "../../../../../components/common/TextElement";
import { localize } from "react-localize-redux";

const Map = connectToForm(SimpleMap);

class UserProfile extends Component {
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
		disableEditMode: PropTypes.func
	};

	componentWillMount() {
		if (this.context.registerActions) {
			this.context.registerActions(this.getActionButtons);
		}
	}

	getActionButtons = (props = this.props) => {
		const { translate, publicProfileMode, togglePublicProfile } = this.props;

		return (
			<div className="context-actions" key="profile_actions">
				{publicProfileMode ? (
					<Button onClick={togglePublicProfile} name="toggle_public">
						{translate("Back to profile")}
					</Button>
				) : null}
			</div>
		);
	};

	render() {
		const { translate, user = {}, loading, isDJ } = this.props;

		if (loading) {
			return (
				<div>
					<LoadingPlaceholder />
					<LoadingPlaceholder />
					<LoadingPlaceholder />
					<LoadingPlaceholder />
				</div>
			);
		}

		let {
			userMetadata = {},
			genres,
			playingLocation = {},
			userSettings = {}
		} = user;
		const { cancelationPolicy = {} } = userSettings;
		return (
			<div>
				<div className="profile">
					{isDJ ? (
						<TextWrapper label={translate("Bio")} text="">
							<p>{userMetadata.bio}</p>
						</TextWrapper>
					) : null}
					{isDJ ? (
						<TextWrapper label={translate("Genres")} text="">
							<Genres
								name="genres"
								validate={["required"]}
								potentialValues={genres}
								columns={4}
								value={genres}
								disabled={!this.context.editing}
							/>
						</TextWrapper>
					) : null}

					{isDJ ? (
						<TextWrapper
							label={translate("Location")}
							text={translate("public-profile.location")}
						>
							<Map
								radius={playingLocation.radius}
								value={playingLocation}
								editable={this.context.editing}
								themeColor={this.context.color}
								radiusName="playingRadius"
								locationName="playingLocation"
							/>
						</TextWrapper>
					) : null}

					{isDJ ? (
						<TextWrapper
							label={translate("Cancelation policy")}
							text={translate("public-profile.refund", {
								days: cancelationPolicy.days,
								percentage: cancelationPolicy.percentage
							})}
						/>
					) : null}
				</div>
			</div>
		);
	}
}

export default localize(UserProfile, "locale");
