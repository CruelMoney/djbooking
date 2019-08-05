import React from "react";
import styled from "styled-components";
import { Row, Divider, Col } from "./Blocks";
import { Stat, SmallHeader } from "./Text";
import GracefullImage from "./GracefullImage";
import { LoadingPlaceholder2 } from "../../../components/common/LoadingPlaceholder";
import Arrow from "react-ionicons/lib/MdArrowRoundForward";
import AddCircle from "react-ionicons/lib/MdAddCircle";
import Pin from "react-ionicons/lib/MdPin";
import Medal from "react-ionicons/lib/MdMedal";
import Star from "react-ionicons/lib/MdStar";
import Tooltip from "./Tooltip";
import moment from "moment";
import { SimpleSharing } from "../../../components/common/Sharing-v2";
import { NavLink } from "react-router-dom";

const Sticky = styled.div`
	position: sticky;
	top: ${({ stickyTop }) => stickyTop};
	margin-bottom: 42px;
	align-self: flex-start;
	z-index: 2;
`;

export const Spacing = styled.div`
	min-width: 300px;
	width: 300px;
	position: relative;
`;

const CardWrapper = styled(Spacing)``;

const Card = styled.div`
	background-color: #fff;
	width: 100%;
	height: 100%;
	position: relative;
	z-index: 1;
`;

const Shadow = styled.div`
	box-shadow: 0 2px 50px 0 rgba(0, 0, 0, 0.5);
	width: 85%;
	height: 94%;
	position: absolute;
	bottom: 0;
	left: 50%;
	transform: translateX(-50%);
	z-index: 0;
`;

const ProfileImg = styled(GracefullImage)`
	width: 300px;
	height: 300px;
	object-fit: cover;
`;

export const SidebarContent = styled.div`
	padding: 24px;
`;

const Sidebar = ({
	user,
	loading,
	children,
	enableSharing = true,
	style,
	stickyTop = "-300px", // height of image
	showCTAShadow,
	childrenBelow
}) => {
	const showShadow = showCTAShadow || (user && user.isDj);
	return (
		<Sticky stickyTop={stickyTop} style={style}>
			<CardWrapper>
				<Card>
					{children ? (
						children
					) : (
						<>
							<ProfileImg src={user ? user.picture.path : null} />
							<SidebarContent>
								{loading ? <LoadingPlaceholder2 /> : <Content user={user} />}
							</SidebarContent>
							{user && user.isDj && <BookingButton user={user} />}
						</>
					)}
				</Card>
				<Shadow></Shadow>
				{showShadow ? <CTAShadow /> : null}
			</CardWrapper>
			{enableSharing && (
				<SimpleSharing
					shareUrl={user && `/user/${user.permalink}/overview}]`}
				></SimpleSharing>
			)}
			{childrenBelow}
		</Sticky>
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

const Content = ({ user }) => {
	const { userMetadata, appMetadata, playingLocation } = user || {};
	const {
		experience,
		followers,
		createdAt,
		certified,
		identityVerified
	} = appMetadata;

	const memberSince = moment(createdAt).format("MMMM YYYY");

	return (
		<>
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
		</>
	);
};

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

export const CTAButton = styled.button`
	width: 100%;
	height: 60px;
	background-color: #31daff;
	border: none;
	outline: none;
	font-family: "AvenirNext-Bold";
	font-size: 15px;
	color: #ffffff;
	letter-spacing: 1.2px;
	text-align: left;
	padding-left: 24px;
	display: flex;
	align-items: center;
	transition: all 250ms ease;
	&:hover {
		color: #ffffff;
		background-color: #00d1ff;
	}
`;

export const CTAShadow = styled.div`
	box-shadow: 0px -20px 50px 20px #26deff;
	position: absolute;
	width: 100%;
	height: 0%;
	bottom: 0;
`;

const BookingButton = () => {
	return (
		<NavLink to="booking">
			<CTAButton>
				REQUEST BOOKING{" "}
				<Arrow
					color="#fff"
					style={{ position: "absolute", right: "24px" }}
				></Arrow>
			</CTAButton>
		</NavLink>
	);
};

export default Sidebar;
