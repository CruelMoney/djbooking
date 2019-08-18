import React from "react";
import { Title } from "../../../../components/Text";
import { Col } from "../../../../components/Blocks";

const Review = React.forwardRef(({ theEvent = {}, translate }, ref) => {
	return (
		<Col ref={ref}>
			<Title>Review</Title>
		</Col>
	);
});

export default Review;
