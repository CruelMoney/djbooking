import React, { PropTypes } from 'react'
import Button from './Button'

export default React.createClass({

  contextTypes: {
      onSubmit: PropTypes.func
    },

    handleClick(e){
      e.preventDefault()

    this.context.onSubmit()
    },

  render() {
  return(
  <Button
  onClick={this.handleClick}
  {...this.props}
  />
  )
  }
})
