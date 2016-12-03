import React, { PropTypes } from 'react'

export default React.createClass({

   propTypes: {
      onClick: PropTypes.func,
      active: PropTypes.bool,
      disabled: PropTypes.bool,
      isLoading: PropTypes.bool,
      name: PropTypes.string,
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
      backgroundColor: this.props.active ? this.context.color : "#FFFFFF",
      borderRadius:    this.props.rightRounded ? "0px 6px 6px 0px" :
                       this.props.leftRounded  ? "6px 0px 0px 6px" :
                       this.props.rounded      ? "6px 6px 6px 6px" : "0px 0px 0px 0px",
    }
    return (
      <div style={{borderColor:this.context.color, color: this.context.color}}>
      <button
        name={this.props.name}
        style={style}
        disabled={this.props.disabled}
        className={this.props.active ? "button active" : "button"}
        onClick={this.handleClick}
        >
          {this.props.children}
        </button>
        </div>
    )
  }
})
