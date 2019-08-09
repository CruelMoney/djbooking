import React, { useState } from "react";
import ReactDOM from "react-dom";
import Navlink from "./common/Navlink";
import Popup from "./common/Popup";
import Login from "./common/Login";
import { connect } from "react-redux";

import { getTranslate } from "react-localize-redux";
import { ME } from "./gql";
import { Query } from "react-apollo";
import { useLogout } from "../utils/Hooks";

const MobileMenu = ({ isHome, translate }) => {
	const [show, setShow] = useState(false);
	const [loginExpanded, setLoginExpanded] = useState(false);
	const logout = useLogout();
	const doLogout = () => {
		logout();
		setShow(false);
	};

	return (
		<Query query={ME} onError={console.log}>
			{({ refetch, loading, data = {} }) => {
				const { me: user } = data;

				const loggedIn = !!user;
				const isDJ = user && user.isDj;

				return (
					<>
						<button
							className="mobileMenuButton link-look s"
							onClick={() => {
								setShow(true);
							}}
						>
							<h2>Menu</h2>
						</button>
						{typeof document !== "undefined" &&
							ReactDOM.createPortal(
								<Content
									show={show}
									logout={doLogout}
									loggedIn={loggedIn}
									user={user}
									isDJ={isDJ}
									isHome={isHome}
									translate={translate}
									setShow={setShow}
									setLoginExpanded={setLoginExpanded}
								/>,
								document.querySelector("#mobile-menu-portal")
							)}
						<Popup
							showing={loginExpanded}
							onClickOutside={() => setLoginExpanded(false)}
						>
							<Login onLogin={() => setLoginExpanded(false)} />
						</Popup>
					</>
				);
			}}
		</Query>
	);
};

const Content = ({
	show,
	setShow,
	translate,
	isHome,
	isDJ,
	user,
	loggedIn,
	logout,
	setLoginExpanded
}) => (
	<div className={"mobileMenu" + (show ? " active" : "")}>
		<div className="menuArea">
			<button
				onClick={() => setShow(false)}
				className="popupCloseButton link-look"
			>
				{translate("close")}
			</button>

			<div className="menu">
				<ul>
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
								onClick={() => setShow(false)}
								userNavigation={true}
								to={`/user/${user.permalink}/profile`}
								label={translate("profile")}
							/>
						</li>
					) : null}

					{isDJ ? (
						<li>
							<Navlink
								onClick={() => setShow(false)}
								userNavigation={true}
								to={`/user/${user.permalink}/gigs`}
								label="Gigs"
							/>
						</li>
					) : null}

					{!loggedIn ? (
						<li>
							<Navlink
								onClick={() => setShow(false)}
								userNavigation={true}
								to="/signup"
								label={translate("apply-to-become-dj")}
							/>
						</li>
					) : null}
					{loggedIn ? (
						<li>
							<Navlink
								onClick={() => setShow(false)}
								userNavigation={true}
								to={`/user/${user.permalink}/settings`}
								label={translate("preferences")}
							/>
						</li>
					) : null}

					<li>
						<Navlink
							onClick={() => setShow(false)}
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
								onClick={logout}
								label={translate("log-out")}
							/>
						</li>
					) : null}
					{loggedIn ? null : (
						<li>
							<Navlink
								onClick={() => setShow(false)}
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
								onClick={() => setLoginExpanded(true)}
							>
								{translate("login")}
							</button>
						</li>
					)}
				</ul>
			</div>
		</div>
	</div>
);

export const mapStateToProps = state => {
	return {
		translate: getTranslate(state.locale)
	};
};

export default connect(mapStateToProps)(MobileMenu);
