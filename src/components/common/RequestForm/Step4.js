import React, { PureComponent } from "react";
import TextField from "../Textfield";
import Form from "../Form-v2";

export default class Step4 extends PureComponent {
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
