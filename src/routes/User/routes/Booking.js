import React, { useState, useRef } from "react";
import { SettingsSection, Input, Label } from "../components/FormComponents";
import emailValidator from "email-validator";
import DatePickerPopup from "../components/DatePicker";
import styled from "styled-components";
import { Row, Container, Col } from "../components/Blocks";
import { GradientBg } from "../components/Header";
import Sidebar, { SidebarContent, CTAButton } from "../components/Sidebar";
import ScrollToTop from "../../../components/common/ScrollToTop";
import Arrow from "react-ionicons/lib/MdArrowRoundForward";
import { LoadingPlaceholder2 } from "../../../components/common/LoadingPlaceholder";
import { SmallHeader } from "../components/Text";
import moment from "moment-timezone";
import RiderOptions from "../components/RiderOptions";
import TimeSlider from "../../../components/common/TimeSlider";
import Slider from "../../../components/common/Slider";
import wNumb from "wnumb";
import { Mutation } from "react-apollo";
import { CREATE_EVENT } from "../../../components/common/RequestForm/gql";

const useForm = form => {
	const validations = useRef({});

	const registerValidation = key => fun => {
		validations.current = {
			...validations.current,
			[key]: fun
		};
	};

	const unregisterValidation = key => fun => {
		delete validations.current[key];
	};

	const runValidations = () => {
		return Object.entries(validations.current)
			.reduce((refs, [key, fun]) => [...refs, fun(form[key])], [])
			.filter(r => !!r);
	};

	return {
		registerValidation,
		unregisterValidation,
		runValidations
	};
};

const Booking = ({ user, loading, updateUser, translate, history }) => {
	const [form, setForm] = useState({
		guests: 80,
		rider: {
			speakers: false,
			lights: false
		},
		duration: {
			start: moment(),
			end: moment()
		}
	});

	const { registerValidation, unregisterValidation, runValidations } = useForm(
		form
	);

	const setValue = key => val => setForm(f => ({ ...f, [key]: val }));

	const requestBooking = () => {
		const refs = runValidations();
		debugger;
		if (refs[0]) {
			window.scrollTo({
				behavior: "smooth",
				top: refs[0].current.offsetTop
			});
		}
	};

	return (
		<div>
			<ScrollToTop top={0} />

			<GradientBg style={{ height: "80px" }} />

			<Container>
				<Row>
					<Col
						style={{
							marginTop: "42px",
							width: "100%",
							marginBottom: "60px",
							zIndex: 0,
							position: "relative"
						}}
					>
						<SettingsSection
							stickyTop={"24px"}
							title={"Event Details"}
							description={
								"Tell us about your event to help the dj decide on a fair price."
							}
						>
							<Input
								half
								type="text"
								label="Event Name"
								placeholder="Add a short, clear name"
								onSave={setValue("name")}
								validation={v => (!!v ? null : "Please enter a name")}
								registerValidation={registerValidation("name")}
								unregisterValidation={unregisterValidation("name")}
							/>
							<DatePickerPopup
								half
								label={"Date"}
								minDate={new Date()}
								initialDate={form.date ? moment(form.date) : null}
								showMonthDropdown={false}
								showYearDropdown={false}
								maxDate={false}
								onSave={setValue("date")}
								validation={v => (!!v ? null : "Please select a date")}
								registerValidation={registerValidation("date")}
								unregisterValidation={unregisterValidation("date")}
							/>
							<Label
								style={{
									width: "100%",
									marginRight: "36px",
									marginBottom: "30px"
								}}
							>
								<span style={{ marginBottom: "12px", display: "block" }}>
									Duration
								</span>
								<TimeSlider
									color={"#50e3c2"}
									hoursLabel={translate("hours")}
									startLabel={translate("start")}
									endLabel={translate("end")}
									date={moment(form.date)}
									onChange={([start, end]) => {
										setValue("duration")({
											start: moment(form.date)
												.startOf("day")
												.add(start, "minutes"),
											end: moment(form.date)
												.startOf("day")
												.add(end, "minutes")
										});
									}}
								/>
							</Label>

							<Label
								style={{
									width: "100%",
									marginRight: "36px",
									marginBottom: "30px"
								}}
							>
								<span style={{ marginBottom: "12px", display: "block" }}>
									Guests
								</span>

								<Slider
									color={"#50e3c2"}
									name="guests"
									range={{
										min: 1,
										"50%": 100,
										"80%": 500,
										max: 1000
									}}
									step={1}
									connect="lower"
									value={[80]}
									onChange={values => {
										setValue("guests")(values[0]);
									}}
									format={wNumb({
										decimals: 0
									})}
								/>
								<span
									style={{ marginTop: "15px", display: "block" }}
								>{`${form.guests} people`}</span>
							</Label>
							<RiderOptions onSave={setValue("rider")} />

							<Input
								type="text-area"
								label={"Description"}
								placeholder={translate(
									"request-form.step-3.event-description-description"
								)}
								style={{
									height: "200px"
								}}
								onSave={setValue("description")}
								validation={v => (!!v ? null : "Please enter a description")}
								registerValidation={registerValidation("description")}
								unregisterValidation={unregisterValidation("description")}
							/>
						</SettingsSection>

						<SettingsSection
							stickyTop={"24px"}
							title={"Contact Details"}
							description={
								"How should we get back to you with updates from the dj? Your information is only shared with the dj."
							}
						>
							<Input
								type="text"
								label="Contact Name"
								placeholder="First Last"
								validation={v => {
									if (!v) {
										return "Please enter name";
									}
									const [firstName, ...lastName] = v.split(" ");
									if (!firstName || !lastName.some(s => !!s.trim())) {
										return "Please enter both first and last name";
									}
								}}
								onSave={setValue("contactName")}
								registerValidation={registerValidation("contactName")}
								unregisterValidation={unregisterValidation("contactName")}
							/>

							<Input
								placeholder="mail@email.com"
								type="email"
								autoComplete="email"
								label="Contact Email"
								validation={v =>
									emailValidator.validate(v) ? null : "Not a valid email"
								}
								onSave={setValue("contactEmail")}
								registerValidation={registerValidation("contactEmail")}
								unregisterValidation={unregisterValidation("contactEmail")}
							/>
							<Input
								label="Contact Phone"
								placeholder="+123456789"
								type="tel"
								autoComplete="tel"
								onSave={setValue("contactPhone")}
							/>
						</SettingsSection>
					</Col>
					<BookingSidebar
						loading={loading}
						user={user}
						values={form}
						requestBooking={requestBooking}
					/>
				</Row>
			</Container>
		</div>
	);
};

const BookingSidebar = ({ loading, values, requestBooking, ...props }) => {
	return (
		<Sidebar
			showCTAShadow
			stickyTop={"-42px"}
			enableSharing={false}
			style={{ marginLeft: "60px", marginTop: "42px" }}
		>
			<SidebarContent>
				{loading ? (
					<LoadingPlaceholder2 />
				) : (
					<Content values={values} {...props} />
				)}
			</SidebarContent>
			<Mutation mutation={CREATE_EVENT} variables={values}>
				{mutate => (
					<CTAButton onClick={requestBooking}>
						REQUEST BOOKING
						<Arrow
							color="#fff"
							style={{ position: "absolute", right: "24px" }}
						></Arrow>
					</CTAButton>
				)}
			</Mutation>
		</Sidebar>
	);
};

const SidebarRow = styled(Row)`
	font-family: "AvenirNext-DemiBold";
	font-size: 15px;
	color: #98a4b3;
	align-items: center;
	margin-bottom: 12px;
`;

const SimpleTableItem = styled(SidebarRow)`
	border-bottom: 1px solid #e2e8f0;
	padding: 15px 0;
	margin: 0;
	justify-content: space-between;
	&:first-child {
		border-top: 1px solid #e2e8f0;
		margin-top: 24px;
	}

	> *:first-child {
		color: #122b48;
	}
`;

const Content = ({ user, values }) => {
	const { artistName, userMetadata } = user;
	const { firstName } = userMetadata;

	const { guests, date, rider, duration, eventName } = values;

	return (
		<>
			<SmallHeader style={{ marginBottom: "15px" }}>{`Booking of ${artistName ||
				firstName}`}</SmallHeader>
			{eventName && <SidebarRow>{eventName}</SidebarRow>}
			<SidebarRow>{moment(date).format("dddd Do MMMM, YYYY")}</SidebarRow>
			<SidebarRow>
				From {duration.start.format("HH:mm")} to {duration.end.format("HH:mm")}
			</SidebarRow>
			<SidebarRow>{guests} guests</SidebarRow>
			{rider.speakers && <SidebarRow>Including speakers</SidebarRow>}
			{rider.lights && <SidebarRow>Including lights</SidebarRow>}
			<div>
				<SimpleTableItem>
					<span>Dj price</span>
					<span>00.00</span>
				</SimpleTableItem>
				<SimpleTableItem>
					<span>Service fee</span>
					<span>00.00</span>
				</SimpleTableItem>
				<SimpleTableItem>
					<span>Total</span>
					<span>dj will respond with price</span>
				</SimpleTableItem>
			</div>
		</>
	);
};

export default Booking;
