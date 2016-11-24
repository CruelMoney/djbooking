import React, { PropTypes } from 'react'
import ToggleOptions from '../common/ToggleOptions'
import ToggleHandler from '../common/ToggleButtonHandler'
import Button from '../common/Button'
import TextField from '../common/Textfield'
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
    connectFacebook: PropTypes.func,
    connectSoundCloud: PropTypes.func,
    connectDB: PropTypes.func,
    deleteAccount: PropTypes.func,
    updateSettings: PropTypes.func
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
      className="action-buttons"
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
            label="Save"
            name="save_user_settings"
            onClick={this.updateSettings}
          />
          :
          <Button
            active={this.state.infoEditMode}
            rounded={true}
            label="Edit"
            onClick={()=>{this.setState({infoEditMode:true})}}
            name="edit_user_settings"
          />}

        { this.state.infoEditMode ?
          <SubmitButton
            rounded={true}
            onClick={this.deleteAccount}
            label="Delete account"
            dangerous={true}
            name="delete_user"
          />
        : null }
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
        <Form
          name="settings-form"
          >


  {this.getActionButtons()}
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
                      <p>Current account number</p>
                      {"**************" + this.props.user.last4}
                    </div>
                  </div>

                : null}
                <Button
                  rounded={true}
                  label={!this.props.user.last4 ?
                    "Setup payout info"
                  : "Update payout info"}
                  onClick={()=>this.setState({showPopup:true})}
                  name="show-payout-popup"
                />
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
                      label="Same day"
                    />
                    <Button
                      name={1}
                      label="1 day"
                    /><Button
                      name={2}
                      label="2 days"
                    /><Button
                      name={7}
                      label="A week"
                    /><Button
                      name={14}
                      label="Two weeks"
                    /><Button
                      name={30}
                      label="A month"
                    />
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
                      label="Unavailable"
                    />
                    <Button
                      name={0}
                      label="Available"
                    />
                  </ToggleOptions>
                </TextWrapper>
              </div>
            : null}

            { this.props.provider === "auth0" ?
              <div style={{marginBottom:"4px"}}>
                <TextWrapper
                  label="Password"
                  text="Change your password here">
                  <div className="row">
                    <div className="col-xs-6">
                      <TextField
                        name="password"
                        disabled={!this.state.infoEditMode}
                        type="password"
                        fullWidth={false}
                        placeholder="Password"
                      />
                    </div>
                    <div className="col-xs-6">
                      <TextField
                        name="password_repeat"
                        disabled={!this.state.infoEditMode}
                        type="password"
                        fullWidth={false}
                        placeholder="Repeat password"
                      />

                    </div>
                  </div>
                </TextWrapper>
              </div>  : null }

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
        </Form>
      </div>)

  }
})
