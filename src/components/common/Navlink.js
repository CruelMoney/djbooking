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
   },

   getDefaultProps() {
      return {
        rounded: true,
      }
    },

  render() {
    return    (    <div onClick={this.props.onClick}>
      <RadiumLink {...this.props}
        className={"navLink " + (this.props.borderHover ? "borderHover" : "")}
        onlyActiveOnIndex={true}
        activeClassName="active"
      >
        {this.props.label ? this.props.label : this.props.children}
      </RadiumLink>
    </div>)
}
})


var StyledNavlink = Radium(Navlink)
export default muiThemeable()(StyledNavlink)
