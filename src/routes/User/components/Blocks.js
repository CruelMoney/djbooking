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
	display: flex;
	flex-direction: column;
`;
export const Row = styled.div`
	display: flex;
	flex-direction: row;
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

export const ReadMoreButton = ({ children, onClick }) => {
	return (
		<button
			onClick={onClick}
			style={{
				padding: 0,
				border: "none"
			}}
		>
			<ReadMore>{children}</ReadMore>
		</button>
	);
};
