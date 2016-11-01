import React, { PropTypes } from 'react'
import Button from './Button'

export default React.createClass({

  propTypes:{
    onClick: PropTypes.func, // has to take to parameters (form, callback)
  },

  contextTypes: {
      onSubmit: PropTypes.func,
      isLoading: PropTypes.bool,
      succeeded: PropTypes.bool
    },

    handleClick(e){
    this.context.onSubmit(
      this.props.onClick
    )
    },

  render() {
  return(
  <Button
    {...this.props}
    success={this.context.succeeded}
    isLoading={this.context.isLoading}
    onClick={this.handleClick}
  />
  )
  }
})
