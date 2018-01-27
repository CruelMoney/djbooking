import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Navlink  from './common/Navlink'
import Dropdown from './common/Dropdown'
import UserMenuItem from './common/UserMenuItem'
import Button from './common/Button-v2'
import Login from './common/Login'
import Logo from './common/Logo'
import MobileMenu from './MobileMenu'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import * as actions from '../actions/LoginActions'
import * as sessionActions from '../actions/SessionActions'


class Menu extends Component {

  static propTypes= {
     loggedIn: PropTypes.bool,
     logout: PropTypes.func.isRequired,
     profile: PropTypes.object
   }

   state={
       loginExpanded: false,
       fixed: false,
       didCheckLogin: false
     }

   getChildContext() {
    return {
      profile: this.props.profile,
      loggedIn: this.props.loggedIn
    }
   }

   componentDidMount(){
      this.props.setGeoSession();
      this.checkForLogin(); 
  }

    checkForLogin = (nextState, replace) => {
      if (!this.state.didCheckLogin && !this.props.loggedIn) {
        this.setState({
          didCheckLogin: true,
          checking: true,
        }, this.props.checkForLogin())
      }
    }

   onLoginButton = () => {
       this.setState({
         loginExpanded: !this.state.loginExpanded
       })
   }


   timer=null

   onClickOutside = () => {
     clearTimeout(this.timer)
     this.timer = setTimeout(() => this.setState({
       loginExpanded: false
     }), 10)
   }


     componentWillReceiveProps(nextProps){
       if(nextProps.isRedirect && !this.state.redirected){
         if(nextProps.profile.user_metadata && nextProps.profile.user_metadata.permaLink){
          this.props.history.push(`/user/${nextProps.profile.user_metadata.permaLink}/profile`)
         }else{
          this.props.history.push(`/user`)
         }
         this.setState({redirected:true})
       }
     }
     componentDidUpdate(prevProps) {
      window.addEventListener('scroll', this.handleScroll)

      if (this.props.location !== prevProps.location) {
        window.scrollTo(0, 0)
      }
    }
     componentWillUnmount(){
       window.removeEventListener('scroll', this.handleScroll)
     }
     handleScroll = (event) => {
      let scrollTop = event.srcElement.body.scrollTop
      if (scrollTop > 150) {
        this.mobileMenu.className = "buttonFixed"
      }else{
        this.mobileMenu.className = ""
      }
    }

  render() {
    const isHome = this.props.location.pathname === '/';

    return (
        <div className="menu-wrapper">
          <MobileMenu
            isHome
            onClosing={()=>this.setState({showMenu:false})}
            show={this.state.showMenu}/>
            <div className="container">
          <div
            className={"nav-container location_"}>
            <nav
              className="navigation"
            >
                <Navlink to="/">
                  <Logo />
                </Navlink>
                <div className=""
                  ref={ref=>this.mobileMenu=ref}
                  >
             
                <a
                  className="mobileMenuButton"
                  onClick={()=>{
                    this.setState({showMenu: !this.state.showMenu})}}
                  >
                  <h2>Menu</h2>
                </a>
                </div>
              <ul className="main-menu">
                
                {!isHome    ?    
                <li>
                  <Navlink buttonLook={true} to="/" label="Arrange event"/>
                </li>  : null 
                
                }
         

                <li>
                  <Navlink  buttonLook={true} to="/howitworks" label="How it works"/>
                </li>
               

                {!this.props.loggedIn && !this.props.isWaiting ? (
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
                        closeLogin={this.onClickOutside}
                        profile={this.props.profile}
                       />
                    </Dropdown>
                  </li>
                ) : null }

               

         

              {(this.props.loggedIn) ? (
                  null
                ) : (
                  <li>
                    <Navlink buttonLook={true} to="/signup" label="Apply to become DJ" important={true}/>
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
                    <Navlink  buttonLook={true}  to={`/user/${this.props.profile.user_metadata.permaLink}/profile`} important={true} >
                      <UserMenuItem
                        name={this.props.profile.name}
                        picture={this.props.profile.picture}
                      />
                    </Navlink>
                  </li>
                ) : (null)}
                 
                 {this.props.isWaiting ? (
                  <li >
                    <Button
                      className="redirect-button"
                      color="#03d1ff"
                      isLoading
                      />
                  </li>
                ) : null }
                

              </ul>
            </nav>
          </div>
         </div>
        </div>
    )
  }
}

Menu.childContextTypes = {
  profile: PropTypes.object,
  loggedIn: PropTypes.bool
}


function mapStateToProps(state, ownprops) {
  return {
    ...ownprops,
    loggedIn: state.login.status.signedIn,
    isRedirect: state.login.status.isRedirect,
    isWaiting: state.login.status.isWaiting,
    profile: state.login.profile
  }
}

function mapDispatchToProps(dispatch, ownprops) {
  return {
    logout: ()        => dispatch(actions.userLogout()),
    checkForLogin: (route) => dispatch(actions.checkForLogin(route)),
    setGeoSession: () => dispatch(sessionActions.setGeodata())
    
  }
}

const SmartNavigation = withRouter(connect(mapStateToProps, mapDispatchToProps)(Menu))

export default props => (
    <SmartNavigation {...props}/>
)
