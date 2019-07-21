import React from "react";
import styled from "styled-components";
import { Row, Col } from "../components/Blocks";
import { Title, Body } from "../components/Text";

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

const InputField = styled.input`
	background: #f6f8f9;
	border-radius: 4px;
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
	border: ${({ attention }) => (attention ? "2px solid #FFC800" : "none")};
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

const Input = ({ half, label, ...props }) => {
	const L = half ? LabelHalf : Label;
	return (
		<L>
			{label}
			<InputField {...props} />
		</L>
	);
};

const Settings = () => {
	return (
		<>
			<SettingsSection
				title={"Basics"}
				description={
					"Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
				}
			>
				<Input label="Email" placeholder="mail@email.com" type="email" />
				<Input label="Full name" placeholder="First Last" type="text" />
				<Input label="Phone" placeholder="+123456789" type="tel" />

				<Input half label="Password" placeholder="super secret" type="text" />
				<Input half label="Birthday" placeholder="dd/mm/yyyy" type="date" />
				<Input half label="Picture" placeholder="Change picture" type="text" />
				<Input
					half
					attention
					label="Verify identity"
					placeholder="Uploade documents"
					type="text"
				/>
			</SettingsSection>

			<SettingsSection
				title={"Profile"}
				description={
					"Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
				}
			>
				<Input label="Artist name" placeholder="Dj Khaled" type="text" />
				<Input label="URL" placeholder="https://cueup.io/" type="text" />
			</SettingsSection>

			<SettingsSection
				title={"Preferences"}
				description={
					"Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
				}
			></SettingsSection>

			<SettingsSection
				title={"System"}
				description={
					"Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
				}
			></SettingsSection>
		</>
	);
};

export default Settings;
