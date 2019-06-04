import React, { PureComponent } from "react";
import Button from "../Button-v2";
import Form from "../Form-v2";
import Slider from "../Slider";
import TimeSlider from "../TimeSlider";
import TextBox from "../TextBox";
import wNumb from "wnumb";

export default class Step3 extends PureComponent {
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
