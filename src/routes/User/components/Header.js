import React from "react";
import styled from "styled-components";
import Navigation from "./Navigation";
import Rating from "../../../components/common/Rating";
import VerifiedBadge from "../../../components/graphics/VerifiedBadge";
import Tooltip from "./Tooltip";
import { LoadingIndicator } from "../../../components/common/LoadingPlaceholder";
import { Col, Container, FullWidthCol, Row, MarginBottom } from "./Blocks";
import { Spacing } from "./Sidebar";

const GradientBg = styled.section`
	height: 318px;
	background-image: linear-gradient(
			-180deg,
			rgba(0, 0, 0, 0) 0%,
			rgba(0, 0, 0, 0.5) 100%
		),
		linear-gradient(-56deg, #31fff5 0%, #31ffc5 11%, #00d1ff 80%, #32daff 87%);

	flex: 1;
	display: flex;
	align-items: flex-end;
	position: sticky;
	top: -269px;
`;

const routes = [
	{ route: "lolbox1", label: "overview", active: true },
	{ route: "lolbox2", label: "reviews" },
	{ route: "lolbox3", label: "settings" }
];

const Title = styled.h1`
	font-family: "AvenirNext-Bold";
	font-size: 36px;
	color: #fff;
	display: flex;
	align-items: center;
	margin-bottom: 0.3em;
`;

const ReviewsCount = styled.p`
	opacity: 0.6;
	font-family: "AvenirNext-DemiBold";
	font-size: 15px;
	color: #ffffff;
	display: inline-block;
	margin-left: 9px;
	margin-bottom: 0;
`;

const Header = ({ user, loading }) => {
	return (
		<GradientBg>
			<Container>
				<Row className="wrapper">
					<Spacing />
					<FullWidthCol>
						{loading ? (
							<LoadingIndicator></LoadingIndicator>
						) : (
							<UserContent user={user} />
						)}
						<Navigation routes={routes}></Navigation>
					</FullWidthCol>
				</Row>
			</Container>
		</GradientBg>
	);
};

const UserContent = ({ user }) => {
	const { artistName, userMetadata, appMetadata, reviews } = user;
	const { firstName } = userMetadata;
	const { certified, rating } = appMetadata;
	return (
		<MarginBottom>
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
					<div style={{ display: "inline-block" }}>
						<Rating
							color={"#fff"}
							emptyColor={"#ffffff99"}
							rating={rating}
						></Rating>
					</div>
					<ReviewsCount>{reviews.pageInfo.totalDocs} reviews</ReviewsCount>
				</div>
			)}
		</MarginBottom>
	);
};

export default Header;
