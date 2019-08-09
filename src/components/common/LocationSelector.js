import React, { Component } from "react";
import PropTypes from "prop-types";
import AutoComplete from "material-ui/AutoComplete";
import * as validators from "../../utils/validators";

/*eslint no-undef: 0*/

export default class LocationSelector extends Component {
	displayName = "LocationSelector";
	locationService = new google.maps.places.AutocompleteService();

	propTypes = {
		name: PropTypes.string.isRequired,
		placeholder: PropTypes.string,
		label: PropTypes.string,
		validate: PropTypes.arrayOf(PropTypes.string)
	};

	constructor(props, context) {
		super(props, context);
		this.removeValidationFromContext = context.registerValidation(show =>
			this.isValid(show)
		);
	}

	componentWillUnmount() {
		this.removeValidationFromContext();
	}

	static defaultProps = {
		validate: []
	};

	state = {
		errors: [],
		dataSource: []
	};

	updateSuggestions = (predictions, status) => {
		var li = [];

		predictions.forEach(function(prediction) {
			li.push(prediction.description);
		});

		this.setState({
			dataSource: li
		});
	};

	updateValue = value => {
		this.context.update(this.props.name, value);

		if (this.state.errors.length) {
			setTimeout(() => this.isValid(true), 0);
		}
	};

	onChange = value => {
		function toTitleCase(str) {
			return str.replace(/\w\S*/g, function(txt) {
				return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
			});
		}

		value = toTitleCase(value);

		this.updateValue(value);
		this.locationService.getPlacePredictions(
			{
				input: value,
				types: ["(cities)"],
				componentRestrictions: { country: "dk" }
			},
			this.updateSuggestions
		);
	};

	onValueSelected = value => {
		this.updateValue(value);
	};

	isValid = showErrors => {
		const errors = this.props.validate.reduce(
			(memo, currentName) =>
				memo.concat(
					validators[currentName](this.context.values[this.props.name])
				),
			[]
		);

		if (showErrors) {
			this.setState({
				errors
			});
		}
		return !errors.length;
	};

	render() {
		return (
			<div>
				<AutoComplete
					onClick={this.onValueSelected}
					fullWidth={true}
					hintText={this.props.placeholder}
					floatingLabelText={this.props.label}
					dataSource={this.state.dataSource}
					onUpdateInput={this.onChange}
					onNewRequest={this.onValueSelected}
					onBlur={this.onBlur}
					errorText={
						this.state.errors.length ? (
							<div>
								{this.state.errors.map((error, i) => (
									<div key={i}>{error}</div>
								))}
							</div>
						) : null
					}
				/>
			</div>
		);
	}
}

LocationSelector.contextTypes = {
	update: PropTypes.func.isRequired,
	values: PropTypes.object.isRequired,
	registerValidation: PropTypes.func.isRequired
};
