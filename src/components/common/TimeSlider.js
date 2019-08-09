import React, { Component } from "react";
import PropTypes from "prop-types";
import Slider from "./Slider";
import wNumb from "wnumb";
import moment from "moment-timezone";

class TimeSlider extends Component {
	startValues = [21 * 60, 27 * 60];

	constructor(props) {
		super(props);
		let { startTime, endTime, timeZone } = props;
		if (startTime && endTime) {
			// parse and keep utc offset to get original hour and minute
			startTime = moment(startTime).tz(timeZone);
			endTime = moment(endTime).tz(timeZone);
			const day = moment(startTime).startOf("day");

			this.startValues = [
				startTime.diff(day, "minutes"),
				endTime.diff(day, "minutes")
			];

			this.state = {
				...this.getValues(this.startValues),
				values: this.startValues
			};
		}
	}

	UNSAFE_componentWillReceiveProps(nextprops) {
		if (nextprops.date.format() !== this.props.date.format()) {
			this.updateContext(nextprops.date);
		}
	}

	formatNumber = num => {
		return num < 10 ? "0" + num : "" + num;
	};

	getValues = values => {
		return {
			startHour: Math.floor((values[0] / 60) % 24),
			endHour: Math.floor((values[1] / 60) % 24),
			startMinute: Math.floor(values[0] % 60),
			endMinute: Math.floor(values[1] % 60),
			difHours: (values[1] - values[0]) / 60
		};
	};

	state = {
		...this.getValues(this.startValues),
		values: this.startValues
	};

	timer = null;

	handleChange = values => {
		this.setState({
			...this.getValues(values),
			values
		});
		if (this.props.onChange) {
			this.props.onChange(values);
		}

		clearTimeout(this.timer);
		this.timer = setTimeout(() => {
			if (this.context.updateValue) {
				this.updateContext();
			}
		}, 500);
	};

	updateContext = (date = this.props.date) => {
		const { updateValue } = this.context || {};
		const day = moment(date).startOf("day");
		const startMoment = moment(day).add(this.state.values[0], "minutes");
		const endMoment = moment(day).add(this.state.values[1], "minutes");
		if (updateValue) {
			updateValue("startTime", startMoment.format());
			updateValue("endTime", endMoment.format());
		}
	};

	render() {
		const { hoursLabel, startLabel, endLabel } = this.props;

		return (
			<div>
				<div>
					<Slider
						disabled={this.props.disabled}
						name="time"
						range={{
							min: 7 * 60,
							max: 32 * 60
						}}
						color={this.props.color}
						step={30} //Steps of half hour
						value={this.state.values}
						onChange={this.handleChange}
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
					<p>{`${startLabel}: ${this.formatNumber(
						this.state.startHour
					)}:${this.formatNumber(this.state.startMinute)}`}</p>
					<p>
						<span>{`${this.state.difHours} ${hoursLabel}`}</span>
					</p>
					<p>{`${endLabel}: ${this.formatNumber(
						this.state.endHour
					)}:${this.formatNumber(this.state.endMinute)}`}</p>
				</div>
			</div>
		);
	}
}

TimeSlider.contextTypes = {
	resetting: PropTypes.bool,
	isFormValid: PropTypes.func,
	registerValidation: PropTypes.func.isRequired,
	updateValue: PropTypes.func,
	registerReset: PropTypes.func
};

export default TimeSlider;
