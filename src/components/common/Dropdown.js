import React, { Component } from 'react'
import PropTypes from 'prop-types'
import onClickOutside from 'react-onclickoutside'

class Dropdown extends Component{
    displayName= 'Dropdown'

    static proptypes = {
      expanded: PropTypes.bool,
      onClickOutside: PropTypes.func
    }

    state={
        expanded: false
      }

    componentWillReceiveProps(nextProps){
      this.setState({
        expanded: nextProps.expanded
      })
    }


    handleClickOutside = (evt)  => {
      this.props.onClickOutside()
    }

  render() {

    return (
<div>  
    <div className={this.state.expanded ? "loginDropDown active" : "loginDropDown"}>
      {this.props.children}
    </div> 
    </div>
    )
    }
    }


export default  onClickOutside(Dropdown)
