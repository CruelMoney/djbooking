import React, { PureComponent } from "react";
import Gig from "./Gig";
import LoadingPlaceholder from "../../../../../components/common/LoadingPlaceholder";
import EmptyPage from "../../../../../components/common/EmptyPage";
import { connect } from "react-redux";
import { localize } from "react-localize-redux";
import { Query } from "react-apollo";
import { MY_GIGS } from "../../../../../components/gql";

class Gigs extends PureComponent {
	state = {
		showPopup: false,
		loginPopup: true
	};

	hidePopup = () => {
		this.setState({
			showPopup: false
		});
	};

	render() {
		const {
			translate,
			notifications,
			user,
			currentLanguage,
			loading: loadingUser
		} = this.props;

		const renderGigs = gigs => {
			const renderGigs = gigs.filter(
				({ event, status }) =>
					event.state !== "FINISHED" &&
					status !== "DECLINED" &&
					status !== "CANCELLED"
			);

			if (renderGigs.length === 0) {
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
				return renderGigs.map(gig => {
					const notification = notifications.find(noti => {
						return String(noti.room) === String(gig.id);
					});
					return (
						<Gig
							notification={notification}
							key={gig.id}
							gig={gig}
							user={user}
						/>
					);
				});
			}
		};

		return (
			<Query
				query={MY_GIGS}
				variables={{ limit: 100, locale: currentLanguage }}
				onError={console.log}
			>
				{({ data = {}, loading }) => {
					if (loading || loadingUser) {
						return <LoadingPlaceholder />;
					}

					const { myGigs = {} } = data;
					const { edges: gigs = [] } = myGigs;

					return <div>{gigs && renderGigs(gigs)}</div>;
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

const SmartGigs = connect(mapStateToProps)(Gigs);

export default localize(SmartGigs, "locale");
