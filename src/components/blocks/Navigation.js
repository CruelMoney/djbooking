import React, { PropTypes } from 'react'
import Navlink  from '../common/Navlink'
import Button from '../common/Button'
import Dropdown from '../common/Dropdown'
import UserMenuItem from '../common/UserMenuItem'
import Radium from 'radium'
import muiThemeable from 'material-ui/styles/muiThemeable'
import Login from '../../containers/Login'
import Footer from './Footer'


var menu = React.createClass({

  propTypes: {
     loggedIn: PropTypes.bool,
     checkForLogin: PropTypes.func.isRequired,
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

   componentWillMount() {
     window.addEventListener('scroll', this.handleScroll)
     if (!this.props.loggedIn) {
       this.props.checkForLogin()
     }
   },
   componentWillUnmount(){
     window.removeEventListener('scroll', this.handleScroll)
   },

   handleScroll(event){

    let scrollTop = event.srcElement.body.scrollTop
    if (scrollTop > 20) {
       this.nav.className =  "nav-container fixed"
    }else{
      this.nav.className = "nav-container"
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

    return (
      <div
      >
      <div
      ref={(ref) => this.nav = ref}
      className="nav-container">
        <nav
          className="navigation"

          >
          <div className="logo">
            <Navlink white={isHome} to="/">Cueup</Navlink>
          </div>
            <ul className="main-menu">
              <li>
                <Navlink white={isHome}  buttonLook={true} to="/howitworks" label="How it works"/>
              </li>
              {this.props.loggedIn ? (

                <li>
                  <Navlink white={isHome}  buttonLook={true} to="/"  onClick={this.props.logout} label="Log out"/>
                </li>
                ) : (
                null
              )}
              {this.props.loggedIn ? (
                <li>
                  <Navlink white={isHome}  buttonLook={true}  to="/user" important={true} >
                    <UserMenuItem
                    name={this.props.profile.name}
                    picture={this.props.profile.picture}
                    />
                  </Navlink>
                </li>
                ) : (
                <li >
                  <Button
                      white={isHome}
                      noBorder={true}
                      medium={true}
                      label="Login"
                      isNavigationButton={true}
                      onClick={this.onLoginButton}/>
                  </li>
              )}
              {this.props.loggedIn ? (
                null
                ) : (
                  <li>
                    <Navlink white={isHome} buttonLook={true} to="/signup" label="Become a DJ" important={true}/>
                  </li>
              )}
              <Dropdown
                expanded={this.state.loginExpanded}
                disableOnClickOutside={!this.state.loginExpanded}
                onClickOutside={this.onClickOutside}
              >
                <Login
                />
              </Dropdown>
            </ul>
        </nav>
        </div>
        <div id="content">
          {this.props.children}
        </div>
        {!isHome ? <Footer/> : null}
      </div>
    )
  }
})

var styledMenu = Radium(menu)
export default muiThemeable()(styledMenu)
