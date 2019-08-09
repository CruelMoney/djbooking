import React, {
	useState,
	useEffect,
	useContext,

} from "react";
import Slider from "./Slider";
import wNumb from "wnumb";
import moment from "moment-timezone";
import { FormContext } from "./Form-v2";

const TimeSlider = ({
	date,
	onChange,
	startTime,
	endTime,
	timeZone,
	hoursLabel,
	startLabel,
	endLabel,
	color,
	disabled
}) => {
	const [values, setValues] = useState([21 * 60, 27 * 60]);
	const [theDate, setTheDate] = useState(moment().startOf("day"));

	const { updateValue } = useContext(FormContext);

	useEffect(() => {
		setTheDate(moment(date).startOf("day"));
	}, [date, setTheDate]);

	useEffect(() => {
		if (startTime && endTime) {
			// parse and keep utc offset to get original hour and minute
			const newStartTime = moment(startTime);
			const newEndTime = moment(endTime);
			if (timeZone) {
				newStartTime.tz(timeZone);
				newEndTime.tz(timeZone);
			}
			setValues([
				newStartTime.diff(theDate, "minutes"),
				newEndTime.diff(theDate, "minutes")
			]);
		}
	}, [startTime, endTime, timeZone, theDate]);

	const handleChange = values => {
		setValues(values);
		if (onChange) {
			onChange(values);
		}
	};

	useEffect(() => {
		if (updateValue) {
			const startMoment = moment(theDate)
				.add(values[0], "minutes")
				.format();
			const endMoment = moment(theDate)
				.add(values[1], "minutes")
				.format();

			if (startTime !== startMoment || endTime !== endMoment) {
				updateValue("startTime", startMoment);
				updateValue("endTime", endMoment);
			}
		}
	}, [theDate, values, updateValue, startTime, endTime]);

	const getValues = values => {
		return {
			startHour: Math.floor((values[0] / 60) % 24),
			endHour: Math.floor((values[1] / 60) % 24),
			startMinute: Math.floor(values[0] % 60),
			endMinute: Math.floor(values[1] % 60),
			difHours: (values[1] - values[0]) / 60
		};
	};
	const { startHour, startMinute, difHours, endHour, endMinute } = getValues(
		values
	);
	const formatNumber = num => {
		return num < 10 ? "0" + num : "" + num;
	};
	return (
		<div>
			<div>
				<Slider
					disabled={disabled}
					name="time"
					range={{
						min: 7 * 60,
						max: 32 * 60
					}}
					color={color}
					step={30} //Steps of half hour
					value={values}
					onChange={handleChange}
					format={wNumb({
						decimals: 0
					})}
				/>
			</div>
			<div
				style={{
					display: "flex",
					justifyContent: "space-between",
					marginTop: "10px"
				}}
			>
				<p>{`${startLabel}: ${formatNumber(startHour)}:${formatNumber(
					startMinute
				)}`}</p>
				<p>
					<span>{`${difHours} ${hoursLabel}`}</span>
				</p>
				<p>{`${endLabel}: ${formatNumber(endHour)}:${formatNumber(
					endMinute
				)}`}</p>
			</div>
		</div>
	);
};

export default TimeSlider;
