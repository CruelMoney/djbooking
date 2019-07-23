import React from "react";
import {
	SettingsSection,
	Input,
	ButtonText,
	DeleteFileButton
} from "../components/FormComponents";
import emailValidator from "email-validator";
import constants from "../../../constants/constants";
import ImageUploader from "../components/ImageInput";
import PasswordChanger from "../components/PasswordChanger";
import DatePickerPopup from "../components/DatePicker";
import LocationPicker from "../components/LocationPicker";
import NotificationPreferences from "../components/NotificationPreferences";

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
				variables: {
					id: user.id,
					redirectLink: constants.Environment.CALLBACK_DOMAIN,
					...data
				}
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
		genres,
		playingLocation,
		userSettings,
		email,
		artistName,
		picture,
		permalink
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
					autoComplete="name"
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
					autoComplete="email"
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
					autoComplete="tel"
					name="phone"
					onSave={phone => saveData({ phone: phone.trim() })}
				/>
				<PasswordChanger onSave={saveData}></PasswordChanger>

				<DatePickerPopup onSave={saveData} birthday={birthday} />
				<ImageUploader
					half
					label="Profile picture"
					buttonText="change picture"
					attention={!picture}
					onSave={updateKey("picture")}
				/>

				<Input
					half
					type="button"
					attention
					label="Verify identity"
					buttonText="upload documents"
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
					onSave={artistName => saveData({ artistName: artistName.trim() })}
				/>
				<Input
					label="URL"
					placeholder="https://cueup.io/"
					type="formatted-text"
					defaultValue={permalink}
					onSave={async permalink => {
						saveData({ permalink: permalink.trim() });
					}}
				/>
				<LocationPicker
					initialLocation={playingLocation}
					save={playingLocation => saveData({ playingLocation })}
				/>

				<Input
					half
					type="button"
					label="Genres"
					buttonText={<ButtonText>{genres.join(", ")}</ButtonText>}
				/>
				<Input
					half
					type="button"
					label="Cancelation policy"
					buttonText={`${cancelationPolicy.days} days, ${cancelationPolicy.percentage}%`}
				/>
				<Input half type="button" label="Bio" buttonText={"edit"} />

				<ImageUploader
					half
					label="Cover photo"
					buttonText="change photo"
					onSave={updateKey("coverPhoto")}
					options={{ maxWidth: 1440, maxHeight: 400 }}
				>
					{user.coverPhoto && (
						<DeleteFileButton onClick={_ => updateKey("coverPhoto")(null)}>
							x
						</DeleteFileButton>
					)}
				</ImageUploader>

				<Input
					half
					type="button"
					attention={userSettings.standby}
					label="Standby"
					buttonText={userSettings.standby ? "unavailable" : "available"}
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
					type="button"
					attention={!bankAccount}
					label="Payout information"
					buttonText={"update"}
				/>

				<Input
					half
					type="button"
					label="Preferred currency"
					buttonText={currency ? currency : "update"}
				/>

				<NotificationPreferences />
			</SettingsSection>

			<SettingsSection
				title={"System"}
				description={
					"If you delete your user, all data will be deleted and unrecoverable. If you have any unfinished gigs, they will all be declined and cancelled."
				}
			>
				<Input
					half
					type="button"
					label="Delete user"
					warning
					buttonText="delete"
				/>
				<Input
					half
					type="button"
					label="Export all data"
					buttonText="export"
					onClick={_ =>
						window.alert("We'll send you an email when your data is ready.")
					}
				/>
			</SettingsSection>
		</>
	);
};

export default Settings;
