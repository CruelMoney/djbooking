import React,  { PropTypes } from 'react'
import UserHeader from '../blocks/UserHeader'
import Footer from '../../../../components/common/Footer'
import Form from '../../../../components/common/Form-v2'

import '../../../../css/transitions.css'

var user = React.createClass({
  themeColor: "#25F4D2",
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
      loading: PropTypes.bool
  },

  componentWillMount(){

    if (!this.props.profile.email_verified) {
      this.setState({notification:"You won't receive any gigs before you confirm your email-address."})
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
     loading: this.props.loading
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
            profile={this.props.profile}
            hideInfo={!this.state.showUserCard}
            actions={this.state.actions}
            notification={this.state.notification}
            loading={this.props.loading}
          />

          <div  className="user-container container">
            <div className="row">
              <div className={"col-xs-4"}></div>
              <div className={"col-md-8"}>

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
    loading: state.user.status.isWaiting
  }
}

const SmartUser = connect(mapStateToProps)(user)

export default props => (
    <SmartUser {...props}/>
)
