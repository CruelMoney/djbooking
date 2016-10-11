import React, {PropTypes} from 'react'
import Slider from './Slider'
import moment from 'moment'
import wNumb from 'wnumb'

var TimeSlider = React.createClass({
  propTypes:{
    date: PropTypes.object, //moment object
    onChange: PropTypes.func
  },

    contextTypes: {
      resetting: PropTypes.bool,
      isFormValid: PropTypes.func,
      registerValidation: PropTypes.func.isRequired,
      updateValue: PropTypes.func
    },

  componentWillMount(){
    const startTime =  moment().hour(21).minutes(0)            // default starttime
    const endTime   =  moment(startTime).hour(27).minutes(0)                   // default endtime

      this.setState({
        startTime: startTime.unix(),
        endTime: endTime.unix()
      })

      this.updateContext(this.props.date, startTime.unix(), endTime.unix())
  },

  componentWillReceiveProps(nextprops){
    if (nextprops.date.unix() !== this.props.date.unix()) {
      this.updateContext(nextprops.date, this.state.startTime, this.state.endTime)
    }
  },


  componentWillUnmount(){

  },

  updateContext(date, startTime, endTime){
    this.context.updateValue("startTime", this.getStartMoment(date,startTime, endTime).toDate())
    this.context.updateValue("endTime", this.getEndMoment(date,startTime, endTime).toDate())
  },


  getHoursDiff(startValue, endValue){
    return moment.unix(endValue).diff(moment.unix(startValue))/60/60/1000
  },

  getStartMoment(date,startValue, endValue){
    const startTime = moment.unix(startValue)

    return moment(date).hour(startTime.hour()).minutes(startTime.minutes())
  },

  getEndMoment(date, startValue, endValue){
    const hours = this.getHoursDiff(startValue, endValue)

    const startMoment = this.getStartMoment(date, startValue, endValue)

    const endMoment = moment(startMoment).hour(startMoment.hour()+hours)

    return endMoment
  },


  render() {
    const rangeMin  =  moment().hour(7).minutes(0)
    const rangeMax  =  moment(rangeMin).hour(32).minutes(0)

    const startTime = this.state.startTime
    const endTime = this.state.endTime

    return (
      <div>
        <div>
          <Slider
            name="time"
            range={{
              min: rangeMin.unix(),
              max: rangeMax.unix()
            }}
            step={30 * 60} //Steps of half hour
            connect={true}
            initialValues={[
              startTime,
              endTime
            ]}
            handleChange={(values) => {
              this.setState({
                startTime: values[0],
                endTime: values[1]
              })
              if (this.context.updateValue) {
                this.updateContext(this.props.date, values[0], values[1])
              }
              if (this.props.onChange)
              {this.props.onChange(values)}
            }}
            format={ wNumb({
              decimals: 0,
            })}

          />
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between'
          }}>
          <p>{"Start: " + moment.unix(startTime).format("HH:mm")}</p>
          <p>{"Hours: " + moment.unix(endTime).diff(moment.unix(startTime))/60/60/1000 }</p>
          <p>{"End: " + moment.unix(endTime).format("HH:mm")}</p>
        </div>
      </div>
    )
  }
})

export default TimeSlider
