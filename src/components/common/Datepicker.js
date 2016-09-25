import React, { PropTypes } from 'react'
import DatePicker from 'react-datepicker'
import moment from 'moment'
import Button from './Button'
import "react-datepicker/dist/react-datepicker.min.css";


export default React.createClass({

    propTypes:{
      handleChange: PropTypes.func,
      handleButtonClick: PropTypes.func
    },

  getInitialState: function() {
    return {
      startDate: moment()
    }
  },

  handleChange: function(date) {
    this.props.handleChange(date)
    this.setState({
      startDate: date
    })
  },

  render: function() {
    return (
      <div className="calendar-container">
        <h1 style={{color:'white', marginBottom:'20px', marginTop:'0px'}}>
          Pick date of event
        </h1>
        <DatePicker
          fixedHeight
          inline
          minDate={moment()}
          selected={this.state.startDate}
          onChange={this.handleChange} />
        <div style={{marginTop:'20px'}}>
          <Button
            medium
            rounded
            white
            label="GO!"
            onClick={this.props.handleButtonClick}/>
        </div>
      </div>
    )
  }
})
