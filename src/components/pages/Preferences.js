import React, { PropTypes } from 'react'
import ToggleOptions from '../common/ToggleOptions'
import ToggleHandler from '../common/ToggleButtonHandler'
import Button from '../common/Button-v2'
import PayoutForm from '../blocks/PayoutForm'
import Popup from '../common/Popup'
import SubmitButton from '../common/SubmitButton'
import TextWrapper from '../common/TextElement'
import assign from 'lodash.assign'
import LoadingPlaceholder from '../common/LoadingPlaceholder'

export default React.createClass({
  propTypes: {
    user: PropTypes.object,
    provider: PropTypes.string,
    changePassword: PropTypes.func,
    connectFacebook: PropTypes.func,
    connectSoundCloud: PropTypes.func,
    connectDB: PropTypes.func,
    deleteProfile: PropTypes.func,
    updateSettings: PropTypes.func
  },
  contextTypes:{
    loading:         PropTypes.bool,
    reset:           PropTypes.func,
    registerActions: PropTypes.func,
    toggleEditMode:  PropTypes.func,
    editing:         PropTypes.bool,
    valid:           PropTypes.bool
  },

  componentWillMount(){
    this.context.registerActions(this.getActionButtons)
  },

  getInitialState(){
    return {
      showPopup: false
    }
  },

  updateSettings(form, callback){
    var eSettings = this.props.user.settings.emailSettings

    //setting all settings to false initially
    for (var s in eSettings){
      if (eSettings.hasOwnProperty(s)) {
         eSettings[s] = false
      }
    }

    //setting the selected to true
    form.values.emailSettings.forEach(function(s){
                              eSettings[s] = true
                            })

    var settings = assign({}, form.values, {
            emailSettings: eSettings
          })

    this.props.updateSettings(settings,callback)
  },

  hidePopup(){
    this.setState({
      showPopup: false
    })
  },

  getUserEmailNotifications(){
    var vals = Object.entries(this.props.user.settings.emailSettings)
      .filter(s=>s[1] === true)
      .map(s=>s[0])

    return vals

  },

  getPotentialEmailNotifications(){
   const  vals = Object.keys(this.props.user.settings.emailSettings)
                  .map(function(s){return{name:s}})
    return vals
  },

  getActionButtons(props = this.props) {
      const editing = this.context.editing

      return (
          <div className="context-actions" key="profile_actions">
            {editing
              ?
                <SubmitButton
                  active={this.context.valid}
                  onClick={this.updateSettings}
                  name="save_edit_profile"
                > Save
                </SubmitButton>
              : <Button
                onClick={this.context.toggleEditMode}
                name="edit_profile"
                >Edit settings
              </Button>
            }

            <SubmitButton
              dangerous
              warning="Are you sure you want to delete? All future gigs, events and payments will be lost."
              onClick={this.props.deleteProfile}
              name="Delete_profile"
            > Delete profile
            </SubmitButton>
          </div>

      )
  },

  render() {
    const isDJ = this.props.user.isDJ
    return <div>
      { this.context.loading ?
        <div>
          <LoadingPlaceholder/>
          <LoadingPlaceholder/>
          <LoadingPlaceholder/>
          <LoadingPlaceholder/>
        </div>
        :
        <div>
          <Popup showing={this.state.showPopup}
            onClickOutside={this.hidePopup}>
            <PayoutForm/>

          </Popup>

          <div className="row">
            <div className="col-lg-12">
              {isDJ ?
                <TextWrapper
                  label="Payout"
                  text="To get paid, you need to set up a payout method.
                  Cueup releases payouts about 24 hours after a job is finished.">
                  {this.props.user.last4 ?
                    <div className="user-card-info">
                      <div className="user-card-fact">
                        <p>Last 4 digits of current account number</p>
                        {"..." + this.props.user.last4}
                      </div>
                    </div>

                  : null}
                  <div style={{display:"inline-block"}}>
                    <Button
                      rounded={true}
                      onClick={()=>this.setState({showPopup:true})}
                      name="show-payout-popup"
                    >{!this.props.user.last4 ?
                      "Setup payout info"
                    : "Update payout info"}</Button>
                  </div>

                </TextWrapper>
              : null }

              {isDJ ?
                <div>
                  <TextWrapper
                    label="Email notifications"
                    text="What kind of notifications do you wish to receive?">
                    <ToggleHandler
                      disabled={!this.context.editing}
                      name="emailSettings"
                      potentialValues={this.getPotentialEmailNotifications()}
                      value={this.getUserEmailNotifications()}
                      columns={3}
                    />
                  </TextWrapper>
                </div>
              : null}

              {isDJ ?
                <div>
                  <TextWrapper
                    label="Cancelation policy"
                    text="How many days notice do you allow for cancelations?
                    If the organizer wants to cancel the event within less days, no money will be refunded.
                    The organizer will have to agree to this policy when confirming your offer.">

                    <ToggleOptions
                      disabled={!this.context.editing}
                      name="cancelationDays"
                      glued={true}
                      value={this.props.user.settings.cancelationDays}
                    >
                      <Button
                        name={0}
                      >Same day</Button>
                      <Button
                        name={1}
                      >1 day</Button>
                      <Button
                        name={2}
                      >2 days</Button>
                      <Button
                        name={7}
                      >A week</Button>

                      <Button
                        name={14}
                      >Two weeks</Button>

                      <Button
                        name={30}
                      >A month</Button>

                    </ToggleOptions>
                  </TextWrapper>
                  <TextWrapper
                    label="Standby"
                    text="Are you unavailable to play at the moment? You will not receive requests if you're unavailable.">

                    <ToggleOptions
                      name="standby"
                      glued={true}
                      disabled={!this.context.editing}
                      value={this.props.user.settings.standby ? 1 : 0}

                    >
                      <Button
                        name={1}
                      >Unavailable</Button>
                      <Button
                        name={0}
                      >Available</Button>
                    </ToggleOptions>
                  </TextWrapper>
                </div>
              : null}


              { this.props.provider === "auth0" ?

                <TextWrapper
                  label="Password"
                  text="Request an email to change your password.">
                  <div style={{display:"inline-block"}}>
                    <SubmitButton
                      onClick={(email, callback) => this.props.changePassword(this.props.user.email, callback)}
                      name="request_change_password"
                    >Request email</SubmitButton>
                  </div>
                </TextWrapper>
              : null }

              { !this.props.user.email_verified  ?

                <TextWrapper
                  label="Email verification"
                  text="Request an email to verify your email.">
                  <div style={{display:"inline-block"}}>
                    <SubmitButton
                      onClick={(id, callback) => this.props.resendVerification(this.props.user.auth0Id, callback)}
                      name="request_verification_email"
                    >Request email</SubmitButton>
                  </div>
                </TextWrapper>
              : null }


              {/* <TextWrapper
                label="Connect social platforms"
                text="If you want to log in using a social platform or connect existing accounts.">
                <div className="row">
                <div className="col-xs-3">
                <Button
                rounded= {true}
                label="Facebook"
                active={true}
                onClick= {this.props.connectFacebook}
                name="connect_facebook"
                />
                </div>
                <div className="col-xs-3">
                <Button
                rounded= {true}
                label="SoundCloud"
                active={true}
                onClick= {this.props.connectSoundCloud}
                name="connect_soundcloud"
                />
                </div>
                <div className="col-xs-3">
                <Button
                rounded= {true}
                label="E-mail & Password"
                active={true}
                onClick= {this.props.connectDB}
                name="connect_db"
                />
                </div>
                </div>
              </TextWrapper> */}


            </div>
          </div>
        </div>
      }
    </div>
  }
})
