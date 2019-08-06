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
import Sidebar, { CTAButton, SidebarContent } from "./components/Sidebar.js";
import Footer from "../../components/common/Footer.js";
import { Overview, Settings, Reviews, Gigs, Events, Booking } from "./routes";
import { Container, Row, Col, Divider } from "./components/Blocks.js";
import { useMutation } from "react-apollo-hooks";
import Notification from "../../components/common/Notification.js";
import ErrorMessageApollo from "../../components/common/ErrorMessageApollo.js";
import ScrollToTop from "../../components/common/ScrollToTop";
import Popup from "../../components/common/Popup.js";
import Login from "../../components/common/Login.js";
import { SimpleSharing } from "../../components/common/Sharing-v2.js";
import { LoadingPlaceholder2 } from "../../components/common/LoadingPlaceholder";
import Arrow from "react-ionicons/lib/MdArrowRoundForward";
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

const Content = React.memo(({ match, ...userProps }) => {
	const { user, loading } = userProps;
	const showPrivate = loading || (user && user.isOwn);
	return (
		<div>
			<ScrollToTop animate top={280} />

			<Header user={user} loading={loading} />

			<Container>
				<Row style={{ alignItems: "stretch" }}>
					<Col>
						<UserSidebar {...userProps} />
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
		<Query
			query={USER}
			variables={{ permalink: match.params.permalink }}
			onError={console.warn}
		>
			{({ data: { user }, loading }) => (
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
`;

const UserSidebar = ({ user, loading }) => {
	const { userMetadata = {}, appMetadata = {}, playingLocation } = user || {};
	const {
		experience,
		followers,
		createdAt,
		certified,
		identityVerified
	} = appMetadata;

	const memberSince = moment(createdAt).format("MMMM YYYY");
	const bookingEnabled = user && user.isDj && !user.userSettings.standby;
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
				<>
					{user && user.isOwn && <ProfileProgress user={user} />}
					<SimpleSharing
						shareUrl={user && `/user/${user.permalink}/overview}]`}
					/>
				</>
			}
		>
			<ProfileImg src={user ? user.picture.path : null} />

			{loading || !user ? (
				<SidebarContent>
					<LoadingPlaceholder2 />
				</SidebarContent>
			) : (
				<SidebarContent>
					<Stats experience={experience} followers={followers} />
					<SmallHeader
						style={{ marginBottom: "15px" }}
					>{`Hi I'm ${userMetadata.firstName}`}</SmallHeader>

					<Col
						style={{
							alignItems: "flex-start"
						}}
					>
						<IconRow>
							<AddCircle color={"#98a4b3"} style={{ marginRight: "15px" }} />
							Member since {memberSince}
						</IconRow>
						{playingLocation && (
							<IconRow>
								<Pin color={"#98a4b3"} style={{ marginRight: "15px" }} />
								{playingLocation.name}
							</IconRow>
						)}
						{certified && (
							<Tooltip
								text={
									"This dj has been certified by Cueup. The Cueup team has personally met and seen this dj play."
								}
							>
								{({ ref, close, open }) => (
									<IconRow ref={ref} onMouseEnter={open} onMouseLeave={close}>
										<Medal color={"#50E3C2"} style={{ marginRight: "15px" }} />
										Cueup certified
									</IconRow>
								)}
							</Tooltip>
						)}
						{identityVerified && (
							<IconRow>
								<Star color={"#50E3C2"} style={{ marginRight: "15px" }} />
								Identity verified
							</IconRow>
						)}
					</Col>
				</SidebarContent>
			)}
			{bookingEnabled && <BookingButton user={user} />}
		</Sidebar>
	);
};

const ProfileImg = styled(GracefullImage)`
	width: 300px;
	height: 300px;
	object-fit: cover;
`;

const Stats = ({ experience, followers }) => {
	if (!experience && !followers) {
		return null;
	}
	return (
		<>
			<Row>
				{followers && (
					<Stat
						label={"followers"}
						value={followers}
						style={{ marginRight: "24px" }}
					></Stat>
				)}
				{experience && <Stat label={"played gigs"} value={experience}></Stat>}
			</Row>
			<Divider></Divider>
		</>
	);
};

const BookingButton = ({ loading, user }) => {
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

export default addTranslate(Index, [content, requestformContent, modalContent]);
