import React, { useState, useEffect } from "react";
import { Switch, Route, Redirect } from "react-router";
import styled from "styled-components";
import content from "./content.json";
import requestformContent from "../../components/common/RequestForm/content.json";
import modalContent from "../../components/common/modals/content.json";
import addTranslate from "../../components/higher-order/addTranslate";
import { Query } from "react-apollo";
import Header from "./components/Header.js";
import { USER, UPDATE_USER } from "./gql.js";
import Sidebar, {
	CTAButton,
	SidebarContent,
	CTAShadow
} from "./components/Sidebar.js";
import Footer from "../../components/common/Footer.js";
import { Overview, Settings, Reviews, Gigs, Events, Booking } from "./routes";
import {
	Container,
	Row,
	Col,
	Divider,
	ShowBelow
} from "./components/Blocks.js";
import { useMutation } from "react-apollo-hooks";
import Notification from "../../components/common/Notification.js";
import ErrorMessageApollo from "../../components/common/ErrorMessageApollo.js";
import ScrollToTop from "../../components/common/ScrollToTop";
import Popup from "../../components/common/Popup.js";
import Login from "../../components/common/Login.js";
import { SimpleSharing } from "../../components/common/Sharing-v2.js";
import { LoadingPlaceholder2 } from "../../components/common/LoadingPlaceholder";
import Pin from "react-ionicons/lib/MdPin";
import Medal from "react-ionicons/lib/MdMedal";
import Star from "react-ionicons/lib/MdStar";
import Tooltip from "./components/Tooltip";
import moment from "moment";
import { NavLink } from "react-router-dom";
import GracefullImage from "./components/GracefullImage";
import { SmallHeader, Stat } from "./components/Text.js";
import AddCircle from "react-ionicons/lib/MdAddCircle";
import ProfileProgress from "./components/ProfileProgress.js";
import { ME } from "../../components/gql.js";

const Content = React.memo(({ match, ...userProps }) => {
	const { user, loading } = userProps;
	const showPrivate = loading || (user && user.isOwn);
	const bookingEnabled = user && user.isDj && !user.userSettings.standby;
	debugger;
	return (
		<div>
			<ScrollToTop animate top={280} />

			<Header user={user} loading={loading} />

			<Container>
				<Row style={{ alignItems: "stretch" }}>
					<Col>
						<UserSidebar {...userProps} bookingEnabled={bookingEnabled} />
						{bookingEnabled && <MobileBookingButton {...userProps} />}
					</Col>
					<Col
						style={{
							marginTop: "42px",
							width: "100%",
							marginBottom: "60px",
							zIndex: 0,
							position: "relative"
						}}
					>
						<Switch>
							<Route
								path={match.path + "/overview"}
								render={props => <Overview {...props} {...userProps} />}
							/>
							<Route
								path={match.path + "/reviews"}
								render={props => <Reviews {...props} {...userProps} />}
							/>
							{showPrivate ? (
								<Route
									path={match.path + "/settings"}
									render={props => <Settings {...props} {...userProps} />}
								/>
							) : null}

							{showPrivate ? (
								<Route
									path={match.path + "/gigs"}
									render={props => <Gigs {...props} {...userProps} />}
								/>
							) : !userProps.loading ? (
								<Route
									path={match.path + "/gigs"}
									render={props => <LoginPopup {...props} {...userProps} />}
								/>
							) : null}

							{showPrivate ? (
								<Route
									path={match.path + "/events"}
									render={props => <Events {...props} {...userProps} />}
								/>
							) : null}

							<Redirect to={match.path + "/overview"} />
						</Switch>
					</Col>
				</Row>
			</Container>
		</div>
	);
});

const LoginPopup = ({ translate }) => {
	const [shwowing, setShwowing] = useState(true);

	return (
		<Popup
			showing={shwowing}
			width={"400px"}
			onClickOutside={() => setShwowing(false)}
		>
			<>
				<p>{translate("Login to see your gigs")}</p>
				<Login
					redirect={false}
					onLogin={async _ => {
						window.location.reload();
					}}
				/>
			</>
		</Popup>
	);
};

const Index = ({ translate, match }) => {
	const [updateUser, { loading: isSaving, error }] = useMutation(UPDATE_USER);

	return (
		<Query query={ME} onError={console.warn}>
			{({ data, loading: loadingMe }) => (
				<Query
					query={USER}
					variables={{ permalink: match.params.permalink }}
					onError={console.warn}
				>
					{({ data: { user: profileUser }, loading: loadingUser }) => {
						const loading = loadingMe || loadingUser;

						const user =
							data && data.me
								? mergeObjects(profileUser, data.me)
								: profileUser;

						if (user && profileUser) {
							user.isOwn =
								user.isOwn ||
								(data && data.me && data.me.id === profileUser.id);
						}

						return (
							<div>
								<SavingIndicator loading={isSaving} error={error} />

								<Switch>
									<Route
										path={match.path + "/booking"}
										render={props => (
											<Booking
												{...props}
												user={user}
												loading={loading}
												translate={translate}
											/>
										)}
									/>
									<Route
										render={() => (
											<Content
												match={match}
												user={user}
												loading={loading}
												translate={translate}
												updateUser={updateUser}
											/>
										)}
									/>
								</Switch>

								<Footer
									noSkew
									firstTo={translate("routes./how-it-works")}
									secondTo={translate("routes./")}
									firstLabel={translate("how-it-works")}
									secondLabel={translate("arrange-event")}
									title={translate("Wonder how it works?")}
									subTitle={translate("See how it works, or arrange an event.")}
								/>
							</div>
						);
					}}
				</Query>
			)}
		</Query>
	);
};

const SavingIndicator = ({ loading, error }) => {
	const [active, setActive] = useState(false);

	useEffect(() => {
		if (loading === false) {
			const r = setTimeout(_ => setActive(false), error ? 10000 : 1000);
			return _ => clearTimeout(r);
		} else {
			setActive(true);
		}
	}, [error, loading]);

	return (
		<Notification
			overlay
			bottom
			active={active}
			loading={loading}
			message={"Saving"}
		>
			{error && <ErrorMessageApollo error={error} />}
		</Notification>
	);
};

const IconRow = styled(Row)`
	font-family: "AvenirNext-DemiBold";
	font-size: 15px;
	color: #98a4b3;
	align-items: center;
	margin-bottom: 12px;
	display: inline-flex;
	svg {
		margin-right: 15px;
	}
`;

const UserSidebar = ({ user, loading, bookingEnabled }) => {
	const { userMetadata = {}, appMetadata = {}, playingLocation } = user || {};
	const {
		experience,
		followers,
		createdAt,
		certified,
		identityVerified
	} = appMetadata;

	const memberSince = moment(createdAt).format("MMMM YYYY");
	return (
		<Sidebar
			showCTAShadow={bookingEnabled}
			stickyTop={"-300px"} // height of image
			style={{
				marginTop: "-220px",
				marginBottom: "30px",
				marginRight: "60px"
			}}
			childrenBelow={
				user && user.isOwn ? (
					<ProfileProgress user={user} />
				) : (
					<SimpleSharing
						shareUrl={user && `/user/${user.permalink}/overview}]`}
					/>
				)
			}
		>
			<ProfileImg src={user ? user.picture.path : null} />

			{loading || !user ? (
				<SidebarContent>
					<LoadingPlaceholder2 />
				</SidebarContent>
			) : (
				<SidebarContent>
					{experience || followers ? (
						<>
							<Stats experience={experience} followers={followers} />
							<Divider />
						</>
					) : null}

					<SmallHeader
						style={{ marginBottom: "15px" }}
					>{`Hi I'm ${userMetadata.firstName}`}</SmallHeader>

					<Col
						style={{
							alignItems: "flex-start"
						}}
					>
						<IconRow className="iconRow">
							<AddCircle color={"#98a4b3"} style={{ marginRight: "15px" }} />
							Member since {memberSince}
						</IconRow>
						{playingLocation && (
							<IconRow>
								<Pin color={"#98a4b3"} style={{ marginRight: "15px" }} />
								{playingLocation.name}
							</IconRow>
						)}
						<CertifiedVerified
							certified={certified}
							identityVerified={identityVerified}
						/>
					</Col>
				</SidebarContent>
			)}
			{bookingEnabled && <BookingButton user={user} />}
		</Sidebar>
	);
};

export const CertifiedVerified = ({ certified, identityVerified }) => (
	<>
		{certified && (
			<Tooltip
				text={
					"This dj has been certified by Cueup. The Cueup team has personally met and seen this dj play."
				}
			>
				{({ ref, close, open }) => (
					<IconRow
						ref={ref}
						onMouseEnter={open}
						onMouseLeave={close}
						className="iconRow"
					>
						<Medal color={"#50E3C2"} />
						Cueup certified
					</IconRow>
				)}
			</Tooltip>
		)}
		{identityVerified && (
			<IconRow className="iconRow">
				<Star color={"#50E3C2"} />
				Identity verified
			</IconRow>
		)}
	</>
);

const ProfileImg = styled(GracefullImage)`
	width: 300px;
	height: 300px;
	object-fit: cover;
`;

export const Stats = ({ experience, followers, white, marginRight }) => {
	return (
		<Row>
			{followers && (
				<Stat
					label={"followers"}
					value={followers}
					style={{ marginRight: marginRight || "24px" }}
					white={white}
				></Stat>
			)}
			{experience && (
				<Stat white={white} label={"played gigs"} value={experience}></Stat>
			)}
		</Row>
	);
};

const BookingButton = ({ loading, user }) => {
	if (!user) {
		return null;
	}
	if (user.isOwn) {
		return (
			<CTAButton
				onClick={() => window.alert("Are you trying to book yourself? 🧐")}
			>
				REQUEST BOOKING
			</CTAButton>
		);
	}

	return (
		<NavLink to="booking">
			<CTAButton>REQUEST BOOKING</CTAButton>
		</NavLink>
	);
};

const StickyBookingButtonWrapper = styled.div`
	position: fixed;
	left: 0;
	right: 0;
	bottom: 0;
	padding: 15px;
	z-index: 99;
	> div,
	button {
		position: relative;
	}
`;

export const MobileBookingButton = ({ children, ...props }) => (
	<ShowBelow>
		<StickyBookingButtonWrapper>
			<div>
				<CTAShadow />
				{children || <BookingButton {...props}></BookingButton>}
			</div>
		</StickyBookingButtonWrapper>
	</ShowBelow>
);

const isObject = o => Object.prototype.toString.call(o) === "[object Object]";

/**
 * Object merger where o2 takes precedence when value is not an object
 * @param  {} o1
 * @param  {} o2
 */
const mergeObjects = (o1, o2) => {
	if (isObject(o1) && isObject(o2)) {
		const keys = [...new Set([...Object.keys(o1), ...Object.keys(o2)])];

		// iterate over keys
		return keys.reduce((merged, key) => {
			const v1 = o1[key];
			const v2 = o2[key];

			return {
				...merged,
				[key]: mergeObjects(v1, v2)
			};
		}, {});
	}
	if (!o2) {
		return o1;
	}

	return o2;
};

export default addTranslate(Index, [content, requestformContent, modalContent]);
