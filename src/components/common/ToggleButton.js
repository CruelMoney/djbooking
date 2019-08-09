import React, { Component } from "react";
import PropTypes from "prop-types";
import Button from "./Button-v2";

class ToggleButton extends Component {
	static propTypes = {
		name: PropTypes.string,
		rounded: PropTypes.bool,
		label: PropTypes.string,
		labelToggled: PropTypes.string,
		onClick: PropTypes.func,
		onClickToggled: PropTypes.func,
		disabled: PropTypes.bool,
		active: PropTypes.bool
	};

	state = {
		toggled: false
	};

	static defaultProps = {
		rounded: false,
		label: "ToggleButton"
	};

	constructor(props) {
		super(props);
		this.state = {
			toggled: props.active
		};
	}

	componentWillReceiveProps(nextProps, nextContext) {
		if (nextProps.active !== undefined) {
			this.setState({
				toggled: nextProps.active
			});
		}
	}

	handleClick = value => {
		const newToggle = !this.state.toggled;
		this.setState({
			toggled: newToggle
		});
		if (!newToggle) {
			if (this.props.onClickToggled) {
				this.props.onClickToggled(value);
			} else {
				this.props.onClick(value);
			}
		} else {
			this.props.onClick(value);
		}
	};

	render() {
		return (
			<Button
				{...this.props}
				active={this.state.toggled}
				onClick={this.props.disabled ? () => null : this.handleClick}
			>
				{this.state.toggled
					? this.props.labelToggled
						? this.props.labelToggled
						: this.props.label
					: this.props.label}
			</Button>
		);
	}
}

export default ToggleButton;
