import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'



class MyNavlink extends Component{
  static proptypes = {
     rounded: PropTypes.bool,
     primary: PropTypes.bool,
     onClick: PropTypes.func,
     borderHover: PropTypes.bool,
     buttonLook: PropTypes.bool,
     userNavigation: PropTypes.bool,
   }

   static defaultProps = {
        rounded: true,
      }
    

  render() {
    return    (    
    <div onClick={this.props.onClick}>
      <NavLink
        to={this.props.to}
        className={"navLink " + (this.props.borderHover ? "borderHover" : "")}
        activeClassName="active"
      >
        {this.props.label ? this.props.label : this.props.children}
      </NavLink>
    </div>)
}
}


export default MyNavlink
