import React, { PropTypes } from 'react'
import onClickOutside from 'react-onclickoutside'


const Dropdown = onClickOutside(React.createClass({
    displayName: 'Dropdown',

    propTypes: {
      expanded: PropTypes.bool,
      onClickOutside: PropTypes.func
    },

    getInitialState() {
      return{
        expanded: false
      }
    },

    componentWillReceiveProps(nextProps){
      this.setState({
        expanded: nextProps.expanded
      })
    },


    handleClickOutside: function(evt) {
      this.props.onClickOutside()
    },

  render() {

    return (
<div>  
    <div className={this.state.expanded ? "loginDropDown active" : "loginDropDown"}>
      {this.props.children}
    </div> 
    </div>
    )
    }
    }))

export default Dropdown
