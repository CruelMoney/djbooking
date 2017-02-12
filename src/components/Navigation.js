import React, { PropTypes } from 'react'
import Navlink  from './common/Navlink'
import Dropdown from './common/Dropdown'
import UserMenuItem from './common/UserMenuItem'
import Login from './common/Login'
import Logo from './common/Logo'
import MobileMenu from './MobileMenu'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
const theme = getMuiTheme()

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


     componentWillMount() {
       window.addEventListener('scroll', this.handleScroll)
     },
     componentWillUnmount(){
       window.removeEventListener('scroll', this.handleScroll)
     },
     handleScroll(event){
      let scrollTop = event.srcElement.body.scrollTop
      if (scrollTop > 150) {
        this.mobileMenu.className = "buttonFixed"
      }else{
        this.mobileMenu.className = ""
      }
    },

  render() {
    //const isHome = window.location.pathname === '/'
    const page = window.location.pathname.split('/')[1]
    return (
      <MuiThemeProvider muiTheme={theme}>
        <div  className={"location_" + page}>
          <MobileMenu
            onClosing={()=>this.setState({showMenu:false})}
            show={this.state.showMenu}/>
          <div
            className={"nav-container location_"}>
            <nav
              className="navigation"
            >
              <div className="logo">
                <Navlink to="/">
                  <Logo />
                </Navlink>
                <div className=""
                  ref={ref=>this.mobileMenu=ref}
                  >
                <a
                  className="mobileMenuButton"
                  onClick={()=>{
                    this.setState({showMenu:true})}}
                  >
                  <h2>Menu</h2>
                </a>
                </div>
              </div>
              <ul className="main-menu">
                <li>
                  <Navlink  buttonLook={true} to="/howitworks" label="How it works"/>
                </li>
               

                {!this.props.loggedIn ? (
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
                ) : null}

         

              {(this.props.loggedIn && this.props.profile.isDJ) ? (
                  null
                ) : (
                  <li>
                    <Navlink buttonLook={true} to="/signup" label="Become DJ" important={true}/>
                  </li>
                )}
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
                ) : (null)}
                 
                
                

              </ul>
            </nav>
          </div>
          <div id="content">
            {this.props.children}
          </div>
        </div>

      </MuiThemeProvider>
    )
  }
})
import { connect } from 'react-redux'
import * as actions from '../actions/LoginActions'


function mapStateToProps(state, ownprops) {
  return {
    loggedIn: state.user.status.signedIn,
    profile: state.user.profile
  }
}

function mapDispatchToProps(dispatch, ownprops) {
  return {
    checkForLogin: () => dispatch(actions.checkForLogin()),
    logout: ()        => dispatch(actions.userLogout())
  }
}

const SmartNavigation = connect(mapStateToProps, mapDispatchToProps)(menu)

export default props => (
    <SmartNavigation {...props}/>
)
