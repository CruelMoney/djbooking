import React, { Component } from "react";
import PropTypes from "prop-types";
import Navlink from "./common/Navlink";
import Dropdown from "./common/Dropdown";
import UserMenuItem from "./common/UserMenuItem";
import Button from "./common/Button-v2";
import Login from "./common/Login";
import Logo from "./common/Logo";
import MobileMenu from "./MobileMenu";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import BreadCrumbs from "./BreadCrumbs";
import * as actions from "../actions/LoginActions";
import { getTranslate } from "react-localize-redux";
import EmailVerifier from "./EmailVerifier";
import { Query } from "react-apollo";
import { ME } from "./gql";

class Menu extends Component {
	static propTypes = {
		loggedIn: PropTypes.bool,
		logout: PropTypes.func.isRequired,
		profile: PropTypes.object
	};

	state = {
		loginExpanded: false,
		fixed: false
	};

	onLoginButton = () => {
		this.setState(({ loginExpanded }) => ({
			loginExpanded: !loginExpanded
		}));
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

	redirectToProfile = () => {};

	componentDidUpdate(prevProps) {
		const { location } = this.props;
		window.addEventListener("scroll", this.handleScroll);

		if (location.pathname !== prevProps.location.pathname) {
			window.scrollTo(0, 0);
		}
	}
	componentWillUnmount() {
		window.removeEventListener("scroll", this.handleScroll);
	}
	handleScroll = event => {
		let scrollTop = event.srcElement.body.scrollTop;
		if (scrollTop > 150) {
			this.mobileMenu.className = "buttonFixed";
		} else {
			this.mobileMenu.className = "";
		}
	};

	handleLoggedIn = ({ me }) => {
		this.setState({
			loggedIn: !!me
		});
	};

	logout = () => {
		const { translate, history } = this.props;
		history.push(translate(`routes./`));
		this.setState(
			{
				loggedIn: false
			},
			this.props.logout
		);
	};

	render() {
		const { translate, location } = this.props;
		const { showMenu, loginExpanded, loggedIn } = this.state;
		const isHome = location.pathname === "/" || location.pathname === "/dk";

		return (
			<Query query={ME} onCompleted={this.handleLoggedIn} onError={console.log}>
				{({ refetch, loading, data = {} }) => {
					const { me: user } = data;

					return (
						<div className="menu-wrapper">
							<EmailVerifier onVerified={this.onLoginButton} />

							<MobileMenu
								isHome
								onClosing={() => this.setState({ showMenu: false })}
								show={showMenu}
							/>
							<div className="container">
								<div className={"nav-container location_"}>
									<nav className="navigation">
										<div className="logo-area">
											<Navlink to={translate("routes./")}>
												<Logo />
											</Navlink>
											<BreadCrumbs />
										</div>

										<div className="" ref={ref => (this.mobileMenu = ref)}>
											<a
												className="mobileMenuButton"
												onClick={() => {
													this.setState({ showMenu: !showMenu });
												}}
											>
												<h2>Menu</h2>
											</a>
										</div>
										<ul className="main-menu">
											{!isHome ? (
												<li>
													<Navlink
														buttonLook={true}
														to={translate("routes./")}
														label={translate("arrange-event")}
													/>
												</li>
											) : null}

											<li>
												<Navlink
													buttonLook={true}
													to={translate("routes./how-it-works")}
													label={translate("how-it-works")}
												/>
											</li>

											{!loggedIn && !loading ? (
												<li>
													<a onClick={this.onLoginButton}>
														{translate("login")}
													</a>
													<Dropdown
														expanded={loginExpanded}
														disableOnClickOutside={!loginExpanded}
														onClickOutside={this.onClickOutside}
													>
														<Login
															closeLogin={this.onClickOutside}
															onLogin={refetch}
															user={user}
														/>
													</Dropdown>
												</li>
											) : null}

											{loggedIn ? null : (
												<li>
													<Navlink
														buttonLook={true}
														to={translate("routes./signup")}
														label={translate("apply-to-become-dj")}
														important={true}
													/>
												</li>
											)}
											{loggedIn ? (
												<li>
													<Navlink
														buttonLook={true}
														to={translate("routes./")}
														onClick={this.logout}
														label={translate("log-out")}
													/>
												</li>
											) : null}

											{loggedIn ? (
												<li>
													<Navlink
														buttonLook={true}
														to={translate("routes./user/:username/profile", {
															username: user.permalink
														})}
														important={true}
													>
														<UserMenuItem
															name={user.userMetadata.firstName}
															picture={user.picture && user.picture.path}
														/>
													</Navlink>
												</li>
											) : null}

											{loading ? (
												<li>
													<Button
														className="redirect-button"
														color="#03d1ff"
														isLoading
													/>
												</li>
											) : null}
										</ul>
									</nav>
								</div>
							</div>
						</div>
					);
				}}
			</Query>
		);
	}
}

function mapStateToProps(state, ownprops) {
	return {
		...ownprops,
		translate: getTranslate(state.locale)
	};
}

function mapDispatchToProps(dispatch, ownprops) {
	return {
		logout: () => dispatch(actions.userLogout())
	};
}

const SmartNavigation = withRouter(
	connect(
		mapStateToProps,
		mapDispatchToProps
	)(Menu)
);

export default props => <SmartNavigation {...props} />;
