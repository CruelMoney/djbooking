import React, { PropTypes } from 'react'
import Radium from 'radium'
import muiThemeable from 'material-ui/styles/muiThemeable'
import hexToRgb from '../../utils/ColorHelper'

var Button = React.createClass({

   propTypes: {
      rounded: PropTypes.bool,
      label: PropTypes.string,
      onClick: PropTypes.func,
      active: PropTypes.bool,
      primary: PropTypes.bool,
      name: PropTypes.string,
      disabled: PropTypes.bool,
      dangerous: PropTypes.bool,
      white: PropTypes.bool,
      leftRounded: PropTypes.bool,
      rightRounded: PropTypes.bool,
      isLoading: PropTypes.bool,
      isNavigationButton: PropTypes.bool,
      success: PropTypes.bool
    },



  getDefaultProps() {
      return {
        rounded: false, label: "Button", dangerous: false
      }
    },

    handleClick(e){
      e.preventDefault()

      if (true) {

      }

      if (this.props.name === undefined) {
      this.props.onClick(this.props.label)
      }else{
        this.props.onClick(this.props.name)
      }
    },

  render() {
    const color = this.props.dangerous ? 'f44336' : this.props.muiTheme.palette.primary1Color
    var r = hexToRgb(color).r
    var g = hexToRgb(color).g
    var b = hexToRgb(color).b
    //var rbg = r+","+g+","+b
    const rgbLight = 'rgb('+r+10+","+g+10+","+b+10+')'

    var styles = {
      base: {
        fontSize: "14px",
        color:  this.props.muiTheme.palette.textColor,
        fontWeight: 'bold',
        opacity: (this.props.disabled ? '0.5' : '1'),
        borderStyle: 'solid',
        borderWidth: "2px",
        WebkitTransition: 'all 0.1s ease-in-out',
        MozTransition: 'all 0.1s ease-in-out',
        transition: 'all 0.1s ease-in-out',
        height: '40px',
        width: this.props.isLoading ? '40px' : '100%',
        outline: "none",
        animation: this.props.isLoading ? "rotating 2s 0.25s linear infinite" : null,

       ':hover': {
         opacity:     this.props.disabled ? '0.5' : '1',
         borderColor: !this.props.noBorder ?
                      (this.props.dangerous ? 'red' :
                      (this.props.disabled && !this.props.active ? 'buttonFace' :
                      color)) : 'transparent'
       }
      },

      active:{
        opacity: '1',
        borderColor: color,
        boxShadow: '0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 1px 5px 0 rgba(0, 0, 0, 0.12)',
        transform: 'scale(1.05)'
      },

      rounded:{
        borderRadius: this.props.isLoading ? '20px' :  '6px 6px 6px 6px'
      },

      important:{
        opacity: '1',
        borderWidth: '0',
        color: '#fff',
        backgroundColor: color,
        transition: 'all 0.5s ease-in-out',

        ':hover':{
          backgroundColor: rgbLight,
          boxShadow: '0px 4px 35px -5px ' + rgbLight
        }

      //  boxShadow: '0 16px 24px 2px rgba('+rbg+', 0.3), 0 6px 30px 5px rgba('+rbg+', 0.3), 0 8px 10px -5px rgba('+rbg+', 0.3)'
      },

      containerStyle:{
        width:'100%',
        textAlign: 'center'
      },

      left:{
        textAlign: 'left'
      },

      small:{
        width: '40px'
      },
      medium:{
        width: this.props.isLoading ? '40px' :'120px'
      },
      large:{
        width:  this.props.isLoading ? '40px' : '200px'
      },
      disabled:{
        opacity: '0.5',
      },
      noBorder:{
        borderWidth: '0px',
        borderColor: 'transparent'
      },
      white:{
        color:'white'
      },
      leftRounded:{
          borderRadius: '6px 0px 0px 6px'
      },
      rightRounded:{
          borderRadius: '0px 6px 6px 0px'
      },
      navigationButton:{
        textDecoration: 'none',
        letterSpacing: '1px',
        fontWeight: '500',
        fontSize: '15px',
        height: 'inherit',
        width: 'inherit',
        minWidth: '0px',
        padding: '0px',
        ':hover':{
          textDecoration: 'underline'
        }
      },
    }
    return (
      <div style={[
        styles.containerStyle,
      this.props.leftAlign && styles.left]}>
        <button
          disabled={this.props.disabled || this.props.isLoading || this.props.success}
          className={
            this.props.disabled || this.props.isLoading || this.props.success ? "disabled" : ""
          }
          style={[
            styles.base,
            this.props.active && styles.active,
            this.props.rounded && styles.rounded,
            this.props.rightRounded && styles.rightRounded,
            this.props.leftRounded && styles.leftRounded,
            this.props.important && styles.important,
            this.props.small  && styles.small,
            this.props.medium && styles.medium,
            this.props.large  && styles.large,
            this.props.disabled && styles.disabled,
            this.props.white && styles.white,
            this.props.noBorder && styles.noBorder,
            this.props.isNavigationButton && styles.navigationButton
          ]} onClick={ this.props.disabled || this.props.isLoading ? null :
          this.handleClick }> { this.props.isLoading ? null : this.props.success ?
          <svg style={{height: "32px"}} xmlns="http://www.w3.org/2000/svg"
          version="1.1" width="230" height="200"
          data-livestyle-extension="available" viewBox="-30 0 230 200"> <path
          d="M 20,130 60,170 200,30" style={{ stroke: "buttonFace",
          strokeWidth:"20", fill:"none"}}/> </svg> : this.props.label }
          </button> </div> ) } })


var StyledButton = Radium(Button)
export default muiThemeable()(StyledButton)
