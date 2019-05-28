import React from "react";
import Options from "./Options";
import { getData } from "country-list";
import connectToForm from "../higher-order/connectToForm";

const CountrySelector = ({ errors, placeholder, ...props }) => {
	const onChange = value => {
		props.onChange(value);
	};

	const errorStyle =
		errors && errors.length > 0
			? {
					borderBottomColor: "#f44336",
					borderBottomWidth: "2px"
			  }
			: {};

	return (
		<div className="country-selector-wrapper text-field">
			<div className="country-selector" style={errorStyle}>
				<Options
					required
					placeholder={placeholder}
					options={getData().map(({ name, code }) => ({
						label: name,
						value: code
					}))}
					{...props}
					onChange={onChange}
				/>
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
};

export default connectToForm(CountrySelector);
