import React, { useState } from "react";
import { Input } from "../components/FormComponents";
import moment from "moment-timezone";

import Popup from "../../../components/common/Popup";
import DatePicker from "../../../components/common/Datepicker";

const DatePickerPopup = ({ birthday, onSave }) => {
	const [showing, setShowing] = useState(false);
	const initialDate = birthday ? moment(birthday) : null;

	const save = moment => {
		setShowing(false);
		onSave({ birthday: moment.toDate() });
	};

	return (
		<>
			<Input
				half
				type="button"
				onClick={s => setShowing(true)}
				label="Birthday"
				buttonText={
					birthday ? moment(birthday).format("DD/MM/YYYY") : "Update birthday"
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
					maxDate={new Date()}
					handleChange={save}
					showMonthDropdown
					showYearDropdown
					dropdownMode="select"
				/>
			</Popup>
		</>
	);
};

export default DatePickerPopup;
