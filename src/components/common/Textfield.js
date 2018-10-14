import React, { Component } from "react";
import PropTypes from "prop-types";
import TextField from "material-ui/TextField";
import connectToForm from "../higher-order/connectToForm";

class MyTextField extends Component {
	displayName = "Textfield";

	static defaultProps = {
		type: "string",
		validate: []
	};

	onChange = e => {
		var value = e.target.value;
		this.props.onChange(value);
	};

	render() {
		var stylesBig = {
			textarea: {
				height: "70px",
				marginTop: "-10px"
			},

			input: {
				fontSize: "22px",
				color: this.context.textColor
					? this.context.textColor
					: this.context.color,
				fontFamily: "AvenirNext-Regular"
			},
			underlineStyle: {
				borderColor: this.context.textColor
					? this.context.textColor
					: this.context.color
			},
			hint: {
				bottom: "23px",
				fontSize: "22px",
				color: "rgba(187,187,187,0.5)",
				fontFamily: "AvenirNext-Regular"
			},
			error: {
				fontFamily: "SourceSansPro-Regular"
			}
		};
		var stylesNormal = {
			textarea: {
				height: "30px",
				marginBottom: "5px"
			},
			input: {
				fontSize: "14px",
				color: this.context.color,
				fontFamily: "AvenirNext-Regular",
				top: "0",
				marginTop: "0px",
				marginBottom: "5px",
				opacity: "1"
			},
			underlineStyle: {
				borderColor: this.context.color,
				bottom: "0"
			},
			underlineNormalStyle: {
				bottom: "0"
			},
			hint: {
				fontSize: "14px",
				color: "#BBBBBB",
				fontFamily: "AvenirNext-Regular",
				bottom: "0"
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
				color: "#4A4A4A",
				top: "6"
			},
			underlineDisabledStyle: {
				borderWidth: " 0px 0px 0px",
				borderStyle: "solid solid",
				borderColor: "rgb(224, 224, 224)"
			}
		};
		var styles = this.props.big ? stylesBig : stylesNormal;

		var className = "text-field";
		className += this.props.disabled ? " disabled" : "";
		return (
			<div className={className}>
				<TextField
					id={this.props.name}
					placeholder=""
					value={this.props.value || ""}
					name={this.props.name}
					disabled={this.props.disabled}
					maxLength={this.props.maxLength}
					style={styles.textarea}
					inputStyle={styles.input}
					hintStyle={styles.hint}
					underlineDisabledStyle={styles.underlineDisabledStyle}
					underlineFocusStyle={styles.underlineStyle}
					underlineStyle={styles.underlineNormalStyle}
					type={this.props.type}
					floatingLabelText={this.props.floatingLabelText}
					floatingLabelStyle={styles.floatingLabelStyle}
					fullWidth={this.props.fullWidth || true}
					hintText={this.props.placeholder}
					onChange={e => this.onChange(e)}
					onBlur={this.props.onBlur}
					errorText={
						this.props.errors ? (
							this.props.errors.length ? (
								<div
									style={{
										position: "relative",
										zIndex: "1"
									}}
								>
									<div className="errors" style={styles.error}>
										{this.props.errors.map((error, i) => (
											<p className="error" key={i}>
												{error}
											</p>
										))}
									</div>
								</div>
							) : null
						) : null
					}
				/>
				<div
					style={{
						position: "absolute",

						right: "0px",
						top: "2px"
					}}
				>
					{this.props.children}
				</div>
			</div>
		);
	}
}

MyTextField.contextTypes = {
	color: PropTypes.string
};

export default connectToForm(MyTextField);
export { MyTextField as TexfieldDisconnected };
