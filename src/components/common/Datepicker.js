import React from 'react'
import DatePicker from 'react-datepicker'
import moment from 'moment'

import 'react-datepicker/dist/react-datepicker.css'


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
    return <DatePicker
      inline
        selected={this.state.startDate}
        onChange={this.handleChange} />
  }
})
