import React, {PropTypes} from 'react';
import Navlink    from './common/Navlink'
import Popup from './common/Popup'
import Login from './common/Login'
import {connect} from 'react-redux';
import Formatter from '../utils/Formatter'
import Rating from './common/Rating'
import * as actions from '../actions/LoginActions'
import * as UserActions from '../actions/UserActions'

import entries from 'object.entries';
import Button from './common/Button-v2'


class MobileMenu extends React.Component {
  themeColor = "#31DAFF"

  state = {
    show: false,
    loading: false, 
    err: null
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

  getMenuItems = ()=>{
      var items = entries(this.props.registeredMenuItems)
                      .filter(item=>item[1]!==null)
                      .map((item)=>{
                        return(
                            <li>
                              <Navlink onClick={()=>this.handleClose()} to={item[1]} label={item[0]}/>
                            </li>
                        )
                  })
      return items
    }


 handleFile = (e) => {
      const reader = new FileReader()
      const file = e.target.files[0]

      var self = this

      reader.onload = (upload) => {
        this.setState({
          loading: true
        })

        if ((file.size/1024) > 5000 ) {
           this.setState({loading: false, err: "Image cannot be larger than 5 Mb"})
           return
         }
        /*eslint no-undef: 0*/
        var loadingImage = loadImage(
          file,
          function (img) {
            if(img.type === "error") {
                self.setState({
                       loading: false,
                       err: "Something went wrong"
                     })
              } else {
                    var imageData = img.toDataURL();

                    self.props.updatePicture(imageData, (err)=>{
                      if (err) {
                        self.setState({
                          loading: false,
                          err: "Something went wrong"
                        })
                      }else{
                        self.setState({
                          loading: false,
                          err: null
                        })
                      }
                    })
              }
          },
          {
            maxWidth: 500,
            maxHeight: 500,
           cover: true,
           orientation: true,
           crop: true
       }
      );

      loadingImage.onerror = ()=>{
        self.setState({
               loading: false,
               err: "Something went wrong"
             })
      }
        
        }

      reader.readAsDataURL(file)
    }


  render() {
    const isHome = window.location.pathname === '/'

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
         
         
         <div 
          className={this.state.loading || this.state.err ? "profilePicture user-card-picture-wrapper loading" : "profilePicture user-card-picture-wrapper"}
          htmlFor="fileupload">
          
          <div id="profile-picture-upload">
            <canvas ref="canvas" style={{display:"none"}} />
            <input name="fileupload" id="fileupload"  type="file" accept="image/*" onChange={this.handleFile}/>
            {
              this.state.loading
              ?
                <Button isLoading/>
              :
              this.state.err ?
                <label htmlFor="fileupload"><span>{this.state.err}</span></label>
              :
              <label htmlFor="fileupload"><span>Change image</span></label>
            }
          </div>

          <div
            className=" user-card-picture"
            style={{backgroundImage: "linear-gradient(20deg, rgba(49, 255, 245,0.8) 0%, rgba(49, 255, 197,0.5) 16%, rgba(0, 209, 255,0.2) 66%, rgba(49, 218, 255, 0.0) 71%),  url("+this.props.profile.picture+")"}}
          />
          <div
            className=" user-card-picture-blurred"
            style={{backgroundImage: "linear-gradient(20deg, rgba(49, 255, 245,0.8) 0%, rgba(49, 255, 197,0.5) 16%, rgba(0, 209, 255,0.2) 66%, rgba(49, 218, 255, 0.0) 71%),  url("+this.props.profile.picture+")"}}
          />
        </div>


               
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
                        {this.props.profile.avgRating > 0 ? <Rating rating={this.props.profile.avgRating}/> : "No reviews yet"}
                    </div>
                  </div>
                </div>
              </div>
              : null
            }
            <div className="menu">
            <ul >

             {this.getMenuItems()}

              {!isHome    ?    
                <li>
                  <Navlink buttonLook={true} to="/" label="Arrange event"/>
                </li>  : null 
                
                }

              {this.props.profile.isDJ ?
                <li>
                  <Navlink onClick={()=>this.handleClose()} userNavigation={true} to={`/user/${this.props.profile.user_id}/profile`} label="Profile"/>
                </li>
              : null}

              {this.props.profile.isCustomer ?
                <li>
                  <Navlink onClick={()=>this.handleClose()}  userNavigation={true} to={`/user/${this.props.profile.user_id}/events`} label="Events"/>
                </li>
              : null}

              {this.props.profile.isDJ ?
                <li >
                  <Navlink onClick={()=>this.handleClose()}  userNavigation={true} to={`/user/${this.props.profile.user_id}/gigs`} label="Gigs"/>
                </li>
              : null}

              {this.props.profile.isDJ ?
                <li >
                  <Navlink onClick={()=>this.handleClose()}  userNavigation={true} to={`/user/${this.props.profile.user_id}/reviews`} label="Reviews"/>
                </li>
                : null
              }

              {(this.props.isCustomer && !this.props.isDJ) ?
                <li >
                  <Navlink onClick={()=>this.handleClose()}  userNavigation={true} to="/signup" label="Become DJ"/>
                </li>
                : null
              }
              {this.props.loggedIn ?
                <li>
                  <Navlink onClick={()=>this.handleClose()}  userNavigation={true} to="/preferences" label="Preferences"/>
                </li>
                : null
              }


              <li>
                <Navlink onClick={()=>this.handleClose()}   buttonLook={true} to="/howitworks" label="How it works"/>
              </li>
              {this.props.loggedIn ? (

                <li>
                  <Navlink  buttonLook={true} to="/"  onClick={this.props.logout} label="Log out"/>
                </li>
              ) : (
                null
              )}
              {this.props.loggedIn ? (
                null
              ) : (
                <li>
                  <Navlink onClick={()=>this.handleClose()}  buttonLook={true} to="/signup" label="Become DJ" important={true}/>
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
    profile: state.login.profile,
    loggedIn: state.login.status.signedIn,
    registeredMenuItems: state.menu
  }
}

export const mapDispatchToProps = (dispatch, ownprops) => {
  return{
    logout: ()        => dispatch(actions.userLogout()),
    updatePicture: (img, callback, profile) => {dispatch(UserActions.SaveProfilePicture(img, profile, callback))},
  }
}

export const mergeProps = (stateProps, dispatchProps, ownProps) => {
  return {
    ...ownProps,
    profile: stateProps.profile,
    loggedIn: stateProps.loggedIn,
    registeredMenuItems: stateProps.registeredMenuItems,
    logout: dispatchEvent.logout,
    updatePicture: (img, callback) => dispatchProps.updatePicture(img, callback, stateProps.profile)
}
}
export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(MobileMenu);
