import React, { PropTypes } from 'react'
import checkmark from '../../assets/checkmark.svg'

class Button extends React.Component {

   propTypes: {
      onClick: PropTypes.func,
      active: PropTypes.bool,
      disabled: PropTypes.bool,
      isLoading: PropTypes.bool,
      name: PropTypes.string,
      succes: PropTypes.bool,
      dangerous: PropTypes.bool
    }

    static contextTypes={
      color: PropTypes.string
    }

    static defaultProps= {
        rounded: true
    }

    handleClick = (e) => {
      e.preventDefault()
      if (this.props.dangerous) {
        var confirmed = !confirm(this.props.warning)
      }
      if (!confirmed) {
        if (this.props.name === undefined) {
          this.props.onClick(this.props.label)
        }else{
          this.props.onClick(this.props.name)
        }
      }
    }

    className = () => {
      var className = this.props.className ? "button " + this.props.className : "button"
      if (this.props.active) className += " active"
      if (this.props.isLoading) className += " loading"
      if (this.props.succes) className += " succes"
      if (this.props.dangerous) className += " dangerous"
      return className
    }

    style={
      borderRadius:    this.props.rightRounded ? "0px 6px 6px 0px" :
                       this.props.leftRounded  ? "6px 0px 0px 6px" :
                       this.props.rounded      ? "6px 6px 6px 6px" : "0px 0px 0px 0px",
      boxShadow:       this.props.isLoading    ? "-10px 0px 40px -5px " + this.context.color : null
    }

    wrapperStyle={
      textAlign: "center",
      borderColor: this.props.dangerous ? "#F44336" : this.context.color,
      color: this.props.dangerous ? "#F44336" : this.context.color,
      boxShadow: "0 0px 20px 0px " + this.props.dangerous ? "#F44336" : this.context.color,
      backgroundColor: this.props.dangerous ? "#F44336" : this.context.color
    }

  render() {
    return (
      <div className="button-wrapper"
        style={this.wrapperStyle}>
        <button
          name={this.props.name}
          style={this.style}
          disabled={this.props.disabled || this.props.succes || this.props.isLoading}
          className={this.className()}
          onClick={this.handleClick}
        >
          {this.props.succes ? <img  src={checkmark} alt="checkmark"/> : this.props.children}
        </button>
        </div>
    )
  }
}

export default Button
