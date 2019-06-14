import React, { Component } from "react";
import Button from "../../../../../components/common/Button-v2";
import TextField from "../../../../../components/common/Textfield";
import TimeSlider from "../../../../../components/common/TimeSlider";
import TextBox from "../../../../../components/common/TextBox";
import wNumb from "wnumb";
import Slider from "../../../../../components/common/Slider";
import Form from "../../../../../components/common/Form-v2";
import TextWrapper from "../../../../../components/common/TextElement";
import SubmitButton from "../../../../../components/common/SubmitButton";
import assign from "lodash.assign";
import { Helmet } from "react-helmet-async";

import Map from "../../../../../components/common/Map";
import ToggleButtonHandler from "../../../../../components/common/ToggleButtonHandler";
import c from "../../../../../constants/constants";
import moment from "moment";
import LocationSelector from "../../../../../components/common/LocationSelectorSimple";
import { connect } from "react-redux";
import ErrorMessage from "../../../../../components/common/ErrorMessage";
import { requestFeatures } from "../../../../../actions/Common";
import RiderOptions, {
	optionsToEnum as getRiderEnum
} from "../../../../../components/common/RiderOptions";
import * as actions from "../../../../../actions/EventActions";
import { getTranslate } from "react-localize-redux";

class Event extends Component {
	state = { startTime: 0, endTime: 0, editMode: false, formValid: false };

	componentWillMount() {
		this.setState({ guests: this.props.theEvent.guestsCount });
	}

	mergeEventForm = (form, event) => {
		const updatedEvent = assign(event, form.values, {
			guestsCount: form.values.guests
				? form.values.guests[0]
				: event.guestsCount
		});
		return updatedEvent;
	};

	updateEvent = (form, callback) => {
		this.props.updateEvent(
			this.mergeEventForm(form, this.props.theEvent),
			callback
		);
	};

	submitReview = (form, callback) => {
		const review = assign(form.values, { eventId: this.props.theEvent.id });
		this.props.reviewEvent(review, callback);
	};

	cancelEvent = (id, callback) => {
		this.props.cancelEvent(id, this.props.hashKey, callback);
	};

	render() {
		const { translate, theEvent } = this.props;
		console.log({ theEvent });
		const title = theEvent.name + " | Cueup";
		return (
			<div className="row event-information">
				<Helmet>
					<title>{title}</title>
					<meta property="og:title" content={title} />
					<meta name="twitter:title" content={title} />
				</Helmet>
				<Form
					resetStatusOnSucces
					noError
					formInvalidCallback={() => this.setState({ formValid: false })}
					formValidCallback={() => this.setState({ formValid: true })}
					name="event-information-form"
				>
					<div className="context-actions-wrapper">
						<div className="context-actions">
							<SubmitButton
								active={this.state.formValid}
								onClick={this.updateEvent}
								name="update_event"
							>
								{translate("Save changes")}
							</SubmitButton>
							<SubmitButton
								dangerous={true}
								warning={translate("cancel-event-warning")}
								onClick={(form, callback) =>
									this.cancelEvent(theEvent.id, callback)
								}
								name="cancel_event"
							>
								{translate("Cancel event")}
							</SubmitButton>
							<Button onClick={() => requestFeatures()} name="request_features">
								{translate("Request features")}
							</Button>
							<ErrorMessage />
						</div>
					</div>
					<div className="event-card-wrapper">
						<div className="card col-md-7">
							<TextWrapper
								label={translate("request-form.step-2.event-name")}
								text={translate("request-form.step-2.event-name-description")}
							>
								<TextField
									name="name"
									value={theEvent.name}
									validate={["required"]}
								/>
							</TextWrapper>
							<TextWrapper
								label={translate("request-form.step-1.event-date")}
								text={translate("event.event-date-description")}
							>
								<TextField
									name="date"
									disabled
									value={theEvent.start.formattedDate}
								/>
							</TextWrapper>

							<TextWrapper
								label={translate("request-form.step-1.event-location")}
								text={translate(
									"request-form.step-1.event-location-description"
								)}
							>
								<LocationSelector
									name="location"
									disabled
									value={theEvent.location.name}
									validate={["required"]}
								/>
								<Map
									height="315px"
									name="location"
									value={theEvent.location}
									radius={0}
									disabled
									zoom={11}
								/>
							</TextWrapper>

							<TextWrapper
								label={translate("request-form.step-2.event-genres")}
								text={translate("request-form.step-2.event-genres-description")}
							>
								<ToggleButtonHandler
									validate={["required"]}
									name="genres"
									disabled
									value={theEvent.genres.map(s => s.toUpperCase())}
									potentialValues={c.GENRES.map(s => s.toUpperCase())}
									columns={3}
								/>
							</TextWrapper>
							<TextWrapper
								label={translate("request-form.step-2.event-rider")}
								text={translate("request-form.step-2.event-rider-description")}
							>
								<RiderOptions
									speakersLabel={translate("speakers")}
									lightsLabel={translate("lights")}
									value={getRiderEnum(theEvent.rider)}
									name="rider"
								/>
							</TextWrapper>
							<TextWrapper
								label={translate("request-form.step-3.music-duration")}
							>
								<TimeSlider
									disabled
									hoursLabel={translate("hours")}
									startLabel={translate("start")}
									timeZone={theEvent.timeZone}
									endLabel={translate("end")}
									date={moment(theEvent.start.localDate)}
									startTime={theEvent.start.localDate}
									endTime={theEvent.end.localDate}
								/>
							</TextWrapper>

							<TextWrapper label={translate("request-form.step-3.guests")}>
								<Slider
									name="guests"
									range={{
										min: 1,
										"50%": 100,
										"80%": 500,
										max: 1000
									}}
									step={1}
									connect="lower"
									value={[theEvent.guestsCount]}
									onChange={values =>
										this.setState({
											guests: values[0]
										})
									}
									format={wNumb({
										decimals: 0
									})}
								/>
								<p style={{ marginTop: "15px" }}>
									{translate("request-form.step-3.guests-description", {
										prefix:
											this.state.guests === 1000
												? translate("over")
												: translate("around"),
										amount: this.state.guests
									})}
								</p>
							</TextWrapper>

							<TextWrapper
								label={translate("request-form.step-3.event-description")}
								text={translate(
									"request-form.step-3.event-description-description"
								)}
							>
								<TextBox
									height="110px"
									placeholder={translate(
										"request-form.step-3.event-description-description"
									)}
									name="description"
									value={theEvent.description}
									validate={["required"]}
								/>
							</TextWrapper>
						</div>
					</div>
				</Form>
			</div>
		);
	}
}

function mapStateToProps(state, ownProps) {
	return {
		profile: state.login.profile,
		translate: getTranslate(state.locale)
	};
}

function mapDispatchToProps(dispatch, ownProps) {
	return {
		updateEvent: (event, callback) =>
			dispatch(actions.updateEvent(event, callback)),
		cancelEvent: (id, hash, callback) =>
			dispatch(actions.cancelEvent(id, hash, callback))
	};
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Event);
