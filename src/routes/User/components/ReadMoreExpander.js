import React, { useState, useEffect, useRef } from "react";
import { Popper } from "react-popper";
import styled from "styled-components";
import { ReadMoreButton, TeritaryButton } from "./Blocks";
import { Body } from "./Text";
import ReactDOM from "react-dom";

const Wrapper = styled.div`
	position: relative;
`;

const HighlightTooltip = styled.div`
	background: rgba(0, 0, 0, 0.84);
	border-radius: 4px;
`;

const ReadMoreExpander = ({ content, onTextSelected }) => {
	const [expanded, setExpanded] = useState(false);
	const [virtualReferenceElement, setVirtualReferenceElement] = useState(null);

	const shouldTruncate = content.length > 350;
	const truncated = shouldTruncate
		? content.substring(0, 350) + "..."
		: content;

	const handleSelection = e => {
		const selection = window.getSelection();
		const range = selection.getRangeAt(0);
		const rect = range.getClientRects()[0];
		const text = selection.toString();

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
		const virtualReferenceElement = new VirtualReference();
		setVirtualReferenceElement(virtualReferenceElement);
		debugger;
	};

	useEffect(() => {
		const removePopup = () => {
			setVirtualReferenceElement(null);
		};
		window.addEventListener("mousedown", removePopup);
		return () => window.removeEventListener("mousedown", removePopup);
	});

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
			{virtualReferenceElement
				? ReactDOM.createPortal(
						<Popper
							referenceElement={virtualReferenceElement}
							eventsEnabled={false}
						>
							{({ ref, style, placement, arrowProps }) => (
								<div ref={ref} style={style} data-placement={placement}>
									<HighlightTooltip>
										<TeritaryButton style={{ color: "#fff" }}>
											Highlight on profile
										</TeritaryButton>
									</HighlightTooltip>
								</div>
							)}
						</Popper>,
						document.querySelector("#tooltip-portal")
				  )
				: null}
		</Wrapper>
	);
};

export default ReadMoreExpander;
