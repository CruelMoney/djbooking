import React, { Component } from "react";
import PropTypes from "prop-types";
import * as validators from "../../utils/validators";

function connectToForm(WrappedComponent) {
	class FormConnection extends Component {
		static contextTypes = {
			registerValidation: PropTypes.func,
			updateValue: PropTypes.func,
			registerReset: PropTypes.func,
			registerBeforeSubmit: PropTypes.func
		};

		constructor(props, context) {
			super(props, context);
			const { dontUpdateOnMount, value } = props;
			if (
				typeof value !== "undefined" &&
				value !== null &&
				!dontUpdateOnMount
			) {
				this.onChange(value);
			}
			if (context.registerValidation) {
				this.removeValidationFromContext = context.registerValidation(show =>
					this.isValid(show)
				);
			}
			if (context.registerReset) {
				this.removeReset = context.registerReset(() =>
					this.setState({ value: props.value })
				);
			}
			if (context.registerBeforeSubmit) {
				context.registerBeforeSubmit(this.beforeSubmit);
			}
		}

		//errors needs to exist
		state = {
			errors: []
		};

		setErrors = errors => {
			this.setState(state => ({
				errors
			}));
		};

		isValid = (showErrors, value = this.state.value) => {
			let errors = this.state.errors;

			if (this.props.validate) {
				const newErrors = this.props.validate.reduce(
					(memo, currentName) => memo.concat(validators[currentName](value)),
					this.props.errors || []
				);

				errors = newErrors;

				if (showErrors) {
					this.setState({
						errors
					});
				}
			}

			const valid = !errors.length;

			return valid;
		};

		beforeSubmit = _ => {
			if (this.props.updateBeforeSubmit) {
				return this.updateValue(this.state.value);
			}
		};

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
				return this.context.updateValue(this.props.name, value);
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
