import React, { PropTypes } from 'react';
import { Link } from 'react-router'
import Radium from 'radium';
import Button from './Button'
import muiThemeable from 'material-ui/styles/muiThemeable';
import hexToRgb from '../../utils/ColorHelper'
import {browserHistory} from 'react-router';
var RadiumLink = Radium(Link);


const Navlink = React.createClass({
  propTypes: {
     rounded: PropTypes.bool,
     primary: PropTypes.bool,
     onClick: PropTypes.func,
     borderHover: PropTypes.bool,
     buttonLook: PropTypes.bool,
     userNavigation: PropTypes.bool,
   },

   getDefaultProps() {
      return {
        rounded: true,
      }
    },

  render() {

    var r = hexToRgb(this.props.muiTheme.palette.primary1Color).r;
    var g = hexToRgb(this.props.muiTheme.palette.primary1Color).g;
    var b = hexToRgb(this.props.muiTheme.palette.primary1Color).b;
    var rbg = r+","+g+","+b;

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
        borderColor: 'white',
        borderStyle: 'solid',
        WebkitTransition: '0.1s ease-in-out',
        MozTransition: '0.1s ease-in-out',
        transition: '0.1s ease-in-out',
        textAlign: 'center',
        verticalAlign: 'middle',
        display: 'table-cell',
        borderRadius: '6px',
        minWidth: '120px',
        paddingLeft: '4px',
        paddingRight: '4px',
        borderWidth: "2px",
      },

      active:{
        fontWeight: 'bold',
        height: '40px',
        //borderStyle: 'solid',
        //borderWidth: "2px",
        textDecoration: 'underline' ,
       // borderColor: 'black',
        color: 'black',
      //borderRadius: '6px 6px 6px 6px'
        },

      rounded:{
        borderRadius: '6px 6px 6px 6px'
      },

      important:{
        borderStyle: 'solid',
        borderWidth: "2px",
        borderColor: 'black',
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
      }




    };

    return        <div style={styles.container} onClick={this.props.onClick}>
                    <RadiumLink {...this.props}
                              className={this.props.borderHover && "borderHover"}
                              onlyActiveOnIndex={true}
                              style={Object.assign({},  styles.base,
                                this.props.buttonLook && styles.buttonLook,
                                this.props.userNavigation && styles.userNavigation,
                                this.props.important && styles.important  )}
                                activeStyle={this.props.userNavigation && styles.active}
                            >
                                {this.props.label ? this.props.label : this.props.children}
                    </RadiumLink>
                  </div>
}
})


var StyledNavlink = Radium(Navlink);
export default muiThemeable()(StyledNavlink);
