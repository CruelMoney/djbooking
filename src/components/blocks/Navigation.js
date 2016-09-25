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
       this.nav.className =  "fixed"
    }else{
      this.nav.className = ""
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
    const styles={
      transMenu:{
        paddingTop: '20px',
        paddingBottom: '20px',
        top: '0',
        height: 'auto',
        width: '100%',
        position: 'fixed',
        backgroundColor: 'transparent',
        zIndex: '1000',
        WebkitTransition: 'background 0.5s',
        transition: 'background 0.5s'

      },
      classicMenu:{
        borderBottom: '1px solid #eee',
        paddingTop: '20px',
        paddingBottom: '20px',
        position: 'fixed',
        top: '0',
        height: 'auto',
        width: '100%',
        backgroundColor: 'rgb(255,255,255)',
        zIndex: '10'
      },
    }

    const isHome = window.location.pathname === '/'

    return (
      <div>
        <nav
          ref={(ref) => this.nav = ref}
          style={
            isHome ? styles.transMenu : styles.classicMenu
          }>
          <div   className={isHome ? "container home" : "container"}>
            <li style={
              {
                display:'inline',
                float:'left'
              }}>
              <Navlink white={isHome} buttonLook={true} to="/" onlyActiveOnIndex={true} label="Home" important={true} />
            </li>
            <ul style={
              { listStyleType: 'none',
                padding: '0',
                float: 'right',
                marginBottom: '0px',
                display: 'flex'
              }}>
              <li style={{display:'inline'}}>
                <Navlink white={isHome}  buttonLook={true} to="/howitworks" label="How it works"/>
              </li>
              {this.props.loggedIn ? (

                <li style={{display:'inline', marginLeft:'4px'}}>
                  <Navlink white={isHome} buttonLook={true} to="/"  onClick={this.props.logout} label="Log out"/>
                </li>
                ) : (
                null
              )}
              {this.props.loggedIn ? (
                <li style={{display:'inline', marginLeft:'4px'}}>
                  <Navlink white={isHome}  buttonLook={true}  to="/user" important={true} >
                    <UserMenuItem profile={this.props.profile} />
                  </Navlink>
                </li>
                ) : (
                <li style={{display:'inline', marginLeft:'4px'}} >
                  <Button
                      white={isHome}
                      noBorder={true}
                      medium={true}
                      label="Login"
                      onClick={this.onLoginButton}/>
                  </li>
              )}
              {this.props.loggedIn ? (
                null
                ) : (
                  <li style={{display:'inline', marginLeft:'4px'}}>
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
          </div>
        </nav>
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
