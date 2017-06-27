import React, { PropTypes } from 'react'
import Navlink  from '../../../../components/common/Navlink'

import { connect } from 'react-redux'
import * as commonActions from '../../../../actions/Common'

var eventNavigation = React.createClass({

  componentWillMount(){
    this.registerNavigationItems()
  },

   componentWillUnmount(){
    this.removeNavigationItems()
  },

  registerNavigationItems(){
    this.props.registerMenuItem("Event information", "/event/"+this.props.id+"/"+this.props.hash+"/info")
    this.props.registerMenuItem("Dj offers", "/event/"+this.props.id+"/"+this.props.hash+"/offers")
    if (this.props.isFinished && this.props.paid){
    this.props.registerMenuItem("Review", "/event/"+this.props.id+"/"+this.props.hash+"/review")
    } else{
    this.props.registerMenuItem("Contact information", "/event/"+this.props.id+"/"+this.props.hash+"/user")
    }
  },

  removeNavigationItems(){
    this.props.removeMenuItem("Event information")
    this.props.removeMenuItem("Dj offers")
    this.props.removeMenuItem("Review")
    this.props.removeMenuItem("Contact information")  
  },

  render() {
    return (
      <div>

        <nav >
          <ul className="userNavigation"
            style={
              { listStyleType: 'none',
                padding: '0',
                marginBottom: '0px',
                display: 'flex',
                flexDirection: 'row',
                textTransform: 'uppercase',
                justifyContent: 'space-between'
              }}>


            <li>
              <Navlink to={"/event/"+this.props.id+"/"+this.props.hash+"/info"} label="Event information"/>
            </li>


            <li>
              <Navlink to={"/event/"+this.props.id+"/"+this.props.hash+"/offers"} label="Dj offers"/>
            </li>

            <li >
              { this.props.isFinished && this.props.paid ? 
                <Navlink to={"/event/"+this.props.id+"/"+this.props.hash+"/review"} label="Review"/>
                :
                <Navlink to={"/event/"+this.props.id+"/"+this.props.hash+"/user"} label="Contact information"/>}
            </li>


          </ul>
        </nav>
      </div>
    )
  }
})



function mapDispatchToProps(dispatch, ownProps) {
  return {
    registerMenuItem: (name, route) => dispatch(commonActions.registerMenuItem(name,route)),
    removeMenuItem: (name) => dispatch(commonActions.removeMenuItem(name))
}}

const SmartNavigation = connect(state=>state, mapDispatchToProps)(eventNavigation)

export default props => (
    <SmartNavigation {...props}/>
)