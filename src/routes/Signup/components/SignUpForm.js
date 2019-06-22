import React, { Component } from "react";
import PropTypes from "prop-types";
import NumberedList from "../../../components/common/NumberedList";
import SubmitButton from "../../../components/common/SubmitButton";
import c from "../../../constants/constants";
import { connect } from "react-redux";

import Form, {
	LocationSelectorSimple,
	ToggleButtonHandler,
	TextBox
} from "../../../components/common/Form-v2";
import {
	Textfield,
	RegistrationElement
} from "../../../components/common/Form-v2";
import debounce from "lodash.debounce";
import GeoCoder from "../../../utils/GeoCoder";
import connectToForm from "../../../components/higher-order/connectToForm";
import SimpleMap from "../../../components/common/Map";
import { localize } from "react-localize-redux";
import { Mutation } from "react-apollo";
import { CREATE_USER } from "../../../components/gql";
import { getErrorMessage } from "../../../components/common/ErrorMessageApollo";
import FileInput from "../../../components/common/FileInput";
const Map = connectToForm(SimpleMap);

class SignupForm extends Component {
	static propTypes = {
		isLoggedIn: PropTypes.bool,
		form: PropTypes.object,
		isloading: PropTypes.bool
	};

	static childContextTypes = {
		color: PropTypes.string
	};

	getChildContext() {
		return { color: "#31DAFF" };
	}

	state = {
		msg: null,
		emailSignup: true
	};

	signup = async (form, mutate, cb) => {
		let { name, playingLocation, playingRadius, location } = form.values;
		name = name.split(" ");
		const lastName = name.pop();
		const firstName = name.join(" ");
		const variables = {
			...form.values,
			lastName,
			firstName,
			playingLocation: {
				name: location,
				latitude: playingLocation.lat,
				longitude: playingLocation.lng,
				radius: playingRadius
			},
			reference: this.props.reference,
			redirectLink: c.Environment.CALLBACK_DOMAIN
		};
		try {
			await mutate({ variables });
			cb(null, true);
			this.setState({
				msg:
					"Thanks for joining. Please verify your email using the link we've just sent."
			});
		} catch (error) {
			console.log({ error, variables });
			const message = getErrorMessage(error);
			cb(message);
		}
	};

	updateMap = debounce(location => {
		const { translate } = this.props;

		//Getting the coordinates of the playing location
		GeoCoder.codeAddress(location, geoResult => {
			if (geoResult.error) {
				this.setState({
					locationErr: translate("City not found"),
					location: null
				});
			} else {
				this.setState({
					locationName: location,
					location: geoResult.position
				});
			}
		});
	}, 500);

	render() {
		const { translate } = this.props;

		return (
			<Mutation mutation={CREATE_USER}>
				{mutate => {
					return (
						<Form name={"signup-form"}>
							<NumberedList>
								<RegistrationElement
									name="email"
									label="Email"
									active={true}
									text={translate("signup.form.email")}
									hideOn={["FACEBOOK", "SIGNED_IN"]}
								>
									<Textfield
										big
										name="email"
										validate={["required", "email"]}
										placeholder="mail@gmail.com"
										label={translate("Your Email")}
									/>
								</RegistrationElement>

								<RegistrationElement
									name="password"
									label="Password"
									active={true}
									text={translate("signup.form.password")}
									hideOn={["FACEBOOK", "SOUNDCLOUD", "SIGNED_IN"]}
								>
									<Textfield
										big
										type="password"
										name="password"
										validate={["required", "minLength"]}
										placeholder="Something super secret"
										label={translate("Your password")}
									/>
								</RegistrationElement>

								<RegistrationElement
									name="name"
									label={translate("Name")}
									active={true}
									text={translate("finish-signup.name")}
								>
									<Textfield
										big
										name="name"
										placeholder={translate("first-last")}
										validate={["required", "lastName"]}
										label={translate("Your name")}
									/>
								</RegistrationElement>

								<RegistrationElement
									name="phone"
									label={translate("Phone number")}
									active={true}
									text={translate("finish-signup.phone")}
								>
									<Textfield
										big
										name="phone"
										type="tel"
										placeholder="12345678"
										validate={["required"]}
										label={translate("Your phone number")}
									/>
								</RegistrationElement>

								<RegistrationElement
									name="location"
									label={translate("Location")}
									active={true}
									text={translate("finish-signup.location")}
								>
									<LocationSelectorSimple
										big
										autocomplete="off"
										name="location"
										onChange={this.updateMap}
										validate={["required"]}
										value={
											this.props.geoCity !== "" ? this.props.geoCity : undefined
										}
										label={translate("Location")}
									/>

									{this.state.location ? (
										<Map
											key={this.state.locationName}
											radius={25000}
											name={"playingLocation"}
											value={this.state.location}
											editable={true}
											themeColor={this.context.color}
											radiusName="playingRadius"
											locationName="playingLocation"
										/>
									) : null}
								</RegistrationElement>

								<RegistrationElement
									name="genres"
									label={translate("Genres")}
									active={true}
									text={translate("finish-signup.genres")}
								>
									<ToggleButtonHandler
										name="genres"
										potentialValues={c.GENRES}
										validate={["required"]}
										columns={4}
									/>
								</RegistrationElement>

								<RegistrationElement
									name="picture"
									label={translate("Picture")}
									active={true}
									text={translate("finish-signup.picture")}
								>
									<FileInput validate={["required"]} name="picture" />
								</RegistrationElement>

								<RegistrationElement
									name="bio"
									label={translate("About you")}
									active={true}
									text={translate("finish-signup.about")}
								>
									<TextBox
										validate={["required"]}
										width="100%"
										height="150px"
										name="bio"
									/>
								</RegistrationElement>
							</NumberedList>

							<SubmitButton
								glow
								type="submit"
								active={true}
								name="signup"
								onClick={(form, cb) => {
									this.signup(form, mutate, cb);
								}}
							>
								<div
									style={{
										width: "100px"
									}}
								>
									{translate("Join")}
								</div>
							</SubmitButton>
							<div className="row">
								<div className="col-xs-12">
									<p
										style={{
											textAlign: "center",
											marginTop: "10px"
										}}
										className="terms_link"
									>
										{translate("terms-message")}
									</p>
								</div>
							</div>
							{this.state.msg ? (
								<div
									style={{
										textAlign: "center"
									}}
								>
									<p
										style={{
											fontSize: "20px"
										}}
									>
										{this.state.msg}
									</p>
								</div>
							) : null}
						</Form>
					);
				}}
			</Mutation>
		);
	}
}

export default localize(SignupForm, "locale");
