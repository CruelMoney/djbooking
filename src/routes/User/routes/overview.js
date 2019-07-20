import React from "react";
import styled from "styled-components";
import { Col, ReadMore } from "../components/Blocks";
import { Title, Body } from "../components/Text";

const ColumnLayout = styled.section`
	columns: 2;
	width: 100%;
	column-gap: 0;
	column-rule: 1px solid #e9ecf0;
	z-index: -1;
`;

const Item = styled.div`
	break-inside: avoid-column;
	border-bottom: 1px solid #e9ecf0;
`;

const LeftItem = styled(Item)`
	break-inside: avoid-column;
	border-bottom: 1px solid #e9ecf0;
	padding: 42px 42px 42px 0;
`;

const Bio = ({ bio, firstName }) => {
	const shouldTruncate = bio.length > 350;
	const truncatedBio = shouldTruncate ? bio.substring(0, 350) + "..." : bio;

	return (
		<LeftItem style={{ paddingTop: 0 }}>
			<Title>About {firstName}</Title>
			<Body>{truncatedBio}</Body>
			{shouldTruncate ? <ReadMore>Read more</ReadMore> : null}
		</LeftItem>
	);
};
const Sound = ({ bio }) => <Item>Sound</Item>;
const Images = ({ bio }) => <Item>Images</Item>;
const Genres = ({ bio }) => <Item>Genres</Item>;
const Review = ({ bio }) => <Item>Rewview</Item>;
const Map = ({ bio }) => <Item>Map</Item>;
const Policy = ({ bio }) => <Item>Policy</Item>;

const Overview = ({ user, loading }) => {
	if (loading) {
		return null;
	}
	const { userMetadata } = user;
	const { firstName, bio } = userMetadata;
	return (
		<ColumnLayout>
			<Bio firstName={firstName} bio={bio} />
			<Sound />
			<Images />
			<Genres />
			<Review />
			<Map />
			<Policy />
		</ColumnLayout>
	);
};

export default Overview;
