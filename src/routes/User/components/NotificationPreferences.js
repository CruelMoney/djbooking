import React from "react";
import styled from "styled-components";
import { Label, Value, Checkbox } from "./FormComponents";
import { Row, Col, Hr } from "./Blocks";

const TableRow = styled(Row)`
	height: 42px;
	align-items: center;
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

const CheckBoxRow = ({ label }) => {
	return (
		<TableRow>
			<Value>{label}</Value>
			<Checkbox defaultValue={true} />
			<Checkbox defaultValue={true} />
		</TableRow>
	);
};

const NotificationPreferences = () => {
	return (
		<Col style={{ width: "100%", marginRight: "36px" }}>
			<TableRow>
				<Label>Notifications</Label>
				<Label>Mobile</Label>
				<Label>Email</Label>
			</TableRow>
			<Hr />
			<CheckBoxRow label={"New message"} />
			<CheckBoxRow label={"New gig"} />
			<CheckBoxRow label={"Event cancelled"} />
			<CheckBoxRow label={"News and updates"} />
			<CheckBoxRow label={"Dj cancelled"} />
		</Col>
	);
};

export default NotificationPreferences;
