import React, { PropTypes } from 'react'
import TextField from 'material-ui/TextField'
import Radium from 'radium'
import * as validators from '../../utils/validators'


var Text = React.createClass({

  displayName: 'Textfield',

  propTypes: {
    defaultValue: PropTypes.string,
    controlledValue: PropTypes.string,
    maxLength:PropTypes.number,
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    info: PropTypes.string,
    label: PropTypes.string,
    validate: PropTypes.arrayOf(PropTypes.string),
    onUpdatePipeFunc: PropTypes.func,
    disabled: PropTypes.bool,
    floatingLabelText: PropTypes.string
  },

  contextTypes: {
    registerValidation: PropTypes.func.isRequired,
    updateValue: PropTypes.func,
    isFormValid: PropTypes.func,
    registerReset: PropTypes.func,
    color: PropTypes.string
  },

  componentWillMount() {
    if (this.context.registerValidation) {
      this.removeValidationFromContext = this.context.registerValidation(show =>
        this.isValid(show))
    }

      this.setState({
        value: this.props.defaultValue || ""
      })

      if (this.context.updateValue) {
        this.context.updateValue(this.props.name, this.props.defaultValue)
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



  getDefaultProps() {
    return {
      type: "string",
      validate: []
    }
  },

  getInitialState() {
    return {
      errors: []
    }
  },


  updateValue(value) {
    this.context.updateValue(this.props.name, value)
  },

  timer : null,

  onChange(event) {
    var value = event.target.value
    if (this.props.onUpdatePipeFunc) {
        value = this.props.onUpdatePipeFunc(this.state.value, event.target.value)
    }

    this.setState({
      value:value
    }, ()=>  {
      if (this.context.isFormValid) {
        this.context.isFormValid(false)
      }})


    setTimeout(() => {
        this.isValid(true)
        }, 100)


    clearTimeout(this.timer)
    this.timer = setTimeout(() => this.updateValue(value), 500)

  },

  onBlur() {
    setTimeout(() => {
        this.isValid(true)
        }, 100)
  },

  isValid(showErrors) {

    const errors = this.props.validate
      .reduce((memo, currentName) =>
        memo.concat(validators[currentName](
          this.state.value
        )), [])


    if (showErrors) {
      this.setState({
        errors
      })
    }

    return !errors.length
  },

  render() {
    var styles = {

      textarea: {
        height: '70px',
        marginTop: "-10px"
      },

      paragraph: {
        fontSize: '14px',
      },

      input:{
        fontSize: '30px',
        color: this.context.color,
        fontFamily: "AvenirNext-Regular"
      },
      underlineStyle:{
        borderColor: this.context.color
      },
      hint:{
        bottom: '23px',
        fontSize: '30px',
        color: "rgba(187,187,187,0.5)",
        fontFamily: "AvenirNext-Regular",
      }

    }
    return (

                <TextField
                  value={this.props.controlledValue || this.state.value || null}
                  name={this.props.name}
                  disabled={this.props.disabled}
                  maxLength={this.props.maxLength}
                  style={this.props.style || styles.textarea}
                  inputStyle={this.props.inputStyle || styles.input}
                  hintStyle={this.props.hintStyle || styles.hint}
                  underlineDisabledStyle={this.props.underlineDisabledStyle}
                  underlineFocusStyle={styles.underlineStyle}
                  type={this.props.type}
                  floatingLabelText={this.props.floatingLabelText}
                  fullWidth={this.props.fullWidth || true}
                  hintText={this.props.placeholder}
                  onChange={this.onChange}
                  onBlur={this.onBlur}
                  errorText={this.state.errors.length ? (
                    <div style={{
                      bottom: "-10px",
                      position: "relative",
                      zIndex: "1"
                    }}>
                    <div className="errors">
                    {this.state.errors.map((error, i) => <p key={i}>{error}</p>)}
                    </div>
                    </div>
                  ) : null}/>




    )
  }
})

export default Radium(Text)
