import React, { PropTypes } from 'react'
import checkmark from '../../assets/checkmark.svg'

class Button extends React.Component {

    static contextTypes={
      color: PropTypes.string
    }

    static defaultProps= {
        rounded: true
    }

    state={
      succes:false
    }

    color = ""
    
    componentWillMount(){
      this.color = this.props.color ? this.props.color : 
                   this.props.dangerous ? "#F44336" : 
                   this.context.color ? this.context.color :
                   ""
    }

    componentWillReceiveProps(nextProps){
      this.setState({
        succes: nextProps.succes
      })
      // If a onSucces function is given, 
      // Run it if the succes changes from false to true 
      if(this.props.onSucces && 
          (!this.props.succes && nextProps.succes)){
           this.props.onSucces()
      }
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
      if (this.state.succes) className += " succes"
      if (this.props.dangerous) className += " dangerous"
      if (this.props.glow) className += " glow"

      return className
    }
    
    style=()=>{
      return{
      borderRadius:    this.props.rightRounded ? "0px 6px 6px 0px" :
                       this.props.leftRounded  ? "6px 0px 0px 6px" :
                       this.props.rounded      ? "6px 6px 6px 6px" : "0px 0px 0px 0px",
      backgroundColor: this.props.isLoading ? "transparent" : 
                       this.props.active ?  this.color :
                       this.state.succes ?  this.color :
                       null,
      borderColor:     this.props.isLoading ? "transparent" : 
                       this.props.active ?  this.color :
                       this.state.succes ?  this.color :
                       null,
        borderLeftColor: this.props.isLoading ? this.color  :                        
                          null,
    

        }
    }

    wrapperStyle=()=>{
      return{
      textAlign: "center",
      borderColor: this.props.dangerous ? "#F44336" : this.color,
      color: this.props.dangerous ? "#F44336" : this.color,
      boxShadow: "0 0px 20px 0px " + (this.props.dangerous ? "#F44336" : this.color),
      backgroundColor: this.props.dangerous ? "#F44336" : this.color
   } }

  render() {
    return (
      <div className="button-wrapper"
        style={this.wrapperStyle()}>
        <button
          name={this.props.name}
          style={this.style()}
          disabled={this.props.disabled || this.state.succes || this.props.isLoading}
          className={this.className()}
          onClick={this.handleClick}
        >
          {this.state.succes ? <img  src={checkmark} alt="checkmark"/> : this.props.children}
        </button>
        </div>
    )
  }
}

export default Button
