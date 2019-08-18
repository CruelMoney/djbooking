import React, { useState } from "react";
import SubmitButton from "../../../../components/common/SubmitButton";
import TextBox from "../../../../components/common/TextBox";
import TextWrapper from "../../../../components/common/TextElement";
import Button from "../../../../components/common/Button-v2";
import Rating from "../../../../components/common/Rating";
import Form from "../../../../components/common/Form-v2";
import { requestFeatures } from "../../../../actions/Common";
import { Query, Mutation } from "react-apollo";
import { WRITE_REVIEW, EVENT_REVIEW } from "../../gql";
import { LoadingCard } from "../../../../components/common/LoadingPlaceholder";
import addTranslate from "../../../../components/higher-order/addTranslate";

const Review = ({ theEvent, translate }) => {
	const submitReview = ({ mutate, chosenGig }) => async (form, callback) => {
		try {
			console.log({ form });

			await mutate({
				variables: {
					...form.values,
					gigId: chosenGig.id
				}
			});
			callback();
		} catch (error) {
			callback(error);
		}
	};
	const [formIsValid, setFormIsValid] = useState(false);

	if (!theEvent) {
		return null;
	}
	return (
		<Query
			query={EVENT_REVIEW}
			variables={{
				id: theEvent.id,
				hash: theEvent.hash.toString()
			}}
			onError={console.log}
		>
			{({ data = {}, loading }) => {
				if (loading) {
					return <LoadingCard />;
				}
				const { event = {} } = data;
				const { review } = event;
				const { chosenGig } = event;
				return (
					<Form
						resetStatusOnSucces
						formInvalidCallback={() => setFormIsValid(false)}
						formValidCallback={() => setFormIsValid(true)}
						name="event-review"
					>
						<div className="context-actions-wrapper">
							<div className="context-actions" key="profile_actions">
								<Mutation mutation={WRITE_REVIEW}>
									{mutate => (
										<SubmitButton
											active={formIsValid}
											name="submit_review"
											onClick={submitReview({ mutate, chosenGig })}
										>
											{translate("Submit review")}
										</SubmitButton>
									)}
								</Mutation>

								<Button
									onClick={() => requestFeatures()}
									name="request_features"
								>
									{translate("Request features")}
								</Button>
							</div>
						</div>
						<div className="event-card-wrapper">
							<div className="card profile col-xs-7">
								<TextWrapper
									label={translate("Rating")}
									text={translate("event.review.rating")}
								>
									<div style={{ width: "100%" }}>
										<Rating
											rating={review ? review.rating : 0}
											editable={true}
											name="rating"
											validate={["required"]}
										/>
									</div>
								</TextWrapper>

								<div
									style={{
										width: "100%",
										paddingTop: "0px",
										paddingBottom: "20px"
									}}
								>
									<TextBox
										width="100%"
										height="100px"
										name="content"
										value={review ? review.content : ""}
										placeholder={translate("event.review.description")}
									/>
								</div>
							</div>
						</div>
					</Form>
				);
			}}
		</Query>
	);
};

export default addTranslate(Review);
