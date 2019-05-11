import React from "react";
import { Mutation } from "react-apollo";
import { REQUEST_EMAIL_VERIFICATION } from "../gql";
import c from "../../constants/constants";

export const getErrorMessage = error => {
	let msgs = "There was an error";

	if (!error) return null;
	if (typeof error === "string") {
		msgs = error;
	}

	const { graphQLErrors } = error;

	if (error.message && !graphQLErrors) {
		return error.message;
	}

	if (graphQLErrors && graphQLErrors.length > 0) {
		graphQLErrors.map(e => (msgs = e.message));
	}

	return msgs;
};

const ErrorMessageApollo = ({ error, center, email }) => {
	let msgs = ["There was an error"];
	let showResend = false;

	if (!error) return null;
	if (typeof error === "string") {
		msgs = [error];
	}

	const { graphQLErrors } = error;

	if (graphQLErrors && graphQLErrors.length > 0) {
		msgs = [];
		graphQLErrors.map((e, idx) => {
			msgs.push(e.message);
			if (e.extensions.code === "EMAIL_NOT_VERIFIED") {
				showResend = true;
			}
		});
	}

	return (
		<div className={"errors" + (center ? " center " : "")}>
			{msgs.map((m, idx) => {
				return <p key={idx}>{m}</p>;
			})}
			{showResend && <ResendVerificationEmail email={email} />}
		</div>
	);
};

const ResendVerificationEmail = ({ email }) => {
	return (
		<Mutation
			mutation={REQUEST_EMAIL_VERIFICATION}
			variables={{
				email,
				redirectLink: c.Environment.CALLBACK_DOMAIN
			}}
		>
			{(mutate, { loading, data, error }) => {
				return (
					<button
						disabled={loading || data || error}
						className={"link"}
						onClick={mutate}
					>
						{loading
							? "Sending"
							: data
								? "Email sent"
								: "Resend verification email"}
					</button>
				);
			}}
		</Mutation>
	);
};

export default ErrorMessageApollo;
