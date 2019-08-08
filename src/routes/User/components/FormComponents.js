import React, { useState, useEffect, useCallback, useRef } from "react";
import styled, { css } from "styled-components";
import { Row, Col } from "./Blocks";
import { Title, Body } from "./Text";
import Checkbox from "./Checkbox";

const Label = styled.label`
	font-family: "AvenirNext-Regular";
	font-size: 18px;
	color: #4d6480;
	font-weight: 300;
	.error {
		margin-bottom: 0;
	}
`;

const InputLabel = styled(Label)`
	margin-bottom: 30px;
	min-width: 100%;
	flex: 2;
`;

const LabelHalf = styled(InputLabel)`
	flex: 1;
`;

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
	top: ${({ stickyTop }) => stickyTop};
	@media only screen and (max-width: 990px) {
		position: initial;
	}
`;
const RightCol = styled(Row)`
	flex: 2;
	min-width: 400px;
	flex-wrap: wrap;
	margin-right: -36px;
	${InputLabel} {
		min-width: calc(100% - 36px);
		margin-right: 36px;
	}
	${LabelHalf} {
		margin-right: 36px;
		min-width: calc(50% - 36px);
		width: calc(50% - 36px);
	}
	@media only screen and (max-width: 425px) {
		min-width: 100%;
		margin-right: -15px;
		${InputLabel} {
			min-width: calc(100% - 15px);
			margin-right: 15px;
		}
		${LabelHalf} {
			margin-right: 15px;
			min-width: calc(50% - 15px);
			width: calc(50% - 15px);
		}
	}
`;

const SettingsSection = ({
	title,
	description,
	children,
	stickyTop = "90px",
	...props
}) => {
	return (
		<SectionRow {...props}>
			<LeftCol stickyTop={stickyTop}>
				<Title>{title}</Title>
				<Body style={{ marginBottom: "24px" }}>{description}</Body>
			</LeftCol>
			<RightCol>{children}</RightCol>
		</SectionRow>
	);
};

export const inputStyle = css`
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
	font-weight: 300;
	box-shadow: ${({ attention, error }) => {
		const show = attention || error;
		const color = error ? "#D0021B" : "#FFC800";
		return show ? `inset 0 0 0 2px ${color}` : "none";
	}};
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

const buttonStyle = css`
	${inputStyle}
	text-align: center;
	line-height: 40px !important;
	transition: all 200ms ease;
	cursor: pointer;
	box-shadow: ${({ attention, error }) => {
		const show = attention || error;
		const color = error ? "#D0021B" : "#FFC800";
		return show ? `inset 0 0 0 2px ${color}` : "none";
	}};
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

const ButtonInput = styled.button`
	${buttonStyle}
`;

const FileInputWrapper = styled.label`
	${buttonStyle}
	position: relative;
`;

const FileInput = styled.input.attrs({ type: "file" })`
	width: 0.1px;
	height: 0.1px;
	opacity: 0;
	overflow: hidden;
	position: absolute;
	z-index: -1;
`;

const DeleteFileButton = styled.button`
	width: 40px;
	right: 0;
	position: absolute;
	height: 40px;
	font-size: 1em;
	font-weight: 600;
`;

const FormattedText = ({ defaultValue, save, ...props }) => {
	const prefix = "https://cueup.io/user/";

	const [value, setValue] = useState(defaultValue);

	const updateVal = val => {
		if (val.indexOf(prefix) === -1) {
			setValue("");
			return;
		}
		val = val.replace(prefix, "");
		val = val.replace(/[^\w-:]|_/, "");
		setValue(val.toLowerCase());
	};

	return (
		<TextInput
			{...props}
			type="text"
			onChange={e => updateVal(e.target.value)}
			onBlur={e => save(value)}
			value={prefix + value}
		/>
	);
};

const Select = styled.select`
	${inputStyle}
	text-align: center;
	line-height: 40px !important;
	transition: all 200ms ease;
	cursor: pointer;
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

const InputType = React.forwardRef(
	({ buttonText, type, error, save, children, ...props }, ref) => {
		switch (type) {
			case "text-area":
				return (
					<TextArea
						{...props}
						ref={ref}
						type={type}
						error={!!error}
						onBlur={save}
					/>
				);
			case "select":
				return (
					<Select {...props} error={!!error} onChange={save} ref={ref}>
						{children}
					</Select>
				);
			case "button":
				return (
					<ButtonInput {...props} error={!!error} ref={ref}>
						{buttonText}
					</ButtonInput>
				);
			case "file":
				return (
					<FileInputWrapper {...props} error={!!error} ref={ref}>
						{buttonText}
						<FileInput {...props} onChange={save}></FileInput>
						{children}
					</FileInputWrapper>
				);

			case "formatted-text":
				return (
					<FormattedText
						{...props}
						ref={ref}
						type={type}
						error={!!error}
						save={save}
						onKeyDown={e => {
							if (e.key === "Enter") {
								e.target.blur();
							}
						}}
					/>
				);
			default:
				return (
					<TextInput
						{...props}
						ref={ref}
						type={type}
						error={!!error}
						onBlur={save}
						onKeyDown={e => {
							if (e.key === "Enter") {
								e.target.blur();
							}
						}}
					/>
				);
		}
	}
);

const Input = React.forwardRef(
	(
		{
			error: propsError,
			half,
			label,
			warning,
			type,
			onSave,
			validation,
			onChange,
			registerValidation,
			unregisterValidation = () => {},
			...props
		},
		fRef
	) => {
		const ref = fRef || useRef();
		const LabelComponent = half ? LabelHalf : InputLabel;

		const saveIfInvalid = !!registerValidation;

		const { runValidation, error } = useValidation({
			registerValidation,
			unregisterValidation,
			validation,
			ref
		});

		const save = e => {
			const value = e.target ? e.target.value : e;

			if (warning) {
				const confirmed = window.confirm(warning);
				if (!confirmed) {
					return;
				}
			}
			const err = runValidation(value);
			if (!err || saveIfInvalid) {
				onSave && onSave(value, e);
			}
		};

		const change = e => onChange && onChange(e.target.value);

		return (
			<LabelComponent>
				{label}
				<InputType
					type={type}
					save={save}
					error={error || propsError}
					warning={warning}
					onChange={change}
					ref={ref}
					{...props}
				/>
				{error && <p className="error">{error}</p>}
				{propsError && <p className="error">{propsError}</p>}
			</LabelComponent>
		);
	}
);

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

const TextArea = styled.textarea`
	${inputStyle}
	resize: none;
	text-indent: 0;
	padding: 0.5em;
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

export {
	ButtonText,
	Input,
	Label,
	SettingsSection,
	Value,
	Checkbox,
	DeleteFileButton,
	TextArea,
	Select
};

export const useValidation = ({
	validation,
	registerValidation,
	unregisterValidation,
	ref
}) => {
	const [error, setError] = useState(null);

	const runValidation = useCallback(
		(value, returnRef) => {
			if (validation) {
				const validationError = validation(value);
				if (validationError) {
					setError(validationError);
					return returnRef ? ref : validationError;
				} else {
					setError(null);
					return null;
				}
			}
		},
		[validation, ref]
	);

	useEffect(() => {
		if (registerValidation) {
			registerValidation(val => runValidation(val, true));
		}
		if (unregisterValidation) {
			return () => unregisterValidation(runValidation);
		}
	}, [validation, registerValidation, unregisterValidation, runValidation]);
	return {
		runValidation,
		error
	};
};

export const useForm = form => {
	const validations = useRef({});

	const registerValidation = key => fun => {
		validations.current = {
			...validations.current,
			[key]: fun
		};
	};

	const unregisterValidation = key => fun => {
		delete validations.current[key];
	};

	const runValidations = () => {
		return Object.entries(validations.current)
			.reduce((refs, [key, fun]) => [...refs, fun(form[key])], [])
			.filter(r => !!r);
	};

	return {
		registerValidation,
		unregisterValidation,
		runValidations
	};
};
