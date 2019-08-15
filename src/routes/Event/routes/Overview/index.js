import React from "react";
import { Title, Body } from "../../../../components/Text";
import { Col } from "../../../../components/Blocks";

const Overview = ({ theEvent }) => {
	return (
		<Col>
			<Title>We found these DJs for you</Title>
			<Body>
				The dj’s have not made any offers yet. In the meantime you check out
				their profiles or message them. We’ll notify you by email when someone
				gives an offer.
			</Body>
		</Col>
	);
};

export default Overview;
