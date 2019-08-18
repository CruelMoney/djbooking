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
import Sidebar, { SidebarContent, CTAShadow } from "./components/Sidebar.js";
import Footer from "../../components/common/Footer.js";
import {
	Overview,
	Settings,
	Reviews,
	Gigs,
	Events,
	Booking,
	Photos
} from "./routes";
import {
	Container,
	Row,
	Col,
	Divider,
	ShowBelow
} from "../../components/Blocks";
import { useMutation } from "@apollo/react-hooks";
import ScrollToTop from "../../components/common/ScrollToTop";
import Popup from "../../components/common/Popup.js";
import Login from "../../components/common/Login.js";
import { SimpleSharing } from "../../components/common/Sharing-v2.js";
import { LoadingPlaceholder2 } from "../../components/common/LoadingPlaceholder";
import Pin from "react-ionicons/lib/MdPin";
import Medal from "react-ionicons/lib/MdMedal";
import Star from "react-ionicons/lib/MdStar";
import Tooltip from "../../components/Tooltip";
import moment from "moment";
import GracefullImage from "../../components/GracefullImage";
import { SmallHeader, Stat } from "../../components/Text";
import AddCircle from "react-ionicons/lib/MdAddCircle";
import ProfileProgress from "./components/ProfileProgress.js";
import { ME } from "../../components/gql.js";
import { Helmet } from "react-helmet-async";
import BookingButton from "./components/BookingButton";
import SavingIndicator from "../../components/SavingIndicator.js";

const UserSidebar = ({ user, loading, bookingEnabled, location }) => {
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
			childrenBelow={
				user && user.isOwn ? (
					<ProfileProgress user={user} />
				) : (
					<SimpleSharing
						shareUrl={user && `/user/${user.permalink}/overview`}
					/>
				)
			}
		>
			<ProfileImg src={user ? user.picture.path : null} animate />

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
			{bookingEnabled && <BookingButton user={user} location={location} />}
		</Sidebar>
	);
};

const UserContainer = styled(Container)`
	.sidebar {
		margin-top: -220px;
		margin-bottom: 30px;
		margin-right: 60px;
		@media only screen and (max-width: 768px) {
			margin-right: 30px;
		}
	}
`;

const Content = React.memo(({ match, ...userProps }) => {
	const { user, loading, location } = userProps;
	const showPrivateRoutes = loading || (user && user.isOwn);
	const bookingEnabled = user && user.isDj && !user.userSettings.standby;
	debugger;
	return (
		<div>
			<ScrollToTop animate top={280} />

			<Header user={user} loading={loading} />

			<UserContainer>
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
						<Switch location={location}>
							<Route
								strict
								exact
								path={match.url + "/overview"}
								render={props => <Overview {...props} {...userProps} />}
							/>
							<Route
								strict
								exact
								path={match.url + "/reviews"}
								render={props => <Reviews {...props} {...userProps} />}
							/>
							<Route
								strict
								exact
								path={match.path + "/photos"}
								render={props => <Photos {...props} {...userProps} />}
							/>
							{showPrivateRoutes ? (
								<Route
									strict
									exact
									path={match.url + "/settings"}
									render={props => <Settings {...props} {...userProps} />}
								/>
							) : null}

							{showPrivateRoutes ? (
								<Route
									strict
									exact
									path={match.url + "/gigs"}
									render={props => <Gigs {...props} {...userProps} />}
								/>
							) : !userProps.loading ? (
								<Route
									strict
									exact
									path={match.url + "/gigs"}
									render={props => <LoginPopup {...props} {...userProps} />}
								/>
							) : null}

							{showPrivateRoutes ? (
								<Route
									strict
									exact
									path={match.url + "/events"}
									render={props => <Events {...props} {...userProps} />}
								/>
							) : null}

							<Redirect
								to={{
									pathname: match.url + "/overview" + location.search,
									search: location.search,
									state: location.state
								}}
							/>
						</Switch>
					</Col>
				</Row>
			</UserContainer>
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

const Index = ({ translate, match, location }) => {
	const [updateUser, { loading: isSaving, error }] = useMutation(UPDATE_USER);
	const [hasScrolled, setHasScrolled] = useState(false);

	useEffect(() => {
		setHasScrolled(true);
	}, []);

	return (
		<>
			<Query query={ME} onError={console.warn}>
				{({ data, loading: loadingMe }) => (
					<Query
						query={USER}
						variables={{ permalink: match.params.permalink }}
						onError={console.warn}
					>
						{({ data: { user: profileUser }, loading: loadingUser }) => {
							const loading = loadingMe || loadingUser;

							if (!loadingUser && !profileUser) {
								return <Redirect to={translate("routes./not-found")} />;
							}

							let user = profileUser;

							if (user && data && data.me) {
								user.isOwn = user.isOwn || data.me.id === user.id;
							}

							if (user && user.isOwn && data && data.me) {
								user = mergeObjects(user, data.me);
							}

							const title = user
								? user.artistName || user.userMetadata.firstName
								: null;
							const thumb = user ? user.picture.path : null;
							const description = user ? user.userMetadata.bio : null;

							return (
								<div>
									{!hasScrolled && <ScrollToTop />}
									{user && (
										<Helmet>
											<title>{title}</title>
											<meta property="og:title" content={title} />
											<meta name="twitter:title" content={title} />

											<meta property="og:image" content={thumb} />
											<meta name="twitter:image" content={thumb} />

											<meta name="description" content={description} />
											<meta name="twitter:description" content={description} />
											<meta property="og:description" content={description} />

											{user.isOwn && (
												<meta
													name="apple-itunes-app"
													content="app-id=1458267647, app-argument=userProfile"
												/>
											)}
										</Helmet>
									)}
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
													location={location}
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
										subTitle={translate(
											"See how it works, or arrange an event."
										)}
									/>
								</div>
							);
						}}
					</Query>
				)}
			</Query>
		</>
	);
};

const IconRow = styled(Row)`
	font-family: "AvenirNext-DemiBold", Arial, Helvetica, sans-serif;
	font-size: 15px;
	color: #98a4b3;
	align-items: center;
	margin-bottom: 12px;
	display: inline-flex;
	svg {
		margin-right: 15px;
	}
`;

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
	@media only screen and (max-width: 768px) {
		width: 250px;
		height: 250px;
	}
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

const StickyBookingButtonWrapper = styled.div`
	position: fixed;
	left: 0;
	right: 0;
	bottom: 0;
	padding: 15px;
	z-index: 99;
	margin-bottom: env(safe-area-inset-bottom);
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
