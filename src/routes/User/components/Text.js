import React from "react";
import styled, { css } from "styled-components";
import { Col } from "./Blocks";

export const StatUnit = styled.p`
	font-family: "AvenirNext-DemiBold, Arial, Helvetica, sans-serif";
	font-size: 15px;
	color: ${({ white }) => (white ? "rgba(255,255,255,0.6)" : "#98a4b3")};
	letter-spacing: 1px;
	text-transform: uppercase;
	margin-bottom: 0px;
	line-height: 1.2em;
`;
const StatValue = styled.p`
	font-family: "AvenirNext-DemiBold, Arial, Helvetica, sans-serif";
	font-size: 15px;
	color: ${({ white }) => (white ? "#fff" : "#4d6480")};
	letter-spacing: 1px;
	margin-bottom: 0px;
	line-height: 1.2em;
`;

export const Stat = ({ label, value, style, ...props }) => (
	<Col style={style}>
		<StatValue {...props}>{value}</StatValue>
		<StatUnit {...props}>{label}</StatUnit>
	</Col>
);

export const SmallHeader = styled.h6`
	font-family: "AvenirNext-DemiBold, Arial, Helvetica, sans-serif";
	font-size: 15px;
	line-height: 1.5em;
	color: #122b48;
`;

export const Title = styled.h3`
	font-family: "AvenirNext-Bold, Arial, Helvetica, sans-serif";
	font-size: 18px;
	color: #122b48;
	text-align: left;
	position: relative;
	margin-bottom: 24px;
	&:after {
		content: "";
		width: 60px;
		border-bottom: 3px solid #50e3c2;
		position: absolute;
		bottom: -15px;
		left: 0;
	}
`;

export const TitleClean = styled.h3`
	font-family: "AvenirNext-Bold, Arial, Helvetica, sans-serif";
	font-size: 18px;
	color: #122b48;
	text-align: left;
	margin-bottom: 24px;
`;

export const Body = styled.p`
	font-family: "AvenirNext-Regular, Arial, Helvetica, sans-serif";
	font-size: 18px;
	color: #4d6480;
	line-height: 27px;
	letter-spacing: 0;
`;

export const BodySmall = styled.p`
	font-family: "AvenirNext-Regular, Arial, Helvetica, sans-serif";
	font-size: 15px;
	color: #4d6480;
	line-height: 22.5px;
`;

export const Citation = styled.blockquote`
	font-family: "AvenirNext-Regular, Arial, Helvetica, sans-serif";
	font-size: 18px;
	color: #98a4b3;
	padding: 0;
	margin: 0;
	border: none;
`;

const smallBoldStyle = css`
	font-family: "AvenirNext-Bold, Arial, Helvetica, sans-serif";
	font-style: normal;
	font-size: 12px;
	color: #4d6480;
`;

export const SmallBold = styled.p`
	${smallBoldStyle}
`;

export const Cite = styled.cite`
	${smallBoldStyle}
	text-align: right;
	padding: 0;
	margin: 0;
	margin-top: 9px;
	border: none;
	&:before {
		content: "-";
		position: relative;
		color: #50e3c2;
		margin-right: 6px;
		font-size: 18px;
		line-height: 12px;
	}
`;
