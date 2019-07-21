import React from "react";
import styled from "styled-components";
import Arrow from "react-ionicons/lib/MdArrowRoundForward";

export const MarginBottom = styled.div`
	margin-bottom: 48px;
`;

export const Container = styled.div`
	max-width: 1260px;
	width: 100%;
	margin: 0 auto;
	padding: 0 30px;
`;

export const Col = styled.div`
	display: ${({ mobileOnly }) => (mobileOnly ? "none" : "flex")};
	flex-direction: column;
	@media only screen and (max-width: 768px) {
		display: ${({ mobileHide }) => (mobileHide ? "none" : "flex")};
	}
`;
export const Row = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: ${({ center }) => (center ? "center" : "flex-start")};
	align-items: ${({ middle }) => (middle ? "center" : "flex-start")};
`;
export const FullWidthCol = styled(Col)`
	width: 100%;
`;

export const Divider = styled.hr`
	border-top: 1px solid #e9ecf0;
	margin: 24px 0;
`;

const TertiaryButton = styled.span`
	font-family: "AvenirNext-DemiBold";
	font-size: 12px;
	color: #4d6480;
	letter-spacing: 1.04px;
	text-align: left;
	text-transform: uppercase;
`;

const ButtonIcon = styled.span`
	margin-left: 15px;
	top: 3px;
	display: inline-block;
	transition: transform 200ms ease;
	${TertiaryButton}:hover & {
		transform: translateX(3px);
	}
`;

const ReadMore = ({ children, ...props }) => {
	return (
		<TertiaryButton {...props}>
			{children}
			<ButtonIcon>
				<Arrow fontSize={15} color={"#4d6480"} />
			</ButtonIcon>
		</TertiaryButton>
	);
};

export const ReadMoreButton = ({ children, onClick, style }) => {
	return (
		<button
			onClick={onClick}
			style={{
				padding: 0,
				border: "none",
				...style
			}}
		>
			<ReadMore>{children}</ReadMore>
		</button>
	);
};

const avatarSizes = {
	large: "60px",
	small: "30px"
};

export const Avatar = styled.img`
	box-shadow: inset 0 1px 3px 0 rgba(0, 0, 0, 0.5);
	border-radius: 50%;
	width: ${({ size }) => avatarSizes[size] || "30px"};
	min-width: ${({ size }) => avatarSizes[size] || "30px"};
	min-height: ${({ size }) => avatarSizes[size] || "30px"};
	height: ${({ size }) => avatarSizes[size] || "30px"};
	object-fit: cover;
`;

export const Hide = styled.div`
	@media only screen and (max-width: ${({ maxWidth }) => maxWidth}) {
		display: none;
	}
`;

export const Show = styled.div`
	display: none;
	@media only screen and (max-width: ${({ maxWidth }) => maxWidth}) {
		display: block;
	}
`;
