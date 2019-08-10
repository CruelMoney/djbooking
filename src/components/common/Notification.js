import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { Spinner } from "react-activity";
import "react-activity/lib/Spinner/Spinner.css";

const Notification = ({
	overlay,
	loading,
	children,
	active,
	bottom,
	message = "You have no new notifications"
}) => {
	const [show, setShow] = useState(false);

	useEffect(() => {
		setShow(true);
	}, []);

	if (!show) {
		return null;
	}

	return createPortal(
		<div
			className={`center ${overlay ? "notification-overlay" : ""} ${
				active ? "active" : ""
			} ${bottom ? "bottom" : ""}`}
		>
			<div className="notification">
				<div>
					{loading && <Spinner color="#fff" />}
					{children || <p style={{ marginLeft: "8px" }}>{message}</p>}
				</div>
			</div>
		</div>,
		document.querySelector("#notification-portal")
	);
};

export default Notification;
