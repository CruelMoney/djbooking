import React, {Component} from 'react';
import PropTypes from 'prop-types'
import Navlink    from './common/Navlink'
import Popup from './common/Popup'
import Login from './common/Login'
import {connect} from 'react-redux';
import Rating from './common/Rating'
import * as actions from '../actions/LoginActions'
import * as UserActions from '../actions/UserActions'
import InfoPopup from './common/InfoPopup'
import entries from 'object.entries';
import Button from './common/Button-v2'
import {ImageCompressor} from '../utils/ImageCompressor';
import {currencyConverter as curConverter} from '../utils/CurrencyConverter'




class MobileMenu extends Component {
  themeColor = "#31DAFF"

  state = {
    show: false,
    loading: false, 
    err: null
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

  logout = () =>{
  this.handleClose()
    this.props.logout()
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
        this.setState({loading:true})
       const file = e.target.files[0]
       
       ImageCompressor(file, (err,result)=>{
          if(err){
            this.setState({
              err:err,
              loading:false
            })
          }else{
                this.props.updatePicture(result, (err)=>{    
                      if (err) {
                         this.setState({err:"Something went wrong"})
                      }else{
                        this.setState({err:"",loading:false})
                      }
              })
          }
       })
  }


  render() {
    console.log(curConverter)
    const {isHome} = this.props;
    
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
          htmlFor="fileuploadMobile">
          
          <div id="profile-picture-upload">
            <canvas ref="canvas" style={{display:"none"}} />
            <input name="fileuploadMobile" id="fileuploadMobile"  type="file" accept="image/*" onChange={this.handleFile}/>
            {
              this.state.loading
              ?
                <Button isLoading/>
              :
              this.state.err ?
                <label htmlFor="fileuploadMobile"><span>{this.state.err}</span></label>
              :
              <label htmlFor="fileuploadMobile"><span>Change image</span></label>
            }
          </div>

          <div
            className=" user-card-picture"
            style={{backgroundImage: "url("+this.props.profile.picture+")"}}
          />
          <div
            className=" user-card-picture-blurred"
            style={{backgroundImage: "url("+this.props.profile.picture+")"}}
          />
        </div>


               
                <div className="profileInfo">
                  <div className="user-card-info">
                     {this.props.profile.isDJ ? 
            <div>
            <div className="user-card-fact">
              <p>Experience
                 <InfoPopup
                  info={"How many gigs you have played using Cueup. This is shared on your public profile." }
                  />
              </p>
             
              {this.props.profile.gigsCount + " gigs"}
            </div>
          
            <div className="user-card-fact">
              <p>Earned
                <InfoPopup
                  info="How much money you have earned. This is NOT shared on your public profile."
                  />
                
              </p>
              {
                curConverter.getConvertedFormatted(this.props.profile.app_metadata.earned, this.props.profile.app_metadata.bankCurrency, this.props.profile.settings.currency)
              }
            </div>
        
            <div className="user-card-fact">
              <p>Rating</p>
              {this.props.rating > 0 ? <Rating rating={this.props.rating}/> : "No reviews yet"}
            </div>
            </div>
            
            : null}

                {this.props.profile.isCustomer ? 
                <div>
                <div className="user-card-fact">
                  <p>Upcoming</p>
                  {this.props.profile.upcomingEvents + " events"}
                </div>
                <div className="user-card-fact">
                  <p>Finished</p>
                  {this.props.profile.finishedEvents + " events"}
                </div>
                
                </div>
                
                : null}
            
                {this.props.profile.discountPoints > 0 ? 
                <div className="user-card-fact">
                  <p>Cueup points
                    <InfoPopup
                      info="Cueup points can be used to remove the fee on gigs, thus increasing the payout."
                      />
                  </p>
                  {this.props.profile.discountPoints + " Points"}
                </div>
                            
                : null}
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
                  <Navlink onClick={()=>this.handleClose()} userNavigation={true} to={`/user/${this.props.profile.user_metadata.permaLink}/profile`} label="Profile"/>
                </li>
              : null}

              {this.props.profile.isCustomer ?
                <li>
                  <Navlink onClick={()=>this.handleClose()}  userNavigation={true} to={`/user/${this.props.profile.user_metadata.permaLink}/events`} label="Events"/>
                </li>
              : null}

              {this.props.profile.isDJ ?
                <li >
                  <Navlink onClick={()=>this.handleClose()}  userNavigation={true} to={`/user/${this.props.profile.user_metadata.permaLink}/gigs`} label="Gigs"/>
                </li>
              : null}

              {this.props.profile.isDJ ?
                <li >
                  <Navlink onClick={()=>this.handleClose()}  userNavigation={true} to={`/user/${this.props.profile.user_metadata.permaLink}/reviews`} label="Reviews"/>
                </li>
                : null
              }

              {(this.props.isCustomer && !this.props.isDJ) ?
                <li >
                  <Navlink onClick={()=>this.handleClose()}  userNavigation={true} to="/signup" label="Apply to become DJ"/>
                </li>
                : null
              }
              {this.props.loggedIn ?
                <li>
                  <Navlink onClick={()=>this.handleClose()}  userNavigation={true} to={`/user/${this.props.profile.user_metadata.permaLink}/preferences`}  label="Preferences"/>
                </li>
                : null
              }


              <li>
                <Navlink onClick={()=>this.handleClose()}   buttonLook={true} to="/howitworks" label="How it works"/>
              </li>
              {this.props.loggedIn ? (

                <li>
                  <Navlink  buttonLook={true} to="/"  onClick={this.logout} label="Log out"/>
                </li>
              ) : (
                null
              )}
              {this.props.loggedIn ? (
                null
              ) : (
                <li>
                  <Navlink onClick={()=>this.handleClose()}  buttonLook={true} to="/signup" label="Apply to become DJ" important={true}/>
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

MobileMenu.childContextTypes={
  color: PropTypes.string
}


export const mapStateToProps = (state) => {
  return {
    profile: state.login.profile,
    loggedIn: state.login.status.signedIn,
    registeredMenuItems: state.menu,
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
    logout: dispatchProps.logout,
    updatePicture: (img, callback) => dispatchProps.updatePicture(img, callback, stateProps.profile)
}
}
export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(MobileMenu);
