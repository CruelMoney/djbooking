import React, { Component } from "react";
import PropTypes from "prop-types";
import connectToForm from "../higher-order/connectToForm";

class TextBox extends Component {
	static defaultProps = {
		active: true,
		validate: [],
		height: "100%",
		width: "100%"
	};

	render() {
		var styles = {
			base: {
				height: this.props.height,
				width: this.props.width,
				color: "#32325d",
				backgroundColor: "transparent",
				borderStyle: "solid",
				borderWidth: "1px",
				borderColor: "#BBBBBB",
				outline: "none",
				resize: "none",
				borderRadius: "6px",
				padding: "4px",
				transition: "border 0.4s",
				opacity: "1",
				":focus": {
					borderColor: this.context.color
				}
			}
		};

		let { validate, active, ...props } = this.props;
		validate = active;
		active = validate;
		return (
			<div style={{ borderColor: this.context.color, borderWidth: "0px" }}>
				<textarea
					{...props}
					id={this.props.name}
					style={styles.base}
					value={this.props.value}
					name={this.props.name}
					onChange={e => this.props.onChange(e.target.value)}
				/>
				{this.props.errors.length ? (
					<div className="errors" style={{ marginTop: "5px" }}>
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

TextBox.contextTypes = {
	registerValidation: PropTypes.func.isRequired,
	updateValue: PropTypes.func,
	isFormValid: PropTypes.func,
	registerReset: PropTypes.func,
	color: PropTypes.string
};

export default connectToForm(TextBox);
