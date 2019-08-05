import React, { useState } from "react";
import { Input } from "../components/FormComponents";
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
	maxDate = new Date()
}) => {
	const [showing, setShowing] = useState(false);

	const save = moment => {
		setShowing(false);
		onSave(moment.toDate());
	};

	return (
		<>
			<Input
				half={half}
				type="button"
				onClick={s => setShowing(true)}
				label={label}
				buttonText={
					initialDate ? moment(initialDate).format("DD/MM/YYYY") : "Select"
				}
			/>
			<Popup
				width="380px"
				showing={showing}
				onClickOutside={() => setShowing(false)}
			>
				<DatePicker
					dark
					initialDate={initialDate}
					minDate={null}
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
