import React, { PropTypes } from 'react'
import Radium from 'radium'
import muiThemeable from 'material-ui/styles/muiThemeable'

var TextWrapper = React.createClass({

  propTypes: {
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
