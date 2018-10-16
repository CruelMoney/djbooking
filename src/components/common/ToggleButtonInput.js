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

	componentWillMount() {
		this.setState({
			toggled: this.props.active
		});
	}

	componentWillReceiveProps(nextProps, nextContext) {
		if (nextProps.active !== undefined) {
			this.setState({
				toggled: nextProps.active
			});
		}
	}

	render() {
		return (
			<Button
				{...this.props}
				className="edit-text-button"
				active={this.state.toggled}
				onClick={null}
			>
				<input type="text" />
			</Button>
		);
	}
}

export default ToggleButton;
