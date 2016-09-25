import React, {PropTypes} from 'react'
import Slider from './Slider'
import moment from 'moment'
import wNumb from 'wnumb'


var minDate = moment().hour(12).minutes(0)
var maxDate = moment(minDate).hour(32)


var TimeSlider = React.createClass({

  propTypes:{
    startTime: PropTypes.number,
    endTime: PropTypes.number,
    onChange: PropTypes.func
  },

  getInitialState(){
    return{
      startTime:   minDate.hour(21).toDate().getTime(),
      endTime:     maxDate.hour(3).toDate().getTime(),
    }
  },

  componentWillMount(){
    if (this.props.startTime !== undefined) {
      this.setState({
        startTime: this.props.startTime,
        endTime: this.props.endTime
      })
    }
    this.props.onChange([this.state.startTime, this.state.endTime])
  },

  componentWillUnmount(){
  },




  render() {

    const rangeMin = this.props.startTime
    ? moment(this.props.startTime).hour(12).minutes(0).toDate().getTime()
    : moment().hour(12).minutes(0).toDate().getTime()

    const rangeMax = moment(rangeMin).hour(32).toDate().getTime()

    return (
      <div>
        <Slider
          name="time"
          range={{
            min: rangeMin,
            max: rangeMax
          }}
          step={30 * 60 * 1000} //Steps of half hour
          connect={true}
          initialValues={[
            this.state.startTime,
            this.state.endTime
          ]}
          handleChange={(values) => {
            this.setState({
              startTime: values[0],
              endTime: values[1]
            })
            if (this.props.onChange)
            {this.props.onChange(values)}
          }}
        format={ wNumb({
          decimals: 0,
        })}
      />
      </div>
    )
  }
})

export default TimeSlider
