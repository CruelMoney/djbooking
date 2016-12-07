import React, { PropTypes } from 'react'



const lockSvg = (
  <svg className="lock" width="20" height="20" id="svg2" version="1.1"  data-livestyle-extension="available">

  </svg>)


var TextWrapper = React.createClass({

  propTypes: {
    showLock: PropTypes.bool,
    children: PropTypes.node,
    text: PropTypes.string,
    label: PropTypes.string,

  },

  render() {

      return (
        <div     className="text-element-wrapper"
        >

          {this.props.showLock ? lockSvg : null}
          <div >
            {this.props.label}
          </div>
          <p>
            {this.props.text}
          </p>
          {this.props.children}
        </div>
      )

  }
})

export default TextWrapper
