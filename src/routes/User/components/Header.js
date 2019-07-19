import React from "react";
import styled from "styled-components";

const GradientBg = styled.section`
	min-height: 300px;
	background-image: linear-gradient(
			-180deg,
			rgba(0, 0, 0, 0) 0%,
			rgba(0, 0, 0, 0.5) 100%
		),
		linear-gradient(56deg, #31fff5 0%, #31ffc5 11%, #00d1ff 80%, #32daff 87%);

	flex: 1;
	display: flex;
`;

const Header = () => {
	return <GradientBg>Header</GradientBg>;
};

export default Header;
