import React from "react";
import styled from "styled-components";
import checkmark from "../../../../assets/checkmark.svg";

const EventProgress = ({ theEvent }) => {
	const accepted =
		theEvent && ["ACCEPTED", "CONFIRMED"].includes(theEvent.status);
	debugger;
	return (
		<Wrapper>
			<ProgressStep label={"Create event"} completed />
			<ProgressStep label={"Get offers form DJs"} completed={accepted} />
			<ProgressStep
				label={"Confirm and pay"}
				completed={theEvent && theEvent.status === "CONFIRMED"}
			/>
			<ProgressStep label={"Review"} completed={theEvent && theEvent.review} />
		</Wrapper>
	);
};

const Wrapper = styled.div`
	margin-right: 42px;
	display: flex;
	flex-direction: column;
	:after {
	}
`;

const ProgressStep = ({ label, completed }) => {
	return (
		<Step completed={completed}>
			{completed && <img src={checkmark} alt="Checkmark" />}
			{label}
		</Step>
	);
};

const Step = styled.div`
	background: ${({ completed }) => (completed ? "#98A4B3" : "#F3F6F7")};
	border-radius: 36px;
	height: 60px;
	width: 300px;
	line-height: 60px;
	font-family: "AvenirNext-DemiBold", Arial, Helvetica, sans-serif;
	font-weight: 700;
	font-size: 18px;
	color: ${({ completed }) => (completed ? "#fff" : "#4d6480")};
	text-align: center;
	position: relative;
	margin-bottom: 42px;
	> img {
		position: absolute;
		left: 24px;
		top: 20px;
		width: 18px;
	}
	:after {
		content: "";
		display: block;
		position: relative;
		height: calc(42px - 6px);
		width: 6px;
		border-radius: 3px;
		background-color: #f6f8f9;
		top: 3px;
		margin-bottom: 3px;
		margin: auto;
	}
	&:last-child:after {
		display: none;
	}
`;

export default EventProgress;
