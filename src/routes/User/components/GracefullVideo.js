import React, { useState, useRef } from "react";
import styled from "styled-components";
import { LoadingIndicator } from "./Blocks";

const Wrapper = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
`;

const StyledVideo = styled.video`
	position: absolute;
	top: 0;
	left: 0;
	bottom: 0;
	right: 0;
	width: 100%;
	height: 100%;
	z-index: 1;
	object-fit: cover;
	pointer-events: none;
`;

const GracefullVideo = ({ src, ...props }) => {
	const [loaded, setLoaded] = useState(false);

	return (
		<Wrapper>
			<StyledVideo onCanPlay={() => setLoaded(true)} {...props}>
				<source src={src} />
			</StyledVideo>
			{!loaded && <LoadingIndicator />}
		</Wrapper>
	);
};

export default GracefullVideo;
