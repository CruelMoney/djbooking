import React, { PropTypes } from 'react'
import Navlink  from '../common/Navlink'
import Button from '../common/Button'
import Dropdown from '../common/Dropdown'
import UserMenuItem from '../common/UserMenuItem'
import Radium from 'radium'
import muiThemeable from 'material-ui/styles/muiThemeable'
import Login from '../../containers/Login'
import Logo from '../common/Logo'

var menu = React.createClass({

  propTypes: {
     loggedIn: PropTypes.bool,
     logout: PropTypes.func.isRequired,
     profile: PropTypes.object
   },

   childContextTypes: {
       profile: PropTypes.object,
       loggedIn: PropTypes.bool
   },

   getInitialState(){
     return{
       loginExpanded: false,
       fixed: false,
     }
   },

   getChildContext() {
    return {
      profile: this.props.profile,
      loggedIn: this.props.loggedIn
    }
   },


   onLoginButton(){
       this.setState({
         loginExpanded: !this.state.loginExpanded
       })
   },


   timer :null,

   onClickOutside(){
     clearTimeout(this.timer)
     this.timer = setTimeout(() => this.setState({
       loginExpanded: false
     }), 10)
   },

  render() {
    const isHome = window.location.pathname === '/'
    const page = window.location.pathname.split('/')[1]
    return (
      <div  className={"location_" + page}>
        <div
          className={"nav-container location_"}>
          <nav
            className="navigation"
          >
            <div className="logo">
              <Navlink to="/">
                <Logo />
              </Navlink>
            </div>
            <ul className="main-menu">
              <li>
                <Navlink  buttonLook={true} to="/howitworks" label="How it works"/>
              </li>
              {this.props.loggedIn ? (

                <li>
                  <Navlink  buttonLook={true} to="/"  onClick={this.props.logout} label="Log out"/>
                </li>
                ) : (
                null
              )}
              {this.props.loggedIn ? (
                <li>
                  <Navlink  buttonLook={true}  to="/profile" important={true} >
                    <UserMenuItem
                      name={this.props.profile.name}
                      picture={this.props.profile.picture}
                    />
                  </Navlink>
                </li>
                ) : (
                <li >
                  <a
                    onClick={this.onLoginButton}
                    >Login</a>
                      <Dropdown
                        expanded={this.state.loginExpanded}
                        disableOnClickOutside={!this.state.loginExpanded}
                        onClickOutside={this.onClickOutside}
                      >
                        <Login
                        />
                      </Dropdown>
                </li>
              )}
              {this.props.loggedIn ? (
                null
                ) : (
                  <li>
                    <Navlink buttonLook={true} to="/signup" label="Become a DJ" important={true}/>
                  </li>
              )}

            </ul>
          </nav>
        </div>
        <div id="content">
          {this.props.children}
        </div>
      </div>
    )
  }
})

var styledMenu = Radium(menu)
export default muiThemeable()(styledMenu)