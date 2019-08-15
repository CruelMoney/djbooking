import React from "react";
import { Col } from "../../../../components/Blocks";
import { SettingsSection, Input } from "../../../../components/FormComponents";
import { useMutation } from "react-apollo";
import emailValidator from "email-validator";

import { UPDATE_EVENT } from "../../../EventOld/gql";
import SavingIndicator from "../../../../components/SavingIndicator";
import TextAreaPopup from "../../../../components/TextAreaPopup";
import { Body } from "../../../../components/Text";
import GenreSelector from "../../../../components/GenreSelector";
import { PhoneInputNew } from "../../../../components/common/PhoneInput";
const required = msg => val => (!val ? msg : null);

const Requirements = ({ theEvent, translate }) => {
	const [update, { loading }] = useMutation(UPDATE_EVENT);
	if (!theEvent) {
		return null;
	}

	const {
		name,
		description,
		rider,
		genres,
		contactName,
		contactPhone,
		contactEmail
	} = theEvent;

	const save = (key, optimistic) => val =>
		update({
			variables: {
				id: theEvent.id,
				hash: theEvent.hash,
				[key]: val
			},
			optimisticResponse: {
				__typename: "Mutation",
				updateEvent: {
					__typename: "Event",
					...theEvent,
					...optimistic
				}
			}
		});

	return (
		<Col>
			<SavingIndicator loading={loading} />

			<SettingsSection
				title={"Requirements"}
				description={
					"Add requirements to help us find the most qualified DJs for your event. "
				}
			>
				<Input
					label="Name"
					defaultValue={name}
					placeholder="Keep it short"
					type="text"
					onSave={save("name")}
					validation={required("The event needs a name")}
				/>
				<TextAreaPopup
					label="Description"
					initialValue={description}
					placeholder="Description"
					type="text"
					save={save("description")}
					validation={required("The event needs a description")}
				>
					<Body>
						{translate("request-form.step-3.event-description-description")}
					</Body>
				</TextAreaPopup>
				<GenreSelector half initialGenres={genres} save={save("genres")} />

				<Input
					half
					type="button"
					label="Speakers"
					onClick={() =>
						save("speakers", {
							rider: {
								...rider,
								speakers: !rider.speakers
							}
						})(!rider.speakers)
					}
					buttonText={rider.speakers ? "Required" : "Not required"}
				/>
				<Input
					half
					type="button"
					label="Lights"
					onClick={() =>
						save("lights", {
							rider: {
								...rider,
								lights: !rider.lights
							}
						})(!rider.lights)
					}
					buttonText={rider.lights ? "Required" : "Not required"}
				/>
			</SettingsSection>

			<SettingsSection
				title={"Contact information"}
				description={
					"Enter information on the person communicating with the DJ. This information is only visible to the DJ after the DJ has been booked."
				}
			>
				<Input
					label="Contact name"
					defaultValue={contactName}
					placeholder="Keep it short"
					type="text"
					autoComplete="name"
					name="name"
					onSave={save("contactEmail")}
					validation={required("Name is needed")}
				/>
				<Input
					label="Contact email"
					defaultValue={contactEmail}
					placeholder="mail@email.com"
					type="email"
					autoComplete="email"
					name="email"
					onSave={email => save("contactEmail")(email.trim())}
					validation={v =>
						emailValidator.validate(v) ? null : "Not a valid email"
					}
				/>
				<PhoneInputNew
					label="Phone"
					attention={!contactPhone}
					defaultValue={contactPhone}
					placeholder="+123456789"
					type="tel"
					autoComplete="tel"
					name="phone"
					onSave={phone => save("contactPhone")({ phone: phone.trim() })}
				/>
			</SettingsSection>
		</Col>
	);
};

export default Requirements;
