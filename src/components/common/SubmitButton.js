import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Button from './Button-v2'

export default class SubmitButton extends Component{

  static proptypes = {
    onClick: PropTypes.func, // has to take to parameters (form, callback)
    noCheckMark: PropTypes.bool,
    name:PropTypes.string.isRequired,
    resetOnSucces: PropTypes.bool
  }

  handleClick = (e) => {
      this.context.onSubmit(
        this.props.onClick,
        this.props.name
      )
    }

  render() {

  let succes = this.context.status.succeeded ? this.context.status.succeeded[this.props.name] : false
  let loading = this.context.status.loading ? this.context.status.loading[this.props.name] : false


  return(
  <Button
    {...this.props}
    name={this.props.name}
    className="submit"
    type="submit"
    succes={!this.props.noCheckMark && succes}
    isLoading={loading}
    onClick={this.handleClick}
  />
  )
  }
}

SubmitButton.contextTypes = {
  onSubmit: PropTypes.func,
  status: PropTypes.object
}