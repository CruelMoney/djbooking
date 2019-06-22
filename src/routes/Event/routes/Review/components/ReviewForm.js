import React, { Component } from "react";
import SubmitButton from "../../../../../components/common/SubmitButton";
import TextBox from "../../../../../components/common/TextBox";
import TextWrapper from "../../../../../components/common/TextElement";
import Button from "../../../../../components/common/Button-v2";
import Rating from "../../../../../components/common/Rating";
import Form from "../../../../../components/common/Form-v2";
import { requestFeatures } from "../../../../../actions/Common";

import { Helmet } from "react-helmet-async";

import { Query, Mutation } from "react-apollo";
import { EVENT_GIGS, WRITE_REVIEW } from "../../../gql";
import { LoadingCard } from "../../../../../components/common/LoadingPlaceholder";
import addTranslate from "../../../../../components/higher-order/addTranslate";

class Review extends Component {
	componentWillMount() {
		const { theEvent } = this.props;

		this.setState({
			editable: theEvent.review ? false : true
		});
	}

	state = {
		formValid: true
	};

	submitReview = mutate => async (form, callback) => {
		const { theEvent, hashKey, submitReview } = this.props;

		submitReview(theEvent.id, hashKey, form.values, callback);
	};

	render() {
		const { translate, theEvent, hashKey } = this.props;
		const title = theEvent.name + " | " + translate("Review");

		return (
			<div className="row event-information">
				<Helmet>
					<title>{title}</title>
					<meta property="og:title" content={title} />
					<meta name="twitter:title" content={title} />
				</Helmet>
				<Query
					query={EVENT_GIGS}
					variables={{
						id: theEvent.id,
						hash: hashKey.toString()
					}}
					onError={console.log}
				>
					{({ data = {}, loading }) => {
						if (loading) {
							return <LoadingCard />;
						}
						const { event = {} } = data;
						const { review = {} } = event;
						return (
							<Form
								resetStatusOnSucces
								formInvalidCallback={() => this.setState({ formValid: false })}
								formValidCallback={() => this.setState({ formValid: true })}
								name="event-review"
							>
								<div className="context-actions-wrapper">
									<div className="context-actions" key="profile_actions">
										<Mutation mutation={WRITE_REVIEW}>
											{mutate => (
												<SubmitButton
													active={this.state.formValid}
													name="submit_review"
													onClick={this.submitReview(mutate)}
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
									<div className="card profile col-md-7">
										<TextWrapper
											label={translate("Rating")}
											text={translate("event.review.rating")}
										>
											<div style={{ width: "100%" }}>
												<Rating
													rating={review.rating ? review.rating : 0}
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
												name="description"
												value={review.description ? review.description : ""}
												placeholder={translate("event.review.description")}
											/>
										</div>
									</div>
								</div>
							</Form>
						);
					}}
				</Query>
			</div>
		);
	}
}

export default addTranslate(Review);
