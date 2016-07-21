import React, { PropTypes } from 'react';
import Radium from 'radium';
import muiThemeable from 'material-ui/styles/muiThemeable';

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
        minHeight: '210px',
        marginBottom: '20px',
      },

      label: {
        display: 'block',
        marginBottom: '0.5em',
        fontWeight: '700',
        fontSize: '16px',
      },


      paragraph: {
        fontSize: '14px',
      },

    };


      return (
        <div
          style={[
            styles.base,
          ]}>
          <div style={[
          styles.label]}>
            {this.props.label}
          </div>
          {this.props.children}
          <p style={[
          styles.paragraph]}>
            {this.props.text}
          </p>
        </div>
      );

  }
});

const StyledTextWrapper = Radium(TextWrapper);
export default muiThemeable()(StyledTextWrapper);
