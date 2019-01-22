import React, { Component } from "react";
import { IbanElement } from "react-stripe-elements";
import connectToForm from "../../higher-order/connectToForm";
import "./index.css";

class IbanField extends Component {
	state = {
		error: "",
		focused: false
	};

	onChange = event => {
		const { setErrors, onChange } = this.props;
		if (event.error) {
			setErrors([event.error.message]);
		} else {
			onChange("not empty");
		}
	};

	onBlur = event => {
		this.setState({
			focused: false
		});
	};

	render() {
		let { errors } = this.props;
		const { focused } = this.state;

		return (
			<div
				className={
					"iban-wrapper" +
					(focused ? " focused " : "") +
					(!!errors.length > 0 ? " invalid " : "")
				}
			>
				<div className="input">
					<IbanElement
						supportedCountries={["SEPA"]}
						placeholderCountry={"DK"}
						style={{
							base: {
								fontSize: "14px",
								lineHeight: "24px",
								fontFamily: "Roboto, sans-serif",
								color: "#32325d",
								"::placeholder": {
									color: "rgb(187, 187, 187)"
								}
							},
							invalid: {
								color: "#F44336"
							}
						}}
						onBlur={this.onBlur}
						onFocus={_ =>
							this.setState({
								focused: true
							})
						}
						classes={{
							focus: "focused",
							empty: "empty",
							invalid: "invalid"
						}}
						onChange={this.onChange}
					/>
					{this.props.children}
				</div>
				<div className="underline">
					<hr />
					<hr className="animate" />
				</div>
				<div className="errors">
					{errors.map((error, i) => (
						<p className="error" key={i}>
							{error}
						</p>
					))}
				</div>
			</div>
		);
	}
}

export default connectToForm(IbanField);