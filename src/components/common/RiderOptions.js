import React from "react";
import ToggleButton from "./ToggleButton";
import connectToForm from "../higher-order/connectToForm";

export const optionsToEnum = options => {
	if (options.speakers && !options.lights) {
		return "DJ_AND_SPEAKERS";
	} else if (options.speakers && options.lights) {
		return "DJ_SPEAKERS_AND_LIGHT";
	} else if (!options.speakers && options.lights) {
		return "DJ_AND_LIGHT";
	} else {
		return "DJ";
	}
};

class RiderOptions extends React.Component {
	state = {};
	enumToOptions = val => {
		var state;
		switch (val) {
			case "DJ_AND_SPEAKERS":
				state = { speakers: true };
				break;
			case "DJ_AND_LIGHT":
				state = { lights: true };
				break;
			case "DJ_SPEAKERS_AND_LIGHT":
				state = { speakers: true, lights: true };
				break;
			default:
				state = {};
				break;
		}
		this.setState(state);
	};
	componentWillMount() {
		if (this.props.value) {
			this.enumToOptions(this.props.value);
		}
	}

	onClick = val => {
		this.setState({ [val]: true }, () =>
			this.props.onChange(optionsToEnum(this.state))
		);
	};

	onClickToggled = val => {
		this.setState({ [val]: false }, () =>
			this.props.onChange(optionsToEnum(this.state))
		);
	};

	render() {
		const { speakersLabel, lightsLabel } = this.props;
		return (
			<div className="toggle-options">
				<table>
					<tbody>
						<tr>
							<td>
								<ToggleButton
									onClick={this.onClick}
									onClickToggled={this.onClickToggled}
									name="speakers"
									label={speakersLabel}
									active={this.state.speakers || false}
									rounded
								>
									{speakersLabel}
								</ToggleButton>
							</td>
							<td>
								<ToggleButton
									onClick={this.onClick}
									onClickToggled={this.onClickToggled}
									name="lights"
									label={lightsLabel}
									active={this.state.lights || false}
									rounded
								>
									{lightsLabel}
								</ToggleButton>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		);
	}
}

export default connectToForm(RiderOptions);
export { RiderOptions as DisconnectedRiderOptions };
