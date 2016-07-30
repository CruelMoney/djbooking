import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import Navlink  from '../common/Navlink'
import Button from '../common/Button'


export default React.createClass({

  propTypes: {
    actions: PropTypes.arrayOf(PropTypes.node),
   },

   contextTypes: {
       editMode: PropTypes.bool,
       toggleEditMode: PropTypes.func,

     },

   getDefaultProps(){
     return{
     actions: []}
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
                flexDirection: 'column'

              }}>
            <li style={{marginBottom:'25px'}}>
              <Navlink userNavigation={true} to="/user/profile" label="Profile"/>
            </li>
            <li  style={{marginBottom:'25px'}}>
              <Navlink userNavigation={true} to="/user/gigs" label="Gigs"/>
            </li>
          <li  style={{marginBottom:'25px'}}>
          <Navlink userNavigation={true} to="/user/reviews" label="Reviews"/>
          </li>
          <li  style={{marginBottom:'25px', borderBottom:'1px solid #eee'}}>
          <Navlink userNavigation={true} to="/user/preferences" label="Preferences"/>
          </li>

          </ul>
          </nav>
                {this.props.actions.map(function(action) {
                 return <div key={action.key}>{action}</div>
              })}

          </div>
    )
  }
})
