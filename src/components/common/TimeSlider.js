import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Slider from './Slider'
import moment from 'moment'
import wNumb from 'wnumb'

class TimeSlider extends Component{
  static proptypes = {
    date: PropTypes.object, //moment object
    startTime: PropTypes.object,
    endTime: PropTypes.object,
    disabled: PropTypes.bool,
    onChange: PropTypes.func
  }

    initStart = moment().hour(21).minutes(0)
    initEnd =  moment().hour(27).minutes(0)

  componentWillMount(){
    if (this.props.startTime && this.props.endTime) {
      this.initStart = moment(this.props.startTime)
      this.initEnd   = moment(this.props.endTime)
    }

      this.setState({
        startTime: moment(this.initStart).unix(),
        endTime: moment(this.initEnd).unix()
      })

      this.updateContext(this.props.date, this.initStart.unix(), this.initEnd.unix())

      if (this.context.registerReset) {
        this.removeReset = this.context.registerReset(()=>
        this.handleChange(
          [this.initStart.unix(), this.initEnd.unix()]
        ))
      }
  }

  componentWillReceiveProps(nextprops){
    if (nextprops.date.unix() !== this.props.date.unix()) {
      this.updateContext(nextprops.date, this.state.startTime, this.state.endTime)
    }
  }


  componentWillUnmount(){
    if (this.removeReset) {
      this.removeReset()
    }  
  }

  timer = null

  handleChange = (values) => {
    if (this.props.onChange)
    {this.props.onChange(values)}

    this.setState({
      startTime: values[0],
      endTime: values[1]
    })

    clearTimeout(this.timer);
    this.timer = setTimeout(
      ()=>{
      if (this.context.updateValue) {
        this.updateContext(this.props.date, values[0], values[1])
      }}
      , 500);
  }

  updateContext = (date, startTime, endTime) => {
    this.context.updateValue("startTime", this.getStartMoment(date,startTime, endTime).toDate())
    this.context.updateValue("endTime", this.getEndMoment(date,startTime, endTime).toDate())
  }


  getHoursDiff = (startValue, endValue) => {
    return moment.unix(endValue).diff(moment.unix(startValue))/60/60/1000
  }

  getStartMoment = (date,startValue, endValue) => {
    const startTime = moment.unix(startValue)

    return moment(date).hour(startTime.hour()).minutes(startTime.minutes())
  }

  getEndMoment = (date, startValue, endValue) =>{
    const hours = this.getHoursDiff(startValue, endValue)

    const startMoment = this.getStartMoment(date, startValue, endValue)

    const endMoment = moment(startMoment).hour(startMoment.hour()+hours)

    return endMoment
  }


  render() {
    const rangeMin  =  moment(this.initStart).hour(7).minutes(0)
    const rangeMax  =  moment(rangeMin).hour(32).minutes(0)

    const startTime = this.initStart.unix()
    const endTime = this.initEnd.unix()

    return (
      <div>
        <div>
          <Slider
            disabled={this.props.disabled}
            name="time"
            range={{
              min: rangeMin.unix(),
              max: rangeMax.unix()
            }}
            step={30 * 60} //Steps of half hour
            value={[
              startTime,
              endTime
            ]}
            onChange={this.handleChange}
            format={ wNumb({
              decimals: 0,
            })}

          />
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginTop: '10px'
          }}>
          <p>{"Start: " + moment.unix(this.state.startTime).format("HH:mm")}</p>
          <p><span>{moment.unix(this.state.endTime).diff(moment.unix(this.state.startTime))/60/60/1000 } hours</span></p>
          <p>{"End: " + moment.unix(this.state.endTime).format("HH:mm")}</p>
        </div>
      </div>
    )
  }
}

TimeSlider.contextTypes = {
  resetting: PropTypes.bool,
  isFormValid: PropTypes.func,
  registerValidation: PropTypes.func.isRequired,
  updateValue: PropTypes.func,
  registerReset: PropTypes.func
}

export default TimeSlider
