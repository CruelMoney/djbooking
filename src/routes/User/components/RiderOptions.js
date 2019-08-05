import React, { useState } from "react";
import { Checkbox } from "./FormComponents";
import { Col } from "./Blocks";

const CheckBoxRow = ({ label, onChange }) => {
	return (
		<div style={{ height: "42px", display: "flex", alignItems: "center" }}>
			<Checkbox onChange={val => onChange(val)} label={label} />
		</div>
	);
};

const rows = {
	speakers: {
		label: "Yes, the dj has to bring speakers"
	},
	lights: {
		label: "Yes, the dj has to bring lights"
	}
};

const RiderOptions = ({ onSave }) => {
	const [internal, setInternal] = useState({});

	const onChange = key => val => {
		const newRows = {
			...internal,
			[key]: val
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
