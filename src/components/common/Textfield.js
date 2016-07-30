import React, { PropTypes } from 'react'
import TextField from 'material-ui/TextField'
import Radium from 'radium'
import muiThemeable from 'material-ui/styles/muiThemeable'
import * as validators from '../../utils/validators'


var Text = React.createClass({

  displayName: 'Textfield',

  propTypes: {
    value: PropTypes.string,
    maxLength:PropTypes.number,
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    info: PropTypes.string,
    label: PropTypes.string,
    validate: PropTypes.arrayOf(PropTypes.string),
    onUpdatePipeFunc: PropTypes.func,
    disabled: PropTypes.bool
  },

  contextTypes: {
    registerValidation: PropTypes.func.isRequired,
    updateValue: PropTypes.func,
    isFormValid: PropTypes.func
  },

  componentWillMount() {
    if (this.props.value !== undefined) {
      this.setState({
        value: this.props.value
      })
    }

    this.removeValidationFromContext = this.context.registerValidation(show =>
      this.isValid(show))
  },

  componentWillReceiveProps(nextprops){
    if (nextprops.value !== undefined) {
    this.setState({
      value: nextprops.value
    })
  }
  },

  componentWillUnmount() {
    this.removeValidationFromContext()
  },



  getDefaultProps() {
    return {
      type: "string",
      active: true,
      validate: []
    }
  },

  getInitialState() {
    return {
      value: "",
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
      },

      paragraph: {
        fontSize: '14px',
      },

      input:{
        fontSize: '30px',
        color: this.props.muiTheme.palette.primary1Color,
        fontWeight: '300',
      },

      hint:{
        bottom: '20px',
        fontSize: '30px',
        fontWeight: '300',
      }

    }
    return (
                <TextField
                  value={this.state.value}
                  name={this.props.name}
                  disabled={this.props.disabled}
                  maxLength= {this.props.maxLength}
                  style = {this.props.style || styles.textarea}
                  inputStyle = {this.props.inputStyle || styles.input}
                  hintStyle = {this.props.hintStyle || styles.hint}
                  underlineDisabledStyle = {this.props.underlineDisabledStyle}
                  underlineStyle = {this.props.underlineStyle}
                  type = {this.props.type}
                  fullWidth={this.props.fullWidth || true}
                  hintText={this.props.placeholder}
                  onChange={this.onChange}
                  onBlur={this.onBlur}
                  errorText={this.state.errors.length ? (
                    <div>
                      {this.state.errors.map((error, i) => <div key={i}>{error}</div>)}
                    </div>
                  ) : null}/>



    )
  }
})

var StyledText = Radium(Text)
export default muiThemeable()(StyledText)
