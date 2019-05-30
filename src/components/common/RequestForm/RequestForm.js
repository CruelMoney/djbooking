import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import Button from "../Button-v2";
import TextField, { TexfieldDisconnected } from "../Textfield";
import RiderOptions from "../RiderOptions";
import LocationSelector from "../LocationSelectorSimple";
import ToggleButtonHandler from "../ToggleButtonHandler";
import Form from "../Form-v2";
import Slider from "../Slider";
import TimeSlider from "../TimeSlider";
import Progress from "./ProgressSubmit";
import TextBox from "../TextBox";
import Popup from "../Popup";
import Login from "../Login";
import DatePicker from "../Datepicker";
import moment from "moment-timezone";
import SubmitButton from "../SubmitButton";
import ErrorMessage from "../ErrorMessage";
import * as eventActions from "../../../actions/EventActions";
import * as userActions from "../../../actions/UserActions";
import { connect } from "react-redux";
import GenreChooser from "./GenreChooser";
import wNumb from "wnumb";
import c from "../../../constants/constants";
import content from "./content.json";
import addTranslate from "../../../components/higher-order/addTranslate";

const MainForm = class extends PureComponent {
	static defaultProps = {
		form: { values: {} }
	};

	state = {
		showPopup: false,
		emailExists: false,
		activeStep: 1,
		date: moment()
	};

	formToEvent(form) {
		return {
			...form,
			guestsCount: form.guests[0],
			timeZone: this.state.timeZoneId,
			location: this.state.location
		};
	}

	formValidCheckers = [];

	submitEvent = (event, callback) => {
		const { translate } = this.props;

		try {
			var formValid = this.formValidCheckers.reduce((memo, isValidFunc) => {
				return isValidFunc(true) && memo;
			}, true);
			if (formValid) {
				this.props.onSubmit(event, (err, res) => {
					if (!err) {
						this.setState({
							msg: translate("request-form.succes-message")
						});
					}
					callback(err, res);
				});
			}
		} catch (error) {
			callback(translate("unknown-error"));
		}
	};

	onSubmit = (form, callback) => {
		let event = this.formToEvent(this.props.form);

		if (this.props.isLoggedIn) {
			this.submitEvent(event, callback);
		} else {
			this.props.checkEmail(event.contactEmail, (err, res) => {
				if (err) {
					callback(err, res);
				} else if (res === true) {
					//IF email exists
					this.setState({
						showPopup: true
					});
					callback(" ", null);
				} else {
					this.submitEvent(event, callback);
				}
			});
		}
	};

	hidePopup = () => {
		this.setState({
			showPopup: false
		});
	};

	updateDate = date => {
		this.setState({ date: date });
	};
	updateLocation = ({ location, timezone }) => {
		this.setState({
			location: location,
			timeZoneId: timezone
		});
	};

	setProgress = step => {
		if (step + 1 < this.state.activeStep) {
			this.setState({ activeStep: step + 1 });
		}
	};

	render() {
		const { translate } = this.props;

		return (
			<div className="request-form">
				<Popup
					width="380px"
					showing={this.state.showPopup && !this.props.isLoggedIn}
					onClickOutside={this.hidePopup}
				>
					<div>
						<p style={{ marginBottom: "20px" }}>
							{translate("request-form.email-exists-message")}
						</p>
						<Login redirect={false} />
					</div>
				</Popup>
				<div className="request-columns">
					<div className="row center">
						{this.state.msg ? (
							<div className="col-md-8 thank-you-text">
								<p
									className="center"
									style={{
										fontSize: "32px",
										textAlign: "center",
										lineHeight: "45px"
									}}
								>
									{this.state.msg}
								</p>
							</div>
						) : (
							<div className="col-md-6">
								<Progress
									setProgress={this.setProgress}
									currentStep={this.state.activeStep - 1}
								/>
								<div className="card">
									<div
										className={
											" " + (this.state.activeStep !== 1 ? "hidden" : "show")
										}
									>
										<Step1
											translate={translate}
											form={this.props.form}
											date={this.state.date}
											initialCity={this.props.initialCity}
											updateDate={this.updateDate}
											updateLocation={this.updateLocation}
											next={() => this.setState({ activeStep: 2 })}
											formValidCheckers={this.formValidCheckers}
											checkDjAvailability={this.props.checkDjAvailability}
										/>
									</div>
									<div
										className={
											" " + (this.state.activeStep !== 2 ? "hidden" : "show")
										}
									>
										<Step2
											translate={translate}
											form={this.props.form}
											next={() => this.setState({ activeStep: 3 })}
											back={() => this.setState({ activeStep: 1 })}
											formValidCheckers={this.formValidCheckers}
										/>
									</div>
									<div
										className={
											" " + (this.state.activeStep !== 3 ? "hidden" : "show")
										}
									>
										<Step3
											translate={translate}
											form={this.props.form}
											date={this.state.date}
											next={() => this.setState({ activeStep: 4 })}
											back={() => this.setState({ activeStep: 2 })}
											formValidCheckers={this.formValidCheckers}
										/>
									</div>
									<div
										className={
											" " + (this.state.activeStep !== 4 ? "hidden" : "show")
										}
									>
										<Step4
											translate={translate}
											form={this.props.form}
											isLoggedIn={this.props.isLoggedIn}
											active={this.state.activeStep === 2}
											back={() => this.setState({ activeStep: 3 })}
											submit={this.submit}
											formValidCheckers={this.formValidCheckers}
										/>
										<Form
											noError
											customIsFormValid={() => {
												var result = this.formValidCheckers.reduce(
													(memo, isValidFunc) => {
														return isValidFunc(true) && memo;
													},
													true
												);
												return result;
											}}
											name="requestForm"
										>
											<div
												style={{
													position: "relative",
													marginTop: "20px",
													marginBottom: "20px"
												}}
											>
												<span
													className="back-button"
													onClick={() => this.setState({ activeStep: 3 })}
												>
													{translate("back")}
												</span>

												<SubmitButton
													active
													name="request_djs_button"
													onClick={this.onSubmit}
													glow
												>
													<div style={{ width: "150px" }}>
														{translate("get-offers")}
													</div>
												</SubmitButton>
											</div>
											<ErrorMessage center />
											<p style={{ textAlign: "center" }} className="terms_link">
												{translate("terms-message")}
											</p>
										</Form>
									</div>
								</div>
							</div>
						)}
					</div>
				</div>
			</div>
		);
	}
};

function mapStateToProps(state, ownProps) {
	return {
		isLoggedIn: state.login.status.signedIn,
		form: Object.assign(
			{},
			state.forms["requestForm-step-1"]
				? state.forms["requestForm-step-1"].values
				: {},
			state.forms["requestForm-step-2"]
				? state.forms["requestForm-step-2"].values
				: {},
			state.forms["requestForm-step-3"]
				? state.forms["requestForm-step-3"].values
				: {},
			state.forms["requestForm-step-4"]
				? state.forms["requestForm-step-4"].values
				: {}
		),
		initialCity: ownProps.initialCity || state.session.city,
		emailExists: state.login.status.emailExists
	};
}

function mapDispatchToProps(dispatch, ownProps) {
	return {
		onSubmit: (form, callback) => {
			dispatch(eventActions.postEvent(form, callback));
		},
		checkDjAvailability: (form, callback) => {
			dispatch(eventActions.checkDjAvailability(form, callback));
		},
		checkEmail: (email, callback) => {
			dispatch(userActions.checkEmail(email, callback));
		}
	};
}

const smartForm = connect(
	mapStateToProps,
	mapDispatchToProps
)(MainForm);

export default addTranslate(smartForm, content);

class Step1 extends PureComponent {
	state = {
		showPopup: false,
		date: moment()
	};
	validationChecker = null;

	DateChanged = date => {
		this.setState({
			date: date,
			showPopup: false
		});
		this.props.updateDate(date);
	};

	updateTimezone = timezoneID => {
		const newMoment = moment.tz(
			this.state.date.format("YYYY-MM-DDTHH:mm:ss"),
			"YYYY-MM-DDTHH:mm:ss",
			timezoneID
		);
		this.DateChanged(newMoment);
	};

	next = () => {
		const { translate } = this.props;
		if (this.validationChecker(true)) {
			this.setState({ loading: true });
			this.props.checkDjAvailability(this.props.form, (err, res, data) => {
				this.setState({ loading: false });
				if (err) {
					this.setState({
						loading: false,
						err: typeof err === "string" ? err : translate("unkown-error"),
						msg: typeof err === "string" ? err : ""
					});
				} else {
					// DJs available
					if (res === true) {
						this.setState({
							timeZoneId: data.timeZoneId,
							loading: false,
							msg: "",
							err: ""
						});
						this.updateTimezone(data.timeZoneId);
						this.props.updateLocation({
							timezone: data.timeZoneId,
							location: data.location
						});
						this.props.next();

						//not available
					} else {
						this.setState({
							loading: false,
							err: "",
							msg: translate("request-form.no-djs-message")
						});
					}
				}
			});
		}
	};

	render() {
		const { translate } = this.props;

		const eventDateString = this.state.date.format("dddd Do, MMMM YYYY");
		return (
			<div>
				<Popup
					width="380px"
					showing={this.state.showPopup}
					onClickOutside={() => this.setState({ showPopup: false })}
				>
					<DatePicker
						dark
						initialDate={this.state.date}
						handleChange={this.DateChanged}
					/>
				</Popup>
				<Form
					registerCheckForm={checker => {
						this.validationChecker = checker;
						this.props.formValidCheckers.push(checker);
					}}
					//formValidCallback={(name)=>this.props.updateProgress(name,true)}
					//formInvalidCallback={(name)=>this.props.updateProgress(name,false)}
					name="requestForm-step-1"
				>
					<h3 className="center">{translate("request-form.step-1.header")}</h3>
					<section>
						<label htmlFor="location">
							{translate("request-form.step-1.event-location")}
						</label>
						<LocationSelector
							name="location"
							placeholder={translate("city")}
							validate={["required"]}
							value={
								this.props.initialCity !== ""
									? this.props.initialCity
									: undefined
							}
						/>
						<p>{translate("request-form.step-1.event-location-description")}</p>
					</section>
					<section
						className="cursor-pointer"
						onClick={() => {
							this.setState({ showLogin: false, showPopup: true });
						}}
					>
						<label>{translate("request-form.step-1.event-date")}</label>
						<TexfieldDisconnected
							name="date"
							disabled
							value={eventDateString}
						/>
						<p>{translate("request-form.step-1.event-date-description")}</p>
					</section>

					<Button
						type="submit"
						isLoading={this.state.loading}
						onClick={this.next}
					>
						{translate("continue")}
					</Button>
				</Form>

				<p
					style={{ marginTop: "5px" }}
					className={this.state.err ? "error center" : "center"}
				>
					{this.state.err
						? this.state.err
						: this.state.msg
							? this.state.msg
							: null}
				</p>
			</div>
		);
	}
}
class Step2 extends PureComponent {
	validationChecker = null;

	state = {
		showGenres: false
	};
	next = () => {
		if (this.validationChecker(true)) {
			this.props.next();
		}
	};

	handleGenreSelection = letCueupDecide => {
		this.setState({
			showGenres: !letCueupDecide
		});
	};

	render() {
		const { translate } = this.props;
		const { showGenres } = this.state;
		return (
			<Form
				registerCheckForm={checker => {
					this.validationChecker = checker;
					this.props.formValidCheckers.push(checker);
				}}
				//  formValidCallback={(name)=>this.props.updateProgress(name,true)}
				// formInvalidCallback={(name)=>this.props.updateProgress(name,false)}
				name="requestForm-step-2"
			>
				<h3>{translate("request-form.step-2.header")}</h3>
				<section>
					<label htmlFor="name">
						{translate("request-form.step-2.event-name")}
					</label>
					<TextField name="name" validate={["required"]} />
					<p>{translate("request-form.step-2.event-name-description")}</p>
				</section>
				<section>
					<label>{translate("request-form.step-2.event-rider")}</label>
					<p style={{ marginBottom: "10px" }}>
						{translate("request-form.step-2.event-rider-description")}
					</p>
					<RiderOptions
						speakersLabel={translate("speakers")}
						lightsLabel={translate("lights")}
						name="rider"
					/>
				</section>
				<section>
					<label>{translate("request-form.step-2.event-genres")}</label>
					<p style={{ marginBottom: "10px" }}>
						{translate("request-form.step-2.event-genres-description")}
					</p>
					<GenreChooser
						letCueupDecide={this.handleGenreSelection}
						validate={["required"]}
						chooseLabel={translate("request-form.choose-genres")}
						cueupDecideLabel={translate("request-form.let-cueup-decide")}
						cueupDecideDescription={translate(
							"request-form.let-cueup-decide-description"
						)}
						name="genres"
					/>
					{showGenres ? (
						<ToggleButtonHandler
							validate={["required"]}
							name="genres"
							potentialValues={c.GENRES}
							columns={4}
						/>
					) : null}
				</section>
				<div style={{ position: "relative" }}>
					<span className="back-button" onClick={this.props.back}>
						{translate("back")}
					</span>
					<Button type="submit" onClick={this.next}>
						{translate("continue")}
					</Button>
				</div>
			</Form>
		);
	}
}

class Step3 extends PureComponent {
	state = { guests: 50 };

	validationChecker = null;

	next = () => {
		if (this.validationChecker(true)) {
			this.props.next();
		}
	};

	render() {
		const { translate } = this.props;

		return (
			<Form
				registerCheckForm={checker => {
					this.validationChecker = checker;
					this.props.formValidCheckers.push(checker);
				}}
				// formValidCallback={(name)=>this.props.updateProgress(name,true)}
				// formInvalidCallback={(name)=>this.props.updateProgress(name,false)}
				name="requestForm-step-3"
			>
				<h3>{translate("request-form.step-3.header")}</h3>
				<section>
					<label>{translate("request-form.step-3.music-duration")}</label>
					<TimeSlider
						hoursLabel={translate("hours")}
						startLabel={translate("start")}
						endLabel={translate("end")}
						date={this.props.date}
					/>
				</section>

				<section>
					<label>{translate("request-form.step-3.guests")}</label>
					<div>
						<Slider
							name="guests"
							range={{
								min: 1,
								"50%": 100,
								"80%": 500,
								max: 1000
							}}
							step={1}
							connect="lower"
							value={[50]}
							onChange={values => {
								this.setState({
									guests: values[0]
								});
							}}
							format={wNumb({
								decimals: 0
							})}
						/>
					</div>
					<p style={{ marginTop: "15px" }}>
						{translate("request-form.step-3.guests-description", {
							prefix:
								this.state.guests === 1000
									? translate("over")
									: translate("around"),
							amount: this.state.guests
						})}
					</p>
				</section>
				<section>
					<label htmlFor="description">
						{translate("request-form.step-3.event-description")}
					</label>
					<TextBox
						height="110px"
						placeholder={translate(
							"request-form.step-3.event-description-description"
						)}
						name="description"
						validate={["required"]}
					/>
				</section>
				<div style={{ position: "relative" }}>
					<span className="back-button" onClick={this.props.back}>
						{translate("back")}
					</span>
					<Button type="submit" onClick={this.next}>
						{translate("continue")}
					</Button>
				</div>
			</Form>
		);
	}
}

class Step4 extends PureComponent {
	state = { showPopup: false };

	onSubmit = (form, callback) => {
		const { translate } = this.props;

		if (this.context.isFormValid(true)) {
			this.props.onSubmit(form, (err, res) => {
				if (!err) {
					this.setState({ msg: translate("request-form.succes-message") });
				}
				callback(err, res);
			});
		} else {
			callback(translate());
		}
	};

	render() {
		const { translate } = this.props;

		return (
			<div>
				<Form
					registerCheckForm={checker =>
						this.props.formValidCheckers.push(checker)
					}
					//formValidCallback={(name)=>this.props.updateProgress(name,true)}
					//formInvalidCallback={(name)=>this.props.updateProgress(name,false)}
					name="requestForm-step-4"
				>
					<h3>{translate("request-form.step-4.header")}</h3>
					<section>
						<label htmlFor="contactName">
							{translate("request-form.step-4.contact-name")}
						</label>
						<TextField
							name="contactName"
							placeholder={translate("first-last")}
							validate={["required", "lastName"]}
						/>
						<p>{translate("request-form.step-4.contact-name-description")}</p>
					</section>

					<section>
						<label htmlFor="contactName">
							{translate("request-form.step-4.contact-phone")}
						</label>
						<TextField
							placeholder={translate("optional")}
							name="contactPhone"
							validate={[]}
						/>
						<p>{translate("request-form.step-4.contact-phone-description")}</p>
					</section>
					<section>
						<label htmlFor="contactEmail">
							{translate("request-form.step-4.contact-email")}
						</label>
						<TextField
							name="contactEmail"
							placeholder="Email"
							validate={["required", "email"]}
						/>
						<p>{translate("request-form.step-4.contact-email-description")}</p>
					</section>
				</Form>
			</div>
		);
	}
}
