import React, { Component } from "react";
import PropTypes from "prop-types";
import Navlink from "./common/Navlink";
import Popup from "./common/Popup";
import Login from "./common/Login";
import { connect } from "react-redux";
import Rating from "./common/Rating";
import * as actions from "../actions/LoginActions";
import * as UserActions from "../actions/UserActions";
import InfoPopup from "./common/InfoPopup";
import entries from "object.entries";
import Button from "./common/Button-v2";
import { ImageCompressor } from "../utils/ImageCompressor";
import { getTranslate } from "react-localize-redux";
import CurrencyValue from "./common/CurrencyValue";

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
		this.props.logout();
	};

	onLoginButton = () => {
		this.setState({
			loginExpanded: !this.state.loginExpanded
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
			.map(item => {
				return (
					<li>
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

	handleFile = e => {
		const { translate } = this.props;

		this.setState({ loading: true });
		const file = e.target.files[0];

		ImageCompressor(file, (err, result) => {
			if (err) {
				this.setState({
					err: err,
					loading: false
				});
			} else {
				this.props.updatePicture(result, err => {
					if (err) {
						this.setState({ err: translate("unknown-error") });
					} else {
						this.setState({ err: "", loading: false });
					}
				});
			}
		});
	};

	render() {
		const { isHome, translate } = this.props;

		return (
			<div>
				<div className={"mobileMenu" + (this.state.show ? " active" : "")}>
					<div className="menuArea">
						<a onClick={() => this.handleClose()} className="popupCloseButton">
							{translate("close")}
						</a>
						{this.props.loggedIn ? (
							<div className="profileSummary">
								<div
									className={
										this.state.loading || this.state.err
											? "profilePicture user-card-picture-wrapper loading"
											: "profilePicture user-card-picture-wrapper"
									}
									htmlFor="fileuploadMobile"
								>
									<div id="profile-picture-upload">
										<canvas ref="canvas" style={{ display: "none" }} />
										<input
											name="fileuploadMobile"
											id="fileuploadMobile"
											type="file"
											accept="image/*"
											onChange={this.handleFile}
										/>
										{this.state.loading ? (
											<Button isLoading />
										) : this.state.err ? (
											<label htmlFor="fileuploadMobile">
												<span>{this.state.err}</span>
											</label>
										) : (
											<label htmlFor="fileuploadMobile">
												<span>{translate("change-image")}</span>
											</label>
										)}
									</div>

									<div
										className=" user-card-picture"
										style={{
											backgroundImage: "url(" + this.props.profile.picture + ")"
										}}
									/>
									<div
										className=" user-card-picture-blurred"
										style={{
											backgroundImage: "url(" + this.props.profile.picture + ")"
										}}
									/>
								</div>

								<div className="profileInfo">
									<div className="user-card-info">
										{this.props.profile.isDJ ? (
											<div>
												<div className="user-card-fact">
													<p>
														{translate("experience")}
														<InfoPopup
															info={translate("experience-description")}
														/>
													</p>

													{this.props.profile.gigsCount + " gigs"}
												</div>

												<div className="user-card-fact">
													<p>
														{translate("earned")}
														<InfoPopup info={translate("earned-description")} />
													</p>
													<CurrencyValue
														amount={this.props.profile.earned}
														from={this.props.profile.app_metadata.bankCurrency}
														to={this.props.profile.settings.currency}
													/>
												</div>

												<div className="user-card-fact">
													<p>{translate("rating")}</p>
													{this.props.rating > 0 ? (
														<Rating rating={this.props.rating} />
													) : (
														translate("no-reviews-yet")
													)}
												</div>
											</div>
										) : null}

										{this.props.profile.isCustomer ? (
											<div>
												<div className="user-card-fact">
													<p>{translate("upcoming")}</p>
													{this.props.profile.upcomingEvents + " events"}
												</div>
												<div className="user-card-fact">
													<p>{translate("finished")}}</p>
													{this.props.profile.finishedEvents + " events"}
												</div>
											</div>
										) : null}

										{this.props.profile.discountPoints > 0 ? (
											<div className="user-card-fact">
												<p>
													Cueup points
													<InfoPopup
														info={translate("cueup-points-description")}
													/>
												</p>
												{this.props.profile.discountPoints + " Points"}
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

								{this.props.profile.isDJ ? (
									<li>
										<Navlink
											onClick={() => this.handleClose()}
											userNavigation={true}
											to={`/user/${
												this.props.profile.user_metadata.permaLink
											}/profile`}
											label={translate("profile")}
										/>
									</li>
								) : null}

								{this.props.profile.isCustomer ? (
									<li>
										<Navlink
											onClick={() => this.handleClose()}
											userNavigation={true}
											to={`/user/${
												this.props.profile.user_metadata.permaLink
											}/events`}
											label="Events"
										/>
									</li>
								) : null}

								{this.props.profile.isDJ ? (
									<li>
										<Navlink
											onClick={() => this.handleClose()}
											userNavigation={true}
											to={`/user/${
												this.props.profile.user_metadata.permaLink
											}/gigs`}
											label="Gigs"
										/>
									</li>
								) : null}

								{this.props.profile.isDJ ? (
									<li>
										<Navlink
											onClick={() => this.handleClose()}
											userNavigation={true}
											to={`/user/${
												this.props.profile.user_metadata.permaLink
											}/reviews`}
											label={translate("reviews")}
										/>
									</li>
								) : null}

								{this.props.isCustomer && !this.props.isDJ ? (
									<li>
										<Navlink
											onClick={() => this.handleClose()}
											userNavigation={true}
											to="/signup"
											label={translate("apply-to-become-dj")}
										/>
									</li>
								) : null}
								{this.props.loggedIn ? (
									<li>
										<Navlink
											onClick={() => this.handleClose()}
											userNavigation={true}
											to={`/user/${
												this.props.profile.user_metadata.permaLink
											}/preferences`}
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
								{this.props.loggedIn ? (
									<li>
										<Navlink
											buttonLook={true}
											to="/"
											onClick={this.logout}
											label={translate("log-out")}
										/>
									</li>
								) : null}
								{this.props.loggedIn ? null : (
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
								{this.props.loggedIn ? null : (
									<li>
										<a onClick={this.onLoginButton}>{translate("login")}</a>
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
			</div>
		);
	}
}

MobileMenu.childContextTypes = {
	color: PropTypes.string
};

export const mapStateToProps = state => {
	return {
		profile: state.login.profile,
		loggedIn: state.login.status.signedIn,
		registeredMenuItems: state.menu,
		translate: getTranslate(state.locale)
	};
};

export const mapDispatchToProps = (dispatch, ownprops) => {
	return {
		logout: () => dispatch(actions.userLogout()),
		updatePicture: (img, callback, profile) => {
			dispatch(UserActions.SaveProfilePicture(img, profile, callback));
		}
	};
};

export const mergeProps = (stateProps, dispatchProps, ownProps) => {
	return {
		...ownProps,
		...stateProps,
		...dispatchProps,
		updatePicture: (img, callback) =>
			dispatchProps.updatePicture(img, callback, stateProps.profile)
	};
};
export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(
	MobileMenu
);
