import React from 'react'
import DatePicker from 'react-datepicker'
import moment from 'moment'
import Button from './Button'


export default React.createClass({
  displayName: 'Example',

  getInitialState: function() {
    return {
      startDate: moment()
    }
  },

  handleChange: function(date) {
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
            onClick={()=>null}/>
        </div>
      </div>
    )
  }
})
