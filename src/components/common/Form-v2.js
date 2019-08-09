import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import without from "lodash.without";
import assign from "lodash.assign";
import { connect } from "react-redux";
import * as actions from "../../actions/FormActions";

class form extends PureComponent {
	displayNamen = "Form";

	constructor(props) {
		super(props);
		if (props.registerCheckForm) {
			props.registerCheckForm(this.isFormValid);
		}
	}

	componentWillUnmount() {
		this.props.resetState();
	}

	state = {
		isValid: false,
		activeFilters: []
	};

	getChildContext = () => {
		return {
			reset: this.reset,
			status: this.props.status,
			registerValidation: this.registerValidation,
			isFormValid: this.isFormValid,
			updateFilters: this.updateFilters,
			activeFilters: this.state.activeFilters,
			updateValue: this.updateValue,
			isValid: this.state.isValid,
			onSubmit: this.submit,
			registerReset: this.registerReset,
			registerBeforeSubmit: this.registerBeforeSubmit,
			errorMessage: this.props.err
		};
	};

	updateValue = (name, value) => {
		this.props.updateValue(name, value);
		if (setTimeout(() => this.isFormValid(false), 0)) {
		}
	};

	resetFuncs = [];

	registerReset = resetFunc => {
		this.resetFuncs = [...this.resetFuncs, resetFunc];
		return this.removeReset.bind(null, resetFunc);
	};

	beforeSubmitFun = null;

	registerBeforeSubmit = fun => {
		this.beforeSubmitFun = fun;
	};

	removeReset = ref => {
		this.resetFuncs = without(this.resetFuncs, ref);
	};

	reset = () => {
		this.resetFuncs.forEach(f => f());
	};

	validations = [];

	registerValidation = isValidFunc => {
		this.validations = [...this.validations, isValidFunc];
		return this.removeValidation.bind(null, isValidFunc);
	};

	removeValidation = ref => {
		this.validations = without(this.validations, ref);
	};

	isFormValid = showErrors => {
		var isValid = this.props.customIsFormValid
			? this.props.customIsFormValid()
			: this.validations.reduce(
					(memo, isValidFunc) => isValidFunc(showErrors) && memo,
					true
			  );

		this.setState({
			isValid: isValid
		});

		if (isValid) {
			if (this.props.formValidCallback) {
				this.props.formValidCallback(this.props.name);
			}
		} else {
			if (this.props.formInvalidCallback) {
				this.props.formInvalidCallback(this.props.name);
			}
		}
		return isValid;
	};

	updateFilters = (filter, value) => {
		this.props.updateFilters(filter, value);
		this.setState({
			activeFilters: assign({}, this.state.activeFilters, {
				[filter]: value
			})
		});
	};

	submit = async (submitActions, submitName) => {
		if (this.isFormValid(true)) {
			!!this.beforeSubmitFun && (await this.beforeSubmitFun());
			this.props.onSubmit(submitActions, submitName);
		}
	};

	render() {
		let err = this.props.err;
		if (err && err.description) {
			err = err.description;
		} else if (err && err.message) {
			err = err.message;
		}

		return (
			<>
				<form>{this.props.children}</form>
				{err && !this.props.noError ? (
					<div className="errors">
						<p>{typeof err === "string" ? err : "There was an error"}</p>
					</div>
				) : null}
			</>
		);
	}
}

function mapStateToProps(state, ownprops) {
	return {
		activeFilters: state.forms[ownprops.name]
			? state.forms[ownprops.name].filters
			: [],
		children: ownprops.children,
		form: state.forms[ownprops.name] ? state.forms[ownprops.name] : {},
		status: state.forms[ownprops.name] ? state.forms[ownprops.name].status : {},
		err: state.forms[ownprops.name]
			? state.forms[ownprops.name].status.err
			: null
	};
}

function mapDispatchToProps(dispatch, ownProps) {
	return {
		updateValue: (name, value) => {
			dispatch(actions.updateFormValue(name, value, ownProps.name));
		},
		updateFilters: (filter, value) => {
			dispatch(actions.updateFilters(filter, value, ownProps.name));
		},
		resetState: () => {
			dispatch(actions.resetState(ownProps.name));
		},
		onSubmit: (form, submitActions, submitName) => {
			dispatch(actions.submitRequested(ownProps.name, submitName));
			submitActions(form, err =>
				dispatch(
					actions.handleSubmitResult(
						ownProps.name,
						err,
						submitName,
						ownProps.resetStatusOnSucces
					)
				)
			);
		}
	};
}

function mergeProps(stateProps, dispatchProps, ownProps) {
	return Object.assign({}, ownProps, {
		children: stateProps.children,
		updateValue: dispatchProps.updateValue,
		updateFilters: (filter, value) =>
			dispatchProps.updateFilters(filter, value, ownProps.name),
		onSubmit: (submitActions, submitName) =>
			dispatchProps.onSubmit(stateProps.form, submitActions, submitName),
		err: stateProps.err,
		status: stateProps.status,
		form: stateProps.form,
		resetState: dispatchProps.resetState
	});
}

form.childContextTypes = {
	reset: PropTypes.func,
	status: PropTypes.object,
	registerValidation: PropTypes.func,
	registerBeforeSubmit: PropTypes.func,
	isFormValid: PropTypes.func,
	updateFilters: PropTypes.func,
	activeFilters: PropTypes.any,
	updateValue: PropTypes.func,
	isValid: PropTypes.bool,
	onSubmit: PropTypes.func,
	registerReset: PropTypes.func,
	errorMessage: PropTypes.string
};

const SmartForm = connect(
	mapStateToProps,
	mapDispatchToProps,
	mergeProps
)(form);

export default props => <SmartForm {...props} />;
export { default as Text } from "./Text";
export { default as Textfield } from "./Textfield";
export { default as TextBox } from "./TextBox";
export { default as LocationSelector } from "./LocationSelector";
export { default as LocationSelectorSimple } from "./LocationSelectorSimple";
export { default as ToggleButton } from "./ToggleButton";
export { default as Button } from "./Button";
export { default as ToggleButtonHandler } from "./ToggleButtonHandler";
export { default as RegistrationElement } from "./RegistrationElement";
export { default as ToggleOptions } from "./ToggleOptions";
