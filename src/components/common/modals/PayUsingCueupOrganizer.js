import React from "react";
import Button from "../Button-v2";

export default ({ closeModal, translate: t, ...props }) => (
	<div className="reminder-popup">
		<h2 className="center">
			{t("Remember to pay using Cueup to enjoy the benefits")}
		</h2>
		<ul className="checklist">
			<li>{t("Easy and safe transaction using your credit card.")}</li>
			<li>{t("We got you covered - full refund in case the DJ cancels.")}</li>
			<li>{t("Quickly get a new DJ in case of cancelation.")}</li>
			<li>{t("Manage all your events in the Cueup dashboard.")}</li>
			<li className="soon">{t("Coming soon: discount at partners.")}</li>
			<li className="soon">
				{t("Coming soon: easily request invoices and receipts.")}
			</li>
		</ul>
		<Button active glow onClick={closeModal}>
			{t("got it!")}
		</Button>
	</div>
);
