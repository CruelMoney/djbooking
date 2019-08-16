import React, { useState, useEffect } from "react";
import { Title, Body, HeaderTitle } from "../../../../components/Text";
import { Col } from "../../../../components/Blocks";
import DjCard from "../../components/blocks/DJCard";
import { useQuery } from "react-apollo";
import { EVENT_GIGS } from "../../gql";
import { LoadingPlaceholder2 } from "../../../../components/common/LoadingPlaceholder";
import { notificationService } from "../../../../utils/NotificationService";
import { captureException } from "@sentry/core";
import EmptyPage from "../../../../components/common/EmptyPage";

const EventGigs = React.forwardRef(
	({ theEvent = {}, loading: loadingEvent, translate }, ref) => {
		const { status } = theEvent;

		const [gigMessages, setGigMessages] = useState([]);
		const { data = {}, loading: loadingGigs } = useQuery(EVENT_GIGS, {
			skip: !theEvent.id,
			variables: {
				id: theEvent.id,
				hash: theEvent.hash
			}
		});

		useEffect(() => {
			const connect = async () => {
				try {
					notificationService.init(theEvent.organizer.id);
					const res = await notificationService.getChatStatus();
					setGigMessages(res);
				} catch (error) {
					console.log(error);
					captureException(error);
				}
			};
			if (theEvent && theEvent.organizer) {
				connect();
			}
		}, [theEvent]);

		const readRoom = () => setGigMessages([]);

		const gigs = data.event ? data.event.gigs : [];
		const loading = loadingEvent || loadingGigs;

		debugger;
		return (
			<Col ref={ref}>
				<Title>We've found these DJs for you</Title>
				<Body>{getText(status)}</Body>
				{loading ? (
					<LoadingPlaceholder2 style={{ marginTop: "30px" }} />
				) : (
					gigs.map((gig, idx) => (
						<DjCard
							hasMessage={
								gigMessages[gig.id] &&
								gigMessages[gig.id].read < gigMessages[gig.id].total
							}
							onOpenChat={readRoom}
							key={gig.id}
							idx={idx}
							gig={gig}
							translate={translate}
							theEvent={theEvent}
						/>
					))
				)}

				{!loading && gigs.length === 0 && (
					<EmptyPage
						title="No DJs"
						message={"No DJs here at the moment, come back later."}
					/>
				)}
			</Col>
		);
	}
);

const getText = status => {
	switch (status) {
		case "ACCEPTED":
			return "Choose and book one of the dj’s below. Remember quality follows price. If you have any questions, you can message the dj’s. Once you have confirmed a dj, you’ll be able to see additional information such as phone number.";

		default:
			return "The dj’s have not made any offers yet. In the meantime you check out their profiles or message them. We’ll notify you by email when someone makes an offer or messages you.";
	}
};

const Overview = props => {
	const { theEvent, loading, translate } = props;
	if (loading) {
		return <LoadingPlaceholder2 />;
	}
	if (theEvent && theEvent.status === "FINISHED") {
		const { chosenGig } = theEvent;

		return (
			<Col>
				<HeaderTitle style={{ color: "#122b48" }}>
					Event is finished
				</HeaderTitle>
				<Body>
					The event is finished, we hope you had a blast.
					<br />
					Remember to review the DJ that played at the event.
				</Body>
				{chosenGig && (
					<DjCard
						key={chosenGig.id}
						idx={0}
						gig={chosenGig}
						translate={translate}
						theEvent={theEvent}
					/>
				)}
			</Col>
		);
	}
	if (theEvent && theEvent.status === "CANCELLED") {
		return (
			<Col>
				<HeaderTitle style={{ color: "#122b48" }}>Event cancelled</HeaderTitle>
				<Body>The event has been cancelled.</Body>
			</Col>
		);
	}

	return <EventGigs {...props} />;
};

export default Overview;
