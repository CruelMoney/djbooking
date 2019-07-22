import React from "react";
import styled, { css } from "styled-components";
import { Row, Col } from "../components/Blocks";
import { Title, Body } from "../components/Text";
import moment from "moment-timezone";

const SectionRow = styled(Row)`
	padding-bottom: 30px;
	margin-bottom: 42px;
	border-bottom: 1px solid #e9ecf0;
	flex-wrap: wrap;
`;

const LeftCol = styled(Col)`
	min-width: 250px;
	flex: 1;
	margin-right: 42px;
	position: sticky;
	top: 90px;
	@media only screen and (max-width: 990px) {
		position: initial;
	}
`;
const RightCol = styled(Row)`
	flex: 2;
	min-width: 400px;
	flex-wrap: wrap;
	margin-right: -36px;
`;

const SettingsSection = ({ title, description, children }) => {
	return (
		<SectionRow>
			<LeftCol>
				<Title>{title}</Title>
				<Body style={{ marginBottom: "24px" }}>{description}</Body>
			</LeftCol>
			<RightCol>{children}</RightCol>
		</SectionRow>
	);
};

const inputStyle = css`
	background: #f6f8f9;
	border-radius: 4px;
	border: none;
	outline: none;
	font-family: "AvenirNext-Regular";
	font-size: 18px;
	color: #122b48;
	text-indent: 9px;
	height: 40px;
	-webkit-appearance: none;
	width: 100%;
	display: block;
	margin-top: 6px;
	box-shadow: ${({ attention }) =>
		attention ? "inset 0 0 0 2px #FFC800" : "none"};
`;

const TextInput = styled.input`
	${inputStyle}
	text-indent: 9px;
	::placeholder,
	::-webkit-input-placeholder {
		color: #98a4b3;
	}
	:-ms-input-placeholder {
		color: #98a4b3;
	}
	:focus {
		background: #e9ecf0;
	}
`;

const ButtonInput = styled.button`
	${inputStyle}
	text-align: center;
	line-height: 40px !important;
	transition: all 200ms ease;
	:hover {
		${({ warning }) =>
			warning
				? `background: #D0021B;
				color: white;
			`
				: `background: #e9ecf0;
			`};
	}
`;

const Label = styled.label`
	font-family: "AvenirNext-Regular";
	font-size: 18px;
	color: #4d6480;
	margin-bottom: 30px;
	font-weight: 300;
	flex: 2;
	min-width: calc(100% - 36px);
	margin-right: 36px;
`;

const LabelHalf = styled(Label)`
	flex: 1;
	min-width: calc(50% - 36px);
	width: calc(50% - 36px);
`;

const Input = ({ half, label, button, ...props }) => {
	const LabelComponent = half ? LabelHalf : Label;
	return (
		<LabelComponent>
			{label}
			{button ? <ButtonInput {...props} /> : <TextInput {...props} />}
		</LabelComponent>
	);
};

const ButtonText = styled.span`
	overflow: hidden;
	white-space: nowrap;
	display: block;
	text-overflow: ellipsis;
`;

const Settings = ({ user, loading }) => {
	if (loading) {
		return null;
	}
	const {
		userMetadata,
		genres,
		playingLocation,
		userSettings,
		email,
		artistName
	} = user;
	const { firstName, lastName, phone, birthday, bankAccount } = userMetadata;
	const { cancelationPolicy, currency } = userSettings;
	debugger;
	return (
		<>
			<SettingsSection
				title={"Basics"}
				description={
					"Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
				}
			>
				<Input
					label="Email"
					defaultValue={email}
					placeholder="mail@email.com"
					type="email"
				/>
				<Input
					label="Full name"
					defaultValue={`${firstName} ${lastName}`}
					placeholder="First Last"
					type="text"
				/>
				<Input
					label="Phone"
					attention={!phone}
					defaultValue={phone}
					placeholder="+123456789"
					type="tel"
				/>

				<Input half button label="Password" children="change password" />
				<Input
					half
					button
					label="Birthday"
					attention={!birthday}
					children={
						birthday ? moment(birthday).format("DD/MM/YYYY") : "Update birthday"
					}
				/>
				<Input half button label="Profile picture" children="change picture" />

				<Input
					half
					button
					attention
					label="Verify identity"
					children="upload documents"
				/>
			</SettingsSection>

			<SettingsSection
				title={"Profile"}
				description={
					"Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
				}
			>
				<Input
					label="Artist name"
					attention={!artistName}
					defaultValue={artistName}
					placeholder="Dj Khaled"
					type="text"
				/>
				<Input label="URL" placeholder="https://cueup.io/" type="text" />
				<Input half button label="Location" children={playingLocation.name} />
				<Input
					half
					button
					label="Genres"
					children={<ButtonText>{genres.join(", ")}</ButtonText>}
				/>
				<Input
					half
					button
					label="Cancelation policy"
					children={`${cancelationPolicy.days} days, ${cancelationPolicy.percentage}%`}
				/>
				<Input half button label="Bio" children={"edit"} />

				<Input half button label="Cover photo" children="Change photo" />
				<Input
					half
					button
					attention={userSettings.standby}
					label="Standby"
					children={userSettings.standby ? "unavailable" : "available"}
				/>
			</SettingsSection>

			<SettingsSection
				title={"Preferences"}
				description={
					"Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
				}
			>
				<Input
					half
					button
					attention={!bankAccount}
					label="Payout information"
					children={"update"}
				/>

				<Input
					half
					button
					label="Preferred currency"
					children={currency ? currency : "update"}
				/>
			</SettingsSection>

			<SettingsSection
				title={"System"}
				description={
					"If you delete your user, all data will be deleted and unrecoverable. If you have any unfinished gigs, they will all be declined and cancelled."
				}
			>
				<Input half button label="Delete user" warning children="delete" />
				<Input
					half
					button
					label="Export all data"
					children="export"
					onClick={_ =>
						window.alert("We'll send you an email when your data is ready.")
					}
				/>
			</SettingsSection>
		</>
	);
};

export default Settings;
