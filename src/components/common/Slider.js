import React, {PropTypes} from 'react'
import RCSlider, { Range } from 'rc-slider'
import connectToForm from '../higher-order/connectToForm'
import 'rc-slider/assets/index.css'

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

  defaultValue: 0,
  nonLinear: false,
  parsedRange: [],

  componentWillMount(){
    // Range should be an object consisting of at least min & max
    // May consist of percentage values in what case it is a nonlinear scale
    if(Object.keys(this.props.range).length > 2){
      //nonlinear
      this.parsedRange = this.parseRange(this.props.range)
      this.nonLinear = true
        
      
    }
  },

  getDefaultProps(){
    return{
      value: this.defaultValue
    }
  },

  parseRange(range){
    var newRange = []
    Object.keys(this.props.range).map(k=>{
      if(k==="min"){
        newRange.push([0, this.props.range.min])
      }else if (k==="max"){
        newRange.push([100, this.props.range.max])
      }else{
        var perc = parseInt(k)
        if(isNaN(perc)){
          throw new Error("Range not valid")
        }
        newRange.push([perc, this.props.range[k]])
      }
    })
    newRange.sort((a,b)=>(a[0]-b[0]))
    return newRange
  },

   //Helper functions
    getPercentage(max,min,val){
      const newMax = max-min //50
      const newVal = val-min //25
      return (newVal/newMax)*100
    },
    getValue(max,min,perc){
      const newMax = max-min
      return Math.floor(((newMax/100)*perc)+min)
    },

  handleNonLinear(val){
    //calculate the percentage of the max
    //Find the range it falls between
    //calculate linear between those
    var perc = this.getPercentage(
      this.props.range.max, 
      this.props.range.min,
      val)
    
    var withinRange = []
    withinRange[0] = []
    withinRange[1] = []

    this.parsedRange.reduce((last,currentValue,index,arr)=>{
      //still not in the range
      if(currentValue[0] < perc){
        return currentValue
      }else if(last[0] < perc){
        //the range has been found
        withinRange[0][0] = last[0]
        withinRange[0][1] = last[1]
        withinRange[1][0] = currentValue[0]
        withinRange[1][1] = currentValue[1]
        return currentValue
      }else{
        return currentValue
      }
    })

    //recalculate percentage to between the new range
     var middlePerc = this.getPercentage(
      withinRange[1][0],  //max
      withinRange[0][0],  //min
      perc)
    
    return this.getValue(withinRange[1][1],withinRange[0][1],middlePerc)
  },

  contextTypes: {
    color: PropTypes.string,
  },



  handleChange(values) {
    values = (Array.isArray(values)) ? values : [values]

    if(this.nonLinear){
      values = values.map(this.handleNonLinear)
    }
    this.props.onChange(values)
  },

  render() {

          /*
          OLD noUI slider
          range={this.props.range}
          step={this.props.step}
          start={this.props.value.map(val => Number(val))}
          onChange={this.handleChange}
          onSlide={this.handleChange}
          format={this.props.format}
        connect={this.props.connect}*/
    return (
      <div style={{ visibility:"hidden", display:"flex", backgroundColor: this.context.color, borderColor: this.context.color}}>
        {this.props.value.length > 1 ? 
          <Range
            disabled={this.props.disabled}
            min={this.props.range.min}
            max={this.props.range.max}
            step={this.props.step}
            defaultValue={this.props.value}
            onChange={this.handleChange}
          />
          :  
          <RCSlider
            disabled={false}
            min={this.props.range.min}
            max={this.props.range.max}
            step={this.props.step}
            defaultValue={this.props.value}
            onChange={this.handleChange}
          />}
    
        </div>
    )
  }
})

export default connectToForm(Slider)
