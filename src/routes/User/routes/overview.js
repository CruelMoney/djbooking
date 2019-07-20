import React from "react";
import styled from "styled-components";
import { Title } from "../components/Text";
import ReadMoreExpander from "../components/ReadMoreExpander";
import { Col, Row } from "../components/Blocks";
import Map from "../../../components/common/Map";

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
const Review = ({ bio }) => (
	<LeftItem>
		<Title>Highlighted Review</Title>
	</LeftItem>
);
const MapArea = ({ playingLocation }) => (
	<Map
		height={420}
		radius={playingLocation.radius}
		name={"playingLocation"}
		value={{
			lat: playingLocation.latitude,
			lng: playingLocation.longitude
		}}
		editable={false}
		color={"#50E3C2"}
		mapOptions={{
			zoomControl: false,
			fullscreenControl: false
		}}
	>
		Map
	</Map>
);
const Policy = ({ bio }) => (
	<LeftItem>
		<Title>Cancelation Policy</Title>
	</LeftItem>
);

const Overview = ({ user, loading }) => {
	if (loading) {
		return null;
	}
	const { userMetadata, genres, playingLocation } = user;
	const { firstName, bio } = userMetadata;
	return (
		<ColumnLayout>
			<Row>
				<HalfCol
					style={{
						borderRight: "1px solid #e9ecf0"
					}}
				>
					<Bio firstName={firstName} bio={bio} />

					<Review />

					<Policy />
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
