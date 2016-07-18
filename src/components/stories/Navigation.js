import React, { PropTypes } from 'react';
import { Link } from 'react-router'
import Navlink  from '../common/Navlink'
import Button from '../common/Button'
import UserMenuItem from '../common/UserMenuItem'
import Radium from 'radium';
import muiThemeable from 'material-ui/styles/muiThemeable';

var menu = React.createClass({

  propTypes: {
     loggedIn: PropTypes.bool,
     checkForLogin: PropTypes.func.isRequired,
     logout: PropTypes.func.isRequired,
     profile: PropTypes.object
   },

   childContextTypes: {
       profile: PropTypes.object
   },

   getChildContext() {
    return {
      profile: this.props.profile
    };
   },

   componentWillMount() {
     if (!this.props.loggedIn) {
       this.props.checkForLogin()
     }
   },

  render() {
    return (
      <div>
        <nav style={{
            borderBottom: '1px solid #eee',
            paddingTop: '10px',
            paddingBottom: '10px',
            paddingLeft: '19px',
            paddingRight: '19px',
            position: 'fixed',
            top: '0',
            height: 'auto',
            width: '100%',
            backgroundColor: 'rgba(255,255,255, 1.0)',
            zIndex: '10',
          }}>
          <Navlink buttonLook={true} to="/" onlyActiveOnIndex={true} label="Home" important={true} />
          <ul style={
              { listStyleType: 'none',
                padding: '0',
                float: 'right',
                marginBottom: '0px',
                display: 'flex'
          }}>
          <li style={{display:'inline'}}>
          <Navlink buttonLook={true} to="/howitworks" label="How it works"/>
          </li>
          {this.props.loggedIn ? (
            <li style={{display:'inline', marginLeft:'4px'}}>
           <Navlink buttonLook={true} to="/"  onClick={this.props.logout} label="Log out"/>
           </li>
           ) : (
           null
           )}
            {this.props.loggedIn ? (
              <li style={{display:'inline', marginLeft:'4px'}}>
              <Navlink buttonLook={true}  to="/user" important={true} >
                <UserMenuItem profile= {this.props.profile} />
              </Navlink>
              </li>
             ) : (
               <li style={{display:'inline', marginLeft:'4px'}}>
              <Navlink buttonLook={true} to="/login" label="Login"/>
              </li>
             )}
             {this.props.loggedIn ? (
            null
              ) : (
              <li style={{display:'inline', marginLeft:'4px'}}>
              <Navlink to="/signup" label="Become a DJ" important={true}/>
              </li>
              )}
          </ul>
          </nav>
          <div style={{marginTop:'60px'}}>
            {this.props.children}
          </div>
          </div>
    )
  }
})

var styledMenu = Radium(menu);
export default muiThemeable()(styledMenu);
