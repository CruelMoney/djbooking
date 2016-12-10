import React, {PropTypes} from 'react'
import * as validators from '../../utils/validators'

function connectToForm (
  Component
) {
  class FormConnection extends React.Component<>{
    static contextTypes = {
      registerValidation: PropTypes.func.isRequired,
      updateValue: PropTypes.func,
      registerReset: PropTypes.func,
    }

    //errors needs to exist
    state = {
      errors: []
    }

    isValid = (showErrors:boolean, value:any = this.state.value) => {
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
    }

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
    }

    componentWillUnmount() {
      if (this.removeValidationFromContext) {
          this.removeValidationFromContext()
      }
      if (this.removeReset) {
        this.removeReset()
      }
    }

    timer : null

    onChange = (value) => {
      if (this.props.onUpdatePipeFunc) {
          value = this.props.onUpdatePipeFunc(this.state.value, value)
      }
      this.setState({
        value:value
      })
        clearTimeout(this.timer)
        this.timer = setTimeout(() =>{
          this.isValid(true, value)
          this.updateValue(value)}
      , 500)
      if (this.props.onChange) {
        this.props.onChange(value)
      }
    }


    updateValue = (value) => {
      if (this.context.updateValue) {
          this.context.updateValue(this.props.name, value)
      }
    }

    onBlur = () => {
      setTimeout(() => {
          this.isValid(true)
          }, 100)
    }

    render() {
      return <Component
        {...this.props}
        {...this.state}
        onChange={this.onChange}
        onBlur={this.onBlur}
             />;
    }
  }
  return FormConnection;
};

export default connectToForm
