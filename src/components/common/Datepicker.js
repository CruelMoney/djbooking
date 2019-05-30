import React, { Component } from "react";
import PropTypes from "prop-types";
import DatePicker from "react-datepicker";
import moment from "moment-timezone";
import "react-datepicker/dist/react-datepicker.min.css";

import "../../css/calendar.css";

export default class MyDatePicker extends Component {
	state = {
		startDate: moment()
	};

	componentWillMount() {
		if (this.props.initialDate) {
			this.setState({
				startDate: this.props.initialDate
			});
		}
	}

	handleChange = date => {
		this.props.handleChange(date);
		this.setState({
			startDate: date
		});
	};

	render() {
		return (
			<div
				style={{ color: "#32325d" }}
				className={"calendar-container" + (this.props.dark ? " dark" : "")}
			>
				<DatePicker
					fixedHeight
					inline
					minDate={moment()}
					selected={this.state.startDate}
					onChange={this.handleChange}
				/>
			</div>
		);
	}
}

MyDatePicker.contextTypes = {
	color: PropTypes.string
};
