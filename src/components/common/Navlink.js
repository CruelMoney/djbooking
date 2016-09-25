import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import Radium from 'radium'
import muiThemeable from 'material-ui/styles/muiThemeable'
var RadiumLink = Radium(Link)


const Navlink = React.createClass({
  propTypes: {
     rounded: PropTypes.bool,
     primary: PropTypes.bool,
     onClick: PropTypes.func,
     borderHover: PropTypes.bool,
     buttonLook: PropTypes.bool,
     userNavigation: PropTypes.bool,
     white: PropTypes.bool
   },

   getDefaultProps() {
      return {
        rounded: true,
      }
    },

  render() {

    var styles = {
      base: {
        fontFamily: this.props.muiTheme.fontFamily,
        color:  this.props.muiTheme.palette.textColor,
        fontWeight: '500',
        backgroundColor: 'transparent',
        height: '40px',
        outline: "none",
      },

      buttonLook:{
        WebkitTransition: '0.1s ease-in-out',
        MozTransition: '0.1s ease-in-out',
        transition: '0.1s ease-in-out',
        textAlign: 'center',
        verticalAlign: 'middle',
        display: 'table-cell',
        minWidth: '120px',
        paddingLeft: '4px',
        paddingRight: '4px',
      },

      active:{
        height: '40px',
        textDecoration: 'underline' ,
        color: 'black',
        },

      rounded:{
        borderRadius: '6px 6px 6px 6px'
      },

      important:{
        borderStyle: 'solid',
        borderWidth: "2px",
        borderRadius: '6px 6px 6px 6px'
      },

      container:{
        display: 'inline',
      },

      left:{
        textAlign: 'left'
      },

      small:{
        width:'40px'
      },
      medium:{
        width:'120px'
      },
      large:{
        width:'200px'
      },

      userNavigation:{
        fontSize: '24px',
      },

      white:{
        color:'white',
        borderColor: 'white',
      }




    }

    return    (    <div style={styles.container} onClick={this.props.onClick}>
      <RadiumLink {...this.props}
        className={this.props.borderHover && "borderHover"}
        onlyActiveOnIndex={true}
        style={Object.assign({}, styles.base,
          this.props.buttonLook && styles.buttonLook,
          this.props.userNavigation && styles.userNavigation,
          this.props.white && styles.white,
          this.props.important && styles.important
        )}
        activeStyle={this.props.userNavigation && styles.active}
      >
        {this.props.label ? this.props.label : this.props.children}
      </RadiumLink>
    </div>)
}
})


var StyledNavlink = Radium(Navlink)
export default muiThemeable()(StyledNavlink)
