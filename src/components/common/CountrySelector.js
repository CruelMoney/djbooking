import React from "react";
import Options from "./Options";
import { getData } from "country-list";
import connectToForm from "../higher-order/connectToForm";
import * as c from "../../constants/constants";
import { Query } from "react-apollo";
import { AVAILABLE_BANKS } from "../gql";

const CountrySelector = ({ errors = [], placeholder, ...props }) => {
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

const CurrencySelector = ({ errors = [], placeholder, ...props }) => {
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
					options={c.Currencies.map(c => ({
						label: c,
						value: c
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

const BankSelector = ({ errors = [], placeholder, ...props }) => {
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
		<Query
			query={AVAILABLE_BANKS}
			variables={{ countryCode: "ID" }}
			ssr={false}
		>
			{({ loading, data }) => {
				if (loading) {
					return null;
				}

				let options = [];
				if (data && data.availableBanks) {
					options = data.availableBanks.map(({ code, name }) => ({
						label: name,
						value: code
					}));
				}

				return (
					<div className="country-selector-wrapper text-field">
						<div className="country-selector" style={errorStyle}>
							<Options
								required
								placeholder={placeholder}
								options={options}
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
			}}
		</Query>
	);
};

export const ConnectedCurrencySelector = connectToForm(CurrencySelector);
export const ConnectedBankSelector = connectToForm(BankSelector);
