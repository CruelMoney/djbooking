import React, { PureComponent } from "react";
import Button from "../Button-v2";
import ToggleButtonHandler from "../ToggleButtonHandler";
import Form from "../Form-v2";
import GenreChooser from "./GenreChooser";
import c from "../../../constants/constants";
import Textfield from "../Textfield";
import RiderOptions from "../RiderOptions2";

export default class Step2 extends PureComponent {
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
					<Textfield name="name" validate={["required"]} />
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
