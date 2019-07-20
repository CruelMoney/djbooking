import React from "react";
import styled from "styled-components";
import { Container, Row, Divider, Col } from "./Blocks";
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

const Sticky = styled.div`
	position: sticky;
	top: -80px;
	pointer-events: none;
	margin-bottom: 42px;
	align-self: flex-start;
`;

export const Spacing = styled.div`
	min-width: 300px;
	width: 300px;
	position: relative;
	margin-right: 60px;
`;

const CardWrapper = styled(Spacing)`
	margin-top: -220px;
	margin-bottom: 30px;
`;

const Card = styled.div`
	background-color: #fff;
	width: 100%;
	height: 100%;
	position: relative;
	z-index: 1;
	min-height: 500px;
	pointer-events: all;
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

const SidebarContent = styled.div`
	padding: 24px;
`;

const Sidebar = ({ user, loading }) => {
	return (
		<Sticky>
			<CardWrapper>
				<Card>
					<ProfileImg src={user ? user.picture.path : null} />
					<SidebarContent>
						{loading ? <LoadingPlaceholder2 /> : <Content user={user} />}
					</SidebarContent>
					<CTA>
						<CTAButton>
							BOOK NOW{" "}
							<Arrow
								color="#fff"
								style={{ position: "absolute", right: "24px" }}
							></Arrow>
						</CTAButton>
					</CTA>
				</Card>
				<Shadow></Shadow>
				<CTAShadow />
			</CardWrapper>
			<p>Share on facebook</p>
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
	console.log({ user });
	const { userMetadata, appMetadata, playingLocation, userSettings } =
		user || {};
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

const CTAButton = styled.button`
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

const CTAShadow = styled.div`
	box-shadow: 0px -20px 50px 20px #26deff;
	position: absolute;
	width: 100%;
	height: 0%;
	bottom: 0;
`;

const CTA = styled.div`
	position: relative;
`;

export default Sidebar;
