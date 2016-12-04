import React, { PropTypes } from 'react'
import Button from './Button-v2'

export default React.createClass({

  propTypes:{
    onClick: PropTypes.func, // has to take to parameters (form, callback)
    noCheckMark: PropTypes.bool
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
    className="submit"
    succes={!this.props.noCheckMark && this.context.succeeded}
    isLoading={this.context.isLoading}
    onClick={this.handleClick}
  />
  )
  }
})
