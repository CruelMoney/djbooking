import React, { PropTypes } from 'react'
import Navlink  from '../common/Navlink'
import Button from '../common/Button'
import UserMenuItem from '../common/UserMenuItem'
import Radium from 'radium'
import muiThemeable from 'material-ui/styles/muiThemeable'
import Login from '../../containers/Login'

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

   getInitialState(){
     return{
       loginExpanded: false
     }
   },

   getChildContext() {
    return {
      profile: this.props.profile
    }
   },

   componentWillMount() {
     if (!this.props.loggedIn) {
       this.props.checkForLogin()
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

    const styles={
      transMenu:{
        marginTop: '25px',
        paddingBottom: '10px',
        position: 'fixed',
        top: '0',
        height: 'auto',
        width: '100%',
        backgroundColor: 'transparent',
        zIndex: '10'
      },
      classicMenu:{
        borderBottom: '1px solid #eee',
        paddingTop: '10px',
        paddingBottom: '10px',
        position: 'fixed',
        top: '0',
        height: 'auto',
        width: '100%',
        backgroundColor: 'rgba(255,255,255, 1.0)',
        zIndex: '10'
      }
    }


    return (
      <div >
        <nav style={
          isHome ? styles.transMenu : styles.classicMenu
        }>
          <div className="container">
            <Navlink white={isHome} buttonLook={true} to="/" onlyActiveOnIndex={true} label="Home" important={true} />
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
                    <UserMenuItem profile= {this.props.profile} />
                  </Navlink>
                </li>
                ) : (
                  <div style={{display:'inline', marginLeft:'4px'}} >
                    <Button
                      white={isHome}
                      noBorder={true}
                      medium={true}
                      label="Login"
                      onClick={this.onLoginButton}/>

                    <Login
                      expanded={this.state.loginExpanded}
                      disableOnClickOutside={!this.state.loginExpanded}
                      onClickOutside ={this.onClickOutside}/>
                    
                  </div>
              )}
              {this.props.loggedIn ? (
                null
                ) : (
                  <li style={{display:'inline', marginLeft:'4px'}}>
                    <Navlink white={isHome} buttonLook={true} to="/signup" label="Become a DJ" important={true}/>
                  </li>
              )}
            </ul>
          </div>
        </nav>
        <div >
          {this.props.children}
        </div>
      </div>
    )
  }
})

var styledMenu = Radium(menu)
export default muiThemeable()(styledMenu)
