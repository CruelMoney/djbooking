import React from "react";
import styled from "styled-components";
import { Title, Citation, Cite } from "../components/Text";
import ReadMoreExpander from "../components/ReadMoreExpander";
import { Col, Row, Avatar, ReadMore, Show } from "../components/Blocks";
import Map from "../../../components/common/Map";
import QuotationMarkIcon from "../../../components/graphics/Quotes";
import { Link } from "react-router-dom";
import { PolicyDisplayer } from "../components/CancelationPolicyPopup";

const ColumnLayout = styled.section`
	width: 100%;
	z-index: 0;
`;

const HalfCol = styled(Col)`
	flex: 1;
	width: 100%;
`;

const HalfColLeft = styled(HalfCol)`
	border-right: 1px solid #e9ecf0;
	@media only screen and (max-width: 990px) {
		border: none;
	}
`;

const HalfColRight = styled(HalfCol)`
	@media only screen and (max-width: 990px) {
		display: none;
	}
`;

const Item = styled.div`
	border-bottom: 1px solid #e9ecf0;
	padding: 42px;
`;

const LeftItem = styled(Item)`
	padding: 42px 42px 42px 0;
`;

const GenresLayout = styled(Item)`
	padding: 0 0px 18px 18px;
	@media only screen and (max-width: 990px) {
		padding: 42px 0px 18px 0px;
	}
`;

const Genre = styled.div`
	background-image: linear-gradient(0deg, #ebebeb 0%, #ebebeb 100%);
	border-radius: 1em;
	height: 8em;
	width: 8em;
	padding: 1em;
	font-family: "AvenirNext-Bold";
	font-size: 13px;
	color: #4d6480;
	text-align: center;
	text-transform: capitalize;
	line-height: 10em;
	display: inline-block;
	margin-left: 24px;
	margin-bottom: 24px;
	@media only screen and (max-width: 990px) {
		margin-left: 0px;
		margin-right: 24px;
	}
`;

const Square = styled.div`
	position: relative;
	width: 100%;
	&:after {
		content: "";
		padding-top: 100%;
		display: block;
	}
	> * {
		position: absolute;
		left: 0;
		top: 0;
		height: 100%;
		width: 100%;
	}
`;

const Bio = ({ bio, firstName }) => {
	return (
		<LeftItem style={{ paddingTop: 0 }}>
			<Title>About {firstName}</Title>
			<ReadMoreExpander content={bio} />
		</LeftItem>
	);
};

const Genres = ({ genres }) => (
	<GenresLayout>
		{genres.map(g => (
			<Genre key={g}>{g}</Genre>
		))}
	</GenresLayout>
);

const Review = ({ reviewsCount }) => (
	<LeftItem>
		<Title>Highlighted Review</Title>

		<Row middle style={{ marginTop: "36px" }}>
			<Col>
				<QuotationMarkIcon style={{ marginBottom: "9px" }}></QuotationMarkIcon>
				<Citation>
					He is a charismatic and soulful person, which sure does transpire in
					his rhythms
				</Citation>
				<Cite>Christopher Dengsø</Cite>
			</Col>
		</Row>
		<Link to={"reviews"}>
			<ReadMore style={{ marginTop: "24px" }}>
				{reviewsCount} REVIEWS MORE
			</ReadMore>
		</Link>
	</LeftItem>
);
const MapArea = ({ playingLocation }) => (
	<Square>
		<Map
			radius={playingLocation.radius}
			name={"playingLocation"}
			value={{
				lat: playingLocation.latitude,
				lng: playingLocation.longitude
			}}
			height={"100%"}
			editable={false}
			color={"#50E3C2"}
			mapOptions={{
				zoomControl: false,
				fullscreenControl: false
			}}
		/>
	</Square>
);

const Overview = ({ user, loading }) => {
	if (loading) {
		return null;
	}
	const { userMetadata, genres, playingLocation, userSettings, reviews } = user;
	const { firstName, bio } = userMetadata;
	const { cancelationPolicy } = userSettings;
	return (
		<ColumnLayout>
			<Row>
				<HalfColLeft>
					<Bio firstName={firstName} bio={bio} />
					<Show maxWidth="990px">
						<Genres genres={genres} />
					</Show>
					<Review reviewsCount={reviews.pageInfo.totalDocs} />
					<Show maxWidth="990px">
						<MapArea playingLocation={playingLocation} />
					</Show>
					<LeftItem>
						<Title>Cancelation Policy</Title>
						<PolicyDisplayer cancelationPolicy={cancelationPolicy} />
					</LeftItem>
				</HalfColLeft>
				<HalfColRight>
					<Genres genres={genres} />

					<MapArea playingLocation={playingLocation} />
				</HalfColRight>
			</Row>
		</ColumnLayout>
	);
};

export default Overview;
