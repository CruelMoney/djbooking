import React, { useRef, useEffect, useState } from "react";
import styled from "styled-components";
import { Title, Body, BodySmall } from "../components/Text";
import ReadMoreExpander from "../components/ReadMoreExpander";
import {
	Col,
	Row,
	Avatar,
	ReadMoreText,
	TeritaryButton,
	PrimaryButton,
	RowMobileCol
} from "../components/Blocks";
import QuotationMarkIcon from "../../../components/graphics/Quotes";

import { Query } from "react-apollo";
import {
	REVIEWS,
	WRITE_TESTIMONIAL,
	REMOVE_TESTIMONIAL,
	HIGHLIGHT_REVIEW
} from "../gql";
import { LoadingPlaceholder2 } from "../../../components/common/LoadingPlaceholder";
import Rating from "../../../components/common/Rating";
import moment from "moment";
import EmptyPage from "../../../components/common/EmptyPage";
import { Input } from "../components/FormComponents";
import Popup from "../../../components/common/Popup";
import { useMutation } from "@apollo/react-hooks";

import ReactDOM from "react-dom";
import { Popper } from "react-popper";
import { SavingIndicator } from "..";

const ReviewsCol = styled(Col)`
	flex: 1;
	width: 100%;
	border-right: 1px solid #e9ecf0;
	@media only screen and (max-width: 425px) {
		border-right: none;
	}
`;

const VenuesCol = styled(Col)`
	width: 190px;
	margin-left: 24px;
	@media only screen and (max-width: 425px) {
		width: auto;
		margin-left: 0;
	}
`;

const RemoveButton = styled(TeritaryButton)`
	display: none;
	position: absolute;
	min-width: 0;
	height: 18px;
	top: 4px;
	right: -50px;
`;

const ReviewWrapper = styled.div`
	border-bottom: 1px solid #e9ecf0;
	margin-bottom: 60px;
	padding-bottom: 30px;
	margin-right: 24px;
	position: relative;
	${RemoveButton} {
		right: 0;
	}
	:hover ${RemoveButton} {
		display: block;
	}
`;

const AuthorName = styled.cite`
	font-family: "AvenirNext-DemiBold", Arial, Helvetica, sans-serif;
	font-size: 14px;
	color: #4d6480;
`;
const CreatedAtLabel = styled.p`
	font-family: "AvenirNext-DemiBold", Arial, Helvetica, sans-serif;
	font-size: 14px;
	color: #98a4b3;
`;

const HighlightTooltip = styled.div`
	background: rgba(0, 0, 0, 0.84);
	border-radius: 4px;
`;

const Citation = ({ author, citation, createdAt }) => {
	const name = author ? author.userMetadata.firstName : citation;
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
	id,
	title,
	rating,
	content,
	isTestimonial,
	author,
	citation,
	createdAt,
	removeTestimonial,
	isOwn
}) => {
	const [virtualReferenceElement, setVirtualReferenceElement] = useState(null);
	const [selection, setSelection] = useState(null);

	const [addHighlight, { loading, data: hasAdded }] = useMutation(
		HIGHLIGHT_REVIEW,
		{
			update: () => {
				setTimeout(() => setVirtualReferenceElement(null), 3000);
			},
			variables: {
				id,
				selection
			}
		}
	);

	return (
		<ReviewWrapper>
			<Title>{title}</Title>
			{isOwn && isTestimonial && (
				<RemoveButton onClick={() => removeTestimonial({ variables: { id } })}>
					remove
				</RemoveButton>
			)}
			<Row middle style={{ marginTop: "36px" }}>
				<Col style={{ width: "100%" }}>
					{rating && (
						<Rating rating={rating} color="#50E3C2" emptyColor={"#50E3C299"} />
					)}
					{isTestimonial && (
						<Row middle style={{ marginBottom: "9px", marginTop: "2px" }}>
							<QuotationMarkIcon
								width={32}
								height={24}
								style={{ marginRight: "12px" }}
							></QuotationMarkIcon>
							<ReadMoreText>TESTIMONIAL</ReadMoreText>
						</Row>
					)}
					<ReadMoreExpander
						onTextSelected={
							isOwn
								? (rect, text) => {
										setVirtualReferenceElement(rect);
										setSelection(text);
								  }
								: null
						}
						content={content}
					/>
					<Citation author={author} citation={citation} createdAt={createdAt} />
				</Col>
			</Row>
			{typeof document !== "undefined" && virtualReferenceElement
				? ReactDOM.createPortal(
						<Popper
							referenceElement={virtualReferenceElement}
							eventsEnabled={false}
						>
							{({ ref, style, placement, arrowProps }) => (
								<div ref={ref} style={style} data-placement={placement}>
									<HighlightTooltip>
										<TeritaryButton
											disabled={loading || hasAdded}
											style={{ color: "#fff" }}
											onClick={() => {
												addHighlight();
											}}
										>
											{loading
												? "Adding..."
												: hasAdded
												? "Added"
												: "Highlight on profile"}
										</TeritaryButton>
									</HighlightTooltip>
								</div>
							)}
						</Popper>,
						document.querySelector("#tooltip-portal")
				  )
				: null}
		</ReviewWrapper>
	);
};
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
						reviews={edges}
						isOwn={isOwn}
						updateUser={updateUser}
					/>
				);
			}}
		</Query>
	);
};

const VenueLabel = styled.p`
	font-family: "AvenirNext-DemiBold", Arial, Helvetica, sans-serif;
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

const VenueListItem = styled.li`
	margin-bottom: 15px;
	position: relative;
	:hover ${RemoveButton} {
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

const AutoFocusInput = ({ onSave }) => {
	const input = useRef();

	useEffect(() => {
		input.current.focus();
	}, []);

	return <Input ref={input} type="text" placeholder="venue" onSave={onSave} />;
};

const Content = ({ playedVenues, reviews, isOwn, userId, updateUser }) => {
	const [isAddingVenue, setIsAddingVenue] = useState(false);
	const [isAddingTestimonial, setIsAddingTestimonial] = useState(false);
	const [newTestimonial, setNewTestimonial] = useState({});

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

	const [writeTestimonial, { loading, error }] = useMutation(
		WRITE_TESTIMONIAL,
		{
			variables: newTestimonial,
			refetchQueries: [{ query: REVIEWS, variables: { id: userId } }],
			awaitRefetchQueries: true
		}
	);

	const [removeTestimonial, {loading:loadingRemove}] = useMutation(REMOVE_TESTIMONIAL, {
		refetchQueries: [{ query: REVIEWS, variables: { id: userId } }],
		awaitRefetchQueries: true
	});

	return (
		<>
			<SavingIndicator error={error} loading={loading || loadingRemove} />
			<RowMobileCol>
				<ReviewsCol>
					{reviews.length === 0 ? (
						<EmptyPage
							title="No reviews yet"
							message={
								isOwn ? (
									<CTA onClick={() => setIsAddingTestimonial(true)} />
								) : (
									""
								)
							}
						></EmptyPage>
					) : null}

					{reviews.map(r => (
						<Review
							key={r.id}
							{...r}
							isOwn={isOwn}
							removeTestimonial={removeTestimonial}
						/>
					))}
					{isOwn && reviews.length > 0 && (
						<Row>
							<AddButton onClick={() => setIsAddingTestimonial(true)}>
								+ Add testimonial
							</AddButton>

							<BodySmall style={{ maxWidth: "300px" }}>
								Hightlight a review or testimonial by selecting the text with
								the mouse.
							</BodySmall>
						</Row>
					)}
				</ReviewsCol>
				{(playedVenues.length > 0 || isOwn) && (
					<VenuesCol>
						<Title style={{ marginBottom: "36px" }}>Past venues</Title>
						<ul>
							{playedVenues.map((v, idx) => (
								<VenueListItem key={idx}>
									<VenueLabel>{v}</VenueLabel>
									{isOwn && (
										<RemoveButton onClick={() => deleteVenue(v)}>
											remove
										</RemoveButton>
									)}
								</VenueListItem>
							))}
						</ul>
						{isAddingVenue && <AutoFocusInput onSave={saveVenue} />}

						{isOwn && (
							<AddButton onClick={() => setIsAddingVenue(true)}>
								+ Add venue
							</AddButton>
						)}
					</VenuesCol>
				)}
			</RowMobileCol>
			<Popup
				lazy={false}
				width={450}
				showing={isAddingTestimonial}
				onClickOutside={() => setIsAddingTestimonial(false)}
			>
				<Input
					type="text"
					placeholder="Wedding"
					label="Title"
					onChange={title => setNewTestimonial(t => ({ ...t, title }))}
				/>
				<Input
					type="text"
					placeholder="Barack Obama"
					label="Testifier"
					onChange={testifier => setNewTestimonial(t => ({ ...t, testifier }))}
				/>
				<Input
					style={{
						height: "250px"
					}}
					type="text-area"
					placeholder="Testimonial"
					onChange={content => setNewTestimonial(t => ({ ...t, content }))}
				/>
				<Row style={{ marginTop: "15px" }} right>
					<TeritaryButton
						type="button"
						onClick={_ => setIsAddingTestimonial(false)}
					>
						Cancel
					</TeritaryButton>
					<PrimaryButton
						type="button"
						loading={loading}
						onClick={() => {
							writeTestimonial();
							setIsAddingTestimonial(false);
						}}
					>
						Save
					</PrimaryButton>
				</Row>
			</Popup>
		</>
	);
};

export default Reviews;
