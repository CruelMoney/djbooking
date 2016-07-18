import React, { PropTypes } from 'react';
import Radium from 'radium';
import Button from './Button'
import muiThemeable from 'material-ui/styles/muiThemeable';


var ToggleButton = React.createClass({

   propTypes: {
      name: PropTypes.string,
      rounded: PropTypes.bool,
      label: PropTypes.string,
      labelToggled: PropTypes.string,
      onClick: PropTypes.func,
      onClickToggled: PropTypes.func,
      disabled: PropTypes.bool
    },

    getDefaultState() {
      toggled: false
    },


    getDefaultProps() {
      return {
        rounded: false,
        label: "ToggleButton",
      }
    },

    componentWillReceiveProps(nextProps, nextContext){
      if (nextProps.active !== undefined) {
        this.state.toggled = nextProps.active
      }
    },

    handleClick(value){
      this.state.toggled = !this.state.toggled
      !this.state.toggled
        ? (this.props.onClickToggled ? this.props.onClickToggled(value) : this.props.onClick(value))
        : this.props.onClick(value)
    },

  render() {


    return (
      <Button
        {...this.props}

        label = {this.state.toggled
          ? (this.props.labelToggled ? this.props.labelToggled : this.props.label)
          : this.props.label}
        active ={this.state.toggled}
        onClick={this.props.disabled ? () => null : this.handleClick}
        />

    );
  }
});


var StyledButton = Radium(ToggleButton);
export default muiThemeable()(StyledButton);
