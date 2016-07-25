import React, { PropTypes } from 'react'
import TextField from 'material-ui/TextField'
import Radium from 'radium'
import muiThemeable from 'material-ui/styles/muiThemeable'
import * as validators from '../../utils/validators'


var Text = React.createClass({

  displayName: 'Textfield',

  propTypes: {
    maxLength:PropTypes.number,
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    info: PropTypes.string,
    value: PropTypes.string,
    type: PropTypes.string,
    label: PropTypes.string,
    validate: PropTypes.arrayOf(PropTypes.string),
    onUpdatePipeFunc: PropTypes.func
  },

  contextTypes: {
    registerUpdate: PropTypes.func.isRequired,
    registerValidation: PropTypes.func.isRequired
  },

  componentWillMount() {
    this.setState({
      value: this.props.value
    })
    this.removeValidationFromContext = this.context.registerValidation(show =>
      this.isValid(show))
    this.removeUpdateFromContext = this.context.registerUpdate(() =>
        {return {name: this.props.name, value: this.state.value}})
  },

  componentWillReceiveProps(nextProps){
    this.setState({
      value: nextProps.value
    })
  },

  componentWillUnmount() {
    this.removeValidationFromContext()
    this.removeUpdateFromContext()
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
    this.setState({
      value: value
    })

    setTimeout(() => {
        this.isValid(true)
        }, 100)
  },

  onChange(event) {
    var value = event.target.value
    if (this.props.onUpdatePipeFunc) {
        value = this.props.onUpdatePipeFunc(this.state.value, event.target.value)
    }
    this.updateValue(value)
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
                  {...this.props}
                  value={this.state.value}
                  name={this.props.name}
                  maxLength= {this.props.maxLength}
                  style = {this.props.style || styles.textarea}
                  inputStyle = {this.props.inputStyle || styles.input}
                  hintStyle = {this.props.hintStyle || styles.hint}
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
