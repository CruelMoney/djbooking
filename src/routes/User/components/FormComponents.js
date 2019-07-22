import React from "react";
import styled, { css } from "styled-components";
import { Row, Col } from "./Blocks";
import { Title, Body } from "./Text";
import Checkbox from "./Checkbox";

const SectionRow = styled(Row)`
	padding-bottom: 30px;
	margin-bottom: 42px;
	border-bottom: 1px solid #e9ecf0;
	flex-wrap: wrap;
`;

const LeftCol = styled(Col)`
	min-width: 250px;
	flex: 1;
	margin-right: 42px;
	position: sticky;
	top: 90px;
	@media only screen and (max-width: 990px) {
		position: initial;
	}
`;
const RightCol = styled(Row)`
	flex: 2;
	min-width: 400px;
	flex-wrap: wrap;
	margin-right: -36px;
`;

const SettingsSection = ({ title, description, children }) => {
	return (
		<SectionRow>
			<LeftCol>
				<Title>{title}</Title>
				<Body style={{ marginBottom: "24px" }}>{description}</Body>
			</LeftCol>
			<RightCol>{children}</RightCol>
		</SectionRow>
	);
};

const inputStyle = css`
	background: #f6f8f9;
	border-radius: 4px;
	border: none;
	outline: none;
	font-family: "AvenirNext-Regular";
	font-size: 18px;
	color: #122b48;
	text-indent: 9px;
	height: 40px;
	-webkit-appearance: none;
	width: 100%;
	display: block;
	margin-top: 6px;
	box-shadow: ${({ attention }) =>
		attention ? "inset 0 0 0 2px #FFC800" : "none"};
`;

const TextInput = styled.input`
	${inputStyle}
	text-indent: 9px;
	::placeholder,
	::-webkit-input-placeholder {
		color: #98a4b3;
	}
	:-ms-input-placeholder {
		color: #98a4b3;
	}
	:focus {
		background: #e9ecf0;
	}
`;

const ButtonInput = styled.button`
	${inputStyle}
	text-align: center;
	line-height: 40px !important;
	transition: all 200ms ease;
	:hover {
		${({ warning }) =>
			warning
				? `background: #D0021B;
      color: white;
    `
				: `background: #e9ecf0;
    `};
	}
`;

const Label = styled.label`
	font-family: "AvenirNext-Regular";
	font-size: 18px;
	color: #4d6480;
	font-weight: 300;
`;

const InputLabel = styled(Label)`
	margin-bottom: 30px;
	flex: 2;
	min-width: calc(100% - 36px);
	margin-right: 36px;
`;

const LabelHalf = styled(InputLabel)`
	flex: 1;
	min-width: calc(50% - 36px);
	width: calc(50% - 36px);
`;

const Input = ({ half, label, button, ...props }) => {
	const LabelComponent = half ? LabelHalf : InputLabel;
	return (
		<LabelComponent>
			{label}
			{button ? (
				<ButtonInput {...props} />
			) : (
				<TextInput
					{...props}
					onKeyDown={e => {
						if (e.key === "Enter") {
							e.target.blur();
						}
					}}
				/>
			)}
		</LabelComponent>
	);
};

const ButtonText = styled.span`
	overflow: hidden;
	white-space: nowrap;
	display: block;
	text-overflow: ellipsis;
`;

const Value = styled.p`
	font-family: "AvenirNext-Regular";
	font-size: 18px;
	color: #122b48;
`;

export { ButtonText, Input, Label, SettingsSection, Value, Checkbox };
