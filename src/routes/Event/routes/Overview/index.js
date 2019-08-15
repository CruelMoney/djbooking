import React from "react";
import { Title, Body } from "../../../../components/Text";
import { Col } from "../../../../components/Blocks";
import DjCard from "../../components/blocks/DJCard";
import { useQuery } from "react-apollo";
import { EVENT_GIGS } from "../../gql";
import { LoadingPlaceholder2 } from "../../../../components/common/LoadingPlaceholder";

const Overview = React.forwardRef(({ theEvent = {}, translate }, ref) => {
	const { status } = theEvent;
	const { data = {}, loading } = useQuery(EVENT_GIGS, {
		variables: {
			id: theEvent.id,
			hash: theEvent.hash
		}
	});

	const gigs = data.event ? data.event.gigs : [];

	return (
		<Col ref={ref}>
			<Title>We found these DJs for you</Title>
			<Body>{getText(status)}</Body>
			{loading ? (
				<LoadingPlaceholder2 style={{ marginTop: "30px" }} />
			) : (
				gigs.map((gig, idx) => (
					<DjCard key={gig.id} idx={idx} gig={gig} translate={translate} />
				))
			)}
		</Col>
	);
});

const getText = status => {
	switch (status) {
		case "ACCEPTED":
			return "Choose and book one of the dj’s below. Remember quality follows price. If you have any questions, you can message the dj’s. Once you have confirmed a dj, you’ll be able to see additional information such as phone number.";

		default:
			return "The dj’s have not made any offers yet. In the meantime you check out their profiles or message them. We’ll notify you by email when someone makes an offer or messages you.";
	}
};

export default Overview;
