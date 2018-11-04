import React from "react";
import Button from "../Button-v2";

export default ({ closeModal, translate: t, ...props }) => (
	<div className="reminder-popup">
		<h2 className="center">
			{t("Remember to get paid using Cueup to enjoy the benefits")}
		</h2>
		<ul className="checklist">
			<li>{t("Guarenteed payout to your bank account.")}</li>
			<li>
				{t(
					"We got you covered - enforcing your own cancelation policy in case the organizer cancels."
				)}
			</li>
			<li>{t("We'll find a replacement in case you have to cancel.")}</li>
			<li>
				{t(
					"Build your reputation, collect Cueup points, gain exposure on google and get more gigs."
				)}
			</li>
			<li className="soon">{t("Coming soon: discount at partners.")}</li>
			<li className="soon">
				{t("Coming soon: create and manage invoices for your customers.")}
			</li>
		</ul>
		<Button active glow onClick={closeModal}>
			{t("got it!")}
		</Button>
	</div>
);
