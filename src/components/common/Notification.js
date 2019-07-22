import React from "react";
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
	return (
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
		</div>
	);
};

export default Notification;
