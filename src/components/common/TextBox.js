import React, { PropTypes } from 'react'
import Radium from 'radium'
import muiThemeable from 'material-ui/styles/muiThemeable'
import * as validators from '../../utils/validators'


var TextBox = React.createClass({

  propTypes: {
    maxLength:PropTypes.number,
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    validate: PropTypes.arrayOf(PropTypes.string),
    onUpdatePipeFunc: PropTypes.func,
    height: PropTypes.string,
    width: PropTypes.string,
  },

  contextTypes: {
    registerValidation: PropTypes.func.isRequired,
    updateValue: PropTypes.func,
    isFormValid: PropTypes.func
  },

  getDefaultProps() {
      return {
        height: '100%', width: '100%',
      }
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

  componentWillUnmount() {
    this.removeValidationFromContext()
  },

  timer: null,

  componentWillReceiveProps(nextProps) {
    if (nextProps.value !== undefined) {
    this.setState({
      value: nextProps.value
    })
  }
},

  getDefaultProps() {
    return {
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
    }, ()=>  {
      if (this.context.isFormValid) {
        this.context.isFormValid(false)
      }})


    setTimeout(() => {
        this.isValid(true)
        }, 100)

    clearTimeout(this.timer)
    this.timer = setTimeout(() =>
      this.context.updateValue(this.props.name, value), 500)
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

      base: {
        height: this.props.height,
        width: this.props.width,
        fontFamily: this.props.muiTheme.fontFamily,
        color:  this.props.muiTheme.palette.textColor,
        backgroundColor: 'transparent',
        borderStyle: 'solid',
        borderWidth: "2px",
        borderColor: "#eee",
        outline: "none",
        resize: 'none',
        borderRadius: '6px',
        padding: '4px',

        ':focus': {
          borderColor:  this.props.muiTheme.palette.primary1Color
        }
      },




    }

    return (
              <div>
                <textarea
                  {...this.props}
                  style={[
                    styles.base,

                  ]}
                  value={this.state.value}
                  name={this.props.name}
                  onChange={this.onChange}


                />
                {this.state.errors.length ? (
                  <div>
                    {this.state.errors.map((error, i) => <div key={i}>{error}</div>)}
                  </div>
                ) : null}
              </div>





    )
  }
})

var StyledTextBox = Radium(TextBox)
export default muiThemeable()(StyledTextBox)
