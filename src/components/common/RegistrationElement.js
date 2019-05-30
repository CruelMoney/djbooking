import React, { Component } from "react";
import PropTypes from "prop-types";

class RegistrationElement extends Component {
	displayName = "RegistrationElement";

	static defaultProps = {
		showOn: [],
		isFilter: false
	};

	getChildContext() {
		return {
			updateValue: this.updateValue,
			isFilter: this.props.isFilter
		};
	}

	updateValue = (name, value) => {
		if (this.props.isFilter) {
			this.context.updateFilters(this.props.name, value);
		}
		this.context.updateValue(name, value);
	};

	render() {
		var styles = {
			base: {
				marginBottom: "20px",
				marginTop: "-35px",
				opacity: this.props.active ? "1" : "0.2"
			},

			label: {
				display: "block",
				marginBottom: "0.5em",
				fontWeight: "300",
				fontSize: "30px"
			},

			paragraph: {
				fontSize: "14px"
			}
		};

		return (
			<div style={styles.base}>
				<h2>{this.props.label}</h2>
				<p>
					{this.props.text}
					{this.props.count}
				</p>
				{this.props.children}
			</div>
		);
	}
}

RegistrationElement.childContextTypes = {
	updateValue: PropTypes.func,
	isFilter: PropTypes.bool
};
RegistrationElement.contextTypes = {
	updateFilters: PropTypes.func,
	updateValue: PropTypes.func.isRequired
};

export default RegistrationElement;
