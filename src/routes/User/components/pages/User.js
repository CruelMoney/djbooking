import React,  { PropTypes } from 'react'
import UserHeader from '../blocks/UserHeader'
import Footer from '../../../../components/common/Footer'
import Form from '../../../../components/common/Form-v2'

import '../../../../css/transitions.css'

var user = React.createClass({
  themeColor: "#25F4D2",
  textColor: "rgb(18, 119, 103)",
  secondColor: "#31DAFF",

  propTypes: {
    profile: PropTypes.object,
  },

  childContextTypes: {
      hideUserCard: PropTypes.func,
      showUserCard: PropTypes.func,
      registerActions: PropTypes.func,
      toggleEditMode: PropTypes.func,
      editing: PropTypes.bool,
      valid: PropTypes.bool,
      color: PropTypes.string,
      loading: PropTypes.bool,
      textColor: PropTypes.string
  },

  componentWillMount(){
    document.title = this.props.profile.firstName + " | Cueup"

    if (!this.props.profile.email_verified) {
      this.setState({notification:"You won't receive any gigs before you have confirm your email-address."})
      return
    }
    if (this.props.profile.picture && this.props.profile.picture.indexOf("default-profile-pic") !== -1) {
      this.setState({notification:"You should update your profile picture."})
      return
    }
    this.setState({notification:"You don't have any new notifications."})

  },

  componentWillReceiveProps(nextProps){

    if (!nextProps.profile.email_verified) {
      this.setState({notification:"You won't receive any gigs before you confirm your email-address."})
      return
    }
    if (nextProps.profile.picture && nextProps.profile.picture.indexOf("default-profile-pic") !== -1) {
      this.setState({notification:"You should update your profile picture."})
      return
    }
    this.setState({notification:"You don't have any new notifications."})

  },

  setActions(){
     this.setState({actions: this.getActions()})
  },

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
     },this.setActions)

     },
     color:        this.themeColor,
     editing:     this.state.editing,
     valid:        this.state.valid,
     loading: this.props.loading,
     textColor: this.textColor
    }
  },

  getInitialState() {
    return {
      showUserCard: true,
      actions: [],
      editing: false,
      valid: false
    }
  },

  hideUserCard(){
    this.setState({
      showUserCard: false
    })
  },
  showUserCard(){
    this.setState({
      showUserCard: true
    })
  },

  render() {
    return (
      <div >
        <Form
          noError
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
            geoAddress={this.props.geoLocation ? 
              (+ this.props.geoLocation.city_name ? this.props.geoLocation.city_name + ", " : "" +
                 this.props.geoLocation.country_name ? this.props.geoLocation.country_name : "") : ""}
            profile={this.props.profile}
            hideInfo={!this.state.showUserCard}
            actions={this.state.actions}
            notification={this.state.notification}
            loading={this.props.loading}
          />

          <div  className="user-container container">
            <div className="row">
              <div className={"col-md-4"}></div>
              <div className={"col-md-8"}>
                <div className="mobileActions">
                  {this.state.actions}
                </div>
                {this.props.children}
              </div>
            </div>
          </div>
        </Form>

          <Footer
            noSkew
            color={this.secondColor}
            firstTo="/"
            secondTo="/howitworks"
            firstLabel="Arrange event"
            secondLabel="How it works"
            title="Organizing yourself?"
            subTitle="Arrange event, or see how it works."
          />
      </div>
    )

  }
})


import { connect } from 'react-redux'

//TODO move magic information about the filters out of container.
//Should be grabbed from the children that are set as filters
function mapStateToProps(state, ownProps) {
  return {
    profile:  state.user.profile,
    loading: state.user.status.isWaiting,
    geoLocation: state.user.status.geoLocation
  }
}

const SmartUser = connect(mapStateToProps)(user)

export default props => (
    <SmartUser {...props}/>
)
