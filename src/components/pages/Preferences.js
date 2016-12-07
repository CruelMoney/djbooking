import React, { PropTypes } from 'react'
import ToggleOptions from '../common/ToggleOptions'
import ToggleHandler from '../common/ToggleButtonHandler'
import Button from '../common/Button-v2'
import PayoutForm from '../blocks/PayoutForm'
import Popup from '../common/Popup'
import Form from '../../containers/Form-v2'
import SubmitButton from '../common/SubmitButton'
import ResetButton from '../common/ResetButton'
import TextWrapper from '../common/TextElement'
import assign from 'lodash.assign'

export default React.createClass({
  propTypes: {
    user: PropTypes.object,
    provider: PropTypes.string,
    changePassword: PropTypes.func,
    connectFacebook: PropTypes.func,
    connectSoundCloud: PropTypes.func,
    connectDB: PropTypes.func,
    deleteAccount: PropTypes.func,
    updateSettings: PropTypes.func
  },
  contextTypes:{
    registerActions: PropTypes.func,
  },

  componentWillMount(){
    this.context.registerActions(this.getActionButtons())
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
    console.log(vals);

    return vals

  },

  getPotentialEmailNotifications(){
    return Object.keys(this.props.user.settings.emailSettings)
                  .map(function(s){return{name:s}})
  },

  getActionButtons(props = this.props){
    return (
    <div
      className="context-actions"
      key="profile_actions">
      {this.state.infoEditMode ?
        <ResetButton
          active={this.state.infoEditMode}
          rounded={true}
          label="Cancel changes"
          onClick={()=>{this.setState({infoEditMode:false})}}
          name="reset_user_settings"/>
        :
      null}
      {this.state.infoEditMode ?
        <SubmitButton
          active={this.state.infoEditMode}
          rounded={true}
          name="save_user_settings"
          onClick={this.updateSettings}
        >Save</SubmitButton>
        :
        <Button
          active={this.state.infoEditMode}
          rounded={true}
          onClick={()=>{this.setState({infoEditMode:true})}}
          name="edit_user_settings"
        >Edit</Button>}


    </div>
    )
  },

  render() {
    const isDJ = this.props.user.isDJ
    return(
      <div>
        <Popup showing={this.state.showPopup}
          onClickOutside={this.hidePopup}>
          <PayoutForm/>

        </Popup>

        <div className="row">
          <div className="col-lg-12">
            <Form
              name="settings-form"
            >
              {isDJ ?
                <TextWrapper
                  label="Payout"
                  text="To get paid, you need to set up a payout method.
                  Cueup releases payouts about 24 hours after a job is finished.">
                  {this.props.user.last4 ?
                    <div className="user-card-info">
                      <div className="user-card-fact">
                        <p>Last 4 digits of current account number</p>
                        { this.props.user.last4}
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
                      disabled={!this.state.infoEditMode}
                      name="emailSettings"
                      potentialValues={this.getPotentialEmailNotifications()}
                      preToggled={this.getUserEmailNotifications()}
                      columns={4}
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
                      disabled={!this.state.infoEditMode}
                      name="cancelationDays"
                      glued={true}
                      value={this.props.user.settings.cancelationDays}
                      validate={['required']}
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
                      disabled={!this.state.infoEditMode}
                      value={this.props.user.settings.standby ? 1 :0}
                      validate={['required']}
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
            </Form>

            <Form name="change-password">
              { this.props.provider === "auth0" ?
                <div style={{marginBottom:"4px"}}>
                  <TextWrapper
                    label="Password"
                    text="Request an email to change your password.">
                    <SubmitButton
                      rounded={true}
                      onClick={(email, callback) => this.props.changePassword(this.props.user.email, callback)}
                      label="Request email"
                      name="request_change_password"
                    />
                  </TextWrapper>
                </div>  : null }
            </Form>


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
      </div>)

  }
})
