import React, { useState } from "react";
import styled from "styled-components";
import { Label, Value, Checkbox } from "./FormComponents";
import { Row, Col, Hr } from "./Blocks";

const TableRow = styled(Row)`
	height: 42px;
	align-items: center;
	text-align: left;
	p {
		margin-bottom: 0;
	}
	> *:first-child {
		flex: 1;
	}
	> *:nth-child(2),
	> *:nth-child(3) {
		min-width: 100px;
		text-align: center;
	}
`;

const CheckBoxRow = ({ label, onChange }) => {
	return (
		<div style={{ height: "42px", display: "flex", alignItems: "center" }}>
			<Checkbox onChange={val => onChange(val)} label={label} />
		</div>
	);
};

const rows = {
	SPEAKERS: {
		label: "Yes, the dj has to bring speakers"
	},
	LIGHTS: {
		label: "Yes, the dj has to bring lights"
	}
};

const RiderOptions = ({ onSave, roles }) => {
	const [internal, setInternal] = useState(rows);

	const onChange = key => type => val => {
		const newRows = {
			...internal,
			[key]: {
				...internal[key],
				[type]: val
			}
		};
		setInternal(newRows);
		onSave(newRows);
	};

	return (
		<Col style={{ width: "100%", marginRight: "36px", marginBottom: "30px" }}>
			{Object.entries(rows).map(([key, { label }]) => {
				return <CheckBoxRow key={key} label={label} onChange={onChange(key)} />;
			})}
		</Col>
	);
};

export default RiderOptions;
