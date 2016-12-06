import React, { PropTypes } from 'react'
import checkmark from '../../assets/checkmark.svg'

export default React.createClass({

   propTypes: {
      onClick: PropTypes.func,
      active: PropTypes.bool,
      disabled: PropTypes.bool,
      isLoading: PropTypes.bool,
      name: PropTypes.string,
      succes: PropTypes.bool,
    },

    getDefaultProps(){
      return {
      rounded: true
    }
    },

    contextTypes:{
      color: PropTypes.string
    },

    handleClick(e){
      e.preventDefault()

      if (this.props.name === undefined) {
      this.props.onClick(this.props.label)
      }else{
        this.props.onClick(this.props.name)
      }
    },

  render() {
    var style={
      borderRadius:    this.props.rightRounded ? "0px 6px 6px 0px" :
                       this.props.leftRounded  ? "6px 0px 0px 6px" :
                       this.props.rounded      ? "6px 6px 6px 6px" : "0px 0px 0px 0px",
      boxShadow:       this.props.isLoading    ? "-10px 0px 40px -5px " + this.context.color : null
    }

    var className = this.props.className ? "button " + this.props.className : "button"
    if (this.props.active) className += " active"
    if (this.props.isLoading) className += " loading"
    if (this.props.succes) className += " succes"

    return (
      <div className="button-wrapper"
        style={{
          textAlign: "center",
          borderColor:this.context.color,
          color: this.context.color,
          boxShadow: "0 0px 20px 0px " + this.context.color,
          backgroundColor: this.context.color
        }}>
      <button
        name={this.props.name}
        style={style}
        disabled={this.props.disabled || this.props.succes || this.props.isLoading}
        className={className}
        onClick={this.handleClick}
        >
          {this.props.succes ? <img src={checkmark} alt="checkmark"/> : this.props.children}
        </button>
        </div>
    )
  }
})
