import React, { Component } from "react";
import PropTypes from "prop-types";
import ToggleButton from "./ToggleButton";
import ToggleButtonInput from "./ToggleButtonInput";

import connectToForm from "../higher-order/connectToForm";

class ToggleButtonHandler extends Component {
	constructor() {
		super();
		this.state = {
			addedGenres: []
		};
		this.currentNewGenre = React.createRef();
	}

	static defaultProps = {
		rounded: true,
		columns: 3,
		potentialValues: [],
		value: [],
		errorAbove: false,
		required: true
	};

	spliceHelper(list, index) {
		list.splice(index, 1);
		return list;
	}

	handleButtonPress = value => {
		var toggledButtons = this.props.value;
		var valueIndex = toggledButtons.indexOf(value);

		var newList =
			valueIndex === -1
				? [...toggledButtons, value]
				: this.spliceHelper(toggledButtons, valueIndex);

		this.props.onChange(newList);
	};

	handleAddNew = () => {
		this.setState(
			state => ({
				addedGenres: [...state.addedGenres, { type: "edit-button", name: " " }]
			}),
			_ => {
				console.log("edit me");
			}
		);
	};

	getButton = value => {
		const name = typeof value === "string" ? value : value.name;

		switch (value.type) {
			case "add-button":
				return (
					<ToggleButton
						rounded={this.props.rounded}
						label={"Add new +"}
						active={false}
						disabled={this.props.disabled}
						onClick={this.handleAddNew}
					/>
				);
			case "edit-button":
				return (
					<ToggleButtonInput
						ref={this.currentNewGenre}
						active={true}
						rounded={this.props.rounded}
					/>
				);
			default:
				var isToggled = false;
				var toggledButtons = this.props.value;
				if (toggledButtons.indexOf(name) !== -1) {
					isToggled = true;
				}
				return (
					<ToggleButton
						rounded={this.props.rounded}
						label={name}
						active={isToggled}
						disabled={this.props.disabled}
						onClick={this.handleButtonPress}
					/>
				);
		}
	};

	render() {
		var rows = [];
		var buttons = [];
		var currentRow = 0;
		const values = [
			...this.props.potentialValues,
			...this.state.addedGenres,
			{ type: "add-button", name: "add-button" }
		];
		values.forEach((genre, i) => {
			//Adding to array
			buttons.push(<td key={i}>{this.getButton(genre)}</td>);

			if (
				((i + 1) % this.props.columns === 0 && i !== 0) ||
				i === values.length - 1
			) {
				currentRow++;
				rows.push(<tr key={currentRow}>{buttons}</tr>);
				buttons = [];
			}
		});

		return (
			<div>
				<div className="toggle-button-handler">
					{this.props.errors.length && this.props.errorAbove ? (
						<div className="errors">
							{this.props.errors.map((error, i) => <p key={i}>{error}</p>)}
						</div>
					) : null}

					<table>
						<tbody>{rows}</tbody>
					</table>
				</div>
				{this.props.errors.length && !this.props.errorAbove ? (
					<div style={{ marginTop: "10px" }} className="errors">
						{this.props.errors.map((error, i) => (
							<p className="error" key={i}>
								{error}
							</p>
						))}
					</div>
				) : null}
			</div>
		);
	}
}

export default connectToForm(ToggleButtonHandler);
