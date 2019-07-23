import React, { useState } from "react";
import styled, { css } from "styled-components";
import {
	SettingsSection,
	Input,
	ButtonText,
	Label,
	Value,
	Checkbox,
	DeleteFileButton
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
import DatePicker from "../../../components/common/Datepicker";
import constants from "../../../constants/constants";
import ImageUploader from "../components/ImageInput";
import { LocationSelectorSimple } from "../../../components/common/Form-v2";
import Map from "../../../components/common/Map";
import debounce from "lodash.debounce";
import GeoCoder from "../../../utils/GeoCoder";

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

				<BirthdayPicker onSave={saveData} birthday={birthday} />
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

const BirthdayPicker = ({ birthday, onSave }) => {
	const [showing, setShowing] = useState(false);
	const initialDate = birthday ? moment(birthday) : null;

	const save = moment => {
		setShowing(false);
		onSave({ birthday: moment.toDate() });
	};

	return (
		<>
			<Input
				half
				type="button"
				onClick={s => setShowing(true)}
				label="Birthday"
				buttonText={
					birthday ? moment(birthday).format("DD/MM/YYYY") : "Update birthday"
				}
			/>
			<Popup
				width="380px"
				showing={showing}
				onClickOutside={() => setShowing(false)}
			>
				<DatePicker
					dark
					initialDate={initialDate}
					minDate={null}
					maxDate={new Date()}
					handleChange={save}
					showMonthDropdown
					showYearDropdown
					dropdownMode="select"
				/>
			</Popup>
		</>
	);
};

const PasswordChanger = ({ onSave }) => {
	const [showing, setShowing] = useState(false);
	const [password, setPassword] = useState(null);
	const [rPassword, setRPassword] = useState(null);

	const validateLength = val => {
		if (!val || val.length < 6) {
			return "Password must be at least 6 characters";
		}
	};

	const validateEqual = val => {
		if (password !== val) {
			return "Passwords are not the same";
		}
	};

	const validate = () => {
		return [validateEqual(rPassword), validateLength(password)].some(v => !v);
	};

	const save = () => {
		if (validate()) {
			onSave({ password });
			setShowing(false);
		}
	};

	return (
		<>
			<Input
				half
				type="button"
				onClick={s => setShowing(true)}
				label="Password"
				buttonText="change password"
			/>
			<Popup
				showing={showing}
				onClickOutside={_ => setShowing(false)}
				width={"520px"}
			>
				<form
					onSubmit={e => {
						e.preventDefault();
						save();
					}}
				>
					<Input
						label="New password"
						placeholder={"Min. 6 characters"}
						type="password"
						autoComplete="new-password"
						onSave={setPassword}
						validation={validateLength}
					/>
					<Input
						label="Repeat password"
						placeholder={"Min. 6 characters"}
						type="password"
						autoComplete="new-password"
						onSave={setRPassword}
						validation={validateEqual}
					/>

					<Row right>
						<TeritaryButton type="button" onClick={_ => setShowing(false)}>
							Cancel
						</TeritaryButton>
						<PrimaryButton type="submit">Save</PrimaryButton>
					</Row>
				</form>
			</Popup>
		</>
	);
};

const LocationPicker = ({ initialLocation, save }) => {
	const [location, setLocation] = useState(
		initialLocation
			? {
					lat: initialLocation.latitude,
					lng: initialLocation.longitude,
					name: initialLocation.name,
					radius: initialLocation.radius
			  }
			: null
	);
	const [error, setError] = useState(null);
	const [showing, setShowing] = useState(false);

	const updateMap = debounce(location => {
		if (location) {
			//Getting the coordinates of the playing location
			GeoCoder.codeAddress(location, geoResult => {
				if (geoResult.error) {
					setError("City not found");
				} else {
					setLocation(l => ({
						...l,
						...geoResult.position,
						name: location
					}));
				}
			});
		}
	}, 500);

	const onRadiusChange = radius =>
		setLocation(l => ({
			...l,
			radius
		}));

	const onCoordinatesChange = ({ lat, lng }) =>
		setLocation(l => ({
			...l,
			lat,
			lng
		}));

	const onSave = () => {
		if (!location) {
			setError("No location selected");
			return;
		} else {
			setShowing(false);
			save({
				name: location.name,
				radius: location.radius,
				latitude: location.lat,
				longitude: location.lng
			});
		}
	};

	return (
		<>
			<Input
				half
				type="button"
				onClick={s => setShowing(true)}
				label="Location"
				buttonText={initialLocation ? initialLocation.name : "Update location"}
			/>
			<Popup
				showing={showing}
				onClickOutside={_ => setShowing(false)}
				width={"520px"}
			>
				<LocationSelectorSimple
					big
					autocomplete="off"
					name="location"
					onChange={updateMap}
					value={location && location.name}
					label={"Location"}
				/>

				{location ? (
					<Map
						key={location ? location.name : "init"}
						radius={location.radius || 25000}
						name={"playingLocation"}
						value={location}
						editable={true}
						color={"#50E3C2"}
						radiusName="playingRadius"
						locationName="playingLocation"
						onRadiusChange={onRadiusChange}
						onCoordinatesChange={onCoordinatesChange}
					/>
				) : null}

				<Row style={{ marginTop: "15px" }} right>
					<TeritaryButton type="button" onClick={_ => setShowing(false)}>
						Cancel
					</TeritaryButton>
					<PrimaryButton type="button" onClick={onSave}>
						Save
					</PrimaryButton>
				</Row>

				{error && <p className="error">{error}</p>}
			</Popup>
		</>
	);
};

export default Settings;
