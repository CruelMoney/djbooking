import React, { Component } from 'react'
import PropTypes from 'prop-types'

export class Collapsible extends Component{
  static proptypes = {
    name: PropTypes.string,
    label: PropTypes.string,
    number: PropTypes.number,
    collapsed: PropTypes.bool,
    handleClick: PropTypes.func,
    numbered: PropTypes.bool
  }

  render() {
    return(
      <div>
        <div className={
        this.props.collapsed ? "collapsible collapsed" : "collapsible active"}>

          <div
          
            onClick={() => this.props.handleClick(this.props.number)}
            style={{
              cursor:"pointer"
              
            }}
          >
            <h4
              style={{margin:"16px 0"}}
            >  {(this.props.numbered ? (this.props.number + ". ") : "")+ this.props.label} </h4>
            <span>
              <svg className="collapsible-arrow" viewBox="0 0 24 24"
                style={{
                  position: "absolute",
                  right: "15px",
                  top: "0px",
                  display: "inline-block",
                  color: "rgba(0, 0, 0, 0.870588)",
                  fill: "currentcolor",
                  height: "24px",
                  width: "24px",
                webkitUserSelect: "none"}}>
                <path d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z"></path>
              </svg>
            </span>
          </div>
          <div className="collapsible-container" style={ this.props.numbered ? {padding: "0 16px"} : {}}>
            {this.props.children}
          </div>
        </div>
        <div className="divider"/>
      </div>


  )

  }
}

export class CollapsibleContainer extends Component{
  static proptypes = {
    numbered: PropTypes.bool,
    changeHash: PropTypes.bool
  }

  static defaultProps = {
      numbered: true
    }

  state={
      activeChild: 0
  }

  toggleChild = (count) => {
    if (this.state.activeChild === count) {
      this.setState({
        activeChild: 0
      })
      if(this.props.changeHash){
         window.location.hash = ""
      }
    }else{
      this.setState({
        activeChild: count
      })
      if(this.props.changeHash){
         window.location.hash = this.props.children[count-1].props.label
      }
    }
  }

  renderChildren = () => {
    var count = 0
    return React.Children.map(this.props.children, child => {
      count++
      return React.cloneElement(child, {
        number: count,
        collapsed: count !== this.state.activeChild,
        handleClick: this.toggleChild,
        numbered: this.props.numbered
      })
  })
}

  render() {
    return(
      <div className="collapsible-container">
        {this.renderChildren()}
      </div>)

  }
}
