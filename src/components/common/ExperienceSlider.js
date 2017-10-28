import React, {Component} from 'react'
import PropTypes from 'prop-types'
import Slider from 'material-ui/Slider'

/**
 * The slider bar can have a set minimum and maximum, and the value can be
 * obtained through the value parameter fired on an onChange event.
 */
class ExperienceSlider extends Component{

  propTypes= {
    name: PropTypes.string,
    queupGigs: PropTypes.number,
    experienceCount: PropTypes.number,
  }

  state={
    value: 0,
  }

  componentWillMount(){
    if (this.props.otherGigs !== undefined) {
      this.setState({
        value: this.props.queupGigs + this.props.otherGigs,
        queupGigs: this.props.queupGigs,
        experienceCount: this.props.otherGigs,
      })
    }
  }

  componentWillUnmount(){
  }

  timer = null

  handleChange = (event, value) => {
    this.setState({value: value}, ()=>  {
      if (this.context.isFormValid) {
        this.context.isFormValid(false)
      }})

    clearTimeout(this.timer)
    this.timer = setTimeout(() =>
      this.context.updateValue(this.props.name, (value-this.state.queupGigs)), 1000)
  }

  render() {
    function getValueString(value){
      switch (value) {
        case 0:
          return "0"

        case 100:
          return "more than a 100"

        default:
          return "around " + value

      }
    }
    return (
      <div>
        <Slider
          {...this.props}
          style={{
            width:"100%",
            height: '48px',
          }}
          min={this.props.queupGigs}
          max={100}
          step={1}
          disableFocusRipple={true}
          value={this.state.value}
          onChange={this.handleChange}
        />
        <p>
          {"You have played " + getValueString(this.state.value) + " gigs, where " +  this.state.queupGigs + " of those were using queup."}
        </p>
      </div>
    )
  }
}

ExperienceSlider.contextTypes= {
  resetting: PropTypes.bool,
  isFormValid: PropTypes.func,
  registerValidation: PropTypes.func.isRequired,
  updateValue: PropTypes.func
}


export default ExperienceSlider
