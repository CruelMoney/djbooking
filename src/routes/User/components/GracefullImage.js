import React, { useState } from "react";
import styled, { keyframes } from "styled-components";

const fadeIn = keyframes`
    from { opacity: 0; }
    to   { opacity: 1; }

`;

const StyledImg = styled.img`
	animation: ${fadeIn} 400ms ease;
	animation-duration: ${({ animate }) => (animate ? "400ms" : "0ms")};
`;

function useImageLoaded({ src }) {
	const [loaded, setLoaded] = useState(false);
	React.useEffect(() => {
		if (src) {
			const mainImage = new Image();
			mainImage.onload = () => {
				setLoaded(true);
			};

			mainImage.src = src;
			return () => {
				mainImage.onload = () => {};
			};
		}
	}, [src]);

	return loaded;
}

const GracefullImage = ({ src, style, alt, ...props }) => {
	const loaded = useImageLoaded({
		src
	});

	if (!loaded) {
		return (
			<div
				style={{
					...style,
					backgroundColor: "#EFF2F5"
				}}
				{...props}
			></div>
		);
	}

	return <StyledImg src={src} style={style} alt={alt} {...props} />;
};

export default GracefullImage;
