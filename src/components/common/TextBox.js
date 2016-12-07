import React, { PropTypes } from 'react'
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
    isFormValid: PropTypes.func,
    registerReset: PropTypes.func,
    color: PropTypes.string
  },


  componentWillMount() {
    if (this.props.value !== undefined) {
      this.setState({
        value: this.props.value
      })
    }
    if (this.context.registerValidation) {
      this.removeValidationFromContext = this.context.registerValidation(show =>
        this.isValid(show))
    }


    if (this.context.updateValue) {
      this.context.updateValue(this.props.name, this.props.value)
    }

    if (this.context.registerReset) {
      this.removeReset = this.context.registerReset(()=>this.setState({value: this.props.value}))
    }

  },

  componentWillUnmount() {
    if (this.context.removeValidationFromContext) {
      this.removeValidationFromContext()
    }

    if (this.removeReset) {
      this.removeReset()
    }  },

  timer: null,

  componentWillReceiveProps(nextProps) {

},

  getDefaultProps() {
    return {
      active: true,
      validate: [],
      height: '100%', width: '100%',
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
        color:  this.context.color,
        backgroundColor: 'transparent',
        borderStyle: 'solid',
        borderWidth: "1px",
        borderColor: "#BBBBBB",
        outline: "none",
        resize: 'none',
        borderRadius: '6px',
        padding: '4px',
        transition: 'border 0.4s',
        ':focus': {
          borderColor:  this.context.color
        }
      },




    }

    let { validate, active, ...props} =  this.props
    validate = active
    active = validate
    return (

              <div>
                <textarea
                  {...props}
                  style={styles.base}
                  value={this.state.value}
                  name={this.props.name}
                  onChange={this.onChange}


                />
                {this.state.errors.length ? (
                  <div className="errors" style={{marginTop:"5px"}}>
                    {this.state.errors.map((error, i) => <p  className="error" key={i}>{error}</p>)}
                  </div>
                ) : null}
              </div>





    )
  }
})

export default TextBox
