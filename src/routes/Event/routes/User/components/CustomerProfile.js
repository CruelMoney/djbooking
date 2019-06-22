import React, { Component } from "react";
import SubmitButton from "../../../../../components/common/SubmitButton";
import Button from "../../../../../components/common/Button-v2";
import TextField from "../../../../../components/common/Textfield";
import Form from "../../../../../components/common/Form-v2";
import TextWrapper from "../../../../../components/common/TextElement";
import ErrorMessage from "../../../../../components/common/ErrorMessage";
import { requestFeatures } from "../../../../../actions/Common";
import { Helmet } from "react-helmet-async";

import addTranslate from "../../../../../components/higher-order/addTranslate";

class Profile extends Component {
	componentWillMount() {}

	state = {
		formValid: false
	};

	update = (form, callback) => {
		const { theEvent, save } = this.props;
		let event = { ...theEvent, ...form.values };
		save(event, callback);
	};

	render() {
		const { translate, theEvent } = this.props;
		const title = theEvent.name + " | " + translate("Contact");

		return (
			<div className="row event-information">
				<Helmet>
					<title>{title}</title>
					<meta property="og:title" content={title} />
					<meta name="twitter:title" content={title} />
				</Helmet>
				<Form
					noError
					formInvalidCallback={() => this.setState({ formValid: false })}
					formValidCallback={() => this.setState({ formValid: true })}
					name="customer-information-form"
				>
					<div className="context-actions-wrapper">
						<div className="context-actions" key="profile_actions">
							<SubmitButton
								active={this.state.formValid}
								onClick={this.update}
								name="update_settings"
							>
								{translate("Save changes")}
							</SubmitButton>

							<Button onClick={() => requestFeatures()} name="request_features">
								{translate("Request features")}
							</Button>
							<ErrorMessage />
						</div>
					</div>
					<div className="event-card-wrapper">
						<div className="card profile col-md-7">
							<TextWrapper
								label={translate("Contact name")}
								text={translate("event.contact.name")}
							>
								<TextField
									value={theEvent.contactName}
									name="contactName"
									validate={["required"]}
								/>
							</TextWrapper>
							<TextWrapper
								label="Email"
								text={translate("event.contact.email")}
							>
								<TextField
									value={theEvent.contactEmail}
									name="email"
									type="email"
									validate={["required", "email"]}
									disabled
								/>
							</TextWrapper>

							<TextWrapper
								label={translate("Phone number")}
								text={translate("event.contact.phone")}
							>
								<TextField
									name="contactPhone"
									value={theEvent.contactPhone}
									type="tel"
								/>
							</TextWrapper>
						</div>
					</div>
				</Form>
			</div>
		);
	}
}

export default addTranslate(Profile);
