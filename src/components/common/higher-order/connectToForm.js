import React, {PropTypes} from 'react'
import * as validators from '../../../utils/validators'

function connectToForm(Component) {
  const FormConnection = React.createClass({
    contextTypes: {
      registerValidation: PropTypes.func.isRequired,
      updateValue: PropTypes.func,
      registerReset: PropTypes.func,
    },

    //errors needs to exist
    getInitialState() {
      return {
        errors: []
      }
    },

    componentWillMount() {
        if (this.props.value) {
          this.updateValue(this.props.value)
        }
        if (this.context.registerValidation) {
          this.removeValidationFromContext = this.context.registerValidation(show =>
            this.isValid(show))
        }
        if (this.context.registerReset) {
          this.removeReset = this.context.registerReset(()=>this.setState({value: this.props.defaultValue}))
        }
    },

    componentWillUnmount() {
      if (this.removeValidationFromContext) {
          this.removeValidationFromContext()
      }
      if (this.removeReset) {
        this.removeReset()
      }
    },

    onChange(value) {
      if (this.props.onUpdatePipeFunc) {
          value = this.props.onUpdatePipeFunc(this.state.value, value)
      }
      this.setState({
        value:value
      })
      this.isValid(true, value)
      this.updateValue(value)

      if (this.props.onChange) {
        this.props.onChange(value)
      }
    },

    timer : null,

    updateValue(value) {
      if (this.context.updateValue) {
        clearTimeout(this.timer)
        this.timer = setTimeout(() =>
          this.context.updateValue(this.props.name, value)
        , 500)
      }
    },

    onBlur() {
      setTimeout(() => {
          this.isValid(true)
          }, 100)
    },

    isValid(showErrors, value = this.state.value) {

      if (this.props.validate) {
        if (typeof value !== 'undefined') {
        const errors = this.props.validate
          .reduce((memo, currentName) =>
            memo.concat(validators[currentName](
              value
            )), [])


        if (showErrors) {
          this.setState({
            errors
          })
        }

        return !errors.length

        }else{
            return false
        }

      }
      return true
    },

    render() {

      return <Component
        {...this.props}
        {...this.state}
        onChange={this.onChange}
        onBlur={this.onBlur}
             />;
    }
  });
  return FormConnection;
};

export default connectToForm
