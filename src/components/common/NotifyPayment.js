import React, { useState } from "react";
import TextWrapper from "./TextElement";
import Button from "./Button-v2";
import { connect } from "react-redux";
import * as actions from "../../actions/EventActions";
import { getTranslate, getActiveLanguage } from "react-localize-redux";

const NotifyPayment = ({
	translate,
	eventId,
	hashKey,
	notify,
	daysUntilPaymentPossible
}) => {
	const [loading, setLoading] = useState(false);
	const [succes, setSucces] = useState(false);

	const askForNotification = () => {
		setLoading(true);
		notify(eventId, hashKey, _ => {
			setLoading(false);
			setSucces(true);
		});
	};

	return (
		<div className="notify-pay-form">
			<TextWrapper
				label={translate("Pay")}
				showLock={true}
				text={translate("event.offer.pay-later")}
			/>
			<Button
				glow
				active
				isLoading={loading}
				succes={succes}
				onClick={askForNotification}
			>
				{translate("event.offer.pay-later-2", {
					days: daysUntilPaymentPossible
				})}
			</Button>
		</div>
	);
};

function mapStateToProps(state, ownprops) {
	return {
		translate: getTranslate(state.locale),
		currentLanguage: getActiveLanguage(state.locale).code
	};
}

function mapDispatchToProps(dispatch, ownprops) {
	return {
		notify: (id, hash, callback) =>
			dispatch(actions.notifyPayment(id, hash, callback))
	};
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(NotifyPayment);
