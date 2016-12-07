import React, { PropTypes } from 'react'
import ToggleButton from './ToggleButton'
import connectToForm from './higher-order/connectToForm'

var ToggleButtonHandler = React.createClass({

  propTypes: {
    name: PropTypes.string.isRequired,
    disabled: PropTypes.bool,
    value: PropTypes.arrayOf(PropTypes.string),
    required: PropTypes.bool
  },

 getDefaultProps() {
     return {
       rounded: true,
       columns: 3,
       potentialValues: [],
       value: [],
       errorAbove: false,
       required: true,
     }
   },


  spliceHelper(list, index){
    list.splice(index,1)
    return list
  },

  handleButtonPress(value) {
    var toggledButtons = this.props.value
    var valueIndex = toggledButtons.indexOf(value)

    var newList = (valueIndex===-1)
                   ? [ ...toggledButtons, value ]
                   : this.spliceHelper(toggledButtons, valueIndex)


    this.props.onChange(newList)
 },

  render() {
    var rows = []
    var buttons = []
    var currentRow = 0
    this.props.potentialValues.forEach(function(genre, i) {

      var isToggled = false
      var toggledButtons = this.props.value

      if (toggledButtons.indexOf(genre.name)!==-1){
        isToggled = true
      }

      //Adding to array
      buttons.push(
        <td
          key={genre.name}>
          <ToggleButton
            rounded={this.props.rounded}
            label={genre.name}
            active={isToggled}
            disabled={this.props.disabled}
            onClick={this.handleButtonPress}/>
        </td>  )

      if (((i+1) % this.props.columns === 0 && i!==0) || (i===this.props.potentialValues.length-1)){
        currentRow++
        rows.push(
          <tr
            key={currentRow}>
            {buttons}
          </tr>
          )
          buttons = []
      }
    }.bind(this))

    return (
      <div>
        <div className="toggle-button-handler">
          {(this.props.errors.length && this.props.errorAbove) ? (
            < div className="errors">
            {this.props.errors.map((error, i) => <p key={i}>{error}</p>)}
            </div>
          ) : null}

          <table>
            <tbody>{rows}</tbody>
          </table>
        </div>
        {(this.props.errors.length && !this.props.errorAbove) ? (
          < div style={{marginTop: "10px"}} className="errors">
          {this.props.errors.map((error, i) => <p className="error" key={i}>{error}</p>)}
          </div>
          ) : null}
          </div>
          )
          }
          })


export default connectToForm(ToggleButtonHandler)
