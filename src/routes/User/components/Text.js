import React from "react";
import styled from "styled-components";
import { Col } from "./Blocks";

const StatUnit = styled.p`
	font-family: "AvenirNext-DemiBold";
	font-size: 15px;
	color: #98a4b3;
	letter-spacing: 1px;
	text-transform: uppercase;
	margin-bottom: 0px;
	line-height: 1.2em;
`;
const StatValue = styled.p`
	font-family: "AvenirNext-DemiBold";
	font-size: 15px;
	color: #4d6480;
	letter-spacing: 1px;
	margin-bottom: 0px;
	line-height: 1.2em;
`;

export const Stat = ({ label, value, style }) => (
	<Col style={style}>
		<StatValue>{value}</StatValue>
		<StatUnit>{label}</StatUnit>
	</Col>
);

export const SmallHeader = styled.h6`
	font-family: "AvenirNext-DemiBold";
	font-size: 15px;
	color: #122b48;
`;

export const Title = styled.h3`
	font-family: "AvenirNext-Bold";
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

export const Body = styled.p`
	font-family: "AvenirNext-Regular";
	font-size: 18px;
	color: #4d6480;
	line-height: 27px;
	letter-spacing: 0;
`;
