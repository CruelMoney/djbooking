import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { ReadMoreButton, TeritaryButton } from "./Blocks";
import { Body } from "./Text";

const Wrapper = styled.div`
	position: relative;
`;

const ReadMoreExpander = ({ id, content, onTextSelected }) => {
	const [expanded, setExpanded] = useState(false);

	const shouldTruncate = content.length > 350;
	const truncated = shouldTruncate
		? content.substring(0, 350) + "..."
		: content;

	const handleSelection = e => {
		if (onTextSelected) {
			const selection = window.getSelection();
			const range = selection.getRangeAt(0);
			const rect = range.getClientRects()[0];
			const text = selection.toString().trim();

			class VirtualReference {
				getBoundingClientRect() {
					return rect;
				}
				get clientWidth() {
					return this.getBoundingClientRect().width;
				}

				get clientHeight() {
					return this.getBoundingClientRect().height;
				}
			}
			if (text.length > 10) {
				const virtualReferenceElement = new VirtualReference();
				onTextSelected(virtualReferenceElement, text);
			} else {
				onTextSelected(null, null);
			}
		}
	};

	return (
		<Wrapper>
			<Body style={{ whiteSpace: "pre-wrap" }} onMouseUp={handleSelection}>
				{expanded ? content : truncated}
			</Body>
			{shouldTruncate ? (
				<ReadMoreButton onClick={_ => setExpanded(s => !s)}>
					{expanded ? "Read less" : "Read more"}
				</ReadMoreButton>
			) : null}
		</Wrapper>
	);
};

export default ReadMoreExpander;
