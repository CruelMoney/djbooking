import React, { PureComponent } from "react";
import { currencyConverter } from "../../utils/CurrencyConverter";
import Formatter from "../../utils/Formatter";

export default class CurrencyValue extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			value: this.convert(props)
		};

		if (!currencyConverter.initialized) {
			currencyConverter.subscribe(_ => {
				this.convert({ ...this.props, setState: true });
			});
		}
	}

	componentWillReceiveProps(nextprops) {
		this.convert({ ...nextprops, setState: true });
	}

	convert = ({ amount, from, to, safeConvert, setState }) => {
		let value = "";
		if (currencyConverter.initialized) {
			value = currencyConverter.getConvertedFormatted(
				amount,
				from,
				to,
				safeConvert
			);
		} else {
			value = Formatter.money.FormatNumberToString(amount, from);
		}
		if (setState) {
			this.setState({
				value
			});
		}
		return value;
	};

	render() {
		return this.state.value;
	}
}
