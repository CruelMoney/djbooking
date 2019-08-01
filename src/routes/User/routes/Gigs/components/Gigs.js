import React, { Component } from "react";
import Button from "../../../../../components/common/Button-v2";
import Gig from "./Gig";
import LoadingPlaceholder from "../../../../../components/common/LoadingPlaceholder";
import EmptyPage from "../../../../../components/common/EmptyPage";
import Popup from "../../../../../components/common/Popup";
import Login from "../../../../../components/common/Login";
import { connect } from "react-redux";
import { localize } from "react-localize-redux";
import { Query, ApolloConsumer } from "react-apollo";
import { MY_GIGS } from "../../../../../components/gql";

class Gigs extends Component {
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

			loading: loadingUser,
			user,
			currentLanguage
		} = this.props;
		const { loginPopup } = this.state;
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
					if (loading) {
						return <LoadingPlaceholder />;
					}

					const { myGigs = {} } = data;
					const { edges: gigs = [] } = myGigs;

					return (
						<>
							<div>{gigs && renderGigs(gigs)}</div>
							{/* {!loadingUser ? (
								<Popup
									showing={loginPopup && !loadingUser}
									width={"400px"}
									onClickOutside={() => this.setState({ loginPopup: false })}
								>
									<ApolloConsumer>
										{client => {
											return (
												<>
													<p>{translate("Login to see your gigs")}</p>
													<Login
														redirect={false}
														onLogin={async _ => {
															window.location.reload();
														}}
													/>
												</>
											);
										}}
									</ApolloConsumer>
								</Popup>
							) : null} */}
						</>
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

const SmartPreferences = connect(mapStateToProps)(Gigs);

export default localize(SmartPreferences, "locale");
