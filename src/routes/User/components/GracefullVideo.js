import React, { useState, useRef } from "react";
import styled, { keyframes } from "styled-components";

const StyledVideo = styled.video``;

function useVideoLoaded({ ref }) {
	const [loaded, setLoaded] = useState(false);
	React.useEffect(() => {
		if (ref) {
			ref.oncanplay = () => {
				setLoaded(true);
			};
			return () => {
				ref.oncanplay = () => {};
			};
		}
	}, [ref]);

	return loaded;
}

const GracefullVideo = ({ ...props }) => {
	const ref = useRef();
	const loaded = useVideoLoaded({
		ref: ref.current
	});

	return <StyledVideo {...props} />;
};

export default GracefullVideo;
