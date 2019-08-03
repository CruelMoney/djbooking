import React, { useState } from "react";
import {
	SettingsSection,
	Input,
	DeleteFileButton,
	TextArea
} from "../components/FormComponents";
import emailValidator from "email-validator";
import constants from "../../../constants/constants";
import ImageUploader from "../components/ImageInput";
import PasswordChanger from "../components/PasswordChanger";
import DatePickerPopup from "../components/DatePicker";
import LocationPicker from "../components/LocationPicker";
import NotificationPreferences from "../components/NotificationPreferences";
import GenreSelector from "../components/GenreSelector";
import CancelationPolicyPopup from "../components/CancelationPolicyPopup";
import BioPopup from "../components/BioPopup";
import PayoutForm from "../../../components/common/PayoutForm";
import Popup from "../../../components/common/Popup";
import { reset } from "../../../ApolloProvider";
import { DELETE_USER } from "../gql";
import { Mutation, Query } from "react-apollo";
import { ME } from "../../../components/gql";
import { Row, Container, Col } from "../components/Blocks";
import { GradientBg } from "../components/Header";

const Booking = ({ user, loading, updateUser, translate, history }) => {
	const updateKey = key => async value => {
		await updateUser({
			variables: {
				id: user.id,
				[key]: value
			}
		});
	};

	if (loading) {
		return null;
	}
	const {
		userMetadata,
		appMetadata,
		genres,
		playingLocation,
		userSettings,
		email,
		artistName,
		picture,
		permalink
	} = user;
	const {
		firstName,
		lastName,
		phone,
		birthday,
		bankAccount,
		bio
	} = userMetadata;
	const { cancelationPolicy, currency, notifications } = userSettings;
	const { roles } = appMetadata;
	return (
		<div>
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
							<Input type="text" label="Event Title" />
							<DatePickerPopup />

							<Input
								type="text-area"
								label={"Description"}
								placeholder={translate("request-form.step-3.event-description")}
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
				</Row>
			</Container>
		</div>
	);
};

export default Booking;
