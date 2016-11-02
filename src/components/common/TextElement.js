import React, { PropTypes } from 'react'
import Radium from 'radium'
import muiThemeable from 'material-ui/styles/muiThemeable'


const lockSvg = (
  <svg className="lock" width="20" height="20" id="svg2" version="1.1"  data-livestyle-extension="available">
    <g id="layer1" transform="translate(6,-1036.3622)">
      <path style="fill:#8a8a8a;fill-opacity:1;fill-rule:nonzero;stroke:none;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4;stroke-opacity:1;stroke-dasharray:none;stroke-dashoffset:0" d="M 10 0 C 6.6862915 0 4 2.6862915 4 6 L 4 9 L 3 9 L 3 20 L 17 20 L 17 9 L 16 9 L 16 6 C 16 2.6862915 13.313708 0 10 0 z M 10 2 C 12.209139 2 14 3.7908602 14 6 L 14 9 L 6 9 L 6 6 C 6 3.7908602 7.790861 2 10 2 z " transform="translate(-6,1036.3622)" id="rect3838"/>
    </g>
  </svg>)


var TextWrapper = React.createClass({

  propTypes: {
    showLock: PropTypes.bool,
    children: PropTypes.node,
    text: PropTypes.string,
    label: PropTypes.string,

  },

  render() {
    var styles = {
      base: {
        fontFamily: this.props.muiTheme.fontFamily,
      },

      label: {
        display: 'block',
        marginBottom: '0.5em',
        fontWeight: '500',
        fontSize: '16px',
      },


      paragraph: {
        fontSize: '14px',
      },

      center:{
          textAlign:'center'
      }

    }


      return (
        <div
          className="text-element-wrapper"
          style={[
            styles.base,
          ]}>

            {this.props.showLock ? lockSvg : null}
          <div style={[
            styles.label,
          this.props.center && styles.center]}>
            {this.props.label}
          </div>
          <p style={[
          styles.paragraph]}>
            {this.props.text}
          </p>
          {this.props.children}
        </div>
      )

  }
})

const StyledTextWrapper = Radium(TextWrapper)
export default muiThemeable()(StyledTextWrapper)
