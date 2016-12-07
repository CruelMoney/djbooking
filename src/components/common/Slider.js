import React, {PropTypes} from 'react'
import Nouislider from 'react-nouislider'
import connectToForm from './higher-order/connectToForm'

/**
 * The slider bar can have a set minimum and maximum, and the value can be
 * obtained through the value parameter fired on an onChange event.
 */
var Slider = React.createClass({

  propTypes: {
    name: PropTypes.string,
    value: PropTypes.arrayOf(PropTypes.number),
    range: PropTypes.object,
    step: PropTypes.number,
    handleChange: PropTypes.func,
    format: PropTypes.object,
  },


  contextTypes: {
    color: PropTypes.string,
  },



  handleChange(values, handle) {
    this.props.onChange(values, handle)
  },

  render() {
    return (
      <div style={{visibility:"hidden", color: this.context.color, borderColor: this.context.color}}>
        <Nouislider
          disabled={this.props.disabled}
          range={this.props.range}
          step={this.props.step}
          start={this.props.value.map(val => Number(val))}
          onChange={this.handleChange}
          onSlide={this.handleChange}
          format={this.props.format}
          connect={this.props.connect}
        />
        </div>
    )
  }
})

export default connectToForm(Slider)
