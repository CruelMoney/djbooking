import React from "react";
import styled, { css } from "styled-components";
import {
	SettingsSection,
	Input,
	ButtonText,
	Label,
	Value,
	Checkbox
} from "../components/FormComponents";
import moment from "moment-timezone";
import { Row, Col, Hr } from "../components/Blocks";
import { useMutation } from "react-apollo-hooks";
import { UPDATE_USER } from "../gql";

const TableRow = styled(Row)`
	height: 42px;
	align-items: center;
	p {
		margin-bottom: 0;
	}
	> *:first-child {
		flex: 1;
	}
	> *:nth-child(2),
	> *:nth-child(3) {
		min-width: 100px;
		text-align: center;
	}
`;

const CheckBoxRow = ({ label }) => {
	return (
		<TableRow>
			<Value>{label}</Value>
			<Checkbox defaultValue={true} />
			<Checkbox defaultValue={true} />
		</TableRow>
	);
};

const NotificationPreferences = () => {
	return (
		<Col style={{ width: "100%", marginRight: "36px" }}>
			<TableRow>
				<Label>Notifications</Label>
				<Label>Mobile</Label>
				<Label>Email</Label>
			</TableRow>
			<Hr />
			<CheckBoxRow label={"New message"} />
			<CheckBoxRow label={"New gig"} />
			<CheckBoxRow label={"Event cancelled"} />
			<CheckBoxRow label={"News and updates"} />
			<CheckBoxRow label={"Dj cancelled"} />
		</Col>
	);
};

const hasChanges = (o1, o2) => {
	const keys = Object.keys(o1);

	return keys.some(key => o2[key] !== o1[key]);
};

const Settings = ({ user, loading, updateUser }) => {
	console.log({ user });

	const saveData = async data => {
		await updateUser({
			variables: { id: user.id, ...data }
		});
	};

	const saveFullName = async ({ target }) => {
		const [firstName, ...lastName] = target.value.split(" ");
		const data = {
			firstName,
			lastName: lastName.join(" ")
		};
		if (hasChanges(data, user.userMetadata)) {
			await saveData(data);
		}
	};

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

	return (
		<>
			<SettingsSection
				title={"Basics"}
				description={
					"Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
				}
			>
				<Input
					label="Full name"
					defaultValue={`${firstName} ${lastName}`}
					placeholder="First Last"
					type="text"
					onBlur={saveFullName}
				/>
				<Input
					label="Email"
					defaultValue={email}
					placeholder="mail@email.com"
					type="email"
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

				<NotificationPreferences />
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
