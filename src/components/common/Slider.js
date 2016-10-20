import React, {PropTypes} from 'react'
import Nouislider from 'react-nouislider'


/**
 * The slider bar can have a set minimum and maximum, and the value can be
 * obtained through the value parameter fired on an onChange event.
 */
var Slider = React.createClass({

  propTypes: {
    name: PropTypes.string,
    initialValues: PropTypes.number,
    range: PropTypes.object,
    connect: PropTypes.bool,
    step: PropTypes.number,
    handleChange: PropTypes.func,
    format: PropTypes.object,
  },

  componentWillMount(){
    this.setState({
      values: this.props.initialValues
    })
    this.context.updateValue(this.props.name, this.props.initialValues)
  },

  contextTypes: {
    resetting: PropTypes.bool,
    isFormValid: PropTypes.func,
    registerValidation: PropTypes.func.isRequired,
    updateValue: PropTypes.func,
    disabled: PropTypes.bool
  },


  timer : null,

  handleChange(values, handle) {
    this.props.handleChange(values, handle)
    this.setState({
      values
    })

    if (this.context) {
      if (this.context.isFormValid) {
        this.context.isFormValid(false)
      }
      if (this.context.updateValue) {
        this.context.updateValue(this.props.name, values)
      }
    }
  },

  render() {

    return (
        <Nouislider
          disabled={this.props.disabled}
          range={this.props.range}
          step={this.props.step}
          start={this.state.values}
          connect={this.props.connect}
          onChange={this.handleChange}
          onSlide={this.props.onSlide}
          format={this.props.format}
        />
    )
  }
})

export default Slider
