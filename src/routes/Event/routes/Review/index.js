import React, { useState, useEffect } from "react";
import { useQuery, useMutation } from "react-apollo";
import { EVENT_REVIEW, WRITE_REVIEW } from "../../gql";
import { LoadingPlaceholder2 } from "../../../../components/common/LoadingPlaceholder";
import { Col, Row, SmartButton } from "../../../../components/Blocks";
import { Title, Body } from "../../../../components/Text";
import { TextArea } from "../../../../components/FormComponents";
import Rating from "../../../../components/common/RatingNew";
import styled from "styled-components";
import ErrorMessageApollo from "../../../../components/common/ErrorMessageApollo";

const Content = ({ theEvent, loading }) => {
	const { id, hash } = theEvent || {};

	const { data, loading: loadingReview } = useQuery(EVENT_REVIEW, {
		skip: !id || !hash,
		variables: { id, hash }
	});

	const [save, { loading: saving, error }] = useMutation(WRITE_REVIEW);
	const [state, setState] = useState({});

	const { event } = data || {};
	const { review, chosenGig } = event || {};
	const { dj } = chosenGig || {};
	const djName = dj ? dj.artistName || dj.userMetadata.firstName : "the dj";

	useEffect(() => {
		setState(review || {});
	}, [review]);

	if (loading || loadingReview) {
		return <LoadingPlaceholder2 style={{ marginTop: "30px" }} />;
	}

	if (theEvent.status !== "FINISHED") {
		return (
			<Body>Come back and leave a review when the event is finished.</Body>
		);
	}

	const saveReview = async () => {
		debugger;
		if (!state.rating) {
			window.alert("Please enter rating");
			return;
		}

		await save({
			variables: {
				...state,
				gigId: chosenGig ? chosenGig.id : null
			}
		});
	};

	return (
		<ReviewCol key={review ? review.id : "review"}>
			<Body>Write a review of {djName}.</Body>
			<Rating
				style={{ marginTop: "30px", marginBottom: "15px" }}
				size="large"
				rating={review ? review.rating : 0}
				onChange={rating => setState(s => ({ ...s, rating }))}
			/>
			<TextArea
				style={{ marginBottom: "30px", height: "200px" }}
				defaultValue={review ? review.content : null}
				onChange={({ target: { value: content } }) =>
					setState(s => ({ ...s, content }))
				}
			/>
			<SmartButton
				level="primary"
				loading={saving}
				onClick={() => saveReview()}
			>
				{review && review.id ? "Update" : "Save"}
			</SmartButton>
			<ErrorMessageApollo error={error} />
		</ReviewCol>
	);
};

const ReviewCol = styled(Col)`
	max-width: 500px;
	align-items: flex-start;
`;

const Review = props => (
	<Col>
		<Title>Review</Title>
		<Content {...props} />
	</Col>
);

export default Review;
