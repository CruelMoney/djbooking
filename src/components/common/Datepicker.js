import React, { PropTypes } from 'react'
import DatePicker from 'react-datepicker'
import moment from 'moment'
import Button from './Button'
import "react-datepicker/dist/react-datepicker.min.css";


export default React.createClass({

    propTypes:{
      handleChange: PropTypes.func,
    },

  getInitialState: function() {
    return {
      startDate: moment()
    }
  },
  contextTypes:{
    color: PropTypes.string
  },
  handleChange: function(date) {
    this.props.handleChange(date)
    this.setState({
      startDate: date
    })
  },

  render: function() {
    return (
      <div style={{color: this.context.color}} className="calendar-container">
        <DatePicker
          fixedHeight
          inline
          minDate={moment()}
          selected={this.state.startDate}
          onChange={this.handleChange} />
      </div>
    )
  }
})
