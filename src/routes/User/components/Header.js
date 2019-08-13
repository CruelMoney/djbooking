import React from "react";
import styled from "styled-components";
import Navigation from "./Navigation";
import Rating from "../../../components/common/Rating";
import VerifiedBadge from "../../../components/graphics/VerifiedBadge";
import Tooltip from "./Tooltip";
import { Container, FullWidthCol, Row, ShowBelow, Col, Avatar } from "./Blocks";
import { Spacing } from "./Sidebar";
import { Stats, CertifiedVerified } from "..";
import { Link } from "react-router-dom";

export const GradientBg = styled.section`
	height: 318px;
	background: linear-gradient(
			-180deg,
			rgba(0, 0, 0, 0) 0%,
			rgba(0, 0, 0, 0.5) 100%
		),
		${({ coverPhoto }) =>
				coverPhoto
					? `url(${coverPhoto.path})`
					: "linear-gradient(-56deg, #31fff5 0%, #31ffc5 11%, #00d1ff 80%, #32daff 87%)"}
			no-repeat center center;
	-webkit-background-size: cover;
	-moz-background-size: cover;
	-o-background-size: cover;
	background-size: cover;
	flex: 1;
	display: flex;
	align-items: flex-end;
	position: sticky;
	top: -270px;
	z-index: 1;

	@media only screen and (max-width: 425px) {
		min-height: 290px;
		height: auto;
		position: relative;
		top: 0;
		padding-top: 100px;
	}
	.iconRow {
		color: #fff;
		margin-bottom: 0;
		&:first-child {
			margin-right: 30px;
		}
		svg {
			margin-right: 6px;
		}
	}
`;

const getRoutesFromUser = user => {
	const routes = [{ route: "overview", label: "overview", active: true }];

	if (user) {
		const roles = user.appMetadata.roles;

		if (roles.includes("ORGANIZER")) {
			if (user.isOwn) {
				routes.push({ route: "events", label: "events" });
			}
		}
		if (roles.includes("DJ")) {
			if (user.isOwn) {
				routes.push({ route: "gigs", label: "gigs" });
			}
			// routes.push({ route: "sounds", label: "sounds" });
			routes.push({ route: "photos", label: "photos" });
			routes.push({ route: "reviews", label: "reviews" });
		}

		if (user.isOwn) {
			routes.push({ route: "settings", label: "settings" });
		}
	}

	return routes;
};

const Title = styled.h1`
	font-family: "AvenirNext-Bold", Arial, Helvetica, sans-serif;
	font-size: 36px;
	color: #fff;
	margin-bottom: 0.3em;
	line-height: 1.2em;
	display: inline-block;
	position: relative;
	@media only screen and (max-width: 425px) {
		font-size: 30px;
		text-align: left;
		margin-bottom: 0;
		> * {
			display: none;
		}
	}
`;

const ReviewsCount = styled.p`
	opacity: 0.6;
	font-family: "AvenirNext-DemiBold", Arial, Helvetica, sans-serif;
	font-size: 15px;
	color: #ffffff;
	display: inline-block;
	margin-left: 9px;
	margin-bottom: 0;
	@media only screen and (max-width: 425px) {
		font-size: 12px;
		margin-left: 3px;
	}
`;

const RatingWrapper = styled.div`
	display: inline-block;

	@media only screen and (max-width: 425px) {
		.ratingStar {
			padding-left: 2px;
			padding-right: 2px;
			svg {
				width: 13px;
				height: 13px;
			}
		}
	}
`;

const HeaderSpacing = styled(Spacing)`
	margin-right: 60px;
	@media only screen and (max-width: 768px) {
		margin-right: 30px;
	}
`;

const Header = ({ user, loading }) => {
	return (
		<GradientBg coverPhoto={user && user.coverPhoto}>
			<Container>
				<Row className="wrapper">
					<HeaderSpacing />
					<FullWidthCol>
						{loading ? null : <UserContent user={user} />}
						{typeof document !== "undefined" && (
							<Navigation routes={getRoutesFromUser(user)}></Navigation>
						)}
					</FullWidthCol>
				</Row>
			</Container>
		</GradientBg>
	);
};

const StatsWrapper = styled.div`
	margin-top: 48px;

	@media only screen and (max-width: 425px) {
		margin-top: 24px;
	}
`;

const HeaderWrapper = styled.div`
	padding-bottom: 48px;

	@media only screen and (max-width: 425px) {
		padding-bottom: 24px;
	}
`;

const UserContent = ({ user }) => {
	const { artistName, userMetadata, appMetadata, reviews } = user;
	const { firstName } = userMetadata;
	const {
		certified,
		rating,
		identityVerified,
		experience,
		followers
	} = appMetadata;

	return (
		<HeaderWrapper>
			<Row middle>
				<Col style={{ flex: 1, alignItems: "flex-start" }}>
					<Title>
						{artistName || firstName}
						{certified && (
							<Tooltip
								text={
									"This dj has been certified by Cueup. The Cueup team has personally met and seen this dj play."
								}
							>
								{({ ref, close, open }) => (
									<VerifiedBadge
										ref={ref}
										style={{ marginLeft: "15px" }}
										onMouseEnter={open}
										onMouseLeave={close}
									/>
								)}
							</Tooltip>
						)}
					</Title>
					{rating && (
						<div>
							<RatingWrapper>
								<Rating
									color={"#fff"}
									emptyColor={"#ffffff99"}
									rating={rating}
								></Rating>
							</RatingWrapper>
							<ReviewsCount>{reviews.pageInfo.totalDocs} reviews</ReviewsCount>
						</div>
					)}

					{(experience || followers) && (
						<ShowBelow width={425}>
							<StatsWrapper>
								<Stats
									white
									experience={experience}
									followers={followers}
									marginRight={"15px"}
								/>
							</StatsWrapper>
						</ShowBelow>
					)}
				</Col>
				<ShowBelow width={425}>
					<Col>
						<Avatar size="extraLarge" src={user.picture.path} />
					</Col>
				</ShowBelow>
			</Row>
			<ShowBelow width={425} style={{ marginTop: "24px" }}>
				<Row>
					<CertifiedVerified
						certified={certified}
						identityVerified={identityVerified}
					></CertifiedVerified>
				</Row>
			</ShowBelow>
		</HeaderWrapper>
	);
};

export default Header;
