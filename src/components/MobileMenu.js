import React, { Component } from "react";
import PropTypes from "prop-types";
import Navlink from "./common/Navlink";
import Popup from "./common/Popup";
import Login from "./common/Login";
import { connect } from "react-redux";
import Rating from "./common/Rating";
import InfoPopup from "./common/InfoPopup";
import entries from "object.entries";
import { getTranslate } from "react-localize-redux";
import { reset } from "../ApolloProvider";
import { ME } from "./gql";
import { Query } from "react-apollo";

class MobileMenu extends Component {
	themeColor = "#31DAFF";

	state = {
		show: false,
		loading: false,
		err: null
	};

	getChildContext() {
		return {
			color: this.themeColor
		};
	}

	componentWillReceiveProps(nextProps) {
		this.setState({
			show: nextProps.show
		});
	}

	handleClose = evt => {
		this.setState({ show: false });
		if (this.props.onClosing) {
			this.props.onClosing();
		}
	};

	logout = () => {
		this.handleClose();
		reset();
	};

	onLoginButton = () => {
		this.setState({
			loginExpanded: !this.state.loginExpanded
		});
	};

	handleLoggedIn = ({ me }) => {
		this.setState({
			loggedIn: !!me,
			loginExpanded: false
		});
	};

	timer = null;

	onClickOutside = () => {
		clearTimeout(this.timer);
		this.timer = setTimeout(
			() =>
				this.setState({
					loginExpanded: false
				}),
			10
		);
	};

	getMenuItems = () => {
		var items = entries(this.props.registeredMenuItems)
			.filter(item => item[1] !== null)
			.map((item, idx) => {
				return (
					<li key={idx}>
						<Navlink
							onClick={() => this.handleClose()}
							to={item[1]}
							label={item[0]}
						/>
					</li>
				);
			});
		return items;
	};

	render() {
		const { isHome, translate } = this.props;
		const { loggedIn } = this.state;

		return (
			<Query query={ME} onCompleted={this.handleLoggedIn} onError={console.log}>
				{({ refetch, loading, data = {} }) => {
					const { me: user } = data;

					const isDJ = user && user.appMetadata.roles.includes("DJ");

					return (
						<>
							<div
								className={"mobileMenu" + (this.state.show ? " active" : "")}
							>
								<div className="menuArea">
									<button
										onClick={() => this.handleClose()}
										className="popupCloseButton link-look"
									>
										{translate("close")}
									</button>
									{loggedIn ? (
										<div className="profileSummary">
											<div
												className={"profilePicture user-card-picture-wrapper"}
											>
												<div
													className=" user-card-picture"
													style={{
														backgroundImage: "url(" + user.picture.path + ")"
													}}
												/>
											</div>

											<div className="profileInfo">
												<div className="user-card-info">
													{isDJ ? (
														<div>
															<div className="user-card-fact">
																<span>
																	<p>{translate("experience")}</p>
																	<InfoPopup
																		info={translate("experience-description")}
																	/>
																</span>

																{user.appMetadata.experience + " gigs"}
															</div>

															<div className="user-card-fact">
																<p>{translate("rating")}</p>
																{user.appMetadata.rating > 0 ? (
																	<Rating rating={user.appMetadata.rating} />
																) : (
																	translate("no-reviews-yet")
																)}
															</div>
														</div>
													) : null}
												</div>
											</div>
										</div>
									) : null}
									<div className="menu">
										<ul>
											{this.getMenuItems()}

											{!isHome ? (
												<li>
													<Navlink
														buttonLook={true}
														to="/"
														label={translate("arrange-event")}
													/>
												</li>
											) : null}

											{isDJ ? (
												<li>
													<Navlink
														onClick={() => this.handleClose()}
														userNavigation={true}
														to={`/user/${user.permalink}/profile`}
														label={translate("profile")}
													/>
												</li>
											) : null}

											{isDJ ? (
												<li>
													<Navlink
														onClick={() => this.handleClose()}
														userNavigation={true}
														to={`/user/${user.permalink}/gigs`}
														label="Gigs"
													/>
												</li>
											) : null}

											{!loggedIn ? (
												<li>
													<Navlink
														onClick={() => this.handleClose()}
														userNavigation={true}
														to="/signup"
														label={translate("apply-to-become-dj")}
													/>
												</li>
											) : null}
											{loggedIn ? (
												<li>
													<Navlink
														onClick={() => this.handleClose()}
														userNavigation={true}
														to={`/user/${user.permalink}/preferences`}
														label={translate("preferences")}
													/>
												</li>
											) : null}

											<li>
												<Navlink
													onClick={() => this.handleClose()}
													buttonLook={true}
													to="/how-it-works"
													label={translate("how-it-works")}
												/>
											</li>
											{loggedIn ? (
												<li>
													<Navlink
														buttonLook={true}
														to="/"
														onClick={this.logout}
														label={translate("log-out")}
													/>
												</li>
											) : null}
											{loggedIn ? null : (
												<li>
													<Navlink
														onClick={() => this.handleClose()}
														buttonLook={true}
														to="/signup"
														label={translate("apply-to-become-dj")}
														important={true}
													/>
												</li>
											)}
											{loggedIn ? null : (
												<li>
													<button
														className="link-look"
														onClick={this.onLoginButton}
													>
														{translate("login")}
													</button>
												</li>
											)}
										</ul>
									</div>
								</div>
							</div>
							<Popup
								showing={this.state.loginExpanded}
								onClickOutside={this.onClickOutside}
							>
								<Login />
							</Popup>
						</>
					);
				}}
			</Query>
		);
	}
}

MobileMenu.childContextTypes = {
	color: PropTypes.string
};

export const mapStateToProps = state => {
	return {
		registeredMenuItems: state.menu,
		translate: getTranslate(state.locale)
	};
};

export default connect(mapStateToProps)(MobileMenu);
