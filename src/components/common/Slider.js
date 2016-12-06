import React, {PropTypes} from 'react'
import Nouislider from 'react-nouislider'


/**
 * The slider bar can have a set minimum and maximum, and the value can be
 * obtained through the value parameter fired on an onChange event.
 */
var Slider = React.createClass({

  propTypes: {
    name: PropTypes.string,
    initialValues: PropTypes.arrayOf(PropTypes.number),
    range: PropTypes.object,
    step: PropTypes.number,
    handleChange: PropTypes.func,
    format: PropTypes.object,
  },

  componentWillMount(){
    this.setState({
      values: this.props.initialValues
    })
    this.context.updateValue(this.props.name, this.props.initialValues)

    if (this.context.registerReset) {
      this.removeReset = this.context.registerReset(()=>{
      this.handleChange(this.props.initialValues)}
      )
    }
  },

  componentWillUnmount(){
    if (this.removeReset) {
      this.removeReset()
    }  },

  contextTypes: {
    resetting: PropTypes.bool,
    isFormValid: PropTypes.func,
    registerValidation: PropTypes.func.isRequired,
    updateValue: PropTypes.func,
    disabled: PropTypes.bool,
    registerReset: PropTypes.func,
    color: PropTypes.string,
  },


  timer : null,

  handleChange(values, handle) {
    this.props.handleChange(values, handle)
    this.setState({
      values
    })

    clearTimeout(this.timer);
    this.timer = setTimeout(
      ()=>{if (this.context.updateValue) {
        this.context.updateValue(this.props.name, values)
      }}
      , 500);


  },

  render() {

    return (
      <div style={{visibility:"hidden", color: this.context.color, borderColor: this.context.color}}>
        <Nouislider
          disabled={this.props.disabled}
          range={this.props.range}
          step={this.props.step}
          start={this.state.values.map(val => Number(val))}
          onChange={this.handleChange}
          onSlide={this.handleChange}
          format={this.props.format}
          connect={this.props.connect}
        />
        </div>
    )
  }
})

export default Slider
