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
			onChange(event.complete ? event.bankName || event : null);
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
					"iban-wrapper text-field" +
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
								color: "#32325d",
								fontFamily: '"AvenirNext-Regular", Helvetica, sans-serif',
								fontSmoothing: "antialiased",
								fontSize: "14px",
								"::placeholder": {
									color: "#BBBBBB"
								}
							},
							invalid: {
								color: "#f44336",
								iconColor: "#f44336"
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
						onReady={this.props.onReady}
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
