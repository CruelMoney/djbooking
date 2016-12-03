import React, { PropTypes } from 'react'
import Radium from 'radium'
import Button from './Button-v2'
import muiThemeable from 'material-ui/styles/muiThemeable'


var ToggleButton = React.createClass({

   propTypes: {
      name: PropTypes.string,
      rounded: PropTypes.bool,
      label: PropTypes.string,
      labelToggled: PropTypes.string,
      onClick: PropTypes.func,
      onClickToggled: PropTypes.func,
      disabled: PropTypes.bool,
      active: PropTypes.bool
    },

    getDefaultState() {
      return{
        toggled: false
      }
    },

    getDefaultProps() {
      return {
        rounded: false,
        label: "ToggleButton",
      }
    },

    componentWillMount(){
      this.setState({
        toggled: this.props.active
      })
    },

    componentWillReceiveProps(nextProps, nextContext){
      if (nextProps.active !== undefined) {
        this.setState({
          toggled: nextProps.active
        })
      }
    },

    handleClick(value){
      const newToggle = !this.state.toggled
      this.setState({
        toggled: newToggle
      })
      if(!newToggle)
        {if(this.props.onClickToggled) { this.props.onClickToggled(value)} else {this.props.onClick(value)}}
        else
        {this.props.onClick(value)}
    },

  render() {
    return (

      <Button
        {...this.props}
        active={this.state.toggled}
        onClick={this.props.disabled ? () => null : this.handleClick}
        >{this.state.toggled
          ? (this.props.labelToggled ? this.props.labelToggled : this.props.label)
        : this.props.label}
      </Button>

    )
  }
})


var StyledButton = Radium(ToggleButton)
export default muiThemeable()(StyledButton)
