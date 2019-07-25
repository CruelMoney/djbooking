import React, { useRef, useEffect, useState } from "react";
import styled from "styled-components";
import { Title, Body } from "../components/Text";
import ReadMoreExpander from "../components/ReadMoreExpander";
import {
	Col,
	Row,
	Avatar,
	ReadMore,
	Show,
	TeritaryButton,
	PrimaryButton
} from "../components/Blocks";
import Map from "../../../components/common/Map";
import QuotationMarkIcon from "../../../components/graphics/Quotes";
import { Link } from "react-router-dom";
import { PolicyDisplayer } from "../components/CancelationPolicyPopup";
import { Query } from "react-apollo";
import { REVIEWS } from "../gql";
import { LoadingPlaceholder2 } from "../../../components/common/LoadingPlaceholder";
import Rating from "../../../components/common/Rating";
import moment from "moment";
import EmptyPage from "../../../components/common/EmptyPage";
import { Input } from "../components/FormComponents";

const ReviewsCol = styled(Col)`
	flex: 1;
	width: 100%;
	border-right: 1px solid #e9ecf0;
`;

const VenuesCol = styled(Col)`
	width: 190px;
	margin-left: 24px;
`;

const ReviewWrapper = styled.div`
	border-bottom: 1px solid #e9ecf0;
	margin-bottom: 60px;
	padding-bottom: 30px;
	margin-right: 24px;
`;

const AuthorName = styled.cite`
	font-family: "AvenirNext-DemiBold";
	font-size: 14px;
	color: #4d6480;
`;
const CreatedAtLabel = styled.p`
	font-family: "AvenirNext-DemiBold";
	font-size: 14px;
	color: #98a4b3;
`;

const Citation = ({ author, citation, createdAt }) => {
	const name = author ? author.userMetadata.firstName : citation;
	debugger;
	return (
		<Row right>
			{author && author.picure ? (
				<Avatar size="small" src={author.picture.path}></Avatar>
			) : null}
			<Col>
				<AuthorName>{name}</AuthorName>
				<CreatedAtLabel>
					{moment(createdAt).format("MMMM, YYYY")}
				</CreatedAtLabel>
			</Col>
		</Row>
	);
};

const Review = ({
	title,
	rating,
	content,
	isTestimonial,
	author,
	citation,
	createdAt
}) => (
	<ReviewWrapper>
		<Title>{title}</Title>

		<Row middle style={{ marginTop: "36px" }}>
			<Col>
				{rating && (
					<Rating rating={rating} color="#50E3C2" emptyColor={"#50E3C299"} />
				)}
				{isTestimonial && (
					<QuotationMarkIcon
						style={{ marginBottom: "9px" }}
					></QuotationMarkIcon>
				)}
				<ReadMoreExpander content={content} />
				<Citation author={author} citation={citation} createdAt={createdAt} />
			</Col>
		</Row>
	</ReviewWrapper>
);
const Reviews = ({ user, loading: loadingUser, updateUser }) => {
	if (loadingUser) {
		return <LoadingPlaceholder2 />;
	}

	return (
		<Query query={REVIEWS} variables={{ id: user.id }}>
			{({ loading, data }) => {
				if (loading) {
					return <LoadingPlaceholder2 />;
				}

				const {
					user: {
						isOwn,
						playedVenues,
						reviews: { edges }
					}
				} = data;
				return (
					<Content
						userId={user.id}
						playedVenues={playedVenues}
						reviews={[]}
						isOwn={isOwn}
						updateUser={updateUser}
					/>
				);
			}}
		</Query>
	);
};

const VenueLabel = styled.p`
	font-family: "AvenirNext-DemiBold";
	font-size: 18px;
	color: #4d6480;
	text-align: left;
	text-transform: capitalize;
	margin-bottom: 0;
`;

const AddButton = styled(TeritaryButton)`
	padding: 0;
	min-width: 0;
	/* width: auto; */
	text-align: left;
	display: inline-block;
	margin-right: auto;
	height: 18px;
`;

const RemoveVenueButton = styled(TeritaryButton)`
	display: none;
	position: absolute;
	min-width: 0;
	height: 18px;
	top: 4px;
	right: -50px;
`;

const VenueListItem = styled.li`
	margin-bottom: 15px;
	position: relative;
	:hover ${RemoveVenueButton} {
		display: inline-block;
	}
`;

const CTA = ({ onClick }) => (
	<>
		<Body style={{ maxWidth: 300 }}>
			Add a testimonial to display something for the organizers
		</Body>
		<PrimaryButton onClick={onClick}>Add testimonial</PrimaryButton>
	</>
);

const InlineInput = ({ onSave }) => {
	const input = useRef();

	useEffect(() => {
		input.current.focus();
	}, []);

	return <Input ref={input} type="text" placeholder="venue" onSave={onSave} />;
};

const Content = ({ playedVenues, reviews, isOwn, userId, updateUser }) => {
	const [isAddingVenue, setIsAddingVenue] = useState(false);

	const saveVenue = venue => {
		venue = venue.trim();
		if (venue) {
			updateUser({
				variables: {
					id: userId,
					playedVenues: [...playedVenues, venue]
				}
			});
		}
		setIsAddingVenue(false);
	};

	const deleteVenue = venue => {
		updateUser({
			variables: {
				id: userId,
				playedVenues: playedVenues.filter(v => v !== venue)
			}
		});
	};

	return (
		<Row>
			<ReviewsCol>
				{reviews.length === 0 ? (
					<EmptyPage
						title="No reviews yet"
						message={isOwn ? <CTA /> : ""}
					></EmptyPage>
				) : null}

				{reviews.map(r => (
					<Review key={r.id} {...r} />
				))}
				{isOwn && reviews.length > 0 && (
					<AddButton>+ Add testimonial</AddButton>
				)}
			</ReviewsCol>
			<VenuesCol>
				<Title style={{ marginBottom: "36px" }}>Past venues</Title>
				<ul>
					{playedVenues.map((v, idx) => (
						<VenueListItem key={idx}>
							<VenueLabel>{v}</VenueLabel>
							<RemoveVenueButton onClick={() => deleteVenue(v)}>
								remove
							</RemoveVenueButton>
						</VenueListItem>
					))}
				</ul>
				{isAddingVenue && <InlineInput onSave={saveVenue} />}
				{isOwn && (
					<AddButton onClick={() => setIsAddingVenue(true)}>
						+ Add venue
					</AddButton>
				)}
			</VenuesCol>
		</Row>
	);
};

export default Reviews;
