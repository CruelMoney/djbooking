import React,  { Component } from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet-async';
import UserHeader from '../blocks/UserHeader'
import Footer from '../../../../components/common/Footer'
import Form from '../../../../components/common/Form-v2';
import { localize } from 'react-localize-redux';
import { connect } from 'react-redux'
import * as actions from '../../../../actions/UserActions'
import '../../../../css/transitions.css'

class User extends Component{
  themeColor="#25F4D2"
  textColor="rgb(18, 119, 103)"
  secondColor="#31DAFF"

  static propTypes={
    profile: PropTypes.object,
    isOwnProfile:PropTypes.bool
  }

  static childContextTypes = {
      profile: PropTypes.object,
      hideUserCard: PropTypes.func,
      showUserCard: PropTypes.func,
      registerActions: PropTypes.func,
      toggleEditMode: PropTypes.func,
      editing: PropTypes.bool,
      valid: PropTypes.bool,
      color: PropTypes.string,
      loadingUser: PropTypes.bool,
      textColor: PropTypes.string,
      disableEditMode: PropTypes.func,
      isOwnProfile:PropTypes.bool,
      updateAction: PropTypes.func
  }

  componentWillMount(){
    if(!this.props.profile.user_metadata){
      const permaLink = this.props.isOwnProfile ? null : this.props.match.params.permalink
      console.log(this.props)
      
      this.props.fetchUser(permaLink, (res,err)=>{})
    }
    this.updateNotification(this.props)
  }

  updateNotification = (props) => {
    const { translate } = this.props;
    if(props.profile.app_metadata && props.isOwnProfile){
      if(props.notifications && props.notifications.length > 0){        
        const notification = props.notifications.sort((a,b)=>a>b)[0];
        this.setState({notification: notification.content});
        return
      }
      if (!props.profile.app_metadata.emailVerified) {
        this.setState({notification:
          translate("user.notifications.email")
        })
        return
      }
      if(props.profile.settings && props.profile.settings.standby ){
          this.setState({notification:
            translate("user.notifications.standby")
            })
          return
      }
      if (props.profile.picture && props.profile.picture.indexOf("default-profile-pic") !== -1) {
        this.setState({notification:
          translate("user.notifications.picture")
        })
        return
      }
      if (props.profile.app_metadata.notification) {
        const serverNoti = props.profile.app_metadata.notification;
        let noti = translate(serverNoti);
        noti = noti.indexOf("Missing translation") === -1 ? noti : serverNoti;
        this.setState({notification: noti})
        return
      }
      this.setState({notification:
        translate("user.notifications.empty")
      })
    }else{
        if(props.profile.settings && props.profile.settings.standby ){
          this.setState({notification:
            translate("user.notifications.standby-public")
            })}
        else{
          this.setState({notification:""}
          )}
    }
  }

  componentWillReceiveProps(nextProps){    
    this.updateNotification(nextProps)

    if(nextProps.match.params.permalink !== this.props.match.params.permalink){
       const permaLink = nextProps.isOwnProfile ? null : nextProps.match.params.permalink
       nextProps.fetchUser(permaLink, (res,err)=>{})
    }

  }

  setActions = () => {
     this.setState({actions: this.getActions()})
  }

  getChildContext() {
   return {
     hideUserCard: this.hideUserCard,
     showUserCard: this.showUserCard,
     registerActions: (getActionsFunc)=>{
       this.getActions = getActionsFunc
       this.setState({
         editing: false
       }, this.setActions())

     },
     toggleEditMode:  ()=>{
       this.setState(
         {
         editing: !this.state.editing,
     },this.setActions)},

     disableEditMode:  ()=>{
       this.setState(
         {
         editing: false,
     },this.setActions)},
     updateAction: this.setActions,
     color:        this.themeColor,
     editing:     this.state.editing,
     valid:        this.state.valid,
     loadingUser: this.props.loading,
     textColor: this.textColor,
     profile: this.props.profile,
      isOwnProfile:this.props.isOwnProfile,
    }
  }

  state = {
      showUserCard: true,
      actions: [],
      editing: false,
      valid: false
    }

  hideUserCard = () => {
    this.setState({
      showUserCard: false
    })
  }

  showUserCard = () => {
    this.setState({
      showUserCard: true
    })
  }

  render() {
    const {
      profile,
      translate
    } = this.props;
    const {
      firstName,
      picture,
      bio,
    } = profile ? profile : {};

    return (
      <div >

        <Helmet>
          <title>{`${firstName} | Cueup`}</title>
          <meta property="og:title" content={`${firstName} | Cueup`} />
          <meta property="og:type" content={'profile'} />
          <meta name="description" content={bio} />
          <meta property="og:description" content={bio} />
          <meta property="og:image" content={picture} />
        </Helmet>

        <Form
          noError
          resetStatusOnSucces
          name="user-form"
          formValidCallback={
            ()=>{this.setState({valid:true}, this.setActions)
            }
          }
          formInvalidCallback={()=>{
            this.setState({valid:false},this.setActions)
          }}
        >
          <UserHeader
            isOwnProfile={this.props.isOwnProfile}
            geoLocation={
                (this.props.geoCity ? (this.props.geoCity + ", ") : "") +
                (this.props.geoCountry ? this.props.geoCountry : "") }
            profile={this.props.profile}
            hideInfo={!this.state.showUserCard}
            actions={this.state.actions}
            notification={this.state.notification}
            loading={this.props.loading}
            
          />

          <div  className="user-container container">
            <div className="row">
              <div className={"col-sm-4"}></div>
              <div className={"col-sm-8"}>
                <div className="mobileActions">
                {this.props.isOwnProfile ? this.state.actions : null}
                </div>
               {this.props.children}
              </div>
            </div>
          </div>
        </Form>

           <Footer
            noSkew
            color={this.secondColor}
            firstTo={translate("routes./how-it-works")}
            secondTo={translate("routes./")}
            firstLabel={translate("how-it-works")}
            secondLabel={translate("arrange-event")}
            title={translate("Wonder how it works?")}
            subTitle={translate("See how it works, or arrange an event.")}
          />
      </div>
    )

  }
}


function mapDispatchToProps(dispatch, ownProps) {
  return {
      fetchUser: (permaLink, callback) =>  {dispatch(actions.getUser(permaLink, callback))},
}}


const SmartUser = connect(state=>state,mapDispatchToProps)(User)

export default localize(SmartUser, 'locale');
