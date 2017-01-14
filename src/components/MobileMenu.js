import React, {PropTypes} from 'react';
import Navlink    from './common/Navlink'
import Popup from './common/Popup'
import Login from './common/Login'
import {connect} from 'react-redux';
import Formatter from '../utils/Formatter'
import Rating from './common/Rating'
import * as actions from '../actions/LoginActions'


class MobileMenu extends React.Component {
  themeColor = "#31DAFF"

  props: {
    show: bool,
    onClosing: func,
    profile: object,
    loggedIn: bool
  }

  state = {
    show: false
  }
  static childContextTypes={
    color: PropTypes.string
  }

  getChildContext() {
      return {
        color:  this.themeColor
      }
  }

  componentWillReceiveProps(nextProps){
    this.setState({
      show: nextProps.show
    })
  }

  handleClose = (evt) => {
    this.setState({show: false})
    if (this.props.onClosing) {
      this.props.onClosing()

    }
  }

  onLoginButton = () => {
      this.setState({
        loginExpanded: !this.state.loginExpanded
      })
  }

  timer = null

  onClickOutside = () =>{
    clearTimeout(this.timer)
    this.timer = setTimeout(() => this.setState({
      loginExpanded: false
    }), 10)
  }


  render() {
    return(
      <div>
      <div
        className={"mobileMenu" + (this.state.show ? " active" : "")}>
        <div className="menuArea">
              <a
                onClick={()=>this.handleClose()}
                className="popupCloseButton">
                Close
              </a>
            {
              this.props.loggedIn ?
              <div className="profileSummary">
                <div className="profilePicture" style={{backgroundImage: 'url('+this.props.profile.picture+')'}}/>
                <div className="profileInfo">
                  <div className="user-card-info">
                    <div className="user-card-fact">
                      <p>Experience</p>
                      {this.props.profile.gigsCount + " Cueup gigs"}
                    </div>
                    <div className="user-card-fact">
                      <p>Earned</p>
                      {Formatter.money.FormatNumberToString(this.props.profile.earned, "Dkk")}
                    </div>
                    <div className="user-card-fact">
                      <p>Rating</p>
                      <Rating rating={this.props.profile.avgRating}/>
                    </div>
                  </div>
                </div>
              </div>
              : null
            }
            <div className="menu">
            <ul >
              {this.props.profile.isDJ ?
                <li>
                  <Navlink onClick={()=>this.handleClose()} userNavigation={true} to="profile" label="Profile"/>
                </li>
              : null}

              {this.props.profile.isCustomer ?
                <li>
                  <Navlink onClick={()=>this.handleClose()}  userNavigation={true} to="events" label="Events"/>
                </li>
              : null}

              {this.props.profile.isDJ ?
                <li >
                  <Navlink onClick={()=>this.handleClose()}  userNavigation={true} to="gigs" label="Gigs"/>
                </li>
              : null}

              {this.props.profile.isDJ ?
                <li >
                  <Navlink onClick={()=>this.handleClose()}  userNavigation={true} to="reviews" label="Reviews"/>
                </li>
                : null
              }

              {(this.props.isCustomer && !this.props.isDJ) ?
                <li >
                  <Navlink onClick={()=>this.handleClose()}  userNavigation={true} to="user/signup" label="Become DJ"/>
                </li>
                : null
              }
              {this.props.loggedIn ?
                <li>
                  <Navlink onClick={()=>this.handleClose()}  userNavigation={true} to="preferences" label="Preferences"/>
                </li>
                : null
              }


              <li>
                <Navlink onClick={()=>this.handleClose()}   buttonLook={true} to="/howitworks" label="How it works"/>
              </li>
              {this.props.loggedIn ? (

                <li>
                  <Navlink onClick={()=>this.handleClose()}   buttonLook={true} to="/"  onClick={this.props.logout} label="Log out"/>
                </li>
              ) : (
                null
              )}
              {this.props.loggedIn ? (
                null
              ) : (
                <li>
                  <Navlink onClick={()=>this.handleClose()}  buttonLook={true} to="/signup" label="Become a DJ" important={true}/>
                </li>
              )}
              {this.props.loggedIn ? (
                null
              ) : (
                <li >
                  <a
                    onClick={this.onLoginButton}
                  >Login</a>

                </li>
              )}


            </ul>
            </div>
        </div>

      </div>
      <Popup
        showing={this.state.loginExpanded}
        onClickOutside={this.onClickOutside}
      >
        <Login
        />
      </Popup>
    </div>
    );
  }
}


export const mapStateToProps = (state) => {
  return {
    profile: state.user.profile,
    loggedIn: state.user.status.signedIn
  }
}

export const mapDispatchToProps = (dispatch, ownprops) => {
return{
  logout: ()        => dispatch(actions.userLogout())
}
}

export default connect(mapStateToProps, mapDispatchToProps)(MobileMenu);
