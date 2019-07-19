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
