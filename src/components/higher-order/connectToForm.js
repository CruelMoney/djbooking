import React, { Component } from "react";
import PropTypes from "prop-types";
import * as validators from "../../utils/validators";

function connectToForm(WrappedComponent) {
	class FormConnection extends Component {
		static contextTypes = {
			registerValidation: PropTypes.func.isRequired,
			updateValue: PropTypes.func,
			registerReset: PropTypes.func
		};

		//errors needs to exist
		state = {
			errors: []
		};

		setErrors = errors => {
			this.setState(state => ({
				errors
			}));
		};

		isValid = (showErrors: boolean, value: any = this.state.value) => {
			if (this.props.validate) {
				const errors = this.props.validate.reduce(
					(memo, currentName) => memo.concat(validators[currentName](value)),
					this.props.errors || []
				);

				if (showErrors) {
					this.setState({
						errors
					});
				}

				return !errors.length;
			}

			return !this.state.errors.length;
		};

		componentWillMount() {
			if (
				typeof this.props.value !== "undefined" &&
				this.props.value !== null
			) {
				this.onChange(this.props.value);
			}
			if (this.context.registerValidation) {
				this.removeValidationFromContext = this.context.registerValidation(
					show => this.isValid(show)
				);
			}
			if (this.context.registerReset) {
				this.removeReset = this.context.registerReset(() =>
					this.setState({ value: this.props.value })
				);
			}
		}

		componentWillUnmount() {
			if (this.removeValidationFromContext) {
				this.removeValidationFromContext();
			}
			if (this.removeReset) {
				this.removeReset();
			}
		}

		componentWillReceiveProps(nextprops) {
			if (!!nextprops.errors) {
				setTimeout(() => {
					this.isValid(true);
				}, 100);
			}
		}

		timer = null;

		onChange = value => {
			if (this.props.onUpdatePipeFunc) {
				value = this.props.onUpdatePipeFunc(this.state.value, value);
			}

			this.setState({
				value: value
			});
			clearTimeout(this.timer);
			this.timer = setTimeout(() => {
				this.isValid(true, value);
				this.updateValue(value);
			}, 500);
			if (this.props.onChange) {
				this.props.onChange(value);
			}
		};

		updateValue = value => {
			if (this.context.updateValue) {
				this.context.updateValue(this.props.name, value);
			}
		};

		onBlur = () => {
			setTimeout(() => {
				this.isValid(true);
			}, 100);
		};

		render() {
			return (
				<WrappedComponent
					{...this.props}
					{...this.state}
					onChange={this.onChange}
					onBlur={this.onBlur}
					setErrors={this.setErrors}
				/>
			);
		}
	}
	return FormConnection;
}

export default connectToForm;
