import React, { useState } from "react";
import { CTAButton } from "./Sidebar";
import PayForm from "../../../components/common/PayForm.js";
import Popup from "../../../components/common/Popup";
import { useQuery } from "react-apollo";
import { NavLink } from "react-router-dom";
import queryString from "query-string";
import { GIG } from "../gql";
import { LoadingIndicator } from "../../../components/Blocks";

const BookingButton = ({ user, location }) => {
	const [showPopup, setShowPopup] = useState(false);

	// check for gigId
	const queries = queryString.parse(location.search);
	let gigId = queries.gigId;

	if (!gigId && location && location.state) {
		gigId = location.state.gigId;
	}

	const { data = {}, loading } = useQuery(GIG, {
		skip: !gigId,
		variables: {
			id: gigId
		}
	});

	if (!user) {
		return null;
	}

	if (loading) {
		return (
			<CTAButton disabled>
				<LoadingIndicator />
			</CTAButton>
		);
	}

	if (user.isOwn) {
		return (
			<CTAButton
				onClick={() => window.alert("Are you trying to book yourself? 🧐")}
			>
				REQUEST BOOKING
			</CTAButton>
		);
	}

	const { gig } = data;

	const canBePaid =
		gig &&
		gig.offer &&
		gig.status === "ACCEPTED" &&
		gig.event.status === "ACCEPTED";

	if (canBePaid) {
		const { offer, event } = gig;
		return (
			<>
				<CTAButton onClick={() => setShowPopup(true)}>
					BOOK {offer.totalPayment.formatted}
				</CTAButton>
				<Popup
					showing={showPopup}
					onClickOutside={() => setShowPopup(false)}
					noPadding
				>
					<PayForm id={gig.id} offer={offer} event={event} />
				</Popup>
			</>
		);
	}

	return (
		<NavLink to="booking">
			<CTAButton>REQUEST BOOKING</CTAButton>
		</NavLink>
	);
};

export default BookingButton;
