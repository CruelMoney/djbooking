import React, { PropTypes } from 'react'
import Button from './Button'

export default React.createClass({

  propTypes:{
    onClick: PropTypes.func,
  },

  contextTypes: {
      reset: PropTypes.func,
    },

    handleClick(e){
    this.context.reset()
    this.props.onClick()
    },

  render() {
  return(
  <Button
  {...this.props}
  onClick={this.handleClick}
  />
  )
  }
})
