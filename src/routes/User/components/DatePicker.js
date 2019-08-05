import React, { useState, useCallback } from "react";
import { Input, useValidation } from "../components/FormComponents";
import moment from "moment-timezone";

import Popup from "../../../components/common/Popup";
import DatePicker from "../../../components/common/Datepicker";

const DatePickerPopup = ({
	initialDate,
	onSave,
	label,
	half,
	showMonthDropdown = true,
	showYearDropdown = true,
	maxDate = new Date(),
	minDate,
	validation,
	registerValidation,
	unregisterValidation
}) => {
	const [showing, setShowing] = useState(false);
	const [selectedDate, setDate] = useState(
		initialDate ? moment(initialDate) : null
	);

	const { error, runValidation } = useValidation({
		validation,
		registerValidation,
		unregisterValidation
	});

	const save = moment => {
		setShowing(false);
		if (!runValidation(moment)) {
			setDate(moment);
			onSave(moment.toDate());
		}
	};

	return (
		<>
			<Input
				error={error}
				half={half}
				type="button"
				onClick={() => {
					setShowing(true);
				}}
				label={label}
				buttonText={
					selectedDate ? moment(selectedDate).format("DD/MM/YYYY") : "Select"
				}
			/>
			<Popup
				width="380px"
				showing={showing}
				onClickOutside={() => {
					setShowing(false);
					runValidation(selectedDate);
				}}
			>
				<DatePicker
					dark
					initialDate={initialDate}
					minDate={minDate}
					maxDate={maxDate}
					handleChange={save}
					showMonthDropdown={showMonthDropdown}
					showYearDropdown={showYearDropdown}
					dropdownMode="select"
				/>
			</Popup>
		</>
	);
};

export default DatePickerPopup;
