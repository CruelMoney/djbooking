import React, { useState } from "react";
import { ReadMoreButton } from "./Blocks";
import { Body } from "./Text";

const ReadMoreExpander = ({ content }) => {
	const [expanded, setExpanded] = useState(false);

	const shouldTruncate = content.length > 350;
	const truncated = shouldTruncate
		? content.substring(0, 350) + "..."
		: content;

	return (
		<>
			<Body style={{ whiteSpace: "pre-wrap" }}>
				{expanded ? content : truncated}
			</Body>
			{shouldTruncate ? (
				<ReadMoreButton onClick={_ => setExpanded(s => !s)}>
					{expanded ? "Read less" : "Read more"}
				</ReadMoreButton>
			) : null}
		</>
	);
};

export default ReadMoreExpander;
