import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Button from './Button'

export default class ResetButton extends Component{

  static proptypes = {
    onClick: PropTypes.func,
  }


    handleClick = (e) => {
    this.context.reset()
    this.props.onClick()
    }

  render() {
  return(
  <Button
  {...this.props}
  onClick={this.handleClick}
  />
  )
  }
}
ResetButton.contextTypes= {
  reset: PropTypes.func,
}

