import React from "react";
import { localize } from "react-localize-redux";

const ContactReminder = ({ translate, content, ...props }) => (
	<div className="reminder">
		{content ? content : translate("Remember to pay using Cueup")}
	</div>
);

export default localize(ContactReminder, "locale");
