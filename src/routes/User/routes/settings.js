import React, { useState } from "react";
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
import {
	Row,
	Col,
	Hr,
	TeritaryButton,
	PrimaryButton
} from "../components/Blocks";
import emailValidator from "email-validator";
import Popup from "../../../components/common/Popup";
import Button from "../../../components/common/Button-v2";

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
	const saveData = async data => {
		const flatUser = {
			...user,
			...user.userMetadata
		};
		if (hasChanges(data, flatUser)) {
			await updateUser({
				variables: { id: user.id, ...data }
			});
		}
	};

	const saveFullName = async value => {
		const [firstName, ...lastName] = value.split(" ");
		const data = {
			firstName,
			lastName: lastName.join(" ")
		};

		await saveData(data);
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
					autocomplete="name"
					name="name"
					onSave={saveFullName}
					validation={v => {
						const [firstName, ...lastName] = v.split(" ");
						if (!firstName || !lastName.some(s => !!s.trim())) {
							return "Please enter both first and last name";
						}
					}}
				/>
				<Input
					label="Email"
					defaultValue={email}
					placeholder="mail@email.com"
					type="email"
					autocomplete="email"
					name="email"
					onSave={email => saveData({ email: email.trim() })}
					validation={v =>
						emailValidator.validate(v) ? null : "Not a valid email"
					}
				/>
				<Input
					label="Phone"
					attention={!phone}
					defaultValue={phone}
					placeholder="+123456789"
					type="tel"
					autocomplete="tel"
					name="phone"
					onSave={phone => saveData({ phone: phone.trim() })}
				/>
				<PasswordChanger></PasswordChanger>

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

const PasswordChanger = () => {
	const [showing, setShowing] = useState(false);

	return (
		<>
			<Input
				half
				button
				onClick={s => setShowing(true)}
				label="Password"
				children="change password"
			/>
			<Popup
				showing={showing}
				onClickOutside={_ => setShowing(false)}
				style={{ width: "300px" }}
			>
				<form>
					<Input label="New password" placeholder={"Min. 6 characters"} />
					<Input label="Repeat password" placeholder={"Min. 6 characters"} />

					<Row right>
						<TeritaryButton onClick={_ => setShowing(false)}>
							Cancel
						</TeritaryButton>
						<PrimaryButton>Save</PrimaryButton>
					</Row>
				</form>
			</Popup>
		</>
	);
};

export default Settings;
