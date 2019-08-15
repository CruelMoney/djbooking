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
import { UPDATE_EVENT } from "../../../gql";
import { Mutation } from "react-apollo";

class Profile extends Component {
	state = {
		formValid: false
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
							<UpdateEventButton
								translate={translate}
								id={theEvent.id}
								hash={this.props.hashKey}
							/>

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
									name="contactEmail"
									type="contactEmail"
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

const UpdateEventButton = ({ translate, id, hash }) => {
	return (
		<Mutation mutation={UPDATE_EVENT}>
			{(update, { loading, data }) => (
				<SubmitButton
					isLoading={loading}
					succes={!!data}
					name={"update_settings"}
					onClick={async (form, cb) => {
						try {
							await update({
								variables: {
									id,
									hash,
									...form.values
								}
							});
							cb();
						} catch (error) {
							cb(error);
						}
					}}
				>
					{translate("Save changes")}
				</SubmitButton>
			)}
		</Mutation>
	);
};

export default addTranslate(Profile);
