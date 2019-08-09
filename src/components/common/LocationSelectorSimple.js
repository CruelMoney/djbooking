import React, { Component } from "react";
import PropTypes from "prop-types";
import AutoComplete from "material-ui/AutoComplete";
import connectToForm from "../higher-order/connectToForm";

class LocationSelector extends Component {
	displayName = "LocationSelectorSimple";

	state = {
		dataSource: []
	};

	static defaultProps = {
		value: ""
	};

	componentDidMount() {
		if (window.google) {
			this.locationService = new window.google.maps.places.AutocompleteService();
			//Fix for not being able to style the input element
			var elem = document.querySelector(".search-bar__auto-complete");
			if (elem) {
				elem.style.height = this.props.big ? "70px" : "30px";
			}
		}
	}

	updateSuggestions = (predictions, status) => {
		var li = [];

		if (predictions) {
			predictions.forEach(function(prediction) {
				li.push(prediction.description);
			});
		}

		this.setState({
			dataSource: li
		});
	};

	onChange = value => {
		function toTitleCase(str) {
			return str.replace(/\w\S*/g, function(txt) {
				return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
			});
		}

		value = toTitleCase(value);
		this.props.onChange(value);

		this.locationService.getPlacePredictions(
			{
				input: value,
				types: ["(cities)"],
				componentRestrictions: { country: "dk" }
			},
			this.updateSuggestions
		);
	};

	onValueSelected = e => {
		if (e.target) {
			this.props.onChange(e.target.value);
		}
	};

	render() {
		var stylesBig = {
			textarea: {
				height: "70px",
				marginTop: "-10px"
			},

			input: {
				fontSize: "30px",
				color: "#32325d",
				fontFamily: "AvenirNext-Regular"
			},
			underlineStyle: {
				borderColor: this.context.color
			},
			hint: {
				bottom: "23px",
				fontSize: "30px",
				color: "rgba(187,187,187,0.5)",
				fontFamily: "AvenirNext-Regular"
			},
			error: {
				fontFamily: "AvenirNext-Regular"
			}
		};
		var stylesNormal = {
			textarea: {
				height: "30px"
			},
			input: {
				fontSize: "14px",
				color: "#32325d",
				fontFamily: "AvenirNext-Regular",
				top: "-11px"
			},
			underlineStyle: {
				borderColor: this.context.color
			},
			underlineDisabledStyle: {
				borderWidth: "1px 0px 0px",
				borderStyle: "solid",
				borderColor: "rgb(224, 224, 224)",
				borderImage: "initial",
				bottom: "11px",
				boxSizing: "content-box",
				margin: "0px",
				position: "absolute",
				width: "100%"
			},
			hint: {
				fontSize: "14px",
				color: "rgba(187,187,187,0.5)",
				fontFamily: "AvenirNext-Regular"
			},
			error: {
				fontFamily: "AvenirNext-Regular",
				fontSize: "14px"
			},
			floatingLabelStyle: {
				fontFamily: "AvenirNext-Medium",
				fontSize: "16px",
				fontWeight: "500",
				lineHeight: "22px",
				color: "#4A4A4A"
			}
		};
		var styles = this.props.big ? stylesBig : stylesNormal;

		return (
			<AutoComplete
				id={this.props.name}
				name={this.props.name}
				className="search-bar__auto-complete"
				style={styles.textarea}
				inputStyle={styles.input}
				hintStyle={styles.hint}
				underlineDisabledStyle={styles.underlineDisabledStyle}
				underlineFocusStyle={styles.underlineStyle}
				floatingLabelText={this.props.floatingLabelText}
				onClick={this.onValueSelected}
				onChange={this.onChange}
				fullWidth={true}
				searchText={this.props.value}
				hintText={this.props.placeholder || "City"}
				dataSource={this.state.dataSource}
				onUpdateInput={this.onChange}
				onNewRequest={this.onValueSelected}
				onBlur={this.onBlur}
				disabled={this.props.disabled}
				errorText={
					this.props.errors.length ? (
						<div
							style={{
								position: "relative",
								zIndex: "1"
							}}
						>
							<div className="errors">
								{this.props.errors.map((error, i) => (
									<p className="error" key={i}>
										{error}
									</p>
								))}
							</div>
						</div>
					) : null
				}
			/>
		);
	}
}

LocationSelector.contextTypes = {
	color: PropTypes.string,
	textColor: PropTypes.string
};

export default connectToForm(LocationSelector);
