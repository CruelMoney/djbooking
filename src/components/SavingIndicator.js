import React, { useState, useEffect } from "react";
import Notification from "./common/Notification";
import ErrorMessageApollo from "./common/ErrorMessageApollo";

const SavingIndicator = ({ loading, error, message }) => {
	const [active, setActive] = useState(false);

	useEffect(() => {
		if (loading === false) {
			const r = setTimeout(_ => setActive(false), error ? 10000 : 1000);
			return _ => clearTimeout(r);
		} else {
			setActive(true);
		}
	}, [error, loading]);

	return (
		<Notification
			overlay
			bottom
			active={active}
			loading={loading}
			message={message || "Saving"}
		>
			{error && <ErrorMessageApollo error={error} />}
		</Notification>
	);
};

export default SavingIndicator;
