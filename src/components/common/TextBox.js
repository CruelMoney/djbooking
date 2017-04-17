import React, { PropTypes } from 'react'
import connectToForm from '../higher-order/connectToForm'


var TextBox = React.createClass({

  propTypes: {
    maxLength:PropTypes.number,
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    validate: PropTypes.arrayOf(PropTypes.string),
    onUpdatePipeFunc: PropTypes.func,
    height: PropTypes.string,
    width: PropTypes.string,
  },

  contextTypes: {
    registerValidation: PropTypes.func.isRequired,
    updateValue: PropTypes.func,
    isFormValid: PropTypes.func,
    registerReset: PropTypes.func,
    color: PropTypes.string
  },


  getDefaultProps() {
    return {
      active: true,
      validate: [],
      height: '100%', width: '100%',
    }
  },

  render() {
    var styles = {

      base: {
        height: this.props.height,
        width: this.props.width,
        color:  this.context.color,
        backgroundColor: 'transparent',
        borderStyle: 'solid',
        borderWidth: "1px",
        borderColor: "#BBBBBB",
        outline: "none",
        resize: 'none',
        borderRadius: '6px',
        padding: '4px',
        transition: 'border 0.4s',
        opacity: "1",
        ':focus': {
          borderColor:  this.context.color
        }
      },

    }

    let { validate, active, ...props} =  this.props
    validate = active
    active = validate
    return (

              <div style={{borderColor: this.context.color, borderWidth: "0px"}}>
                <textarea
                  {...props}
                  id={this.props.name}
                  style={styles.base}
                  value={this.props.value}
                  name={this.props.name}
                  onChange={(e)=>this.props.onChange(e.target.value)}

                />
                {this.props.errors.length ? (
                  <div className="errors" style={{marginTop:"5px"}}>
                    {this.props.errors.map((error, i) => <p  className="error" key={i}>{error}</p>)}
                  </div>
                ) : null}
              </div>





    )
  }
})

export default connectToForm(TextBox)
