import React, { Component } from "react";
import PropTypes from "prop-types";
import Button from "./Button-v2";

class ToggleButton extends Component {
	constructor() {
		super();
		this.selfRef = React.createRef();
		this.state = {
			toggled: false,
			value: ""
		};
	}

	static defaultProps = {
		rounded: false,
		label: "ToggleButton"
	};

	componentWillMount() {
		this.setState({
			toggled: this.props.active
		});
	}

	componentDidMount() {
		this.selfRef.current.focus();
	}

	componentWillReceiveProps(nextProps, nextContext) {
		if (nextProps.active !== undefined) {
			this.setState({
				toggled: nextProps.active
			});
		}
	}

	onBlur = () => {
		this.setState({
			blurred: true
		});
		!!this.props.onChange && this.props.onChange(this.state.value);
	};

	onChange = e => {
		this.setState({ value: e.target.value });
	};

	render() {
		return (
			<Button
				{...this.props}
				className="edit-text-button"
				active={this.state.toggled}
				onClick={null}
			>
				<input
					onBlur={this.onBlur}
					onChange={this.onChange}
					disabled={this.state.blurred}
					ref={this.selfRef}
					type="text"
				/>
			</Button>
		);
	}
}

export default ToggleButton;
