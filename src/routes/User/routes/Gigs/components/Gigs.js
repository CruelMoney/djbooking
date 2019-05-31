import React, { Component } from "react";
import PropTypes from "prop-types";
import Button from "../../../../../components/common/Button-v2";
import Gig from "./Gig";
import LoadingPlaceholder from "../../../../../components/common/LoadingPlaceholder";
import EmptyPage from "../../../../../components/common/EmptyPage";
import { requestFeatures } from "../../../../../actions/Common";
import OfferCard from "../../../../Event/routes/Offers/components/OfferCard";
import Popup from "../../../../../components/common/Popup";
import Login from "../../../../../components/common/Login";
import { connect } from "react-redux";
import * as actions from "../../../../../actions/GigActions";
import { localize } from "react-localize-redux";

import m from "../../../../../constants/Mocks";
import { Query } from "react-apollo";
import { MY_GIGS } from "../../../../../components/gql";

class Gigs extends Component {
	static contextTypes = {
		registerActions: PropTypes.func,
		isOwnProfile: PropTypes.bool,
		loadingUser: PropTypes.bool
	};

	state = {
		showPopup: false,
		loginPopup: true
	};

	componentWillMount() {
		this.context.registerActions(this.getActionButtons);
	}

	hidePopup = () => {
		this.setState({
			showPopup: false
		});
	};

	getActionButtons = (props = this.props) => {
		const { translate, profile } = props;

		return (
			<div className="context-actions" key="profile_actions">
				<Button
					name="request_features"
					onClick={() => {
						requestFeatures();
					}}
				>
					{translate("Request features")}
				</Button>
				{profile.isDJ ? (
					<Button
						onClick={() => this.setState({ showPopup: true })}
						name="public_profile"
					>
						{translate("See offer example")}
					</Button>
				) : null}
			</div>
		);
	};

	render() {
		const { translate, notifications, profile } = this.props;
		const { loginPopup } = this.state;

		const renderGigs = gigs => {
			if (gigs.length === 0) {
				return (
					<EmptyPage
						message={
							<div>
								{translate("No gigs")}
								<br />
								{translate("no-gigs-description")}
							</div>
						}
					/>
				);
			} else {
				return gigs
					.filter(
						({ event, status }) =>
							event.state !== "FINISHED" &&
							status !== "DECLINED" &&
							status !== "CANCELLED"
					)
					.map(gig => {
						const notification = notifications.find(noti => {
							return String(noti.room) === String(gig.id);
						});
						return <Gig notification={notification} key={gig.id} gig={gig} />;
					});
			}
		};

		var OfferMock = m.MockOffer;
		if (profile.settings) {
			OfferMock.refundPercentage = profile.settings.refundPercentage;
			OfferMock.cancelationDays = profile.settings.cancelationDays;
			OfferMock.dj = profile;
		}

		return (
			<Query
				query={MY_GIGS}
				variables={{ limit: 100 }}
				skip={!this.context.isOwnProfile}
				onCompleted={console.log}
				onError={console.log}
			>
				{({ data = {}, loading }) => {
					if (loading) {
						return <LoadingPlaceholder />;
					}

					const { myGigs = {} } = data;
					const { edges: gigs = [] } = myGigs;

					return (
						<>
							<div>{!loading && renderGigs(gigs)}</div>
							{!profile.user_id && !this.context.loadingUser ? (
								<Popup
									showing={loginPopup}
									onClickOutside={() => this.setState({ loginPopup: false })}
								>
									<p>{translate("Login to see your gigs")}</p>
									<Login redirect={false} />
								</Popup>
							) : null}
						</>
					);
				}}
			</Query>
		);
	}
}

function mapStateToProps(state, ownProps) {
	return {
		profile: state.login.profile,
		loading: state.gigs.isWaiting,
		notifications: state.notifications.data
	};
}

function mapDispatchToProps(dispatch, ownProps) {
	return {
		declineGig: gigID => {
			dispatch(actions.declineGig(gigID));
		}
	};
}

function mergeProps(stateProps, dispatchProps, ownProps) {
	return {
		...ownProps,
		...stateProps,
		...dispatchProps
	};
}
const SmartPreferences = connect(
	mapStateToProps,
	mapDispatchToProps,
	mergeProps,
	{ pure: false }
)(Gigs);

export default localize(SmartPreferences, "locale");
