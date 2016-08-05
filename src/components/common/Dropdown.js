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
  {this.state.expanded ?
    <div className="loginDropDown">
      {this.props.children}
    </div> : null }
    </div>
    )
    }
    }))

export default Dropdown
