import React, { PropTypes } from 'react'
import { Link } from 'react-router'



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
      <Link
        to={this.props.to}
        className={"navLink " + (this.props.borderHover ? "borderHover" : "")}
        onlyActiveOnIndex={true}
        activeClassName="active"
      >
        {this.props.label ? this.props.label : this.props.children}
      </Link>
    </div>)
}
})


export default Navlink
