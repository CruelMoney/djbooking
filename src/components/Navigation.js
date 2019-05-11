import React, { Component, useEffect, useState } from "react";
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
import * as sessionActions from "../actions/SessionActions";
import { getTranslate } from "react-localize-redux";
import Notification from "./common/Notification";
import { Mutation } from "react-apollo";
import { VERIFY_EMAIL } from "./gql";
import ErrorMessageApollo from "./common/ErrorMessageApollo";

const EmailVerifier = () => {
	const parsedUrl = new URL(window.location.href);
	const verifyToken = parsedUrl.searchParams.get("token");
	const isEmailValidation = parsedUrl.searchParams.get("emailVerification");

	if (!verifyToken || !isEmailValidation) return null;

	return (
		<Mutation mutation={VERIFY_EMAIL} onError={console.log}>
			{(mutate, { loading, error, data }) => (
				<EmailVerifyIndicator
					verifyToken={verifyToken}
					mutate={mutate}
					loading={loading}
					data={data}
					error={error}
				/>
			)}
		</Mutation>
	);
};

const EmailVerifyIndicator = ({
	verifyToken,
	mutate,
	loading,
	data,
	error
}) => {
	const verifyEmail = async () => {
		await mutate({
			variables: {
				verifyToken
			}
		});
	};

	useEffect(
		() => {
			verifyEmail();
		},
		[verifyToken]
	);

	const [active, setActive] = useState(true);
	useEffect(
		() => {
			if (loading === false) {
				// TODO should remove params here
				const r = setTimeout(_ => setActive(false), 2000);
				return _ => clearTimeout(r);
			}
		},
		[loading]
	);

	return (
		<Notification
			overlay
			active={active}
			loading={loading}
			message={data ? "Email verified" : "Verifying email"}
		>
			{error && <ErrorMessageApollo error={error} />}
		</Notification>
	);
};

class Menu extends Component {
	static propTypes = {
		loggedIn: PropTypes.bool,
		logout: PropTypes.func.isRequired,
		profile: PropTypes.object
	};

	state = {
		loginExpanded: false,
		fixed: false,
		didCheckLogin: false
	};

	getChildContext() {
		return {
			profile: this.props.profile,
			loggedIn: this.props.loggedIn
		};
	}

	componentDidMount() {
		this.props.setGeoSession();
		this.checkForLogin();
	}

	checkForLogin = (nextState, replace) => {
		if (!this.state.didCheckLogin && !this.props.loggedIn) {
			this.setState(
				{
					didCheckLogin: true,
					checking: true
				},
				this.props.checkForLogin()
			);
		}
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

	componentWillReceiveProps(nextProps) {
		const { translate } = this.props;

		if (nextProps.isRedirect && !this.state.redirected) {
			if (
				nextProps.profile.user_metadata &&
				nextProps.profile.user_metadata.permaLink
			) {
				this.props.history.push(
					translate(`routes./user/:username/profile`, {
						username: nextProps.profile.user_metadata.permaLink
					})
				);
			} else {
				this.props.history.push(translate(`routes./user/signup`));
			}
			this.setState({ redirected: true });
		}
	}
	componentDidUpdate(prevProps) {
		window.addEventListener("scroll", this.handleScroll);

		if (this.props.location.pathname !== prevProps.location.pathname) {
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

	render() {
		const { translate } = this.props;
		const isHome =
			this.props.location.pathname === "/" ||
			this.props.location.pathname === "/dk";

		return (
			<div className="menu-wrapper">
				<EmailVerifier />

				<MobileMenu
					isHome
					onClosing={() => this.setState({ showMenu: false })}
					show={this.state.showMenu}
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
										this.setState({ showMenu: !this.state.showMenu });
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

								{!this.props.loggedIn && !this.props.isWaiting ? (
									<li>
										<a onClick={this.onLoginButton}>{translate("login")}</a>
										<Dropdown
											expanded={this.state.loginExpanded}
											disableOnClickOutside={!this.state.loginExpanded}
											onClickOutside={this.onClickOutside}
										>
											<Login
												closeLogin={this.onClickOutside}
												profile={this.props.profile}
											/>
										</Dropdown>
									</li>
								) : null}

								{this.props.loggedIn ? null : (
									<li>
										<Navlink
											buttonLook={true}
											to={translate("routes./signup")}
											label={translate("apply-to-become-dj")}
											important={true}
										/>
									</li>
								)}
								{this.props.loggedIn ? (
									<li>
										<Navlink
											buttonLook={true}
											to={translate("routes./")}
											onClick={this.props.logout}
											label={translate("log-out")}
										/>
									</li>
								) : null}

								{this.props.loggedIn ? (
									<li>
										<Navlink
											buttonLook={true}
											to={translate("routes./user/:username/profile", {
												username: this.props.profile.user_metadata.permaLink
											})}
											important={true}
										>
											<UserMenuItem
												name={this.props.profile.name}
												picture={this.props.profile.picture}
											/>
										</Navlink>
									</li>
								) : null}

								{this.props.isWaiting ? (
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
	}
}

Menu.childContextTypes = {
	profile: PropTypes.object,
	loggedIn: PropTypes.bool
};

function mapStateToProps(state, ownprops) {
	return {
		...ownprops,
		loggedIn: state.login.status.signedIn,
		isRedirect: state.login.status.isRedirect,
		isWaiting: state.login.status.isWaiting,
		profile: state.login.profile,
		translate: getTranslate(state.locale)
	};
}

function mapDispatchToProps(dispatch, ownprops) {
	return {
		logout: () => dispatch(actions.userLogout()),
		checkForLogin: route => dispatch(actions.checkForLogin(route)),
		setGeoSession: () => dispatch(sessionActions.setGeodata())
	};
}

const SmartNavigation = withRouter(
	connect(
		mapStateToProps,
		mapDispatchToProps
	)(Menu)
);

export default props => <SmartNavigation {...props} />;
