import React, { useState } from "react";
import { SettingsSection, Input } from "../components/FormComponents";
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

const Booking = ({ user, loading, updateUser, translate, history }) => {
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
								"Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
							}
						>
							<Input
								type="text"
								label="Event Name"
								placeholder="Add a short, clear name"
							/>
							<DatePickerPopup
								half
								label={"Date"}
								showMonthDropdown={false}
								showYearDropdown={false}
								maxDate={false}
							/>

							<RiderOptions />

							<Input
								type="text-area"
								label={"Description"}
								placeholder={translate(
									"request-form.step-3.event-description-description"
								)}
								style={{
									height: "200px"
								}}
							/>
						</SettingsSection>

						<SettingsSection
							stickyTop={"24px"}
							title={"Contact Details"}
							description={
								"Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
							}
						>
							<Input
								type="text"
								label="Contact Name"
								placeholder="First Last"
								type="text"
								validation={v => {
									const [firstName, ...lastName] = v.split(" ");
									if (!firstName || !lastName.some(s => !!s.trim())) {
										return "Please enter both first and last name";
									}
								}}
							/>

							<Input
								type="text"
								placeholder="mail@email.com"
								type="email"
								autoComplete="email"
								label="Contact Email"
								validation={v =>
									emailValidator.validate(v) ? null : "Not a valid email"
								}
							/>
							<Input
								label="Contact Phone"
								placeholder="+123456789"
								type="tel"
								autoComplete="tel"
							/>
						</SettingsSection>
					</Col>
					<BookingSidebar loading={loading} user={user} />
				</Row>
			</Container>
		</div>
	);
};

const BookingSidebar = ({ loading, user }) => {
	return (
		<Sidebar
			showCTAShadow
			stickyTop={"-42px"}
			enableSharing={false}
			style={{ marginLeft: "60px", marginTop: "42px" }}
		>
			<SidebarContent>
				{loading ? <LoadingPlaceholder2 /> : <Content user={user} />}
			</SidebarContent>
			<CTAButton>
				REQUEST BOOKING
				<Arrow
					color="#fff"
					style={{ position: "absolute", right: "24px" }}
				></Arrow>
			</CTAButton>
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

const Content = ({ user }) => {
	const { artistName, userMetadata } = user;
	const { firstName } = userMetadata;
	return (
		<>
			<SmallHeader style={{ marginBottom: "15px" }}>{`Booking of ${artistName ||
				firstName}`}</SmallHeader>
			<SidebarRow>From 18:00 to 03:00</SidebarRow>
			<SidebarRow>Friday 28th of July</SidebarRow>
			<SidebarRow>100 guests</SidebarRow>

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
