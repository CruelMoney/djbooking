import React from "react";
import styled from "styled-components";
import { Container, Row, Divider } from "./Blocks";
import { Stat, SmallHeader } from "./Text";
import GracefullImage from "./GracefullImage";
import { LoadingPlaceholder2 } from "../../../components/common/LoadingPlaceholder";
import Arrow from "react-ionicons/lib/MdArrowRoundForward";
import AddCircle from "react-ionicons/lib/MdAddCircle";
import Pin from "react-ionicons/lib/MdPin";
import Medal from "react-ionicons/lib/MdMedal";
import Star from "react-ionicons/lib/MdStar";
import Tooltip from "./Tooltip";

const Sticky = styled.div`
	width: 100%;
	position: sticky;
	top: -300px;
	pointer-events: none;
`;

export const Spacing = styled.div`
	min-width: 300px;
	width: 300px;
	position: relative;
	margin-right: 60px;
`;

const CardWrapper = styled(Spacing)`
	margin-top: -220px;
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
			<Container>
				<CardWrapper>
					<Card>
						<ProfileImg src={user ? user.picture.path : null} />
						<SidebarContent>
							{loading ? <LoadingPlaceholder2 /> : <Content user={user} />}
						</SidebarContent>
						<CTA>
							<CTAButton>
								BOOK FROM 4.000 DKK{" "}
								<Arrow color="#fff" style={{ marginLeft: "15px" }}></Arrow>
							</CTAButton>
						</CTA>
					</Card>
					<Shadow></Shadow>
					<CTAShadow />
				</CardWrapper>
			</Container>
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
	const { userMetadata = {} } = user || {};

	return (
		<>
			<Row>
				<Stat
					label={"followers"}
					value={"14k"}
					style={{ marginRight: "24px" }}
				></Stat>
				<Stat label={"played gigs"} value={"3"}></Stat>
			</Row>
			<Divider></Divider>
			<SmallHeader
				style={{ marginBottom: "15px" }}
			>{`Hi I'm ${userMetadata.firstName}`}</SmallHeader>

			<IconRow>
				<AddCircle color={"#98a4b3"} style={{ marginRight: "15px" }} />
				Member since july 2018
			</IconRow>
			<IconRow>
				<Pin color={"#98a4b3"} style={{ marginRight: "15px" }} />
				Canggu, Bali
			</IconRow>
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
			<IconRow>
				<Star color={"#50E3C2"} style={{ marginRight: "15px" }} />
				Identity verified
			</IconRow>
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
