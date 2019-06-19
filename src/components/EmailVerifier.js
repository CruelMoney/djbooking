import React, { useEffect, useState } from "react";
import Notification from "./common/Notification";
import { Mutation } from "react-apollo";
import { VERIFY_EMAIL } from "./gql";
import ErrorMessageApollo from "./common/ErrorMessageApollo";

const EmailVerifier = ({ onVerified }) => {
	const [state, setState] = useState({});

	useEffect(() => {
		const parsedUrl = new URL(window.location.href);
		const verifyToken = parsedUrl.searchParams.get("token");
		const isEmailValidation = parsedUrl.searchParams.get("emailVerification");

		setState({ isEmailValidation, verifyToken });
	}, []);

	const { verifyToken, isEmailValidation } = state;

	if (!verifyToken || !isEmailValidation) return null;

	return (
		<Mutation
			mutation={VERIFY_EMAIL}
			onError={console.log}
			onCompleted={onVerified}
		>
			{(mutate, { loading, error, data }) => (
				<EmailVerifyIndicator
					verifyToken={verifyToken}
					mutate={mutate}
					loading={loading}
					data={data}
					error={error}
				/>
			)}
		</Mutation>
	);
};

const EmailVerifyIndicator = ({
	verifyToken,
	mutate,
	loading,
	data,
	error
}) => {
	useEffect(() => {
		const verifyEmail = async () => {
			await mutate({
				variables: {
					verifyToken
				}
			});
		};
		verifyEmail();
	}, [verifyToken, mutate]);

	const [active, setActive] = useState(true);
	useEffect(() => {
		if (loading === false) {
			// TODO should remove params here
			const r = setTimeout(_ => setActive(false), 10000);
			return _ => clearTimeout(r);
		}
	}, [loading]);

	return (
		<Notification
			overlay
			active={active}
			loading={loading}
			message={data ? "Email verified" : "Verifying email"}
		>
			{error && <ErrorMessageApollo error={error} />}
		</Notification>
	);
};

export default EmailVerifier;
