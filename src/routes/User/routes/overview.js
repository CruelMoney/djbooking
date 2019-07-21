import React from "react";
import styled from "styled-components";
import {
	Title,
	Stat,
	StatUnit,
	BodySmall,
	Citation,
	Cite
} from "../components/Text";
import ReadMoreExpander from "../components/ReadMoreExpander";
import { Col, Row, Avatar, ReadMoreButton } from "../components/Blocks";
import Map from "../../../components/common/Map";
import ArrowIcon from "react-ionicons/lib/MdArrowRoundForward";
import QuotationMarkIcon from "../../../components/graphics/Quotes";

const ColumnLayout = styled.section`
	width: 100%;
	z-index: 0;
`;

const HalfCol = styled(Col)`
	width: 50%;
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
	break-inside: avoid-column;
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

const Sound = ({ bio }) => <Item>Sound</Item>;
const Images = ({ bio }) => <Item>Images</Item>;

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
			<Avatar
				size="large"
				src={"https://source.unsplash.com/random/120x120 /"}
				style={{
					marginRight: "24px"
				}}
			/>
			<Col>
				<QuotationMarkIcon style={{ marginBottom: "9px" }}></QuotationMarkIcon>
				<Citation>
					He is a charismatic and soulful person, which sure does transpire in
					his rhythms
				</Citation>
				<Cite>Christopher Dengsø</Cite>
			</Col>
		</Row>
		<ReadMoreButton style={{ marginTop: "24px" }}>
			{reviewsCount} REVIEWS MORE
		</ReadMoreButton>
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
const Policy = ({ cancelationPolicy }) => (
	<LeftItem>
		<Title>Cancelation Policy</Title>
		<Row
			style={{
				width: "100%",
				justifyContent: "space-between",
				alignItems: "flex-end",
				marginTop: "42px",
				marginBottom: "30px"
			}}
		>
			<Stat label={"MIN. NOTICE"} value={cancelationPolicy.days + " days"} />
			<ArrowIcon color={"#98a4b3"} fontSize={18} />
			<StatUnit>OR ELSE</StatUnit>
			<ArrowIcon color={"#98a4b3"} fontSize={18} />

			<Stat label={"REFUNDED"} value={cancelationPolicy.percentage + "%"} />
		</Row>
		<BodySmall style={{ marginBottom: 0 }}>
			Cancel any time before {cancelationPolicy.days} days, and get a 100%
			refund, minus the service fee.
		</BodySmall>
	</LeftItem>
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
				<HalfCol
					style={{
						borderRight: "1px solid #e9ecf0"
					}}
				>
					<Bio firstName={firstName} bio={bio} />

					<Review reviewsCount={reviews.pageInfo.totalDocs} />

					<Policy cancelationPolicy={cancelationPolicy} />
				</HalfCol>
				<HalfCol>
					<Genres genres={genres} />

					<MapArea playingLocation={playingLocation} />
				</HalfCol>
			</Row>
		</ColumnLayout>
	);
};

export default Overview;
