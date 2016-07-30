import React, { PropTypes } from 'react'
import Radium from 'radium'
import muiThemeable from 'material-ui/styles/muiThemeable'
import { connect } from 'react-redux'


var RegistrationElement = React.createClass({

  displayName: 'RegistrationElement',

  propTypes: {
    name: PropTypes.string.isRequired,
    children: PropTypes.node,
    text: PropTypes.string,
    label: PropTypes.string,
    active: PropTypes.bool,
    disabled: PropTypes.bool,
    hideOn: PropTypes.arrayOf(PropTypes.string),
    isFilter: PropTypes.bool,
  },

  getDefaultProps() {
    return {
      showOn: [],
      isFilter: false
    }
  },

  childContextTypes: {
    update: PropTypes.func,
    isFilter: PropTypes.bool,
  },

  getChildContext() {
    return {
      update: this.updateValue,
      isFilter: this.props.isFilter,
    }
  },

  contextTypes: {
    updateFilters: PropTypes.func,
    update: PropTypes.func.isRequired,
  },

  updateValue(name, value){
    if (this.props.isFilter) {
      this.context.updateFilters(this.props.name, value)
    }
  },

  render() {
    var styles = {
      base: {
        fontFamily: this.props.muiTheme.fontFamily,
        opacity: '0.2',
        minHeight: '210px',
        marginBottom: '20px',
        marginTop: '-35px'
      },

      label: {
        display: 'block',
        marginBottom: '0.5em',
        fontWeight: '300',
        fontSize: '30px',
      },

      active:{
        opacity: '1'
      },


      paragraph: {
        fontSize: '14px',
      },

    }


      return (
        <div
          style={[
            styles.base,
            this.props.active && styles.active]}>
            <div style={[
                styles.label]}>
                {this.props.label}
            </div>
             <p style={[
                 styles.paragraph]}>
                 {this.props.text}
                 {this.props.count}
             </p>
             {this.props.children}
        </div>
      )

  }
})

const StyledText = Radium(RegistrationElement)
export default muiThemeable()(StyledText)
